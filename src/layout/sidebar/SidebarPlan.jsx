import { Button } from '@heroui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

function SidebarPlan() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="border-t px-[24px] py-[24px] !text-white">
      <div
        className=" p-[16px] rounded-[16px] bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(/images/bg-img.png)` }}
      >
        <h3 className="text-[13px] font-medium">{t('tariffPlan')}</h3>

        <p className="text-[24px] font-semibold my-[12px]">499,000 {t('sum')}</p>

        <p className="text-[15px] font-medium">
          {t('nextCharge')} <br /> 21.06.2025
          {/* 21 {t('mart')} */}
        </p>

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
