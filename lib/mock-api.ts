import type { LatencyData, ServerLocation } from "./types"
import { EXCHANGES, CLOUD_REGIONS } from "./data"

// Simulate network latency calculation based on distance + jitter
function calculateMockLatency(source: ServerLocation, target: ServerLocation): number {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(target.location.lat - source.location.lat)
  const dLon = deg2rad(target.location.lng - source.location.lng)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(source.location.lat)) *
      Math.cos(deg2rad(target.location.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distanceKm = R * c

  // Base latency: speed of light in fiber is ~200,000 km/s (approx 2/3 c)
  // Round trip time often estimated as distance * 0.01 ms/km + overhead
  const baseLatency = distanceKm * 0.02 + 10 // Simple approximation

  // Add random jitter (-5ms to +15ms)
  const jitter = Math.random() * 20 - 5

  return Math.max(1, Math.round(baseLatency + jitter))
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}

export function generateLatencyData(): LatencyData[] {
  const data: LatencyData[] = []

  // Generate latency between each exchange and each cloud region
  EXCHANGES.forEach((exchange) => {
    CLOUD_REGIONS.forEach((region) => {
      const latency = calculateMockLatency(exchange, region)

      let status: "good" | "warning" | "critical" = "good"
      if (latency > 150) status = "critical"
      else if (latency > 80) status = "warning"

      data.push({
        sourceId: exchange.id,
        targetId: region.id,
        latencyMs: latency,
        timestamp: Date.now(),
        status,
      })
    })
  })

  return data
}
