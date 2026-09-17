import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import {
  Users,
  GraduationCap,
  UsersRound,
  BookOpenCheck,
  Wallet,
  CalendarDays,
  Coins,
  CircleDollarSign,
  BadgeCheck,
  Crown,
  Clock,
  Hourglass,
  CheckCircle2
} from 'lucide-react'

const StatsCards = ({ data }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const statToFilterMap = {
    totalStudents: { role: 'student' },
    totalTeachers: { role: 'teacher' },
    totalParents: { role: 'parent' },
    totalTutors: { role: 'tutor' },
    activeSubscribers: { status: 'active' }
  }

  const handleNavigate = (key) => {
    const query = statToFilterMap[key]
    if (!query) return

    router.push({
      pathname: '/dashboard/teacher/pupils',
      query
    })
  }

  const stats = [
    {
      key: 'totalTeachers',
      value: data?.total_teachers || 0,
      icon: Users,
      badge: { value: t('teachers') },
      accent: '#8B5CF6',
      tint: 'bg-[#F6F1FF]'
    },
    {
      key: 'totalStudents',
      value: data?.total_students || 0,
      icon: GraduationCap,
      badge: { value: t('students') },
      accent: '#5D87FF',
      tint: 'bg-[#EFF4FF]'
    },
    {
      key: 'totalParents',
      value: data?.total_parents || 0,
      icon: UsersRound,
      badge: { value: t('parents') },
      accent: '#13B981',
      tint: 'bg-[#ECFDF5]'
    },
    {
      key: 'totalTutors',
      value: data?.total_tutors || 0,
      icon: BookOpenCheck,
      badge: { value: t('tutors') },
      accent: '#FF8A00',
      tint: 'bg-[#FFF6EC]'
    },
    {
      key: 'totalAmount',
      value: `${data?.total_amount?.toLocaleString() || 0} so'm`,
      icon: Wallet,
      badge: { value: t('totalRevenue') },
      accent: '#4F6DF5',
      tint: 'bg-[#EEF2FF]'
    },
    {
      key: 'year2025',
      value: `${data?.year_2025?.toLocaleString() || 0} so'm`,
      icon: CalendarDays,
      badge: { value: t('year2025') },
      accent: '#EC4899',
      tint: 'bg-[#FFF0F6]'
    },
    {
      key: 'studentCashback',
      value: `${data?.total_student_cashback || 0} so'm`,
      icon: Coins,
      badge: { value: t('studentCashback') },
      accent: '#3B82F6',
      tint: 'bg-[#EEF6FF]'
    },
    {
      key: 'teacherCashback',
      value: `${data?.total_teacher_cashback || 0} so'm`,
      icon: CircleDollarSign,
      badge: { value: t('teacherCashback') },
      accent: '#10B981',
      tint: 'bg-[#ECFDF5]'
    },
    {
      key: 'activeSubscribers',
      value: data?.active_subscribers || 0,
      icon: BadgeCheck,
      badge: { value: t('activeSubscribers') },
      accent: '#6366F1',
      tint: 'bg-[#EEF0FF]'
    },
    {
      key: 'mostSoldPlan',
      value: data?.most_sold_plan || 'N/A',
      icon: Crown,
      badge: { value: t('mostSold') },
      accent: '#F59E0B',
      tint: 'bg-[#FFF9E9]'
    },
    {
      key: 'topCouponType',
      value: data?.top_coupon_type || 'N/A',
      icon: Clock,
      badge: { value: t('mostUsed') },
      accent: '#FB7185',
      tint: 'bg-[#FFEEF0]'
    },
    {
      key: 'studentsDueWithin5Days',
      value: data?.students_due_within_5_days || 0,
      icon: Hourglass,
      badge: { value: t('dueIn5Days') },
      accent: '#A855F7',
      tint: 'bg-[#F8F0FF]'
    },
    {
      key: 'successfulPayments',
      value: data?.successful_payments || 0,
      icon: CheckCircle2,
      badge: { value: t('successful') },
      accent: '#22C55E',
      tint: 'bg-[#EFFCF3]'
    }
  ]

  return (
    <div className="grid grid-cols-2 gap-3 mb-8 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {stats.map((stat) => {
        const isClickable = !!statToFilterMap[stat.key]
        const Icon = stat.icon
        return (
          <div
            key={stat.key}
            onClick={() => handleNavigate(stat.key)}
            className={`relative overflow-hidden rounded-2xl border border-black/5 dark:border-[#232D3A] ${stat.tint} dark:bg-[#202936] p-3 sm:p-4 min-h-[110px] sm:min-h-[120px] flex flex-col justify-between transition-transform ${isClickable ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md' : ''}`}
          >
            {/* Fon dekorativ ikonka — kattalashtirilgan, xira, kartaning teg orqasida */}
            <Icon
              className="pointer-events-none absolute -bottom-4 -right-4 h-16 w-16 opacity-10 sm:h-24 sm:w-24"
              style={{ color: stat.accent }}
              strokeWidth={1.5}
            />

            <div className="relative flex items-start gap-2 sm:gap-3">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm sm:h-10 sm:w-10 sm:rounded-xl"
                style={{ backgroundColor: stat.accent }}
              >
                <Icon className="h-4 w-4 text-white sm:h-5 sm:w-5" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[#7C8FAC] text-[11px] sm:text-xs font-medium mb-0.5 sm:mb-1 truncate">
                  {stat.badge.value}
                </p>
                <h3 className="text-base sm:text-lg font-bold text-[#2A3547] dark:text-white leading-5 sm:leading-6 break-words">
                  {stat.value}
                </h3>
              </div>
            </div>
            <div className="relative flex items-center justify-between mt-2 sm:mt-3">
              <span className="text-[10px] sm:text-xs text-[#8992A6] truncate">{t(stat.key)}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StatsCards
