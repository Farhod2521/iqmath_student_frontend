import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CARD, CARD_TITLE, COLORS, fmt, shortDate, shortMonth } from '../utils'
import RegistrationsModal from './RegistrationsModal'

const TABS = [
  { key: 'day', label: 'Kun' },
  { key: 'week', label: 'Hafta' },
  { key: 'month', label: 'Oy' }
]

const toIso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

// Ustun -> modal uchun sana oralig'i (ikkala chet ham kiradi)
const bucketRange = (tab, iso) => {
  const start = new Date(`${iso}T00:00:00`)
  const end = new Date(start)
  if (tab === 'week') end.setDate(end.getDate() + 6)
  if (tab === 'month') end.setMonth(end.getMonth() + 1, 0)
  const title =
    tab === 'day'
      ? shortDate(iso)
      : tab === 'week'
        ? `${shortDate(iso)} – ${shortDate(toIso(end))}`
        : shortMonth(iso)
  return { start: iso, end: toIso(end), title }
}

const NewUsersChart = ({ registrations }) => {
  const [tab, setTab] = useState('day')
  const [range, setRange] = useState(null)
  const rows = (registrations?.[tab] || []).map((r, i, arr) => ({
    ...r,
    label: tab === 'month' ? shortMonth(r.date) : shortDate(r.date),
    isLast: i === arr.length - 1
  }))

  return (
    <div className={CARD}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className={CARD_TITLE}>Yangi foydalanuvchilar</h3>
        <div className="flex overflow-hidden rounded-lg border border-[#E9E9E9] dark:border-[#2A3447]">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                tab === t.key ? 'bg-[#4F7CFF] text-white' : 'text-[#5A6A85] hover:bg-[#F6F8FB] dark:text-[#AAB7CF] dark:hover:bg-[#2A3447]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rows}
            margin={{ top: 20, right: 4, left: -16, bottom: 0 }}
            className="cursor-pointer"
            onClick={(state) => {
              const date = state?.activePayload?.[0]?.payload?.date
              if (date) setRange(bucketRange(tab, String(date).slice(0, 10)))
            }}
          >
            <CartesianGrid stroke="#94A3B8" strokeOpacity={0.18} vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#7C8FAC' }} tickLine={false} axisLine={false} interval={0} />
            <YAxis tick={{ fontSize: 11, fill: '#7C8FAC' }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip
              cursor={{ fill: 'rgba(148,163,184,0.12)' }}
              formatter={(v) => [fmt(v), "Ro'yxatdan o'tganlar"]}
              contentStyle={{ borderRadius: 8, fontSize: 12 }}
            />
            <Bar
              dataKey="count"
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            >
              {rows.map((r) => (
                <Cell key={r.date} fill={r.isLast ? COLORS.blue : '#9DB6FF'} />
              ))}
              <LabelList
                dataKey="count"
                content={({ x, y, width, value, index }) =>
                  rows[index]?.isLast ? (
                    <text x={x + width / 2} y={y - 6} textAnchor="middle" fontSize={11} fontWeight={600} fill="#2A3547">
                      {fmt(value)}
                    </text>
                  ) : null
                }
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-xs text-[#7C8FAC]">Ro'yxatni ko'rish uchun ustunni bosing</p>
      <RegistrationsModal range={range} onClose={() => setRange(null)} />
    </div>
  )
}

export default NewUsersChart
