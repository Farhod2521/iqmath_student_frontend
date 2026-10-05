import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  CircleCheck,
  ClipboardList,
  Network,
  Plus,
  Trophy,
  Users,
  Waypoints
} from 'lucide-react'
import { CardHeader, EmptyNote, Initials, MiniSelect, card, formatWhen, pickLang, subjectColor } from './shared'

/* ------------------------------------------------------------------ */
/* Farzandlarim                                                       */
/* ------------------------------------------------------------------ */

/** Kichik halqa: fan foizi */
const MiniRing = ({ value, color }) => {
  const r = 15
  const len = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 40 40" className="h-11 w-11 shrink-0 -rotate-90" aria-hidden="true">
      <circle cx="20" cy="20" r={r} fill="none" stroke="#E6EDFB" strokeWidth="4.5" />
      <circle
        cx="20"
        cy="20"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeDasharray={`${(len * Math.min(100, value)) / 100} ${len}`}
      />
    </svg>
  )
}

const SUBJECT_TONES = ['#2563EB', '#0EA5E9', '#4F46E5']

export const ChildrenCard = ({ items = [], onAddChild }) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()

  return (
    <div className={`${card} h-full p-4 sm:p-5`}>
      <CardHeader
        icon={Users}
        title={t('parentDash.myChildren')}
        right={
          <button
            type="button"
            onClick={onAddChild}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#2563EB] px-3 text-xs font-semibold text-white transition hover:bg-[#1D4ED8]"
          >
            <Plus size={15} />
            {t('parentDash.addChild')}
          </button>
        }
      />

      {!items.length ? (
        <EmptyNote>{t('parentDash.noChildren')}</EmptyNote>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {items.map((child) => (
            <button
              key={child.id}
              type="button"
              onClick={() => router.push(`/dashboard/parent/my-children/${child.id}`)}
              className="group overflow-hidden rounded-2xl border border-[#E3EBFA] bg-gradient-to-br from-[#F5F8FF] via-white to-white text-left transition hover:-translate-y-0.5 hover:border-[#BFD3FF] hover:shadow-[0_16px_30px_-20px_rgba(37,99,235,0.6)] dark:border-[#26324A] dark:from-[#16213A] dark:via-[#111A2B] dark:to-[#111A2B]"
            >
              <div className="flex items-center gap-3 p-4 pb-3">
                <Initials name={child.full_name} className="h-12 w-12 text-base" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-[#0F172A] dark:text-white" title={child.full_name}>
                    {child.full_name}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs">
                    {child.class_name ? (
                      <span className="rounded-md bg-[#EAF1FF] px-2 py-0.5 font-semibold text-[#2563EB]">
                        {t('parentDash.grade', { grade: child.class_name })}
                      </span>
                    ) : null}
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-semibold ${
                        child.is_active ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#F1F5F9] text-[#64748B]'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${child.is_active ? 'bg-[#16A34A]' : 'bg-[#94A3B8]'}`}
                      />
                      {child.is_active ? t('parentDash.active') : t('parentDash.inactive')}
                    </span>
                  </div>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-sm transition group-hover:bg-[#2563EB] group-hover:text-white dark:bg-[#1A2436]">
                  <ChevronRight size={16} />
                </span>
              </div>

              {child.subjects?.length ? (
                <div className="grid grid-cols-3 gap-2 border-t border-[#EEF2FA] bg-white/70 p-3 dark:border-[#26324A] dark:bg-transparent">
                  {child.subjects.map((subject, index) => {
                    const name = pickLang(subject, 'name', i18n.language)
                    const color = SUBJECT_TONES[index % SUBJECT_TONES.length]
                    return (
                      <div key={subject.id} className="flex min-w-0 flex-col items-center text-center">
                        <div className="relative">
                          <MiniRing value={subject.percent} color={color} />
                          <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-[#0F172A] dark:text-white">
                            {subject.percent}%
                          </span>
                        </div>
                        <p
                          className="mt-1 w-full truncate text-[11px] font-semibold text-[#334155] dark:text-gray-200"
                          title={name}
                        >
                          {name}
                        </p>
                        {subject.class_name ? (
                          <p className="text-[10px] text-[#94A3B8]">
                            {t('parentDash.grade', { grade: subject.class_name })}
                          </p>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="border-t border-[#EEF2FA] px-4 py-3 text-xs text-[#94A3B8] dark:border-[#26324A]">
                  {t('parentDash.noSubjects')}
                </p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Fanlar bo'yicha umumiy natija (radar)                              */
/* ------------------------------------------------------------------ */

export const Radar = ({ items, lang }) => {
  const size = 320
  const center = size / 2
  const radius = 88
  const angle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / items.length
  const point = (i, r) => [center + r * Math.cos(angle(i)), center + r * Math.sin(angle(i))]
  const polygon = items.map((item, i) => point(i, (radius * item.percent) / 100).join(',')).join(' ')

  return (
    <svg viewBox={`-60 0 ${size + 120} ${size}`} className="mx-auto w-full max-w-[380px]" role="img">
      {[0.33, 0.66, 1].map((k) => (
        <polygon
          key={k}
          points={items.map((_, i) => point(i, radius * k).join(',')).join(' ')}
          fill="none"
          stroke="#E5EAF2"
          strokeWidth="1"
        />
      ))}
      {items.map((_, i) => {
        const [x, y] = point(i, radius)
        return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#E5EAF2" strokeWidth="1" />
      })}
      <polygon
        points={polygon}
        fill="#2563EB"
        fillOpacity="0.16"
        stroke="#2563EB"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {items.map((item, i) => {
        const [x, y] = point(i, (radius * item.percent) / 100)
        const [lx, ly] = point(i, radius + 20)
        // Yon tomondagi yozuvlar tashqariga tekislanadi — chetdan kesilmaydi
        const anchor = lx < center - 8 ? 'end' : lx > center + 8 ? 'start' : 'middle'
        const dy = ly < center - 8 ? -8 : ly > center + 8 ? 8 : 0
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="#2563EB" stroke="#fff" strokeWidth="2">
              <title>{`${pickLang(item, 'name', lang)}: ${item.percent}%`}</title>
            </circle>
            <text x={lx} y={ly - 3 + dy} textAnchor={anchor} fontSize="11" fill="#475569">
              {pickLang(item, 'name', lang).slice(0, 18)}
            </text>
            <text x={lx} y={ly + 12 + dy} textAnchor={anchor} fontSize="12" fontWeight="700" fill="#2563EB">
              {item.percent}%
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export const SubjectsResultCard = ({ items = [], period, onPeriod }) => {
  const { t, i18n } = useTranslation()
  const shown = items.slice(0, 6)

  return (
    <div className={`${card} h-full p-4 sm:p-5`}>
      <CardHeader
        icon={Network}
        title={t('parentDash.subjectsOverall')}
        right={
          <MiniSelect
            value={period}
            onChange={onPeriod}
            options={[
              { value: 'month', label: t('parentDash.thisMonth') },
              { value: 'all', label: t('parentDash.allTime') }
            ]}
          />
        }
      />
      {!shown.length ? (
        <EmptyNote>{t('parentDash.noData')}</EmptyNote>
      ) : (
        <>
          {/* 3 va undan ko'p fan bo'lsa radar; ostida barcha fanlar ro'yxati */}
          {shown.length >= 3 ? <Radar items={shown} lang={i18n.language} /> : null}
          <div className={`space-y-3.5 ${shown.length >= 3 ? 'mt-2 border-t border-[#EEF1F6] pt-4' : 'pt-2'}`}>
            {items.map((item, index) => {
              const color = subjectColor(item.name_uz, index)
              return (
                <div key={item.name_uz}>
                  <div className="mb-1 flex justify-between gap-2 text-sm">
                    <span className="truncate text-[#334155] dark:text-gray-200">
                      {pickLang(item, 'name', i18n.language)}
                    </span>
                    <span className="shrink-0 font-bold" style={{ color }}>
                      {item.percent}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#EDF1F8]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.percent}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* So'nggi faoliyatlar                                                */
/* ------------------------------------------------------------------ */

const RECENT_STYLE = {
  topic_test: { Icon: ClipboardList, color: '#2563EB', soft: '#EAF1FF' },
  diagnostic: { Icon: BookOpen, color: '#7C3AED', soft: '#F1EBFF' },
  achievement: { Icon: Trophy, color: '#F59E0B', soft: '#FFF6E0' }
}

export const RecentCard = ({ items = [] }) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()

  return (
    <div className={`${card} h-full p-4 sm:p-5`}>
      <CardHeader
        icon={Waypoints}
        title={t('parentDash.recent')}
        right={
          <button
            type="button"
            onClick={() => router.push('/dashboard/parent/my-children')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB]"
          >
            {t('parentDash.viewAll')} <ArrowRight size={13} />
          </button>
        }
      />
      {!items.length ? (
        <EmptyNote>{t('parentDash.noData')}</EmptyNote>
      ) : (
        <ul className="space-y-3">
          {items.slice(0, 5).map((item, index) => {
            const style = RECENT_STYLE[item.type] || RECENT_STYLE.topic_test
            const sub = [pickLang(item, 'title', i18n.language), pickLang(item, 'subject', i18n.language)]
              .filter(Boolean)
              .join(' — ')
            return (
              <li key={`${item.type}-${item.at}-${index}`} className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
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
                    {t(`parentDash.recent_${item.type}`)}
                    {item.child ? (
                      <span className="font-normal text-[#94A3B8]"> · {item.child.split(' ')[0]}</span>
                    ) : null}
                  </p>
                  <p className="truncate text-xs text-[#64748B]">{sub}</p>
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
                <span className="w-[74px] shrink-0 text-right text-[11px] text-[#94A3B8]">
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
