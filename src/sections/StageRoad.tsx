import { motion, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { StageShell } from '../components/StageShell'
import { stages } from '../data/content'
import { useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'
import { Truck } from '../vehicles/Road'

const stage = stages[1]
const TOTAL_KM = 142

/**
 * Stage 02 — the truck holds the frame while the world slides past it:
 * hills, poles and road markings move at three different rates.
 */
export function StageRoad({ index }: { index: number }) {
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const p = useSectionProgress(ref, ['start start', 'end end'])
  const [km, setKm] = useState(0)

  const hillsX = useTransform(p, [0, 1], ['6%', '-26%'])
  const polesX = useTransform(p, [0, 1], ['12%', '-62%'])
  const roadX = useTransform(p, [0, 1], ['0%', '-140%'])
  const spin = useTransform(p, [0, 1], [0, 2400])
  const truckBob = useTransform(p, [0, 0.25, 0.5, 0.75, 1], [0, -3, 0, -3, 0])

  useEffect(() => {
    if (!motionOK) {
      setKm(TOTAL_KM)
      return
    }
    return p.on('change', (v) => setKm(Math.round(Math.min(Math.max(v, 0), 1) * TOTAL_KM)))
  }, [p, motionOK])

  return (
    <StageShell stage={stage} index={index} sectionRef={ref} height="280vh" align="right">
      <div className="absolute inset-0">
        {/* Distant hills */}
        <motion.svg
          viewBox="0 0 1400 220"
          className="absolute right-0 bottom-[22%] left-0 w-[160%] text-fog opacity-[0.16]"
          fill="none"
          aria-hidden
          style={motionOK ? { x: hillsX } : undefined}
        >
          <path d="M0 220L180 96l140 70 180-120 200 130 160-70 240 110 300-60v64H0z" fill="currentColor" opacity="0.5" />
        </motion.svg>

        {/* Poles */}
        <motion.div className="absolute right-0 bottom-[20%] left-0 flex w-[220%] justify-between" style={motionOK ? { x: polesX } : undefined} aria-hidden>
          {Array.from({ length: 14 }, (_, i) => (
            <svg key={i} viewBox="0 0 60 160" className="h-[150px] w-[60px] text-fog opacity-25" fill="none">
              <path d="M30 160V20" stroke="currentColor" strokeWidth="3" />
              <path d="M12 30h36M16 44h28" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          ))}
        </motion.div>

        {/* Truck */}
        <motion.div className="absolute bottom-[13%] left-1/2 w-[min(58%,620px)] -translate-x-1/2" style={motionOK ? { y: truckBob } : undefined}>
          <Truck className="w-full" spin={motionOK ? spin : undefined} />
        </motion.div>

        {/* Road + centre line */}
        <div className="absolute right-0 bottom-[12%] left-0 h-px bg-fog/25" />
        <div className="absolute right-0 bottom-0 left-0 h-[12%] overflow-hidden">
          <motion.div className="flex w-[300%] gap-10 pt-6" style={motionOK ? { x: roadX } : undefined} aria-hidden>
            {Array.from({ length: 40 }, (_, i) => (
              <span key={i} className="h-[3px] w-20 shrink-0 bg-fog/25" />
            ))}
          </motion.div>
        </div>

        {/* Odometer */}
        <div className="panel absolute top-0 right-0 px-4 py-3 font-mono">
          <p className="text-[10.5px] tracking-[0.18em] text-muted">INLAND HAUL</p>
          <p className="mt-1 text-[1.5rem] text-fog tabular-nums">
            {km}
            <span className="ml-1 text-[12px] text-muted">/ {TOTAL_KM} km</span>
          </p>
          <div className="mt-2 h-px w-full bg-line">
            <motion.div className="h-px origin-left bg-amber" style={motionOK ? { scaleX: p } : { scaleX: 1 }} />
          </div>
        </div>
      </div>
    </StageShell>
  )
}
