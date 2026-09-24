import { motion, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { StageShell } from '../components/StageShell'
import { stages } from '../data/content'
import { useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'
import { Ship, Wake } from '../vehicles/SeaAir'

const stage = stages[3]
const DAYS = 26
const WAYPOINTS = ['Yantian', 'Singapore', 'Colombo', 'Suez', 'Algeciras', 'Rotterdam']

/** Stage 04 — the long leg: the vessel crosses while a route arc fills behind it. */
export function StageOcean({ index }: { index: number }) {
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const p = useSectionProgress(ref, ['start start', 'end end'])
  const [day, setDay] = useState(1)

  const shipX = useTransform(p, [0, 1], ['-18%', '46%'])
  const bob = useTransform(p, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -8, 2, -6, 1, -4])
  const wakeX = useTransform(p, [0, 1], ['-40%', '20%'])
  const swellX = useTransform(p, [0, 1], ['0%', '-30%'])

  useEffect(() => {
    if (!motionOK) {
      setDay(DAYS)
      return
    }
    return p.on('change', (v) => setDay(Math.max(1, Math.round(Math.min(Math.max(v, 0), 1) * DAYS))))
  }, [p, motionOK])

  const legIndex = Math.min(WAYPOINTS.length - 1, Math.floor((day / DAYS) * WAYPOINTS.length))

  return (
    <StageShell stage={stage} index={index} sectionRef={ref} height="300vh">
      <div className="absolute inset-0">
        {/* Route arc */}
        <div className="panel absolute top-0 right-0 w-[min(92%,420px)] px-4 py-3">
          <div className="flex items-center justify-between font-mono text-[10.5px] tracking-[0.18em] text-muted">
            <span>SZX</span>
            <span className="text-amber">DAY {String(day).padStart(2, '0')} / {DAYS}</span>
            <span>RTM</span>
          </div>
          <svg viewBox="0 0 360 90" className="mt-2 w-full text-fog" fill="none" aria-hidden>
            <path d="M14 74C90 6 270 6 346 74" stroke="currentColor" strokeWidth="1.5" opacity="0.25" strokeDasharray="4 6" />
            <motion.path
              d="M14 74C90 6 270 6 346 74"
              stroke="var(--color-amber)"
              strokeWidth="2"
              strokeLinecap="round"
              style={motionOK ? { pathLength: p } : { pathLength: 1 }}
            />
            <circle cx="14" cy="74" r="4" fill="var(--color-fog)" />
            <circle cx="346" cy="74" r="4" fill="none" stroke="var(--color-fog)" strokeWidth="2" />
          </svg>
          <p className="mt-1 font-mono text-[11px] text-fog">
            Now passing <span className="text-amber">{WAYPOINTS[legIndex]}</span>
          </p>
        </div>

        {/* Swell lines */}
        <motion.div className="absolute right-0 bottom-[16%] left-0 w-[160%]" style={motionOK ? { x: swellX } : undefined} aria-hidden>
          <svg viewBox="0 0 1400 120" className="w-full text-fog opacity-20" fill="none">
            <path d="M0 40q60-18 120 0t120 0 120 0 120 0 120 0 120 0 120 0 120 0 120 0 120 0" stroke="currentColor" strokeWidth="2" />
            <path d="M0 80q60-18 120 0t120 0 120 0 120 0 120 0 120 0 120 0 120 0 120 0 120 0" stroke="currentColor" strokeWidth="2" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Vessel */}
        <motion.div className="absolute bottom-[18%] left-0 w-[min(64%,760px)]" style={motionOK ? { x: shipX, y: bob } : { x: '20%' }}>
          <Ship className="w-full" />
        </motion.div>
        <motion.div className="absolute bottom-[14%] left-0 w-[min(70%,820px)]" style={motionOK ? { x: wakeX } : undefined} aria-hidden>
          <Wake className="w-full" />
        </motion.div>

        {/* Waterline */}
        <div className="absolute right-0 bottom-[16%] left-0 h-px bg-fog/20" />
        <div className="absolute right-0 bottom-0 left-0 h-[16%] bg-gradient-to-b from-transparent to-steel/60" />
      </div>
    </StageShell>
  )
}
