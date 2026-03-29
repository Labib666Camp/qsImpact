import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { motion, AnimatePresence } from 'framer-motion'

export const GuideOverlay = ({ isOpen, onClose }) => {
  const { stage } = useGameStore()
  const [step, setStep] = useState(1) // 1: Welcome, 2: Guide

  const steps = [
    { id: 1, name: "Land Preparation", desc: "Decide how to treat the soil before planting. Impacts erosion and water retention." },
    { id: 2, name: "Cropping System", desc: "Choose what to plant. Impacts biodiversity and long-term soil health." },
    { id: 3, name: "Nutrient Management", desc: "Feed your plants. Balances short-term yield against soil microbiome damage." },
    { id: 4, name: "Irrigation System", desc: "Deliver water. Affects the regional aquifer and prevents drought." },
    { id: 5, name: "Harvest", desc: "Collect your yield. How you handle crop residue affects next year's soil." }
  ]

  const handleNext = () => {
    if (step === 1) setStep(2)
    else onClose()
  }

  const handleClose = () => {
    setStep(1) // Reset for next open
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 text-white"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-10 shadow-[0_0_100px_rgba(79,70,229,0.2)] relative overflow-hidden"
          >
            {/* Background Branding Decor */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px]"></div>

            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-10"
            >
              ✕
            </button>
            
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="welcome"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="relative z-10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/30">Sustainability Sim</span>
                  </div>
                  <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    Your Farm
                  </h1>
                  
                  <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                    <p>
                      Welcome to <span className="text-white font-bold">Your Farm</span>, an advanced agricultural advisor simulation. 
                      You are in control of a multi-year farming operation.
                    </p>
                    <p>
                      The challenge is simple but profound: <span className="text-blue-400 font-bold">Production</span> gives you immediate profit, but <span className="text-emerald-400 font-bold">Sustainability</span> ensures you have a farm to return to next year.
                    </p>
                    <p className="border-l-4 border-indigo-500 pl-6 py-2 italic text-slate-400">
                      "Success isn't measured in a single harvest, but in the health of the land you leave behind."
                    </p>
                    <p>
                      Optimize your decisions across 5 critical stages to balance your budget and the environment.
                    </p>
                  </div>

                  <button
                    onClick={handleNext}
                    className="mt-10 w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-indigo-900/40 text-xl"
                  >
                    HOW TO PLAY
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="guide"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="relative z-10"
                >
                  <h2 className="text-3xl font-black text-white mb-2">The 5-Stage Cycle</h2>
                  <p className="text-slate-400 mb-8 border-b border-slate-800 pb-4">
                    Every season consists of these phases. Your balance of Production and Sustainability determines your final trajectory.
                  </p>

                  <div className="space-y-3">
                    {steps.map((stepItem) => {
                      const isActive = stepItem.id === stage
                      const isPast = stepItem.id < stage
                      
                      return (
                        <div 
                          key={stepItem.id} 
                          className={`flex items-start p-4 rounded-2xl border transition-all ${
                            isActive 
                              ? 'bg-indigo-900/40 border-indigo-500/50 shadow-inner' 
                              : isPast 
                                ? 'bg-slate-800/30 border-slate-800 opacity-60' 
                                : 'bg-slate-800/50 border-slate-700/50'
                          }`}
                        >
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black mr-4 ${
                            isActive ? 'bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-700 text-slate-400'
                          }`}>
                            {stepItem.id}
                          </div>
                          <div>
                            <h3 className={`font-bold text-lg ${isActive ? 'text-indigo-300' : 'text-slate-200'}`}>
                              {stepItem.name} {isActive && <span className="text-[10px] ml-2 bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">Current</span>}
                            </h3>
                            <p className="text-sm text-slate-400 leading-tight">{stepItem.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <button
                    onClick={handleNext}
                    className="mt-8 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-emerald-900/40 text-xl"
                  >
                    START FARMING
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
