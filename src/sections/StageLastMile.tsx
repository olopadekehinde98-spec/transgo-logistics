import { motion, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { StageShell } from '../components/StageShell'
import { stages } from '../data/content'
import { useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'
import { Van } from '../vehicles/Road'
import { Courier } from '../vehicles/Yard'

const stage = stages[5]

/**
 * Stage 06 — the van pulls up, the courier walks the parcel to the door,
 * the signature is captured and the file closes.
 */
export function StageLastMile({ index }: { index: number }) {
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const p = useSectionProgress(ref, ['start start', 'end end'])

  const vanX = useTransform(p, [0.02, 0.3], ['-40%', '0%'])
  const vanSpin = useTransform(p, [0.02, 0.3], [0, 760])
  const courierOpacity = useTransform(p, [0.34, 0.4], [0, 1])
  const courierX = useTransform(p, [0.36, 0.68], ['0%', '190%'])
  const stride = useTransform(p, [0.36, 0.44, 0.52, 0.6, 0.68], [0, 16, -16, 16, 0])
  const doorOpen = useTransform(p, [0.7, 0.8], [0, 1])
  const doorScale = useTransform(doorOpen, (v) => 1 - v * 0.78)
  const glowOpacity = useTransform(p, [0.7, 0.82], [0, 1])
  const signature = useTransform(p, [0.82, 0.96], [0, 1])
  const deliveredOpacity = useTransform(p, [0.88, 0.96], [0, 1])
  const cityX = useTransform(p, [0, 1], ['4%', '-8%'])

  return (
    <StageShell stage={stage} index={index} sectionRef={ref} height="320vh">
      <div className="absolute inset-0">
        {/* City skyline */}
        <motion.svg
          viewBox="0 0 1400 260"
          className="absolute right-0 bottom-[16%] left-0 w-[130%] text-fog opacity-[0.14]"
          fill="none"
          aria-hidden
          style={motionOK ? { x: cityX } : undefined}
        >
          <path
            d="M0 260V150h90v-40h70v60h80V90h110v70h60v-50h90v50h120V60h90v100h70v-30h80v30h120V110h90v50h80v-70h90v170z"
            fill="currentColor"
            opacity="0.6"
          />
        </motion.svg>

        {/* Destination building + door */}
        <div className="absolute right-[6%] bottom-[16%] w-[min(26%,260px)]">
          <svg viewBox="0 0 260 300" className="w-full text-fog" fill="none" aria-hidden>
            <rect x="10" y="20" width="240" height="280" fill="#0f151d" stroke="currentColor" strokeWidth="2.5" />
            {[50, 110, 170].map((y) => (
              <g key={y}>
                <rect x="34" y={y} width="56" height="38" fill="#131b24" stroke="currentColor" strokeWidth="1.6" opacity="0.7" />
                <rect x="170" y={y} width="56" height="38" fill="#131b24" stroke="currentColor" strokeWidth="1.6" opacity="0.7" />
              </g>
            ))}
            {/* Doorway */}
            <rect x="96" y="196" width="68" height="104" fill="#0a0e13" stroke="currentColor" strokeWidth="2.5" />
            <motion.g style={motionOK ? { opacity: glowOpacity } : undefined}>
              <rect x="98" y="198" width="64" height="100" fill="var(--color-amber)" opacity="0.18" />
            </motion.g>
            {/* Door swings inward */}
            <motion.g style={motionOK ? { scaleX: doorScale } : undefined} className="origin-left">
              <rect x="98" y="198" width="64" height="100" fill="#131b24" stroke="currentColor" strokeWidth="2" />
              <circle cx="150" cy="250" r="3.5" fill="var(--color-amber)" />
            </motion.g>
            <path d="M10 300h240" stroke="currentColor" strokeWidth="3" />
          </svg>
        </div>

        {/* Van */}
        <motion.div className="absolute bottom-[14%] left-[4%] w-[min(34%,380px)]" style={motionOK ? { x: vanX } : undefined}>
          <Van className="w-full" spin={motionOK ? vanSpin : undefined} />
        </motion.div>

        {/* Courier walks the parcel over */}
        <motion.div
          className="absolute bottom-[15%] left-[30%] w-[min(9%,90px)]"
          style={motionOK ? { opacity: courierOpacity, x: courierX } : { opacity: 0 }}
        >
          <Courier className="w-full" stride={motionOK ? stride : undefined} />
        </motion.div>

        {/* Pavement */}
        <div className="absolute right-0 bottom-[14%] left-0 h-px bg-fog/20" />

        {/* Proof of delivery */}
        <motion.div className="panel absolute top-0 right-0 w-[min(92%,330px)] px-5 py-4" style={motionOK ? { opacity: deliveredOpacity } : undefined}>
          <p className="font-mono text-[10.5px] tracking-[0.2em] text-signal">PROOF OF DELIVERY</p>
          <p className="mt-2 font-display text-[1.1rem] font-medium">Signed for</p>
          <svg viewBox="0 0 240 70" className="mt-1 w-full text-fog" fill="none" aria-hidden>
            <motion.path
              d="M12 50c18-26 26-30 32-14s10 22 18 4 14-28 22-10 12 26 22 8 16-22 26-8 16 16 28 4 18-14 28-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={motionOK ? { pathLength: signature } : { pathLength: 1 }}
            />
            <path d="M8 62h224" stroke="currentColor" strokeWidth="1" opacity="0.25" />
          </svg>
          <p className="font-mono text-[11px] text-muted">L. Hoffmann · Thu 09:40 CET</p>
        </motion.div>
      </div>
    </StageShell>
  )
}
