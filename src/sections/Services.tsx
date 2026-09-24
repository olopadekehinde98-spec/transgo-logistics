import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { services } from '../data/content'
import { EASE, useUI } from '../lib/ui'

/** Four ways we move freight, as photographic cards. */
export function Services() {
  const { open } = useUI()
  const rail = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(0)

  const scrollBy = (dir: 1 | -1) => {
    const el = rail.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    el.scrollBy({ left: (card?.offsetWidth ?? 320) * dir, behavior: 'smooth' })
    setPage((p) => Math.min(Math.max(p + dir, 0), services.length - 1))
  }

  return (
    <section id="services" className="relative border-t border-line bg-night py-20 md:py-24">
      <div className="frame">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
          <div>
            <p className="data mb-4 text-amber">Our services</p>
            <SplitLines className="h-display text-[clamp(2rem,4.4vw,3.4rem)] uppercase" lines={['Multiple ways', 'to move the world']} />
          </div>
          <Reveal delay={0.08}>
            <p className="max-w-[400px] text-[14.5px] leading-[1.75] text-muted">
              No matter the size, distance, or destination, we have the right solution — and one coordinator who owns it end to end.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="flex items-center gap-4">
            <button type="button" onClick={() => open({ kind: 'quote' })} className="group inline-flex items-center gap-2 font-mono text-[11.5px] tracking-[0.14em] text-amber uppercase">
              Explore all services
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
            </button>
            <span className="hidden gap-2 lg:flex">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Previous services"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-fog transition-colors hover:border-amber hover:text-amber"
              >
                <ArrowRight className="h-4 w-4 rotate-180" strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Next services"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-fog transition-colors hover:border-amber hover:text-amber"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </span>
          </Reveal>
        </div>

        <div ref={rail} className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto lg:grid lg:grid-cols-4 lg:overflow-visible">
          {services.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="group relative aspect-[4/5] w-[78vw] shrink-0 snap-center overflow-hidden border border-line bg-steel sm:w-[46vw] lg:aspect-[3/4] lg:w-auto"
            >
              <Img
                photo={s.photo}
                sizes="(min-width: 1024px) 24vw, 78vw"
                widths={[480, 800, 1200]}
                className="transition-transform duration-[1200ms] ease-cine group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-transparent" />
              <span className="absolute top-4 left-4 font-mono text-[11px] tracking-[0.2em] text-amber">{s.n}</span>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <div className="min-w-0">
                  <h3 className="font-display text-[1.1rem] leading-tight font-semibold tracking-[0.02em] uppercase">{s.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-muted">{s.text}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.points.map((pt) => (
                      <li key={pt} className="border border-line/80 bg-night/50 px-2 py-1 font-mono text-[10px] tracking-[0.1em] text-muted">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => open({ kind: 'quote', subject: s.title })}
                  aria-label={`Request ${s.title} pricing`}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-fog/30 text-fog transition-colors duration-300 group-hover:border-amber group-hover:bg-amber group-hover:text-night"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-4 flex gap-2 lg:hidden" aria-hidden>
          {services.map((s, i) => (
            <span key={s.n} className={`h-0.5 flex-1 transition-colors duration-300 ${i === page ? 'bg-amber' : 'bg-line'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
