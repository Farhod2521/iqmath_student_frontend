import React from 'react'
import { useSettingStore, useCouponStore, usePricingModalStore } from '@/store'
import SidebarMenu from './SidebarMenu'
import SidebarLogo from './SidebarLogo'
import SidebarPlan from './SidebarPlan'
import SidebarFooter from './SidebarFooter'
import CouponModal from './CouponModal'
import PricingModal from '@/modules/student/payment/components/PricingModal'

function Sidebar() {
  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useSettingStore((state) => state.setIsSidebarOpen)
  const { isCouponModalOpen, originalPrice, closeCouponModal, applyCoupon } = useCouponStore()
  const { isPricingModalOpen, originalPrice: pricingOriginalPrice, closePricingModal } = usePricingModalStore()
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden ${
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div
        className={`fixed p-0 left-0 top-0 h-full bg-white dark:bg-[#202936] border-r border-[#EAEFF4] dark:border-[#2A3447FF] 
        transition-transform duration-300 z-50 w-[300px] flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto border-none sidebar-content">
          <SidebarLogo />
          <SidebarMenu />
        </div>
        
        {/* Fixed footer area */}
        <div>
        <SidebarPlan />
  <div className="flex-shrink-0 border-t border-[#EAEFF4]  dark:bg-[#202936]">
        <SidebarFooter />

  </div>
        </div>
      </div>
      
      {/* Coupon Modal - Butun ekranda ko'rinishi uchun sidebar tashqarisida */}
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={closeCouponModal}
        onApplyCoupon={applyCoupon}
        originalPrice={originalPrice}
      />
      
      {/* Pricing Modal - Butun ekranda ko'rinishi uchun sidebar tashqarisida */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={closePricingModal}
        originalPrice={pricingOriginalPrice}
      />
    </>
  )
}

export default Sidebar
