import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import {
  Plus,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Calendar,
  Clock,
  Coins,
  UserPlus,
  Award
} from 'lucide-react'

const AVATAR_COLORS = ['#5D87FF', '#8B5CF6', '#22C55E', '#F59E0B', '#EC4899']

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F8F9FE] text-[#5A6A85]">
      {icon}
    </span>
    <div className="min-w-0">
      <p className="text-[11px] text-[#8A8A8E]">{label}</p>
      <p className="truncate text-sm font-semibold text-[#191C1D]">{value}</p>
    </div>
  </div>
)

const ParentChildrenCard = ({ children, isLoading, onAddChild, onDownloadCertificate }) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF0FF] text-[#5D87FF]">
            <UserPlus size={16} />
          </span>
          <h3 className="text-base font-bold text-[#191C1D]">{t('myChildren')}</h3>
        </div>
        <button
          onClick={onAddChild}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#5D87FF] px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-[#4570EA]"
        >
          <Plus size={16} />
          {t('childAdd')}
        </button>
      </div>

      {isLoading ? (
        <div className="mt-3 flex flex-col gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 w-full animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : !children || children.length === 0 ? (
        <div className="mt-4 flex flex-col items-center py-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF0FF]">
            <UserPlus size={22} className="text-[#5D87FF]" />
          </div>
          <p className="mt-3 text-sm text-[#8A8A8E]">{t('noChildrenDescriptionAdd')}</p>
        </div>
      ) : (
        <div className="mt-3 flex flex-col gap-3">
          {children.map((child, index) => (
            <div key={child.id ?? index} className="rounded-xl border border-[#F0F0F0] p-3.5">
              <button
                onClick={() => router.push(`/dashboard/parent/my-children/${child.id}`)}
                className="flex w-full items-center gap-3 text-left"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
                  style={{ backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
                >
                  {child.full_name?.charAt(0).toUpperCase() || '?'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#191C1D]">{child.full_name}</p>
                  <p className="text-xs text-[#8A8A8E]">ID: {child.identification}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    child.status ? 'bg-[#E7F8EF] text-[#0D875E]' : 'bg-[#FFF0F0] text-[#E5484D]'
                  }`}
                >
                  {child.status ? t('statusActive') : t('statusInactive')}
                </span>
                <ChevronRight size={18} className="shrink-0 text-[#B0B6C9]" />
              </button>

              <div className="mt-3 grid grid-cols-1 gap-2.5 border-t border-[#F5F5F5] pt-3 sm:grid-cols-2">
                <DetailItem
                  icon={<GraduationCap size={16} />}
                  label={t('class')}
                  value={`${child.class_num || '—'} ${t('studentHome.classSuffix')}`}
                />
                <DetailItem icon={<BookOpen size={16} />} label={t('subjectUz')} value={child.subject_name_uz || '—'} />
                <DetailItem
                  icon={<Calendar size={16} />}
                  label={t('loginDate')}
                  value={child.registration_date || '—'}
                />
                <DetailItem
                  icon={<Clock size={16} />}
                  label={t('subscriptionEnd')}
                  value={`${child.subscription_end_date || '—'}${
                    child.remaining_days != null ? ` (${child.remaining_days} ${t('remainingDays')})` : ''
                  }`}
                />
                <DetailItem icon={<Clock size={16} />} label={t('lastLogin')} value={child.last_login_time || '—'} />
                <DetailItem
                  icon={<Coins size={16} />}
                  label={t('lastPayment')}
                  value={`${child.last_payment_amount?.toLocaleString() ?? 0} ${t('sum')}`}
                />
              </div>

              {child.status ? (
                <button
                  onClick={() => onDownloadCertificate(child.id)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#5D87FF] py-2.5 text-sm font-semibold text-white transition hover:bg-[#4570EA]"
                >
                  <Award size={16} />
                  {t('downloadCertificate')}
                </button>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ParentChildrenCard
