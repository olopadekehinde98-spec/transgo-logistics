import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { EASE_MASK, useUI } from '../lib/ui'

const field = 'w-full border border-line bg-night px-3.5 py-3 font-mono text-[13px] text-fog placeholder:text-muted/60 focus:border-amber focus:outline-none'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10.5px] tracking-[0.18em] text-muted uppercase">{label}</span>
      {children}
    </label>
  )
}

function Panel({ subject, onClose }: { subject?: string; onClose: () => void }) {
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      prevFocus?.focus?.({ preventScroll: true })
    }
  }, [onClose])

  return (
    <motion.div className="fixed inset-0 z-[120]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <button type="button" aria-label="Close quote panel" onClick={onClose} className="absolute inset-0 bg-night/80 backdrop-blur-sm" tabIndex={-1} />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label="Get a quote"
        className="absolute inset-y-0 right-0 flex w-full max-w-[540px] flex-col overflow-y-auto border-l border-line bg-steel px-6 py-6 sm:px-10"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.6, ease: EASE_MASK }}
      >
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] tracking-[0.2em] text-amber">RATE REQUEST</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            autoFocus
            className="grid h-11 w-11 place-items-center border border-line text-fog transition-colors hover:border-amber hover:text-amber"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div key="sent" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="my-auto py-14" role="status">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-signal text-signal">
                <Check className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <h2 className="h-display mt-7 text-[2.4rem]">Request received.</h2>
              <p className="mt-4 max-w-[380px] text-[14.5px] leading-[1.8] text-muted">
                A coordinator will come back with routing options, transit times and an all-in rate within one business day. Reference{' '}
                <span className="font-mono text-amber">RFQ-{Math.floor(Math.random() * 9000 + 1000)}</span>.
              </p>
              <button type="button" onClick={onClose} className="btn-ghost mt-9">
                Back to the journey
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              exit={{ opacity: 0 }}
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="mt-8 space-y-6 pb-8"
            >
              <div>
                <h2 className="h-display text-[clamp(2rem,5vw,2.8rem)]">Tell us the lane.</h2>
                <p className="mt-3 text-[14px] leading-[1.75] text-muted">Rates are quoted all-in: freight, terminal charges, customs and last mile.</p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Collection from">
                  <input required name="from" className={field} placeholder="City, country" />
                </Field>
                <Field label="Delivery to">
                  <input required name="to" className={field} placeholder="City, country" />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Mode">
                  <select name="mode" defaultValue="Ocean" className={`${field} appearance-none`}>
                    {['Ocean', 'Air', 'Road', 'Not sure — advise me'].map((m) => (
                      <option key={m} className="bg-steel">
                        {m}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Ready date">
                  <input name="ready" type="date" className={field} />
                </Field>
              </div>

              <Field label="Cargo">
                <input name="cargo" defaultValue={subject ?? ''} className={field} placeholder="What is moving, weight, dimensions" />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name">
                  <input required name="name" autoComplete="name" className={field} placeholder="Your name" />
                </Field>
                <Field label="Work email">
                  <input required type="email" name="email" autoComplete="email" className={field} placeholder="you@company.com" />
                </Field>
              </div>

              <Field label="Notes">
                <textarea name="notes" rows={3} className={`${field} resize-none`} placeholder="Anything we should plan around" />
              </Field>

              <button type="submit" className="btn-amber group w-full justify-center py-4">
                Request rate
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
              </button>
              <p className="font-mono text-[10.5px] leading-relaxed tracking-[0.12em] text-muted">
                DEMO FORM · NOTHING IS SENT ANYWHERE
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.aside>
    </motion.div>
  )
}

export function QuoteDrawer() {
  const { overlay, close } = useUI()
  return <AnimatePresence>{overlay?.kind === 'quote' && <Panel key="quote" subject={overlay.subject} onClose={close} />}</AnimatePresence>
}

