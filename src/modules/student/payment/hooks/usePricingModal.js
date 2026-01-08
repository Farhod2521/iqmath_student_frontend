import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { getPaymentInitiate } from '@/services/controllers'
import { useGetPlans } from '@/hooks'
import toast from 'react-hot-toast'

export const usePricingModal = () => {
  const { t, i18n } = useTranslation()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [activeTab, setActiveTab] = useState('plans')
  const [couponCode, setCouponCode] = useState('')
  const [couponData, setCouponData] = useState(null)

  const { data: plansData, isLoading: isLoadingPlans, error: plansError } = useGetPlans()

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
      toast.error("Kupon ma'lumotlari topilmadi")
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
        const errorMessage =
          error?.response?.data?.error || error?.message || error?.error || "To'lov tizimida xatolik yuz berdi"
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

  const plans =
    plansData?.data?.map((plan) => {
      const originalPrice =
        plan.discount_percent > 0 ? Math.round(plan.sale_price / (1 - plan.discount_percent / 100)) : plan.sale_price

      // Tarif nomini tarjima qilish
      const getTranslatedName = (months) => {
        switch (months) {
          case 1:
            return t('oneMonth')
          case 3:
            return t('threeMonths')
          case 6:
            return t('sixMonths')
          case 12:
            return t('oneYear')
          default:
            return `${months} ${t('months')}`
        }
      }

      return {
        id: plan.id,
        is_active: plan.is_active,
        original_name: plan.name,
        name: getTranslatedName(plan.months),
        duration: getTranslatedName(plan.months),
        price: plan.sale_price,
        price_per_month: plan.price_per_month,
        originalPrice: originalPrice,
        discount: plan.discount_percent,
        months: plan.months,
        months_display: plan.months_display,
        created_at: plan?.created_at,
        updated_at: plan?.updated_at,
        //
        benefits: plan.benefits?.map((benefit) => ({
          id: benefit.id,
          title: i18n.language === 'uz' ? benefit.title_uz : benefit.title_ru,
          description: benefit.description,
          isSelected: benefit.is_selected
        })),
        category: {
          id: plan?.category?.id,
          title: i18n.language === 'uz' ? plan?.category?.title_uz : plan?.category?.title_ru
        }
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
    setActiveTab,
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
