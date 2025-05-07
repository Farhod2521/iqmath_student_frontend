import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useTopicStore = create(
  devtools((set) => ({
    topic: null,
    setTopic: (topic) => set({ topic }),
    clearTopic: () => set({ topic: null })
  }))
)
