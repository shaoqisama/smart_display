"use client"

import { useColorScheme } from "@/contexts/ColorSchemeContext"
import { Calendar as CalendarIcon } from "lucide-react"

interface CalendarProps {
  events: { time: string; event: string }[]
  currentDate: string
}

export function Calendar({ events, currentDate }: CalendarProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-3">
        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
          <CalendarIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{currentDate}</p>
      </div>

      <div className="space-y-3">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/30"
          >
            <div className="flex-shrink-0 w-16 text-sm font-medium text-gray-600 dark:text-gray-300">
              {event.time}
            </div>
            <div className="flex-1 text-sm text-gray-700 dark:text-gray-200">
              {event.event}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

