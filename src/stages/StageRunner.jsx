import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { DecisionCard } from '../ui/DecisionCard'
import { ConsequencePanel } from '../ui/ConsequencePanel'
import stagesData from '../content/stages.json'

export const StageRunner = () => {
  const { stage, applyChoice, nextStage } = useGameStore()
  const [consequenceData, setConsequenceData] = useState(null)
  
  // Game complete state is > 5
  if (stage > 5) return null

  const currentStageData = stagesData.stages[stage - 1]

  const handleDecisionComplete = (data) => {
    // 1. Update the store immediately
    applyChoice(currentStageData.id, data.choiceId, data.deltas, data.cost)
    // 2. Show the consequence panel
    setConsequenceData(data)
  }

  const handleNextStage = () => {
    setConsequenceData(null)
    nextStage()
  }

  return (
    <>
      {!consequenceData && (
        <DecisionCard 
          stageData={currentStageData} 
          onComplete={handleDecisionComplete} 
        />
      )}

      {consequenceData && (
        <ConsequencePanel
          choiceName={consequenceData.name}
          deltas={consequenceData.deltas}
          education={consequenceData.education}
          onNext={handleNextStage}
        />
      )}
    </>
  )
}
