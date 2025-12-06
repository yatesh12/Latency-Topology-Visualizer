"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { QuadraticBezierLine } from "@react-three/drei"
import type { LatencyData, ServerLocation } from "@/lib/types"
import { latLngToVector3 } from "@/lib/three-utils"
import type { Line2 } from "three-stdlib"

interface ConnectionLineProps {
  data: LatencyData
  source: ServerLocation
  target: ServerLocation
  radius?: number
}

export function ConnectionLine({ data, source, target, radius = 2 }: ConnectionLineProps) {
  const lineRef = useRef<Line2>(null)

  const start = useMemo(() => latLngToVector3(source.location.lat, source.location.lng, radius), [source, radius])
  const end = useMemo(() => latLngToVector3(target.location.lat, target.location.lng, radius), [target, radius])

  // Calculate a control point that creates an arc above the surface
  const mid = useMemo(() => {
    const midPoint = start.clone().add(end).multiplyScalar(0.5)
    const dist = start.distanceTo(end)
    const arcHeight = dist * 0.5
    return midPoint.normalize().multiplyScalar(radius + arcHeight)
  }, [start, end, radius])

  const points = useMemo(
    () => ({
      start: [start.x, start.y, start.z] as [number, number, number],
      end: [end.x, end.y, end.z] as [number, number, number],
      mid: [mid.x, mid.y, mid.z] as [number, number, number],
    }),
    [start, end, mid],
  )

  const color = data.status === "good" ? "#22c55e" : data.status === "warning" ? "#eab308" : "#ef4444"
  const dashSpeed = Math.max(0.2, 50 / data.latencyMs)

  useFrame((state, delta) => {
    if (lineRef.current && lineRef.current.material) {
      // The material type for Line2 is LineMaterial which has dashOffset
      const mat = lineRef.current.material as any
      if (typeof mat.dashOffset === "number") {
        mat.dashOffset -= delta * dashSpeed
      }
    }
  })

  return (
    <QuadraticBezierLine
      ref={lineRef}
      start={points.start}
      end={points.end}
      mid={points.mid}
      color={color}
      lineWidth={1}
      dashed
      dashScale={2}
      dashSize={2}
      dashOffset={0} // Initialize dashOffset
      transparent
      opacity={0.6}
    />
  )
}
