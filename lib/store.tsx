"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { LatencyData, ServerLocation } from "./types"
import { generateLatencyData } from "./mock-api"
import { ALL_LOCATIONS } from "./data"

interface AppState {
  locations: ServerLocation[]
  latencyData: LatencyData[]
  selectedLocationId: string | null
  setSelectedLocationId: (id: string | null) => void
  isLoading: boolean
}

const AppContext = createContext<AppState | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [latencyData, setLatencyData] = useState<LatencyData[]>([])
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initial load
    setLatencyData(generateLatencyData())
    setIsLoading(false)

    // Poll for updates every 2 seconds
    const interval = setInterval(() => {
      setLatencyData(generateLatencyData())
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <AppContext.Provider
      value={{
        locations: ALL_LOCATIONS,
        latencyData,
        selectedLocationId,
        setSelectedLocationId,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppStore() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppStore must be used within an AppProvider")
  }
  return context
}
