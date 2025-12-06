"use client"

import { GlassPanel } from "@/components/ui/GlassPanel"

export function Legend() {
  const items = [
    { label: "Exchange", color: "#a855f7" },
    { label: "AWS", color: "#ff9900" },
    { label: "GCP", color: "#4285f4" },
    { label: "Azure", color: "#0078d4" },
  ]

  const status = [
    { label: "< 80ms", color: "#22c55e" }, // Green
    { label: "80-150ms", color: "#eab308" }, // Yellow
    { label: "> 150ms", color: "#ef4444" }, // Red
  ]

  return (
    <GlassPanel className="absolute top-20 right-4 md:right-6 w-40 p-3 pointer-events-auto">
      <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wider">Node Types</h4>
      <div className="space-y-1.5 mb-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs">
            <span
              className="w-2 h-2 rounded-full shadow-[0_0_5px_currentColor]"
              style={{ backgroundColor: item.color, color: item.color }}
            />
            <span className="text-gray-300">{item.label}</span>
          </div>
        ))}
      </div>

      <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wider">Latency</h4>
      <div className="space-y-1.5">
        {status.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs">
            <span className="w-3 h-0.5" style={{ backgroundColor: item.color }} />
            <span className="text-gray-300">{item.label}</span>
          </div>
        ))}
      </div>
    </GlassPanel>
  )
}
