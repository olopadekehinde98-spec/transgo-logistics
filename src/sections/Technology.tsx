import { motion } from 'framer-motion'
import { CheckCircle2, Map, Radar, ScanLine, Truck } from 'lucide-react'
import { useState } from 'react'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { shipment, tech, techPhoto } from '../data/content'
import { EASE, useUI } from '../lib/ui'

const icons = [ScanLine, Radar, Map, Truck, CheckCircle2]

/** The scanning HUD: hover a step and the overlay on the parcel changes. */
export function Technology() {
  const { open } = useUI()
  const [active, setActive] = useState(0)

  return (
    <section id="technology" className="relative border-t border-line bg-night py-20 md:py-24">
      <div className="frame grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
        <div>
          <p className="data mb-4 text-amber">Powered by technology</p>
          <SplitLines className="h-display text-[clamp(2rem,4.4vw,3.4rem)] uppercase" lines={['Smart logistics', 'for a faster tomorrow']} />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[440px] text-[15px] leading-[1.75] text-muted">
              Real-time tracking, intelligent routing and data-driven decisions — so a delay is a phone call before it is a problem.
            </p>
            <button type="button" onClick={() => open({ kind: 'quote' })} className="btn-amber mt-8">
              Explore Our Technology
            </button>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1.25fr_1fr] sm:items-stretch">
          {/* Parcel + scan overlay */}
          <div className="relative min-h-[260px] overflow-hidden border border-line bg-steel">
            <Img photo={techPhoto} sizes="(min-width: 640px) 40vw, 100vw" widths={[480, 800, 1200]} className="opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/35 to-transparent" />

            {/* Scanning sweep */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 h-px bg-amber/80"
              initial={{ top: '12%' }}
              animate={{ top: ['12%', '88%', '12%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="panel absolute top-4 right-4 left-4 flex items-center gap-3 px-3.5 py-3 sm:left-auto sm:w-[230px]"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-signal text-signal">
                <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[10.5px] tracking-[0.16em] text-signal uppercase">{tech[active].title} complete</span>
                <span className="block truncate font-mono text-[11px] text-muted">Shipment {shipment.id}</span>
              </span>
            </motion.div>
          </div>

          {/* Steps */}
          <ul className="flex flex-col justify-center gap-px overflow-hidden border border-line bg-line">
            {tech.map((t, i) => {
              const Icon = icons[i]
              const on = i === active
              return (
                <li key={t.key} className="bg-night">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left transition-colors duration-300 hover:bg-steel"
                  >
                    <span className={`grid h-9 w-9 shrink-0 place-items-center border transition-colors duration-300 ${on ? 'border-amber text-amber' : 'border-line text-muted'}`}>
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-mono text-[11.5px] tracking-[0.16em] uppercase transition-colors ${on ? 'text-fog' : 'text-muted'}`}>{t.title}</span>
                      <span className="block truncate text-[12.5px] text-muted">{t.text}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
