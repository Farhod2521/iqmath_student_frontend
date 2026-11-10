import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { useQueryClient } from '@tanstack/react-query'
import { KEYS } from '@/constants/key'
import { ArrowRight, CalendarCheck, Check, Gift, Lock, X } from 'lucide-react'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { fireConfetti } from '@/utils/confetti'
import { releaseModal, requestModal } from '@/utils/modalQueue'

const MODAL_ID = 'daily-reward'
const ILLUSTRATION = '/images/daily-reward/calendar.webp'

const TEXTS = {
  uz: {
    badge: 'Kundalik kirish mukofoti',
    title: 'Tabriklaymiz!',
    titleLead: 'Bugun ',
    accent: (n) => `+${n} gol oldingiz!`,
    subtitle: 'Saytga har kuni kirganingiz uchun +1 gol beriladi. Ketma-ketlikni uzmang!',
    day: (n) => `${n}-kun`,
    points: (n) => `+${n} gol`,
    streak: 'Hozirgi ketma-ketlik',
    streakValue: (n) => `${n} kun`,
    week: 'Bu haftada to‘plangan',
    weekValue: (n) => `${n} gol`,
    done: 'Davom etish',
    tomorrow: 'Ertaga qaytib keling — yana +1 gol olasiz!',
    awarded: (n) => `+${n} gol qo‘shildi!`
  },
  ru: {
    badge: 'Награда за ежедневный вход',
    title: 'Поздравляем!',
    titleLead: 'Сегодня ',
    accent: (n) => `+${n} гол получен!`,
    subtitle: 'За каждый ежедневный вход на сайт начисляется +1 гол. Не прерывайте серию!',
    day: (n) => `${n}-день`,
    points: (n) => `+${n} гол`,
    streak: 'Текущая серия',
    streakValue: (n) => `${n} дн.`,
    week: 'Собрано за неделю',
    weekValue: (n) => `${n} гол.`,
    done: 'Продолжить',
    tomorrow: 'Возвращайтесь завтра — получите ещё +1 гол!',
    awarded: (n) => `+${n} гол начислен!`
  }
}

// Bitta so'rov: React StrictMode effektni ikki marta ishlatsa ham gol bir marta so'raladi
const claimRequests = {}
const claimOnce = (key) => {
  if (!claimRequests[key]) {
    claimRequests[key] = request.post(URLS.dailyRewardClaim).catch((err) => {
      delete claimRequests[key]
      throw err
    })
  }
  return claimRequests[key]
}

// Kun kartasining ko'rinishi: olingan — yashil, bugungi — ko'k ramka, yopiq — kulrang, 7-kun — oltin
const cardStyle = (day, isLast) => {
  if (day.state === 'claimed') {
    return {
      card: 'border-[#CDEFD6] bg-[#EEFAF1]',
      pill: 'bg-[#DDF5E3] text-[#16A34A]',
      label: 'text-[#0B1B3F]'
    }
  }
  if (isLast) {
    return {
      card: `bg-[#FFF8E7] ${day.state === 'today' ? 'border-2 border-[#F59E0B]' : 'border-[#FBE5B0]'} shadow-[0_14px_30px_-18px_rgba(245,158,11,0.7)]`,
      pill: 'bg-[#FDE7B4] text-[#D97706]',
      label: 'text-[#0B1B3F]'
    }
  }
  if (day.state === 'today') {
    return {
      card: 'border-2 border-[#1D6BFF] bg-white shadow-[0_18px_34px_-20px_rgba(29,107,255,0.75)]',
      pill: 'bg-[#E3EDFF] text-[#1D6BFF]',
      label: 'text-[#0B1B3F]'
    }
  }
  return {
    card: 'border-[#E8ECF3] bg-[#F7F9FC]',
    pill: 'bg-[#EEF1F6] text-[#64748B]',
    label: 'text-[#475569]'
  }
}

function DayIcon({ day, isLast }) {
  if (day.state === 'claimed') {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#22C55E] text-white sm:h-8 sm:w-8">
        <Check size={17} strokeWidth={3.2} />
      </span>
    )
  }
  if (isLast) return <Gift className="h-7 w-7 text-[#F59E0B] sm:h-8 sm:w-8" strokeWidth={2.2} />
  if (day.state === 'today') {
    return <span className="block h-7 w-7 rounded-full border-[3.5px] border-[#1D6BFF] bg-white sm:h-8 sm:w-8" />
  }
  return <Lock className="h-6 w-6 text-[#8A94A6] sm:h-7 sm:w-7" strokeWidth={2.2} />
}

