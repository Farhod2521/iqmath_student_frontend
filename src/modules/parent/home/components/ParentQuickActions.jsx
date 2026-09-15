import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Zap, Trophy, Users, BarChart3, User } from 'lucide-react'

const ActionTile = ({ icon, iconBg, title, subtitle, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2.5 rounded-xl border border-[#F0F0F0] p-3 text-left transition hover:border-[#DCE2FF] hover:bg-[#F8F9FE]"
  >
    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>{icon}</span>
    <div className="min-w-0">
      <p className="truncate text-sm font-bold text-[#191C1D]">{title}</p>
      <p className="truncate text-[11px] text-[#8A8A8E]">{subtitle}</p>
    </div>
  </button>
)

const ParentQuickActions = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const actions = [
    {
      key: 'ratings',
      icon: <Trophy size={18} className="text-[#F59E0B]" />,
      iconBg: 'bg-[#FFF3DD]',
      title: t('parentHome.quickRatings'),
      subtitle: t('parentHome.quickRatingsSub'),
      onClick: () => router.push('/dashboard/ratings')
    },
    {
      key: 'children',
      icon: <Users size={18} className="text-[#205FFE]" />,
      iconBg: 'bg-[#D7E6FE]',
      title: t('myChildren'),
      subtitle: t('parentHome.quickChildrenSub'),
      onClick: () => router.push('/dashboard/parent/my-children')
    },
    {
      key: 'results',
      icon: <BarChart3 size={18} className="text-[#0D875E]" />,
      iconBg: 'bg-[#DAF5E8]',
      title: t('science_results'),
      subtitle: t('parentHome.quickResultsSub'),
      onClick: () => router.push('/dashboard/parent/results')
    },
    {
      key: 'profile',
      icon: <User size={18} className="text-[#7626FB]" />,
      iconBg: 'bg-[#E3D7FE]',
      title: t('profile'),
      subtitle: t('parentHome.quickProfileSub'),
      onClick: () => router.push('/dashboard/parent/profile')
    }
  ]

  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF0FF] text-[#5D87FF]">
          <Zap size={16} />
        </span>
        <h3 className="text-base font-bold text-[#191C1D]">{t('parentHome.quickActionsTitle')}</h3>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {actions.map((action) => (
          <ActionTile key={action.key} {...action} />
        ))}
      </div>
    </div>
  )
}

export default ParentQuickActions
