import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import {
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Copy,
  Hash,
  Mail,
  MapPin,
  Pencil,
  Phone,
  User
} from 'lucide-react'

const Row = ({ icon, label, value, suffix }) => (
  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
    <div className="flex items-center gap-2.5 text-sm font-medium text-[#5A6A85] sm:w-[180px] sm:shrink-0">
      <span className="text-[#8A8A8E]">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
    <div className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-xl bg-[#F6F8FB] px-4 py-3">
      <span className="truncate text-sm font-semibold text-[#191C1D]">{value || '-'}</span>
      {suffix}
    </div>
  </div>
)

const TutorProfileInfo = ({ profile, isLoading, onEdit }) => {
  const { t } = useTranslation()

  const identification = profile.identification

  const handleCopyId = async () => {
    if (!identification) return
    try {
      await navigator.clipboard.writeText(String(identification))
      toast.success(t('tutorProfile.idCopied'))
    } catch (err) {
      toast.error(t('copyError'))
    }
  }

  const rows = [
    { key: 'full_name', icon: <User size={18} />, label: t('tutorProfile.fullName'), value: profile.fullName },
    {
      key: 'phone',
      icon: <Phone size={18} />,
      label: t('tutorProfile.phone'),
      value: profile.phone,
      suffix: profile.phone ? (
        <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#DCF6E6] px-2 py-0.5 text-xs font-semibold text-[#0D875E]">
          <Check size={12} strokeWidth={3} />
          {t('tutorProfile.verified')}
        </span>
      ) : null
    },
    { key: 'email', icon: <Mail size={18} />, label: t('tutorProfile.email'), value: profile.email },
    { key: 'address', icon: <MapPin size={18} />, label: t('tutorProfile.address'), value: profile.address },
    {
      key: 'position',
      icon: <BriefcaseBusiness size={18} />,
      label: t('tutorProfile.position'),
      value: t('tutorProfile.roleBadge')
    },
    {
      key: 'subject',
      icon: <BookOpen size={18} />,
      label: t('tutorProfile.subject'),
      value: t('tutorProfile.subjectValue')
    },
    {
      key: 'identification',
      icon: <Hash size={18} />,
      label: t('tutorProfile.systemId'),
      value: identification,
      suffix: identification ? (
        <button
          type="button"
          onClick={handleCopyId}
          className="shrink-0 rounded-lg p-1 text-[#8A8A8E] transition hover:bg-white hover:text-[#5D87FF]"
          aria-label={t('tutorProfile.idCopied')}
        >
          <Copy size={16} />
        </button>
      ) : null
    },
    {
      key: 'registered',
      icon: <CalendarDays size={18} />,
      label: t('tutorProfile.registeredAt'),
      value: profile.registeredAt
    }
  ]

  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF0FF] text-[#5D87FF]">
            <User size={18} />
          </span>
          <h2 className="text-base font-bold text-[#191C1D] sm:text-lg">{t('tutorProfile.personalInfoTitle')}</h2>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#EAF0FF] px-3.5 py-2 text-sm font-semibold text-[#4968F4] transition hover:bg-[#DCEAFB]"
        >
          <Pencil size={15} />
          <span className="hidden sm:inline">{t('tutorProfile.edit')}</span>
        </button>
      </div>

      {isLoading ? (
        <div className="mt-4 flex flex-col gap-2.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 w-full animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-2.5">
          {rows.map((row) => (
            <Row key={row.key} {...row} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TutorProfileInfo
