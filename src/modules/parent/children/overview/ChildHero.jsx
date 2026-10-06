import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { CalendarDays, ChevronRight, Clock3, Crown, ChartColumnIncreasing, BadgeCheck, Smartphone } from 'lucide-react'
import SwitchToChildButton from '../components/SwitchToChildButton'
import { Initials } from '@/modules/parent/home/dashboard/shared'
import { formatDate, formatDateTime, formatDuration } from './format'

const InfoChip = ({ icon: Icon, label, value }) => (
  <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
    <Icon size={22} className="shrink-0 text-[#2563EB]" />
    <div className="min-w-0">
      <p className="truncate text-[11px] text-[#64748B]">{label}</p>
      <p className="truncate text-sm font-bold text-[#0F172A]">{value || '—'}</p>
    </div>
  </div>
)

/** Yuqori qism: breadcrumb, profil, uchta ma'lumot va obuna kartasi */
const ChildHero = ({ profile, subscription, onDetails, onExtend, onSetPhone, tabLabel }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const sub = subscription
  const elapsed = sub?.total_days
    ? Math.min(100, Math.max(0, ((sub.total_days - sub.days_left) / sub.total_days) * 100))
    : 0

  return (
    <div className="space-y-3">
      <nav className="flex flex-wrap items-center gap-1.5 text-sm text-[#64748B]">
        <button type="button" onClick={() => router.push('/dashboard/parent/home')} className="hover:text-[#2563EB]">
          {t('childPage.home')}
        </button>
        <ChevronRight size={14} />
        <button
          type="button"
          onClick={() => router.push('/dashboard/parent/my-children')}
          className="hover:text-[#2563EB]"
        >
          {t('childPage.children')}
        </button>
        <ChevronRight size={14} />
        <span className={tabLabel ? '' : 'font-semibold text-[#0F172A] dark:text-white'}>{profile.full_name}</span>
        {tabLabel ? (
          <>
            <ChevronRight size={14} />
            <span className="font-semibold text-[#0F172A] dark:text-white">{tabLabel}</span>
          </>
        ) : null}
      </nav>

      <section className="relative overflow-hidden rounded-3xl bg-[#DCE9FF]">
        <img
          src="/images/parant-back.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[65%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#EAF2FF] via-[#EAF2FF]/80 to-transparent" />

        <div className="relative grid grid-cols-1 gap-5 p-5 md:p-7 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-center">
          <div>
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-white p-1.5 shadow-lg">
                <Initials name={profile.full_name} className="h-20 w-20 text-2xl md:h-24 md:w-24" />
              </span>
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-extrabold text-[#0B1B3F] md:text-[28px]">{profile.full_name}</h1>
                <p className="mt-1 text-sm text-[#475569]">
                  {profile.class_name ? t('parentDash.grade', { grade: profile.class_name }) : ''}
                  {profile.class_name ? ' • ' : ''}ID: {profile.identification}
                </p>
                <span
                  className={`mt-2 inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                    profile.is_active ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#F1F5F9] text-[#64748B]'
                  }`}
                >
                  <BadgeCheck size={14} />
                  {profile.is_active ? t('childPage.activeStudent') : t('childPage.inactiveStudent')}
                </span>
                {profile.has_phone === false ? (
                  <span className="ml-2 mt-2 inline-flex items-center gap-1 rounded-lg bg-[#FEF3C7] px-2.5 py-1 text-xs font-semibold text-[#B45309]">
                    <Smartphone size={14} />
                    {t('childSwitch.noPhone')}
                  </span>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-2">
                  <SwitchToChildButton childId={profile.id} />
                  {profile.has_phone === false && onSetPhone ? (
                    <button
                      type="button"
                      onClick={onSetPhone}
                      className="inline-flex h-10 items-center gap-2 rounded-xl bg-white/90 px-4 text-sm font-semibold text-[#2563EB] shadow-sm backdrop-blur transition hover:bg-white"
                    >
                      <Smartphone size={17} />
                      {t('childSwitch.attachPhone')}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 xl:max-w-[640px]">
              <InfoChip
                icon={CalendarDays}
                label={t('childPage.registered')}
                value={formatDate(profile.registered_at)}
              />
              <InfoChip icon={Clock3} label={t('childPage.lastLogin')} value={formatDateTime(profile.last_login)} />
              <InfoChip
                icon={ChartColumnIncreasing}
                label={t('childPage.studyTime')}
                value={formatDuration(profile.study_time_seconds, t)}
              />
            </div>
          </div>

          {/* Obuna kartasi */}
          <div className="rounded-2xl bg-white p-5 shadow-[0_20px_40px_-25px_rgba(15,23,42,0.5)] dark:bg-[#111A2B]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Crown size={30} className="shrink-0 fill-[#FBBF24] text-[#F59E0B]" />
                <div>
                  <p className="text-xs font-semibold text-[#16A34A]">
                    {sub?.is_active ? t('childPage.activeSub') : t('childPage.noSub')}
                  </p>
                  <p className="text-lg font-extrabold text-[#0B1B3F] dark:text-white">
                    {sub?.months ? t('childPage.monthsPlan', { n: sub.months }) : t('childPage.plan')}
                  </p>
                </div>
              </div>
              {sub?.is_active ? (
                <span className="shrink-0 rounded-lg bg-[#DCFCE7] px-2.5 py-1 text-xs font-bold text-[#16A34A]">
                  {t('childPage.daysLeft', { n: sub.days_left })}
                </span>
              ) : null}
            </div>
            {sub ? (
              <>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E5EAF2]">
                  <div className="h-full rounded-full bg-[#2563EB]" style={{ width: `${elapsed}%` }} />
                </div>
                <div className="mt-1.5 flex justify-between text-[11px] text-[#64748B]">
                  <span>{formatDate(sub.start_date)}</span>
                  <span>{formatDate(sub.end_date)}</span>
                </div>
              </>
            ) : null}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onExtend}
                className="h-10 rounded-xl bg-[#2563EB] text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
              >
                {t('childPage.extend')}
              </button>
              <button
                type="button"
                onClick={onDetails}
                className="h-10 rounded-xl bg-[#EAF1FF] text-sm font-semibold text-[#2563EB] transition hover:bg-[#DCE8FF]"
              >
                {t('childPage.details')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ChildHero
