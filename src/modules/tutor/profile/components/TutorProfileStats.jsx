import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUp, BarChart3, BookOpen, Star, Users, Users2 } from 'lucide-react'
import { mockProfileStatsByPeriod } from '../mock'

const PERIODS = [7, 30, 90]

const Tile = ({ icon, tileClass, iconClass, value, label, valueClass, delta }) => (
  <div className={`rounded-2xl p-3.5 ${tileClass}`}>
    <div className="flex items-start gap-2.5">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white ${iconClass}`}>
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className={`text-2xl font-extrabold leading-tight ${valueClass || 'text-[#191C1D]'}`}>{value}</p>
        <p className="truncate text-xs font-medium text-[#5A6A85]">{label}</p>
      </div>
      {delta ? (
        <span className="inline-flex shrink-0 items-center gap-0.5 text-[11px] font-bold text-emerald-500">
          <ArrowUp size={11} />
          {delta}
        </span>
      ) : null}
    </div>
  </div>
)

const TutorProfileStats = () => {
  const { t } = useTranslation()
  const [period, setPeriod] = useState(30)

  const stats = mockProfileStatsByPeriod[period]

  const tiles = [
    {
      key: 'students',
      icon: <Users size={20} />,
      tileClass: 'bg-[#F1F6FF]',
      iconClass: 'text-[#205FFE]',
      value: stats.students,
      label: t('tutorProfile.statStudents'),
      delta: stats.students_growth ? `+${stats.students_growth}` : null
    },
    {
      key: 'groups',
      icon: <Users2 size={20} />,
      tileClass: 'bg-[#F5F1FF]',
      iconClass: 'text-[#7626FB]',
      value: stats.groups,
      label: t('tutorProfile.statGroups'),
      delta: stats.groups_growth ? `+${stats.groups_growth}` : null
    },
    {
      key: 'lessons',
      icon: <BookOpen size={20} />,
      tileClass: 'bg-[#EFFBF4]',
      iconClass: 'text-[#0D875E]',
      value: stats.lessons,
      label: t('tutorProfile.statLessons'),
      delta: stats.lessons_growth ? `+${stats.lessons_growth}` : null
    },
    {
      key: 'average',
      icon: <Star size={20} />,
      tileClass: 'bg-[#FFF7E8]',
      iconClass: 'text-[#F59E0B]',
      value: `${stats.average_result_percent}%`,
      valueClass: 'text-[#F59E0B]',
      label: t('tutorProfile.statAverageResult'),
      delta: stats.average_result_growth ? `+${stats.average_result_growth}%` : null
    }
  ]

  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF0FF] text-[#5D87FF]">
            <BarChart3 size={18} />
          </span>
          <h2 className="truncate text-base font-bold text-[#191C1D] sm:text-lg">
            {t('tutorProfile.statsTitle')}
          </h2>
        </div>

        <select
          value={period}
          onChange={(event) => setPeriod(Number(event.target.value))}
          className="shrink-0 cursor-pointer rounded-xl border border-[#E9E9E9] bg-white px-3 py-2 text-xs font-semibold text-[#5A6A85] outline-none transition hover:border-[#D7E2FF] focus:border-[#5D87FF]"
        >
          {PERIODS.map((value) => (
            <option key={value} value={value}>
              {t('tutorProfile.periodLastDays', { count: value })}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tiles.map((tile) => (
          <Tile key={tile.key} {...tile} />
        ))}
      </div>
    </div>
  )
}

export default TutorProfileStats
