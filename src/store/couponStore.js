import { create } from 'zustand'

const useCouponStore = create((set) => ({
  isCouponModalOpen: false,
  couponData: null,
  originalPrice: 0,
  
  openCouponModal: (originalPrice = 0) => set({ 
    isCouponModalOpen: true, 
    originalPrice,
    couponData: null 
  }),
  
  closeCouponModal: () => set({ 
    isCouponModalOpen: false, 
    couponData: null 
  }),
  
  setCouponData: (data) => set({ couponData: data }),
  
  applyCoupon: (couponData) => {
    set({ 
      isCouponModalOpen: false, 
      couponData: null 
    })
    return couponData
  }
}))

export { useCouponStore }
