import { URLS } from '@/constants/url'
import { usePostQuery } from '@/hooks'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import ContentLoader from '@/components/loader/content-loader'
import { useTranslation } from 'react-i18next'
import StudentRewardModal from '../components/StudentRewardModal'
import { useEffect, useRef, useState } from 'react'
import { useUserStore } from '@/store'
import { RolesList } from '@/layout/libs/menulist'
import StudentOverview from '../overview/StudentOverview'

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
  // O'qituvchi / admin o'quvchini ochsa — kabinet ko'rinishidagi yangi sahifa (chat bilan)
  const isStaffViewer = [RolesList.TEACHER, RolesList.ADMIN, RolesList.SUPERADMIN].includes(user?.role)
  const showStudentOverview = apiRole === 'student' && isStaffViewer

  const { mutate, isLoading } = usePostQuery({
    hideSuccessToast: true
  })

  // 🚀 FETCH DATA
  useEffect(() => {
    if (!id || !session?.accessToken || !apiRole || showStudentOverview) return
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
  }, [id, apiRole, session?.accessToken, showStudentOverview])

  // reset if id changes
  useEffect(() => {
    hasFetchedRef.current = false
  }, [id])

  if (showStudentOverview) {
    return (
      <div className="p-4">
        <StudentOverview studentId={id} />
      </div>
    )
  }

  if (isLoading || !studentData) {
    return <ContentLoader />
  }

  return (
    <div className="p-4 space-y-6">
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
