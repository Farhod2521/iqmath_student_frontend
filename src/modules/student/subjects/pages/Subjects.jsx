import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'

import ContentLoader from '@/components/loader/content-loader'
import CardSubject from '../components/card/CardSubject'
import CardLockedSubject from '../components/card/CardLockedSubject'
import SectionHeader from '../components/section/SectionHeader'
import { groupSubjectsByType } from '../utils/groupSubjectsByType'
import { getSubjectTheme } from '../utils/subjectTheme'
import { useRouter } from 'next/router'
import { get } from 'lodash'

// Katta ekranda bir qatorga nechta karta sig'adi: bo'limdagi fanlar soniga qarab 5 yoki 6.
// Fan kam bo'lsa ham kamida 5 ustun — yolg'iz karta butun qatorga cho'zilib ketmasin.
const MIN_COLUMNS = 5
const MAX_COLUMNS = 6

const Subjects = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()

  // Faqat birinchi yuklanishda loader — keyingi yangilanishlarda eski ma'lumot ko'rinib turadi
  const { data: studentSubjects, isLoading } = useGetQuery({
    key: KEYS.studentSubjects,
    url: URLS.studentSubjects
  })

  const subjectsData = useMemo(() => {
    if (!studentSubjects?.data) return []
    return groupSubjectsByType(studentSubjects.data, i18n.language)
  }, [studentSubjects, i18n.language])

  if (isLoading) return <ContentLoader />

  return (
    <div className="flex flex-col gap-7 sm:gap-9">
      {subjectsData?.map(({ type, data }, idx) => {
        const theme = getSubjectTheme(get(data, '[0].name_uz') || type, idx)
        const grades = data.map((item) => Number(get(item, 'class_name'))).filter((n) => !Number.isNaN(n))
        const minGrade = grades.length ? Math.min(...grades) : null
        const maxGrade = grades.length ? Math.max(...grades) : null
        const gradeRangeLabel =
          minGrade && maxGrade
            ? minGrade === maxGrade
              ? t('subjectsGroupSubtitleSingle', { grade: minGrade })
              : t('subjectsGroupSubtitle', { from: minGrade, to: maxGrade })
            : ''
        const columns = Math.min(Math.max(data.length, MIN_COLUMNS), MAX_COLUMNS)

        return (
          <section key={idx} id={`subjects-section-${idx}`} className="scroll-mt-24">
            <SectionHeader title={type} subtitle={gradeRangeLabel} accent={theme.accent} />

            <div
              className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 xl:[grid-template-columns:repeat(var(--subject-cols),minmax(0,1fr))]"
              style={{ '--subject-cols': columns }}
            >
              {data?.map((item, index) =>
                item.is_open ? (
                  <CardSubject
                    key={get(item, 'id', index)}
                    item={item}
                    theme={theme}
                    onClick={() => router.push(`/dashboard/student/subjects/${get(item, 'id')}`)}
                  />
                ) : (
                  <CardLockedSubject key={get(item, 'id', index)} item={item} theme={theme} />
                )
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default Subjects
