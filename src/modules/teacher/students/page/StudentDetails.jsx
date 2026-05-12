import { URLS } from '@/constants/url'
import { usePostQuery } from '@/hooks'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import ContentLoader from '@/components/loader/content-loader'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import StudentSubjectsList from '../components/StudentSubjectsList'
import StudentRewardModal from '../components/StudentRewardModal'
import { useEffect, useRef, useState } from 'react'
import { useUserStore } from '@/store'
import { RolesList } from '@/layout/libs/menulist'

const getRoleForAPI = (role) => {
  if (role === 'PARENT') return 'parent'
  if (role === 'TUTOR') return 'tutor'
  return 'student'
}

const StudentDetails = () => {
  const router = useRouter()
  const { user } = useUserStore((state) => state)
  const { id, role } = router.query
  const { data: session } = useSession()
  const { t } = useTranslation()

  const [studentData, setStudentData] = useState(null)
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false)

  const hasFetchedRef = useRef(false)

  const apiRole = role || getRoleForAPI(user?.role)

  const { mutate, isLoading } = usePostQuery({
    hideSuccessToast: true
  })

  // 🚀 FETCH DATA
  useEffect(() => {
    if (!id || !session?.accessToken || !apiRole) return
    if (hasFetchedRef.current) return

    hasFetchedRef.current = true

    mutate(
      {
        url: `${URLS.universalStatistics}${id}/`,
        attributes: { role: apiRole }
      },
      {
        onSuccess: (res) => {
          setStudentData(res.data)
        }
      }
    )
  }, [id, apiRole, session?.accessToken])

  // reset if id changes
  useEffect(() => {
    hasFetchedRef.current = false
  }, [id])

  if (isLoading || !studentData) {
    return <ContentLoader />
  }

  return (
    <div className="p-4 space-y-6">
      {/* ================= ADMIN / TEACHER VIEW ================= */}
      {(user?.role === RolesList.ADMIN || user?.role === RolesList.TEACHER) && apiRole === 'student' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT */}
          <div className="p-6 bg-white border rounded-xl">
            <div className="flex flex-col items-center text-center">
              <Image src="/icons/pupil.svg" alt="pupil" width={96} height={96} />
              <h1 className="mt-2 text-xl font-bold">{studentData.full_name}</h1>

              <span
                className={`mt-2 px-3 py-1 rounded-full text-xs ${
                  studentData.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {studentData.is_active ? t('active') : t('inactive')}
              </span>

              <button
                onClick={() => setIsRewardModalOpen(true)}
                className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg"
              >
                {t('giveReward')}
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-6 bg-white border lg:col-span-2 rounded-xl">
            <h3 className="mb-4 font-semibold">{t('paymentInfo')}</h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <p className="text-sm text-gray-500">{t('lastPayment')}</p>
                <p className="font-semibold text-log">{studentData?.last_payment_amount?.toLocaleString()} UZS</p>
                <p className="text-xs text-gray-400">
                  {studentData?.last_payment_date} {studentData?.last_payment_time}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('total')}</p>
                <p className="text-lg font-semibold">{studentData.total_paid_amount?.toLocaleString()} UZS</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('paymentStatus')}</p>
                <div className="flex flex-col flex-wrap items-start mt-1 gap-x-3 gap-y-1">
                  <span className="flex items-center text-sm text-yellow-600">
                    <div className="w-2 h-2 mr-2 bg-yellow-400 rounded-full"></div>
                    {studentData?.payment_status_count?.pending} {t('pending')}
                  </span>
                  <span className="flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 mr-2 bg-green-400 rounded-full"></div>
                    {studentData?.payment_status_count?.success} {t('success')}
                  </span>
                  <span className="flex items-center text-sm text-red-600">
                    <div className="w-2 h-2 mr-2 bg-red-400 rounded-full"></div>
                    {studentData?.payment_status_count?.failed} {t('failed')}
                  </span>
                  <span className="flex items-center text-sm text-red-600">
                    <div className="w-2 h-2 mr-2 bg-red-400 rounded-full"></div>
                    {studentData?.is_active ? t('active') : t('inactive')}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('coins')}</p>
                <p className="text-lg font-semibold">{studentData.coin}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">{t('SumScore')}</p>
                <p className="text-lg font-semibold">{studentData.score}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PARENT VIEW ================= */}
      {apiRole === RolesList.PARENT && (
        <div className="space-y-6">
          {/* Parent Info */}
          <div className="p-6 bg-white border rounded-xl">
            <div className="flex items-center justify-between">
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full">
                  <span className="text-xl font-bold text-white">{studentData.full_name?.[0]}</span>
                </div>

                <div>
                  <h1 className="text-xl font-bold">{studentData.full_name}</h1>
                  <p className="text-sm text-gray-500">{studentData.phone}</p>
                  <p className="text-sm text-gray-500">ID: {studentData.identification}</p>
                </div>
              </div>

              {/* RIGHT - STATUS */}
              <div>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    studentData.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}
                >
                  {studentData.status ? t('active') : t('inactive')}
                </span>
              </div>
            </div>

            {/* OPTIONAL: REGISTER DATE */}
            <div className="mt-4 text-sm text-gray-500">
              {t('registrationDate')}: <span className="font-medium text-gray-800">{studentData.registered_at}</span>
            </div>
          </div>

          {/* Children */}
          <div className="p-6 bg-white border rounded-xl">
            <h2 className="mb-4 font-semibold">
              {t('myChildren')} ({studentData.children_count})
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {studentData.children?.map((child) => (
                <div
                  key={child.student_id}
                  className="p-4 transition bg-white border cursor-pointer rounded-xl hover:shadow-md"
                  // onClick={() => router.push(`/dashboard/student/subjects/${child.student_id}`)}
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{child.full_name}</h3>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        child.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {child.is_active ? t('active') : t('inactive')}
                    </span>
                  </div>

                  {/* CLASS */}
                  <p className="mb-3 text-sm text-gray-500">
                    {t('subject')}: {child.class_name}
                  </p>

                  {/* STATS */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2 rounded-lg bg-gray-50">
                      <p className="text-xs text-gray-400">{t('score')}</p>
                      <p className="font-semibold text-gray-800">{child.score}</p>
                    </div>

                    <div className="p-2 rounded-lg bg-gray-50">
                      <p className="text-xs text-gray-400">{t('coins')}</p>
                      <p className="font-semibold text-gray-800">{child.coin}</p>
                    </div>

                    <div className="p-2 rounded-lg bg-gray-50">
                      <p className="text-xs text-gray-400">{t('remainingDays')}</p>
                      <p className="font-semibold text-gray-800">{child.remaining_days}</p>
                    </div>
                  </div>

                  {/* SUBSCRIPTION */}
                  <div className="mt-3 text-sm text-gray-600">
                    {t('subscriptionEnd')}: <span className="font-medium text-gray-800">{child.subscription_end}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {apiRole === 'tutor' && (
        <div className="space-y-6">
          {/* ================= TUTOR INFO ================= */}
          <div className="p-6 bg-white border rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full">
                  <span className="text-xl font-bold text-white">{studentData.full_name?.[0]}</span>
                </div>

                <div>
                  <h1 className="text-xl font-bold">{studentData.full_name}</h1>
                  <p className="text-sm text-gray-500">{studentData.phone}</p>
                  <p className="text-sm text-gray-500">ID: {studentData.identification}</p>
                </div>
              </div>

              {/* STATUS */}
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  studentData.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                }`}
              >
                {studentData.status ? t('active') : t('inactive')}
              </span>
            </div>

            {/* REGISTERED */}
            <div className="mt-4 text-sm text-gray-500">
              {t('registrationDate')}: <span className="font-medium text-gray-800">{studentData.registered_at}</span>
            </div>
          </div>

          {/* ================= REFERRAL STUDENTS ================= */}
          <div className="p-6 bg-white border rounded-xl">
            <h2 className="mb-4 font-semibold">
              {t('referralStudents')} ({studentData.referral_students_count})
            </h2>

            {studentData.referral_students?.length === 0 ? (
              <p className="text-sm text-gray-400">{t('noData')}</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {studentData?.referral_students?.map((student) => (
                  <div key={student.student_id} className="p-4 transition bg-white border rounded-xl hover:shadow-md">
                    {/* HEADER */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{student.full_name}</h3>
                        <p className="text-sm text-gray-500">{student.phone}</p>
                        <p className="text-xs text-gray-400">ID: {student.identification}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-400">{t('joinedAt')}</p>
                        <p className="text-sm font-medium text-gray-800">{student.joined_at}</p>
                      </div>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="p-3 text-center rounded-lg bg-gray-50">
                        <p className="text-xs text-gray-400">{t('paymentAmount')}</p>
                        <p className="font-semibold text-gray-800">{student.payment_amount}</p>
                      </div>

                      <div className="p-3 text-center rounded-lg bg-gray-50">
                        <p className="text-xs text-gray-400">{t('bonusAmount')}</p>
                        <p className="font-semibold text-gray-800">{student.bonus_amount}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= COUPON STUDENTS ================= */}
          <div className="p-6 bg-white border rounded-xl">
            <h2 className="mb-4 font-semibold">
              {t('couponStudents')} ({studentData.coupon_students_count})
            </h2>

            {studentData.coupon_students?.length === 0 ? (
              <p className="text-sm text-gray-400">{t('noData')}</p>
            ) : (
              <div className="space-y-3">
                {studentData?.coupon_students?.map((student) => (
                  <div key={student.student_id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{student.full_name}</h3>
                    <p className="text-sm text-gray-500">{student.phone}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= STUDENT VIEW ================= */}
      {apiRole === 'student' && <StudentSubjectsList />}

      {/* MODAL */}
      <StudentRewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        student={{ id, full_name: studentData.full_name }}
      />
    </div>
  )
}

export default StudentDetails
