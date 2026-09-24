import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { brand, navLinks } from '../data/content'
import { EASE, goTo, useUI } from '../lib/ui'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 28 28" className="h-7 w-7 text-amber" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M3 20V8l11 6 11-6v12" strokeLinejoin="round" />
        <path d="M3 24h22" />
      </svg>
      <span className="font-display text-[1.05rem] leading-none font-semibold tracking-[0.22em]">
        {brand.name}
        <span className="ml-1.5 font-mono text-[10px] tracking-[0.3em] text-muted">{brand.sub}</span>
      </span>
    </span>
  )
}

export function Navbar() {
  const { open } = useUI()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('#journey')

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40)
    const probe = y + window.innerHeight * 0.4
    let best = -1
    let cur = '#journey'
    for (const l of navLinks) {
      const el = document.querySelector<HTMLElement>(l.href)
      if (el && el.offsetTop <= probe && el.offsetTop > best) {
        best = el.offsetTop
        cur = l.href
      }
    }
    setActive(cur)
  })

  useEffect(() => {
    if (!menu) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menu])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,padding] duration-500 ${
          scrolled ? 'border-line bg-night/85 py-2.5 backdrop-blur-xl' : 'border-transparent py-4'
        }`}
      >
        <nav aria-label="Main" className="frame flex items-center justify-between gap-4">
          <a href="#top" aria-label={`${brand.name} ${brand.sub} — home`}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative py-3 font-mono text-[12px] tracking-[0.12em] uppercase transition-colors duration-300 ${
                    active === l.href ? 'text-fog' : 'text-muted hover:text-fog'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-0 bottom-1 h-px origin-left bg-amber transition-transform duration-500 ${
                      active === l.href ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => goTo('tracking')}
              className="hidden items-center gap-2 border border-line px-4 py-2.5 font-mono text-[11.5px] tracking-[0.1em] text-muted transition-colors hover:border-amber hover:text-amber sm:inline-flex"
            >
              <Search className="h-4 w-4" strokeWidth={1.6} />
              LOGIN
            </button>
            <button type="button" onClick={() => open({ kind: 'quote' })} className="btn-amber px-4 py-2.5 text-[11.5px] sm:px-5">
              Get a Quote
            </button>
            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              aria-expanded={menu}
              className="grid h-11 w-11 shrink-0 place-items-center text-fog lg:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={1.6} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[80] flex flex-col bg-night lg:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="frame flex items-center justify-between py-4">
              <Logo />
              <button type="button" onClick={() => setMenu(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center" autoFocus>
                <X className="h-6 w-6" strokeWidth={1.6} />
              </button>
            </div>
            <ul className="frame flex flex-1 flex-col justify-center">
              {navLinks.map((l, i) => (
                <li key={l.href} className="border-b border-line">
                  <motion.a
                    href={l.href}
                    onClick={() => setMenu(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.4 }}
                    className="flex items-baseline justify-between py-5 font-display text-[2.2rem] font-medium"
                  >
                    {l.label}
                    <span className="font-mono text-[11px] text-amber">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="frame pb-10">
              <button
                type="button"
                onClick={() => {
                  setMenu(false)
                  open({ kind: 'quote' })
                }}
                className="btn-amber w-full justify-center py-4"
              >
                Get a quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
