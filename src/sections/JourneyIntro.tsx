import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { shipment, stages } from '../data/content'
import { EASE } from '../lib/ui'

/** Sets up the through-line: one shipment, six stages, one page. */
export function JourneyIntro() {
  return (
    <section id="journey" className="relative border-y border-line bg-steel py-20 md:py-28">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="frame relative">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="data mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-amber" />
              The journey
            </p>
            <SplitLines className="h-display text-[clamp(2.4rem,5.2vw,4.4rem)]" lines={['One shipment.', 'Six stages. No guessing.']} />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[440px] text-[15px] leading-[1.8] text-muted">
              Most freight sites show you a quote form and a stock photo of a port. We would rather show you the work: every handover this
              shipment passes through, in the order it happens, with the data we hand our customers.
            </p>
          </Reveal>
        </div>

        {/* Stage rail */}
        <ol className="no-scrollbar mt-14 flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible">
          {stages.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className="w-[190px] shrink-0 lg:w-auto"
            >
              <a href={`#${s.id}`} className="group block border-t border-line pt-4 transition-colors hover:border-amber">
                <span className="font-mono text-[11px] tracking-[0.2em] text-amber">{s.n}</span>
                <p className="mt-2 font-display text-[1.05rem] leading-tight font-medium transition-colors group-hover:text-amber">{s.title}</p>
                <p className="mt-1.5 font-mono text-[10.5px] tracking-[0.14em] text-muted">{s.time}</p>
              </a>
            </motion.li>
          ))}
        </ol>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.16em] text-muted">
          <span>
            TRACKING <span className="text-fog">{shipment.id}</span>
          </span>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <span>
            {shipment.origin.city} → {shipment.hub.city} → {shipment.destination.city}
          </span>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <span>
            TOTAL <span className="text-fog">{shipment.distance}</span>
          </span>
        </Reveal>
      </div>
    </section>
  )
}
