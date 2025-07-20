import Dashboard from '@/components/dashboard'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import useGetQuery from '@/hooks/api/useGetQuery'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { get } from 'lodash'
import ContentLoader from '@/components/loader/content-loader'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import StudentSubjectsList from '../components/StudentSubjectsList'

const StudentDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: session } = useSession()
  const { t } = useTranslation()

  const { data, isLoading, isFetching } = useGetQuery({
    key: [KEYS.studentStatistics, id],
    url: `${URLS.studentStatistics}${id}/`,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!id && !!session?.accessToken
  })

  const studentData = get(data, 'data', {})

  if (isLoading || isFetching) {
    return (
      <Dashboard>
        <ContentLoader />
      </Dashboard>
    )
  }

  // console.log("Student Diagnostics Data:", studentData.student_diagnost);

  return (
    <div className="p-6 space-y-6">
      {/* Main Info and Payment Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Info */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex flex-col items-center text-center">
            <Image src="/icons/pupil.svg" alt="pupil" width={96} height={96} className="rounded-full mb-4" />
            <h1 className="text-xl font-bold">{studentData.full_name}</h1>
          </div>
        </div>
        {/* Payment Stats */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-lg mb-4">{t('paymentInfo')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">{t('lastPayment')}</p>
              <p className="font-semibold text-lg">{studentData.last_payment_amount?.toLocaleString()} UZS</p>
              <p className="text-xs text-gray-400">
                {studentData.last_payment_date} {studentData.last_payment_time}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('totalPaid')}</p>
              <p className="font-semibold text-lg">{studentData.total_paid_amount?.toLocaleString()} UZS</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('paymentStatus')}</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 items-center mt-1">
                <span className="flex items-center text-sm text-yellow-600">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                  {studentData.payment_status_count?.pending} {t('pending')}
                </span>
                <span className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  {studentData.payment_status_count?.success} {t('success')}
                </span>
                <span className="flex items-center text-sm text-red-600">
                  <div className="w-2 h-2 rounded-full bg-red-400 mr-2"></div>
                  {studentData.payment_status_count?.failed} {t('failed')}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('coins')}</p>
              <p className="font-semibold text-lg">{studentData.coin}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('SumScore')}</p>
              <p className="font-semibold text-lg">{studentData.score}</p>
            </div>
          </div>
        </div>
      </div>

      <StudentSubjectsList />
      {/* Diagnostics Table */}
      {/* <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-4">{t("subjectMastery")}</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="p-4 font-medium">{t("subjectName")}</th>
                  <th className="p-4 font-medium text-center">{t("chapters")}</th>
                  <th className="p-4 font-medium text-center">{t("topics")}</th>
                  <th className="p-4 font-medium text-center">{t("masteredTopics")}</th>
                  <th className="p-4 font-medium w-1/3">{t("mastery")}</th>
                  <th className="p-4 font-medium text-center">{t("action")}</th>
                </tr>
              </thead>
              <tbody>
                {studentData.student_diagnost?.map((subject, index) => (
                  <tr key={index} className="border-b last:border-none">
                    <td className="p-4 font-semibold">{subject.subject_name}</td>
                    <td className="p-4 text-center">{subject.chapters}</td>
                    <td className="p-4 text-center">{subject.topics}</td>
                    <td className="p-4 text-center">{subject.mastered_topics}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${subject.mastery_percent}%` }}></div>
                        </div>
                        <span className="font-semibold text-sm">{subject.mastery_percent}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => router.push(`/dashboard/teacher/pupils/${id}/2`)}
                        className="text-gray-500 hover:text-blue-600"
                        title={t("details")}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}
    </div>
  )
}

export default StudentDetails
