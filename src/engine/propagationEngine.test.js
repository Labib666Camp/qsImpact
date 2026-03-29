import { describe, it, expect } from 'vitest'
import { calculateAdjustedDeltas, isChoiceAvailable } from './propagationEngine'

describe('propagationEngine', () => {
  const currentState = { PI: 50, SI: 50, SH: 50, WT: 50, BD: 50 }

  it('calculates un-modified deltas correctly', () => {
    const choiceData = {
      id: "test",
      baseDeltas: { PI: 10, SI: -5 }
    }
    const history = []
    
    const deltas = calculateAdjustedDeltas(choiceData, history, currentState)
    expect(deltas.PI).toBe(10)
    expect(deltas.SI).toBe(-5)
    expect(deltas.SH).toBe(0)
  })

  it('applies modifiers based on history', () => {
    const choiceData = {
       id: "test2",
       baseDeltas: { PI: 5, SI: 5 },
       modifiers: [
         {
           condition: { type: "history", choiceId: "bad_choice" },
           effect: { PI: -5, SI: -10 }
         }
       ]
    }

    // When history DOES NOT have the choice
    const deltas1 = calculateAdjustedDeltas(choiceData, [{stageId: "1", choice: "good_choice"}], currentState)
    expect(deltas1.PI).toBe(5)
    expect(deltas1.SI).toBe(5)

    // When history DOES have the choice
    const deltas2 = calculateAdjustedDeltas(choiceData, [{stageId: "1", choice: "bad_choice"}], currentState)
    expect(deltas2.PI).toBe(0)
    expect(deltas2.SI).toBe(-5)
  })

  it('applies modifiers based on stats', () => {
    const choiceData = {
       id: "test3",
       baseDeltas: { PI: 0 },
       modifiers: [
         {
           condition: { type: "stat", stat: "SH", operator: ">", value: 60 },
           effect: { PI: 10 }
         }
       ]
    }

    const lowSHState = { ...currentState, SH: 50 }
    const deltas1 = calculateAdjustedDeltas(choiceData, [], lowSHState)
    expect(deltas1.PI).toBe(0)

    const highSHState = { ...currentState, SH: 80 }
    const deltas2 = calculateAdjustedDeltas(choiceData, [], highSHState)
    expect(deltas2.PI).toBe(10)
  })

  it('checks choice availability rules', () => {
    const choiceData = {
      id: "req_choice",
      requirements: { history: ["soil_test"] }
    }

    const av1 = isChoiceAvailable(choiceData, [{stageId: "1", choice: "some_other_thing"}])
    expect(av1).toBe(false)

    const av2 = isChoiceAvailable(choiceData, [{stageId: "1", choice: "soil_test"}])
    expect(av2).toBe(true)
  })
})
