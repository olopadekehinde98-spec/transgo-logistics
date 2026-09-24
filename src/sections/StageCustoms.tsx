import { motion, useTransform, type MotionValue } from 'framer-motion'
import { Check } from 'lucide-react'
import { useRef } from 'react'
import { StageShell } from '../components/StageShell'
import { stages } from '../data/content'
import { useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'

const stage = stages[4]

const docs = [
  { code: 'CMR', title: 'Commercial invoice', note: 'Value declared · EUR 42,180' },
  { code: 'B/L', title: 'Bill of lading', note: 'MRDU 418 220 · telex released' },
  { code: 'SAD', title: 'Customs declaration', note: 'EU entry · Rotterdam' },
]

function Doc({ i, p, motionOK }: { i: number; p: MotionValue<number>; motionOK: boolean }) {
  const a = 0.12 + i * 0.22
  const y = useTransform(p, [a, a + 0.12], [60, 0])
  const opacity = useTransform(p, [a, a + 0.1], [0, 1])
  const stampScale = useTransform(p, [a + 0.12, a + 0.17], [2.4, 1])
  const stampOpacity = useTransform(p, [a + 0.12, a + 0.17], [0, 1])
  const stampRotate = useTransform(p, [a + 0.12, a + 0.17], [-24, -9])

  return (
    <motion.div className="panel relative w-full px-4 py-3 sm:px-5 sm:py-4" style={motionOK ? { y, opacity } : undefined}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10.5px] tracking-[0.2em] text-amber">{docs[i].code}</p>
          <p className="mt-1 font-display text-[0.98rem] font-medium sm:mt-1.5 sm:text-[1.05rem]">{docs[i].title}</p>
          <p className="mt-1 font-mono text-[11px] text-muted">{docs[i].note}</p>
        </div>
        <div className="mt-1 hidden gap-1 sm:flex">
          {Array.from({ length: 4 }, (_, k) => (
            <span key={k} className="h-8 w-1 bg-fog/15" />
          ))}
        </div>
      </div>

      {/* Stamp lands on the page */}
      <motion.div
        className="absolute -top-3 right-5 border-2 border-signal px-3 py-1 font-mono text-[12px] font-semibold tracking-[0.22em] text-signal"
        style={motionOK ? { scale: stampScale, opacity: stampOpacity, rotate: stampRotate } : { rotate: -9 }}
      >
        CLEARED
      </motion.div>
    </motion.div>
  )
}

/** Stage 05 — paperwork, filed ahead of arrival. Each document lands and gets stamped. */
export function StageCustoms({ index }: { index: number }) {
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const p = useSectionProgress(ref, ['start start', 'end end'])

  const releaseOpacity = useTransform(p, [0.82, 0.92], [0, 1])
  const releaseY = useTransform(p, [0.82, 0.92], [24, 0])
  const barScale = useTransform(p, [0.1, 0.9], [0, 1])

  return (
    <StageShell stage={stage} index={index} sectionRef={ref} height="300vh" align="right">
      <div className="absolute inset-0 flex flex-col justify-center">
        <div className="mx-auto flex w-full max-w-[560px] flex-col gap-2.5 sm:gap-3 md:mx-0">
          {docs.map((d, i) => (
            <Doc key={d.code} i={i} p={p} motionOK={motionOK} />
          ))}

          <motion.div
            className="mt-1 flex items-center gap-3 border border-signal/40 bg-signal/5 px-4 py-3 sm:px-5 sm:py-4"
            style={motionOK ? { opacity: releaseOpacity, y: releaseY } : undefined}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full border border-signal text-signal">
              <Check className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <div>
              <p className="font-display text-[1rem] font-medium text-signal">Release granted</p>
              <p className="font-mono text-[11px] text-muted">Cargo may leave the terminal · 07:55 CET</p>
            </div>
          </motion.div>

          <div className="mt-3 h-px w-full bg-line">
            <motion.div className="h-px origin-left bg-amber" style={motionOK ? { scaleX: barScale } : { scaleX: 1 }} />
          </div>
          <p className="hidden font-mono text-[10.5px] tracking-[0.16em] text-muted sm:block">PRE-ARRIVAL FILING · 3 OF 3 DOCUMENTS ACCEPTED</p>
        </div>
      </div>
    </StageShell>
  )
}
