import { motion, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { StageShell } from '../components/StageShell'
import { stages } from '../data/content'
import { useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'
import { Forklift } from '../vehicles/Yard'

const stage = stages[0]

/**
 * Stage 01 — the forklift drives in, raises the pallet and loads the trailer.
 * Everything is one scroll value: approach → lift → load → doors sealed.
 */
export function StageWarehouse({ index }: { index: number }) {
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const p = useSectionProgress(ref, ['start start', 'end end'])

  // Approach, then carry the pallet into the trailer.
  const forkX = useTransform(p, [0.04, 0.34, 0.58, 0.82], ['-12%', '6%', '6%', '46%'])
  const lift = useTransform(p, [0.34, 0.56], [0, -104])
  const spin = useTransform(p, [0.04, 0.34, 0.58, 0.82], [0, 420, 420, 900])
  const forkFade = useTransform(p, [0.82, 0.92], [1, 0.15])
  const doorsClose = useTransform(p, [0.84, 0.96], [0, 1])
  const sealed = useTransform(p, [0.9, 0.97], [0, 1])
  const loadedBox = useTransform(p, [0.78, 0.86], [0, 1])

  const still = { opacity: 1 }

  return (
    <StageShell stage={stage} index={index} sectionRef={ref} height="300vh">
      <div className="absolute inset-x-0 bottom-0 h-full">
        {/* Floor line */}
        <div className="absolute right-0 bottom-[14%] left-0 h-px bg-fog/15" />

        {/* Trailer waiting at the dock */}
        <div className="absolute right-[2%] bottom-[14%] w-[min(46%,560px)]">
          <svg viewBox="0 0 520 240" className="w-full text-fog" fill="none" aria-hidden>
            <rect x="30" y="24" width="460" height="164" rx="3" fill="#0f151d" stroke="currentColor" strokeWidth="2.5" />
            <path d="M30 60h460" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
            {/* Loaded pallet appears inside once the forklift has been in */}
            <motion.g style={motionOK ? { opacity: loadedBox } : still}>
              <rect x="70" y="96" width="120" height="84" rx="2" fill="#1a2430" stroke="currentColor" strokeWidth="2" />
              <rect x="98" y="112" width="60" height="22" rx="1.5" fill="var(--color-amber)" opacity="0.9" />
            </motion.g>
            {/* Doors swing shut */}
            <motion.g style={motionOK ? { scaleX: doorsClose } : { scaleX: 1 }} className="origin-right">
              <rect x="330" y="24" width="160" height="164" fill="#131b24" stroke="currentColor" strokeWidth="2.5" />
              <path d="M410 24v164" stroke="currentColor" strokeWidth="1.6" opacity="0.5" />
              <rect x="396" y="92" width="28" height="30" rx="2" fill="none" stroke="var(--color-amber)" strokeWidth="2" />
            </motion.g>
            <rect x="30" y="188" width="460" height="10" fill="#0b1016" stroke="currentColor" strokeWidth="2" />
            <circle cx="140" cy="214" r="18" fill="#0b0f14" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="196" cy="214" r="18" fill="#0b0f14" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="404" cy="214" r="18" fill="#0b0f14" stroke="currentColor" strokeWidth="2.5" />
          </svg>

          <motion.div
            style={motionOK ? { opacity: sealed } : still}
            className="absolute -top-2 right-2 border border-signal/70 px-3 py-1.5 font-mono text-[11px] tracking-[0.2em] text-signal"
          >
            DOORS SEALED
          </motion.div>
        </div>

        {/* Forklift */}
        <motion.div
          className="absolute bottom-[10%] left-0 w-[min(30%,330px)]"
          style={motionOK ? { x: forkX, opacity: forkFade } : { x: '6%' }}
        >
          <Forklift className="w-full" lift={motionOK ? lift : undefined} spin={motionOK ? spin : undefined} />
        </motion.div>

        {/* Racking silhouettes for depth */}
        <svg viewBox="0 0 900 300" className="absolute inset-x-0 bottom-[14%] -z-10 w-full text-fog opacity-[0.12]" fill="none" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${i * 230} 0)`}>
              <path d="M20 300V40h180v260" stroke="currentColor" strokeWidth="3" />
              <path d="M20 110h180M20 180h180M20 250h180" stroke="currentColor" strokeWidth="3" />
            </g>
          ))}
        </svg>
      </div>
    </StageShell>
  )
}
