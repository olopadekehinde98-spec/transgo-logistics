import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { arcs, hubs } from '../data/content'
import { MAP_LAT_TOP, MAP_LON_LEFT, MAP_ROWS, MAP_STEP } from '../data/worldDots'
import { useMotionOK } from '../hooks/useMediaQuery'
import { EASE } from '../lib/ui'

const R = 210
const CX = 260
const CY = 250
/** Camera centre — Europe/Africa forward, so Lagos, London and Dubai all read. */
const LON0 = 12
const LAT0 = 18
const rad = (d: number) => (d * Math.PI) / 180
/** Labelled sparingly so the globe does not turn into a word cloud. */
const LABELLED = new Set(['Lagos', 'London', 'New York', 'Dubai', 'Nairobi', 'Tokyo'])

/** Orthographic projection: returns null for points on the far side of the globe. */
function project(lat: number, lon: number) {
  const φ = rad(lat)
  const λ = rad(lon - LON0)
  const φ0 = rad(LAT0)
  const cosC = Math.sin(φ0) * Math.sin(φ) + Math.cos(φ0) * Math.cos(φ) * Math.cos(λ)
  if (cosC < 0) return null
  return {
    x: CX + R * Math.cos(φ) * Math.sin(λ),
    y: CY - R * (Math.cos(φ0) * Math.sin(φ) - Math.sin(φ0) * Math.cos(φ) * Math.cos(λ)),
    depth: cosC,
  }
}

/** A curve that arcs away from the globe surface, like a flight path. */
function arcPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = mx - CX
  const dy = my - CY
  const len = Math.hypot(dx, dy) || 1
  const lift = 1 + 0.42 * (Math.hypot(b.x - a.x, b.y - a.y) / (R * 2))
  return `M ${a.x} ${a.y} Q ${CX + (dx / len) * len * lift * 1.25} ${CY + (dy / len) * len * lift * 1.25 - R * 0.28} ${b.x} ${b.y}`
}

/** The network globe: land as dots, lanes as glowing arcs with cargo running along them. */
export function Globe({ className = '' }: { className?: string }) {
  const motionOK = useMotionOK()

  const dots = useMemo(() => {
    const out: { x: number; y: number; d: number }[] = []
    MAP_ROWS.forEach((row, r) => {
      const lat = MAP_LAT_TOP - r * MAP_STEP - MAP_STEP / 2
      for (let c = 0; c < row.length; c++) {
        if (row[c] !== '1') continue
        const lon = MAP_LON_LEFT + c * MAP_STEP + MAP_STEP / 2
        const p = project(lat, lon)
        if (p) out.push({ x: p.x, y: p.y, d: p.depth })
      }
    })
    return out
  }, [])

  const points = useMemo(() => {
    const map: Record<string, { x: number; y: number } | null> = {}
    hubs.forEach((h) => {
      const p = project(h.lat, h.lon)
      map[h.city] = p ? { x: p.x, y: p.y } : null
    })
    return map
  }, [])

  return (
    <svg viewBox="0 0 520 500" className={className} fill="none" role="img" aria-label="Globe showing TransGo trade lanes">
      <defs>
        <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="#0f1c2b" stopOpacity="0.95" />
          <stop offset="88%" stopColor="#12314d" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#1b4b74" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rim" cx="50%" cy="50%" r="50%">
          <stop offset="82%" stopColor="#3aa0ff" stopOpacity="0" />
          <stop offset="97%" stopColor="#3aa0ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3aa0ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sphere + atmosphere */}
      <circle cx={CX} cy={CY} r={R + 26} fill="url(#rim)" />
      <circle cx={CX} cy={CY} r={R} fill="url(#globeGlow)" />
      <circle cx={CX} cy={CY} r={R} stroke="rgba(58,160,255,0.35)" strokeWidth={1} />

      {/* Graticule */}
      <g stroke="rgba(233,238,244,0.07)" strokeWidth={1}>
        {[-60, -30, 0, 30, 60].map((lat) => {
          const p = project(lat, LON0)
          if (!p) return null
          const ry = Math.abs(R * Math.cos(rad(lat)))
          return <ellipse key={lat} cx={CX} cy={p.y} rx={ry} ry={ry * 0.22} />
        })}
        {[-60, -20, 20, 60, 100].map((lon) => (
          <ellipse key={lon} cx={CX} cy={CY} rx={Math.abs(R * Math.sin(rad(lon - LON0))) || 1} ry={R} />
        ))}
      </g>

      {/* Land */}
      <g>
        {dots.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={1.9} fill="rgba(233,238,244,0.42)" opacity={0.35 + p.d * 0.65} />
        ))}
      </g>

      {/* Lanes */}
      {arcs.map((a, i) => {
        const from = points[a.from]
        const to = points[a.to]
        if (!from || !to) return null
        const d = arcPath(from, to)
        return (
          <g key={a.label}>
            <motion.path
              d={d}
              stroke="var(--color-amber)"
              strokeWidth={2}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.25 + i * 0.22, ease: EASE }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(244,113,31,0.55))' }}
            />
            {motionOK && (
              <motion.circle
                r={4.5}
                fill="#fff"
                style={{ offsetPath: `path("${d}")`, filter: 'drop-shadow(0 0 6px rgba(255,148,81,0.9))' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0], offsetDistance: ['0%', '100%'] }}
                transition={{ duration: 4.5, delay: i * 0.8, repeat: Infinity, repeatDelay: 1.2, ease: 'linear' }}
              />
            )}
          </g>
        )
      })}

      {/* Hubs */}
      {hubs.map((h) => {
        const p = points[h.city]
        if (!p) return null
        return (
          <g key={h.city} transform={`translate(${p.x} ${p.y})`}>
            <circle r={9} fill="none" stroke="var(--color-amber)" strokeWidth={1} opacity={0.45} style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'ping-soft 3s ease-out infinite' }} />
            <circle r={3.4} fill="var(--color-amber)" />
            {LABELLED.has(h.city) && (
              <text x={8} y={-7} fontSize={11} fill="rgba(233,238,244,0.72)" fontFamily="var(--font-mono), monospace" letterSpacing={0.6}>
                {h.city}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
