import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useLangStore = create(
  devtools((set) => ({
    lang: 'en',
    setLang: (lang) => set({ lang })
  }))
)
