import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Box, CalendarDays, Check, Crown, Gift } from 'lucide-react'
import { usePricingModalStore } from '@/store'
import PricingCouponModal from '@/modules/student/payment/components/PricingCouponModal'
import AuthModal from '@/home/components/auth/AuthModal'
import Auth from '@/home/components/auth/Auth'
import { closeAuthModal, openAuthWithReturn } from '@/home/components/auth/AuthGate'

const formatMoney = (value) =>
  Math.round(Number(value) || 0)
    .toLocaleString('ru-RU')
    .replace(/,/g, ' ')

const TEXTS = {
  uz: {
    start: 'Boshlash uchun ideal tanlov',
    pro: 'Ko‘proq imkoniyat, yuqori natija',
    choose: 'Tarifni tanlash',
    save: 'Siz tejaysiz',
    popular: 'Eng ommabop',
    period: (n) => `${n} oylik`
  },
  ru: {
    start: 'Идеальный выбор для начала',
    pro: 'Больше возможностей, выше результат',
    choose: 'Выбрать тариф',
    save: 'Вы экономите',
    popular: 'Самый популярный',
    period: (n) => `${n} мес.`
  }
}

// Ajratilgan ("Eng ommabop") tarif — binafsha toj, qolganlari — ko'k kub
const tierStyle = (highlighted) =>
  highlighted
    ? {
        Icon: Crown,
        color: '#7C3AED',
        soft: '#F1EAFF',
        button: 'from-[#4F46E5] via-[#7C3AED] to-[#A855F7] shadow-[0_16px_30px_-14px_rgba(124,58,237,0.85)]'
      }
    : {
        Icon: Box,
        color: '#2563EB',
        soft: '#EAF1FF',
        button: 'from-[#1D6BFF] to-[#3B8BFF] shadow-[0_16px_30px_-14px_rgba(37,99,235,0.85)]'
      }

const isPopular = (plan) => /popular|ommabop|попул/i.test(plan.categoryKey)

