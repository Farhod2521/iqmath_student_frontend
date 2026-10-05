import { useTranslation } from 'react-i18next'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BookOpen,
  CalendarDays,
  ChevronRight,
  CircleCheck,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  Crown,
  LogIn,
  MonitorSmartphone,
  Shapes,
  Sigma,
  Calculator,
  Target,
  Trophy,
  UserRound,
  Waypoints
} from 'lucide-react'
import { CardHeader, EmptyNote, card, formatWhen, pickLang, subjectColor } from '@/modules/parent/home/dashboard/shared'
import { formatDate, formatDateTime, formatDuration, formatMoney } from './format'

/* ------------------------------------------------------------------ */
/* Statistika kartalari                                               */
/* ------------------------------------------------------------------ */

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

const Stat = ({ icon: Icon, color, soft, label, value, delta, deltaSuffix, footer }) => (
  <div className={`${card} flex items-center gap-3 p-4`}>
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
      style={{ backgroundColor: soft, color }}
    >
      <Icon size={22} />
    </span>
    <div className="min-w-0">
      <p className="truncate text-xs text-[#64748B]">{label}</p>
      <p className="flex flex-wrap items-center gap-2 text-2xl font-extrabold text-[#0B1B3F] dark:text-white">
        <span className="truncate">{value}</span>
        <Delta value={delta} suffix={deltaSuffix} />
      </p>
      <p className="truncate text-xs text-[#8A93A6]">{footer}</p>
    </div>
  </div>
)

