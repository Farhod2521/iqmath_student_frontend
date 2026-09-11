import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaTag, FaSpinner } from 'react-icons/fa'
import { ShoppingBag, Ticket, ArrowRight, Crown } from 'lucide-react'
import Button from '@/components/button'
import NasiyaInstallmentOption from './NasiyaInstallmentOption'

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

  const categoryTitle = selectedPlan?.category?.title
  const discountPercent = selectedPlan?.discount_percent || selectedPlan?.discount || 0
  const includedBenefits = selectedPlan?.benefits?.filter((b) => b.isSelected) || []
  const benefitTagText =
    includedBenefits.length && includedBenefits.length === selectedPlan?.benefits?.length
      ? t('pricing.nasiya.allFeaturesIncluded')
      : includedBenefits.length
        ? t('pricing.nasiya.featuresIncluded', { count: includedBenefits.length })
        : null

  return (
    <div className="w-full max-w-full px-4">
      {/* Selected Plan Info */}
      {selectedPlan && (
        <div className="bg-gradient-to-br from-[#EEF3FC] to-[#F7FAFF] dark:from-[#1E2A45] dark:to-[#1B2438] border border-[#E3EAF6] dark:border-[#2A3447] rounded-2xl p-4 mb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-11 h-11 text-white shadow-sm rounded-xl bg-gradient-to-br from-[#4C7CF3] to-[#2F5FD0] shrink-0">
                <ShoppingBag size={20} />
              </span>
              <div>
                <h3 className="text-base font-bold leading-tight text-[#2A3547] dark:text-white">
                  {selectedPlan.name}
                </h3>
                {benefitTagText && (
                  <span className="inline-flex mt-1.5 px-2 py-0.5 rounded-lg bg-[#E3ECFC] dark:bg-[#2F5FD0]/20 text-[#2F5FD0] text-xs font-semibold">
                    {benefitTagText}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right shrink-0">
              {categoryTitle && (
                <span className="inline-flex items-center gap-1 mb-1.5 px-2 py-0.5 rounded-full bg-[#FFF4E5] text-[#B45309] text-xs font-bold whitespace-nowrap">
                  <Crown size={12} />
                  {categoryTitle}
                </span>
              )}
              <div className="text-xl font-bold text-[#2A3547] dark:text-white">
                {selectedPlan.price.toLocaleString()} {t('sum')}
              </div>
              {selectedPlan.originalPrice > selectedPlan.price && (
                <div className="flex items-center justify-end gap-2 mt-0.5">
                  <span className="text-sm text-[#5A6A85] dark:text-gray-400 line-through">
                    {selectedPlan.originalPrice.toLocaleString()} {t('sum')}
                  </span>
                  {discountPercent > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#4F46E5] text-white text-[11px] font-bold">
                      -{discountPercent}%
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment method: full payment or Uzum Nasiya installments */}
      {selectedPlan && <NasiyaInstallmentOption price={selectedPlan.price} />}

      {/* Coupon Input */}
      <div className="mb-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Ticket
              size={18}
              className="absolute -translate-y-1/2 left-4 top-1/2 text-[#8D97B2] dark:text-gray-500"
            />
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder={t('enterCouponCode')}
              className="w-full pl-11 pr-4 py-2.5 text-base border border-[#EAEFF4] dark:border-[#2A3447] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4C7CF3] dark:bg-[#2A3447] dark:text-white"
              disabled={isCheckingCoupon}
            />
          </div>
          <Button
            classname="px-6 py-2.5 text-base rounded-2xl bg-gradient-to-r from-[#4C7CF3] to-[#2F5FD0]"
            onclick={onCheckCoupon}
            disabled={isCheckingCoupon || !couponCode.trim()}
          >
            {isCheckingCoupon ? <FaSpinner className="animate-spin" /> : t('checkCoupon')}
          </Button>
        </div>
      </div>

      {/* Coupon Result */}
      {couponData && (
        <div className="mb-4 p-4 bg-[#E6FFFA] dark:bg-[#1B3C48] rounded-[12px] border border-[#13DEB9]/30 dark:border-[#13DEB9]/30">
          <div className="flex items-center gap-3 mb-3">
            <FaTag className="text-[#13DEB9] dark:text-[#13DEB9] text-xl" />
            <span className="text-lg font-semibold text-[#02b3a9] dark:text-[#13DEB9]">{t('couponApplied')}</span>
          </div>
          <div className="space-y-3 text-base">
            <div className="flex justify-between">
              <span className="text-[#2A3547] dark:text-white">{t('originalPrice')}:</span>
              <span className="text-[#5A6A85] dark:text-gray-400 line-through">
                {couponData.price?.toLocaleString()} {t('sum')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2A3547] dark:text-white">{t('couponCode')}:</span>
              <span className="font-mono font-bold text-[#5D87FF] text-lg">{couponData.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2A3547] dark:text-white">{t('discount_perent')}:</span>
              <span className="font-bold text-[#13DEB9] dark:text-[#13DEB9] text-lg">
                {couponData.discount_percent}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2A3547] dark:text-white">{t('discount_price')}:</span>
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
      <div className="flex gap-3 pb-1">
        <Button
          classname="flex-1 py-2.5 text-base bg-[#EAEFF4] hover:bg-[#DFE5EF] text-[#2A3547] dark:bg-[#2A3447] dark:hover:bg-[#1F2937] dark:text-white rounded-2xl"
          onclick={onBack}
        >
          {t('back')}
        </Button>

        {couponData ? (
          <Button
            classname="flex-1 py-2.5 text-base bg-green-500 hover:bg-green-600 text-white rounded-2xl"
            onclick={onApplyCoupon}
          >
            {t('proceedToPayment')}
          </Button>
        ) : (
          <Button
            classname="flex-1 flex items-center justify-center gap-2 py-2.5 text-base bg-gradient-to-r from-[#4C7CF3] to-[#2F5FD0] rounded-2xl"
            onclick={onSkipCoupon}
          >
            {t('skipCoupon')}
            <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </div>
  )
}

export default CouponSection