function ProgressDot({ day }) {
  if (day.state === 'claimed') {
    return (
      <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#22C55E] text-white ring-4 ring-[#F3F7FF]">
        <Check size={14} strokeWidth={3.2} />
      </span>
    )
  }
  if (day.state === 'today') {
    return <span className="relative z-10 block h-6 w-6 rounded-full border-[3px] border-[#1D6BFF] bg-white ring-4 ring-[#F3F7FF]" />
  }
  return <span className="relative z-10 block h-[18px] w-[18px] rounded-full border-2 border-[#C5CDD9] bg-white ring-4 ring-[#F3F7FF]" />
}

/**
 * Kundalik kirish mukofoti oynasi. "Olish" tugmasi yo'q: o'quvchi saytga kirishi bilan bugungi gol
 * avtomatik qo'shiladi (har kuni +1 gol, ball emas), oyna ochiladi va zarlar sochiladi.
 * Bugun allaqachon olingan bo'lsa oyna chiqmaydi. Gol tarixi backendda (StudentPointLog).
 */
export default function DailyRewardModal() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const text = TEXTS[lang]
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [data, setData] = useState(null)
  const [awarded, setAwarded] = useState(0)
  const doneBtnRef = useRef(null)

  const userId = session?.id || session?.user?.id || 'user'
  const storageKey = `iq_daily_reward_${userId}`

  useEffect(() => {
    if (!session?.accessToken) return undefined
    try {
      if (sessionStorage.getItem(storageKey)) return undefined
    } catch {}

    let alive = true
    let cancel = () => {}
    // Kirish bilan bugungi gol qo'shiladi; backend takroriy so'rovda qayta qo'shmaydi (awarded = 0)
    claimOnce(storageKey)
      .then((res) => {
        const payload = res?.data
        if (!alive || !payload) return
        try {
          sessionStorage.setItem(storageKey, '1')
        } catch {}
        const gained = Number(payload.awarded) || 0
        if (gained <= 0) return
        setData(payload)
        setAwarded(gained)
        // Navbar'dagi jami gol yangilansin
        queryClient.invalidateQueries([KEYS.studentGol])
        cancel = requestModal(MODAL_ID, () => {
          if (alive) setOpen(true)
        })
      })
      .catch(() => {})

    return () => {
      alive = false
      cancel()
    }
  }, [session?.accessToken, storageKey, queryClient])

  const close = useCallback(() => {
    setOpen(false)
    releaseModal(MODAL_ID)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    const focusTimer = setTimeout(() => doneBtnRef.current?.focus(), 50)
    // Oyna ochilishi bilan zarlar sochiladi
    const confettiTimer = setTimeout(() => fireConfetti(), 250)
    return () => {
      document.removeEventListener('keydown', onKey)
      clearTimeout(focusTimer)
      clearTimeout(confettiTimer)
    }
  }, [open, close])

  if (!open || !data) return null

  const days = data.days || []
  // Progress chizig'i: oxirgi olingan yoki bugungi kungacha yashil
  const filledUntil = days.reduce((acc, day, index) => (day.state === 'claimed' ? index : acc), -1)
  const todayIndex = days.findIndex((day) => day.state === 'today')
  const solidUntil = Math.max(filledUntil, todayIndex)
  const segment = days.length > 1 ? 100 / days.length : 100

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-[#0B1B3F]/45 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={close}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="daily-reward-title"
        className="iq-reward-in relative max-h-[94dvh] w-full max-w-[1180px] overflow-y-auto overflow-x-hidden rounded-t-[28px] bg-gradient-to-br from-[#F7FAFF] via-white to-[#EEF4FF] px-5 pb-6 pt-6 shadow-[0_40px_90px_-30px_rgba(15,23,42,0.6)] sm:rounded-[36px] sm:px-10 sm:pb-10 sm:pt-10 lg:px-14"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="pointer-events-none absolute -right-20 -top-24 h-[340px] w-[480px] rounded-full bg-[#E3ECFF]/70 blur-3xl" />

        <button
          type="button"
          onClick={close}
          aria-label="close"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full text-[#64748B] transition hover:bg-[#EEF2F8] hover:text-[#0B1B3F] sm:right-7 sm:top-7 sm:h-12 sm:w-12"
        >
          <X size={30} strokeWidth={1.8} />
        </button>

        {/* Tepa: sarlavha va rasm */}
        <div className="relative grid grid-cols-1 items-center gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2.5 rounded-2xl bg-[#E6EEFF] px-4 py-2 text-[14px] font-semibold text-[#1D4ED8] sm:px-5 sm:py-2.5 sm:text-[17px]">
              <CalendarCheck className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
              {text.badge}
            </span>
            <h2
              id="daily-reward-title"
              className="mt-5 text-[28px] font-extrabold leading-[1.15] tracking-tight text-[#0B1B3F] sm:mt-7 sm:text-[38px] lg:text-[44px]"
            >
              {text.title}
              <br />
              {text.titleLead}
              <span className="text-[#1D6BFF]">{text.accent(awarded)}</span>
            </h2>
            <p className="mt-3 max-w-[500px] text-[15px] leading-relaxed text-[#475569] sm:mt-4 sm:text-[19px]">
              {text.subtitle}
            </p>
          </div>
          <div className="relative hidden justify-center md:flex">
            <img
              src={ILLUSTRATION}
              alt=""
              className="iq-reward-float w-full max-w-[520px] drop-shadow-[0_30px_40px_rgba(29,78,216,0.18)]"
            />
          </div>
        </div>

        {/* 7 kun: kartalar va progress chizig'i (telefonda yon tomonga suriladi) */}
        <div className="-mx-5 mt-6 overflow-x-auto px-5 pb-1 pt-3 sm:mx-0 sm:mt-8 sm:px-0">
          <div className="min-w-[620px]">
            <div className="grid grid-cols-7 gap-2.5 sm:gap-3.5">
              {days.map((day, index) => {
                const isLast = index === days.length - 1
                const style = cardStyle(day, isLast)
                const pointer = day.state === 'today' || (isLast && day.state !== 'claimed')
                return (
                  <div
                    key={day.day}
                    className={`relative flex flex-col items-center rounded-[20px] border px-1.5 pb-3 pt-3.5 transition sm:rounded-[22px] sm:pb-4 sm:pt-4 ${style.card} ${
                      day.day === data.today_day ? 'iq-reward-today ring-4 ring-[#22C55E]/25' : ''
                    }`}
                  >
                    <span className="flex h-8 items-center justify-center sm:h-9">
                      <DayIcon day={day} isLast={isLast} />
                    </span>
                    <span className={`mt-2 text-[15px] font-bold sm:mt-2.5 sm:text-[19px] ${style.label}`}>
                      {text.day(day.day)}
                    </span>
                    <span
                      className={`mt-2.5 rounded-full px-2.5 py-1 text-[13px] font-semibold sm:mt-3 sm:px-4 sm:py-1.5 sm:text-[17px] ${style.pill}`}
                    >
                      {text.points(day.gol)}
                    </span>
                    {pointer ? (
                      <span
                        className={`absolute left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 ${
                          isLast && day.state !== 'today'
                            ? '-bottom-[7px] border-b border-r border-[#FBE5B0] bg-[#FFF8E7]'
                            : `-bottom-[8px] border-b-2 border-r-2 ${isLast ? 'border-[#F59E0B] bg-[#FFF8E7]' : 'border-[#1D6BFF] bg-white'}`
                        }`}
                      />
                    ) : null}
                  </div>
                )
              })}
            </div>

            <div className="relative mt-5 grid grid-cols-7 gap-2.5 sm:gap-3.5">
              {/* Chiziq: yashil (olingan) → ko'k (bugungi) → punktir (qolganlari) */}
              <span
                className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#22C55E]"
                style={{ left: `${segment / 2}%`, width: `${Math.max(0, filledUntil) * segment}%` }}
              />
              {todayIndex > 0 ? (
                <span
                  className="absolute top-1/2 h-[3px] -translate-y-1/2 bg-gradient-to-r from-[#22C55E] to-[#1D6BFF]"
                  style={{ left: `${segment / 2 + (todayIndex - 1) * segment}%`, width: `${segment}%` }}
                />
              ) : null}
              <span
                className="absolute top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#CBD3DF]"
                style={{
                  left: `${segment / 2 + Math.max(0, solidUntil) * segment}%`,
                  right: `${segment / 2}%`
                }}
              />
              {days.map((day) => (
                <span key={day.day} className="flex justify-center">
                  <ProgressDot day={day} />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pastki qism: statistika va tugma */}
        <div className="mt-6 grid grid-cols-1 items-center gap-4 sm:mt-9 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10">
          <div className="grid grid-cols-2 items-center rounded-[24px] bg-[#EAF1FC] px-4 py-4 sm:px-8 sm:py-6">
            <div className="flex min-w-0 items-center gap-3 sm:gap-5">
              <span className="text-[30px] leading-none sm:text-[44px]" aria-hidden>
                ⚽
              </span>
              <span className="min-w-0">
                <span className="block text-[12.5px] text-[#334155] sm:text-[16px]">{text.streak}</span>
                <span className="mt-0.5 block text-[22px] font-extrabold text-[#1D4ED8] sm:text-[34px]">
                  {text.streakValue(data.streak || 0)}
                </span>
              </span>
            </div>
            <div className="flex min-w-0 items-center gap-3 border-l border-[#CBD8EE] pl-4 sm:gap-5 sm:pl-10">
              <span className="text-[30px] leading-none sm:text-[44px]" aria-hidden>
                ⭐
              </span>
              <span className="min-w-0">
                <span className="block text-[12.5px] text-[#334155] sm:text-[16px]">{text.week}</span>
                <span
                  key={data.week_total}
                  className={`mt-0.5 block text-[22px] font-extrabold text-[#1D4ED8] sm:text-[34px] ${awarded ? 'iq-reward-pop' : ''}`}
                >
                  {text.weekValue(data.week_total || 0)}
                </span>
              </span>
            </div>
          </div>

          <div className="relative flex flex-col items-stretch">
            {awarded ? (
              <span className="iq-reward-gain pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FFF3D6] px-4 py-1.5 text-[16px] font-extrabold text-[#D97706] shadow-[0_10px_24px_-12px_rgba(217,119,6,0.7)]">
                {text.awarded(awarded)}
              </span>
            ) : null}
            <button
              ref={doneBtnRef}
              type="button"
              onClick={close}
              className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#22C55E] px-5 text-[17px] font-bold text-white shadow-[0_16px_30px_-14px_rgba(34,197,94,0.9)] transition hover:bg-[#16A34A] active:scale-[0.98] sm:h-[72px] sm:text-[21px]"
            >
              {text.done}
              <ArrowRight size={24} />
            </button>
            <p className="mt-2 text-center text-[14px] text-[#64748B]">{text.tomorrow}</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes iq-reward-in {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes iq-reward-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes iq-reward-pulse {
          0%,
          100% {
            box-shadow: 0 18px 34px -20px rgba(29, 107, 255, 0.75), 0 0 0 0 rgba(29, 107, 255, 0.35);
          }
          50% {
            box-shadow: 0 18px 34px -20px rgba(29, 107, 255, 0.75), 0 0 0 8px rgba(29, 107, 255, 0);
          }
        }
        @keyframes iq-reward-pop {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          60% {
            transform: scale(1.18);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes iq-reward-gain {
          0% {
            transform: translate(-50%, 16px) scale(0.8);
            opacity: 0;
          }
          20% {
            transform: translate(-50%, 0) scale(1.05);
            opacity: 1;
          }
          80% {
            transform: translate(-50%, -6px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -18px) scale(1);
            opacity: 0;
          }
        }
        .iq-reward-in {
          animation: iq-reward-in 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .iq-reward-float {
          animation: iq-reward-float 4s ease-in-out infinite;
        }
        .iq-reward-today {
          animation: iq-reward-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
        }
        .iq-reward-pop {
          display: inline-block;
          animation: iq-reward-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .iq-reward-gain {
          animation: iq-reward-gain 2.6s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .iq-reward-in,
          .iq-reward-float,
          .iq-reward-today,
          .iq-reward-pop,
          .iq-reward-gain {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
