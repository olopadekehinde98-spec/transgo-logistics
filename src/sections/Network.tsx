import { motion, useInView } from 'framer-motion'
import { Plane, Ship, Train, Truck } from 'lucide-react'
import { useRef } from 'react'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { Globe } from '../components/Globe'
import { arcs, network } from '../data/content'
import { useCountUp } from '../hooks/useCountUp'
import { useUI } from '../lib/ui'

const modeIcon: Record<string, typeof Ship> = { Ocean: Ship, Air: Plane, Road: Truck, Rail: Train }

function Stat({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const whole = Number.isInteger(value)
  const n = useCountUp(whole ? value : Math.round(value * 10), start, 1500)
  const shown = whole ? n.toLocaleString() : (n / 10).toFixed(1)
  return (
    <div>
      <p className="font-display text-[2.2rem] leading-none font-bold tabular-nums md:text-[2.8rem]">
        <span aria-hidden>
          {shown}
          <span className="text-amber">{suffix}</span>
        </span>
        <span className="sr-only">
          {value}
          {suffix}
        </span>
      </p>
      <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{label}</p>
    </div>
  )
}

/** Cargo without borders: the live lane map. */
export function Network() {
  const { open } = useUI()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })

  return (
    <section id="network" className="relative overflow-hidden border-t border-line bg-steel py-20 md:py-24">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="frame relative grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
        <div ref={ref}>
          <p className="data mb-4 text-amber">A global network</p>
          <SplitLines className="h-display text-[clamp(2rem,4.4vw,3.4rem)] uppercase" lines={['Your cargo', 'without borders']} />

          <div className="mt-9 grid grid-cols-2 gap-x-10 gap-y-7 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-2">
            {network.stats.map((s) => (
              <Stat key={s.label} {...s} start={inView} />
            ))}
          </div>

          <Reveal delay={0.1} className="mt-9">
            <button type="button" onClick={() => open({ kind: 'quote' })} className="btn-amber">
              Our Global Network
            </button>
          </Reveal>
        </div>

        {/* Globe */}
        <div className="relative">
          <Globe className="mx-auto w-full max-w-[560px]" />
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {arcs.map((a, i) => (
              <motion.li
                key={a.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="panel flex items-center gap-3 px-3.5 py-2.5"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" style={{ animation: 'blink 2s ease-in-out infinite' }} />
                <span className="min-w-0 truncate font-mono text-[11.5px] text-fog">{a.label}</span>
                <span className="ml-auto shrink-0 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">{a.status}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Frequent lanes */}
      <div className="frame relative mt-14">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted">FREQUENT LANES</p>
        <ul className="mt-5 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {network.lanes.map((lane, i) => {
            const Icon = modeIcon[lane.mode] ?? Truck
            return (
              <motion.li
                key={`${lane.from}-${lane.to}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group flex items-center gap-4 bg-night px-5 py-5 transition-colors hover:bg-steel"
              >
                <Icon className="h-5 w-5 shrink-0 text-amber" strokeWidth={1.6} />
                <div className="min-w-0">
                  <p className="truncate font-display text-[1.02rem] font-medium">
                    {lane.from} <span className="text-muted">→</span> {lane.to}
                  </p>
                  <p className="mt-0.5 font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">
                    {lane.mode} · {lane.days}
                  </p>
                </div>
                <span className="ml-auto shrink-0 font-mono text-[10px] tracking-[0.12em] text-muted uppercase">{lane.status}</span>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
