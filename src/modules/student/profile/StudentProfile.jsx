import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@heroui/react'
import ProfileInfoTab from './tabs/ProfileInfoTab'
import FinesTab from './tabs/FinesTab'
import CoinsTab from './tabs/CoinsTab'
import CoinsHistoryTab from './tabs/CoinsHistoryTab'
import TransferTab from './tabs/TransferTab'
import ReferralTab from './tabs/ReferralTab'
import CouponsTab from './tabs/CouponsTab'

const StudentProfile = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = useMemo(
    () => [
      { key: 'profile', label: t('myProfile'), Component: ProfileInfoTab },
      { key: 'fines', label: t('Jarimalarim'), Component: FinesTab },
      { key: 'coins', label: t('points'), Component: CoinsTab },
      { key: 'coinsHistory', label: t('pointsHistory'), Component: CoinsHistoryTab },
      { key: 'transfer', label: t('transferMoney'), Component: TransferTab },
      { key: 'referral', label: t('via_link'), Component: ReferralTab },
      { key: 'coupons', label: t('coupons'), Component: CouponsTab }
    ],
    [t]
  )

  const ActiveComponent = tabs.find((tab) => tab.key === activeTab)?.Component

  return (
    <Card className="rounded-[12px] w-full overflow-hidden shadow-sm">
      <div className="border-b border-[#E9E9E9] flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-[13px] whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.key
                ? 'text-[#5D87FF] border-[#5D87FF] font-bold'
                : 'text-[#8A8A8E] border-transparent hover:text-[#191C1D] hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">{ActiveComponent && <ActiveComponent />}</div>
    </Card>
  )
}

export default StudentProfile
