import { create } from 'zustand'

const usePricingModalStore = create((set) => ({
  isPricingModalOpen: false,
  originalPrice: 0,
  
  openPricingModal: (originalPrice = 0) => set({ 
    isPricingModalOpen: true, 
    originalPrice
  }),
  
  closePricingModal: () => set({ 
    isPricingModalOpen: false, 
    originalPrice: 0
  })
}))

export { usePricingModalStore }
