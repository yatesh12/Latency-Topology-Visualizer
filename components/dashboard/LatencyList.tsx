"use client"

import { useAppStore } from "@/lib/store"
import { GlassPanel } from "@/components/ui/GlassPanel"

export function LatencyList() {
  const { latencyData, locations, setSelectedLocationId } = useAppStore()

  // Sort by latency (highest first to show issues)
  const sortedData = [...latencyData].sort((a, b) => b.latencyMs - a.latencyMs)

  return (
    <GlassPanel className="h-64 md:h-96 w-full md:w-80 flex flex-col pointer-events-auto">
      <div className="p-3 border-b border-white/10 bg-white/5 flex justify-between items-center">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Feeds</h3>
        <span className="text-[10px] text-gray-400 font-mono animate-pulse">● LIVE</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
        {sortedData.map((data, i) => {
          const source = locations.find((l) => l.id === data.sourceId)
          const target = locations.find((l) => l.id === data.targetId)
          if (!source || !target) return null

          return (
            <div
              key={`${data.sourceId}-${data.targetId}`}
              className="group flex items-center justify-between p-2 rounded hover:bg-white/10 cursor-pointer transition-colors text-xs"
              onClick={() => setSelectedLocationId(source.id)}
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-200">{source.name}</span>
                <span className="text-[10px] text-gray-500">→ {target.name}</span>
              </div>
              <div
                className={`font-mono font-bold ${
                  data.status === "critical"
                    ? "text-red-500"
                    : data.status === "warning"
                      ? "text-yellow-500"
                      : "text-green-500"
                }`}
              >
                {data.latencyMs}ms
              </div>
            </div>
          )
        })}
      </div>
    </GlassPanel>
  )
}
