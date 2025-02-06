"use client"

import { useState, useEffect } from "react"
import { useColorScheme } from "@/contexts/ColorSchemeContext"
import { Clock as ClockIcon } from "lucide-react"

export function Clock() {
  const [time, setTime] = useState(new Date())
  const { colorScheme } = useColorScheme()

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/30">
        <ClockIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
        </p>
      </div>
    </div>
  )
}

