import { useEffect, useRef, useState } from 'react'
import { CalendarDays, SlidersHorizontal, X } from 'lucide-react'
import { usePupilsText } from './PupilsUi'

// Mahalliy sana -> "YYYY-MM-DD" (input[type=date] va backend formati)
const toISO = (date) => {
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

const daysAgo = (n) => {
  const date = new Date()
  date.setDate(date.getDate() - n)
  return toISO(date)
}

// "2026-10-16" -> "16.10.2026"
export const formatDay = (iso) => (iso ? iso.split('-').reverse().join('.') : '')

const Chip = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`h-8 rounded-lg border px-3 text-[13px] font-medium transition ${
      active
        ? 'border-[#2563EB] bg-[#2563EB] text-white'
        : 'border-[#E3E8F1] bg-white text-[#334155] hover:border-[#C9D4E8] hover:bg-[#F8FAFD]'
    }`}
  >
    {children}
  </button>
)

const DateInput = ({ label, value, min, max, onChange }) => (
  <label className="flex-1">
    <span className="mb-1 block text-xs text-[#6B7385]">{label}</span>
    <input
      type="date"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 w-full rounded-lg border border-[#E3E8F1] bg-white px-2.5 text-sm text-[#0F1B3D] outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
    />
  </label>
)

/**
 * "Filtrlar" tugmasi: bosilganda sana oralig'i, til va qurilma filtrlari ochiladi.
 * value: { date_from, date_to, lang, device }, onChange(patch) — o'zgargan maydonlar.
 */
export default function MoreFilters({ value, onChange, className = '' }) {
  const tp = usePupilsText()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { date_from: from = '', date_to: to = '', lang = '', device = '' } = value

  useEffect(() => {
    if (!open) return undefined
    const close = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false)
    }
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const today = toISO(new Date())
  const presets = [
    { key: 'today', from: today, to: today },
    { key: 'yesterday', from: daysAgo(1), to: daysAgo(1) },
    { key: 'last7', from: daysAgo(6), to: today },
    { key: 'last30', from: daysAgo(29), to: today },
    { key: 'thisMonth', from: `${today.slice(0, 8)}01`, to: today }
  ]

  const activeCount = (from || to ? 1 : 0) + (lang ? 1 : 0) + (device ? 1 : 0)
  const dateLabel = from || to ? `${formatDay(from) || '…'} – ${formatDay(to) || '…'}` : ''

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl border bg-white px-3.5 text-sm font-medium transition ${
          open || activeCount
            ? 'border-[#2563EB] text-[#1D4ED8]'
            : 'border-[#E3E8F1] text-[#5B6478] hover:border-[#C9D4E8]'
        } ${open ? 'ring-4 ring-[#2563EB]/10' : ''}`}
      >
        {dateLabel ? (
          <CalendarDays size={16} className="shrink-0" />
        ) : (
          <SlidersHorizontal size={16} className="shrink-0" />
        )}
        <span className="truncate">{dateLabel || tp('filters')}</span>
        {activeCount ? (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2563EB] px-1.5 text-[11px] font-bold text-white">
            {activeCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+6px)] z-30 w-[min(340px,calc(100vw-32px))] rounded-2xl border border-[#E3E8F1] bg-white p-4 shadow-[0_18px_40px_-16px_rgba(15,27,61,0.35)] max-sm:left-0 max-sm:right-auto">
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-[#0F1B3D]">
            <CalendarDays size={15} className="text-[#2563EB]" />
            {tp('registeredDate')}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {presets.map((preset) => (
              <Chip
                key={preset.key}
                active={from === preset.from && to === preset.to}
                onClick={() => onChange({ date_from: preset.from, date_to: preset.to })}
              >
                {tp(preset.key)}
              </Chip>
            ))}
          </div>
          <div className="mt-3 flex items-end gap-2">
            <DateInput
              label={tp('dateFrom')}
              value={from}
              max={to || today}
              onChange={(v) => onChange({ date_from: v })}
            />
            <span className="pb-2.5 text-[#94A3B8]">—</span>
            <DateInput
              label={tp('dateTo')}
              value={to}
              min={from || undefined}
              max={today}
              onChange={(v) => onChange({ date_to: v })}
            />
            {from || to ? (
              <button
                type="button"
                title={tp('resetFilters')}
                onClick={() => onChange({ date_from: '', date_to: '' })}
                className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#94A3B8] transition hover:bg-[#F1F5F9] hover:text-[#DC2626]"
              >
                <X size={16} />
              </button>
            ) : null}
          </div>

          <div className="my-4 h-px bg-[#EEF1F6]" />

          <p className="text-[13px] font-semibold text-[#0F1B3D]">{tp('language')}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[
              ['', tp('allShort')],
              ['uz', 'UZ'],
              ['ru', 'RU']
            ].map(([key, label]) => (
              <Chip key={key || 'all'} active={lang === key} onClick={() => onChange({ lang: key })}>
                {label}
              </Chip>
            ))}
          </div>

          <p className="mt-4 text-[13px] font-semibold text-[#0F1B3D]">{tp('device')}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[
              ['', tp('allShort')],
              ['android', 'Android'],
              ['ios', 'iOS'],
              ['web', 'Web']
            ].map(([key, label]) => (
              <Chip key={key || 'all'} active={device === key} onClick={() => onChange({ device: key })}>
                {label}
              </Chip>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              disabled={!activeCount}
              onClick={() => onChange({ date_from: '', date_to: '', lang: '', device: '' })}
              className="h-10 flex-1 rounded-xl border border-[#E3E8F1] text-sm font-semibold text-[#334155] transition hover:bg-[#F8FAFD] disabled:opacity-50"
            >
              {tp('resetFilters')}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-10 flex-1 rounded-xl bg-[#2563EB] text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
            >
              {tp('close')}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
