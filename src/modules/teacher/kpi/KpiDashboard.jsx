import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { AlertTriangle, CheckCircle2, ChevronDown, CircleAlert, RotateCcw, TrendingDown, TrendingUp } from 'lucide-react'
import { KPI_INITIAL_ACTUALS, KPI_MONTHS, KPI_PLAN } from './mockData'

const numberFormatter = new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: 1 })

const formatNumber = (value, suffix = '') => (value === null || value === undefined ? '-' : `${numberFormatter.format(value)}${suffix}`)

const getRevenue = (actual) => {
  if (!actual) return null
  if (actual.revenue !== null && actual.revenue !== undefined) return actual.revenue
  return actual.paid !== null && actual.paid !== undefined ? actual.paid * KPI_PLAN.blendedRevenue : null
}

const getConversion = (actual) => {
  if (!actual?.leads || actual?.paid === null || actual?.paid === undefined) return null
  return (actual.paid / actual.leads) * 100
}

const getRatioStatus = (value, plan) => {
  if (value === null || value === undefined || !plan) return 'neutral'
  const ratio = value / plan
  if (ratio >= 0.95) return 'good'
  if (ratio >= 0.8) return 'warning'
  return 'danger'
}

const statusStyles = {
  good: { dot: 'bg-emerald-500', text: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700' },
  warning: { dot: 'bg-amber-500', text: 'text-amber-600', badge: 'bg-amber-50 text-amber-700' },
  danger: { dot: 'bg-rose-500', text: 'text-rose-600', badge: 'bg-rose-50 text-rose-700' },
  neutral: { dot: 'bg-slate-300', text: 'text-slate-400', badge: 'bg-slate-100 text-slate-500' }
}

const getChurnStatus = (value) => {
  if (value === null || value === undefined) return 'neutral'
  if (value <= KPI_PLAN.churnMax) return 'good'
  return value <= KPI_PLAN.churnMax + 5 ? 'warning' : 'danger'
}

const getCsatStatus = (value) => {
  if (value === null || value === undefined) return 'neutral'
  if (value >= KPI_PLAN.csatMin) return 'good'
  return value >= KPI_PLAN.csatMin - 5 ? 'warning' : 'danger'
}

const KpiCard = ({ label, value, plan, status, delta }) => {
  const style = statusStyles[status]

  return (
    <div className="min-h-[148px] border-b border-slate-200 bg-white p-4 sm:border sm:p-5 xl:min-h-[156px] xl:rounded-lg">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
        <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${style.dot}`} />
      </div>
      <p className="mt-3 text-2xl font-semibold tabular-nums text-[#2A3547]">{value}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
        <span>{plan}</span>
        {delta !== null && delta !== undefined && <span className={`font-semibold ${style.text}`}>{delta}</span>}
      </div>
    </div>
  )
}

const AlertItem = ({ level, title, description, action, owner }) => {
  const config = {
    danger: { icon: CircleAlert, border: 'border-rose-400', iconColor: 'text-rose-300', action: 'bg-rose-400/10 text-rose-50' },
    warning: { icon: AlertTriangle, border: 'border-amber-400', iconColor: 'text-amber-300', action: 'bg-amber-400/10 text-amber-50' },
    good: { icon: CheckCircle2, border: 'border-emerald-400', iconColor: 'text-emerald-300', action: 'bg-emerald-400/10 text-emerald-50' }
  }[level]
  const Icon = config.icon

  return (
    <article className={`border-l-4 ${config.border} bg-white/5 px-3 py-3`}>
      <div className="flex gap-2.5">
        <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${config.iconColor}`} />
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-blue-100/80">{description}</p>
          <p className={`mt-2 rounded px-2 py-1.5 text-xs leading-5 ${config.action}`}><span className="font-semibold">Chora:</span> {action}</p>
          <p className="mt-2 text-[11px] text-blue-100/70">Mas'ul: {owner}</p>
        </div>
      </div>
    </article>
  )
}

