'use client'

import type { ReactNode } from "react"
import { useColorScheme } from "@/contexts/ColorSchemeContext"

interface GridTileProps {
  children: ReactNode
  className?: string
  title?: string
}

export function GridTile({ children, className = "", title }: GridTileProps) {
  const { colorScheme } = useColorScheme()

  return (
    <div
      className={`
        bg-white dark:bg-gray-800
        rounded-lg
        overflow-hidden
        shadow-sm
        border border-gray-100 dark:border-gray-700
        ${className}
      `}
    >
      {title && (
        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">
            {title}
          </h2>
        </div>
      )}
      <div className="p-3 h-[calc(100%-2.5rem)]">
        {children}
      </div>
    </div>
  )
}

