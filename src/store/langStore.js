import { config } from '@/config'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useLangStore = create(
  devtools((set) => ({
    lang: config.DEFAULT_APP_LANG,
    setLang: (lang) => set({ lang })
  }))
)
