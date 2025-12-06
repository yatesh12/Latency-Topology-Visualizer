"use client"

import { useAppStore } from "@/lib/store"
import { ConnectionLine } from "./ConnectionLine"

export function Connections({ radius = 2 }: { radius?: number }) {
  const { latencyData, locations, selectedLocationId } = useAppStore()

  // Filter connections:
  // If a location is selected, only show connections involving that location.
  // Otherwise, show all (or a subset to avoid clutter).
  const visibleConnections = latencyData.filter((d) => {
    if (selectedLocationId) {
      return d.sourceId === selectedLocationId || d.targetId === selectedLocationId
    }
    // Show all connections by default, or maybe limit if too messy?
    // For now, let's show connections from "Exchanges" to "Cloud Regions" primarily
    const source = locations.find((l) => l.id === d.sourceId)
    return source?.provider === "Exchange"
  })

  return (
    <group>
      {visibleConnections.map((data, i) => {
        const source = locations.find((l) => l.id === data.sourceId)
        const target = locations.find((l) => l.id === data.targetId)

        if (!source || !target) return null

        return (
          <ConnectionLine
            key={`${data.sourceId}-${data.targetId}`}
            data={data}
            source={source}
            target={target}
            radius={radius}
          />
        )
      })}
    </group>
  )
}
