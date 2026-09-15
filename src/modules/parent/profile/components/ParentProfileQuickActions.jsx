import { useTranslation } from 'react-i18next'
import { Zap, Edit3, KeyRound, Trash2, ChevronRight } from 'lucide-react'

const ActionRow = ({ icon, iconBg, iconColor, title, subtitle, onClick }) => (
  <button
    onClick={onClick}
    className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#F8F9FE]"
  >
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
      style={{ backgroundColor: iconBg, color: iconColor }}
    >
      {icon}
    </span>
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-bold text-[#191C1D]">{title}</p>
      <p className="truncate text-xs text-[#8A8A8E]">{subtitle}</p>
    </div>
    <ChevronRight size={16} className="shrink-0 text-[#B0B6C9]" />
  </button>
)

const ParentProfileQuickActions = ({ onEditInfo, onChangePassword, onDeleteAccount }) => {
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF0FF] text-[#5D87FF]">
          <Zap size={16} />
        </span>
        <h3 className="text-base font-bold text-[#191C1D]">{t('parentProfile.quickActionsTitle')}</h3>
      </div>

      <div className="mt-2 flex flex-col">
        <ActionRow
          icon={<Edit3 size={18} />}
          iconBg="#EAF0FF"
          iconColor="#5D87FF"
          title={t('parentProfile.editInfoAction')}
          subtitle={t('parentProfile.editInfoActionSub')}
          onClick={onEditInfo}
        />
        <ActionRow
          icon={<KeyRound size={18} />}
          iconBg="#FFF0F0"
          iconColor="#E5484D"
          title={t('changePassword')}
          subtitle={t('parentProfile.changePasswordActionSub')}
          onClick={onChangePassword}
        />
        <ActionRow
          icon={<Trash2 size={18} />}
          iconBg="#FFF0F0"
          iconColor="#E5484D"
          title={t('parentProfile.deleteAccount')}
          subtitle={t('parentProfile.deleteAccountSub')}
          onClick={onDeleteAccount}
        />
      </div>
    </div>
  )
}

export default ParentProfileQuickActions
