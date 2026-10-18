import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import {
  ArrowRight,
  BarChart3,
  CircleCheckBig,
  Clock3,
  Crown,
  MessageCircleQuestion,
  PlayCircle,
  Rocket,
  Sprout,
  Trophy,
  UsersRound,
  X
} from 'lucide-react'
import { getPaymentTrailDays } from '@/services/controllers'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import PricingCouponModal from '@/modules/student/payment/components/PricingCouponModal'

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
      ['mentor', 'Mentor yordami', 'Savollaringizga javob oling'],
      ['parent', 'Ota-ona nazorati', 'Natijalar ota-onaga ko‘rinadi']
    ],
    months: '{{n}} oy',
    perMonth: 'oyiga {{price}} so‘m',
    discount: '{{n}}% chegirma',
    popular: 'Eng mashhur',
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
      ['mentor', 'Помощь ментора', 'Ответы на ваши вопросы'],
      ['parent', 'Контроль родителей', 'Результаты видны родителям']
    ],
    months: '{{n}} мес.',
    perMonth: '{{price}} сум в месяц',
    discount: 'скидка {{n}}%',
    popular: 'Популярный',
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
  mentor: { Icon: MessageCircleQuestion, color: '#0EA5E9', soft: '#E0F4FD' },
  parent: { Icon: UsersRound, color: '#EC4899', soft: '#FDE7F2' }
}

// Tarif ikonkasi: eng qisqasi — nihol, eng uzuni — toj, o'rtadagilari — raketa
const planIcon = (index, total) =>
  index === 0
    ? { Icon: Sprout, color: '#16A34A', soft: '#E3F8EB' }
    : index === total - 1
      ? { Icon: Crown, color: '#F59E0B', soft: '#FFF3DB' }
      : { Icon: Rocket, color: '#2563EB', soft: '#E6EEFF' }

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

  const storageKey = `iq_promo_${session?.id || session?.user?.id || 'user'}`

  useEffect(() => {
    if (!session?.accessToken) return undefined
    try {
      if (sessionStorage.getItem(storageKey)) return undefined
    } catch {}

    let alive = true
    let timer
    getPaymentTrailDays()
      .then((res) => {
        const data = res?.data || {}
        if (!alive || data.is_paid) return
        setInfo(data)
        timer = setTimeout(() => {
          if (!alive) return
          try {
            sessionStorage.setItem(storageKey, '1')
          } catch {}
          setOpen(true)
        }, 900)
      })
      .catch(() => {})

    // Tariflar — admin paneldagi haqiqiy narxlar (muddati bo'yicha tartiblangan)
    request
      .get(URLS.paymentPlans)
      .then((res) => {
        const list = Array.isArray(res?.data) ? res.data : res?.data?.data || []
        if (alive) setPlans(list.filter((p) => p.is_active !== false).sort((a, b) => a.months - b.months))
      })
      .catch(() => {})

    return () => {
      alive = false
      clearTimeout(timer)
    }
  }, [session?.accessToken, storageKey])

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
      name: (lang === 'ru' ? plan.name_ru : plan.name_uz) || fill(text.months, { n: plan.months }),
      price: sale,
      originalPrice: discount > 0 ? Math.round(sale / (1 - discount / 100)) : sale,
      months: plan.months
    })
  }

  const popularId =
    plans.find((p) => /popular|ommabop|попул/i.test(p.category?.title_uz || p.category?.title_ru || ''))?.id ||
    plans[Math.floor(plans.length / 2)]?.id

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

              {plans.length ? (
                <div className={`mt-6 grid grid-cols-1 gap-4 ${plans.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
                  {plans.map((plan, index) => {
                    const popular = plan.id === popularId
                    const sale = Number(plan.sale_price) || 0
                    const months = Number(plan.months) || 1
                    const discount = Number(plan.discount_percent) || 0
                    const icon = planIcon(index, plans.length)
                    return (
                      <div
                        key={plan.id}
                        className={`relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-[22px] px-4 py-4 text-left transition duration-300 hover:-translate-y-1 sm:flex sm:flex-col sm:items-center sm:gap-0 sm:px-4 sm:pb-5 sm:pt-7 sm:text-center ${
                          popular
                            ? 'border-2 border-[#1D6BFF] bg-[#F3F7FF] shadow-[0_24px_44px_-28px_rgba(29,107,255,0.8)]'
                            : 'border border-[#EDF1F7] bg-white shadow-[0_18px_40px_-34px_rgba(15,23,42,0.55)]'
                        }`}
                      >
                        {popular ? (
                          <span className="absolute -top-3 left-4 whitespace-nowrap rounded-full bg-[#1D6BFF] px-3 py-0.5 text-[12px] font-bold text-white sm:-top-3.5 sm:left-1/2 sm:-translate-x-1/2 sm:px-4 sm:py-1 sm:text-[12.5px]">
                            {text.popular}
                          </span>
                        ) : null}
                        <span
                          className="flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14"
                          style={{ backgroundColor: icon.soft, color: icon.color }}
                        >
                          <icon.Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.2} />
                        </span>
                        {/* Telefonda: muddat, narx va chegirma bir ustunda; kompyuterda ustma-ust markazda */}
                        <div className="min-w-0 sm:contents">
                          <p className="text-[17px] font-extrabold leading-tight text-[#0B1B3F] sm:mt-3 sm:text-[22px]">
                            {fill(text.months, { n: months })}
                            <span className="ml-2 text-[15px] sm:hidden">
                              · {formatMoney(sale)} {text.som}
                            </span>
                          </p>
                          <p className="mt-1 hidden text-[19px] font-extrabold text-[#0B1B3F] sm:block">
                            {formatMoney(sale)} {text.som}
                          </p>
                          <p className="mt-0.5 text-[12.5px] text-[#64748B]">
                            {fill(text.perMonth, { price: formatMoney(sale / months) })}
                            {discount > 0 ? (
                              <span className="ml-1.5 font-bold text-[#15803D] sm:hidden">−{discount}%</span>
                            ) : null}
                          </p>
                          <span
                            className={`mt-2 hidden rounded-full bg-[#DCFCE7] px-3 py-1 text-[12.5px] font-bold text-[#15803D] sm:inline-block ${
                              discount > 0 ? '' : 'sm:invisible'
                            }`}
                          >
                            {fill(text.discount, { n: discount })}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => choosePlan(plan)}
                          className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-2xl px-4 text-[15px] font-bold transition sm:mt-4 sm:h-12 sm:w-full sm:text-[16px] ${
                            popular
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
