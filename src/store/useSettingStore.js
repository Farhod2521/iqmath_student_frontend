import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useSettingStore = create(
  devtools(
    persist(
      (set, get) => ({
        isSidebarOpen: true,
        titlePage: 'Student',
        setTitlePage: (titlePage) => set({ titlePage }),
        setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen })
      }),
      { name: 'setting' }
    )
  )
)
