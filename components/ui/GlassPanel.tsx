import type { ReactNode } from "react"

interface GlassPanelProps {
  children: ReactNode
  className?: string
}

export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div className={`bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden ${className}`}>
      {children}
    </div>
  )
}
