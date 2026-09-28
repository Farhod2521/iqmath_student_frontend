import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'

import { useGetQuery } from '@/hooks'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'
import ContentLoader from '@/components/loader/content-loader'
import CardDiagnostic from '../components/card/CardDiagnostic'
import SectionHeader from '../components/section/SectionHeader'
import {
  COMPLETED_COLOR,
  IN_PROGRESS_COLOR,
  NOT_STARTED_COLOR,
  StatsCard
} from '../components/stats/SubjectsStats'
import { groupSubjectsByType } from '../utils/groupSubjectsByType'
import { getSubjectTheme } from '../utils/subjectTheme'

const MIN_COLUMNS = 5
const MAX_COLUMNS = 6

const isGrade = (item) => /^\d+$/.test(String(get(item, 'class_name', '')))
const scoreOf = (item) => Math.round(get(item, 'progress_percent') || 0)

const DiagnosticSubjects = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()

  // Faqat birinchi yuklanishda loader — keyingi yangilanishlarda eski ma'lumot ko'rinib turadi
  const { data: subjects, isLoading } = useGetQuery({
    key: KEYS.diagnosticSubjects,
    url: URLS.recommendations,
    // Testdan qaytganda yangi natija darhol ko'rinsin
    refetchOnMount: true
  })

  const sections = useMemo(() => {
    if (!subjects?.data) return []

    return groupSubjectsByType(subjects.data, i18n.language).map(({ type, data }, index) => {
      const theme = getSubjectTheme(get(data, '[0].name_uz') || type, index)
      const graded = data.filter(isGrade).sort((a, b) => Number(a.class_name) - Number(b.class_name))
      const first = graded.length ? Number(graded[0].class_name) : null
      const last = graded.length ? Number(graded[graded.length - 1].class_name) : null

      const taken = data.filter((item) => item.has_taken_diagnostic)
      // O'rtacha natija barcha fanlar bo'yicha: topshirilmagan fan 0% hisoblanadi
      // (masalan, 5 ta fandan bittasi 100% bo'lsa — 20%)
      const average = data.length
        ? Math.round(taken.reduce((sum, item) => sum + scoreOf(item), 0) / data.length)
        : 0
      const weak = taken.reduce((sum, item) => sum + (item.weak_topics_count || 0), 0)

      return {
        index,
        type,
        data,
        theme,
        subtitle:
          first === null
            ? ''
            : first === last
              ? t('diagSectionSubtitleSingle', { grade: first })
              : t('diagSectionSubtitle', { from: first, to: last }),
        // Statistika faqat sinflarga bo'lingan fanlar uchun (masalan, "Testlar" kirmaydi)
        stats: graded.length
          ? {
              title: type,
              theme,
              gradesLabel:
                first === last
                  ? t('subjectsStatsGrade', { grade: first })
                  : t('subjectsStatsGrades', { from: first, to: last }),
              overall: average,
              overallLabel: t('diagStatsOverall'),
              legend: [
                { color: theme.accent, label: t('diagStatsTotal'), value: data.length },
                { color: COMPLETED_COLOR, label: t('diagStatsTaken'), value: taken.length },
                { color: NOT_STARTED_COLOR, label: t('diagStatsNotTaken'), value: data.length - taken.length },
                { color: IN_PROGRESS_COLOR, label: t('diagStatsWeak'), value: weak }
              ],
              grades: graded.map((item) => ({ label: item.class_name, value: scoreOf(item) }))
            }
          : null
      }
    })
  }, [subjects, i18n.language, t])

  if (isLoading) return <ContentLoader />

  const scrollToSection = (index) => {
    document.getElementById(`diagnostic-section-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const statsCards = sections.filter((section) => section.stats)

  return (
    <div className="flex flex-col gap-9">
      {statsCards.length ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 min-[1700px]:grid-cols-3">
          {statsCards.map((section) => (
            <StatsCard key={section.type} {...section.stats} onSeeAll={() => scrollToSection(section.index)} />
          ))}
        </div>
      ) : null}

      {sections.map((section) => {
        const columns = Math.min(Math.max(section.data.length, MIN_COLUMNS), MAX_COLUMNS)

        return (
          <section key={section.index} id={`diagnostic-section-${section.index}`} className="scroll-mt-24">
            <SectionHeader title={section.type} subtitle={section.subtitle} accent={section.theme.accent} />

            <div
              className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 xl:[grid-template-columns:repeat(var(--subject-cols),minmax(0,1fr))]"
              style={{ '--subject-cols': columns }}
            >
              {section.data.map((item) => (
                <CardDiagnostic
                  key={item.id}
                  item={item}
                  theme={section.theme}
                  onStart={() => router.push(`/dashboard/student/diagnostics/test/${item.id}`)}
                  onRecommendations={() => router.push(`/dashboard/student/recommendations/${item.id}`)}
                />
              ))}
            </div>
          </section>
        )
      })}

      {sections.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">{t('diagEmpty')}</p>
        </div>
      )}
    </div>
  )
}

export default DiagnosticSubjects
