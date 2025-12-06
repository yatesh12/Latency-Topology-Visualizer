**Latency Topology Visualizer** is a Next.js TypeScript application that renders an interactive 3D globe showing cryptocurrency exchange server locations, cloud provider regions, and both real‑time and historical latency between sites. It combines Three.js visualization, real‑time telemetry adapters, and time‑series analytics to help monitor and explore trading infrastructure latency topology.

---

## Features

- **Interactive 3D globe** with smooth camera controls, pan, zoom, and rotate.  
- **Exchange server markers** with hover and click details: exchange name, location, cloud provider.  
- **Cloud provider regions** for AWS, GCP, and Azure with distinct visual styling.  
- **Real‑time latency visualization** using animated connections, pulse effects, and color coding for latency ranges.  
- **Historical latency charts** with selectable ranges and statistics: min, max, average.  
- **Control panel** for filtering by exchange, provider, and latency thresholds; search and layer toggles.  
- **Responsive UI** with touch controls and mobile optimizations.  
- **Mock API** for local development and pluggable adapters for production telemetry.

---

## Tech Stack and Architecture

**Frontend**
- **Next.js** with TypeScript for routing and SSR.  
- **Three.js** or **React Three Fiber** for 3D rendering.  
- **Charting** library (Chart.js, Recharts, or similar) for time series.  
- **React Context and hooks** for state management.

**Data and Telemetry**
- **Local curated data** for server locations and region metadata.  
- **Telemetry adapters** normalize external APIs or mock streams into a common schema: `Server` and `LatencySample`.  
- **Realtime transport**: WebSocket preferred; polling fallback configurable.  
- **Caching**: short TTL caches for API responses and client-side memoization for rendering.

**Performance**
- Marker instancing and LOD to reduce draw calls.  
- Throttled rendering of telemetry updates.  
- requestAnimationFrame for animations and efficient scene updates.

---

## Getting Started

### Prerequisites
- **Node.js 18+** and npm or pnpm  
- Git

### Install
```bash
git clone https://github.com/yatesh12/Latency-Topology-Visualizer.git
cd Latency-Topology-Visualizer
npm install
# or
pnpm install
```

### Environment
Create `.env.local` from `.env.example` and set the following variables:

```
NEXT_PUBLIC_API_BASE_URL=https://your-api.example.com
NEXT_PUBLIC_LATENCY_POLL_INTERVAL=5000
NEXT_PUBLIC_USE_MOCK=true
```

- **NEXT_PUBLIC_API_BASE_URL**: URL for telemetry adapter or mock server.  
- **NEXT_PUBLIC_LATENCY_POLL_INTERVAL**: Poll interval in milliseconds.  
- **NEXT_PUBLIC_USE_MOCK**: `true` to use the included mock telemetry for local development.

### Run Locally
```bash
npm run dev
# open http://localhost:3000
```

### Build and Start
```bash
npm run build
npm run start
```

---

## Project Structure

```
app/                # Next.js pages and global styles
components/         # UI and scene components
  scene/            # Globe, markers, connections
  dashboard/        # Charts, lists, legend
  ui/               # Reusable UI primitives
lib/                # data, mock API, utilities, types
hooks/              # custom hooks
public/             # static assets
styles/             # global styles
```

**Key files**
- `lib/data.ts` — curated server and region metadata.  
- `lib/mock-api.ts` — simulated telemetry for development.  
- `components/scene/GlobeScene.tsx` — Three.js scene orchestration.  
- `components/dashboard/LatencyChart.tsx` — historical charts and stats.

---

## Development Notes and Best Practices

- **Marker instancing** reduces GPU overhead for many markers.  
- **Throttle telemetry rendering** to avoid frame drops; update visuals at a lower rate than telemetry ingestion if needed.  
- **Validate external data** and show confidence indicators for unverified samples.  
- **Accessibility**: keyboard navigation for control panel and ARIA labels for interactive elements.  
- **Testing**: unit tests for adapters and validators; integration tests for UI flows.  
- **Linting and formatting**: ESLint and Prettier configured; run linters before commits.

---

## Contributing and License

**Contributing**
- Fork the repository, create a feature branch, and open a pull request with a clear description and screenshots.  
- Add tests for new adapters or major UI changes.  
- Follow the existing code style and run linters before submitting.

**License**
- This project is released under the **MIT License**. Add a `LICENSE` file with the MIT text in the repository root.

---

## Deployment and Submission Checklist

- Provide a short demo video showing core features and a code walkthrough.  
- Include a README with run instructions and assumptions.  
- Ensure `.env.example` documents required environment variables.  
- Document third‑party libraries and data sources in the README.  
- Provide a public GitHub repository link and, if available, a live preview URL.