const PricingContent = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [months, setMonths] = useState(null)
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const text = TEXTS[lang]

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
      // plan ni vaqtincha saqlab turamiz (login bo'lgach davom ettirish uchun)
      localStorage.setItem('pending_plan_id', String(plan.id))

      setAuthOpen(true)

      // shu sahifaga qaytib kelsin (hozirgi url + querylar bilan)
      const returnUrl = router.asPath
      openAuthWithReturn(router, returnUrl, 'signUp') // ?tab=signUp + returnUrl yozadi
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
        name: [i18n.language === 'uz' ? plan?.name_uz : plan?.name_ru, getTranslatedName(plan.months)]
          .filter(Boolean)
          .join(' — '),
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
        categoryKey: plan?.category?.title_uz || '',
        category: {
          id: plan?.category?.id,
          title: i18n.language === 'uz' ? plan?.category?.title_uz : plan?.category?.title_ru
        }
      }
    }) || []

  // Muddatlar (1 / 3 / 12 oylik) — tepadagi almashtirgich; har muddatda tariflar (Start, Start Pro) yonma-yon
  const monthOptions = useMemo(
    () => [...new Set((dataSource || []).map((plan) => plan.months))].sort((a, b) => a - b),
    [dataSource]
  )
  const activeMonths = monthOptions.includes(months) ? months : monthOptions[0]
  const visible = data
    .filter((plan) => plan.months === activeMonths)
    .sort((a, b) => Number(isPopular(a)) - Number(isPopular(b)) || a.price - b.price)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    ;(async () => {
      const session = await getSession()
      if (!session) return

      const pendingId = localStorage.getItem('pending_plan_id')
      if (!pendingId) return

      const plan = data.find((p) => String(p.id) === String(pendingId))
      if (!plan) return

      setSelectedPlan(plan)
      setMonths(plan.months)
      openPricingModal(plan?.price)
      localStorage.removeItem('pending_plan_id')

      // auth querylarni tozalab qo'ysak chiroyli
      closeAuthModal(router)
      setAuthOpen(false)
    })()
  }, [router.isReady, data, openPricingModal])

  return (
    <>
      <div className="relative mx-auto mt-8 max-w-[1280px] px-4 pb-8 md:mt-10 lg:pb-12">
        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500" />
          </div>
        ) : data.length ? (
          <>
            {monthOptions.length > 1 ? (
              <div className="flex justify-center">
                <div
                  role="tablist"
                  className="inline-flex rounded-2xl border border-[#E6EBF5] bg-white p-1.5 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.5)]"
                >
                  {monthOptions.map((n) => (
                    <button
                      key={n}
                      type="button"
                      role="tab"
                      aria-selected={n === activeMonths}
                      onClick={() => setMonths(n)}
                      className={`min-w-[96px] rounded-xl px-5 py-2.5 text-[15px] font-semibold transition sm:min-w-[120px] ${
                        n === activeMonths
                          ? 'bg-gradient-to-r from-[#1D6BFF] to-[#3B8BFF] text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,0.9)]'
                          : 'text-[#334155] hover:bg-[#F4F7FC]'
                      }`}
                    >
                      {text.period(n)}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div
              className={`mx-auto mt-8 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 ${
                visible.length > 2 ? 'max-w-[1260px] lg:grid-cols-3' : 'max-w-[900px]'
              }`}
            >
              {visible.map((item) => {
                const highlighted = isPopular(item)
                const style = tierStyle(highlighted)
                const original = Number(item.originalPrice || 0)
                const sale = Number(item.price || 0)
                const saved = Math.max(0, original - sale)
                const ownBenefits = (item.benefits || []).filter((benefit) => benefit.isSelected)

                return (
                  <div
                    key={item.id}
                    className={`relative flex flex-col rounded-[26px] p-6 text-left transition duration-300 hover:-translate-y-1 sm:p-7 ${
                      highlighted
                        ? 'border-2 border-[#A78BFA] bg-gradient-to-b from-[#F7F2FF] via-white to-[#FBF8FF] shadow-[0_30px_60px_-35px_rgba(124,58,237,0.6)]'
                        : 'border border-[#E6EBF5] bg-white shadow-[0_24px_50px_-38px_rgba(15,23,42,0.45)]'
                    }`}
                  >
                    {highlighted ? (
                      <span className="absolute -top-px right-6 inline-flex items-center gap-1.5 rounded-b-xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-[0_10px_20px_-10px_rgba(124,58,237,0.9)]">
                        <Crown size={13} className="fill-white" />
                        {item.category?.title || text.popular}
                      </span>
                    ) : null}

                    {/* Nomi va qisqa tavsif */}
                    <div className="flex items-center gap-4">
                      <span
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: style.soft, color: style.color }}
                      >
                        <style.Icon size={28} strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate text-[22px] font-extrabold text-[#0B1B3F]">{item.original_name}</h3>
                        <p className="text-sm text-[#475569]">{highlighted ? text.pro : text.start}</p>
                      </div>
                    </div>

                    {/* Muddat */}
                    <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#F1F4F9] px-3.5 py-1.5 text-sm font-semibold text-[#0F172A]">
                      <CalendarDays size={17} style={{ color: style.color }} />
                      {text.period(item.months)}
                    </span>

                    {/* Narx */}
                    <div className="mt-4">
                      {item.discount_percent > 0 && original > sale ? (
                        <div className="flex items-center gap-3">
                          <span className="text-lg text-[#94A3B8] line-through">
                            {formatMoney(original)} {t('pricing.currency')}
                          </span>
                          <span className="rounded-full bg-[#FEE2E2] px-3 py-1 text-sm font-bold text-[#DC2626]">
                            -{item.discount_percent}%
                          </span>
                        </div>
                      ) : null}
                      <p className="mt-1 text-[34px] font-extrabold leading-tight tracking-tight text-[#0B1B3F] sm:text-[38px]">
                        {formatMoney(sale)} {t('pricing.currency')}
                      </p>
                      {saved > 0 ? (
                        <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-[#ECFDF3] px-4 py-2.5 text-sm font-semibold text-[#15803D]">
                          <Gift size={19} className="shrink-0 text-[#16A34A]" />
                          {text.save}: {formatMoney(saved)} {t('pricing.currency')}
                        </div>
                      ) : null}
                    </div>

                    {/* Imkoniyatlar — faqat shu tarifga tegishlilari */}
                    <ul className="mt-5 flex-1 space-y-3 border-t border-[#EEF1F6] pt-5">
                      {ownBenefits.map((benefit) => (
                        <li key={benefit.id} className="flex items-center gap-3 text-[15px] text-[#1E293B]">
                          <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                            style={{ backgroundColor: style.color }}
                          >
                            <Check size={13} strokeWidth={3.5} />
                          </span>
                          {benefit.title}
                        </li>
                      ))}
                    </ul>

                    {/* Tanlash */}
                    <button
                      type="button"
                      disabled={!item.is_active}
                      onClick={() => handleBuy(item)}
                      className={`mt-7 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl text-base font-bold text-white transition active:scale-[0.98] ${
                        item.is_active
                          ? `bg-gradient-to-r ${style.button} hover:brightness-110`
                          : 'cursor-not-allowed bg-gray-300'
                      }`}
                    >
                      {item.is_active ? text.choose : t('notAvailable')}
                      {item.is_active ? <ArrowRight size={19} /> : null}
                    </button>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <p className="mt-12 text-center text-gray-600">{t('noData')}</p>
        )}
      </div>

      <PricingCouponModal
        selectedPlan={selectedPlan}
        isOpen={isPricingModalOpen}
        onClose={closePricingModal}
        originalPrice={pricingOriginalPrice}
      />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} title={t('auth', 'Kirish / Ro‘yxatdan o‘tish')}>
        <Auth />
      </AuthModal>
    </>
  )
}

export default PricingContent
