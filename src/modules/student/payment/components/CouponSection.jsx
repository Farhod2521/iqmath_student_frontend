import React from 'react'
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
  return (
    <div className="max-w-lg mx-auto">
      {/* Selected Plan Info */}
      {selectedPlan && (
        <div className="bg-[#F8F9FA] dark:bg-[#2A3447] rounded-xl p-6 mb-8">
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
                {selectedPlan.price.toLocaleString()} so'm
              </div>
              <div className="text-sm text-[#5A6A85] dark:text-gray-400 line-through">
                {selectedPlan.originalPrice.toLocaleString()} so'm
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coupon Input */}
      <div className="mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Kupon kodini kiriting"
            className="flex-1 px-6 py-4 text-lg border border-[#EAEFF4] dark:border-[#2A3447] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D87FF] dark:bg-[#2A3447] dark:text-white"
            disabled={isCheckingCoupon}
          />
          <Button
            classname="px-8 py-4 text-lg bg-[#5D87FF] hover:bg-[#4570EA] text-white rounded-xl"
            onclick={onCheckCoupon}
            disabled={isCheckingCoupon || !couponCode.trim()}
          >
            {isCheckingCoupon ? (
              <FaSpinner className="animate-spin" />
            ) : (
              'Tekshirish'
            )}
          </Button>
        </div>
      </div>

      {/* Coupon Result */}
      {couponData && (
        <div className="mb-8 p-6 bg-[#E6FFFA] dark:bg-[#1B3C48] rounded-xl border border-[#13DEB9]/30 dark:border-[#13DEB9]/30">
          <div className="flex items-center gap-3 mb-4">
            <FaTag className="text-[#13DEB9] dark:text-[#13DEB9] text-xl" />
            <span className="text-lg font-semibold text-[#02b3a9] dark:text-[#13DEB9]">
              Kupon qo'llanildi!
            </span>
          </div>
          <div className="space-y-3 text-base">
            <div className="flex justify-between">
              <span className="text-[#2A3547] dark:text-white">Kupon:</span>
              <span className="font-mono font-bold text-[#5D87FF] text-lg">{couponData.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2A3547] dark:text-white">Chegirma:</span>
              <span className="font-bold text-[#13DEB9] dark:text-[#13DEB9] text-lg">
                {couponData.discount_percent}%
              </span>
            </div>
            <div className="flex justify-between border-t border-[#13DEB9]/30 dark:border-[#13DEB9]/30 pt-3">
              <span className="text-[#2A3547] dark:text-white font-semibold text-lg">Yakuniy narx:</span>
              <span className="font-bold text-[#13DEB9] dark:text-[#13DEB9] text-xl">
                {couponData.discounted_price?.toLocaleString()} so'm
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          classname="flex-1 py-4 text-lg bg-gray-400 hover:bg-gray-600 text-[#2A3547] dark:bg-[#2A3447] dark:hover:bg-[#1F2937] dark:text-white rounded-xl"
          onclick={onBack}
        >
          Orqaga
        </Button>
        <Button
          classname="flex-1 py-4 text-lg bg-[#5D87FF] hover:bg-[#4570EA] text-white rounded-xl"
          onclick={onSkipCoupon}
        >
          O'tkazib yuborish
        </Button>
        {couponData && (
          <Button
            classname="flex-1 py-4 text-lg bg-green-500 hover:bg-green-600 text-white rounded-xl"
            onclick={onApplyCoupon}
          >
            To'lovga o'tish
          </Button>
        )}
      </div>
    </div>
  )
}

export default CouponSection
