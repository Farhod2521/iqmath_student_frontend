import ContentLoader from '@/components/loader/content-loader'
import { useGetQuery } from '@/hooks'
import LayoutAdmin from '@/layout/LayoutAdmin'
import ChildNotFoundState from '@/modules/parent/children/components/child-detail/ChildNotFoundState'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TrendingUp, Award } from 'lucide-react'
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

  const hasStatistics = data?.student_diagnost?.length > 0

  return (
    <LayoutAdmin>
      <div className="min-h-screen">
        {/* Student Info Header */}
        <div className="bg-white rounded-xl border border-[#E8EBF0] p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            {/* Student Info */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#1A1D29] mb-1">{data.full_name}</h1>
              <p className="text-sm text-[#6B7280]">
                {t('id')}: {data.identification}
              </p>
            </div>

            {/* Stats Badges */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3">
              <StatBadge
                icon={<SiWebmoney size={18} />}
                value={data.total_paid_amount}
                label={t('currency')}
                bgColor="bg-[#009900]"
              />
              <StatBadge icon={<Award size={18} />} value={data.score} label={t('score')} bgColor="bg-[#5B7FFF]" />
              <StatBadge icon={<TrendingUp size={18} />} value={data.coin} label={t('coin')} bgColor="bg-[#FFB020]" />
            </div>
          </div>
        </div>

        {/* Statistics Content */}
        {!hasStatistics ? (
          <div className="bg-white rounded-xl border border-[#E8EBF0] p-12 text-center">
            <h3 className="text-xl text-[#6B7280]">{t('no_statistics')}</h3>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-[#1A1D29] mb-6">{t('mastery_statistics')}</h2>
            <div className="bg-white rounded-xl border border-[#E8EBF0] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-gray-500 border-b">
                      <th className="p-4 font-medium">{t('subjectName')}</th>
                      <th className="p-4 font-medium">{t('chapter')}</th>
                      <th className="p-4 font-medium">{t('topic')}</th>
                      <th className="p-4 font-medium">{t('mastery')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.student_diagnost.map((subject, index) => (
                      <SubjectRow
                        key={subject.id || index}
                        subject={subject}
                        isLast={index === data.student_diagnost.length - 1}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </LayoutAdmin>
  )
}

// Stat Badge Component
function StatBadge({ icon, value, label, bgColor }) {
  return (
    <div
      className={`flex items-center gap-2 ${bgColor} text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-semibold text-sm sm:text-base flex-1 sm:flex-initial min-w-0`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="truncate">
        {value} <span className="text-white/80">{label}</span>
      </span>
    </div>
  )
}

// Subject Row Component
function SubjectRow({ subject, isLast }) {
  const masteryPercent = subject.mastery_percent ?? 0

  const { t, i18n } = useTranslation()

  return (
    <tr className={`${!isLast ? 'border-b' : ''} hover:bg-gray-50 transition-colors`}>
      <td className="p-4 font-semibold text-[#1A1D29]">
        {i18n.language == 'uz' ? subject.subject_name_uz : subject.subject_name_ru}
      </td>
      <td className="font-semibold text-sm px-4">{subject.chapters}</td>
      <td className="font-semibold text-sm px-4">{subject.topics}</td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[120px] max-w-[300px]">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${masteryPercent}%` }}
            />
          </div>
          <span className="font-semibold text-sm text-[#1A1D29] min-w-[45px]">{masteryPercent}%</span>
        </div>
      </td>
    </tr>
  )
}

export default Index
