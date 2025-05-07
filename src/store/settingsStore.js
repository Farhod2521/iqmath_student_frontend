import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { config } from '@/config'

export const useSettingsStore = create(
  devtools(
    persist(
      (set) => ({
        token: null,
        darkMode: false,
        lang: config.DEFAULT_APP_LANG,

        setToken: (token) => set({ token }),
        setLang: (lang) => set({ lang }),
        toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode }))
      }),
      { name: 'settings' }
    )
  )
)
