import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { config } from '@/config'

export const useSettingsStore = create(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        darkMode: false,
        isSidebarOpen: true,
        lang: config.DEFAULT_APP_LANG,
        titlePage: 'Student',
        // isRecommendedMenu: false,
        // setRecommendedMenu: (bisRecommendedMenuol) => set({ isRecommendedMenu }),
        setToken: (token) => set({ token }),
        setLang: (lang) => set({ lang }),
        setTitlePage: (titlePage) => set({ titlePage }),
        setIsSidebarOpen: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
        toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode }))
      }),
      { name: 'settings' }
    )
  )
)
