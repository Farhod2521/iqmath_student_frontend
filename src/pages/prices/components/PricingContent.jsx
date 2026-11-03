import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Box, CalendarDays, Check, Crown } from 'lucide-react'
import { usePricingModalStore } from '@/store'
import PricingCouponModal from '@/modules/student/payment/components/PricingCouponModal'
import AuthModal from '@/home/components/auth/AuthModal'
import Auth from '@/home/components/auth/Auth'
import { closeAuthModal, openAuthWithReturn } from '@/home/components/auth/AuthGate'
import { GOALS, reachGoal } from '@/utils/metrika'

const formatMoney = (value) =>
  Math.round(Number(value) || 0)
    .toLocaleString('ru-RU')
    .replace(/,/g, ' ')

const TEXTS = {
  uz: {
    start: 'Boshlash uchun ideal tanlov',
    pro: 'Ko‘proq imkoniyat, yuqori natija',
    choose: (name) => `${name} tarifini tanlash`,
    popular: 'Eng ommabop',
    period: (n) => `${n} oylik`
  },
  ru: {
    start: 'Идеальный выбор для начала',
    pro: 'Больше возможностей, выше результат',
    choose: (name) => `Выбрать тариф ${name}`,
    popular: 'Самый популярный',
    period: (n) => `${n} мес.`
  }
}

