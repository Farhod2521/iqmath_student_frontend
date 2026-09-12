import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { ArrowUp, BarChart3, BookOpen, Star, Users, Users2 } from 'lucide-react'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'

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

  const { data, isLoading } = useGetQuery({
    key: [KEYS.tutorResultsOverview, period],
    url: URLS.tutorResultsOverview,
    params: { period }
  })

  const overview = get(data, 'data', null)
  const students = get(overview, 'students', {})
  const groups = get(overview, 'groups', {})
  const topics = get(overview, 'topics', {})
  const averageResult = get(overview, 'average_result', {})

  const tiles = [
    {
      key: 'students',
      icon: <Users size={20} />,
      tileClass: 'bg-[#F1F6FF]',
      iconClass: 'text-[#205FFE]',
      value: students.total || 0,
      label: t('tutorProfile.statStudents'),
      delta: students.new_in_period ? `+${students.new_in_period}` : null
    },
    {
      key: 'groups',
      icon: <Users2 size={20} />,
      tileClass: 'bg-[#F5F1FF]',
      iconClass: 'text-[#7626FB]',
      value: groups.total || 0,
      label: t('tutorProfile.statGroups'),
      delta: groups.new_in_period ? `+${groups.new_in_period}` : null
    },
    {
      key: 'topics',
      icon: <BookOpen size={20} />,
      tileClass: 'bg-[#EFFBF4]',
      iconClass: 'text-[#0D875E]',
      value: topics.completed_in_period || 0,
      label: t('tutorProfile.statTopics'),
      delta: topics.growth > 0 ? `+${topics.growth}` : null
    },
    {
      key: 'average',
      icon: <Star size={20} />,
      tileClass: 'bg-[#FFF7E8]',
      iconClass: 'text-[#F59E0B]',
      value: `${Math.round(averageResult.overall_percent || 0)}%`,
      valueClass: 'text-[#F59E0B]',
      label: t('tutorProfile.statAverageResult'),
      delta: averageResult.growth > 0 ? `+${Math.round(averageResult.growth)}%` : null
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

      {isLoading ? (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="h-[76px] animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {tiles.map((tile) => (
            <Tile key={tile.key} {...tile} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TutorProfileStats
