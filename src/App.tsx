import { MotionConfig } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { QuoteDrawer } from './components/QuoteDrawer'
import { TrackerHUD } from './components/TrackerHUD'
import { UIContext, type Overlay, type UI } from './lib/ui'
import { FinalCTA } from './sections/FinalCTA'
import { Hero } from './sections/Hero'
import { JourneyIntro } from './sections/JourneyIntro'
import { Network } from './sections/Network'
import { Services } from './sections/Services'
import { StageCustoms } from './sections/StageCustoms'
import { StageLastMile } from './sections/StageLastMile'
import { StageOcean } from './sections/StageOcean'
import { StagePort } from './sections/StagePort'
import { StageRoad } from './sections/StageRoad'
import { StageWarehouse } from './sections/StageWarehouse'
import { Technology } from './sections/Technology'
import { Tracking } from './sections/Tracking'

export default function App() {
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [stage, setStage] = useState(0)

  const open = useCallback((o: Exclude<Overlay, null>) => setOverlay(o), [])
  const close = useCallback(() => setOverlay(null), [])
  const ui: UI = useMemo(() => ({ overlay, open, close, stage, setStage }), [overlay, open, close, stage])

  return (
    <MotionConfig reducedMotion="user">
      <UIContext.Provider value={ui}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-amber focus:px-4 focus:py-2 focus:text-night"
        >
          Skip to content
        </a>
        <Navbar />
        <TrackerHUD />
        <main id="main">
          <Hero />
          <JourneyIntro />
          <StageWarehouse index={0} />
          <StageRoad index={1} />
          <StagePort index={2} />
          <StageOcean index={3} />
          <StageCustoms index={4} />
          <StageLastMile index={5} />
          <Services />
          <Network />
          <Technology />
          <Tracking />
          <FinalCTA />
        </main>
        <Footer />
        <QuoteDrawer />
      </UIContext.Provider>
    </MotionConfig>
  )
}
