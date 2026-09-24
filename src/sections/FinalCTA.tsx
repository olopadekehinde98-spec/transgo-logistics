import { motion, useInView, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Img } from '../components/Img'
import { SplitLines } from '../components/SplitLines'
import { closing } from '../data/content'
import { useCountUp } from '../hooks/useCountUp'
import { useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'
import { EASE, useUI } from '../lib/ui'

function Stat({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const n = useCountUp(value, start, 1600)
  return (
    <div className="flex items-baseline gap-3 sm:block">
      <p className="font-display text-[2rem] leading-none font-bold tabular-nums md:text-[2.5rem]">
        <span aria-hidden>
          {n.toLocaleString()}
          <span className="text-amber">{suffix}</span>
        </span>
        <span className="sr-only">
          {value.toLocaleString()}
          {suffix}
        </span>
      </p>
      <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase sm:mt-2">{label}</p>
    </div>
  )
}

export function FinalCTA() {
  const { open } = useUI()
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const p = useSectionProgress(ref, ['start end', 'end end'])
  const statsRef = useRef<HTMLDivElement>(null)
  const inView = useInView(statsRef, { once: true, margin: '0px 0px -20% 0px' })

  const scale = useTransform(p, [0, 1], [1.14, 1])
  const dark = useTransform(p, [0.1, 0.9], [0.78, 0.45])

  return (
    <section ref={ref} className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-night py-24">
      <motion.div className="absolute inset-0 -z-20" style={motionOK ? { scale } : undefined}>
        <Img photo={closing.photo} widths={[828, 1280, 1600]} />
      </motion.div>
      <motion.div className="absolute inset-0 -z-10 bg-night" style={motionOK ? { opacity: dark } : { opacity: 0.6 }} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/60 to-transparent" />

      <div className="frame relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <SplitLines className="h-display text-[clamp(2.4rem,6vw,4.6rem)] uppercase" lines={['From here', <span className="text-amber">to anywhere</span>]} />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="mt-6 max-w-[460px] text-[15.5px] leading-[1.75] text-fog/85"
          >
            We move the world forward. Tell us what ships, where from and how fast — you get routing options, transit times and an all-in rate
            within one business day.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="mt-9"
          >
            <button type="button" onClick={() => open({ kind: 'quote' })} className="btn-amber group px-8 py-4">
              Get a Quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
            </button>
          </motion.div>
        </div>

        <div ref={statsRef} className="flex flex-col gap-6 sm:flex-row sm:gap-10 lg:flex-col lg:items-end lg:text-right">
          {closing.stats.map((s) => (
            <Stat key={s.label} {...s} start={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
