import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { getPaymentInitiate } from '@/services/controllers'
import { useGetPlans } from '@/hooks'
import toast from 'react-hot-toast'

export const usePricingModal = () => {
  const { t } = useTranslation()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [activeTab, setActiveTab] = useState('plans')
  const [couponCode, setCouponCode] = useState('')
  const [couponData, setCouponData] = useState(null)

  const { data: plansData, isLoading: isLoadingPlans, error: plansError } = useGetPlans();

  const { mutate: checkCoupon, isLoading: isCheckingCoupon } = useMutation({
    mutationFn: ({ code, subscriptionId }) => {
      const payload = { 
        code: code,
        subscription_id: subscriptionId
      }
      return request.post(URLS.checkCoupon, payload)
    },
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
      const errorMessage = error?.response?.data?.error || error?.response?.data?.message || t('couponCheckError')
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
    
    if (!selectedPlan) {
      toast.error('Avval tarif rejasini tanlang')
      return
    }
    
    const payload = {
      code: couponCode.trim(),
      subscriptionId: selectedPlan.id
    }
    
    
    
    checkCoupon(payload)
  }

  const handleSkipCoupon = () => {
    if (!selectedPlan) {
      toast.error('Tarif rejasi tanlanmagan')
      return
    }
    proceedToPayment(null)
  }

  const handleApplyCoupon = () => {
    if (!selectedPlan) {
      toast.error('Tarif rejasi tanlanmagan')
      return
    }
    
    if (couponData) {
      proceedToPayment(couponData)
    } else {
      toast.error('Kupon ma\'lumotlari topilmadi')
    }
  }

  const proceedToPayment = (couponData = null) => {
    if (!selectedPlan) {
      toast.error('Tarif rejasi tanlanmagan')
      return
    }

    // Kupon kodi mavjud bo'lsa, uni API ga yuborish
    const couponCode = couponData?.code || null
    
    getPaymentInitiate(selectedPlan.id, couponCode)
      .then((res) => {
        // API dan kelayotgan checkout_url allaqachon tayyor
        let checkoutUrl = res.data.payment_data?.data?.checkout_url
        
        if (!checkoutUrl) {
          throw new Error('Checkout URL topilmadi')
        }
        
        // To'lov sahifasiga yo'naltirish
        window.open(checkoutUrl, '_blank')
        return true
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.error || error?.message || 'To\'lov tizimida xatolik yuz berdi'
        toast.error(errorMessage)
        return false
      })
  }

  const resetModal = () => {
    setSelectedPlan(null)
    setActiveTab('plans')
    setCouponCode('')
    setCouponData(null)
  }

  
  const plans = plansData?.data?.map(plan => {
    
    const originalPrice = plan.discount_percent > 0 
      ? Math.round(plan.sale_price / (1 - plan.discount_percent / 100))
      : plan.sale_price

    return {
      id: plan.id,
      name: plan.get_months_display,
      duration: plan.get_months_display,
      price: plan.sale_price,
      originalPrice: originalPrice,
      discount: plan.discount_percent,
      months: plan.months,
    }
  }) || []

  return {
    
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
    proceedToPayment,
    resetModal
  }
}
