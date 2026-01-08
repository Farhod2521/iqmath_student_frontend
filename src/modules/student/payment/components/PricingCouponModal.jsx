import React, { useEffect } from 'react'
import { ModalHeader, PlanGrid, CouponSection } from './index'
import { usePricingModal } from '../hooks/usePricingModal'

const PricingCouponModal = ({ selectedPlan, isOpen, onClose, originalPrice }) => {
  const {
    activeTab,
    couponCode,
    couponData,
    isCheckingCoupon,
    plans,
    isLoadingPlans,
    plansError,
    setCouponCode,
    setActiveTab,
    handleCheckCoupon,
    handleSelectPlan,
    handleSkipCoupon,
    handleApplyCoupon,
    resetModal
  } = usePricingModal()

  const handleClose = () => {
    resetModal()
    onClose()
  }

  useEffect(() => {
    if (selectedPlan) {
      handleSelectPlan(selectedPlan)
      setActiveTab('coupon')
    }
  }, [selectedPlan])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white dark:bg-[#202936] rounded-2xl shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <ModalHeader activeTab={activeTab} onClose={handleClose} />

        <div className="p-4 overflow-hidden">
          <CouponSection
            selectedPlan={selectedPlan}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            couponData={couponData}
            isCheckingCoupon={isCheckingCoupon}
            onCheckCoupon={handleCheckCoupon}
            onBack={handleClose}
            onSkipCoupon={handleSkipCoupon}
            onApplyCoupon={handleApplyCoupon}
          />
        </div>
      </div>
    </div>
  )
}

export default PricingCouponModal
