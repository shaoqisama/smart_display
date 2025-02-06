"use client"

import { useState, useEffect } from "react"
import { useColorScheme } from "@/contexts/ColorSchemeContext"
import { Newspaper } from "lucide-react"

interface RSSFeedProps {
  items: { title: string }[]
}

export function RSSFeed({ items }: RSSFeedProps) {
  const [activeItemIndex, setActiveItemIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItemIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [items.length])

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-3">
        <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
          <Newspaper className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30">
        {items.length > 0 && (
          <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2">
            {items[activeItemIndex].title}
          </p>
        )}
      </div>
    </div>
  )
}

