import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import {
  ArrowRight,
  BarChart3,
  Box,
  CalendarDays,
  Check,
  CircleCheckBig,
  Clock3,
  Crown,
  PlayCircle,
  Trophy,
  UsersRound,
  X
} from 'lucide-react'
import { getPaymentTrailDays } from '@/services/controllers'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import PricingCouponModal from '@/modules/student/payment/components/PricingCouponModal'
import { releaseModal, requestModal } from '@/utils/modalQueue'

const MODAL_ID = 'subscription-promo'

const LOGO = 'https://api.iqmath.uz/system/logo/logo.png'

const TEXTS = {
  uz: {
    title: 'To‘liq imkoniyatlar',
    accent: 'sizni kutmoqda!',
    subtitle: 'Barcha darslar, testlar va premium imkoniyatlardan foydalanish uchun obunani faollashtiring.',
    trialLeft: 'Sinov muddati: {{n}} kun qoldi',
    trialEnded: 'Sinov muddati tugadi',
    features: [
      ['video', 'Video darslar', 'Har bir mavzu bo‘yicha tushuntirishlar'],
      ['tests', 'Mavzu testlari', 'O‘rganganingizni mustahkamlang'],
      ['diag', 'Diagnostika', 'Bilim darajangizni aniqlang'],
      ['battle', 'Battle va reyting', 'Do‘stlar bilan bellashing'],
      ['parent', 'Ota-ona nazorati', 'Natijalar ota-onaga ko‘rinadi']
    ],
    months: '{{n}} oy',
    period: '{{n}} oylik',
    start: 'Boshlash uchun ideal tanlov',
    pro: 'Ko‘proq imkoniyat, yuqori natija',
    popular: 'Eng ommabop',
    choose: 'Tanlash',
    som: 'so‘m'
  },
  ru: {
    title: 'Все возможности',
    accent: 'ждут вас!',
    subtitle: 'Активируйте подписку, чтобы пользоваться всеми уроками, тестами и премиум-возможностями.',
    trialLeft: 'Пробный период: осталось {{n}} дн.',
    trialEnded: 'Пробный период закончился',
    features: [
      ['video', 'Видеоуроки', 'Объяснения по каждой теме'],
      ['tests', 'Тесты по темам', 'Закрепляйте изученное'],
      ['diag', 'Диагностика', 'Определите свой уровень'],
      ['battle', 'Battle и рейтинг', 'Соревнуйтесь с друзьями'],
      ['parent', 'Контроль родителей', 'Результаты видны родителям']
    ],
    months: '{{n}} мес.',
    period: '{{n}} мес.',
    start: 'Идеальный выбор для начала',
    pro: 'Больше возможностей, выше результат',
    popular: 'Самый популярный',
    choose: 'Выбрать',
    som: 'сум'
  }
}

// Imkoniyatlar ikonkalari (har biri o'z rangida)
const FEATURE_ICONS = {
  video: { Icon: PlayCircle, color: '#2563EB', soft: '#E6EEFF' },
  tests: { Icon: CircleCheckBig, color: '#16A34A', soft: '#E3F8EB' },
  diag: { Icon: BarChart3, color: '#7C3AED', soft: '#EFE7FF' },
  battle: { Icon: Trophy, color: '#F59E0B', soft: '#FFF3DB' },
  parent: { Icon: UsersRound, color: '#EC4899', soft: '#FDE7F2' }
}

// "Eng ommabop" tarif (Start Pro) — admin paneldagi kategoriya bo'yicha
const isPopular = (plan) => /popular|ommabop|попул/i.test(plan?.category?.title_uz || plan?.category?.title_ru || '')

const fill = (text, args) => Object.entries(args).reduce((out, [k, v]) => out.replace(`{{${k}}}`, v), text)
const formatMoney = (value) =>
  Math.round(Number(value) || 0)
    .toLocaleString('ru-RU')
    .replace(/,/g, ' ')

/**
 * Login qilgandan keyin chiqadigan "obuna sotib oling" oynasi.
 * Faqat ro'yxatdan o'tgan, lekin obuna sotib olmagan (sinov muddatidagi yoki muddati tugagan)
 * o'quvchilarga — har bir kirishda (brauzer sessiyasida) bir marta. Obunasi borlarga chiqmaydi.
 */
