import React from 'react'
import Button from '@/components/button'
import { usePricingModal } from '../hooks/usePricingModal'
import { PLANS } from '../data/plans'
import { ModalHeader, PlanGrid, CouponSection } from './index'

const PricingModal = ({ isOpen, onClose, originalPrice }) => {
  const {
    selectedPlan,
    activeTab,
    couponCode,
    couponData,
    isCheckingCoupon,
    setCouponCode,
    handleSelectPlan,
    handleNext,
    handleBack,
    handleCheckCoupon,
    handleSkipCoupon,
    handleApplyCoupon,
    resetModal
  } = usePricingModal()

  const handleClose = () => {
    resetModal()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white dark:bg-[#202936] rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <ModalHeader 
          activeTab={activeTab} 
          onClose={handleClose} 
        />

        <div className="p-6">
          {activeTab === 'plans' ? (
            <>
              <PlanGrid 
                plans={PLANS}
                selectedPlan={selectedPlan}
                onSelectPlan={handleSelectPlan}
              />

              {selectedPlan && (
                <div className="text-center">
                  <Button
                    classname="bg-[#5D87FF] hover:bg-[#4570EA] text-white px-12 py-4 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    onclick={handleNext}
                  >
                    Davom etish - {selectedPlan.price.toLocaleString()} so'm
                  </Button>
                  <p className="text-sm text-[#5A6A85] dark:text-gray-400 mt-3">
                    Keyingi bosqichda kupon kodi kiritishingiz mumkin
                  </p>
                </div>
              )}
            </>
          ) : (
            <CouponSection
              selectedPlan={selectedPlan}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              couponData={couponData}
              isCheckingCoupon={isCheckingCoupon}
              onCheckCoupon={handleCheckCoupon}
              onBack={handleBack}
              onSkipCoupon={handleSkipCoupon}
              onApplyCoupon={handleApplyCoupon}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default PricingModal

