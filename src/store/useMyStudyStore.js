import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useMyStudyStore = create(
  devtools(
    persist(
      (set) => ({
        tab: 'active',
        handleTab: (tab) => set({ tab })
      }),
      { name: 'my-study' }
    )
  )
)
