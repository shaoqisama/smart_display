"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type ColorScheme = "morning" | "day" | "evening" | "night"

interface ColorSchemeContextType {
  colorScheme: ColorScheme
}

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(undefined)

export function ColorSchemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("day")

  useEffect(() => {
    const updateColorScheme = () => {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 11) setColorScheme("morning")
      else if (hour >= 11 && hour < 17) setColorScheme("day")
      else if (hour >= 17 && hour < 21) setColorScheme("evening")
      else setColorScheme("night")
    }

    updateColorScheme()
    const interval = setInterval(updateColorScheme, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  return <ColorSchemeContext.Provider value={{ colorScheme }}>{children}</ColorSchemeContext.Provider>
}

export const useColorScheme = () => {
  const context = useContext(ColorSchemeContext)
  if (context === undefined) {
    throw new Error("useColorScheme must be used within a ColorSchemeProvider")
  }
  return context
}

