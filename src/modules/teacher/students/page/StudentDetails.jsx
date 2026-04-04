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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="bg-white p-6 rounded-xl border">
            <div className="flex flex-col items-center text-center">
              <Image src="/icons/pupil.svg" alt="pupil" width={96} height={96} />
              <h1 className="text-xl font-bold mt-2">{studentData.full_name}</h1>

              <span
                className={`mt-2 px-3 py-1 rounded-full text-xs ${
                  studentData.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {studentData.is_active ? t('active') : t('inactive')}
              </span>

              <button
                onClick={() => setIsRewardModalOpen(true)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                {t('giveReward')}
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border">
            <h3 className="font-semibold mb-4">{t('paymentInfo')}</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm">{t('coins')}</p>
                <p className="font-bold">{studentData.coin}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">{t('score')}</p>
                <p className="font-bold">{studentData.score}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">{t('totalPaid')}</p>
                <p className="font-bold">{studentData.total_paid_amount?.toLocaleString()} UZS</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PARENT VIEW ================= */}
      {apiRole === RolesList.PARENT && (
        <div className="space-y-6">
          {/* Parent Info */}
          <div className="bg-white p-6 rounded-xl border">
            <div className="flex items-center justify-between">
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{studentData.full_name?.[0]}</span>
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
              {t('registrationDate')}: <span className="text-gray-800 font-medium">{studentData.registered_at}</span>
            </div>
          </div>

          {/* Children */}
          <div className="bg-white p-6 rounded-xl border">
            <h2 className="font-semibold mb-4">
              {t('myChildren')} ({studentData.children_count})
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {studentData.children?.map((child) => (
                <div
                  key={child.student_id}
                  className="border rounded-xl p-4 hover:shadow-md transition cursor-pointer bg-white"
                  // onClick={() => router.push(`/dashboard/student/subjects/${child.student_id}`)}
                >
                  {/* HEADER */}
                  <div className="flex justify-between items-center mb-2">
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
                  <p className="text-sm text-gray-500 mb-3">
                    {t('subject')}: {child.class_name}
                  </p>

                  {/* STATS */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-400">{t('score')}</p>
                      <p className="font-semibold text-gray-800">{child.score}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-xs text-gray-400">{t('coins')}</p>
                      <p className="font-semibold text-gray-800">{child.coin}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-2">
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
          <div className="bg-white p-6 rounded-xl border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{studentData.full_name?.[0]}</span>
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
              {t('registrationDate')}: <span className="text-gray-800 font-medium">{studentData.registered_at}</span>
            </div>
          </div>

          {/* ================= REFERRAL STUDENTS ================= */}
          <div className="bg-white p-6 rounded-xl border">
            <h2 className="font-semibold mb-4">
              {t('referralStudents')} ({studentData.referral_students_count})
            </h2>

            {studentData.referral_students?.length === 0 ? (
              <p className="text-gray-400 text-sm">{t('noData')}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {studentData.referral_students.map((student) => (
                  <div key={student.student_id} className="border rounded-xl p-4 hover:shadow-md transition bg-white">
                    {/* HEADER */}
                    <div className="flex justify-between items-start mb-3">
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
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-400">{t('paymentAmount')}</p>
                        <p className="font-semibold text-gray-800">{student.payment_amount}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 text-center">
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
          <div className="bg-white p-6 rounded-xl border">
            <h2 className="font-semibold mb-4">
              {t('couponStudents')} ({studentData.coupon_students_count})
            </h2>

            {studentData.coupon_students?.length === 0 ? (
              <p className="text-gray-400 text-sm">{t('noData')}</p>
            ) : (
              <div className="space-y-3">
                {studentData.coupon_students.map((student) => (
                  <div key={student.student_id} className="border rounded-lg p-4">
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
