"use client"

import { useState, useEffect, useRef } from "react"
import { ImageIcon } from "lucide-react"
import { performanceConfig } from "@/config/performance-config"

interface MediaFile {
  type: 'image' | 'video'
  src: string
  alt: string
}

export function MediaGallery() {
  const [currentMedia, setCurrentMedia] = useState<MediaFile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<NodeJS.Timeout>()

  const fetchRandomMedia = async () => {
    try {
      setError(null)
      setIsLoading(true)
      const response = await fetch('/api/media')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.mediaFile) {
        console.log('Received media file:', data.mediaFile)
        setCurrentMedia(data.mediaFile)
      } else if (data.error) {
        setError(data.error)
      }
    } catch (error) {
      console.error('Error fetching media:', error)
      setError('Failed to load media')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomMedia()

    const interval = setInterval(() => {
      if (currentMedia?.type !== 'video' || !videoRef.current?.paused) {
        fetchRandomMedia()
      }
    }, performanceConfig.intervals.mediaGallery)

    return () => {
      clearInterval(interval)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleVideoEnded = () => {
    fetchRandomMedia()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error}
      </div>
    )
  }

  if (!currentMedia) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No media found
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-4 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30">
            <ImageIcon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
          </div>
        </div>
      </div>

      <div className="relative flex-1 rounded-lg overflow-hidden bg-black/5">
        {currentMedia.type === 'image' ? (
          <img
            src={currentMedia.src}
            alt={currentMedia.alt}
            className="w-full h-full object-contain"
          />
        ) : (
          <video
            ref={videoRef}
            src={currentMedia.src}
            className="w-full h-full object-contain"
            playsInline
            autoPlay
            muted
            onEnded={handleVideoEnded}
          />
        )}
      </div>
    </div>
  )
}

