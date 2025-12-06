// "use client"

// import { useRef } from "react"
// import { useFrame } from "@react-three/fiber"
// import * as THREE from "three"
// import { Sphere } from "@react-three/drei"

// export function Earth({ radius = 2 }: { radius?: number }) {
//   const earthRef = useRef<THREE.Mesh>(null)
//   const cloudsRef = useRef<THREE.Mesh>(null)

//   useFrame(({ clock }) => {
//     if (earthRef.current) {
//       earthRef.current.rotation.y = clock.getElapsedTime() * 0.05
//     }
//     if (cloudsRef.current) {
//       cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.07
//     }
//   })

//   return (
//     <group>
//       {/* Base Earth Sphere */}
//       <Sphere ref={earthRef} args={[radius, 64, 64]}>
//         <meshPhongMaterial color="#111" emissive="#000000" specular="#222" shininess={10} transparent opacity={0.9} />
//       </Sphere>

//       {/* Wireframe Overlay for Cyber Look */}
//       <Sphere ref={cloudsRef} args={[radius + 0.01, 32, 32]}>
//         <meshBasicMaterial color="#333" wireframe transparent opacity={0.1} />
//       </Sphere>

//       {/* Atmosphere Glow */}
//       <Sphere args={[radius + 0.2, 32, 32]}>
//         <meshBasicMaterial color="#0044aa" transparent opacity={0.1} side={THREE.BackSide} />
//       </Sphere>
//     </group>
//   )
// }
"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Sphere } from "@react-three/drei"

export function Earth({ radius = 2 }: { radius?: number }) {
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.07
    }
  })

  return (
    <group>
      {/* Base Earth Sphere */}
      <Sphere ref={earthRef} args={[radius, 64, 64]}>
        <meshPhongMaterial
          color="#1E90FF"        // bright blue (DodgerBlue)
          emissive="#000022"     // subtle dark blue glow
          specular="#88ccff"     // light blue highlights
          shininess={30}         // shinier for a glossy look
          transparent
          opacity={0.95}
        />
      </Sphere>

      {/* Wireframe Overlay for Cyber Look */}
      <Sphere ref={cloudsRef} args={[radius + 0.01, 32, 32]}>
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
      </Sphere>

      {/* Atmosphere Glow */}
      <Sphere args={[radius + 0.2, 32, 32]}>
        <meshBasicMaterial
          color="#3399ff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  )
}