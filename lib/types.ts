export type Provider = "AWS" | "GCP" | "Azure" | "Exchange"

export interface GeoLocation {
  lat: number
  lng: number
}

export interface ServerLocation {
  id: string
  name: string
  provider: Provider
  region: string
  location: GeoLocation
  status: "operational" | "degraded" | "maintenance"
}

export interface LatencyData {
  sourceId: string
  targetId: string
  latencyMs: number
  timestamp: number
  status: "good" | "warning" | "critical"
}

export interface HistoricalDataPoint {
  timestamp: number
  latencyMs: number
}
