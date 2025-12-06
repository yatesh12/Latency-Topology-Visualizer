"use client"

import { useMemo } from "react"

interface LatencyChartProps {
  data: number[]
  height?: number
  color?: string
}

export function LatencyChart({ data, height = 100, color = "#22c55e" }: LatencyChartProps) {
  const points = useMemo(() => {
    if (data.length === 0) return ""

    const max = Math.max(...data, 100) * 1.1 // 10% headroom
    const min = 0
    const width = 100 // viewbox width percentage

    return data
      .map((val, i) => {
        const x = (i / (data.length - 1)) * width
        const y = height - ((val - min) / (max - min)) * height
        return `${x},${y}`
      })
      .join(" ")
  }, [data, height])

  if (data.length === 0)
    return <div className="h-full flex items-center justify-center text-xs text-gray-500">No Data</div>

  return (
    <div className="w-full relative" style={{ height }}>
      <svg className="w-full h-full overflow-visible" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
        {/* Grid lines */}
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="0"
          stroke="white"
          strokeOpacity="0.1"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="0"
          y1={height / 2}
          x2="100"
          y2={height / 2}
          stroke="white"
          strokeOpacity="0.1"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="0"
          y1={height}
          x2="100"
          y2={height}
          stroke="white"
          strokeOpacity="0.1"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />

        {/* The Chart Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Area fill (optional, simplified) */}
        <polygon points={`0,${height} ${points} 100,${height}`} fill={color} fillOpacity="0.1" />
      </svg>
    </div>
  )
}
