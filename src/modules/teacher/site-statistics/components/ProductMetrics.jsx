import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { LuCrown, LuInfo, LuRepeat, LuTrendingUp, LuUserCheck, LuUserPlus } from 'react-icons/lu'
import { ArrowDown, ArrowUp } from 'lucide-react'
import DonutCard from './DonutCard'
import { CARD, CARD_TITLE, COLORS, fmt, formatLongDate, shortDate } from '../utils'

// O'quvchilar obuna holati
const PAID_COLORS = [COLORS.blue, COLORS.teal, COLORS.purple, '#0EA5E9', '#6366F1']
const statusMeta = (item, paidIndex) => {
  if (item.key === 'trial') return { label: 'Sinov muddatida', color: COLORS.orange }
  if (item.key === 'free') return { label: "Bepul (to'lamagan)", color: COLORS.gray }
  if (item.key === 'expired') return { label: 'Obunasi tugagan', color: '#E5484D' }
  if (item.key === 'paid_other') return { label: 'Pullik (boshqa)', color: PAID_COLORS[paidIndex % PAID_COLORS.length] }
  return { label: `${item.months} oylik`, color: PAID_COLORS[paidIndex % PAID_COLORS.length] }
}

// Foiz punktlaridagi o'zgarish (masalan 4.2% → 5.0% = +0.8)
const PointDelta = ({ value, previous }) => {
  if (previous === null || previous === undefined) return null
  const d = Math.round((value - previous) * 10) / 10
  const up = d >= 0
  return (
    <span className={`inline-flex items-center gap-0.5 text-sm font-semibold ${up ? 'text-[#13A97F]' : 'text-[#E5484D]'}`}>
      {up ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
      {up ? '+' : ''}
      {d}
    </span>
  )
}

const Kpi = ({ icon: Icon, tone, label, value, hint, previous }) => (
  <div className={`${CARD} flex items-start gap-4`}>
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tone}`}>
      <Icon size={24} />
    </span>
    <div className="min-w-0">
      <p className="text-sm text-[#5A6A85] dark:text-[#7C8FAC]">{label}</p>
      <div className="mt-1 flex flex-wrap items-baseline gap-2">
        <span className="text-2xl font-bold text-[#2A3547] dark:text-white">{value}%</span>
        <PointDelta value={value} previous={previous} />
      </div>
      <p className="mt-1 text-xs text-[#7C8FAC]">{hint}</p>
    </div>
  </div>
)

const PercentTooltip = ({ active, payload, label, lines }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-[#E9E9E9] bg-white px-3 py-2 text-sm shadow-lg dark:border-[#2A3447] dark:bg-[#1A2232]">
      <p className="mb-1 text-xs text-[#7C8FAC]">{label}</p>
      {lines.map((line) => {
        const row = payload.find((p) => p.dataKey === line.key)
        return (
          <p key={line.key} className="flex items-center gap-2 text-[#2A3547] dark:text-white">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: line.color }} />
            {line.label}: <b>{row?.value ?? 0}%</b>
          </p>
        )
      })}
    </div>
  )
}

const PercentChart = ({ title, subtitle, data, lines }) => (
  <div className={CARD}>
    <h3 className={CARD_TITLE}>{title}</h3>
    {subtitle ? <p className="mt-1 text-xs text-[#7C8FAC]">{subtitle}</p> : null}
    <div className="mt-3 mb-2 flex flex-wrap gap-4">
      {lines.map((l) => (
        <span key={l.key} className="flex items-center gap-2 text-sm text-[#5A6A85] dark:text-[#7C8FAC]">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
          {l.label}
        </span>
      ))}
    </div>
    <div className="h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid stroke="#94A3B8" strokeOpacity={0.18} vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#7C8FAC' }} tickLine={false} axisLine={false} minTickGap={16} />
          <YAxis
            tick={{ fontSize: 12, fill: '#7C8FAC' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 'auto']}
          />
          <Tooltip content={<PercentTooltip lines={lines} />} cursor={{ stroke: '#94A3B8', strokeDasharray: '4 4' }} />
          {lines.map((l) => (
            <Line
              key={l.key}
              type="monotone"
              dataKey={l.key}
              stroke={l.color}
              strokeWidth={2}
              strokeDasharray={l.dashed ? '5 4' : undefined}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
)

const CONVERSION_LINES = [
  { key: 'ma30', label: '30 kunlik o\'rtacha', color: COLORS.blue },
  { key: 'cumulative', label: 'Kumulyativ', color: COLORS.teal, dashed: true }
]
const RETENTION_LINES = [
  { key: 'total', label: "Jami o'quvchilar", color: COLORS.purple },
  { key: 'new', label: "Yangi o'quvchilar", color: COLORS.orange }
]

// O'quvchilar statusi, konversiya va D30 retention bloki
const ProductMetrics = ({ status, conversion, retention }) => {
  if (!status && !conversion && !retention) return null

  let paidIndex = 0
  const statusItems = (status?.items || []).map((i) => {
    const meta = statusMeta(i, paidIndex)
    if (i.key.startsWith('paid')) paidIndex += 1
    return { ...i, ...meta }
  })

  const conversionData = (conversion?.series || []).map((p) => ({ ...p, label: shortDate(p.date) }))
  const retentionData = (retention?.series || []).map((p) => ({
    label: shortDate(p.date),
    total: p.total.value,
    new: p.new.value
  }))

  const cum = conversion?.cumulative || {}
  const ma = conversion?.ma30 || {}
  const total = retention?.total || {}
  const fresh = retention?.new || {}

  return (
    <div className="mb-6">
      <h2 className="mb-4 text-lg font-semibold text-[#2A3547] dark:text-white">O'quvchilar ko'rsatkichlari</h2>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-5">
        <Kpi
          icon={LuCrown}
          tone="bg-[#FFF1F2] text-[#E11D48]"
          label="Pullik o'quvchilar"
          value={status?.paid_percent ?? 0}
          hint={`Hozir obunasi faol: ${fmt(status?.paid)} / ${fmt(status?.total)}`}
        />
        <Kpi
          icon={LuTrendingUp}
          tone="bg-[#ECF2FF] text-[#4F7CFF]"
          label="Konversiya (kumulyativ)"
          value={cum.value ?? 0}
          hint={`Kamida bir marta to'lagan: ${fmt(cum.paid)} / ${fmt(cum.students)}`}
        />
        <Kpi
          icon={LuRepeat}
          tone="bg-[#E6FFFA] text-[#0FB39A]"
          label="Konversiya (30 kunlik o'rtacha)"
          value={ma.value ?? 0}
          previous={ma.previous}
          hint={`30 kunda: ${fmt(ma.paid)} to'lov / ${fmt(ma.registrations)} ro'yxatdan o'tish`}
        />
        <Kpi
          icon={LuUserCheck}
          tone="bg-[#F4ECFF] text-[#9B5DE5]"
          label="D30 — jami o'quvchilar"
          value={total.value ?? 0}
          hint={`30 kunda faol: ${fmt(total.active)} / ${fmt(total.students)}`}
        />
        <Kpi
          icon={LuUserPlus}
          tone="bg-[#FEF5E5] text-[#D97706]"
          label="D30 — yangi o'quvchilar"
          value={fresh.value ?? 0}
          hint={`Qaytib kelgan: ${fmt(fresh.active)} / ${fmt(fresh.students)} yangi`}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
        <DonutCard title="O'quvchilar statusi" items={statusItems} total={status?.total} centerLabel="o'quvchi" />
        <PercentChart
          title="Konversiya"
          subtitle="Bepuldan pulliga o'tganlar ulushi. 30 kunlik o'rtacha kunlik sakrashlarni tekislaydi."
          data={conversionData}
          lines={CONVERSION_LINES}
        />
        <div>
          <PercentChart
            title="D30 retention (haftalik)"
            subtitle="Oxirgi 30 kun ichida faol bo'lgan o'quvchilar ulushi (sayt + mobil ilova)."
            data={retentionData}
            lines={RETENTION_LINES}
          />
          {retention?.data_since ? (
            <p className="mt-2 flex items-start gap-1.5 text-xs text-[#7C8FAC]">
              <LuInfo className="mt-0.5 shrink-0" />
              Faollik {formatLongDate(String(retention.data_since).slice(0, 10))} dan beri yig'ilmoqda — undan
              oldingi nuqtalar to'liq emas.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ProductMetrics
