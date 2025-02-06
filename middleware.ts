import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only handle media requests
  if (!request.nextUrl.pathname.startsWith('/media')) {
    return NextResponse.next()
  }

  // Basic security check
  const filePath = request.nextUrl.pathname.replace('/media/', '')
  if (filePath.includes('..') || filePath.includes('//')) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/media/:path*',
} 