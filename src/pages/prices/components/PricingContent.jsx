import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@mui/material'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

// ICONS
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import PaidIcon from '@mui/icons-material/Paid'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import toast from 'react-hot-toast'
import { usePricingModalStore } from '@/store'
import PricingCouponModal from '@/modules/student/payment/components/PricingCouponModal'

const PricingContent = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)
  const {
    isPricingModalOpen,
    openPricingModal,
    originalPrice: pricingOriginalPrice,
    closePricingModal
  } = usePricingModalStore()

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const res = await request.get(URLS.paymentPlans)
      setDataSource(res.data ?? [])
    } finally {
      setIsLoading(false)
    }
  }

  const handleBuy = async (plan) => {
    const session = await getSession()
    if (!session) {
      toast.success("Tarif rejani sotib qolish uchun avval ro'yxatdan o'ting")
      router.push('/auth')
      return
    }
    setSelectedPlan(plan)
    openPricingModal(plan?.price)
  }

  const data =
    dataSource?.map((plan) => {
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
        original_name: i18n.language === 'uz' ? plan?.name_uz : plan?.name_ru,
        name: getTranslatedName(plan.months),
        duration: getTranslatedName(plan.months),
        price: plan.sale_price,
        price_per_month: plan.price_per_month,
        originalPrice: originalPrice,
        discount_percent: plan.discount_percent,
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

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Container sx={{ maxWidth: '1000px !important', mt: 4, pb: { xs: 4, lg: 8 } }}>
        {isLoading ? (
          <div className="flex justify-center mt-12">
            <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin" />
          </div>
        ) : data.length ? (
          <div className="grid justify-center grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((item, idx) => (
              <div
                key={item?.id}
                className={`relative cursor-pointer flex flex-col rounded-2xl p-[1px] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
     bg-gradient-to-br from-blue-500 to-purple-500 overflow-hidden`} // overflow-hidden qo'shdik
              >
                {item.category && item.category?.title && (
                  <div className="absolute top-0 right-0 z-50 overflow-hidden">
                    <div
                      className={`relative px-4 py-1 text-xs font-bold text-white uppercase shadow-lg rounded-bl-lg rounded-tr-2xl
      ${
        item.category?.title.toLowerCase() === 'best value'
          ? 'bg-gradient-to-r from-amber-500 to-orange-500'
          : 'bg-gradient-to-r from-blue-500 to-purple-500'
      }`}
                    >
                      {' '}
                      {item.category?.title}
                    </div>
                  </div>
                )}
                {/* {item.category && item.category?.title && (
                  <div className="absolute z-50 w-40 top-4 -right-10">
                    <div className="relative px-4 py-1.5 text-[10px] font-bold text-center text-white uppercase transform rotate-45 shadow-md bg-gradient-to-r from-blue-500 to-purple-500">
                      {item.category?.title}
                    </div>
                  </div>
                )} */}

                <div className="flex flex-col h-full p-6 rounded-2xl bg-white/95 backdrop-blur">
                  <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-900">{item.original_name}</h3>

                  <p className="flex items-center mt-1 text-sm text-center text-gray-500">
                    <CalendarMonthIcon sx={{ color: '#5d87ff' }} />{' '}
                    <span>
                      {item.months} {t('month')}
                    </span>
                  </p>
                  {/* PRICE */}
                  <div className="mt-4 space-y-2">
                    {/* ORIGINAL PRICE */}
                    <div className="flex items-center gap-1">
                      <AttachMoneyIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
                      <span className="text-xl text-gray-400 line-through">
                        {Number(item.originalPrice).toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">so'm</span>
                    </div>

                    {/* DISCOUNT */}
                    {item.discount_percent > 0 && (
                      <div className="flex items-center gap-1">
                        <LocalFireDepartmentIcon sx={{ fontSize: 16, color: 'red' }} />
                        <span className="text-xs font-semibold">-{item.discount_percent}%</span>
                      </div>
                    )}

                    {/* FINAL PRICE */}
                    {item.price_per_month > 0 && (
                      <div className="flex items-center gap-1">
                        <PaidIcon sx={{ fontSize: 20, color: '#1e40af' }} />
                        <span className="text-2xl font-extrabold text-gray-900">
                          {Number(item.price).toLocaleString()} so'm
                        </span>
                      </div>
                    )}
                  </div>

                  {/* BENEFITS */}
                  <ul className="flex-1 mt-6 space-y-3">
                    {item.benefits.map((b) => (
                      <li
                        key={b.id}
                        className={`flex items-center gap-2 text-sm ${
                          b.isSelected ? 'text-gray-800' : 'text-gray-400 line-through'
                        }`}
                      >
                        <span
                          className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold
                ${b.isSelected ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                        >
                          {b.isSelected ? '✓' : '✕'}
                        </span>

                        {b.title}
                      </li>
                    ))}
                  </ul>

                  {/* BUTTON */}
                  <button
                    disabled={!item.is_active}
                    onClick={() => handleBuy(item)}
                    className={`mt-6 w-full py-3 rounded-xl font-semibold text-white transition-all
          ${
            item.is_active
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 active:scale-95'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
                  >
                    {item.is_active ? t('buy') : t('notAvailable')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-gray-600">{t('noData')}</p>
        )}
      </Container>

      <PricingCouponModal
        selectedPlan={selectedPlan}
        isOpen={isPricingModalOpen}
        onClose={closePricingModal}
        originalPrice={pricingOriginalPrice}
      />
    </>
  )
}

export default PricingContent
