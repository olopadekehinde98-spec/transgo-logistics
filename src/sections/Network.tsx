import { motion, useInView } from 'framer-motion'
import { Plane, Ship, Train, Truck } from 'lucide-react'
import { memo, useRef, type ReactElement } from 'react'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { arcs, hubs, network } from '../data/content'
import { MAP_LAT_TOP, MAP_LON_LEFT, MAP_ROWS, MAP_STEP } from '../data/worldDots'
import { useCountUp } from '../hooks/useCountUp'
import { useMotionOK } from '../hooks/useMediaQuery'
import { EASE, useUI } from '../lib/ui'

const CELL = 10
const MW = MAP_ROWS[0].length * CELL
const MH = MAP_ROWS.length * CELL
const modeIcon: Record<string, typeof Ship> = { Ocean: Ship, Air: Plane, Road: Truck, Rail: Train }

const project = (lat: number, lon: number) => ({
  x: ((lon - MAP_LON_LEFT) / MAP_STEP) * CELL,
  y: ((MAP_LAT_TOP - lat) / MAP_STEP) * CELL,
})

const Dots = memo(function Dots() {
  const circles: ReactElement[] = []
  MAP_ROWS.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      if (row[c] === '1') circles.push(<circle key={`${r}-${c}`} cx={c * CELL + CELL / 2} cy={r * CELL + CELL / 2} r={2.2} />)
    }
  })
  return <g fill="rgba(233,238,244,0.16)">{circles}</g>
})

function Stat({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const whole = Number.isInteger(value)
  const n = useCountUp(whole ? value : Math.round(value * 10), start, 1500)
  const shown = whole ? n.toLocaleString() : (n / 10).toFixed(1)
  return (
    <div>
      <p className="font-display text-[2.2rem] leading-none font-bold tabular-nums md:text-[2.8rem]">
        <span aria-hidden>
          {shown}
          <span className="text-amber">{suffix}</span>
        </span>
        <span className="sr-only">
          {value}
          {suffix}
        </span>
      </p>
      <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{label}</p>
    </div>
  )
}

/** Cargo without borders: the live lane map. */
export function Network() {
  const { open } = useUI()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const motionOK = useMotionOK()
  const pos = Object.fromEntries(hubs.map((h) => [h.city, project(h.lat, h.lon)]))

  return (
    <section id="network" className="relative overflow-hidden border-t border-line bg-steel py-20 md:py-24">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="frame relative grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
        <div ref={ref}>
          <p className="data mb-4 text-amber">A global network</p>
          <SplitLines className="h-display text-[clamp(2rem,4.4vw,3.4rem)] uppercase" lines={['Your cargo', 'without borders']} />

          <div className="mt-9 grid grid-cols-2 gap-x-10 gap-y-7 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-2">
            {network.stats.map((s) => (
              <Stat key={s.label} {...s} start={inView} />
            ))}
          </div>

          <Reveal delay={0.1} className="mt-9">
            <button type="button" onClick={() => open({ kind: 'quote' })} className="btn-amber">
              Our Global Network
            </button>
          </Reveal>
        </div>

        {/* Map */}
        <div className="relative">
          <svg viewBox={`0 0 ${MW} ${MH}`} className="w-full" fill="none" role="img" aria-label="World map showing TransGo trade lanes">
            <Dots />
            {arcs.map((a, i) => {
              const from = pos[a.from]
              const to = pos[a.to]
              if (!from || !to) return null
              const mx = (from.x + to.x) / 2
              const my = Math.min(from.y, to.y) - Math.max(40, Math.abs(to.x - from.x) * 0.22)
              return (
                <g key={a.label}>
                  <motion.path
                    d={`M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`}
                    stroke="var(--color-amber)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.9 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, delay: 0.2 + i * 0.25, ease: EASE }}
                  />
                  {motionOK && (
                    <motion.circle
                      r={5}
                      fill="var(--color-amber-soft)"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: [0, 1, 1, 0], offsetDistance: ['0%', '100%'] }}
                      viewport={{ once: false }}
                      transition={{ duration: 4, delay: i * 0.6, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
                      style={{ offsetPath: `path("M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}")` }}
                    />
                  )}
                </g>
              )
            })}
            {hubs.map((h) => {
              const q = pos[h.city]
              return (
                <g key={h.city} transform={`translate(${q.x} ${q.y})`}>
                  <circle r={10} fill="none" stroke="var(--color-amber)" strokeWidth={1} vectorEffect="non-scaling-stroke" opacity={0.5} />
                  <circle r={4} fill="var(--color-amber)" />
                </g>
              )
            })}
          </svg>

          {/* Live lane callouts */}
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {arcs.map((a, i) => (
              <motion.li
                key={a.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="panel flex items-center gap-3 px-3.5 py-2.5"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" style={{ animation: 'blink 2s ease-in-out infinite' }} />
                <span className="min-w-0 truncate font-mono text-[11.5px] text-fog">{a.label}</span>
                <span className="ml-auto shrink-0 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">{a.status}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Frequent lanes */}
      <div className="frame relative mt-14">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted">FREQUENT LANES</p>
        <ul className="mt-5 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {network.lanes.map((lane, i) => {
            const Icon = modeIcon[lane.mode] ?? Truck
            return (
              <motion.li
                key={`${lane.from}-${lane.to}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group flex items-center gap-4 bg-night px-5 py-5 transition-colors hover:bg-steel"
              >
                <Icon className="h-5 w-5 shrink-0 text-amber" strokeWidth={1.6} />
                <div className="min-w-0">
                  <p className="truncate font-display text-[1.02rem] font-medium">
                    {lane.from} <span className="text-muted">→</span> {lane.to}
                  </p>
                  <p className="mt-0.5 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">
                    {lane.mode} · {lane.days}
                  </p>
                </div>
                <span className="ml-auto shrink-0 font-mono text-[10px] tracking-[0.12em] text-muted uppercase">{lane.status}</span>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
