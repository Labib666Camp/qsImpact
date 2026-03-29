import { create } from 'zustand'

const initialState = {
  year: 1,
  budget: 50000,
  PI: 0,
  SI: 0,
  SH: 50,
  WT: 70,
  BD: 60,
  stage: 1, // 1: Land Prep, 2: Cropping, 3: Fertilizer, 4: Irrigation, 5: Harvest
  history: [], // Array of choices made
}

export const useGameStore = create((set, get) => ({
  ...initialState,
  
  applyChoice: (stageId, choice, deltas, cost = 0) => {
    set((state) => ({
      budget: state.budget - cost,
      PI: Math.min(100, Math.max(0, state.PI + (deltas.PI || 0))),
      SI: Math.min(100, Math.max(0, state.SI + (deltas.SI || 0))),
      SH: Math.min(100, Math.max(0, state.SH + (deltas.SH || 0))),
      WT: Math.min(100, Math.max(0, state.WT + (deltas.WT || 0))),
      BD: Math.min(100, Math.max(0, state.BD + (deltas.BD || 0))),
      history: [...state.history, { stageId, choice }],
    }))
  },

  nextStage: () => {
    set((state) => ({ stage: Math.min(6, state.stage + 1) }))
  },

  nextYear: () => {
    set((state) => ({
      year: state.year + 1,
      stage: 1,
      PI: 0,
      SI: 0,
      history: []
    }))
  },

  resetGame: () => set(initialState),
}))
