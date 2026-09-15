import { useTranslation } from 'react-i18next'
import { Users, BookOpen, CalendarClock, Clock } from 'lucide-react'

const Tile = ({ icon, iconBg, value, title, sub }) => (
  <div className="rounded-2xl border border-[#F0F0F0] bg-white p-3 shadow-sm sm:p-4">
    <div className="flex items-center gap-3">
      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-[#5A6A85]">{title}</p>
        <p className="truncate text-xl font-extrabold text-[#191C1D]">{value}</p>
      </div>
    </div>
    {sub ? <p className="mt-1.5 truncate text-[11px] font-semibold text-[#8A8A8E]">{sub}</p> : null}
  </div>
)

const ParentStatsGrid = ({ childrenCount, activeSubjectsCount, activeSubjectsLabel, remainingDays, lastLoginText }) => {
  const { t } = useTranslation()

  const tiles = [
    {
      key: 'children',
      icon: <Users size={26} className="text-[#205FFE]" />,
      iconBg: 'bg-[#D7E6FE]',
      value: childrenCount,
      title: t('parentHome.statChildren'),
      sub: t('parentHome.statChildrenSub')
    },
    {
      key: 'subjects',
      icon: <BookOpen size={26} className="text-[#0D875E]" />,
      iconBg: 'bg-[#DAF5E8]',
      value: activeSubjectsCount,
      title: t('parentHome.statActiveSubjects'),
      sub: activeSubjectsLabel || '—'
    },
    {
      key: 'streak',
      icon: <CalendarClock size={26} className="text-[#F59E0B]" />,
      iconBg: 'bg-[#FFF3DD]',
      value: remainingDays != null ? `${remainingDays} ${t('parentHome.daysUnit')}` : '—',
      title: t('parentHome.statSubscription'),
      sub: t('parentHome.statSubscriptionSub')
    },
    {
      key: 'lastLogin',
      icon: <Clock size={26} className="text-[#7626FB]" />,
      iconBg: 'bg-[#E3D7FE]',
      value: lastLoginText || '—',
      title: t('parentHome.statLastLogin')
    }
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {tiles.map((tile) => (
        <Tile key={tile.key} {...tile} />
      ))}
    </div>
  )
}

export default ParentStatsGrid
