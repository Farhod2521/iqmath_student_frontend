import React from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, CalendarDays, Crown, Sparkles, Zap } from 'lucide-react'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import { useMyTariff } from '@/hooks'
import { usePricingModalStore } from '@/store'
import { RolesList } from '../libs/menulist'

/** "Start Pro" → ["Start", true]; "Start" → ["Start", false] */
function splitPro(name) {
  const m = /^(.*?)\s*pro\s*$/i.exec(name || '')
  return m && m[1] ? [m[1], true] : [name, false]
}

// Ikki ko'rinish: Start — och moviy, Start Pro — to'q ko'k (toj bilan)
const THEMES = {
  start: {
    card: 'bg-gradient-to-br from-[#F3F8FF] to-[#DCEBFF] text-[#0A1A4A] ring-1 ring-[#CFE2FB]',
    overlay: 'from-[#F3F8FF] via-[#EEF5FF]/85 to-transparent',
    iconBox: 'bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white shadow-[0_6px_14px_rgba(37,99,235,0.35)]',
    pill: 'border border-[#BBD7FF] bg-[#E3EEFF] text-[#1D4ED8]',
    calBox: 'border border-[#C9DCF5] bg-white/70 text-[#1E3A6E]',
    divider: 'bg-[#C9DCF5]',
    status: 'text-[#334155]',
    days: 'bg-[#DCEBFF] text-[#0B3B9E]',
    date: 'text-[#475569]',
    button: 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-[0_6px_16px_rgba(37,99,235,0.35)] hover:brightness-110',
    arrow: 'bg-white text-[#1D4ED8]'
  },
  pro: {
    card: 'bg-gradient-to-br from-[#0B1F5C] via-[#123A9C] to-[#1E56C8] text-white',
    overlay: 'from-[#0B1F5C] via-[#0E2A6B]/80 to-transparent',
    iconBox: 'border border-white/20 bg-white/10 text-[#FACC15] backdrop-blur-sm',
    pill: 'bg-gradient-to-br from-[#E0F2FE] to-[#7DD3FC] text-[#0B1F5C] shadow-[0_2px_8px_rgba(125,211,252,0.45)]',
    calBox: 'border border-white/20 bg-white/10 text-white',
    divider: 'bg-white/25',
    status: 'text-white/90',
    days: 'bg-white/15 text-white ring-1 ring-white/20',
    date: 'text-white/80',
    button: 'bg-white text-[#1E3A8A] shadow-[0_6px_16px_rgba(0,0,0,0.2)] hover:bg-[#F1F6FF]',
    arrow: 'bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white'
  }
}

function SidebarPlan() {
  const { t } = useTranslation()
  const { role: currentRole } = useRoleDetection()
  const isStudent = currentRole === RolesList.STUDENT
  const { loaded, isActive, isTrial, tariff, tariffName, daysLeft, endDate, paymentAmount } = useMyTariff(isStudent)
  const { openPricingModal } = usePricingModalStore()

  if (!isStudent) {
    return <></>
  }

  // Ma'lumot kelguncha "Muddati tugagan" ko'rsatilmaydi — yuklanish holati turadi
  if (!loaded) {
    return (
      <div className="border-t px-[24px] py-[24px]">
        <div className="h-[150px] animate-pulse rounded-[18px] bg-gradient-to-r from-[#E9F1FF] to-[#D9E7FF]" />
      </div>
    )
  }

  const [baseName, nameHasPro] = splitPro(tariffName)
  const pro = !!tariff?.is_pro || nameHasPro
  const th = THEMES[pro ? 'pro' : 'start']
  const title = isTrial ? t('tariffTrial') : baseName || tariffName

  return (
    <div className="border-t px-[24px] py-[24px]">
      <div className={`relative overflow-hidden rounded-[18px] p-[14px] ${th.card}`}>
        {/* Samarqand — Registon manzarasi (o'ng tomonda) */}
        <div
          className="absolute inset-y-0 right-0 w-[70%] bg-cover bg-[70%_center] bg-no-repeat"
          style={{ backgroundImage: `url(/images/homepage/samarkand-card.webp)` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${th.overlay}`} />

        {/* Tarif nomi */}
        <div className="relative flex items-center gap-2.5">
          <div className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] ${th.iconBox}`}>
            {pro ? <Crown size={18} fill="currentColor" /> : <Zap size={18} fill="currentColor" />}
          </div>
          <div className="relative flex min-w-0 items-center gap-1.5">
            <span className="truncate text-[20px] font-extrabold italic leading-none tracking-tight">{title}</span>
            {pro ? (
              <span className={`relative rounded-[8px] px-1.5 py-1 text-[15px] font-extrabold italic leading-none ${th.pill}`}>
                Pro
                <Sparkles size={11} className="absolute -right-2.5 -top-2 text-[#FACC15]" fill="currentColor" />
              </span>
            ) : (
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold italic ${th.pill}`}>{t('tariffPill')}</span>
            )}
          </div>
        </div>

        {/* Holat va muddat */}
        <div className="relative mt-3 flex items-center gap-2.5">
          <div className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] ${th.calBox}`}>
            <CalendarDays size={17} />
          </div>
          <div className={`h-[30px] w-px shrink-0 ${th.divider}`} />
          <div className="min-w-0 [text-shadow:0_1px_3px_rgba(0,0,0,0.12)]">
            <p className={`flex flex-wrap items-center gap-1 text-[12px] font-medium ${th.status}`}>
              {isActive ? t('premiumActive') : t('premiumExpired')}
              {daysLeft > 0 && (
                <>
                  <span>•</span>
                  <span className={`rounded-full px-2 py-[1px] text-[11px] font-bold ${th.days}`}>
                    {t('premiumDaysLeft', { day: daysLeft })}
                  </span>
                </>
              )}
            </p>
            {endDate && <p className={`mt-0.5 text-[12px] ${th.date}`}>{t('premiumUntil', { date: endDate })}</p>}
          </div>
        </div>

        <button
          // Faol obunada ham "Uzaytirish" tarif tanlash oynasini ochadi (yangi muddat joriy muddatga qo'shiladi)
          onClick={() => openPricingModal(paymentAmount)}
          className={`relative mt-3.5 flex w-[78%] items-center justify-between rounded-full py-1.5 pl-4 pr-1.5 text-[13px] font-bold transition ${th.button}`}
        >
          {isActive ? t('extendPlan') : t('makePayment')}
          <span className={`flex h-[26px] w-[26px] items-center justify-center rounded-full ${th.arrow}`}>
            <ArrowRight size={14} />
          </span>
        </button>
      </div>
    </div>
  )
}

export default SidebarPlan
