import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateAdjustedDeltas, isChoiceAvailable } from '../engine/propagationEngine'
import { useGameStore } from '../store/gameStore'
import educationData from '../content/education.json'

export const DecisionCard = ({ stageData, onComplete }) => {
  const [hoveredChoice, setHoveredChoice] = useState(null)
  const { history, PI, SI, SH, WT, BD } = useGameStore()
  const currentState = { PI, SI, SH, WT, BD }

  const handleSelect = (choice) => {
    const adjustedDeltas = calculateAdjustedDeltas(choice, history, currentState)
    const edu = educationData.choices[choice.id]
    
    // We pass back exactly what happened so the ConsequencePanel can display it
    onComplete({
      choiceId: choice.id,
      name: choice.name,
      deltas: adjustedDeltas,
      cost: choice.cost || 0,
      education: edu
    })
  }

  return (
    <div className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 pointer-events-none z-20">
      
      {/* Education Preview Card (Layer 1) */}
      <AnimatePresence>
        {hoveredChoice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 bg-white text-gray-900 p-4 sm:p-6 rounded-xl shadow-2xl relative overflow-y-auto max-h-[50vh] xl:max-h-full pointer-events-auto border-t-4 border-indigo-500"
          >
            <h3 className="text-xl font-bold text-indigo-900 mb-2">{hoveredChoice.name}</h3>
            <p className="text-gray-700 italic border-l-4 border-indigo-300 pl-4 mb-4">
              "{educationData.choices[hoveredChoice.id]?.pre}"
            </p>
            
            <div className="flex gap-6 mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col">
                <span className="text-xs uppercase font-bold text-gray-500">Production Impact</span>
                <span className={`text-lg font-bold ${getDeltaColor(calculateAdjustedDeltas(hoveredChoice, history, currentState).PI)}`}>
                  {getDeltaVisual(calculateAdjustedDeltas(hoveredChoice, history, currentState).PI)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase font-bold text-gray-500">Sustainability Impact</span>
                <span className={`text-lg font-bold ${getDeltaColor(calculateAdjustedDeltas(hoveredChoice, history, currentState).SI)}`}>
                  {getDeltaVisual(calculateAdjustedDeltas(hoveredChoice, history, currentState).SI)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Choice Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center pointer-events-auto">
        {stageData.choices.map(choice => {
          const available = isChoiceAvailable(choice, history)
          
          return (
            <button
              key={choice.id}
              disabled={!available}
              onMouseEnter={() => available && setHoveredChoice(choice)}
              onMouseLeave={() => setHoveredChoice(null)}
              onClick={() => handleSelect(choice)}
              className={`
                px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-bold text-sm sm:text-lg transition-all duration-200 transform
                ${available 
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/50' 
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-70'}
              `}
            >
              {choice.name}
              {!available && <div className="text-xs mt-1 text-red-400 font-normal">Locked</div>}
              {available && <div className="text-xs mt-1 text-indigo-200 font-normal">Cost: ${choice.cost || 0}</div>}
            </button>
          )
        })}
      </div>
      
    </div>
  )
}

function getDeltaColor(val) {
  if (val > 0) return 'text-green-600'
  if (val < 0) return 'text-red-500'
  return 'text-gray-400'
}

function getDeltaVisual(val) {
  if (!val) return 'Neutral'
  const arrows = Math.min(3, Math.max(1, Math.ceil(Math.abs(val) / 10)))
  const symbol = val > 0 ? '↑' : '↓'
  let label = ""
  for(let i=0; i<arrows; i++) label += symbol;
  return label
}
