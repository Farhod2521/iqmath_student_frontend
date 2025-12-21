import { request } from '@/services/api'
import { getPaymentInitiate, getPaymentTrailDays } from '@/services/controllers'
import { Button } from '@heroui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import { useCouponStore, usePricingModalStore } from '@/store'
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

  return (
    <div className="border-t px-[24px] py-[24px] !text-white">
      <div
        className=" p-[16px] rounded-[16px] bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(/images/bg-img.png)` }}
      >
        <h3 className="text-[13px] font-medium">{t('tariffPlan')}</h3>
        <p className="text-[24px] font-semibold my-[12px]">
          {data.payment_amount} {t('sum')}
        </p>
        {data.current_plan?.plan_name && (
          <p className="text-[15px] font-medium pb-[12px]">
            {t('paymentType')} 1 oylik {data.current_plan?.plan_name}
          </p>
        )}
        {data.is_paid || data.days_until_next_payment > 0 ? (
          <p className="text-[15px] font-medium">
            {t('nextCharge')} {data.end_date}
          </p>
        ) : null}
        {data.is_paid ? (
          <p className="text-[15px] font-medium my-[12px]">
            {t('daysTrialPayment', { day: data.days_until_next_payment })}
          </p>
        ) : (
          <p className="text-[15px] font-medium my-[12px]">
            {!data.days_until_next_payment
              ? t('makeToPayment')
              : t('daysNextPayment', { day: data.days_until_next_payment })}
          </p>
        )}

        {!data.is_paid ? (
          <Button
            onPress={handleInitiatePayment}
            variant="bordered"
            className="border border-[#D1D1D6] rounded-[8px] text-[15px] py-[9px] w-full mt-[24px]"
          >
            {t('payment')}
          </Button>
        ) : (
          <Button
            onPress={() => router.push('/dashboard/student/subjects')}
            variant="bordered"
            className="border border-[#D1D1D6] rounded-[8px] text-[15px] py-[9px] w-full mt-[24px]"
          >
            {t('subjects')}
          </Button>
        )}
      </div>
    </div>
  )
}

export default SidebarPlan
