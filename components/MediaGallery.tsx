"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { ImageIcon } from "lucide-react"
import { performanceConfig } from "@/config/performance-config"

// Configuration constants
const API_URL = "http://192.168.50.178:3001/api/random-media"
const MEDIA_REFRESH_INTERVAL = performanceConfig.intervals.mediaGallery

export function MediaGallery() {
  // State management
  const [currentMedia, setCurrentMedia] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  /**
   * Fetches new media from the API and updates state
   */
  const fetchNewMedia = async () => {
    console.log("[MediaGallery] Initiating media fetch...")
    try {
      setError(null)
      setIsLoading(true)
      const response = await axios.get(API_URL)
      const newMediaUrl = response.data
      console.log("[MediaGallery] Media fetch successful:", newMediaUrl)
      
      // Determine media type before updating state
      const newMediaType = newMediaUrl.match(/\.(mp4|mov)$/) ? "video" : "image"
      setMediaType(newMediaType)
      setCurrentMedia(newMediaUrl)
      
      console.log(`[MediaGallery] New media type: ${newMediaType}`)
    } catch (err) {
      console.error("[MediaGallery] Media fetch error:", err)
      setError("Failed to load media. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle component hydration and setup media refresh interval
  useEffect(() => {
    console.log("[MediaGallery] Component mounted, setting up interval...")
    setIsHydrated(true)
    fetchNewMedia()

    // Only set interval for images
    const interval = setInterval(() => {
      console.log("[MediaGallery] Interval triggered, checking media type...")
      if (mediaType === "image") {
        console.log("[MediaGallery] Current media is image, fetching new media...")
        fetchNewMedia()
      } else {
        console.log("[MediaGallery] Current media is video, skipping interval refresh")
      }
    }, MEDIA_REFRESH_INTERVAL)

    console.log(
      `[MediaGallery] Interval set up with ${MEDIA_REFRESH_INTERVAL}ms duration`
    )

    return () => {
      console.log("[MediaGallery] Cleaning up interval...")
      clearInterval(interval)
    }
  }, [mediaType]) // Only recreate interval when media type changes

  /**
   * Handles video playback completion
   */
  const handleVideoEnded = () => {
    console.log("[MediaGallery] Video ended, fetching new media...")
    fetchNewMedia()
  }

  // Don't render anything until hydrated (SSR compatibility)
  if (!isHydrated) {
    console.log("[MediaGallery] Not hydrated yet, skipping render")
    return null
  }

  // Render loading state
  if (isLoading) {
    console.log("[MediaGallery] Rendering loading state")
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500" />
      </div>
    )
  }

  // Render error state
  if (error) {
    console.log("[MediaGallery] Rendering error state:", error)
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error}
      </div>
    )
  }

  // Render empty state
  if (!currentMedia) {
    console.log("[MediaGallery] Rendering empty state")
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No media available
      </div>
    )
  }

  console.log(`[MediaGallery] Rendering media of type: ${mediaType}`)

  return (
    <div className="flex flex-col space-y-4 h-full">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30">
            <ImageIcon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
          </div>
        </div>
      </div>

      {/* Media display area */}
      <div className="relative flex-1 rounded-lg overflow-hidden bg-black/5">
        {mediaType === "video" ? (
          <video
            ref={videoRef}
            src={currentMedia}
            className="w-full h-full object-contain"
            playsInline
            autoPlay
            muted
            onEnded={handleVideoEnded}
            onError={() => {
              console.error("[MediaGallery] Video playback error")
              setError("Failed to play video")
            }}
            onPlay={() => console.log("[MediaGallery] Video started playing")}
            onPause={() => console.log("[MediaGallery] Video paused")}
            aria-label="Featured video content"
          />
        ) : (
          <img
            src={currentMedia}
            alt="Featured media content"
            className="w-full h-full object-contain"
            onError={() => {
              console.error("[MediaGallery] Image load error")
              setError("Failed to load image")
            }}
          />
        )}
      </div>
    </div>
  )
}