import { useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react'
import { get } from 'lodash'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'

const WEEKDAYS_UZ = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya']

const buildMonthGrid = (year, month) => {
  const firstDay = new Date(year, month, 1)
  const startOffset = (firstDay.getDay() + 6) % 7 // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let day = 1; day <= daysInMonth; day++) cells.push(day)
  return cells
}

const formatDDMMYYYY = (date) => {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  return `${dd}.${mm}.${date.getFullYear()}`
}

const MONTH_LABELS_UZ = [
  'Yanvar',
  'Fevral',
  'Mart',
  'Aprel',
  'May',
  'Iyun',
  'Iyul',
  'Avgust',
  'Sentabr',
  'Oktabr',
  'Noyabr',
  'Dekabr'
]

const HomeCalendarCard = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const today = useMemo(() => new Date(), [])
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const cells = useMemo(() => buildMonthGrid(cursor.year, cursor.month), [cursor])
  const isCurrentMonth = cursor.year === today.getFullYear() && cursor.month === today.getMonth()

  const monthStart = useMemo(() => new Date(cursor.year, cursor.month, 1), [cursor])
  const monthEnd = useMemo(() => new Date(cursor.year, cursor.month + 1, 0), [cursor])
  const daysInMonth = monthEnd.getDate()

  const { data: studyStats } = useGetQuery({
    key: [KEYS.studentStudyStats, cursor.year, cursor.month],
    url: URLS.studentStudyStats,
    params: {
      date_from: formatDDMMYYYY(monthStart),
      date_to: formatDDMMYYYY(monthEnd),
      page_size: daysInMonth
    },
    enabled: !!session?.accessToken
  })

  const activeDays = useMemo(() => {
    const results = get(studyStats, 'data.results', [])
    const set = new Set()
    results.forEach((item) => {
      if (item.completed) set.add(item.date)
    })
    return set
  }, [studyStats])

  const goToMonth = (delta) => {
    setCursor((prev) => {
      const next = new Date(prev.year, prev.month + delta, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })
  }

  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm">
      <h3 className="text-base font-bold text-[#191C1D]">{t('studentHome.calendar')}</h3>

      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={() => goToMonth(-1)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#8A8A8E] hover:bg-gray-100"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-semibold text-[#191C1D]">
          {MONTH_LABELS_UZ[cursor.month]} {cursor.year}
        </span>
        <button
          onClick={() => goToMonth(1)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#8A8A8E] hover:bg-gray-100"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-y-2 text-center">
        {WEEKDAYS_UZ.map((day) => (
          <span key={day} className="text-[11px] font-medium text-[#8A8A8E]">
            {day}
          </span>
        ))}
        {cells.map((day, idx) => {
          const isToday = isCurrentMonth && day === today.getDate()
          const dateKey = day
            ? `${cursor.year}-${String(cursor.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            : null
          const isActive = dateKey && activeDays.has(dateKey)

          return (
            <span key={idx} className="relative mx-auto flex h-7 w-7 items-center justify-center">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                  isToday
                    ? 'bg-[#5D87FF] font-semibold text-white'
                    : isActive
                      ? 'bg-orange-50 font-semibold text-[#F97316]'
                      : day
                        ? 'text-[#191C1D]'
                        : ''
                }`}
              >
                {day ?? ''}
              </span>
              {isActive && (
                <Flame
                  size={10}
                  className="absolute -bottom-1 -right-0.5 fill-[#F97316] text-[#F97316] drop-shadow-sm"
                />
              )}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default HomeCalendarCard
