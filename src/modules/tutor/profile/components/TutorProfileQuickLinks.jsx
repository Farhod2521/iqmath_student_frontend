import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { ChevronRight, CreditCard, Ticket, Users } from 'lucide-react'

const TutorProfileQuickLinks = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const links = [
    {
      key: 'payment',
      path: '/dashboard/tutor/payment',
      icon: <CreditCard size={22} />,
      iconClass: 'bg-[#EAF0FF] text-[#5D87FF]',
      title: t('tutorPayments.paymentpanel'),
      description: t('tutorProfile.quickPaymentDescription')
    },
    {
      key: 'coupons',
      path: '/dashboard/cupons/list',
      icon: <Ticket size={22} />,
      iconClass: 'bg-[#F1E9FF] text-[#7626FB]',
      title: t('coupons'),
      description: t('tutorProfile.quickCouponsDescription')
    },
    {
      key: 'coupon-users',
      path: '/dashboard/cupons/users',
      icon: <Users size={22} />,
      iconClass: 'bg-[#E7F8EF] text-[#0D875E]',
      title: t('users_with_coupons'),
      description: t('tutorProfile.quickCouponUsersDescription')
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <button
          key={link.key}
          type="button"
          onClick={() => router.push(link.path)}
          className="group flex items-center gap-3.5 rounded-2xl border border-[#F0F0F0] bg-white p-4 text-left shadow-sm transition hover:border-[#D7E2FF] hover:shadow-md"
        >
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${link.iconClass}`}>
            {link.icon}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-base font-bold text-[#191C1D]">{link.title}</span>
            <span className="block truncate text-xs text-[#8A8A8E]">{link.description}</span>
          </span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F1F4FF] text-[#5D87FF] transition group-hover:bg-[#5D87FF] group-hover:text-white">
            <ChevronRight size={18} />
          </span>
        </button>
      ))}
    </div>
  )
}

export default TutorProfileQuickLinks
