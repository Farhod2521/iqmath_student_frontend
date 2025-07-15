import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useUserStore = create(
  devtools(
    persist(
      (set) => ({
    user: null,
    setUser: (user) => set({ user }),
        role: null,
        setRole: (role) => set({ role }),
    currencyList: [],
    setCurrencyList: (currencyList) => set({ currencyList })
      }),
      {
        name: 'user-store', // localStorage key
        partialize: (state) => ({ 
          user: state.user, 
          role: state.role,
          currencyList: state.currencyList 
        }), // Faqat bu ma'lumotlarni saqlaymiz
      }
    )
  )
)
