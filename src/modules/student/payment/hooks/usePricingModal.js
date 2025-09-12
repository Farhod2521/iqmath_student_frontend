import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { getPaymentInitiate } from '@/services/controllers'
import toast from 'react-hot-toast'

export const usePricingModal = () => {
  const { t } = useTranslation()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [activeTab, setActiveTab] = useState('plans')
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

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
  }

  const handleNext = () => {
    if (selectedPlan) {
      setActiveTab('coupon')
    }
  }

  const handleBack = () => {
    setActiveTab('plans')
  }

  const handleCheckCoupon = () => {
    if (!couponCode.trim()) {
      toast.error(t('enterCouponCode'))
      return
    }
    checkCoupon(couponCode.trim())
  }

  const handleSkipCoupon = () => {
    proceedToPayment(null)
  }

  const handleApplyCoupon = () => {
    if (couponData) {
      proceedToPayment(couponData)
    }
  }

  const proceedToPayment = (couponData = null) => {
    getPaymentInitiate()
      .then((res) => {
        let checkoutUrl = res.data.data.checkout_url
        
        if (couponData && couponData.code) {
          const url = new URL(checkoutUrl)
          url.searchParams.set('coupon_code', couponData.code)
          url.searchParams.set('plan_id', selectedPlan.id)
          url.searchParams.set('plan_price', selectedPlan.price)
          checkoutUrl = url.toString()
        } else {
          const url = new URL(checkoutUrl)
          url.searchParams.set('plan_id', selectedPlan.id)
          url.searchParams.set('plan_price', selectedPlan.price)
          checkoutUrl = url.toString()
        }
        
        window.open(checkoutUrl, '_blank')
        return true
      })
      .catch((error) => {
        toast.error(t('paymentError'))
        return false
      })
  }

  const resetModal = () => {
    setSelectedPlan(null)
    setActiveTab('plans')
    setCouponCode('')
    setCouponData(null)
  }

  return {
    // State
    selectedPlan,
    activeTab,
    couponCode,
    couponData,
    isCheckingCoupon,
    
    // Setters
    setCouponCode,
    
    // Handlers
    handleSelectPlan,
    handleNext,
    handleBack,
    handleCheckCoupon,
    handleSkipCoupon,
    handleApplyCoupon,
    proceedToPayment,
    resetModal
  }
}