// Ajratilgan ("Eng ommabop") tarif — toj va to'liq ko'k tugma, qolganlari — kub va chegarali tugma
const tierStyle = (highlighted) =>
  highlighted
    ? {
        Icon: Crown,
        button: 'bg-[#1D6BFF] text-white shadow-[0_16px_30px_-14px_rgba(29,107,255,0.9)] hover:bg-[#1557D6]'
      }
    : {
        Icon: Box,
        button: 'border-2 border-[#1D6BFF] bg-white text-[#1D6BFF] hover:bg-[#EEF3FF]'
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
    reachGoal(GOALS.buyClick, { plan_id: plan.id })
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
  const periodSaving = useMemo(() => {
    const cheapest = (n) =>
      Math.min(...(dataSource || []).filter((plan) => plan.months === n).map((plan) => Number(plan.sale_price) / n))
    const base = monthOptions.length ? cheapest(monthOptions[0]) : 0
    return Object.fromEntries(
      monthOptions.slice(1).map((n) => [n, base > 0 ? Math.max(0, Math.round((1 - cheapest(n) / base) * 100)) : 0])
    )
  }, [dataSource, monthOptions])
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
      <div className="relative mx-auto mt-8 max-w-[1280px] px-4 pb-8 lg:pb-12">
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
                  className="flex w-full max-w-[560px] rounded-2xl border border-[#E6EBF5] bg-white p-1.5 shadow-[0_18px_40px_-28px_rgba(29,79,224,0.45)] sm:inline-flex sm:w-auto sm:max-w-none"
                >
                  {monthOptions.map((n) => {
                    const active = n === activeMonths
                    return (
                      <button
                        key={n}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setMonths(n)}
                        className={`inline-flex min-w-0 flex-1 flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 whitespace-nowrap rounded-xl px-2 py-2.5 text-[14px] font-bold transition sm:min-w-[150px] sm:flex-none sm:gap-2 sm:px-5 sm:text-[15px] ${
                          active
                            ? 'bg-[#1D6BFF] text-white shadow-[0_10px_20px_-10px_rgba(29,107,255,0.9)]'
                            : 'text-[#0B1B3F] hover:bg-[#F4F7FC]'
                        }`}
                      >
                        {text.period(n)}
                        {periodSaving[n] > 0 ? (
                          <span
                            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                              active ? 'bg-white/20 text-white' : 'bg-[#DCFCE7] text-[#16A34A]'
                            }`}
                          >
                            -{periodSaving[n]}%
                          </span>
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}

            <div
              className={`mx-auto mt-7 grid grid-cols-1 items-stretch gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2 ${
                visible.length > 2 ? 'max-w-[1260px] lg:grid-cols-3' : 'max-w-[1020px]'
              }`}
            >
              {visible.map((item) => {
                const highlighted = isPopular(item)
                const style = tierStyle(highlighted)
                const original = Number(item.originalPrice || 0)
                const sale = Number(item.price || 0)
                const ownBenefits = (item.benefits || []).filter((benefit) => benefit.isSelected)

                return (
                  <div
                    key={item.id}
                    className={`relative flex flex-col rounded-[24px] bg-white p-5 text-left transition duration-300 hover:-translate-y-1 sm:rounded-[28px] sm:p-8 ${
                      highlighted
                        ? 'border-2 border-[#1D6BFF] pt-12 shadow-[0_30px_60px_-36px_rgba(29,107,255,0.6)] sm:pt-8'
                        : 'border border-[#E6EBF5] shadow-[0_24px_50px_-38px_rgba(15,23,42,0.45)]'
                    }`}
                  >
                    {highlighted ? (
                      <span className="absolute -right-0.5 -top-0.5 inline-flex items-center gap-1.5 rounded-bl-2xl rounded-tr-[24px] bg-[#1D6BFF] px-4 py-2 text-[13px] sm:rounded-tr-[28px] font-bold text-white">
                        <Crown size={15} className="fill-white" />
                        {item.category?.title || text.popular}
                      </span>
                    ) : null}

                    {/* Nomi va qisqa tavsif */}
                    <div className="flex items-center gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF1FF] text-[#1D6BFF]">
                        <style.Icon size={28} strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate text-[21px] font-extrabold text-[#0B1B3F] sm:text-[24px]">{item.original_name}</h3>
                        <p className="text-[14px] text-[#64748B]">{highlighted ? text.pro : text.start}</p>
                      </div>
                    </div>

                    {/* Muddat */}
                    <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg bg-[#F1F4F9] px-3 py-1.5 text-[14px] font-bold text-[#0F172A]">
                      <CalendarDays size={16} className="text-[#1D6BFF]" />
                      {text.period(item.months)}
                    </span>

                    {/* Narx */}
                    <div className="mt-4">
                      {item.discount_percent > 0 && original > sale ? (
                        <div className="flex items-center gap-3">
                          <span className="text-[17px] text-[#94A3B8] line-through">
                            {formatMoney(original)} {t('pricing.currency')}
                          </span>
                          <span className="rounded-full bg-[#FEE2E2] px-2.5 py-0.5 text-[13px] font-bold text-[#DC2626]">
                            -{item.discount_percent}%
                          </span>
                        </div>
                      ) : null}
                      <p className="mt-1 text-[30px] font-extrabold leading-tight tracking-tight text-[#0B1B3F] min-[400px]:text-[34px] sm:text-[40px]">
                        {formatMoney(sale)} {t('pricing.currency')}
                      </p>
                    </div>

                    {/* Imkoniyatlar — faqat shu tarifga tegishlilari */}
                    <ul className="mt-5 flex-1 space-y-2.5 self-stretch rounded-2xl bg-[#F5F8FD] px-4 py-4 sm:px-5">
                      {ownBenefits.map((benefit) => (
                        <li
                          key={benefit.id}
                          className={`flex items-center gap-3 text-[15px] text-[#1E293B] ${highlighted ? 'font-semibold' : ''}`}
                        >
                          <Check size={18} strokeWidth={3} className="shrink-0 text-[#1D6BFF]" />
                          {benefit.title}
                        </li>
                      ))}
                    </ul>

                    {/* Tanlash */}
                    <button
                      type="button"
                      disabled={!item.is_active}
                      onClick={() => handleBuy(item)}
                      className={`mt-6 inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-2xl px-3 text-[15px] font-bold sm:mt-7 sm:h-14 sm:text-[16px] transition active:scale-[0.98] ${
                        item.is_active ? style.button : 'cursor-not-allowed bg-gray-300 text-white'
                      }`}
                    >
                      {item.is_active ? text.choose(item.original_name) : t('notAvailable')}
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
