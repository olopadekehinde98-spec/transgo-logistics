import { motion, type MotionValue } from 'framer-motion'

type WheelProps = { cx: number; cy: number; r: number; spin?: MotionValue<number> }

/** Wheel with a hub that rotates — the tell that the vehicle is really moving. */
export function Wheel({ cx, cy, r, spin }: WheelProps) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#0b0f14" stroke="currentColor" strokeWidth={2.5} />
      <motion.g style={{ rotate: spin, transformBox: 'view-box', transformOrigin: `${cx}px ${cy}px` }}>
        <circle cx={cx} cy={cy} r={r * 0.46} fill="none" stroke="var(--color-amber)" strokeWidth={2} />
        {[0, 60, 120].map((a) => {
          const rad = (a * Math.PI) / 180
          return (
            <line
              key={a}
              x1={cx - Math.cos(rad) * r * 0.62}
              y1={cy - Math.sin(rad) * r * 0.62}
              x2={cx + Math.cos(rad) * r * 0.62}
              y2={cy + Math.sin(rad) * r * 0.62}
              stroke="currentColor"
              strokeWidth={1.6}
              opacity={0.75}
            />
          )
        })}
      </motion.g>
    </g>
  )
}

type Props = { className?: string; spin?: MotionValue<number>; label?: string }

/** Articulated truck: trailer + tractor unit, side elevation. */
export function Truck({ className = '', spin, label = 'MERIDIAN' }: Props) {
  return (
    <svg viewBox="0 0 470 180" className={className} fill="none" aria-hidden>
      <g className="text-fog">
        {/* Trailer */}
        <rect x="26" y="30" width="286" height="82" rx="3" fill="#121a23" stroke="currentColor" strokeWidth="2.5" />
        <path d="M26 52h286" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
        {[70, 114, 158, 202, 246].map((x) => (
          <path key={x} d={`M${x} 34v74`} stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
        ))}
        <rect x="40" y="62" width="150" height="26" rx="2" fill="none" stroke="var(--color-amber)" strokeWidth="1.6" opacity="0.9" />
        <text x="52" y="81" fill="var(--color-amber)" fontSize="17" fontFamily="var(--font-mono), monospace" letterSpacing="3">
          {label}
        </text>

        {/* Chassis + landing gear */}
        <rect x="26" y="112" width="300" height="9" fill="#0d141b" stroke="currentColor" strokeWidth="2" />
        <path d="M208 121v16M216 121v16" stroke="currentColor" strokeWidth="2" opacity="0.6" />

        {/* Tractor unit */}
        <path
          d="M326 121V58c0-4 3-7 7-7h34l30 34h22c5 0 9 4 9 9v27H326z"
          fill="#121a23"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M341 59h24l22 25h-46z" fill="#1d2a36" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M398 92h22" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <rect x="412" y="98" width="16" height="9" rx="2" fill="var(--color-amber-soft)" />
        <path d="M330 51v-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

        {/* Mudguards */}
        <path d="M74 121a34 34 0 0 1 68 0" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <path d="M356 121a30 30 0 0 1 60 0" stroke="currentColor" strokeWidth="2" opacity="0.5" />

        <Wheel cx={108} cy={134} r={26} spin={spin} />
        <Wheel cx={168} cy={134} r={26} spin={spin} />
        <Wheel cx={386} cy={134} r={26} spin={spin} />
      </g>
    </svg>
  )
}

/** City delivery van for the last mile. */
export function Van({ className = '', spin }: Props) {
  return (
    <svg viewBox="0 0 340 170" className={className} fill="none" aria-hidden>
      <g className="text-fog">
        <path
          d="M24 118V44c0-4 3-7 7-7h158v81H24z"
          fill="#121a23"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M189 37h47l40 44h20c5 0 9 4 9 9v28H189z" fill="#121a23" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M196 47h36l30 33h-66z" fill="#1d2a36" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <rect x="44" y="58" width="112" height="34" rx="2" fill="none" stroke="var(--color-amber)" strokeWidth="1.6" />
        <text x="54" y="82" fill="var(--color-amber)" fontSize="16" fontFamily="var(--font-mono), monospace" letterSpacing="3">
          MERIDIAN
        </text>
        <rect x="288" y="96" width="14" height="9" rx="2" fill="var(--color-amber-soft)" />
        <path d="M24 118h281" stroke="currentColor" strokeWidth="2" />
        <Wheel cx={86} cy={128} r={22} spin={spin} />
        <Wheel cx={246} cy={128} r={22} spin={spin} />
      </g>
    </svg>
  )
}

/** Roadside furniture used to sell the sense of speed. */
export function RoadFurniture({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" aria-hidden>
      <g className="text-fog" opacity="0.5">
        <path d="M40 150V40" stroke="currentColor" strokeWidth="3" />
        <path d="M40 46h34" stroke="currentColor" strokeWidth="3" />
        <path d="M74 46v10" stroke="currentColor" strokeWidth="2" />
        <circle cx="74" cy="60" r="4" fill="var(--color-amber)" />
      </g>
    </svg>
  )
}
