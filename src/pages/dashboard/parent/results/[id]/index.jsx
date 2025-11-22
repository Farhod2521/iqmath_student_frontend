import ContentLoader from '@/components/loader/content-loader'
import { useGetQuery } from '@/hooks'
import LayoutAdmin from '@/layout/LayoutAdmin'
import ChildNotFoundState from '@/modules/parent/children/components/child-detail/ChildNotFoundState'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BookOpen, TrendingUp, Award } from 'lucide-react'
import { SiWebmoney } from 'react-icons/si'

function Index() {
  const { t } = useTranslation()
  const router = useRouter()
  const { id: childId } = router.query
  const { data: session } = useSession()

  const {
    data: statistics,
    isLoading,
    isError
  } = useGetQuery({
    key: ['/student-statistics', childId],
    url: `/api/v1/func_student/student-statistics/${childId}/`,
    enabled: !!childId && !!session?.accessToken
  })

  const data = useMemo(() => statistics?.data, [statistics])

  const groupedSubjects = useMemo(() => {
    if (!data?.student_diagnost) return []

    const subjectMap = new Map()

    data.student_diagnost
      .filter((item) => item.topics > 0)
      .forEach((item) => {
        const existing = subjectMap.get(item.subject_name) || []
        existing.push(item)
        subjectMap.set(item.subject_name, existing)
      })

    return Array.from(subjectMap.entries()).map(([subjectName, items]) => ({
      subjectName,
      totalChapters: items.reduce((sum, item) => sum + item.chapters, 0),
      totalTopics: items.reduce((sum, item) => sum + item.topics, 0),
      masteredTopics: items.reduce((sum, item) => sum + item.mastered_topics, 0),
      averageMastery: items.reduce((sum, item) => sum + item.mastery_percent, 0) / items.length
    }))
  }, [data])

  const getMasteryColor = (percent) => {
    if (percent >= 75) return 'bg-green-500'
    if (percent >= 50) return 'bg-blue-500'
    if (percent >= 25) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getMasteryTextColor = (percent) => {
    if (percent >= 75) return 'text-green-600'
    if (percent >= 50) return 'text-blue-600'
    if (percent >= 25) return 'text-orange-600'
    return 'text-red-600'
  }

  if (isLoading) {
    return (
      <LayoutAdmin>
        <ContentLoader />
      </LayoutAdmin>
    )
  }

  if (isError) {
    return <ChildNotFoundState />
  }

  return (
    <LayoutAdmin>
      <div className=" min-h-screen">
        {/* Student Info Header */}
        <div className="bg-white rounded-xl border border-[#E8EBF0] p-6 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-[#1A1D29] mb-1">{data.full_name}</h1>
              <p className="text-sm text-[#6B7280]">
                {t('id')}: {data.identification}
              </p>
            </div>

            <div className="flex gap-3">
              <div className="flex items-center gap-2 bg-[#009900] text-white px-4 py-2.5 rounded-xl font-semibold">
                <SiWebmoney size={18} />
                <span>
                  {data.total_paid_amount} <span className="text-[#E0E8FF]">{t('currency')}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 bg-[#5B7FFF] text-white px-4 py-2.5 rounded-xl font-semibold">
                <Award size={18} />
                <span>
                  {data.score} {t('score')}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-[#FFB020] text-white px-4 py-2.5 rounded-xl font-semibold">
                <TrendingUp size={18} />
                <span>
                  {data.coin} {t('coin')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Statistics */}
        <h2 className="text-2xl font-semibold text-[#1A1D29] mb-6">{t('mastery_statistics')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groupedSubjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#E8EBF0] p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(91,127,255,0.12)] hover:border-[#5B7FFF]"
            >
              {/* Subject Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#5B7FFF]/10 flex items-center justify-center">
                  <BookOpen size={22} color="#5B7FFF" />
                </div>
                <h3 className="text-lg font-semibold text-[#1A1D29]">{subject.subjectName}</h3>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-[#6B7280]">{t('mastery')}</span>
                  <span className={`text-sm font-bold ${getMasteryTextColor(subject.averageMastery)}`}>
                    {subject.averageMastery.toFixed(1)}%
                  </span>
                </div>

                <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-600 ${getMasteryColor(
                      subject.averageMastery
                    )}`}
                    style={{ width: `${subject.averageMastery}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6]">
                  <p className="text-xs font-medium text-[#6B7280] mb-1">{t('chapters')}</p>
                  <p className="text-xl font-bold text-[#1A1D29]">{subject.totalChapters}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#F9FAFB] border border-[#F3F4F6]">
                  <p className="text-xs font-medium text-[#6B7280] mb-1">{t('topics')}</p>
                  <p className="text-xl font-bold text-[#1A1D29]">
                    {subject.masteredTopics}/{subject.totalTopics}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {groupedSubjects.length === 0 && (
          <div className="bg-white rounded-xl border border-[#E8EBF0] p-12 text-center">
            <h3 className="text-xl text-[#6B7280]">{t('no_statistics')}</h3>
          </div>
        )}
      </div>
    </LayoutAdmin>
  )
}

export default Index
