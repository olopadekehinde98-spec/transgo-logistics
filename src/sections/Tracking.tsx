import { AnimatePresence, motion } from 'framer-motion'
import { Check, Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Img } from '../components/Img'
import { Reveal } from '../components/Reveal'
import { SplitLines } from '../components/SplitLines'
import { shipment, stages, trackables } from '../data/content'
import { EASE } from '../lib/ui'

const samples = Object.keys(trackables)

/** A working demo tracker: type one of the sample references and watch the file open. */
export function Tracking() {
  const [q, setQ] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState(false)

  const lookup = (raw: string) => {
    const key = raw.trim().toUpperCase()
    if (trackables[key]) {
      setResult(key)
      setError(false)
    } else {
      setResult(null)
      setError(true)
    }
  }

  const data = result ? trackables[result] : null

  return (
    <section id="tracking" className="relative border-t border-line bg-night py-20 md:py-28">
      <div className="frame">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="data mb-4 text-amber">The journey of a package</p>
            <SplitLines className="h-display text-[clamp(2rem,4.4vw,3.4rem)] uppercase" lines={['Track every step']} />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[430px] text-[15px] leading-[1.8] text-muted">
                Enter a reference to open the file. Try one of ours — these are live demo records from the sandbox.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {samples.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setQ(s)
                      lookup(s)
                    }}
                    className="border border-line px-3 py-2.5 font-mono text-[11px] tracking-[0.12em] text-muted transition-colors hover:border-amber hover:text-amber"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div>
            <div className="panel mb-4 flex flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3.5">
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-fog">Shipment {shipment.id}</p>
                <p className="mt-1 flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-signal uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" style={{ animation: 'blink 2s ease-in-out infinite' }} />
                  In transit
                </p>
              </div>
              <div className="font-mono text-[11px] text-muted">
                <p>
                  From: <span className="text-fog">{shipment.origin.city}, {shipment.origin.country}</span>
                </p>
                <p className="mt-1">
                  To: <span className="text-fog">{shipment.destination.city}, {shipment.destination.country}</span>
                </p>
              </div>
            </div>
            <form
              onSubmit={(e: FormEvent) => {
                e.preventDefault()
                lookup(q)
              }}
              role="search"
              className="flex border border-line focus-within:border-amber"
            >
              <label htmlFor="track-q" className="sr-only">
                Shipment reference
              </label>
              <input
                id="track-q"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value)
                  setError(false)
                }}
                placeholder="#TG000000"
                autoComplete="off"
                className="w-full min-w-0 bg-transparent px-4 py-4 font-mono text-[14px] tracking-[0.1em] text-fog uppercase placeholder:text-muted/60 focus:outline-none"
              />
              <button type="submit" className="flex items-center gap-2 bg-amber px-5 font-mono text-[12px] font-semibold tracking-[0.1em] text-night">
                <Search className="h-4 w-4" strokeWidth={2.4} />
                TRACK
              </button>
            </form>

            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  key="err"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  className="mt-3 font-mono text-[11.5px] tracking-[0.12em] text-amber"
                >
                  NO RECORD FOUND — TRY A SAMPLE REFERENCE
                </motion.p>
              )}

              {data && (
                <motion.div
                  key={result}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="panel mt-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.2em] text-amber">{result}</p>
                      <p className="mt-1 font-display text-[1.15rem] font-medium">{data.route}</p>
                    </div>
                    <span className="border border-line px-3 py-1.5 font-mono text-[10.5px] tracking-[0.16em] text-muted">{data.mode}</span>
                  </div>

                  <ol className="px-5 py-5">
                    {data.steps.map((st, i) => (
                      <motion.li
                        key={st.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                        className="relative flex gap-4 pb-5 last:pb-0"
                      >
                        <span className="relative flex flex-col items-center">
                          <span
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                              st.done ? 'border-signal bg-signal/15 text-signal' : 'border-line text-muted'
                            }`}
                          >
                            {st.done ? <Check className="h-3 w-3" strokeWidth={3} /> : <span className="h-1 w-1 rounded-full bg-muted" />}
                          </span>
                          {i < data.steps.length - 1 && <span className={`mt-1 w-px flex-1 ${st.done ? 'bg-signal/40' : 'bg-line'}`} />}
                        </span>
                        <span className="-mt-0.5 min-w-0">
                          <span className={`block text-[14px] ${st.done ? 'text-fog' : 'text-muted'}`}>{st.label}</span>
                          <span className="mt-0.5 block font-mono text-[10.5px] tracking-[0.14em] text-muted">{st.time}</span>
                        </span>
                      </motion.li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* The six steps, as the reference shows them */}
        <div className="no-scrollbar mt-14 flex gap-3 overflow-x-auto md:grid md:grid-cols-6 md:overflow-visible">
          {stages.map((st, i) => (
            <motion.a
              key={st.id}
              href={`#${st.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
              className="group w-[62vw] shrink-0 sm:w-[40vw] md:w-auto"
            >
              <span className="flex items-center gap-2">
                <span className="font-mono text-[10.5px] tracking-[0.18em] text-amber">{st.n}</span>
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-fog uppercase">{st.short}</span>
              </span>
              <span className="mt-2 block h-px w-full bg-line" />
              <span className="relative mt-3 block aspect-[4/3] overflow-hidden border border-line bg-steel">
                <Img photo={st.photo} sizes="(min-width: 768px) 16vw, 62vw" widths={[320, 640]} className="transition-transform duration-[1200ms] ease-cine group-hover:scale-[1.07]" />
                <span className="absolute inset-0 bg-gradient-to-t from-night/85 to-transparent" />
              </span>
              <span className="mt-2 block font-mono text-[10.5px] text-muted">{st.time}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
