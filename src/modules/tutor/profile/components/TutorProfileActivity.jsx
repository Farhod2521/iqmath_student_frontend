import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { ArrowRight, Clock, CreditCard, Ticket, UserPlus, Users2 } from 'lucide-react'
import { mockProfileActivity } from '../mock'

const ACTIVITY_META = {
  student: { icon: <UserPlus size={18} />, className: 'bg-[#EAF0FF] text-[#5D87FF]', titleKey: 'activityNewStudent' },
  group: { icon: <Users2 size={18} />, className: 'bg-[#F1E9FF] text-[#7626FB]', titleKey: 'activityGroupCreated' },
  coupon: { icon: <Ticket size={18} />, className: 'bg-[#E7F8EF] text-[#0D875E]', titleKey: 'activityCouponCreated' },
  payment: { icon: <CreditCard size={18} />, className: 'bg-[#FFF3DD] text-[#F59E0B]', titleKey: 'activityPaymentDone' }
}

const TutorProfileActivity = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF0FF] text-[#5D87FF]">
            <Clock size={18} />
          </span>
          <h2 className="truncate text-base font-bold text-[#191C1D] sm:text-lg">
            {t('tutorHome.recentActivityTitle')}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => router.push('/dashboard/tutor/referrals')}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#5D87FF] hover:underline"
        >
          {t('tutorHome.viewAll')}
          <ArrowRight size={15} />
        </button>
      </div>

      {mockProfileActivity.length === 0 ? (
        <p className="mt-6 text-center text-sm text-[#8A8A8E]">{t('tutorHome.recentActivityEmpty')}</p>
      ) : (
        <div className="mt-2 flex flex-col divide-y divide-[#F5F5F5]">
          {mockProfileActivity.map((item) => {
            const meta = ACTIVITY_META[item.type]
            const time = item.hours
              ? t('tutorHome.hoursAgo', { count: item.hours })
              : t('tutorHome.daysAgo', { count: item.days })

            return (
              <div key={item.key} className="flex items-center gap-3 py-2.5">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.className}`}>
                  {meta.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#191C1D]">{t(`tutorHome.${meta.titleKey}`)}</p>
                  <p className="truncate text-xs text-[#8A8A8E]">{item.subtitle}</p>
                </div>
                <span className="shrink-0 text-xs text-[#8A8A8E]">{time}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TutorProfileActivity
