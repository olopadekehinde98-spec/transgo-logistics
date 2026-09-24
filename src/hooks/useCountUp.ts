import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Animates from 0 to `end` once `start` becomes true (ease-out, ~1.8s). */
export function useCountUp(end: number, start: boolean, duration = 1800): number {
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    if (reduce) {
      setValue(end)
      return
    }
    let frame = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setValue(Math.round(end * eased))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [end, start, duration, reduce])

  return value
}