const KpiDashboard = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [actuals, setActuals] = useState(KPI_INITIAL_ACTUALS)
  const [isEntryOpen, setIsEntryOpen] = useState(false)
  const selectedMonth = KPI_MONTHS[selectedIndex]
  const current = actuals[selectedMonth.key] || {}

  const derived = useMemo(() => {
    const conversion = getConversion(current)
    const revenue = getRevenue(current)
    let cumulativeRevenue = 0
    let cumulativeCost = 0

    KPI_MONTHS.forEach((month) => {
      const actual = actuals[month.key]
      const monthRevenue = getRevenue(actual)
      if (monthRevenue !== null) {
        cumulativeRevenue += monthRevenue
        cumulativeCost += actual.cost ?? KPI_PLAN.costPerMonth
      }
    })

    return {
      conversion,
      revenue,
      roi: cumulativeCost ? cumulativeRevenue / cumulativeCost : null,
      chartData: KPI_MONTHS.map((month, index) => ({
        month: month.short,
        conversionPlan: KPI_PLAN.conversion[index],
        conversionActual: getConversion(actuals[month.key]),
        paidPlan: KPI_PLAN.paid[index],
        paidActual: actuals[month.key]?.paid ?? null,
        revenuePlan: KPI_PLAN.revenue.slice(0, index + 1).reduce((sum, value) => sum + value, 0),
        revenueActual: actuals[month.key]
          ? KPI_MONTHS.slice(0, index + 1).reduce((sum, item) => sum + (getRevenue(actuals[item.key]) || 0), 0) || null
          : null
      }))
    }
  }, [actuals, current])

  const cards = [
    { label: 'Lidlar', value: formatNumber(current.leads), plan: `Reja: ${formatNumber(KPI_PLAN.leads[selectedIndex])}`, status: getRatioStatus(current.leads, KPI_PLAN.leads[selectedIndex]), delta: current.leads ? `${Math.round((current.leads / KPI_PLAN.leads[selectedIndex]) * 100)}% reja` : null },
    { label: 'Konversiya', value: formatNumber(derived.conversion, '%'), plan: `Reja: ${KPI_PLAN.conversion[selectedIndex]}%`, status: getRatioStatus(derived.conversion, KPI_PLAN.conversion[selectedIndex]), delta: derived.conversion !== null ? `${(derived.conversion - KPI_PLAN.conversion[selectedIndex]).toFixed(1)} f.p.` : null },
    { label: 'Yangi pullik mijozlar', value: formatNumber(current.paid), plan: `Reja: ${formatNumber(KPI_PLAN.paid[selectedIndex])}`, status: getRatioStatus(current.paid, KPI_PLAN.paid[selectedIndex]), delta: current.paid ? `${Math.round((current.paid / KPI_PLAN.paid[selectedIndex]) * 100)}% reja` : null },
    { label: "Tushum, mln so'm", value: formatNumber(derived.revenue), plan: `Reja: ${formatNumber(KPI_PLAN.revenue[selectedIndex])}`, status: getRatioStatus(derived.revenue, KPI_PLAN.revenue[selectedIndex]), delta: derived.revenue ? `${Math.round((derived.revenue / KPI_PLAN.revenue[selectedIndex]) * 100)}% reja` : null },
    { label: 'D30 retention', value: formatNumber(current.retention, '%'), plan: `Reja: ${KPI_PLAN.retention[selectedIndex]}%`, status: getRatioStatus(current.retention, KPI_PLAN.retention[selectedIndex]), delta: current.retention !== undefined ? `${(current.retention - KPI_PLAN.retention[selectedIndex]).toFixed(0)} f.p.` : null },
    { label: 'Churn', value: formatNumber(current.churn, '%'), plan: 'Maqsad: 50% gacha', status: getChurnStatus(current.churn), delta: current.churn !== undefined ? `${KPI_PLAN.churnMax - current.churn} f.p. zaxira` : null },
    { label: 'CSAT', value: formatNumber(current.csat, '%'), plan: 'Maqsad: 80% dan yuqori', status: getCsatStatus(current.csat), delta: current.csat !== undefined ? `${current.csat - KPI_PLAN.csatMin} f.p.` : null },
    { label: 'ROI, jamlanma', value: derived.roi ? formatNumber(derived.roi, 'x') : '-', plan: 'Yillik maqsad: 4-6x', status: derived.roi === null ? 'neutral' : getRatioStatus(derived.roi, KPI_PLAN.roiMin), delta: null }
  ]

  const alerts = useMemo(() => {
    const nextAlerts = []
    if (derived.conversion !== null && derived.conversion < KPI_PLAN.conversion[selectedIndex]) {
      nextAlerts.push({ level: 'warning', title: 'Konversiya rejadan past', description: `Joriy natija ${formatNumber(derived.conversion, '%')}, reja ${KPI_PLAN.conversion[selectedIndex]}%.`, action: "Kanal va sotuv skriptlarini kohorta kesimida tekshiring.", owner: 'Sotuv + Marketing' })
    }
    if (current.leads && current.leads / KPI_PLAN.leads[selectedIndex] < 0.95) {
      nextAlerts.push({ level: 'warning', title: 'Lid hajmi reja ortida', description: `Lidlar rejaning ${Math.round((current.leads / KPI_PLAN.leads[selectedIndex]) * 100)}% darajasida.`, action: "Kanal kesimida CPL va CPA'ni qayta ko'rib chiqing.", owner: 'Marketing' })
    }
    if (current.churn > KPI_PLAN.churnMax) {
      nextAlerts.push({ level: 'danger', title: `Churn ${formatNumber(current.churn, '%')} ga chiqdi`, description: "Yangilanish tushumi va saqlab qolish ko'rsatkichi xavf ostida.", action: "Obuna tugashidan oldin win-back qamrovini oshiring.", owner: "Xizmat ko'rsatish" })
    }
    if (current.csat < KPI_PLAN.csatMin) {
      nextAlerts.push({ level: 'danger', title: `CSAT ${formatNumber(current.csat, '%')} - maqsaddan past`, description: "Mamnuniyatdagi pasayish churnga ta'sir qilishi mumkin.", action: 'Javob vaqti hamda onboarding SLA auditini boshlang.', owner: "Xizmat ko'rsatish" })
    }
    if (current.retention && KPI_PLAN.retention[selectedIndex] - current.retention > 2) {
      nextAlerts.push({ level: 'warning', title: 'D30 retention reja ortida', description: `Og'ish ${KPI_PLAN.retention[selectedIndex] - current.retention} foiz bandini tashkil qiladi.`, action: 'Push-kampaniyalar va mentor faolligini kuchaytiring.', owner: 'Mahsulot + IT' })
    }
    return nextAlerts.length ? nextAlerts : [{ level: 'good', title: "Ko'rsatkichlar reja doirasida", description: 'Joriy oy uchun kritik trigger aniqlanmadi.', action: 'Haftalik monitoring ritmini saqlang.', owner: 'Barcha jamoalar' }]
  }, [current, derived.conversion, selectedIndex])

  const updateActual = (field, value) => {
    const parsedValue = value === '' ? null : Number(value.replace(',', '.'))
    setActuals((previous) => ({
      ...previous,
      [selectedMonth.key]: { ...previous[selectedMonth.key], [field]: Number.isNaN(parsedValue) ? null : parsedValue }
    }))
  }

  const inputFields = [
    ['leads', 'Lidlar, soni'], ['paid', 'Yangi pullik mijozlar'], ['revenue', "Tushum, mln so'm"], ['retention', 'D30 retention, %'],
    ['churn', 'Churn, %'], ['csat', 'CSAT, %'], ['cost', "Marketing xarajati, mln so'm"], ['salesTeam', 'Sotuv shtati, kishi']
  ]

  return (
    <div className="mx-auto w-full max-w-[1600px] font-sf">
      <section className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
        <div><p className="text-sm font-medium text-[#5D87FF]">IQMath monitoring</p><h1 className="mt-1 text-2xl font-semibold text-[#2A3547]">KPI paneli</h1><p className="mt-1 text-sm text-slate-500">Reja, fakt va operativ qarorlar uchun yagona ko'rinish.</p></div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center"><label className="relative block"><span className="sr-only">Oy tanlash</span><select value={selectedIndex} onChange={(event) => setSelectedIndex(Number(event.target.value))} className="h-10 min-w-[164px] appearance-none rounded-md border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-[#2A3547] outline-none transition focus:border-[#5D87FF] focus:ring-2 focus:ring-blue-100">{KPI_MONTHS.map((month, index) => <option key={month.key} value={index}>{month.label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" /></label><button type="button" onClick={() => setIsEntryOpen((open) => !open)} className="h-10 rounded-md bg-[#5D87FF] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#416fe0] focus:outline-none focus:ring-2 focus:ring-blue-200">{isEntryOpen ? 'Formani yopish' : 'Faktni yangilash'}</button></div>
      </section>

      {isEntryOpen && <section className="mb-6 border border-blue-100 bg-blue-50/50 p-4 sm:p-5"><div className="flex flex-col justify-between gap-3 border-b border-blue-100 pb-4 sm:flex-row sm:items-start"><div><h2 className="font-semibold text-[#2A3547]">Mock faktlar: {selectedMonth.label}</h2><p className="mt-1 text-xs text-slate-500">Bu qiymatlar faqat sahifa ochiq turganida ishlaydi.</p></div><button type="button" onClick={() => setActuals(KPI_INITIAL_ACTUALS)} className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-[#5D87FF] transition-colors hover:text-[#2A3547]"><RotateCcw className="h-4 w-4" /> Mock holatiga qaytarish</button></div><div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{inputFields.map(([field, label]) => <label key={field} className="block"><span className="mb-1.5 block text-xs font-medium text-slate-600">{label}</span><input value={current[field] ?? ''} onChange={(event) => updateActual(field, event.target.value)} inputMode="decimal" className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-[#2A3547] outline-none transition focus:border-[#5D87FF] focus:ring-2 focus:ring-blue-100" /></label>)}</div></section>}

      <section className="grid grid-cols-1 border border-slate-200 bg-white sm:grid-cols-2 xl:grid-cols-4 xl:gap-3 xl:border-0 xl:bg-transparent" aria-label="Asosiy KPI ko'rsatkichlari">{cards.map((card) => <KpiCard key={card.label} {...card} />)}</section>

      <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(340px,0.85fr)_minmax(0,1.15fr)]">
        <div className="bg-[#1E2761] p-5 sm:p-6"><h2 className="text-xl font-semibold text-white">Qarorlar paneli</h2><p className="mt-1 text-sm text-blue-100/80">Triggerlar joriy mock faktlar asosida hisoblanadi.</p><div className="mt-5 space-y-3">{alerts.map((alert) => <AlertItem key={alert.title} {...alert} />)}</div><div className="mt-5 border-t border-blue-200/25 pt-4 text-xs leading-5 text-blue-100/80"><span className="font-semibold text-white">Keyingi bosqich:</span> {KPI_MONTHS[Math.min(selectedIndex + 1, KPI_MONTHS.length - 1)].label} uchun lid {formatNumber(KPI_PLAN.leads[Math.min(selectedIndex + 1, KPI_MONTHS.length - 1)])}, konversiya {KPI_PLAN.conversion[Math.min(selectedIndex + 1, KPI_MONTHS.length - 1)]}%.</div></div>
        <div className="space-y-4">
          <div className="border border-slate-200 bg-white p-4 sm:p-5"><div className="mb-4 flex items-start justify-between gap-4"><div><h2 className="font-semibold text-[#2A3547]">Konversiya</h2><p className="mt-1 text-xs text-slate-500">Reja va fakt, foizlarda</p></div><TrendingDown className="h-5 w-5 text-[#5D87FF]" /></div><div className="h-56"><ResponsiveContainer width="100%" height="100%"><LineChart data={derived.chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}><CartesianGrid vertical={false} stroke="#E9EEF8" /><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#7C8FAC', fontSize: 11 }} /><YAxis tickLine={false} axisLine={false} tick={{ fill: '#7C8FAC', fontSize: 11 }} /><Tooltip formatter={(value) => [formatNumber(value, '%'), '']} /><Line name="Reja" dataKey="conversionPlan" stroke="#A3AED0" strokeDasharray="5 4" dot={false} strokeWidth={2} /><Line name="Fakt" dataKey="conversionActual" stroke="#5D87FF" dot={{ r: 3 }} connectNulls={false} strokeWidth={2.5} /></LineChart></ResponsiveContainer></div></div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2"><div className="border border-slate-200 bg-white p-4 sm:p-5"><div className="mb-4"><h2 className="font-semibold text-[#2A3547]">Pullik mijozlar</h2><p className="mt-1 text-xs text-slate-500">Reja va fakt</p></div><div className="h-52"><ResponsiveContainer width="100%" height="100%"><BarChart data={derived.chartData} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}><CartesianGrid vertical={false} stroke="#E9EEF8" /><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#7C8FAC', fontSize: 10 }} /><YAxis tickLine={false} axisLine={false} tick={{ fill: '#7C8FAC', fontSize: 10 }} /><Tooltip /><Bar name="Reja" dataKey="paidPlan" fill="#DCE6F8" radius={[2, 2, 0, 0]} /><Bar name="Fakt" dataKey="paidActual" fill="#1E2761" radius={[2, 2, 0, 0]} /></BarChart></ResponsiveContainer></div></div><div className="border border-slate-200 bg-white p-4 sm:p-5"><div className="mb-4 flex items-start justify-between"><div><h2 className="font-semibold text-[#2A3547]">Jamlanma tushum</h2><p className="mt-1 text-xs text-slate-500">Mln so'm</p></div><TrendingUp className="h-5 w-5 text-emerald-500" /></div><div className="h-52"><ResponsiveContainer width="100%" height="100%"><LineChart data={derived.chartData} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}><CartesianGrid vertical={false} stroke="#E9EEF8" /><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#7C8FAC', fontSize: 10 }} /><YAxis tickLine={false} axisLine={false} tick={{ fill: '#7C8FAC', fontSize: 10 }} /><Tooltip /><Line name="Reja" dataKey="revenuePlan" stroke="#A3AED0" strokeDasharray="5 4" dot={false} /><Line name="Fakt" dataKey="revenueActual" stroke="#1E2761" dot={{ r: 3 }} connectNulls={false} strokeWidth={2.5} /></LineChart></ResponsiveContainer></div></div></div>
        </div>
      </section>

      <section className="mt-6 overflow-hidden border border-slate-200 bg-white"><div className="flex flex-col gap-1 border-b border-slate-200 px-4 py-4 sm:px-5"><h2 className="font-semibold text-[#2A3547]">Oylik reja-fakt jadvali</h2><p className="text-xs text-slate-500">Faktlar qalin, rejalar kulrang ko'rinadi.</p></div><div className="overflow-x-auto"><table className="min-w-[1020px] w-full text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3 text-left font-medium">Oy</th><th className="px-3 py-3 text-right font-medium">Lid reja</th><th className="px-3 py-3 text-right font-medium">Lid fakt</th><th className="px-3 py-3 text-right font-medium">Konv. reja</th><th className="px-3 py-3 text-right font-medium">Konv. fakt</th><th className="px-3 py-3 text-right font-medium">Pullik reja</th><th className="px-3 py-3 text-right font-medium">Pullik fakt</th><th className="px-3 py-3 text-right font-medium">Tushum reja</th><th className="px-3 py-3 text-right font-medium">Tushum fakt</th><th className="px-3 py-3 text-right font-medium">D30 fakt</th><th className="px-3 py-3 text-right font-medium">Holat</th></tr></thead><tbody>{KPI_MONTHS.map((month, index) => { const actual = actuals[month.key] || {}; const conversion = getConversion(actual); const revenue = getRevenue(actual); const statuses = [getRatioStatus(actual.leads, KPI_PLAN.leads[index]), getRatioStatus(conversion, KPI_PLAN.conversion[index]), getRatioStatus(actual.paid, KPI_PLAN.paid[index]), getChurnStatus(actual.churn), getCsatStatus(actual.csat)]; const status = statuses.includes('danger') ? 'danger' : statuses.includes('warning') ? 'warning' : statuses.includes('good') ? 'good' : 'neutral'; return <tr key={month.key} className={`border-t border-slate-100 ${selectedIndex === index ? 'bg-blue-50/60' : ''}`}><td className="px-4 py-3 font-medium text-[#2A3547]">{month.label}</td><td className="px-3 py-3 text-right text-slate-400">{formatNumber(KPI_PLAN.leads[index])}</td><td className="px-3 py-3 text-right font-semibold text-[#2A3547]">{formatNumber(actual.leads)}</td><td className="px-3 py-3 text-right text-slate-400">{KPI_PLAN.conversion[index]}%</td><td className="px-3 py-3 text-right font-semibold text-[#2A3547]">{formatNumber(conversion, '%')}</td><td className="px-3 py-3 text-right text-slate-400">{formatNumber(KPI_PLAN.paid[index])}</td><td className="px-3 py-3 text-right font-semibold text-[#2A3547]">{formatNumber(actual.paid)}</td><td className="px-3 py-3 text-right text-slate-400">{formatNumber(KPI_PLAN.revenue[index])}</td><td className="px-3 py-3 text-right font-semibold text-[#2A3547]">{formatNumber(revenue)}</td><td className="px-3 py-3 text-right font-semibold text-[#2A3547]">{formatNumber(actual.retention, '%')}</td><td className="px-3 py-3 text-right"><span className={`inline-block h-2.5 w-2.5 rounded-full ${statusStyles[status].dot}`} /></td></tr> })}</tbody></table></div></section>
    </div>
  )
}

export default KpiDashboard
