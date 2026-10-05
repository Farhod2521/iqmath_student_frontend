import { ChevronDown } from 'lucide-react'

export const card =
  'rounded-2xl border border-[#EEF1F6] bg-white shadow-[0_8px_24px_-18px_rgba(15,23,42,0.25)] dark:border-[#1F2A3C] dark:bg-[#111A2B]'

export const pickLang = (obj, field, lang) =>
  (lang === 'ru' ? obj?.[`${field}_ru`] || obj?.[`${field}_uz`] : obj?.[`${field}_uz`]) || ''

// Fanlar ranglari: nomiga qarab (matematika — ko'k, algebra — binafsha, geometriya — yashil)
const SUBJECT_COLORS = [
  { match: /algebr|алгебр/i, color: '#7C3AED' },
  { match: /geometr|геометр/i, color: '#16A34A' },
  { match: /matemat|математ/i, color: '#2563EB' }
]
const FALLBACK = ['#2563EB', '#7C3AED', '#16A34A', '#F59E0B', '#0EA5E9']

export const subjectColor = (name, index = 0) =>
  SUBJECT_COLORS.find((item) => item.match.test(name || ''))?.color || FALLBACK[index % FALLBACK.length]

export const CardHeader = ({ icon: Icon, iconColor = '#2563EB', title, sub, right }) => (
  <div className="mb-4 flex items-center justify-between gap-3">
    <div className="flex min-w-0 items-center gap-2">
      <Icon size={20} style={{ color: iconColor }} className="shrink-0" />
      <h3 className="truncate text-base font-bold text-[#0F172A] dark:text-white">
        {title}
        {sub ? <span className="ml-1 text-xs font-medium text-[#8A93A6]">{sub}</span> : null}
      </h3>
    </div>
    {right}
  </div>
)

export const MiniSelect = ({ value, onChange, options }) => (
  <label className="relative shrink-0">
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-9 cursor-pointer appearance-none rounded-xl border border-[#E5EAF2] bg-white pl-3 pr-8 text-xs font-semibold text-[#191C1D] outline-none focus:border-[#2563EB] dark:border-[#26324A] dark:bg-[#111A2B] dark:text-white"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7385]" />
  </label>
)

// Avatar uchun ko'k ohanglar — ismga qarab bittasi tanlanadi (har safar bir xil)
const AVATAR_TONES = [
  'from-[#60A5FA] to-[#2563EB]',
  'from-[#38BDF8] to-[#0369A1]',
  'from-[#818CF8] to-[#3B5BDB]',
  'from-[#3B82F6] to-[#1E40AF]',
  'from-[#22D3EE] to-[#2563EB]'
]

export const Initials = ({ name, className = '' }) => {
  const letters = String(name || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
  const hash = String(name || '')
    .split('')
    .reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${
        AVATAR_TONES[hash % AVATAR_TONES.length]
      } font-bold tracking-wide text-white shadow-[0_8px_18px_-8px_rgba(37,99,235,0.8)] ring-[3px] ring-white dark:ring-[#111A2B] ${className}`}
    >
      {/* yuqori yorug'lik */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
      <span className="relative">{letters || '?'}</span>
    </span>
  )
}

export const EmptyNote = ({ children }) => (
  <p className="flex h-full min-h-[120px] items-center justify-center text-center text-sm text-[#8A93A6]">{children}</p>
)

/** "Bugun 14:20" / "Kecha 18:30" / "12.09 10:45" */
export const formatWhen = (iso, t) => {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const pad = (n) => String(n).padStart(2, '0')
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  if (date.toDateString() === today.toDateString()) return `${t('parentDash.today')} ${time}`
  if (date.toDateString() === yesterday.toDateString()) return `${t('parentDash.yesterday')} ${time}`
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)} ${time}`
}
