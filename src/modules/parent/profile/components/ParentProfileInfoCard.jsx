import { useTranslation } from 'react-i18next'
import { User, Phone, Users, CreditCard, Calendar, Edit3 } from 'lucide-react'

const Row = ({ icon, label, value }) => (
  <div className="flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0">
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F1F4FF] text-[#5D87FF]">
        {icon}
      </span>
      <p className="text-sm text-[#5A6A85]">{label}</p>
    </div>
    <p className="truncate text-sm font-bold text-[#191C1D]">{value || '—'}</p>
  </div>
)

const ParentProfileInfoCard = ({ fullName, phone, identification, createdAt, onEdit }) => {
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF0FF] text-[#5D87FF]">
            <User size={16} />
          </span>
          <h3 className="text-base font-bold text-[#191C1D]">{t('parentProfile.personalInfo')}</h3>
        </div>
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#F1F4FF] px-3.5 py-2 text-sm font-semibold text-[#5D87FF] transition hover:bg-[#E4EAFF]"
        >
          <Edit3 size={14} />
          {t('editProfile')}
        </button>
      </div>

      <div className="mt-2 flex flex-col divide-y divide-[#F5F5F5]">
        <Row icon={<User size={16} />} label={t('fullName')} value={fullName} />
        <Row icon={<Phone size={16} />} label={t('phoneNumber')} value={phone} />
        <Row icon={<Users size={16} />} label={t('parentProfile.roleLabel')} value={t('parent')} />
        <Row icon={<CreditCard size={16} />} label={t('parentProfile.userId')} value={identification} />
        <Row icon={<Calendar size={16} />} label={t('parentProfile.createdAt')} value={createdAt} />
      </div>
    </div>
  )
}

export default ParentProfileInfoCard
