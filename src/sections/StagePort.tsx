import { motion, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { StageShell } from '../components/StageShell'
import { stages } from '../data/content'
import { useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'
import { Container } from '../vehicles/Yard'
import { GantryCrane, Plane } from '../vehicles/SeaAir'

const stage = stages[2]

/**
 * Stage 03 — the crane picks the box off the quay and stacks it aboard.
 * The visitor can switch the same shipment to air freight and watch it load instead.
 */
export function StagePort({ index }: { index: number }) {
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const p = useSectionProgress(ref, ['start start', 'end end'])
  const [mode, setMode] = useState<'sea' | 'air'>('sea')

  // Trolley travels out over the ship, lowers, releases.
  const trolley = useTransform(p, [0.08, 0.42, 0.72], [0, 0, 300])
  const hoist = useTransform(p, [0.12, 0.34, 0.5, 0.68, 0.86], [-120, 0, 0, 0, 60])
  const quayBox = useTransform(p, [0.28, 0.34], [1, 0])
  const shipBox = useTransform(p, [0.84, 0.9], [0, 1])
  const planeX = useTransform(p, [0.1, 0.95], ['-4%', '58%'])
  const planeLift = useTransform(p, [0.55, 0.95], [0, -90])
  const beltLoad = useTransform(p, [0.1, 0.5], [0, 1])

  return (
    <StageShell stage={stage} index={index} sectionRef={ref} height="300vh">
      <div className="absolute inset-0">
        {/* Mode switch */}
        <div className="pointer-events-auto absolute top-0 right-0 flex border border-line font-mono text-[11px] tracking-[0.16em]">
          {(['sea', 'air'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`px-4 py-2.5 uppercase transition-colors duration-300 ${mode === m ? 'bg-amber text-night' : 'text-muted hover:text-fog'}`}
            >
              {m === 'sea' ? 'Ocean' : 'Air'}
            </button>
          ))}
        </div>

        {mode === 'sea' ? (
          <div className="absolute inset-0">
            {/* Crane */}
            <div className="absolute top-[4%] left-[2%] h-[78%] w-[min(60%,720px)]">
              <GantryCrane className="h-full w-full" trolley={motionOK ? trolley : undefined} hoist={motionOK ? hoist : undefined} />
            </div>

            {/* Quay stack — one box leaves when the crane takes it */}
            <div className="absolute bottom-[12%] left-[6%] flex w-[min(24%,240px)] flex-col gap-1">
              <motion.div style={motionOK ? { opacity: quayBox } : undefined}>
                <Container className="w-full" accent />
              </motion.div>
              <Container className="w-full" />
              <Container className="w-full" />
            </div>

            {/* Vessel taking the load */}
            <div className="absolute right-[2%] bottom-[10%] w-[min(46%,560px)]">
              <div className="relative">
                <motion.div className="absolute -top-[18%] left-[26%] w-[22%]" style={motionOK ? { opacity: shipBox } : undefined}>
                  <Container className="w-full" accent />
                </motion.div>
                <svg viewBox="0 0 560 150" className="w-full text-fog" fill="none" aria-hidden>
                  <rect x="60" y="20" width="440" height="42" rx="2" fill="#121a23" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                  <path d="M30 62h500v30c0 16-13 29-29 29H88c-20 0-38-12-45-30L30 62z" fill="#121a23" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M44 86h472" stroke="var(--color-amber)" strokeWidth="2.5" opacity="0.8" />
                </svg>
              </div>
            </div>
            <div className="absolute right-0 bottom-[9%] left-0 h-px bg-fog/15" />
          </div>
        ) : (
          <div className="absolute inset-0">
            {/* Apron + freighter */}
            <motion.div className="absolute bottom-[26%] left-0 w-[min(62%,700px)]" style={motionOK ? { x: planeX, y: planeLift } : undefined}>
              <Plane className="w-full" />
            </motion.div>

            {/* Belt loader feeding the hold */}
            <div className="absolute bottom-[12%] left-[10%] w-[min(26%,280px)]">
              <svg viewBox="0 0 280 150" className="w-full text-fog" fill="none" aria-hidden>
                <path d="M20 132h240" stroke="currentColor" strokeWidth="2.5" />
                <path d="M46 132L210 46" stroke="currentColor" strokeWidth="4" />
                <path d="M46 132L210 46" stroke="var(--color-amber)" strokeWidth="1.5" strokeDasharray="8 10" style={{ animation: 'dash-run 1.4s linear infinite' }} />
                <circle cx="70" cy="140" r="10" fill="#0b0f14" stroke="currentColor" strokeWidth="2" />
                <circle cx="190" cy="140" r="10" fill="#0b0f14" stroke="currentColor" strokeWidth="2" />
                <motion.rect
                  x="150"
                  y="70"
                  width="40"
                  height="28"
                  rx="2"
                  fill="#3a2708"
                  stroke="var(--color-amber)"
                  strokeWidth="2"
                  style={motionOK ? { opacity: beltLoad } : undefined}
                />
              </svg>
            </div>
            <div className="absolute right-0 bottom-[11%] left-0 h-px bg-fog/15" />
            <p className="absolute bottom-[4%] left-0 max-w-[420px] font-mono text-[11px] leading-relaxed tracking-[0.14em] text-muted">
              AIR OPTION · SZX → FRA · 2 DAYS DOOR TO DOOR · +312% FREIGHT COST
            </p>
          </div>
        )}
      </div>
    </StageShell>
  )
}
