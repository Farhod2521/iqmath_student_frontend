import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Award, BookOpen, CreditCard, House, MonitorSmartphone, Network } from 'lucide-react'
import { useGetQuery } from '@/hooks'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'
import StudentDetails from '@/modules/teacher/students/page/StudentDetails'
import { CardHeader, EmptyNote, card } from '@/modules/parent/home/dashboard/shared'
import { Radar } from '@/modules/parent/home/dashboard/MiddleRow'
import { AchievementsCard, ActivityChart } from '@/modules/parent/home/dashboard/BottomRow'
import ChildHero from './ChildHero'
import PaymentsTab from './PaymentsTab'
import DevicesTab from './DevicesTab'
import ExtendSubscriptionModal from './ExtendSubscriptionModal'
import { ChildRecent, ChildStats, DevicesCard, SubjectResults, SubscriptionCard } from './Sections'

const TABS = [
  { key: 'overview', Icon: House },
  { key: 'subjects', Icon: BookOpen },
  { key: 'payments', Icon: CreditCard },
  { key: 'devices', Icon: MonitorSmartphone },
  { key: 'achievements', Icon: Award }
]

const ChaptersCard = ({ items = [] }) => {
  const { t, i18n } = useTranslation()
  return (
    <div className={`${card} h-full p-4 sm:p-5`}>
      <CardHeader icon={Network} title={t('childPage.chapters')} />
      {items.length >= 3 ? (
        <Radar items={items} lang={i18n.language} />
      ) : items.length ? (
        <div className="space-y-4 pt-2">
          {items.map((item) => (
            <div key={item.name_uz}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="truncate text-[#334155]">
                  {i18n.language === 'ru' ? item.name_ru || item.name_uz : item.name_uz}
                </span>
                <span className="font-bold text-[#2563EB]">{item.percent}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#EDF1F8]">
                <div className="h-full rounded-full bg-[#2563EB]" style={{ width: `${item.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyNote>{t('childPage.noData')}</EmptyNote>
      )}
    </div>
  )
}

/** Ota-ona: farzand sahifasi (dashboard/parent/my-children/[id]) */
const ChildOverview = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const [tab, setTab] = useState('overview')
  const [extendOpen, setExtendOpen] = useState(false)

  const {
    data: response,
    isLoading,
    isError
  } = useGetQuery({
    key: [KEYS.parentChildOverview, id],
    url: `${URLS.parentChildOverview}${id}/overview/`,
    enabled: !!id,
    refetchOnMount: true
  })
  const data = response?.data

  if (isLoading && !data) {
    return (
      <div className="space-y-4">
        <div className="h-[260px] animate-pulse rounded-3xl bg-[#EAF1FF]" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      </div>
    )
  }

  // Yangi API ishlamasa (masalan, backend hali yangilanmagan) — eski batafsil statistika
  if (isError) return <StudentDetails />
  if (!data) return null

  return (
    <div className="space-y-4 pb-4">
      <ChildHero
        profile={data.profile}
        subscription={data.subscription}
        onDetails={() => setTab('payments')}
        onExtend={() => setExtendOpen(true)}
        tabLabel={tab === 'overview' ? '' : t(`childPage.tabs.${tab}`)}
      />

      {/* Tablar */}
      <div className="flex gap-1 overflow-x-auto border-b border-[#E5EAF2] [scrollbar-width:none] dark:border-[#26324A]">
        {TABS.map(({ key, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`-mb-px inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${
              tab === key ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Icon size={17} />
            {t(`childPage.tabs.${key}`)}
          </button>
        ))}
      </div>

      {tab === 'overview' ? (
        <>
          <ChildStats stats={data.stats} />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <SubjectResults items={data.subjects} limit={3} onViewAll={() => setTab('subjects')} />
            <ChaptersCard items={data.chapters} />
            <ChildRecent items={data.recent} limit={5} />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <ActivityChart days={data.activity_days} />
            <SubscriptionCard
              subscription={data.subscription}
              payments={data.payments}
              onViewAll={() => setTab('payments')}
            />
            <DevicesCard items={data.devices.slice(0, 4)} onViewAll={() => setTab('devices')} />
          </div>
        </>
      ) : null}

      {tab === 'subjects' ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <SubjectResults items={data.subjects} />
          <ChaptersCard items={data.chapters} />
        </div>
      ) : null}

      {tab === 'payments' ? <PaymentsTab childId={id} onExtend={() => setExtendOpen(true)} /> : null}

      {tab === 'devices' ? <DevicesTab childId={id} devices={data.devices} /> : null}

      {tab === 'achievements' ? (
        <div className="max-w-3xl">
          <AchievementsCard items={data.achievements} child={data.profile} />
        </div>
      ) : null}
      <ExtendSubscriptionModal open={extendOpen} onClose={() => setExtendOpen(false)} childId={id} />
    </div>
  )
}

export default ChildOverview
