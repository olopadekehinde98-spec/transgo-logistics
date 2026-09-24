import { Mail, MapPin, Phone } from 'lucide-react'
import { brand, navLinks } from '../data/content'
import { Logo } from './Navbar'
import { useUI } from '../lib/ui'

const columns = [
  { title: 'Services', links: ['Ocean freight', 'Air freight', 'Warehousing', 'Customs brokerage', 'Control tower'] },
  { title: 'Company', links: ['About', 'Network', 'Careers', 'Press', 'Sustainability'] },
  { title: 'Support', links: ['Track a shipment', 'Documentation', 'Claims', 'Terms', 'Privacy'] },
]

export function Footer() {
  const { open } = useUI()
  return (
    <footer id="footer" className="border-t border-line bg-steel pt-16 pb-10">
      <div className="frame">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div>
            <Logo />
            <p className="mt-5 max-w-[320px] text-[14px] leading-[1.8] text-muted">{brand.tagline}</p>
            <ul className="mt-7 space-y-3 font-mono text-[12px] text-muted">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" strokeWidth={1.6} />
                Wilhelminakade 92, 3072 AR Rotterdam
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-amber" strokeWidth={1.6} />
                <a href="mailto:ops@meridianfreight.com" className="inline-block py-2 transition-colors hover:text-amber">
                  ops@meridianfreight.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-amber" strokeWidth={1.6} />
                <a href="tel:+31102345678" className="inline-block py-2 transition-colors hover:text-amber">
                  +31 10 234 5678
                </a>
              </li>
            </ul>
            <button type="button" onClick={() => open({ kind: 'quote' })} className="btn-amber mt-7">
              Get a quote
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((c) => (
              <div key={c.title}>
                <h3 className="font-mono text-[11px] tracking-[0.2em] text-fog uppercase">{c.title}</h3>
                <ul className="mt-5 space-y-1 text-[13.5px] text-muted">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href={navLinks.find((n) => n.label.toLowerCase() === l.toLowerCase())?.href ?? '#footer'}
                        className="inline-block py-2.5 transition-colors hover:text-amber"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 font-mono text-[11px] tracking-[0.12em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name} {brand.sub} B.V. · Rotterdam
          </p>
          <p className="text-muted/70">{brand.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
