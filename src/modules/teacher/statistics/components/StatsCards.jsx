import React from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

const StatsCards = ({ data }) => {
  const { t } = useTranslation()

  const stats = [
    {
      key: 'totalTeachers',
      value: data?.total_teachers || 0,
      icon: '/icons/teachers-new.svg',
      badge: { value: t('teachers'), color: 'bg-[#E9F9EC] text-[#13DEB9]' }
    },
    {
      key: 'totalStudents',
      value: data?.total_students || 0,
      icon: '/icons/students-new.svg',
      badge: { value: t('students'), color: 'bg-[#E6F4FF] text-[#5D87FF]' }
    },
    {
      key: 'totalParents',
      value: data?.total_parents || 0,
      icon: '/icons/parents-new.svg',
      badge: { value: t('parents'), color: 'bg-[#FFF2E6] text-[#FF8A00]' }
    },
    {
      key: 'totalTutors',
      value: data?.total_tutors || 0,
      icon: '/icons/tutors-new.svg',
      badge: { value: t('tutors'), color: 'bg-[#F3E8FF] text-[#8B5CF6]' }
    },
    {
      key: 'totalAmount',
      value: `${data?.total_amount?.toLocaleString() || 0} so'm`,
      icon: '/icons/wallet-new.svg',
      badge: { value: t('totalRevenue'), color: 'bg-[#E9F9EC] text-[#13DEB9]' }
    },
    {
      key: 'year2025',
      value: `${data?.year_2025?.toLocaleString() || 0} so'm`,
      icon: '/icons/calendar-new.svg',
      badge: { value: t('year2025'), color: 'bg-[#E6F4FF] text-[#5D87FF]' }
    },
    {
      key: 'studentCashback',
      value: `${data?.total_student_cashback || 0} so'm`,
      icon: '/icons/coins-stack.svg',
      badge: { value: t('studentCashback'), color: 'bg-[#E9F9EC] text-[#13DEB9]' }
    },
    {
      key: 'teacherCashback',
      value: `${data?.total_teacher_cashback || 0} so'm`,
      icon: '/icons/coins-single.svg',
      badge: { value: t('teacherCashback'), color: 'bg-[#E6F4FF] text-[#5D87FF]' }
    },
    {
      key: 'activeSubscribers',
      value: data?.active_subscribers || 0,
      icon: '/icons/active-users-new.svg',
      badge: { value: t('activeSubscribers'), color: 'bg-[#E9F9EC] text-[#13DEB9]' }
    },
    {
      key: 'mostSoldPlan',
      value: data?.most_sold_plan || 'N/A',
      icon: '/icons/award-new.svg',
      badge: { value: t('mostSold'), color: 'bg-[#FFF2E6] text-[#FF8A00]' }
    },
    {
      key: 'topCouponType',
      value: data?.top_coupon_type || 'N/A',
      icon: '/icons/clock-orange.svg',
      badge: { value: t('mostUsed'), color: 'bg-[#F3E8FF] text-[#8B5CF6]' }
    },
    {
      key: 'studentsDueWithin5Days',
      value: data?.students_due_within_5_days || 0,
      icon: '/icons/clock-gray.svg',
      badge: { value: t('dueIn5Days'), color: 'bg-[#FFF2E6] text-[#FF8A00]' }
    },
    // {
    //   key: 'totalPayments',
    //   value: data?.total_payments || 0,
    //   icon: '/icons/payment-card.svg',
    //   badge: { value: t('totalPayments'), color: 'bg-[#E6F4FF] text-[#5D87FF]' }
    // },
    {
      key: 'successfulPayments',
      value: data?.successful_payments || 0,
      icon: '/icons/successful-new.svg',
      badge: { value: t('successful'), color: 'bg-[#E9F9EC] text-[#13DEB9]' }
    }
    // {
    //   key: "pendingPayments",
    //   value: data?.pending_payments || 0,
    //   icon: "/icons/payment-card.svg",
    //   badge: { value: t("pending"), color: "bg-[#FFF2E6] text-[#FF8A00]" },
    // },
    // {
    //   key: "failedPayments",
    //   value: data?.failed_payments || 0,
    //   icon: "/icons/failed-new.svg",
    //   badge: { value: t("failed"), color: "bg-[#FFE6E6] text-[#FF4444]" },
    // },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.key}
          className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-4 flex flex-col justify-between min-h-[120px] hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-gray-50 dark:bg-[#2A3547] rounded-lg">
              <Image src={stat.icon} alt={stat.key} width={20} height={20} className={stat.iconClass || ''} />
            </div>
            <div className="flex-1">
              <p className="text-[#7C8FAC] text-xs font-medium mb-1">{stat.badge.value}</p>
              <h3 className="text-lg font-bold text-[#2A3547] dark:text-white leading-6 break-words">{stat.value}</h3>
            </div>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs text-[#A3AED0]">{t(stat.key)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
