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
        setTab: (tab) => set({ currentTab: tab }), // tabni o'zgartirish
        resetAuth: () => set({ currentTab: 'signIn', phoneTab: '' }) // auth holatini tozalash
      }),
      {
        name: 'auth-tab-storage', // localStorage key nomi
        getStorage: () => localStorage, // localStorage dan foydalanish
        partialize: (state) => ({ 
          currentTab: state.currentTab, 
          phoneTab: state.phoneTab 
        }) // Faqat bu ma'lumotlarni saqlaymiz
      }
    ),
    { name: 'AuthTabStore' } // Redux DevTools-da ko'rinadigan nom
  )
)
