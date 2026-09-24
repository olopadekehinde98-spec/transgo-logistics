import { motion, useTransform } from 'framer-motion'
import { Box, CheckCircle2, Play, Ship, Truck, Warehouse } from 'lucide-react'
import { useRef } from 'react'
import { Img } from '../components/Img'
import { SplitLines } from '../components/SplitLines'
import { hero, shipment, stages } from '../data/content'
import { useMotionOK } from '../hooks/useMediaQuery'
import { useSectionProgress } from '../hooks/useSectionProgress'
import { EASE, goTo, useUI } from '../lib/ui'
import { Truck as TruckArt } from '../vehicles/Road'

const stepIcons = [Box, Truck, Warehouse, Ship, Truck, CheckCircle2]

export function Hero() {
  const { open } = useUI()
  const ref = useRef<HTMLElement>(null)
  const motionOK = useMotionOK()
  const p = useSectionProgress(ref, ['start start', 'end start'])

  const bgY = useTransform(p, [0, 1], ['0%', '16%'])
  const fade = useTransform(p, [0, 0.7], [1, 0])
  const truckX = useTransform(p, [0, 1], ['0%', '34%'])
  const spin = useTransform(p, [0, 1], [0, 900])

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[760px] flex-col justify-end overflow-hidden bg-night h-[100svh]">
      <motion.div className="absolute inset-0 -z-20" style={motionOK ? { y: bgY } : undefined}>
        <Img photo={hero.photo} priority widths={[828, 1280, 1600]} className="opacity-55" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/80 to-night/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/55 to-transparent" />

      <motion.div className="frame relative flex-1 pt-32 pb-8 sm:pt-28" style={motionOK ? { opacity: fade } : undefined}>
        <div className="flex h-full flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="data mb-5 text-amber"
          >
            Global logistics solutions
          </motion.p>

          <SplitLines
            as="h1"
            play
            delay={0.12}
            stagger={0.1}
            className="h-display text-[clamp(2.6rem,8vw,6.4rem)] uppercase"
            lines={['We move', <span className="text-amber">what matters</span>]}
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
            className="mt-6 max-w-[470px] text-[15.5px] leading-[1.7] text-fog/80"
          >
            From warehouse to doorstep, watch your shipment move. Scroll to follow live consignment {shipment.id} from Lagos to London.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            <button type="button" onClick={() => open({ kind: 'quote' })} className="btn-amber">
              Ship With Us
            </button>
            <button type="button" onClick={() => goTo('journey')} className="group flex items-center gap-3 text-[13px] font-medium text-fog">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-fog/30 transition-colors duration-300 group-hover:border-amber group-hover:text-amber">
                <Play className="ml-0.5 h-4 w-4 fill-current" strokeWidth={1} />
              </span>
              Watch the Journey
            </button>
          </motion.div>
        </div>

        {/* Vertical scroll hint, as in the reference */}
        <div className="pointer-events-none absolute top-1/2 right-0 hidden -translate-y-1/2 lg:block">
          <p className="font-mono text-[10.5px] leading-[1.9] tracking-[0.22em] text-muted uppercase [writing-mode:vertical-rl]">
            Scroll to follow the journey
          </p>
        </div>
      </motion.div>

      {/* Journey strip */}
      <div className="relative border-t border-line bg-night/80 backdrop-blur-sm">
        <div className="no-scrollbar frame flex items-center gap-4 overflow-x-auto py-4 sm:gap-2">
          {stages.map((s, i) => {
            const Icon = stepIcons[i]
            return (
              <a key={s.id} href={`#${s.id}`} className="group flex shrink-0 items-center gap-3 sm:flex-1" aria-label={`Jump to stage ${s.n}: ${s.title}`}>
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-line text-amber transition-colors duration-300 group-hover:border-amber">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] tracking-[0.2em] text-muted">{s.n}</span>
                  <span className="block truncate font-mono text-[11px] tracking-[0.14em] text-fog uppercase">{s.short}</span>
                </span>
                {i < stages.length - 1 && <span className="mx-1 hidden h-px w-6 shrink-0 bg-line xl:block" />}
              </a>
            )
          })}
        </div>

        {/* Truck rolls in on load, then drifts with scroll */}
        <motion.div
          className="pointer-events-none absolute right-0 bottom-full left-0 hidden justify-start md:flex"
          initial={{ x: '-46%' }}
          animate={{ x: '0%' }}
          transition={{ delay: 0.3, duration: 2.8, ease: [0.16, 0.7, 0.3, 1] }}
        >
          <motion.div style={motionOK ? { x: truckX } : undefined}>
            <TruckArt className="h-[104px] w-auto opacity-90" spin={motionOK ? spin : undefined} label="TRANSGO" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
