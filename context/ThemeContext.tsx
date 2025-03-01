"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import { useColorScheme } from "react-native"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  colors: {
    background: string
    text: string
    primary: string
    secondary: string
    accent: string
    border: string
    card: string
    error: string
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode; defaultTheme?: Theme }> = ({
  children,
  defaultTheme = "dark",
}) => {
  const colorScheme = useColorScheme()
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    setTheme(defaultTheme)
  }, [defaultTheme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  const colors = {
    light: {
      background: "#ffffff",
      text: "#1f2937",
      primary: "#3b82f6",
      secondary: "#6b7280",
      accent: "#8b5cf6",
      border: "#e5e7eb",
      card: "#f3f4f6",
      error: "#ef4444",
    },
    dark: {
      background: "#0a0a0a",  
      text: "#f5f5f5",  
      primary: "#e5e5e5",  
      secondary: "#a3a3a3",  
      accent: "#737373",  
      border: "#262626",  
      card: "#1a1a1a",  
      error: "#d32f2f",  
    },
  }

  const value = {
    theme,
    toggleTheme,
    colors: colors[theme],
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

