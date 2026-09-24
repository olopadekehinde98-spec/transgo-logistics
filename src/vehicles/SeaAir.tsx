import { motion, type MotionValue } from 'framer-motion'

type Props = { className?: string }

/** Container vessel, side elevation, with a deck stack that can be part-loaded. */
export function Ship({ className = '', loaded = 1 }: Props & { loaded?: number }) {
  const rows = [
    { y: 92, count: 9 },
    { y: 70, count: 8 },
    { y: 48, count: 6 },
  ]
  return (
    <svg viewBox="0 0 640 230" className={className} fill="none" aria-hidden>
      <g className="text-fog">
        {/* Deck stack */}
        {rows.map((row, ri) =>
          Array.from({ length: row.count }, (_, i) => {
            const show = i / row.count <= loaded
            const accent = ri === 2 && i === 2
            return (
              <rect
                key={`${ri}-${i}`}
                x={96 + i * 46}
                y={row.y}
                width={42}
                height={20}
                rx={1.5}
                fill={accent ? '#3a2708' : '#16202b'}
                stroke={accent ? 'var(--color-amber)' : 'currentColor'}
                strokeWidth={accent ? 2.2 : 1.6}
                opacity={show ? 1 : 0}
              />
            )
          }),
        )}

        {/* Superstructure at the stern */}
        <rect x="520" y="44" width="70" height="70" rx="2" fill="#121a23" stroke="currentColor" strokeWidth="2.5" />
        {[54, 70, 86].map((y) => (
          <path key={y} d={`M528 ${y}h54`} stroke="currentColor" strokeWidth="1.6" opacity="0.5" />
        ))}
        <path d="M556 44V22" stroke="currentColor" strokeWidth="2.5" />
        <rect x="548" y="14" width="16" height="10" fill="var(--color-amber)" />

        {/* Hull */}
        <path
          d="M56 114h552v40c0 20-16 36-36 36H120c-24 0-44-14-52-34L56 114z"
          fill="#121a23"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M70 140h520" stroke="var(--color-amber)" strokeWidth="2.5" opacity="0.85" />
        <text x="430" y="172" fill="currentColor" fontSize="17" fontFamily="var(--font-mono), monospace" letterSpacing="3" opacity="0.8">
          MERIDIAN
        </text>
        <path d="M96 114h424" stroke="currentColor" strokeWidth="1.6" opacity="0.4" />
      </g>
    </svg>
  )
}

/** Wake lines that sit under the vessel. */
export function Wake({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 640 60" className={className} fill="none" aria-hidden>
      <g className="text-fog" opacity="0.28">
        <path d="M40 16h180M260 16h120M420 16h150" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M90 34h120M250 34h180M470 34h90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M140 50h90M270 50h130" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}

/**
 * Ship-to-shore gantry crane. `trolley` slides the spreader along the boom and
 * `hoist` lowers it, so one scroll can pick a box off the quay and place it aboard.
 */
export function GantryCrane({
  className = '',
  trolley,
  hoist,
  carrying = true,
}: Props & { trolley?: MotionValue<number>; hoist?: MotionValue<number>; carrying?: boolean }) {
  return (
    <svg viewBox="0 0 560 420" className={className} fill="none" aria-hidden>
      <g className="text-fog">
        {/* Portal legs */}
        <path d="M150 400V150M210 400V150M410 400V150M470 400V150" stroke="currentColor" strokeWidth="4" />
        <path d="M150 300h60M410 300h60" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
        <path d="M130 400h100M390 400h100" stroke="currentColor" strokeWidth="5" />
        {/* Boom */}
        <path d="M40 132h480" stroke="currentColor" strokeWidth="6" />
        <path d="M40 132l110-40M520 132l-60-40" stroke="currentColor" strokeWidth="2.5" opacity="0.7" />
        <path d="M150 92h310" stroke="currentColor" strokeWidth="3" />
        <path d="M230 92v40M330 92v40M400 92v40" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        {/* Machine house */}
        <rect x="430" y="96" width="60" height="34" rx="2" fill="#121a23" stroke="currentColor" strokeWidth="2.5" />

        {/* Trolley + spreader */}
        <motion.g style={{ x: trolley }}>
          <rect x="86" y="120" width="52" height="20" rx="2" fill="#1d2a36" stroke="currentColor" strokeWidth="2.5" />
          <motion.g style={{ y: hoist }}>
            <path d="M96 140v90M128 140v90" stroke="currentColor" strokeWidth="2" opacity="0.8" />
            <rect x="72" y="228" width="80" height="14" rx="2" fill="#1d2a36" stroke="var(--color-amber)" strokeWidth="2.5" />
            {carrying && (
              <g>
                <rect x="58" y="242" width="108" height="46" rx="2" fill="#3a2708" stroke="var(--color-amber)" strokeWidth="2.5" />
                {[78, 98, 118, 138].map((x) => (
                  <path key={x} d={`M${x} 246v38`} stroke="var(--color-amber)" strokeWidth="1.2" opacity="0.5" />
                ))}
              </g>
            )}
          </motion.g>
        </motion.g>
      </g>
    </svg>
  )
}

/** Freighter aircraft, side elevation. */
export function Plane({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 620 220" className={className} fill="none" aria-hidden>
      <g className="text-fog">
        {/* Fuselage */}
        <path
          d="M64 128c0-22 20-38 52-38h330c40 0 78 10 108 30l30 20-30 18c-26 16-58 24-92 24H116c-32 0-52-16-52-36v-18z"
          fill="#121a23"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Tail fin */}
        <path d="M78 90L44 20h34l52 70z" fill="#16202b" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M56 40h30" stroke="var(--color-amber)" strokeWidth="3" />
        {/* Tailplane */}
        <path d="M64 96L36 76h28l26 20z" fill="#16202b" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        {/* Wing + engine */}
        <path d="M250 140l-70 52h58l82-52z" fill="#16202b" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="236" y="138" width="74" height="30" rx="14" fill="#1d2a36" stroke="currentColor" strokeWidth="2.5" />
        <path d="M236 152h74" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
        {/* Windows + door */}
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={i} cx={150 + i * 28} cy={116} r={4} fill="var(--color-amber)" opacity="0.65" />
        ))}
        <path d="M470 100c24 4 46 12 66 24" stroke="currentColor" strokeWidth="1.6" opacity="0.5" />
        <text x="150" y="160" fill="currentColor" fontSize="16" fontFamily="var(--font-mono), monospace" letterSpacing="3" opacity="0.7">
          MERIDIAN CARGO
        </text>
      </g>
    </svg>
  )
}
