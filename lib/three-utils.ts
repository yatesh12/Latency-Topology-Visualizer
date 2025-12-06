import * as THREE from "three"

export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)

  return new THREE.Vector3(x, y, z)
}

// Get intermediate point for quadratic bezier curve (arc)
export function getSplineFromCoords(p1: THREE.Vector3, p2: THREE.Vector3): THREE.Vector3[] {
  const dist = p1.distanceTo(p2)

  // Midpoint
  const mid = p1.clone().add(p2).multiplyScalar(0.5)

  // Push midpoint out from center to create arc
  const midLength = mid.length()
  mid.normalize().multiplyScalar(midLength + dist * 0.25)

  return [p1, mid, p2]
}
