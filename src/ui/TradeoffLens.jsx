import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export const TradeoffLens = () => {
  const { PI, SI, stage } = useGameStore()
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="absolute top-24 right-4 sm:right-8 w-64 sm:w-[350px] bg-sky-950 text-sky-50 p-4 sm:p-6 rounded-2xl shadow-2xl border border-sky-600 z-[60] pointer-events-auto overflow-hidden">
      <button 
        onClick={() => setVisible(false)}
        className="absolute top-2 right-4 text-sky-400 hover:text-white text-lg font-bold z-10"
      >
        ✕
      </button>
      
      <h3 className="text-xl font-bold mb-2 pr-6 relative z-10">Tradeoff Lens</h3>
      <p className="text-sm text-sky-200 mb-4 relative z-10">
        Optimization means finding choices that increase both factors, or making calculated sacrifices.
      </p>
      
      <div className="relative w-full aspect-square border-l-2 border-b-2 border-slate-500 bg-slate-900 overflow-hidden rounded-lg mt-2">
        {/* Optimal Zone */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-green-500/20 rounded-bl-3xl border-b border-l border-green-500/50" />
        
        {/* Axis Labels */}
        <span className="absolute bottom-1 right-2 text-xs text-slate-400 font-bold uppercase tracking-wider">Production</span>
        <span className="absolute top-2 left-1 text-xs text-slate-400 font-bold uppercase tracking-wider -rotate-90 origin-top-left translate-y-full">Sustainability</span>
        
        {/* Helper grid lines */}
        <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-slate-700/50" />
        <div className="absolute left-[40%] top-0 bottom-0 w-[1px] bg-slate-700/50" />
        <div className="absolute left-[60%] top-0 bottom-0 w-[1px] bg-slate-700/50" />
        <div className="absolute left-[80%] top-0 bottom-0 w-[1px] bg-slate-700/50" />
        <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-slate-700/50" />
        <div className="absolute top-[40%] left-0 right-0 h-[1px] bg-slate-700/50" />
        <div className="absolute top-[60%] left-0 right-0 h-[1px] bg-slate-700/50" />
        <div className="absolute top-[80%] left-0 right-0 h-[1px] bg-slate-700/50" />

        {/* Origin */}
        <span className="absolute bottom-0 left-0 translate-y-full -translate-x-full text-[10px] text-slate-600">0</span>
        
        {/* Player Position Indicator */}
        <motion.div 
          className="absolute w-5 h-5 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20 -translate-x-1/2 translate-y-1/2 border-2 border-black"
          animate={{ 
            left: `${Math.max(2, Math.min(98, PI))}%`, 
            bottom: `${Math.max(2, Math.min(98, SI))}%` 
          }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        />
      </div>
    </div>
  )
}
