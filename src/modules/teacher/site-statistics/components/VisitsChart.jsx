import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CARD, CARD_TITLE, COLORS, fmt } from '../utils'

const LINES = [
  { key: 'visitors', label: 'Jami tashriflar', color: COLORS.blue },
  { key: 'new_visitors', label: 'Yangi tashrifchilar', color: COLORS.teal },
  { key: 'registrations', label: "Ro'yxatdan o'tganlar", color: COLORS.purple }
]

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-[#E9E9E9] bg-white px-3 py-2 text-sm shadow-lg dark:border-[#2A3447] dark:bg-[#1A2232]">
      <p className="mb-1 text-xs text-[#7C8FAC]">{label}</p>
      {LINES.map((line) => {
        const row = payload.find((p) => p.dataKey === line.key)
        return (
          <p key={line.key} className="flex items-center gap-2 text-[#2A3547] dark:text-white">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: line.color }} />
            {line.label}: <b>{fmt(row?.value)}</b>
          </p>
        )
      })}
    </div>
  )
}

const VisitsChart = ({ data = [] }) => (
  <div className={CARD}>
    <h3 className={CARD_TITLE}>Tashriflar grafigi</h3>
    <div className="flex flex-wrap gap-4 mt-3 mb-2">
      {LINES.map((l) => (
        <span key={l.key} className="flex items-center gap-2 text-sm text-[#5A6A85] dark:text-[#7C8FAC]">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
          {l.label}
        </span>
      ))}
    </div>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
          <defs>
            {LINES.map((l) => (
              <linearGradient key={l.key} id={`grad-${l.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={l.color} stopOpacity={0.22} />
                <stop offset="100%" stopColor={l.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid stroke="#94A3B8" strokeOpacity={0.18} vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#7C8FAC' }} tickLine={false} axisLine={false} minTickGap={16} />
          <YAxis tick={{ fontSize: 12, fill: '#7C8FAC' }} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#94A3B8', strokeDasharray: '4 4' }} />
          {LINES.map((l) => (
            <Area
              key={l.key}
              type="monotone"
              dataKey={l.key}
              stroke={l.color}
              strokeWidth={2}
              fill={`url(#grad-${l.key})`}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
)

export default VisitsChart
