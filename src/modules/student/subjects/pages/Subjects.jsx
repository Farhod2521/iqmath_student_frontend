import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronRight } from 'lucide-react'

import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'

import ContentLoader from '@/components/loader/content-loader'
import CardSubject, { CARD_ACCENTS } from '../components/card/CardSubject'
import CardLockedSubject from '../components/card/CardLockedSubject'
import { groupSubjectsByType } from '../utils/groupSubjectsByType'
import { useRouter } from 'next/router'
import { get } from 'lodash'

// Bo'lim sarlavhasidagi rangli chiziq — guruhlar orasida aylanib turadi
const SECTION_ACCENTS = ['#EC4899', '#8B5CF6', '#5D87FF', '#F59E0B', '#10B981', '#06B6D4']

const Subjects = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()

  const {
    data: studentSubjects,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.studentSubjects,
    url: URLS.studentSubjects
  })

  const subjectsData = useMemo(() => {
    if (!studentSubjects?.data) return []
    return groupSubjectsByType(studentSubjects.data, i18n.language)
  }, [studentSubjects, i18n.language])

  if (isLoading || isFetching) return <ContentLoader />

  return (
    <div>
      {subjectsData?.map(({ type, data }, idx) => {
        const accent = SECTION_ACCENTS[idx % SECTION_ACCENTS.length]
        const grades = data.map((item) => Number(get(item, 'class_name'))).filter((n) => !Number.isNaN(n))
        const minGrade = grades.length ? Math.min(...grades) : null
        const maxGrade = grades.length ? Math.max(...grades) : null
        const gradeRangeLabel =
          minGrade && maxGrade
            ? minGrade === maxGrade
              ? t('subjectsGroupSubtitleSingle', { grade: minGrade })
              : t('subjectsGroupSubtitle', { from: minGrade, to: maxGrade })
            : ''

        return (
          <section key={idx} className="pb-8">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="h-[28px] w-[6px] rounded-full" style={{ backgroundColor: accent }} />
                <div>
                  <h2 className="font-bold text-[18px] sm:text-[20px] text-[#1f2a5b] dark:text-white">{type}</h2>
                  {gradeRangeLabel && (
                    <p className="text-xs text-[#8A8A8E] sm:text-sm">{gradeRangeLabel}</p>
                  )}
                </div>
              </div>
              <span className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-[#5D87FF] sm:inline-flex">
                {t('subjectsSeeAll')}
                <ChevronRight size={16} />
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {data?.map((item, index) =>
                item.is_open ? (
                  <CardSubject
                    onClick={() => router.push(`/dashboard/student/subjects/${get(item, 'id')}`)}
                    key={index}
                    item={item}
                    accent={CARD_ACCENTS[index % CARD_ACCENTS.length]}
                  />
                ) : (
                  <CardLockedSubject key={index} item={item} />
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
