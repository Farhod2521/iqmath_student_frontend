import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ArrowUp, ArrowDown, BookOpen, CalendarCheck, Target, Users } from 'lucide-react'
import { card, pickLang } from './shared'

/** Yuqoridagi banner: fon rasmi, salomlashuv va rasm ustida 5 ta statistika kartasi */
export const ParentHero = ({ data }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const firstName = (data?.parent?.full_name || '').split(' ')[0]

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#DCE9FF]">
      <img
        src="/images/parant-back.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#EAF2FF] via-[#EAF2FF]/80 to-transparent md:via-[#EAF2FF]/50" />

      <div className="relative grid grid-cols-1 items-center gap-6 p-5 md:p-7 xl:grid-cols-[minmax(0,1fr)_minmax(0,600px)]">
        <div className="max-w-xl">
          <p className="text-base font-semibold text-[#334155]">
            {t('parentDash.welcome')} {firstName} <span aria-hidden="true">👋</span>
          </p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight text-[#0B1B3F] md:text-[30px]">
            {t('parentDash.heroTitle')}
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[#475569]">{t('parentDash.heroText')}</p>
          <button
            type="button"
            onClick={() => router.push('/dashboard/parent/my-children')}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-[#2563EB] px-5 text-sm font-semibold text-white shadow-[0_10px_22px_-10px_rgba(37,99,235,0.9)] transition hover:bg-[#1D4ED8]"
          >
            {t('parentDash.heroButton')}
            <ArrowRight size={17} />
          </button>
        </div>

        {/* Statistika — o'ng tomonda 2×2, rasm ustida yarim shaffof kartalarda */}
        <ParentStats data={data} glass />
      </div>
    </section>
  )
}

const Delta = ({ value, suffix = '' }) => {
  if (value === null || value === undefined) return null
  const up = value >= 0
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-bold ${
        up ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEE2E2] text-[#DC2626]'
      }`}
    >
      {up ? <ArrowUp size={11} strokeWidth={3} /> : <ArrowDown size={11} strokeWidth={3} />}
      {up ? '+' : ''}
      {value}
      {suffix}
    </span>
  )
}

const StatCard = ({ icon: Icon, color, soft, label, value, extra, footer, glass }) => (
  <div
    className={`${
      glass
        ? 'rounded-2xl border border-white/70 bg-white/85 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#111A2B]/85'
        : card
    } flex items-center gap-3 p-4`}
  >
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
      style={{ backgroundColor: soft, color }}
    >
      <Icon size={22} />
    </span>
    <div className="min-w-0 flex-1">
      <p className="truncate text-xs font-medium text-[#64748B]">{label}</p>
      <p className="flex flex-wrap items-center gap-2 text-2xl font-extrabold text-[#0B1B3F] dark:text-white">
        {value}
        {extra}
      </p>
      {footer ? <div className="truncate text-xs text-[#8A93A6]">{footer}</div> : null}
    </div>
  </div>
)

/** 5 ta statistika kartasi */
export const ParentStats = ({ data, glass = false }) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const summary = data?.summary || {}
  const subjects = (summary.subjects || []).map((s) => pickLang(s, 'name', i18n.language))

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <StatCard
        glass={glass}
        icon={Users}
        color="#2563EB"
        soft="#EAF1FF"
        label={t('parentDash.childrenCount')}
        value={summary.children_count ?? 0}
        footer={
          <button
            type="button"
            onClick={() => router.push('/dashboard/parent/my-children')}
            className="inline-flex items-center gap-1 font-semibold text-[#2563EB]"
          >
            {t('parentDash.viewAll')} <ArrowRight size={12} />
          </button>
        }
      />
      <StatCard
        glass={glass}
        icon={BookOpen}
        color="#16A34A"
        soft="#E7F8EE"
        label={t('parentDash.subjectsCount')}
        value={subjects.length}
        footer={subjects.join(', ') || '—'}
      />
      <StatCard
        glass={glass}
        icon={Target}
        color="#EF4444"
        soft="#FEECEC"
        label={t('parentDash.activity')}
        value={`${summary.activity?.percent ?? 0}%`}
        extra={<Delta value={summary.activity?.delta} suffix="%" />}
        footer={t('parentDash.vsLastMonth')}
      />
      <StatCard
        glass={glass}
        icon={CalendarCheck}
        color="#7C3AED"
        soft="#F1EBFF"
        label={t('parentDash.solved')}
        value={summary.solved?.count ?? 0}
        extra={<Delta value={summary.solved?.delta} />}
        footer={t('parentDash.last30')}
      />
    </div>
  )
}
