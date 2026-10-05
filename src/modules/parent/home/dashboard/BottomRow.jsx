import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ChartColumnIncreasing, Lock, MessageSquareText, Award, X } from 'lucide-react'
import { CardHeader, EmptyNote, MiniSelect, card, pickLang, subjectColor } from './shared'

/* ------------------------------------------------------------------ */
/* O'quv faolligi (so'nggi 30 kun) — bitta seriya, ustunli grafik      */
/* ------------------------------------------------------------------ */

export const ActivityChart = ({ days = [] }) => {
  const { t } = useTranslation()
  const [mode, setMode] = useState('daily')
  const [hover, setHover] = useState(null)
  const months = t('parentDash.months', { returnObjects: true }) || []

  const bars = useMemo(() => {
    const label = (iso) => {
      const date = new Date(iso)
      return `${date.getDate()} ${months[date.getMonth()] || ''}`
    }
    if (mode === 'weekly') {
      const weeks = []
      for (let i = 0; i < days.length; i += 7) {
        const chunk = days.slice(i, i + 7)
        weeks.push({
          key: chunk[0]?.date,
          label: t('parentDash.weekLabel', { n: weeks.length + 1 }),
          tip: `${label(chunk[0]?.date)} – ${label(chunk[chunk.length - 1]?.date)}`,
          count: chunk.reduce((sum, d) => sum + d.count, 0)
        })
      }
      return weeks
    }
    return days.map((d) => ({ key: d.date, label: label(d.date), tip: label(d.date), count: d.count }))
  }, [days, mode, months, t])

  const max = Math.max(4, ...bars.map((b) => b.count))
  const niceMax = Math.ceil(max / 4) * 4
  const ticks = [0, niceMax / 4, niceMax / 2, (niceMax * 3) / 4, niceMax]

  return (
    <div className={`${card} h-full p-4 sm:p-5`}>
      <CardHeader
        icon={ChartColumnIncreasing}
        title={t('parentDash.learningActivity')}
        sub={t('parentDash.learningActivitySub')}
        right={
          <MiniSelect
            value={mode}
            onChange={setMode}
            options={[
              { value: 'daily', label: t('parentDash.daily') },
              { value: 'weekly', label: t('parentDash.weekly') }
            ]}
          />
        }
      />
      {!bars.some((b) => b.count) ? (
        <EmptyNote>{t('parentDash.noData')}</EmptyNote>
      ) : (
        <div className="flex gap-2">
          {/* Y o'qi */}
          <div className="flex h-44 flex-col-reverse justify-between pb-5 text-right text-[10px] text-[#94A3B8]">
            {ticks.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[156px] flex-col justify-between">
              {ticks.map((tick) => (
                <span key={tick} className="border-t border-dashed border-[#EEF1F6]" />
              ))}
            </div>
            <div className="relative flex h-[156px] items-end gap-[3px]">
              {bars.map((bar, index) => (
                <div
                  key={bar.key}
                  className="group relative flex h-full flex-1 items-end"
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(null)}
                >
                  <div
                    className={`w-full rounded-t-[4px] transition-colors ${hover === index ? 'bg-[#1D4ED8]' : 'bg-[#93B4FA]'}`}
                    style={{ height: `${Math.max(bar.count ? 3 : 0, (bar.count / niceMax) * 100)}%` }}
                  />
                  {hover === index ? (
                    <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0F172A] px-2.5 py-1.5 text-center text-[11px] text-white shadow-lg">
                      <p className="font-semibold">{bar.tip}</p>
                      <p>{t('parentDash.solvedTooltip', { count: bar.count })}</p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="mt-1.5 flex gap-[3px] text-[10px] text-[#94A3B8]">
              {bars.map((bar, index) => (
                <span key={bar.key} className="flex-1 truncate text-center">
                  {mode === 'weekly' || index % 5 === 0 ? bar.label : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Top mavzular                                                       */
/* ------------------------------------------------------------------ */

const RANK_STYLE = [
  'bg-[#FEF3C7] text-[#D97706]',
  'bg-[#EDE9FE] text-[#7C3AED]',
  'bg-[#DCFCE7] text-[#16A34A]',
  'bg-[#EAF1FF] text-[#2563EB]'
]

export const TopTopicsCard = ({ items = [] }) => {
  const { t, i18n } = useTranslation()
  const [subject, setSubject] = useState('all')
  const subjects = Array.from(new Set(items.map((item) => pickLang(item, 'subject', i18n.language)).filter(Boolean)))
  const shown = items
    .filter((item) => subject === 'all' || pickLang(item, 'subject', i18n.language) === subject)
    .slice(0, 4)

  return (
    <div className={`${card} h-full p-4 sm:p-5`}>
      <CardHeader
        icon={MessageSquareText}
        title={t('parentDash.topTopics')}
        right={
          <MiniSelect
            value={subject}
            onChange={setSubject}
            options={[
              { value: 'all', label: t('parentDash.allSubjects') },
              ...subjects.map((s) => ({ value: s, label: s }))
            ]}
          />
        }
      />
      {!shown.length ? (
        <EmptyNote>{t('parentDash.noData')}</EmptyNote>
      ) : (
        <ul className="space-y-3.5">
          {shown.map((item, index) => {
            const subjectName = pickLang(item, 'subject', i18n.language)
            return (
              <li key={`${item.topic_uz}-${index}`} className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${RANK_STYLE[index]}`}
                >
                  {index + 1}
                </span>
                <div className="w-[38%] min-w-0">
                  <p className="truncate text-sm font-semibold text-[#0F172A] dark:text-white">
                    {pickLang(item, 'topic', i18n.language)}
                  </p>
                  <p className="truncate text-[11px] text-[#94A3B8]">{subjectName}</p>
                </div>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#EDF1F8]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.percent}%`, backgroundColor: subjectColor(item.subject_uz, index) }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-sm font-bold text-[#0F172A] dark:text-white">
                  {item.percent}%
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
/* Yutuqlar va mukofotlar                                             */
/* ------------------------------------------------------------------ */

const Badge = ({ item, lang, size = 'h-16 w-16' }) => (
  <div className="relative">
    <div className={`${size} ${item.earned ? '' : 'opacity-35 grayscale'}`}>
      {item.image ? (
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-contain drop-shadow-[0_8px_10px_rgba(15,23,42,0.18)]"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center rounded-2xl bg-[#EAF1FF] text-[#2563EB]">
          <Award size={28} />
        </span>
      )}
    </div>
    {!item.earned ? (
      <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#64748B] shadow">
        <Lock size={12} />
      </span>
    ) : null}
    <span className="sr-only">{pickLang(item, 'title', lang)}</span>
  </div>
)

const AchievementsModal = ({ open, onClose, items, childName }) => {
  const { t, i18n } = useTranslation()
  if (!open) return null
  const earned = items.filter((item) => item.earned).length

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-[#0F172A]/50 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[88dvh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 dark:bg-[#111A2B] sm:max-w-2xl sm:rounded-3xl sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] dark:text-white">
              {childName ? t('parentDash.achievementsOf', { name: childName }) : t('parentDash.achievements')}
            </h3>
            <p className="text-sm text-[#64748B]">{t('parentDash.earned', { count: earned, total: items.length })}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F5F9] text-[#64748B]"
          >
            <X size={18} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col items-center rounded-2xl border p-4 text-center ${
                item.earned ? 'border-[#FDE68A] bg-[#FFFBEB]' : 'border-[#EEF1F6] bg-[#F8FAFC]'
              }`}
            >
              <Badge item={item} lang={i18n.language} />
              <p className="mt-3 text-sm font-bold text-[#0F172A]">{pickLang(item, 'title', i18n.language)}</p>
              {pickLang(item, 'description', i18n.language) ? (
                <p className="mt-0.5 text-[11px] text-[#64748B]">{pickLang(item, 'description', i18n.language)}</p>
              ) : null}
              {item.earned ? null : (
                <div className="mt-2 w-full">
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
                    <div className="h-full rounded-full bg-[#2563EB]" style={{ width: `${item.progress}%` }} />
                  </div>
                  <p className="mt-1 text-[11px] text-[#94A3B8]">
                    {item.value} / {item.threshold}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const AchievementsCard = ({ items = [], child }) => {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <div className={`${card} h-full p-4 sm:p-5`}>
      <CardHeader
        icon={Award}
        iconColor="#2563EB"
        title={t('parentDash.achievements')}
        right={
          items.length ? (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB]"
            >
              {t('parentDash.viewAll')} <ArrowRight size={13} />
            </button>
          ) : null
        }
      />
      {!items.length ? (
        <EmptyNote>{t('parentDash.noAchievements')}</EmptyNote>
      ) : (
        <div className="grid grid-cols-5 gap-2">
          {items.slice(0, 5).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpen(true)}
              title={
                item.earned
                  ? pickLang(item, 'title', i18n.language)
                  : `${pickLang(item, 'title', i18n.language)} — ${t('parentDash.locked')}`
              }
              className="flex flex-col items-center text-center"
            >
              <Badge item={item} lang={i18n.language} size="h-14 w-14 sm:h-16 sm:w-16" />
              <span className="mt-2 line-clamp-2 text-[11px] font-semibold leading-tight text-[#334155] dark:text-gray-200">
                {pickLang(item, 'title', i18n.language)}
              </span>
            </button>
          ))}
        </div>
      )}
      <AchievementsModal open={open} onClose={() => setOpen(false)} items={items} childName={child?.full_name} />
    </div>
  )
}
