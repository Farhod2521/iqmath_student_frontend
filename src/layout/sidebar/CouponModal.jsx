import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaTag, FaCheckCircle, FaTimes, FaSpinner } from 'react-icons/fa'
import Button from '@/components/button'
import { useMutation } from '@tanstack/react-query'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import toast from 'react-hot-toast'
import { getPaymentInitiate } from '@/services/controllers'

const CouponModal = ({ isOpen, onClose, onApplyCoupon, originalPrice }) => {
  const { t } = useTranslation()
  const [couponCode, setCouponCode] = useState('')
  const [couponData, setCouponData] = useState(null)

  const { mutate: checkCoupon, isLoading: isCheckingCoupon } = useMutation({
    mutationFn: (code) => 
      request.post(URLS.checkCoupon, { code }),
    onSuccess: (response) => {
      const data = response.data
      if (data.active) {
        setCouponData(data)
        toast.success(t('couponAppliedSuccessfully'))
      } else {
        toast.error(t('couponNotValid'))
        setCouponData(null)
      }
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || t('couponCheckError')
      toast.error(errorMessage)
      setCouponData(null)
    }
  })

  const handleCheckCoupon = () => {
    if (!couponCode.trim()) {
      toast.error(t('enterCouponCode'))
      return
    }
    checkCoupon(couponCode.trim())
  }

  const handleApplyCoupon = () => {
    if (couponData) {
      proceedToPayment(couponData)
    }
  }

  const handleSkipCoupon = () => {
    proceedToPayment(null)
  }

  const proceedToPayment = (couponData = null) => {
    const couponCode = couponData?.code || null
    getPaymentInitiate(null, couponCode)
      .then((res) => {
        
        let checkoutUrl = res.data.payment_data?.data?.checkout_url
        
        if (!checkoutUrl) {
          throw new Error('Checkout URL topilmadi')
        }
        
        if (couponData && couponData.code) {
          const url = new URL(checkoutUrl)
          url.searchParams.set('coupon_code', couponData.code)
          checkoutUrl = url.toString()
        }
        
        window.open(checkoutUrl, '_blank')
        onClose()
      })
      .catch((error) => {
        toast.error(t('paymentError'))
      })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white dark:bg-[#202936] rounded-2xl shadow-xl max-w-lg w-full p-8 mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#EAEFF4] dark:bg-[#2A3447] hover:bg-[#DFE5EF] dark:hover:bg-[#333F55] transition-colors"
        >
          <FaTimes className="text-[#5A6A85] dark:text-[#7C8FAC] text-sm" />
        </button>
        
        <div className="text-center mb-8">
          {/* <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
            <FaTag className="text-blue-600 dark:text-blue-400 text-4xl" />
          </div> */}
          <h2 className="text-3xl font-bold text-[#2A3547] dark:text-white mb-3">
            {t('promoCode')}
          </h2>
          <p className="text-lg text-[#5A6A85] dark:text-gray-400">
            {t('promoCodeDescription')}
          </p>
        </div>

        {/* Coupon Input */}
        <div className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder={t('enterPromoCode')}
              className="flex-1 px-6 py-4 text-lg border border-[#EAEFF4] dark:border-[#2A3447] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D87FF] dark:bg-[#2A3447] dark:text-white"
              disabled={isCheckingCoupon}
            />
            <Button
              classname="px-8 py-4 text-lg bg-[#5D87FF] hover:bg-[#4570EA] text-white rounded-xl"
              onclick={handleCheckCoupon}
              disabled={isCheckingCoupon || !couponCode.trim()}
            >
              {isCheckingCoupon ? (
                <FaSpinner className="animate-spin" />
              ) : (
                t('check')
              )}
            </Button>
          </div>
        </div>

        {/* Coupon Result */}
        {couponData && (
          <div className="mb-8 p-6 bg-[#E6FFFA] dark:bg-[#1B3C48] rounded-xl border border-[#13DEB9]/30 dark:border-[#13DEB9]/30">
            <div className="flex items-center gap-3 mb-4">
              <FaCheckCircle className="text-[#13DEB9] dark:text-[#13DEB9] text-xl" />
              <span className="text-lg font-semibold text-[#02b3a9] dark:text-[#13DEB9]">
                {t('couponValid')}
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
                <span className="text-[#5A6A85] dark:text-gray-400 text-lg">
                  {couponData.original_price?.toLocaleString()} so'm
                </span>
              </div>
              <div className="flex justify-between border-t border-[#13DEB9]/30 dark:border-[#13DEB9]/30 pt-3">
                <span className="text-[#2A3547] dark:text-white font-semibold text-lg">{t('finalPrice')}:</span>
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
            onclick={handleSkipCoupon}
          >
            {t('skip')}
          </Button>
          {couponData && (
            <Button
              classname="flex-1 py-4 text-lg bg-green-500 hover:bg-green-600 text-white rounded-xl"
              onclick={handleApplyCoupon}
            >
              {t('applyCoupon')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CouponModal
