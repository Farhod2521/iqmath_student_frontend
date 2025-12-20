import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/button'
import { usePricingModal } from '../hooks/usePricingModal'
import { ModalHeader, PlanGrid, CouponSection } from './index'

const PricingModal = ({ isOpen, onClose, originalPrice }) => {
  const { t } = useTranslation()
  const {
    selectedPlan,
    activeTab,
    couponCode,
    couponData,
    isCheckingCoupon,
    plans,
    isLoadingPlans,
    plansError,
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
      <div className="bg-white dark:bg-[#202936] rounded-2xl shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <ModalHeader activeTab={activeTab} onClose={handleClose} />

        <div className="p-4 overflow-hidden">
          {activeTab === 'plans' ? (
            <>
              {isLoadingPlans ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5D87FF]"></div>
                </div>
              ) : plansError ? (
                <div className="text-center py-12">
                  <p className="text-red-500 dark:text-red-400">{t('plansError')}</p>
                </div>
              ) : (
                <>
                  <PlanGrid plans={plans} selectedPlan={selectedPlan} onSelectPlan={handleSelectPlan} />

                  {selectedPlan && (
                    <div className="text-center">
                      <Button
                        classname="bg-[#5D87FF] hover:bg-[#4570EA] text-white px-12 py-4 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                        onclick={handleNext}
                      >
                        {t('proceedToPayment')} - {selectedPlan.price.toLocaleString()} {t('sum')}
                      </Button>
                      <p className="text-sm text-[#5A6A85] dark:text-gray-400 mt-3">{t('nextStep')}</p>
                    </div>
                  )}
                </>
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
