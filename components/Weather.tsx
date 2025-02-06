"use client"

import { useColorScheme } from "@/contexts/ColorSchemeContext"
import { Cloud, Droplets, Wind } from "lucide-react"

interface WeatherProps {
  data?: {
    temperature: number
    description: string
    humidity: number
    windSpeed: number
  }
}

export function Weather({ data }: WeatherProps) {
  const { colorScheme } = useColorScheme()

  if (!data) return null

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            <Cloud className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
              {data.temperature}°C
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="flex items-center space-x-2">
          <Droplets className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {data.humidity}% Humidity
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Wind className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {data.windSpeed} km/h
          </span>
        </div>
      </div>
    </div>
  )
}

