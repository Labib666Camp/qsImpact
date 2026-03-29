import { useState } from 'react'
import { HUD } from './ui/HUD'
import { SceneManager } from './scene/SceneManager'
import { StageRunner } from './stages/StageRunner'
import { FarmReport } from './ui/FarmReport'
import { TradeoffLens } from './ui/TradeoffLens'
import { GuideOverlay } from './ui/GuideOverlay'
import { useGameStore } from './store/gameStore'
import './index.css'

function App() {
  const { stage } = useGameStore()
  const [isGuideOpen, setIsGuideOpen] = useState(true)

  return (
    <div className="w-full h-full relative overflow-hidden bg-sky-900 font-sans">
      <SceneManager />
      
      {stage <= 5 && <HUD onOpenGuide={() => setIsGuideOpen(true)} />}
      {stage <= 5 && <TradeoffLens />}
      {stage <= 5 && <StageRunner />}
      
      {stage > 5 && <FarmReport />}

      <GuideOverlay isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  )
}

export default App
