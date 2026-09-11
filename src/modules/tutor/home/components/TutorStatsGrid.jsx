import { useTranslation } from 'react-i18next'
import { Users, Users2, Activity, Award, BookOpen, ArrowUp } from 'lucide-react'

const Tile = ({ icon, iconBg, iconColor, value, title, sub, subColor }) => (
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

const TutorStatsGrid = ({ totalStudents, stats }) => {
  const { t } = useTranslation()

  const tiles = [
    {
      key: 'total',
      icon: <Users size={26} className="text-[#205FFE]" />,
      iconBg: 'bg-[#D7E6FE]',
      value: totalStudents,
      title: t('tutorHome.statTotalStudents'),
      sub: (
        <span className="inline-flex items-center gap-1">
          <ArrowUp size={11} />
          {t('tutorHome.statTotalStudentsSub', { count: stats.groups_new_this_month || 0 })}
        </span>
      ),
      subColor: 'text-emerald-500'
    },
    {
      key: 'groups',
      icon: <Users2 size={26} className="text-[#7626FB]" />,
      iconBg: 'bg-[#E3D7FE]',
      value: stats.groups_count,
      title: t('tutorHome.statGroups'),
      sub: (
        <span className="inline-flex items-center gap-1">
          <ArrowUp size={11} />
          {t('tutorHome.statGroupsSub', { count: stats.groups_new_this_month })}
        </span>
      ),
      subColor: 'text-emerald-500'
    },
    {
      key: 'active',
      icon: <Activity size={26} className="text-[#0D875E]" />,
      iconBg: 'bg-[#E7F8EF]',
      value: stats.active_students,
      title: t('tutorHome.statActiveStudents'),
      sub: t('tutorHome.statActiveStudentsSub', { percent: stats.active_students_percent })
    },
    {
      key: 'average',
      icon: <Award size={26} className="text-[#F59E0B]" />,
      iconBg: 'bg-[#FFF3DD]',
      value: `${stats.average_result_percent}%`,
      title: t('tutorHome.statAverageResult'),
      sub: (
        <span className="inline-flex items-center gap-1">
          <ArrowUp size={11} />
          {t('tutorHome.statAverageResultSub', { percent: stats.average_result_growth })}
        </span>
      ),
      subColor: 'text-emerald-500'
    },
    {
      key: 'lessons',
      icon: <BookOpen size={26} className="text-[#5D87FF]" />,
      iconBg: 'bg-[#EAF0FF]',
      value: stats.today_lessons,
      title: t('tutorHome.statTodayLessons'),
      sub: t('tutorHome.statTodayLessonsSub')
    }
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
      {tiles.map((tile) => (
        <Tile key={tile.key} {...tile} />
      ))}
    </div>
  )
}

export default TutorStatsGrid
