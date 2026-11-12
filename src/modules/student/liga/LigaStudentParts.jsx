/** O'quvchi liga sahifalari uchun umumiy bo'laklar (mavsumlar, tarix) */

export const CARD = 'rounded-3xl border border-[#E6ECF7] bg-white shadow-[0_16px_36px_-30px_rgba(31,122,236,0.55)]'
export const HERO = { image: '/images/league/student-hero.webp', width: 700, height: 420 }

const MEDALS = [
  'bg-gradient-to-b from-[#FDE68A] to-[#F59E0B] text-white',
  'bg-gradient-to-b from-[#E2E8F0] to-[#94A3B8] text-white',
  'bg-gradient-to-b from-[#FDBA74] to-[#C2410C] text-white'
]

export const Medal = ({ place, small }) => (
  <span
    className={`flex shrink-0 items-center justify-center rounded-full font-bold ${small ? 'h-7 w-7 text-xs' : 'h-9 w-9 text-sm'} ${
      MEDALS[place - 1] || 'bg-[#EEF3FA] text-[#64748B]'
    }`}
  >
    {place}
  </span>
)

export const CardHead = ({ Icon, title, text, children }) => (
  <div className="flex flex-wrap items-center gap-3">
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#1F7AEC]">
      <Icon size={22} />
    </span>
    <div className="min-w-0 flex-1">
      <h2 className="text-lg font-bold text-[#191C1D]">{title}</h2>
      {text ? <p className="text-sm text-[#64748B]">{text}</p> : null}
    </div>
    {children}
  </div>
)

export const Empty = ({ children }) => (
  <p className="rounded-2xl bg-[#F7FAFE] py-8 text-center text-sm text-[#64748B]">{children}</p>
)

export const formatDate = (value, lang, withTime = true) =>
  value
    ? new Date(value).toLocaleString(lang === 'ru' ? 'ru-RU' : 'uz-UZ', {
        day: '2-digit',
        month: '2-digit',
        year: withTime ? undefined : 'numeric',
        hour: withTime ? '2-digit' : undefined,
        minute: withTime ? '2-digit' : undefined
      })
    : '—'

export const formatDuration = (seconds) => {
  if (seconds === null || seconds === undefined) return '—'
  const pad = (value) => String(value).padStart(2, '0')
  return `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`
}

export const StatTiles = ({ items }) => (
  <div className={`${CARD} grid grid-cols-2 gap-y-4 p-4 sm:p-5 xl:grid-cols-4 xl:divide-x xl:divide-[#EDF1F8]`}>
    {items.map(([Icon, color, label, value]) => (
      <div key={label} className="flex min-w-0 items-center gap-3 xl:px-5 xl:first:pl-1">
        <Icon size={28} className={`shrink-0 ${color}`} />
        <div className="min-w-0">
          <p className="truncate text-xs text-[#64748B]">{label}</p>
          <p className="truncate text-lg font-bold text-[#191C1D]">{value}</p>
        </div>
      </div>
    ))}
  </div>
)
