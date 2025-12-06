"use client"

import { useAppStore } from "@/lib/store"
import { GlassPanel } from "@/components/ui/GlassPanel"
import { LatencyChart } from "./LatencyChart"
import { useState, useEffect } from "react"

export function DetailsPanel() {
  const { locations, selectedLocationId, setSelectedLocationId } = useAppStore()
  const [historyData, setHistoryData] = useState<number[]>([])

  const selectedLocation = locations.find((l) => l.id === selectedLocationId)

  // Simulate fetching historical data when selection changes
  useEffect(() => {
    if (selectedLocationId) {
      // Generate fake history
      const fakeHistory = Array.from(
        { length: 20 },
        () => Math.floor(Math.random() * 50) + 20 + (Math.random() > 0.8 ? 100 : 0), // occasional spikes
      )
      setHistoryData(fakeHistory)
    }
  }, [selectedLocationId])

  if (!selectedLocation) {
    return (
      <GlassPanel className="p-4 w-full md:w-80 pointer-events-auto flex flex-col gap-2">
        <h3 className="text-sm font-bold text-gray-400 uppercase">System Overview</h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Select an exchange or region node on the globe or from the list to view detailed latency metrics and
          historical performance data.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="bg-white/5 p-2 rounded">
            <div className="text-[10px] text-gray-400">TOTAL NODES</div>
            <div className="text-xl font-mono text-white">{locations.length}</div>
          </div>
          <div className="bg-white/5 p-2 rounded">
            <div className="text-[10px] text-gray-400">ACTIVE LINKS</div>
            <div className="text-xl font-mono text-white">{locations.length * (locations.length - 1)}</div>
          </div>
        </div>
      </GlassPanel>
    )
  }

  return (
    <GlassPanel className="w-full md:w-80 pointer-events-auto flex flex-col">
      <div className="p-4 border-b border-white/10 flex justify-between items-start bg-white/5">
        <div>
          <div className="text-[10px] text-blue-400 font-mono mb-1">{selectedLocation.provider.toUpperCase()}</div>
          <h2 className="text-lg font-bold text-white">{selectedLocation.name}</h2>
          <p className="text-xs text-gray-400">{selectedLocation.region}</p>
        </div>
        <button
          onClick={() => setSelectedLocationId(null)}
          className="text-gray-400 hover:text-white text-xs hover:bg-white/10 p-1 rounded transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Status Indicator */}
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${selectedLocation.status === "operational" ? "bg-green-500" : "bg-red-500"} animate-pulse shadow-[0_0_10px_currentColor]`}
          />
          <span className="text-sm font-mono text-gray-200 uppercase">{selectedLocation.status}</span>
        </div>

        {/* Latency Chart */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase">Latency History (1h)</h4>
            <span className="text-[10px] text-gray-500 font-mono">
              AVG: {Math.round(historyData.reduce((a, b) => a + b, 0) / historyData.length || 0)}ms
            </span>
          </div>
          <div className="h-32 bg-black/20 rounded border border-white/5 p-2">
            <LatencyChart data={historyData} height={120} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/5 p-2 rounded border border-white/5">
            <div className="text-[10px] text-gray-500">PACKET LOSS</div>
            <div className="text-sm font-mono text-white">0.02%</div>
          </div>
          <div className="bg-white/5 p-2 rounded border border-white/5">
            <div className="text-[10px] text-gray-500">UPTIME</div>
            <div className="text-sm font-mono text-white">99.99%</div>
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}
