"use client"

import GlobeScene from "@/components/scene/GlobeScene"
import { AppProvider } from "@/lib/store"
import { LatencyList } from "@/components/dashboard/LatencyList"
import { DetailsPanel } from "@/components/dashboard/DetailsPanel"
import { Legend } from "@/components/dashboard/Legend"

export default function Home() {
  return (
    <AppProvider>
      <main className="w-full h-screen relative flex flex-col bg-black overflow-hidden font-sans select-none">
        {/* Background Grid Decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0"></div>

        {/* 3D Map Layer */}
        <div className="absolute inset-0 z-0 cursor-move">
          <GlobeScene />
        </div>

        {/* Legend (Fixed Position) */}
        <Legend />

        {/* UI Overlay Container */}
        <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-between p-4 md:p-6 max-w-[1600px] mx-auto">
          {/* Top Header */}
          <header className="flex justify-between items-start pointer-events-auto">
            <div className="backdrop-blur-sm bg-black/20 p-2 rounded-lg border border-white/5">
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent tracking-tighter filter drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                LATENCY<span className="font-light text-white/50">TOPOLOGY</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-green-500 font-mono bg-green-500/10 px-1 rounded border border-green-500/20">
                  LIVE
                </span>
                <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.2em] font-mono">
                  Network Visualization Terminal
                </p>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-end gap-1">
              <div className="bg-black/80 backdrop-blur border border-green-500/30 px-3 py-1.5 rounded flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <div className="text-[10px] font-mono text-green-400 font-bold">SYSTEM ONLINE</div>
              </div>
              <div className="text-[9px] text-gray-600 font-mono">T+0ms REALTIME</div>
            </div>
          </header>

          {/* Main Dashboard Layout */}
          <div className="flex flex-col md:flex-row items-end justify-between gap-4 mt-auto">
            {/* Left Panel: Latency List */}
            <div className="w-full md:w-auto transform transition-all hover:scale-[1.01] duration-300">
              <LatencyList />
            </div>

            {/* Right Panel: Details/Chart */}
            <div className="w-full md:w-auto transform transition-all hover:scale-[1.01] duration-300">
              <DetailsPanel />
            </div>
          </div>
        </div>
      </main>
    </AppProvider>
  )
}