export const ChildStats = ({ stats }) => {
  const { t } = useTranslation()
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
      <Stat
        icon={CalendarDays}
        color="#7C3AED"
        soft="#F1EBFF"
        label={t('childPage.activity')}
        value={`${stats.activity.percent}%`}
        delta={stats.activity.delta}
        deltaSuffix="%"
        footer={t('childPage.vsLastMonth')}
      />
      <Stat
        icon={BookOpen}
        color="#16A34A"
        soft="#E7F8EE"
        label={t('childPage.subjectsStudied')}
        value={`${stats.subjects.studied} / ${stats.subjects.total}`}
        footer={t('childPage.allSubjectsActive')}
      />
      <Stat
        icon={Clock3}
        color="#F59E0B"
        soft="#FFF6E0"
        label={t('childPage.studyTime30')}
        value={formatDuration(stats.study_time_30, t)}
        footer={t('childPage.last30')}
      />
      <Stat
        icon={ClipboardCheck}
        color="#2563EB"
        soft="#EAF1FF"
        label={t('childPage.testsDone')}
        value={stats.tests.count}
        delta={stats.tests.delta}
        footer={t('childPage.allTests')}
      />
      <Stat
        icon={Target}
        color="#EF4444"
        soft="#FEECEC"
        label={t('childPage.avgResult')}
        value={`${stats.correct.percent}%`}
        delta={stats.correct.delta}
        deltaSuffix="%"
        footer={t('childPage.avgResultSub')}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Fanlar bo'yicha natijalar                                          */
/* ------------------------------------------------------------------ */

const subjectIcon = (name) =>
  /algebr|алгебр/i.test(name) ? Sigma : /geometr|геометр/i.test(name) ? Shapes : Calculator

export const SubjectResults = ({ items = [], limit, onViewAll }) => {
  const { t, i18n } = useTranslation()
  const shown = limit ? items.slice(0, limit) : items
  return (
    <div className={`${card} h-full p-4 sm:p-5`}>
      <CardHeader
        icon={UserRound}
        title={t('childPage.subjectResults')}
        right={
          onViewAll && items.length > (limit || 0) ? (
            <button
              type="button"
              onClick={onViewAll}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB]"
            >
              {t('parentDash.viewAll')} <ArrowRight size={13} />
            </button>
          ) : null
        }
      />
      {!shown.length ? (
        <EmptyNote>{t('childPage.noData')}</EmptyNote>
      ) : (
        <div className="space-y-3">
          {shown.map((item, index) => {
            const name = pickLang(item, 'name', i18n.language)
            const color = subjectColor(item.name_uz, index)
            const Icon = subjectIcon(item.name_uz)
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-[#EEF1F6] p-3.5 dark:border-[#26324A]"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${color}1A`, color }}
                >
                  <Icon size={24} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-[#0F172A] dark:text-white">
                    {name}
                    {item.class_name ? (
                      <span className="ml-2 rounded-md bg-[#EAF1FF] px-1.5 py-0.5 text-[11px] font-semibold text-[#2563EB]">
                        {t('parentDash.grade', { grade: item.class_name })}
                      </span>
                    ) : null}
                  </p>
                  <div className="mt-1 flex items-center gap-3">
                    <span
                      className="rounded-md px-1.5 text-xs font-bold"
                      style={{ backgroundColor: `${color}1A`, color }}
                    >
                      {item.percent}%
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#EDF1F8]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.percent}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                  <p className="mt-1 text-[11px] text-[#94A3B8]">
                    {t('childPage.testsCount', { n: item.tests })} • {t('childPage.diagCount', { n: item.diagnostics })}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm text-[#0F172A] dark:text-white">
                    <b>{item.completed_topics}</b> / {item.total_topics}
                  </p>
                  <p className="text-[11px] text-[#94A3B8]">{t('childPage.topics')}</p>
                </div>
                <ChevronRight size={18} className="hidden shrink-0 text-[#94A3B8] sm:block" />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* So'nggi faoliyatlar                                                */
/* ------------------------------------------------------------------ */

const RECENT = {
  login: { Icon: LogIn, color: '#16A34A', soft: '#E7F8EE' },
  topic_test: { Icon: ClipboardList, color: '#2563EB', soft: '#EAF1FF' },
  diagnostic: { Icon: BookOpen, color: '#7C3AED', soft: '#F1EBFF' },
  achievement: { Icon: Trophy, color: '#F59E0B', soft: '#FFF6E0' }
}

export const ChildRecent = ({ items = [], limit, onViewAll }) => {
  const { t, i18n } = useTranslation()
  const shown = limit ? items.slice(0, limit) : items
  return (
    <div className={`${card} h-full p-4 sm:p-5`}>
      <CardHeader
        icon={Waypoints}
        title={t('childPage.recent')}
        right={
          onViewAll ? (
            <button
              type="button"
              onClick={onViewAll}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB]"
            >
              {t('parentDash.viewAll')} <ArrowRight size={13} />
            </button>
          ) : null
        }
      />
      {!shown.length ? (
        <EmptyNote>{t('childPage.noData')}</EmptyNote>
      ) : (
        <ul className="space-y-3">
          {shown.map((item, index) => {
            const style = RECENT[item.type] || RECENT.topic_test
            const sub = [pickLang(item, 'title', i18n.language), pickLang(item, 'subject', i18n.language)]
              .filter(Boolean)
              .join(' — ')
            return (
              <li key={`${item.type}-${item.at}-${index}`} className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: style.soft, color: style.color }}
                >
                  {item.type === 'topic_test' && item.value >= 80 ? (
                    <CircleCheck size={18} />
                  ) : (
                    <style.Icon size={17} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#0F172A] dark:text-white">
                    {t(`childPage.recent_${item.type}`)}
                  </p>
                  {sub ? <p className="truncate text-xs text-[#64748B]">{sub}</p> : null}
                </div>
                {item.value !== null && item.value !== undefined ? (
                  <span
                    className={`shrink-0 rounded-lg px-2 py-0.5 text-xs font-bold ${
                      item.value >= 80
                        ? 'bg-[#DCFCE7] text-[#16A34A]'
                        : item.value >= 50
                          ? 'bg-[#EAF1FF] text-[#2563EB]'
                          : 'bg-[#FEE2E2] text-[#DC2626]'
                    }`}
                  >
                    {item.value}%
                  </span>
                ) : null}
                <span className="w-[78px] shrink-0 text-right text-[11px] text-[#94A3B8]">
                  {formatWhen(item.at, t)}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Obuna va to'lovlar                                                 */
/* ------------------------------------------------------------------ */

export const SubscriptionCard = ({ subscription, payments, onViewAll }) => {
  const { t } = useTranslation()
  const sub = subscription
  const elapsed = sub?.total_days ? Math.min(100, ((sub.total_days - sub.days_left) / sub.total_days) * 100) : 0

  return (
    <div className={`${card} h-full p-4 sm:p-5`}>
      <CardHeader
        icon={UserRound}
        title={t('childPage.subPayments')}
        right={
          onViewAll ? (
            <button
              type="button"
              onClick={onViewAll}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB]"
            >
              {t('parentDash.viewAll')} <ArrowRight size={13} />
            </button>
          ) : null
        }
      />
      <div className="rounded-2xl border border-[#EEF1F6] p-4 dark:border-[#26324A]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Crown size={26} className="shrink-0 fill-[#FBBF24] text-[#F59E0B]" />
            <div>
              <p className="flex items-center gap-2 font-bold text-[#0F172A] dark:text-white">
                {sub?.months ? t('childPage.monthsPlan', { n: sub.months }) : t('childPage.plan')}
                {sub?.is_active ? (
                  <span className="rounded-md bg-[#DCFCE7] px-1.5 text-[11px] font-semibold text-[#16A34A]">
                    {t('parentDash.active')}
                  </span>
                ) : null}
              </p>
              <p className="text-xs text-[#64748B]">
                {sub ? `${formatDate(sub.start_date)} – ${formatDate(sub.end_date)}` : t('childPage.noSub')}
              </p>
            </div>
          </div>
          {sub?.is_active ? (
            <span className="shrink-0 text-sm font-semibold text-[#16A34A]">
              {t('childPage.daysLeft', { n: sub.days_left })}
            </span>
          ) : null}
        </div>
        {sub ? (
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E5EAF2]">
            <div className="h-full rounded-full bg-[#22C55E]" style={{ width: `${elapsed}%` }} />
          </div>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-[11px] text-[#64748B]">{t('childPage.paidAmount')}</p>
          <p className="font-bold text-[#0F172A] dark:text-white">
            {formatMoney(payments.last_amount)} {t('childPage.som')}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-[#64748B]">{t('childPage.paidDate')}</p>
          <p className="font-bold text-[#0F172A] dark:text-white">{formatDate(payments.last_date)}</p>
        </div>
        <div>
          <p className="text-[11px] text-[#64748B]">{t('childPage.nextPayment')}</p>
          <p className="font-bold text-[#0F172A] dark:text-white">
            {formatDate(sub?.next_payment_date || sub?.end_date)}
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#EEF1F6] pt-3 text-sm dark:border-[#26324A]">
        <div>
          <p className="text-[11px] text-[#64748B]">{t('childPage.totalPaid')}</p>
          <p className="font-bold text-[#0F172A] dark:text-white">
            {formatMoney(payments.total_paid)} {t('childPage.som')}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-[#64748B]">{t('childPage.paymentsCount')}</p>
          <p className="font-bold text-[#0F172A] dark:text-white">{payments.count}</p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Qurilmalar va kirishlar                                            */
/* ------------------------------------------------------------------ */

export const DevicesCard = ({ items = [], onViewAll }) => {
  const { t } = useTranslation()
  return (
    <div className={`${card} h-full p-4 sm:p-5`}>
      <CardHeader
        icon={MonitorSmartphone}
        title={t('childPage.devices')}
        right={
          onViewAll && items.length ? (
            <button
              type="button"
              onClick={onViewAll}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB]"
            >
              {t('parentDash.viewAll')} <ArrowRight size={13} />
            </button>
          ) : null
        }
      />
      {!items.length ? (
        <EmptyNote>{t('childPage.noDevices')}</EmptyNote>
      ) : (
        <ul className="space-y-3">
          {items.map((device) => {
            return (
              <li key={device.id} className="flex items-center gap-3">
                <span className="flex h-10 w-12 shrink-0 items-center justify-center">
                  <img
                    src={
                      device.device_type === 'mobile' || device.device_type === 'tablet'
                        ? '/images/device-phone.webp'
                        : '/images/device-desktop.webp'
                    }
                    alt=""
                    loading="lazy"
                    className={`max-h-full max-w-full object-contain ${device.is_active ? '' : 'opacity-60'}`}
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#0F172A] dark:text-white">{device.device_name}</p>
                  <p className="truncate text-xs text-[#64748B]">{device.ip_address || '—'}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[11px] text-[#64748B]">{formatDateTime(device.last_used_at)}</p>
                  <span
                    className={`mt-0.5 inline-block rounded-md px-1.5 text-[11px] font-semibold ${
                      device.is_active ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#F1F5F9] text-[#64748B]'
                    }`}
                  >
                    {device.is_active ? t('childPage.currentSession') : t('childPage.loggedOut')}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
