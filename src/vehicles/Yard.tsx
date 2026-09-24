import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { Wheel } from './Road'

type Props = { className?: string }

/** Shipping container, used stacked in the yard and aboard the vessel. */
export function Container({ className = '', accent = false }: Props & { accent?: boolean }) {
  return (
    <svg viewBox="0 0 220 110" className={className} fill="none" aria-hidden>
      <rect x="3" y="3" width="214" height="104" rx="2" fill={accent ? '#2a1c07' : '#121a23'} stroke={accent ? 'var(--color-amber)' : 'currentColor'} strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, i) => (
        <path key={i} d={`M${20 + i * 18} 8v94`} stroke={accent ? 'var(--color-amber)' : 'currentColor'} strokeWidth="1.2" opacity="0.35" />
      ))}
      <rect x="3" y="3" width="214" height="16" fill={accent ? 'var(--color-amber)' : 'currentColor'} opacity="0.12" />
    </svg>
  )
}

/** Pallet of wrapped goods — the shipment itself. */
export function Pallet({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 160 150" className={className} fill="none" aria-hidden>
      <g className="text-fog">
        <rect x="18" y="16" width="124" height="94" rx="2" fill="#1a2430" stroke="currentColor" strokeWidth="2.5" />
        <path d="M18 52h124M18 82h124" stroke="currentColor" strokeWidth="1.4" opacity="0.4" />
        <rect x="52" y="30" width="56" height="22" rx="1.5" fill="var(--color-amber)" opacity="0.9" />
        <path d="M80 16v94" stroke="currentColor" strokeWidth="1.4" opacity="0.3" />
        {/* Pallet base */}
        <rect x="10" y="112" width="140" height="10" fill="#0d141b" stroke="currentColor" strokeWidth="2" />
        <rect x="18" y="122" width="18" height="14" fill="#0d141b" stroke="currentColor" strokeWidth="2" />
        <rect x="71" y="122" width="18" height="14" fill="#0d141b" stroke="currentColor" strokeWidth="2" />
        <rect x="124" y="122" width="18" height="14" fill="#0d141b" stroke="currentColor" strokeWidth="2" />
      </g>
    </svg>
  )
}

/**
 * Forklift. `lift` raises the carriage and whatever sits on the forks,
 * so the same value drives the mast, the forks and the pallet together.
 */
export function Forklift({ className = '', lift, spin }: Props & { lift?: MotionValue<number>; spin?: MotionValue<number> }) {
  return (
    <svg viewBox="0 0 300 260" className={className} fill="none" aria-hidden>
      <g className="text-fog">
        {/* Counterweight body */}
        <path d="M120 236v-60c0-5 4-9 9-9h26v-34c0-5 4-9 9-9h58c5 0 9 4 9 9v103H120z" fill="#121a23" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Overhead guard */}
        <path d="M150 124V92h84v32" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M150 92h84" stroke="var(--color-amber)" strokeWidth="3" />
        <path d="M160 124v43M226 124v43" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        {/* Operator */}
        <circle cx="186" cy="140" r="11" fill="#1d2a36" stroke="currentColor" strokeWidth="2" />
        <path d="M172 167v-14c0-8 6-14 14-14s14 6 14 14v14" fill="#1d2a36" stroke="currentColor" strokeWidth="2" />

        {/* Mast */}
        <rect x="66" y="40" width="10" height="196" fill="#0d141b" stroke="currentColor" strokeWidth="2" />
        <rect x="92" y="40" width="10" height="196" fill="#0d141b" stroke="currentColor" strokeWidth="2" />
        <path d="M66 44h36" stroke="currentColor" strokeWidth="2" opacity="0.6" />

        {/* Carriage + forks + load all ride the same lift value */}
        <motion.g style={{ y: lift }}>
          <rect x="60" y="150" width="48" height="46" rx="2" fill="#1d2a36" stroke="currentColor" strokeWidth="2.5" />
          <path d="M60 196H18v10h42" fill="#0d141b" stroke="var(--color-amber)" strokeWidth="3" strokeLinejoin="round" />
          <g transform="translate(-86 66)">
            <Pallet className="h-[130px] w-[140px]" />
          </g>
        </motion.g>

        <Wheel cx={148} cy={236} r={20} spin={spin} />
        <Wheel cx={216} cy={236} r={20} spin={spin} />
      </g>
    </svg>
  )
}

/** Mirrors the stride so the far leg swings the opposite way. */
function useNegate(v?: MotionValue<number>) {
  const zero = useMotionValue(0)
  return useTransform(v ?? zero, (x: number) => -x)
}

/** Courier with a parcel for the final step. */
export function Courier({ className = '', stride }: Props & { stride?: MotionValue<number> }) {
  return (
    <svg viewBox="0 0 140 240" className={className} fill="none" aria-hidden>
      <g className="text-fog" strokeLinecap="round">
        {/* Head + cap */}
        <circle cx="70" cy="42" r="16" fill="#1d2a36" stroke="currentColor" strokeWidth="2.5" />
        <path d="M54 38a16 16 0 0 1 32 0z" fill="var(--color-amber)" />
        {/* Torso */}
        <path d="M70 58v72" stroke="currentColor" strokeWidth="3" />
        <path d="M46 78c6-10 16-16 24-16s18 6 24 16v34H46z" fill="#121a23" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M46 92h48" stroke="var(--color-amber)" strokeWidth="2.5" opacity="0.9" />
        {/* Arms holding a parcel */}
        <path d="M48 96l-12 26h18" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M92 96l12 26H86" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <rect x="42" y="112" width="56" height="40" rx="2" fill="#1a2430" stroke="currentColor" strokeWidth="2.5" />
        <path d="M70 112v40M42 132h56" stroke="var(--color-amber)" strokeWidth="1.8" opacity="0.8" />
        {/* Legs — alternate with stride */}
        <motion.g style={{ rotate: stride, transformBox: 'view-box', transformOrigin: '70px 152px' }}>
          <path d="M70 152l-14 62" stroke="currentColor" strokeWidth="3.5" />
          <path d="M56 214h-12" stroke="currentColor" strokeWidth="3.5" />
        </motion.g>
        <motion.g style={{ rotate: useNegate(stride), transformBox: 'view-box', transformOrigin: '70px 152px' }}>
          <path d="M70 152l14 62" stroke="currentColor" strokeWidth="3.5" />
          <path d="M84 214h12" stroke="currentColor" strokeWidth="3.5" />
        </motion.g>
      </g>
    </svg>
  )
}
