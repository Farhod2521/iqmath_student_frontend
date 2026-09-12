import { useTranslation } from 'react-i18next'
import { Users, Users2, Activity, Award, BookOpen, ArrowUp } from 'lucide-react'

const Tile = ({ icon, iconBg, value, title, sub, subColor }) => (
  <div className="rounded-2xl border border-[#F0F0F0] bg-white p-3 shadow-sm sm:p-4">
    <div className="flex items-center gap-2.5">
      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-[#5A6A85]">{title}</p>
        <p className="text-xl font-extrabold text-[#191C1D]">{value}</p>
      </div>
    </div>
    {sub ? <p className={`mt-1.5 text-[11px] font-semibold ${subColor || 'text-[#8A8A8E]'}`}>{sub}</p> : null}
  </div>
)

const Growth = ({ children }) => (
  <span className="inline-flex items-center gap-1">
    <ArrowUp size={11} />
    {children}
  </span>
)

const TutorStatsGrid = ({ overview, isLoading }) => {
  const { t } = useTranslation()

  const students = overview?.students || {}
  const groups = overview?.groups || {}
  const topics = overview?.topics || {}
  const averageResult = overview?.average_result || {}

  const totalStudents = students.total || 0
  const activePercent = totalStudents
    ? Math.round(((students.active_in_period || 0) / totalStudents) * 100)
    : 0

  const tiles = [
    {
      key: 'total',
      icon: <Users size={26} className="text-[#205FFE]" />,
      iconBg: 'bg-[#D7E6FE]',
      value: totalStudents,
      title: t('tutorHome.statTotalStudents'),
      sub: <Growth>{t('tutorHome.statTotalStudentsSub', { count: students.new_in_period || 0 })}</Growth>,
      subColor: 'text-emerald-500'
    },
    {
      key: 'groups',
      icon: <Users2 size={26} className="text-[#7626FB]" />,
      iconBg: 'bg-[#E3D7FE]',
      value: groups.total || 0,
      title: t('tutorHome.statGroups'),
      sub: <Growth>{t('tutorHome.statGroupsSub', { count: groups.new_in_period || 0 })}</Growth>,
      subColor: 'text-emerald-500'
    },
    {
      key: 'active',
      icon: <Activity size={26} className="text-[#0D875E]" />,
      iconBg: 'bg-[#E7F8EF]',
      value: students.active_in_period || 0,
      title: t('tutorHome.statActiveStudents'),
      sub: t('tutorHome.statActiveStudentsSub', { percent: activePercent })
    },
    {
      key: 'average',
      icon: <Award size={26} className="text-[#F59E0B]" />,
      iconBg: 'bg-[#FFF3DD]',
      value: `${Math.round(averageResult.overall_percent || 0)}%`,
      title: t('tutorHome.statAverageResult'),
      sub: <Growth>{t('tutorHome.statAverageResultSub', { percent: Math.round(averageResult.growth || 0) })}</Growth>,
      subColor: 'text-emerald-500'
    },
    {
      key: 'topics',
      icon: <BookOpen size={26} className="text-[#5D87FF]" />,
      iconBg: 'bg-[#EAF0FF]',
      value: topics.completed_in_period || 0,
      title: t('tutorHome.statCompletedTopics'),
      sub: <Growth>{t('tutorHome.statCompletedTopicsSub', { count: topics.growth || 0 })}</Growth>,
      subColor: 'text-emerald-500'
    }
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} className="h-28 animate-pulse rounded-2xl bg-gray-100" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
      {tiles.map((tile) => (
        <Tile key={tile.key} {...tile} />
      ))}
    </div>
  )
}

export default TutorStatsGrid
