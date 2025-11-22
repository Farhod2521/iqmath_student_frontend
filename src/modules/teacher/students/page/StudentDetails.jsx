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
import StudentRewardModal from '../components/StudentRewardModal'
import { useState } from 'react'
import { useUserStore } from '@/store'
import { RolesList } from '@/layout/libs/menulist'

const StudentDetails = () => {
  const router = useRouter()
  const { user } = useUserStore((state) => state)
  const { id } = router.query
  const { data: session } = useSession()
  const { t } = useTranslation()
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false)

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
      <div>
        <ContentLoader />
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Main Info and Payment Stats */}
      {user?.role === RolesList.ADMIN || user?.role === RolesList.TEACHER ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex flex-col items-center text-center">
              <Image src="/icons/pupil.svg" alt="pupil" width={96} height={96} className="rounded-full mb-4" />
              <h1 className="text-xl font-bold">{studentData.full_name}</h1>
              <span
                className={`px-2 xl:px-3 py-1 mt-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  studentData.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {studentData.is_active ? t('active') : t('inactive')}
              </span>
              <button
                onClick={() => setIsRewardModalOpen(true)}
                className="mt-4 bg-[#5D87FF] hover:bg-[#4570EA] text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
                {t('giveReward')}
              </button>
            </div>
          </div>

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
                <div className="flex flex-wrap flex-col gap-x-3 gap-y-1 items-start mt-1">
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
                  <span className="flex items-center text-sm text-red-600">
                    <div className={`w-2 h-2 rounded-full bg-red-400 mr-2`}></div>
                    {studentData.is_active ? t('active') : t('inactive')}
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
      ) : (
        <></>
      )}

      {user?.role === RolesList.PARENT || user?.role === RolesList.TUTOR ? (
        <div className="bg-white rounded-lg p-4 flex items-center gap-4 max-w-md w-full">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl font-semibold">{studentData?.full_name[0]}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-900 mb-1">{studentData?.full_name}</h1>
            <span
              className={`px-2 xl:px-3 py-1 mt-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                studentData.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {studentData.is_active ? t('active') : t('inactive')}
            </span>
            <p className="text-gray-500 text">ID: {studentData?.identification || '...'}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
      <StudentSubjectsList />

      {/* Reward Modal */}
      <StudentRewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        student={{ id: id, full_name: studentData.full_name }}
        onSuccess={() => {
          // Refresh student data if needed - TODO: implement this
        }}
      />
    </div>
  )
}

export default StudentDetails
