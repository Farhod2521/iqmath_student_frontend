import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { ArrowRight, Triangle } from 'lucide-react'

import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { groupSubjectsByType } from '../../utils/groupSubjectsByType'
import { getSubjectTheme } from '../../utils/subjectTheme'

// Legenda ranglari (maket bo'yicha); "Jami darslar" — fan rangida
export const COMPLETED_COLOR = '#2BC4A0'
export const IN_PROGRESS_COLOR = '#F5C26B'
export const NOT_STARTED_COLOR = '#CBD5E1'

export const percent = (part, total) => (total ? Math.round((part * 100) / total) : 0)

// Fan ikonkasi: Matematika — √x, Algebra — f(x), Geometriya — uchburchak
const SubjectIcon = ({ name }) => {
  const key = String(name).toLowerCase()
  if (key.includes('geometr') || key.includes('геометр')) return <Triangle size={22} strokeWidth={2.4} />
  if (key.includes('algebra') || key.includes('алгебр')) {
    return <span className="font-serif text-[19px] italic leading-none">f(x)</span>
  }
  return <span className="font-serif text-[20px] leading-none">√x</span>
}

const Donut = ({ value, color }) => {
  const radius = 34
  const circumference = 2 * Math.PI * radius
  return (
    <div className="relative h-[92px] w-[92px] shrink-0">
      <svg viewBox="0 0 84 84" className="h-full w-full -rotate-90">
        <circle cx="42" cy="42" r={radius} fill="none" stroke="#EEF1F6" strokeWidth="8" />
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[22px] font-extrabold text-[#0F1B3D] dark:text-white">
        {value}%
      </span>
    </div>
  )
}

const LegendRow = ({ color, label, value }) => (
  <div className="flex items-center justify-between gap-3 text-[13px]">
    <span className="flex min-w-0 items-center gap-2 text-[#5B6478] dark:text-gray-300">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      <span className="truncate">{label}</span>
    </span>
    <span className="font-bold text-[#0F1B3D] dark:text-white">{value}</span>
  </div>
)

// Sinflar bo'yicha progress ustunlari; eng yuqorisi to'liq rangda va foizi ustida ko'rsatiladi
const GradeBars = ({ grades, color }) => {
  const maxValue = Math.max(...grades.map((g) => g.value))
  const maxIndex = grades.findIndex((g) => g.value === maxValue)

  return (
    <div className="flex h-[118px] min-w-0 flex-1 items-end gap-1.5 sm:gap-2">
      {grades.map((grade, index) => {
        const isTop = index === maxIndex && maxValue > 0
        // Bo'sh sinf ham ko'rinib tursin — kamida 12% balandlik
        const height = Math.max(12, grade.value)
        return (
          <div key={grade.label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
            <div className="relative flex w-full max-w-[26px] flex-1 items-end">
              {isTop ? (
                <span
                  className="absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm"
                  style={{ backgroundColor: color, bottom: `calc(${height}% + 6px)` }}
                >
                  {grade.value}%
                </span>
              ) : null}
              <div
                className="w-full rounded-t-md transition-[height] duration-700"
                style={{ height: `${height}%`, backgroundColor: color, opacity: isTop ? 1 : 0.3 + (0.55 * index) / grades.length }}
                title={`${grade.label}: ${grade.value}%`}
              />
            </div>
            <span className="text-[11px] font-medium text-[#8A93A6]">{grade.label}</span>
          </div>
        )
      })}
    </div>
  )
}

// Umumiy statistika kartasi — Fanlar va Diagnostika sahifalarida ishlatiladi.
// legend: [{ color, label, value }], overallLabel — doira ostidagi yozuv
export const StatsCard = ({ title, theme, gradesLabel, overall, overallLabel, legend, grades, onSeeAll }) => {
  const { t } = useTranslation()
  const { accent, soft } = theme

  return (
    <div
      className="flex flex-col gap-4 rounded-[20px] bg-white bg-[linear-gradient(180deg,var(--stats-tint)_0%,#FFFFFF_55%)] p-4 ring-1 ring-[#EDF0F5] sm:p-5 dark:bg-[#202936] dark:bg-none dark:ring-[#2A3547]"
      style={{ '--stats-tint': `${soft}99` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
            style={{ backgroundColor: accent }}
          >
            <SubjectIcon name={title} />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-[20px] font-extrabold leading-tight text-[#0F1B3D] dark:text-white">{title}</h3>
            {gradesLabel ? <p className="mt-0.5 text-sm text-[#6B7385] dark:text-gray-400">{gradesLabel}</p> : null}
          </div>
        </div>
        <button
          type="button"
          onClick={onSeeAll}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-xs font-semibold transition hover:opacity-80 dark:bg-transparent"
          style={{ color: accent, borderColor: `${accent}33` }}
        >
          {t('subjectsSeeAll')}
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1.5">
            <Donut value={overall} color={accent} />
            <span className="text-[11px] font-medium text-[#8A93A6]">{overallLabel}</span>
          </div>
          <div className="flex min-w-[150px] flex-1 flex-col gap-2.5">
            {legend.map((row) => (
              <LegendRow key={row.label} color={row.color || accent} label={row.label} value={row.value} />
            ))}
          </div>
        </div>

        <div className="hidden h-[118px] w-px shrink-0 bg-[#EDF0F5] md:block dark:bg-[#2A3547]" />

        <GradeBars grades={grades} color={accent} />
      </div>
    </div>
  )
}

/**
 * Fanlar sahifasi tepasidagi statistika: har fan turi (Matematika, Algebra, Geometriya)
 * bo'yicha umumiy progress, darslar holati va sinflar kesimidagi progress.
 * Ma'lumot fanlar ro'yxati bilan bir xil so'rovdan olinadi (react-query keshi — qo'shimcha so'rov yo'q).
 */
const SubjectsStats = () => {
  const { t, i18n } = useTranslation()

  const { data: studentSubjects } = useGetQuery({
    key: KEYS.studentSubjects,
    url: URLS.studentSubjects
  })

  const cards = useMemo(() => {
    if (!studentSubjects?.data) return []

    return groupSubjectsByType(studentSubjects.data, i18n.language)
      .map(({ type, data }, index) => {
        // Faqat sinflarga bo'lingan fanlar (masalan, "Testlar to'plami" kirmaydi)
        const graded = data
          .filter((item) => /^\d+$/.test(String(get(item, 'class_name', ''))))
          .sort((a, b) => Number(a.class_name) - Number(b.class_name))
        if (!graded.length) return null

        const total = graded.reduce((sum, item) => sum + (item.topics_count || 0), 0)
        const completed = graded.reduce((sum, item) => sum + (item.completed_topics || 0), 0)
        const inProgress = graded.reduce((sum, item) => sum + (item.in_progress_topics || 0), 0)
        const first = Number(graded[0].class_name)
        const last = Number(graded[graded.length - 1].class_name)
        const theme = getSubjectTheme(get(graded, '[0].name_uz') || type, index)

        return {
          sectionIndex: index,
          title: type,
          theme,
          gradesLabel:
            first === last
              ? t('subjectsStatsGrade', { grade: first })
              : t('subjectsStatsGrades', { from: first, to: last }),
          overall: percent(completed, total),
          overallLabel: t('subjectsStatsOverall'),
          legend: [
            { color: theme.accent, label: t('subjectsStatsTotal'), value: total },
            { color: COMPLETED_COLOR, label: t('subjectsStatsCompleted'), value: completed },
            { color: IN_PROGRESS_COLOR, label: t('subjectsStatsInProgress'), value: inProgress },
            { color: NOT_STARTED_COLOR, label: t('subjectsStatsNotStarted'), value: Math.max(0, total - completed - inProgress) }
          ],
          grades: graded.map((item) => ({
            label: item.class_name,
            value: percent(item.completed_topics || 0, item.topics_count || 0)
          }))
        }
      })
      .filter(Boolean)
  }, [studentSubjects, i18n.language, t])

  if (!cards.length) return null

  const scrollToSection = (sectionIndex) => {
    document.getElementById(`subjects-section-${sectionIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 min-[1700px]:grid-cols-3">
      {cards.map((card) => (
        <StatsCard key={card.title} {...card} onSeeAll={() => scrollToSection(card.sectionIndex)} />
      ))}
    </div>
  )
}

export default SubjectsStats
