import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaTag, FaSpinner } from 'react-icons/fa'
import Button from '@/components/button'

const CouponSection = ({
  selectedPlan,
  couponCode,
  setCouponCode,
  couponData,
  isCheckingCoupon,
  onCheckCoupon,
  onBack,
  onSkipCoupon,
  onApplyCoupon
}) => {
  const { t } = useTranslation()
  return (
    <div className="max-w-lg mx-auto">
      {/* Selected Plan Info */}
      {selectedPlan && (
        <div className="bg-white dark:bg-[#2A3447] border border-[#EAEFF4] dark:border-[#2A3447] rounded-[12px] p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#2A3547] dark:text-white">
                {selectedPlan.name}
              </h3>
              <p className="text-sm text-[#5A6A85] dark:text-gray-400">
                {selectedPlan.duration}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-[#2A3547] dark:text-white">
                {selectedPlan.price.toLocaleString()} {t('sum')}
              </div>
              <div className="text-sm text-[#5A6A85] dark:text-gray-400 line-through">
                {selectedPlan.originalPrice.toLocaleString()} {t('sum')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coupon Input */}
      <div className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder={t('enterCouponCode')}
            className="flex-1 px-4 py-3 text-base border border-[#EAEFF4] dark:border-[#2A3447] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#5D87FF] dark:bg-[#2A3447] dark:text-white"
            disabled={isCheckingCoupon}
          />
          <Button
            classname="px-6 py-3 text-base rounded-[8px]"
            onclick={onCheckCoupon}
            disabled={isCheckingCoupon || !couponCode.trim()}
          >
            {isCheckingCoupon ? (
              <FaSpinner className="animate-spin" />
            ) : (
              t('checkCoupon')
            )}
          </Button>
        </div>
      </div>

      {/* Coupon Result */}
      {couponData && (
        <div className="mb-6 p-6 bg-[#E6FFFA] dark:bg-[#1B3C48] rounded-[12px] border border-[#13DEB9]/30 dark:border-[#13DEB9]/30">
          <div className="flex items-center gap-3 mb-4">
            <FaTag className="text-[#13DEB9] dark:text-[#13DEB9] text-xl" />
            <span className="text-lg font-semibold text-[#02b3a9] dark:text-[#13DEB9]">
              {t('couponApplied')}
            </span>
          </div>
          <div className="space-y-3 text-base">
            <div className="flex justify-between">
              <span className="text-[#2A3547] dark:text-white">{t('couponCode')}:</span>
              <span className="font-mono font-bold text-[#5D87FF] text-lg">{couponData.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2A3547] dark:text-white">{t('discount')}:</span>
              <span className="font-bold text-[#13DEB9] dark:text-[#13DEB9] text-lg">
                {couponData.discount_percent}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2A3547] dark:text-white">{t('originalPrice')}:</span>
              <span className="text-[#5A6A85] dark:text-gray-400 line-through">
                {couponData.original_price?.toLocaleString()} {t('sum')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2A3547] dark:text-white">{t('finalPrice')}:</span>
              <span className="text-[#2A3547] dark:text-white">
                {couponData.price?.toLocaleString()} {t('sum')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2A3547] dark:text-white">{t('discount')}:</span>
              <span className="font-bold text-[#13DEB9] dark:text-[#13DEB9]">
                -{couponData.saved_amount?.toLocaleString()} {t('sum')}
              </span>
            </div>
            <div className="flex justify-between border-t border-[#13DEB9]/30 dark:border-[#13DEB9]/30 pt-3">
              <span className="text-[#2A3547] dark:text-white font-semibold text-lg">{t('finalPrice')}:</span>
              <span className="font-bold text-[#13DEB9] dark:text-[#13DEB9] text-xl">
                {couponData.sale_price?.toLocaleString()} {t('sum')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          classname="flex-1 py-3 text-base bg-gray-400 hover:bg-gray-600 text-[#2A3547] dark:bg-[#2A3447] dark:hover:bg-[#1F2937] dark:text-white rounded-[8px]"
          onclick={onBack}
        >
          {t('back')}
        </Button>
        
        {couponData ? (
          <Button
            classname="flex-1 py-3 text-base bg-green-500 hover:bg-green-600 text-white rounded-[8px]"
            onclick={onApplyCoupon}
          >
            {t('proceedToPayment')}
          </Button>
        ) : (
          <Button
            classname="flex-1 py-3 text-base rounded-[8px]"
            onclick={onSkipCoupon}
          >
            {t('skipCoupon')}
          </Button>
        )}
      </div>
    </div>
  )
}

export default CouponSection
