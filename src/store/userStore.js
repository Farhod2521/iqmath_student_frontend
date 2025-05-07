import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useUserStore = create(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),

    currencyList: [],
    setCurrencyList: (currencyList) => set({ currencyList })
  }))
)
