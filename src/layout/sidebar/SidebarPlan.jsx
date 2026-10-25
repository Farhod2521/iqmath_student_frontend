import { getPaymentTrailDays } from '@/services/controllers'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Gem } from 'lucide-react'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import { usePricingModalStore } from '@/store'
import { RolesList } from '../libs/menulist'

function SidebarPlan() {
  const { t } = useTranslation()
  const { role: currentRole } = useRoleDetection()

  const [data, setData] = useState({ days_until_next_payment: 0, end_date: '', is_paid: false, payment_amount: 0 })
  // Ma'lumot kelguncha "Muddati tugagan" ko'rsatilmaydi — yuklanish holati turadi
  const [loaded, setLoaded] = useState(false)
  const { openPricingModal } = usePricingModalStore()

  const handleInitiatePayment = () => {
    openPricingModal(data.payment_amount)
  }

  // Login qilingan zahoti rol hali aniqlanmagan bo'ladi — shuning uchun rol aniqlanganda qayta so'raladi
  useEffect(() => {
    if (currentRole !== RolesList.STUDENT) return undefined
    let alive = true
    setLoaded(false)
    getPaymentTrailDays()
      .then((res) => {
        if (alive) setData((prev) => ({ ...prev, ...res?.data }))
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setLoaded(true)
      })
    return () => {
      alive = false
    }
  }, [currentRole])

  if (currentRole !== RolesList.STUDENT) {
    return <></>
  }

  if (!loaded) {
    return (
      <div className="border-t px-[24px] py-[24px]">
        <div className="h-[130px] animate-pulse rounded-[16px] bg-gradient-to-r from-[#E9E7FF] to-[#DCD9FF]" />
      </div>
    )
  }

  const isActive = data.is_paid || data.days_until_next_payment > 0

  return (
    <div className="border-t px-[24px] py-[24px]">
      <div className="relative overflow-hidden rounded-[16px] bg-[#0E2A6B] p-[16px] text-white">
        {/* Samarqand — Registon manzarasi */}
        <div
          className="absolute inset-0 bg-cover bg-[65%_center] bg-no-repeat"
          style={{ backgroundImage: `url(/images/homepage/samarkand-card.webp)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F5C]/95 via-[#0E2A6B]/70 to-[#0E2A6B]/10" />

        <div className="relative flex items-center gap-1.5 text-[13px] font-bold tracking-wide">
          <Gem size={14} />
          {t('premiumLabel')}
        </div>

        <p className="relative mt-2 text-[13px] font-medium text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.35)]">
          {isActive ? t('premiumActive') : t('premiumExpired')}
          {data.days_until_next_payment > 0 && <> • {t('premiumDaysLeft', { day: data.days_until_next_payment })}</>}
        </p>

        {data.end_date && (
          <p className="relative text-[13px] text-white/80 [text-shadow:0_1px_4px_rgba(0,0,0,0.35)]">{t('premiumUntil', { date: data.end_date })}</p>
        )}

        <button
          // Faol obunada ham "Uzaytirish" tarif tanlash oynasini ochadi (yangi muddat joriy muddatga qo'shiladi)
          onClick={handleInitiatePayment}
          className="relative mt-4 flex w-1/2 items-center justify-center gap-1.5 rounded-[10px] bg-white/95 py-2 text-[12px] font-semibold text-[#1D4ED8] transition hover:bg-white"
        >
          {isActive ? t('extendPlan') : t('makePayment')}
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}

export default SidebarPlan
