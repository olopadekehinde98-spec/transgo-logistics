import { motion, useInView } from 'framer-motion'
import { useEffect, type ReactNode, type RefObject } from 'react'
import { Img } from './Img'
import type { Stage } from '../data/content'
import { EASE, useUI } from '../lib/ui'

type Props = {
  stage: Stage
  index: number
  /** Total scroll length of the pinned canvas. */
  height?: string
  children: ReactNode
  sectionRef: RefObject<HTMLElement | null>
  align?: 'left' | 'right'
}

/**
 * One journey stage: a tall section whose canvas pins while the copy stays put,
 * with the stage photograph sitting far back behind the vector animation.
 */
export function StageShell({ stage, index, height = '260vh', children, sectionRef, align = 'left' }: Props) {
  const { setStage } = useUI()
  const inView = useInView(sectionRef, { margin: '-50% 0px -50% 0px' })

  useEffect(() => {
    if (inView) setStage(index)
  }, [inView, index, setStage])

  return (
    <section id={stage.id} ref={sectionRef} style={{ height }} className="relative bg-night">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Backdrop photograph, heavily knocked back */}
        <div className="absolute inset-0 -z-20">
          <Img photo={stage.photo} widths={[828, 1280, 1600]} className="opacity-[0.22]" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/80 to-night" />
        <div className="grid-bg absolute inset-0 -z-10 opacity-50" />

        <div className="frame relative flex h-full flex-col justify-between py-20 md:py-24">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className={`max-w-[520px] ${align === 'right' ? 'md:ml-auto md:text-right' : ''}`}
          >
            <p className="stage-no mb-4">
              Stage {stage.n} — {stage.kicker}
            </p>
            <h2 className="h-display text-[clamp(2.2rem,4.6vw,3.9rem)]">{stage.title}</h2>
            <p className="mt-5 text-[14.5px] leading-[1.8] text-muted">{stage.copy}</p>
            <p className="mt-5 font-mono text-[11px] tracking-[0.16em] text-muted">
              <span className="text-amber">◆</span> {stage.place} · {stage.time}
            </p>
          </motion.div>

          {/* Animated canvas */}
          <div className="pointer-events-none relative min-h-0 flex-1 xl:pl-[300px]">{children}</div>

          {/* Telemetry strip */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-4 xl:pl-[300px]">
            {stage.metrics.map((m) => (
              <div key={m.label} className="flex items-baseline gap-2.5">
                <span className="font-mono text-[10.5px] tracking-[0.16em] text-muted uppercase">{m.label}</span>
                <span className="font-mono text-[12.5px] text-fog">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
