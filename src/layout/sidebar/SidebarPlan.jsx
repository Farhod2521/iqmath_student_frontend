import { getPaymentTrailDays } from '@/services/controllers'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Gem } from 'lucide-react'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import { usePricingModalStore } from '@/store'
import { RolesList } from '../libs/menulist'

function SidebarPlan() {
  const { t } = useTranslation()
  const { role: currentRole } = useRoleDetection()
  const router = useRouter()

  const [data, setData] = useState({ days_until_next_payment: 0, end_date: '', is_paid: false, payment_amount: 0 })
  const { openPricingModal } = usePricingModalStore()

  const handleInitiatePayment = () => {
    openPricingModal(data.payment_amount)
  }

  useEffect(() => {
    if (currentRole !== RolesList.STUDENT) return
    getPaymentTrailDays()
      .then((res) => {
        setData((prev) => ({ ...prev, ...res?.data }))
      })
      .catch((error) => {})
  }, [])

  if (currentRole !== RolesList.STUDENT) {
    return <></>
  }

  const isActive = data.is_paid || data.days_until_next_payment > 0

  return (
    <div className="border-t px-[24px] py-[24px]">
      <div
        className="rounded-[16px] bg-cover bg-right bg-no-repeat p-[16px] text-white"
        style={{ backgroundImage: `url(/images/homepage/tolovbacground.png)` }}
      >
        <div className="flex items-center gap-1.5 text-[13px] font-bold tracking-wide">
          <Gem size={14} />
          {t('premiumLabel')}
        </div>

        <p className="mt-2 text-[13px] font-medium text-white/85">
          {isActive ? t('premiumActive') : t('premiumExpired')}
          {data.days_until_next_payment > 0 && <> • {t('premiumDaysLeft', { day: data.days_until_next_payment })}</>}
        </p>

        {data.end_date && <p className="text-[13px] text-white/70">{t('premiumUntil', { date: data.end_date })}</p>}

        <button
          onClick={isActive ? () => router.push('/dashboard/student/subjects') : handleInitiatePayment}
          className="mt-4 flex w-1/2 items-center justify-center gap-1.5 rounded-[10px] bg-white/95 py-2 text-[12px] font-semibold text-[#5453f4] transition hover:bg-white"
        >
          {isActive ? t('extendPlan') : t('makePayment')}
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}

export default SidebarPlan
