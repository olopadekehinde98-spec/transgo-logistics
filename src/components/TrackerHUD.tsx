import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useState } from 'react'
import { shipment, stages } from '../data/content'
import { useUI } from '../lib/ui'

/**
 * The shipment readout. It sits over the journey and updates as each stage
 * scrolls past, so the page always answers "where is my cargo right now?".
 */
export function TrackerHUD() {
  const { stage } = useUI()
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [visible, setVisible] = useState(false)

  // Only ride along with the journey itself — elsewhere it would just cover copy.
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    const first = document.getElementById(stages[0].id)
    const last = document.getElementById(stages[stages.length - 1].id)
    if (!first || !last) return setVisible(false)
    const mid = y + window.innerHeight * 0.5
    setVisible(mid > first.offsetTop && mid < last.offsetTop + last.offsetHeight)
  })

  const s = stages[Math.min(stage, stages.length - 1)]
  const delivered = stage >= stages.length - 1

  return (
    <>
      {/* Desktop readout */}
      <motion.aside
        aria-label="Shipment status"
        className="panel fixed bottom-6 left-6 z-40 hidden w-[290px] xl:block"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
        transition={{ duration: 0.5 }}
        aria-hidden={!visible}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <span className="font-mono text-[11px] tracking-[0.2em] text-muted">{shipment.id}</span>
          <span className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.18em]">
            <span className={`h-1.5 w-1.5 rounded-full ${delivered ? 'bg-signal' : 'bg-amber'}`} style={{ animation: 'blink 2s ease-in-out infinite' }} />
            <span className={delivered ? 'text-signal' : 'text-amber'}>{delivered ? 'DELIVERED' : 'IN TRANSIT'}</span>
          </span>
        </div>

        <div className="px-4 py-4">
          <p className="font-mono text-[10.5px] tracking-[0.18em] text-muted">STAGE {s.n}</p>
          <p className="mt-1 font-display text-[1.25rem] font-medium">{s.title}</p>
          <p className="mt-1 font-mono text-[11px] text-muted">{s.time}</p>

          <dl className="mt-4 space-y-2">
            {s.metrics.map((m) => (
              <div key={m.label} className="flex items-baseline justify-between gap-3">
                <dt className="font-mono text-[10.5px] tracking-[0.14em] text-muted uppercase">{m.label}</dt>
                <dd className="font-mono text-[11.5px] text-fog">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 flex items-center gap-2">
            {stages.map((st, i) => (
              <span key={st.id} className={`h-0.5 flex-1 transition-colors duration-500 ${i <= stage ? 'bg-amber' : 'bg-line'}`} />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] tracking-[0.16em] text-muted">
            <span>{shipment.origin.code}</span>
            <span>{shipment.destination.code}</span>
          </div>
        </div>
      </motion.aside>

      {/* Mobile strip */}
      <motion.div
        className="fixed inset-x-0 top-[52px] z-40 border-y border-line bg-night/90 backdrop-blur-md xl:hidden"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -10 }}
        transition={{ duration: 0.4 }}
        aria-hidden
      >
        <div className="frame flex items-center gap-3 py-2">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${delivered ? 'bg-signal' : 'bg-amber'}`} style={{ animation: 'blink 2s ease-in-out infinite' }} />
          <span className="font-mono text-[10.5px] tracking-[0.16em] text-muted">{shipment.id}</span>
          <span className="truncate font-mono text-[10.5px] tracking-[0.14em] text-fog">
            {s.n} · {s.title}
          </span>
          <span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">{s.metrics[0].value}</span>
        </div>
        <motion.div className="h-px origin-left bg-amber" style={{ scaleX: bar }} />
      </motion.div>
    </>
  )
}
