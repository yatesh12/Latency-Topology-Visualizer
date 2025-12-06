"use client"

import { useState, useMemo } from "react"
import { Html } from "@react-three/drei"
import type { ServerLocation } from "@/lib/types"
import { latLngToVector3 } from "@/lib/three-utils"
import { useAppStore } from "@/lib/store"
import * as THREE from "three"

interface MarkersProps {
  locations: ServerLocation[]
  radius?: number
}

export function Markers({ locations = [], radius = 2 }: MarkersProps) {
  const [hovered, setHovered] = useState<string | null>(null)
  const { setSelectedLocationId, selectedLocationId } = useAppStore()

  const positions = useMemo(() => {
    if (!locations) return []
    return locations.map((loc) => {
      const vec = latLngToVector3(loc.location.lat, loc.location.lng, radius)
      return [vec.x, vec.y, vec.z] as [number, number, number]
    })
  }, [locations, radius])

  if (!locations || locations.length === 0) return null

  return (
    <group>
      {locations.map((loc, index) => {
        const position = positions[index]
        if (!position) return null

        const isSelected = selectedLocationId === loc.id
        const isHovered = hovered === loc.id

        const color =
          loc.provider === "AWS"
            ? "#ff9900"
            : loc.provider === "GCP"
              ? "#4285f4"
              : loc.provider === "Azure"
                ? "#0078d4"
                : "#a855f7"

        const scale = isSelected || isHovered ? 1.5 : 1

        return (
          <group key={loc.id} position={position}>
            <mesh
              visible={false}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedLocationId(loc.id === selectedLocationId ? null : loc.id)
              }}
              onPointerOver={() => {
                document.body.style.cursor = "pointer"
                setHovered(loc.id)
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto"
                setHovered(null)
              }}
            >
              <sphereGeometry args={[0.15, 8, 8]} />
              <meshBasicMaterial />
            </mesh>

            <mesh scale={[scale, scale, scale]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>

            <mesh scale={[scale, scale, scale]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color={color} transparent opacity={0.4} toneMapped={false} />
            </mesh>

            {isSelected && (
              <mesh>
                <ringGeometry args={[0.1, 0.12, 32]} />
                <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} toneMapped={false} />
              </mesh>
            )}

            {(isHovered || isSelected) && (
              <Html distanceFactor={10} zIndexRange={[100, 0]}>
                <div
                  className={`
                    bg-black/90 backdrop-blur-md border p-2 rounded text-xs whitespace-nowrap text-white 
                    transform -translate-x-1/2 -translate-y-[150%] pointer-events-none transition-all duration-200
                    ${isSelected ? "border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]" : "border-gray-700"}
                  `}
                >
                  <div className="font-bold flex items-center gap-2">
                    {loc.name}
                    {isSelected && <span className="text-[8px] bg-white text-black px-1 rounded">SELECTED</span>}
                  </div>
                  <div className="text-gray-400 text-[10px]">
                    {loc.provider} • {loc.region}
                  </div>
                </div>
              </Html>
            )}
          </group>
        )
      })}
    </group>
  )
}
