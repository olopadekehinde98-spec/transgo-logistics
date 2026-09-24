import { createContext, useContext } from 'react'

export type Overlay = { kind: 'quote'; subject?: string } | null

export type UI = {
  overlay: Overlay
  open: (o: Exclude<Overlay, null>) => void
  close: () => void
  /** Index of the journey stage currently on screen. */
  stage: number
  setStage: (i: number) => void
}

export const UIContext = createContext<UI | null>(null)

export function useUI(): UI {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used inside UIContext')
  return ctx
}

export const EASE = [0.22, 1, 0.36, 1] as const
export const EASE_MASK = [0.76, 0, 0.24, 1] as const

export function goTo(id: string) {
  document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
}
