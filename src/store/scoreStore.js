import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useScoreStore = create(
  devtools(
    persist((set) => ({
      scoreData: {
        student: '',
        sum: 0,
        score: 0,
        coin: 0,
        isLoading: false
      },
      setScoreData: (data) =>
        set((state) => ({
          scoreData: {
            ...state.scoreData,
            ...data
          }
        }))
    }))
  )
)
