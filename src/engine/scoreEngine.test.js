import { describe, it, expect } from 'vitest'
import { applyScoreDeltas, calculateFinalScore } from './scoreEngine'

describe('scoreEngine', () => {
  it('applyScoreDeltas prevents going above 100 or below 0', () => {
    const state = { PI: 90, SI: 10, SH: 50, WT: 70, BD: 60 }
    
    const deltas = { PI: 20, SI: -20, SH: 0, WT: 0, BD: 0 }
    
    const newState = applyScoreDeltas(state, deltas)
    
    expect(newState.PI).toBe(100) // Capped at 100
    expect(newState.SI).toBe(0)   // Floored at 0
    expect(newState.SH).toBe(50)
  })

  it('calculateFinalScore rewards balance', () => {
    // 0.4*50 + 0.6*50 = 50. Base = 50. Balance bonus = 10 * 0.5 = 5. Total = 55.
    const res1 = calculateFinalScore(50, 50)
    expect(res1.finalScore).toBe(55)

    // 0.4*20 + 0.6*80 = 56. Base = 56. Balance bonus = max(0, 10 - 60) = 0. Total = 56.
    const res2 = calculateFinalScore(20, 80)
    expect(res2.finalScore).toBe(56)

    // 0.4*90 + 0.6*90 = 90. Base = 90. Balance bonus = 10*0.5 = 5. Total = 95.
    const res3 = calculateFinalScore(90, 90)
    expect(res3.finalScore).toBe(95)
  })
})
