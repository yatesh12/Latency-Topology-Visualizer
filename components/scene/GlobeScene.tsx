"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { Earth } from "./Earth"
import { Markers } from "./Markers"
import { Connections } from "./Connections"
import { Suspense } from "react"
import { useAppStore } from "@/lib/store"

function SceneContent() {
  const { locations } = useAppStore()

  return (
    <>
      <group rotation={[0, 0, 0.2]}>
        <Earth radius={2} />
        <Markers locations={locations} radius={2} />
        <Connections radius={2} />
      </group>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  )
}

export default function GlobeScene() {
  return (
    <div className="w-full h-full bg-black">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>

        <OrbitControls enablePan={false} minDistance={3} maxDistance={12} autoRotate={true} autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
