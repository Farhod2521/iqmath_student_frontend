import { request } from '@/services/api'
import { Button } from '@heroui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function SidebarPlan() {
  const { t } = useTranslation()
  const router = useRouter()

  const [data, setData] = useState({ days_until_next_payment: 0, end_date: '', is_paid: false, payment_amount: 0 })

  useEffect(() => {
    request.get('/api/v1/payments/subscription/trial_days/').then((res) => {
      setData((prev) => ({ ...prev, ...res.data }))
    })
  }, [])

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
        <p className="text-[15px] font-medium">
          {t('nextCharge')} <br /> {data.end_date}
        </p>
        {data.is_paid ? (
          <p className="text-[15px] font-medium my-[12px]">
            {t('daysTrialPayment', { day: data.days_until_next_payment })}
          </p>
        ) : (
          <p className="text-[15px] font-medium my-[12px]">
            {t('daysNextPayment', { day: data.days_until_next_payment })}
          </p>
        )}

        <Button
          onClick={() => router.push('/dashboard/student/subjects')}
          variant="bordered"
          className="border border-[#D1D1D6] rounded-[8px] text-[15px] py-[9px] w-full mt-[24px]"
        >
          {t('subjects')}
        </Button>
      </div>
    </div>
  )
}

export default SidebarPlan
