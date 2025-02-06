"use client"

import { useState, useEffect } from "react"
import { useColorScheme } from "@/contexts/ColorSchemeContext"
import { Baby, Calendar } from "lucide-react"

interface PregnancyStatusProps {
  startDate: string
  dueDate: string
}

export function PregnancyStatus({ startDate, dueDate }: PregnancyStatusProps) {
  const [progress, setProgress] = useState(0)
  const [weeksLeft, setWeeksLeft] = useState(0)
  const [currentWeek, setCurrentWeek] = useState(0)

  useEffect(() => {
    const start = new Date(startDate).getTime()
    const end = new Date(dueDate).getTime()
    const now = new Date().getTime()
    
    const totalDuration = end - start
    const elapsed = now - start
    const progressPercent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
    
    const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7
    const weeksTotal = Math.round(totalDuration / millisecondsPerWeek)
    const weeksCurrent = Math.round(elapsed / millisecondsPerWeek)
    const remaining = Math.max(0, weeksTotal - weeksCurrent)

    setProgress(progressPercent)
    setWeeksLeft(remaining)
    setCurrentWeek(weeksCurrent)
  }, [startDate, dueDate])

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 rounded-full bg-violet-100 dark:bg-violet-900/30">
          <Baby className="w-6 h-6 text-violet-600 dark:text-violet-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Week {currentWeek}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {weeksLeft} weeks remaining
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>{startDate}</span>
          <span>{dueDate}</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-violet-500 dark:bg-violet-400 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Start Date
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{startDate}</p>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Due Date
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{dueDate}</p>
        </div>
      </div>
    </div>
  )
}

