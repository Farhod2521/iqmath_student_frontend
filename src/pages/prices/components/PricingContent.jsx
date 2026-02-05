import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@mui/material'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import styles from '../styles/index.module.css'

// ICONS
import PaidIcon from '@mui/icons-material/Paid'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import toast from 'react-hot-toast'
import { usePricingModalStore } from '@/store'
import PricingCouponModal from '@/modules/student/payment/components/PricingCouponModal'
import AuthModal from '@/home/components/auth/AuthModal'
import Auth from '@/home/components/auth/Auth'

const PricingContent = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)
   const [authOpen, setAuthOpen] = useState(false)


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
      toast.success(t('pricing.authRequired'))
      setAuthOpen(true)
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
                  <div className="absolute top-0 right-0 z-10 overflow-hidden rounded-bl-xl">
                    <div
                      className={`relative px-5 py-2 text-sm font-extrabold text-white uppercase tracking-wide
      rounded-bl-2xl rounded-tr-2xl shadow-xl
      ${styles.pricingBadge}
      ${item.category?.title.toLowerCase() === 'best value' ? styles.badgeBest : styles.badgeDefault}`}
                    >
                      {item.category?.title}
                    </div>
                  </div>
                )}

                <div className="flex flex-col h-full p-6 sm:p-7 md:p-8 rounded-2xl bg-white/95 backdrop-blur">
                  <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-900">{item.original_name}</h3>
                  <div className="flex justify-center mt-3 md:justify-start">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                      <CalendarMonthIcon sx={{ color: '#5d87ff', fontSize: 20 }} />
                      <span className="text-base font-semibold text-gray-700">
                        {item.months} {t('month')}
                      </span>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="mt-5 space-y-3">
                    {(() => {
                      const original = Number(item.originalPrice || 0)
                      const sale = Number(item.price || 0)
                      const saved = Math.max(0, original - sale)
                      const savedPercent = original > 0 ? Math.round((saved / original) * 100) : 0

                      return (
                        <>
                          {/* FINAL PRICE */}
                          {item.price_per_month > 0 && (
                            <div className="flex items-center gap-2 mb-1">
                              <PaidIcon sx={{ fontSize: 20, color: '#1e40af' }} />
                              <span className="text-2xl font-extrabold text-gray-900">
                                {sale.toLocaleString()} {t('pricing.currency')}
                              </span>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full">
                              {t('pricing.youSave')}: {saved.toLocaleString()} {t('pricing.currency')}
                            </span>
                            {savedPercent > 0 && (
                              <span className="text-xs font-semibold text-gray-500">(-{savedPercent}%)</span>
                            )}
                          </div>

                          {/* ORIGINAL PRICE */}
                          {/* {original > 0 && (
                            <div className="flex items-center gap-1">
                              <AttachMoneyIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
                              <span className="text-xl text-gray-400 line-through">{original.toLocaleString()}</span>
                              <span className="text-sm text-gray-500">so'm</span>
                            </div>
                          )} */}
                        </>
                      )
                    })()}
                  </div>
                  {/* BENEFITS */}
                  <ul className="flex-1 mt-7 space-y-3.5">
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
                    className={`mt-6 w-full py-3.5 rounded-xl font-semibold text-white transition-all
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
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)}>
        <Auth />
      </AuthModal>
    </>
  )
}

export default PricingContent
