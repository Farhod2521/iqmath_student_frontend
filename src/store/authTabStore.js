import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// auth tablar: signIn, signUp, forgetPassword, receiveCode, verifySms, newPassword
export const useAuthTabStore = create(
  devtools(
    persist(
      (set) => ({
        phoneTab: '',
        setPhoneTab: (phoneTab) => set({ phoneTab }),
        currentTab: 'signIn', // boshlang'ich holat
        setTab: (tab) => set({ currentTab: tab }) // tabni o'zgartirish
      }),
      {
        name: 'auth-tab-storage', // localStorage key nomi
        getStorage: () => localStorage // localStorage dan foydalanish
      }
    ),
    { name: 'AuthTabStore' } // Redux DevTools-da ko‘rinadigan nom
  )
)
