import { create } from 'zustand'

export const useEventStore = create((set) => ({
  activeEvent: null, // The currently displaying random event
  eventLog: [], // History of events that happened
  
  triggerEvent: (event) => {
    set((state) => ({
      activeEvent: event,
      eventLog: [...state.eventLog, event],
    }))
  },
  
  clearActiveEvent: () => {
    set({ activeEvent: null })
  },
  
  resetEvents: () => {
    set({ activeEvent: null, eventLog: [] })
  }
}))