export default function SubscriptionPromoModal() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const text = TEXTS[lang]
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState(null)
  const [plans, setPlans] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [months, setMonths] = useState(null)

  const storageKey = `iq_promo_${session?.id || session?.user?.id || 'user'}`

  useEffect(() => {
    if (!session?.accessToken) return undefined
    try {
      if (sessionStorage.getItem(storageKey)) return undefined
    } catch {}

    let alive = true
    let timer
    let cancel = () => {}
    getPaymentTrailDays()
      .then((res) => {
        const data = res?.data || {}
        if (!alive || data.is_paid) return
        setInfo(data)
        timer = setTimeout(() => {
          if (!alive) return
          // Boshqa oyna (masalan kundalik mukofot) ochiq bo'lsa — u yopilgach chiqadi
          cancel = requestModal(MODAL_ID, () => {
            if (!alive) return
            try {
              sessionStorage.setItem(storageKey, '1')
            } catch {}
            setOpen(true)
          })
        }, 900)
      })
      .catch(() => {})

    // Tariflar — admin paneldagi haqiqiy narxlar (muddati bo'yicha tartiblangan)
    request
      .get(URLS.paymentPlans)
      .then((res) => {
        const list = Array.isArray(res?.data) ? res.data : res?.data?.data || []
        // Barcha faol tariflar (Start, Start Pro) — muddat almashtirgich bilan ko'rsatiladi
        if (alive) setPlans(list.filter((p) => p.is_active !== false))
      })
      .catch(() => {})

    return () => {
      alive = false
      clearTimeout(timer)
      cancel()
    }
  }, [session?.accessToken, storageKey])

  // Oyna yopilganda navbatdagi oynaga yo'l beriladi
  const wasOpen = useRef(false)
  useEffect(() => {
    if (open) wasOpen.current = true
    else if (wasOpen.current) {
      wasOpen.current = false
      releaseModal(MODAL_ID)
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const choosePlan = (plan) => {
    const sale = Number(plan.sale_price) || 0
    const discount = Number(plan.discount_percent) || 0
    setOpen(false)
    // To'lov oynasi (promokod → to'lov) kutgan ko'rinishda
    setSelectedPlan({
      id: plan.id,
      name: [lang === 'ru' ? plan.name_ru : plan.name_uz, fill(text.months, { n: plan.months })]
        .filter(Boolean)
        .join(' — '),
      price: sale,
      originalPrice: discount > 0 ? Math.round(sale / (1 - discount / 100)) : sale,
      months: plan.months
    })
  }

  // Muddatlar (1 / 3 / 12 oylik) — har birida tariflar (Start, Start Pro) yonma-yon
  const monthOptions = useMemo(() => [...new Set(plans.map((p) => Number(p.months)))].sort((a, b) => a - b), [plans])
  const periodSaving = useMemo(() => {
    const cheapest = (n) => Math.min(...plans.filter((p) => Number(p.months) === n).map((p) => Number(p.sale_price) / n))
    const base = monthOptions.length ? cheapest(monthOptions[0]) : 0
    return Object.fromEntries(
      monthOptions.slice(1).map((n) => [n, base > 0 ? Math.max(0, Math.round((1 - cheapest(n) / base) * 100)) : 0])
    )
  }, [plans, monthOptions])
  const activeMonths = monthOptions.includes(months) ? months : monthOptions[0]
  const visible = plans
    .filter((p) => Number(p.months) === activeMonths)
    .sort((a, b) => Number(isPopular(a)) - Number(isPopular(b)) || a.sale_price - b.sale_price)

  const days = Number(info?.days_until_next_payment) || 0
  const trialActive = days > 0

  return (
    <>
      {open && info ? (
        <div
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-[#0B1B3F]/55 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            className="iq-promo-in relative grid max-h-[94dvh] w-full min-w-0 max-w-[1180px] grid-cols-1 overflow-y-auto overflow-x-hidden rounded-t-[28px] bg-gradient-to-br from-[#EEF4FF] via-white to-[#F3F7FF] shadow-[0_40px_90px_-30px_rgba(15,23,42,0.6)] sm:rounded-[32px] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Fon bezaklari */}
            <span className="pointer-events-none absolute -left-24 top-1/3 h-[420px] w-[420px] rounded-full bg-[#DCE8FF]/70 blur-3xl" />
            <span className="pointer-events-none absolute right-0 top-0 h-[260px] w-[420px] rounded-full bg-[#E8EEFF]/80 blur-3xl" />

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="close"
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1D4ED8] shadow-[0_8px_24px_-8px_rgba(15,23,42,0.35)] transition hover:bg-[#F1F5FF] sm:right-6 sm:top-6 sm:h-12 sm:w-12"
            >
              <X size={22} />
            </button>

            {/* Chap: logo, sarlavha, robot */}
            <div className="relative flex min-w-0 flex-col px-5 pb-0 pt-6 sm:px-10 sm:pt-8">
              <div className="flex items-center gap-2">
                <img src={LOGO} alt="" className="h-9 w-auto" />
                <span className="text-[24px] font-extrabold tracking-tight text-[#0B1B3F]">MATH</span>
              </div>

              <h2 className="mt-6 text-[30px] font-extrabold leading-[1.1] tracking-tight text-[#0B1B3F] sm:mt-10 sm:text-[38px] xl:text-[44px]">
                {text.title}
                <br />
                <span className="text-[#1D6BFF]">{text.accent}</span>
              </h2>
              <p className="mt-4 max-w-[400px] text-[16px] leading-relaxed text-[#475569] sm:text-[18px]">{text.subtitle}</p>

              <span
                className={`mt-5 inline-flex w-fit items-center gap-2 rounded-xl px-3.5 py-2 text-[14px] font-bold ${
                  trialActive ? 'bg-[#E8F0FF] text-[#1D4ED8]' : 'bg-[#FEE2E2] text-[#B91C1C]'
                }`}
              >
                <Clock3 size={16} />
                {trialActive ? fill(text.trialLeft, { n: days }) : text.trialEnded}
              </span>

              <div className="relative mt-auto hidden justify-center pb-6 pt-6 lg:flex">
                <span className="pointer-events-none absolute bottom-10 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full bg-[#BFD6FF]/60 blur-2xl" />
                <img
                  src="/images/homepage/premium-robot.webp"
                  alt=""
                  className="iq-promo-float relative w-[280px] drop-shadow-[0_30px_40px_rgba(29,78,216,0.25)] xl:w-[320px]"
                />
              </div>
            </div>

            {/* O'ng: imkoniyatlar va tariflar */}
            <div className="relative min-w-0 px-5 pb-6 pt-5 sm:px-10 sm:pb-10 lg:pl-2 lg:pt-24">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-3">
                {text.features.map(([iconKey, title, desc]) => {
                  const { Icon, color, soft } = FEATURE_ICONS[iconKey]
                  return (
                  <div
                    key={title}
                    className="flex min-w-0 items-center gap-2.5 rounded-2xl bg-white/90 p-3 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.55)] sm:gap-3 sm:p-3.5"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl sm:h-12 sm:w-12"
                      style={{ backgroundColor: soft, color }}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13.5px] font-bold leading-tight text-[#0B1B3F] sm:text-[15px]">{title}</span>
                      <span className="mt-0.5 hidden text-[12.5px] leading-snug text-[#64748B] sm:block">{desc}</span>
                    </span>
                  </div>
                  )
                })}
              </div>

              {visible.length ? (
                <>
                  {/* Muddat almashtirgich: 1 / 3 / 12 oylik */}
                  {monthOptions.length > 1 ? (
                    <div role="tablist" className="mt-6 flex w-full rounded-2xl border border-[#E6EBF5] bg-white p-1.5">
                      {monthOptions.map((n) => {
                        const active = n === activeMonths
                        return (
                          <button
                            key={n}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => setMonths(n)}
                            className={`inline-flex min-w-0 flex-1 flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5 whitespace-nowrap rounded-xl px-2 py-2 text-[14px] font-bold transition sm:text-[15px] ${
                              active
                                ? 'bg-[#1D6BFF] text-white shadow-[0_10px_20px_-10px_rgba(29,107,255,0.9)]'
                                : 'text-[#0B1B3F] hover:bg-[#F4F7FC]'
                            }`}
                          >
                            {fill(text.period, { n })}
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
                  ) : null}

                  {/* Tariflar: Start va Start Pro yonma-yon */}
                  <div className={`mt-4 grid grid-cols-1 gap-4 ${visible.length >= 2 ? 'sm:grid-cols-2' : ''}`}>
                    {visible.map((plan) => {
                      const highlighted = isPopular(plan)
                      const PlanIcon = highlighted ? Crown : Box
                      const sale = Number(plan.sale_price) || 0
                      const discount = Number(plan.discount_percent) || 0
                      const original = discount > 0 ? Math.round(sale / (1 - discount / 100)) : sale
                      const name = lang === 'ru' ? plan.name_ru : plan.name_uz
                      const benefits = (plan.benefits || []).filter((b) => b.is_selected)
                      return (
                        <div
                          key={plan.id}
                          className={`relative flex flex-col rounded-[22px] bg-white p-4 text-left transition duration-300 hover:-translate-y-1 sm:p-5 ${
                            highlighted
                              ? 'border-2 border-[#1D6BFF] shadow-[0_24px_44px_-28px_rgba(29,107,255,0.8)]'
                              : 'border border-[#E6EBF5] shadow-[0_18px_40px_-34px_rgba(15,23,42,0.55)]'
                          }`}
                        >
                          {highlighted ? (
                            <span className="absolute -right-0.5 -top-0.5 inline-flex items-center gap-1 rounded-bl-2xl rounded-tr-[22px] bg-[#1D6BFF] px-3 py-1.5 text-[12px] font-bold text-white">
                              <Crown size={13} className="fill-white" />
                              {(lang === 'ru' ? plan.category?.title_ru : plan.category?.title_uz) || text.popular}
                            </span>
                          ) : null}

                          <div className="flex items-center gap-3">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF1FF] text-[#1D6BFF]">
                              <PlanIcon size={22} strokeWidth={1.8} />
                            </span>
                            <div className="min-w-0">
                              <h3 className="truncate text-[18px] font-extrabold text-[#0B1B3F]">{name}</h3>
                              <p className="text-[12.5px] leading-snug text-[#64748B]">
                                {highlighted ? text.pro : text.start}
                              </p>
                            </div>
                          </div>

                          <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-lg bg-[#F1F4F9] px-2.5 py-1 text-[13px] font-bold text-[#0F172A]">
                            <CalendarDays size={14} className="text-[#1D6BFF]" />
                            {fill(text.period, { n: plan.months })}
                          </span>

                          <div className="mt-2">
                            {discount > 0 && original > sale ? (
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] text-[#94A3B8] line-through">
                                  {formatMoney(original)} {text.som}
                                </span>
                                <span className="rounded-full bg-[#FEE2E2] px-2 py-0.5 text-[12px] font-bold text-[#DC2626]">
                                  -{discount}%
                                </span>
                              </div>
                            ) : null}
                            <p className="text-[24px] font-extrabold leading-tight tracking-tight text-[#0B1B3F] sm:text-[26px]">
                              {formatMoney(sale)} {text.som}
                            </p>
                          </div>

                          {benefits.length ? (
                            <ul className="mt-3 flex-1 space-y-1.5 rounded-2xl bg-[#F5F8FD] px-3.5 py-3">
                              {benefits.map((benefit) => (
                                <li key={benefit.id} className="flex items-center gap-2 text-[13.5px] text-[#1E293B]">
                                  <Check size={15} strokeWidth={3} className="shrink-0 text-[#1D6BFF]" />
                                  {lang === 'ru' ? benefit.title_ru : benefit.title_uz}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="flex-1" />
                          )}

                          <button
                            type="button"
                            onClick={() => choosePlan(plan)}
                            className={`mt-4 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-2xl px-4 text-[15px] font-bold transition active:scale-[0.98] ${
                              highlighted
                                ? 'bg-[#1D6BFF] text-white shadow-[0_12px_24px_-12px_rgba(29,107,255,0.9)] hover:bg-[#1557D6]'
                                : 'border-2 border-[#1D6BFF] text-[#1D4ED8] hover:bg-[#EEF4FF]'
                            }`}
                          >
                            {text.choose}
                            <ArrowRight size={18} />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <style jsx global>{`
            @keyframes iq-promo-in {
              from {
                opacity: 0;
                transform: translateY(24px) scale(0.97);
              }
              to {
                opacity: 1;
                transform: none;
              }
            }
            @keyframes iq-promo-float {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            .iq-promo-in {
              animation: iq-promo-in 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .iq-promo-float {
              animation: iq-promo-float 4s ease-in-out infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .iq-promo-in,
              .iq-promo-float {
                animation: none;
              }
            }
          `}</style>
        </div>
      ) : null}

      {/* Tarif tanlangach: promokod va to'lov oynasi */}
      <PricingCouponModal
        selectedPlan={selectedPlan}
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        originalPrice={selectedPlan?.originalPrice}
      />
    </>
  )
}
