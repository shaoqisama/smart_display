"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { ImageIcon } from "lucide-react"
import { performanceConfig } from "@/config/performance-config"

export function MediaGallery() {
  const [currentMedia, setCurrentMedia] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const fetchRandomMedia = async () => {
    try {
      setError(null)
      setIsLoading(true)
      const response = await axios.get('http://localhost:3001/api/random-media')
      const mediaUrl = response.data
      setCurrentMedia(mediaUrl)
    } catch (error) {
      setError('Failed to load media')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsHydrated(true)
    fetchRandomMedia()

    const interval = setInterval(() => {
      if (currentMedia && videoRef.current && !videoRef.current.paused) {
        fetchRandomMedia()
      }
    }, performanceConfig.intervals.mediaGallery)

    return () => {
      clearInterval(interval)
    }
  }, [currentMedia])

  const handleVideoEnded = () => {
    fetchRandomMedia()
  }

  if (!isHydrated) return null

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

  const isVideo = currentMedia.endsWith('.mp4') || currentMedia.endsWith('.mov');

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
        {isVideo ? (
          <video
            ref={videoRef}
            src={currentMedia}
            className="w-full h-full object-contain"
            playsInline
            autoPlay
            muted
            onEnded={handleVideoEnded}
            onError={() => setError('Video failed to load')}
          />
        ) : (
          <img
            src={currentMedia}
            alt="Media content"
            className="w-full h-full object-contain"
            onError={() => setError('Image failed to load')}
          />
        )}
      </div>
    </div>
  )
}