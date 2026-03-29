import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'

export const ConsequencePanel = ({ choiceName, deltas, education, onNext }) => {
  const { PI, SI, SH, WT, BD } = useGameStore()
  const [progress, setProgress] = useState(0)
  
  // 10 second animation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 10) {
          clearInterval(timer)
          return 10
        }
        return p + 0.1
      })
    }, 100)
    
    return () => clearInterval(timer)
  }, [])
  
  const isFinished = progress >= 10

  // Find which hidden stat had the biggest impact to show
  const hiddenImpacts = [
    { name: 'Soil Health', val: deltas.SH || 0 },
    { name: 'Water Table', val: deltas.WT || 0 },
    { name: 'Biodiversity', val: deltas.BD || 0 }
  ]
  const biggestImpact = hiddenImpacts.sort((a,b) => Math.abs(b.val) - Math.abs(a.val))[0]
  
  let impactText = ""
  if (biggestImpact.val > 0) impactText = `${biggestImpact.name}: Improved`
  else if (biggestImpact.val < 0) impactText = `${biggestImpact.name}: Damaged`
  else impactText = "Hidden stats neutral"

  return (
    <div className="fixed inset-y-0 left-0 z-50 flex flex-col justify-start p-6 pt-[480px] pointer-events-none w-full max-w-sm sm:max-w-md xl:max-w-lg">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/95 backdrop-blur-md text-gray-900 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-6 sm:p-8 w-full max-h-[45vh] overflow-y-auto pointer-events-auto border border-white/20"
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-indigo-900">Outcome: {choiceName}</h2>
            {!isFinished && (
              <span className="animate-pulse text-indigo-500 font-bold text-sm bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                Simulation Running...
              </span>
            )}
          </div>
          
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 sm:p-5 mb-4 sm:mb-6 shadow-inner">
            <p className="text-base sm:text-lg text-indigo-900 font-medium mb-3">"{education.post}"</p>
            <div className="mt-4 pt-4 border-t border-indigo-200">
              <span className="text-xs sm:text-sm font-bold uppercase text-indigo-500 tracking-wider">Real World Truth</span>
              <p className="mt-1 text-sm sm:text-base text-gray-700 italic border-l-4 border-indigo-500 pl-3">
                {education.realWorldAnchor}
              </p>
            </div>
          </div>

          {!isFinished && (
             <div className="w-full bg-slate-200 rounded-full h-3 mb-6 overflow-hidden border border-slate-300">
                <div 
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-100 ease-linear" 
                  style={{ width: `${(progress / 10) * 100}%` }}
                ></div>
             </div>
          )}

          {isFinished && (
            <div className="grid grid-cols-2 gap-4 mb-6 sm:mb-8 animate-fade-in">
              <div className="bg-blue-50 bg-opacity-50 border border-blue-100 rounded-lg p-3 sm:p-4 text-center">
                <span className="text-xs sm:text-sm font-bold uppercase text-blue-500 block">Production</span>
                <span className={`text-xl sm:text-2xl font-black ${deltas.PI > 0 ? 'text-green-600' : deltas.PI < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                  {deltas.PI > 0 ? '+' : ''}{deltas.PI || 0}
                </span>
              </div>
              <div className="bg-green-50 bg-opacity-50 border border-green-100 rounded-lg p-3 sm:p-4 text-center">
                <span className="text-xs sm:text-sm font-bold uppercase text-green-500 block">Sustainability</span>
                <span className={`text-xl sm:text-2xl font-black ${deltas.SI > 0 ? 'text-green-600' : deltas.SI < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                  {deltas.SI > 0 ? '+' : ''}{deltas.SI || 0}
                </span>
              </div>
              <div className="col-span-2 text-center text-xs sm:text-sm font-semibold text-gray-500 mt-2">
                Observation: <span className="text-indigo-600">{impactText}</span>
              </div>
            </div>
          )}

          <button
            onClick={onNext}
            disabled={!isFinished}
            className={`w-full py-3 sm:py-4 font-bold text-base sm:text-lg rounded-2xl transition-all ${
              isFinished 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 transform hover:-translate-y-1' 
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isFinished ? 'Continue to Next Stage' : `Simulating Impact... (${(10 - progress).toFixed(1)}s)`}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
