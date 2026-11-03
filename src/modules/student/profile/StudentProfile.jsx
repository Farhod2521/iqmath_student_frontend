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
import DevicesTab from './tabs/DevicesTab'
import PaymentsTab from './tabs/PaymentsTab'

const TEXT = {
  uz: {
    profile: 'Profil',
    payments: 'To‘lovlar',
    points: 'Ballar',
    friends: 'Do‘stlar',
    history: 'Tarix',
    fines: 'Jarimalar',
    transfer: 'So‘m o‘tkazish',
    finesHint: 'O‘qituvchi qoidabuzarlik uchun qo‘ygan jarimalar: kim, qachon va nima uchun qo‘ygani.',
    transferHint: 'Platformadagi o‘yin so‘mlarini do‘stingizga o‘tkazish. Bu haqiqiy pul emas.'
  },
  ru: {
    profile: 'Профиль',
    payments: 'Платежи',
    points: 'Баллы',
    friends: 'Друзья',
    history: 'История',
    fines: 'Штрафы',
    transfer: 'Перевод сумов',
    finesHint: 'Штрафы, которые поставил учитель за нарушения: кто, когда и за что.',
    transferHint: 'Перевод игровых сумов платформы другу. Это не настоящие деньги.'
  }
}

/**
 * K9: 9 ta vkladka sig'masdi va kesilardi — endi 4 ta guruh, har birining ichida kichik bo'limlar.
 * G8: "Jarimalar" va "So'm o'tkazish" — nima ekani qisqa izoh bilan.
 */
const StudentProfile = () => {
  const { t, i18n } = useTranslation()
  const text = TEXT[i18n.language === 'ru' ? 'ru' : 'uz']
  const [activeGroup, setActiveGroup] = useState('profile')
  const [activeTabs, setActiveTabs] = useState({})

  const groups = useMemo(
    () => [
      {
        key: 'profile',
        label: text.profile,
        tabs: [
          { key: 'profile', label: t('myProfile'), Component: ProfileInfoTab },
          { key: 'devices', label: t('devices.tab'), Component: DevicesTab }
        ]
      },
      {
        key: 'payments',
        label: text.payments,
        tabs: [
          { key: 'payments', label: t('myPayments'), Component: PaymentsTab },
          { key: 'coupons', label: t('coupons'), Component: CouponsTab }
        ]
      },
      {
        key: 'points',
        label: text.points,
        tabs: [
          { key: 'coins', label: t('points'), Component: CoinsTab },
          { key: 'coinsHistory', label: text.history, Component: CoinsHistoryTab },
          { key: 'fines', label: text.fines, Component: FinesTab, hint: text.finesHint }
        ]
      },
      {
        key: 'friends',
        label: text.friends,
        tabs: [
          { key: 'referral', label: t('via_link'), Component: ReferralTab },
          { key: 'transfer', label: text.transfer, Component: TransferTab, hint: text.transferHint }
        ]
      }
    ],
    [t, text]
  )

  const group = groups.find((item) => item.key === activeGroup) || groups[0]
  const tab = group.tabs.find((item) => item.key === activeTabs[group.key]) || group.tabs[0]
  const ActiveComponent = tab.Component

  return (
    <Card className="rounded-[12px] w-full overflow-hidden shadow-sm">
      <div className="no-scrollbar border-b border-[#E9E9E9] flex overflow-x-auto">
        {groups.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveGroup(item.key)}
            className={`flex-1 shrink-0 px-3 sm:px-4 py-2.5 text-[13px] sm:text-sm whitespace-nowrap transition-colors border-b-2 ${
              group.key === item.key
                ? 'text-[#5D87FF] border-[#5D87FF] font-bold'
                : 'text-[#8A8A8E] border-transparent hover:text-[#191C1D] hover:bg-gray-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="p-3 sm:p-4">
        {/* Guruh ichidagi bo'limlar */}
        <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto">
          {group.tabs.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTabs((prev) => ({ ...prev, [group.key]: item.key }))}
              className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                tab.key === item.key ? 'bg-[#5D87FF] text-white' : 'bg-[#F1F4F9] text-[#475569] hover:bg-[#E6EBF5]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        {tab.hint ? <p className="mb-3 rounded-lg bg-[#F4F7FE] px-3 py-2 text-[13px] text-[#475569]">{tab.hint}</p> : null}
        <ActiveComponent />
      </div>
    </Card>
  )
}

export default StudentProfile
