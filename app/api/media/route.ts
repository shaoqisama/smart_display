import { readdir, stat, readFile, createReadStream } from 'fs'
import { promisify } from 'util'
import path from 'path'
import { lookup as mimeTypeLookup } from 'mime-types'
import { NextRequest } from 'next/server'

const MEDIA_DIR = process.env.MEDIA_DIR || path.join(process.cwd(), 'public/media')
const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov']

const statAsync = promisify(stat)
const readdirAsync = promisify(readdir)

async function isFile(filePath: string) {
  try {
    const stats = await statAsync(filePath)
    return stats.isFile()
  } catch (error) {
    console.error('Error checking file:', filePath, error)
    return false
  }
}

function getRandomFile(files: string[]) {
  const randomIndex = Math.floor(Math.random() * files.length)
  return files[randomIndex]
}

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname
    console.log('Request pathname:', pathname)

    // List/Random endpoint
    if (pathname === '/api/media') {
      const files = await readdirAsync(MEDIA_DIR)
      const filteredFiles = files.filter(file => 
        VALID_EXTENSIONS.some(ext => file.toLowerCase().endsWith(ext)) &&
        !file.startsWith('.')
      )
      
      if (filteredFiles.length === 0) {
        return Response.json({ error: 'No media files found' }, { status: 404 })
      }

      const randomFile = getRandomFile(filteredFiles)
      const mediaFile = {
        type: randomFile.toLowerCase().endsWith('.mp4') || randomFile.toLowerCase().endsWith('.mov')
          ? 'video'
          : 'image',
        src: `/api/media/${encodeURIComponent(randomFile)}`,
        alt: randomFile.split('.')[0]
      }

      return Response.json({ mediaFile })
    }

    // File serving endpoint
    const filename = pathname.split('/api/media/')[1]
    if (!filename) {
      return new Response('Invalid path', { status: 400 })
    }

    const decodedFilename = decodeURIComponent(filename)
    const fullPath = path.join(MEDIA_DIR, decodedFilename)
    
    if (!(await isFile(fullPath))) {
      console.error('File not found:', fullPath)
      return new Response('File not found', { status: 404 })
    }

    const stats = await statAsync(fullPath)
    const mimeType = mimeTypeLookup(fullPath) || 'application/octet-stream'

    // Handle range requests for video streaming
    const range = request.headers.get('range')
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-')
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1
      const chunksize = (end - start) + 1
      const stream = createReadStream(fullPath, { start, end })
      const head = {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize.toString(),
        'Content-Type': mimeType,
      }
      return new Response(stream as any, { status: 206, headers: head })
    }

    // Serve entire file
    const stream = createReadStream(fullPath)
    return new Response(stream as any, {
      headers: {
        'Content-Type': mimeType,
        'Content-Length': stats.size.toString(),
        'Accept-Ranges': 'bytes',
      },
    })
  } catch (error) {
    console.error('Error in media route:', error)
    return new Response('Server error', { status: 500 })
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
} 