import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  BadgePercent,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  ChartColumn,
  ChevronRight,
  CircleCheck,
  CircleX,
  Clock3,
  Coins,
  Crown,
  CreditCard,
  Eye,
  FileText,
  LayoutGrid,
  ReceiptText,
  Wallet
} from 'lucide-react'
import { useGetQuery } from '@/hooks'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'
import { MiniSelect, card } from '@/modules/parent/home/dashboard/shared'
import { formatDate, formatMoney } from './format'
import ReceiptModal from './ReceiptModal'

const HISTORY_PREVIEW = 5

const SummaryCard = ({ icon: Icon, color, soft, label, value, badge, footer }) => (
  <div className={`${card} flex items-center gap-4 p-4`}>
    <span
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
      style={{ backgroundColor: soft, color }}
    >
      <Icon size={28} />
    </span>
    <div className="min-w-0">
      <p className="truncate text-xs text-[#64748B]">{label}</p>
      <p className="flex flex-wrap items-center gap-2 text-xl font-extrabold text-[#0B1B3F] dark:text-white">
        {value}
        {badge}
      </p>
      <p className="truncate text-xs text-[#8A93A6]">{footer}</p>
    </div>
  </div>
)

const InfoTile = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-[#EEF1F6] p-3 dark:border-[#26324A]">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FF] text-[#2563EB]">
      <Icon size={18} />
    </span>
    <div className="min-w-0">
      <p className="truncate text-[11px] text-[#64748B]">{label}</p>
      <p className="truncate text-sm font-bold text-[#0F172A] dark:text-white">{value || '—'}</p>
    </div>
  </div>
)

const STATUS = {
  success: { Icon: CircleCheck, cls: 'bg-[#DCFCE7] text-[#16A34A]' },
  pending: { Icon: Clock3, cls: 'bg-[#FEF3C7] text-[#D97706]' },
  failed: { Icon: CircleX, cls: 'bg-[#FEE2E2] text-[#DC2626]' }
}

/** Oylik to'lovlar grafigi — bitta seriya; joriy oy to'qroq rangda */
const MonthlyChart = ({ items = [] }) => {
  const { t } = useTranslation()
  const months = t('parentDash.months', { returnObjects: true }) || []
  const [hover, setHover] = useState(null)
  const max = Math.max(1, ...items.map((m) => m.amount))
  const step = Math.pow(10, Math.max(0, String(Math.round(max)).length - 1))
  const top = Math.ceil(max / step) * step
  const ticks = [top, (top * 2) / 3, top / 3, 0]

  return (
    <div className="flex gap-3">
      <div className="flex h-48 flex-col justify-between pb-6 text-right text-[10px] text-[#94A3B8]">
        {ticks.map((tick) => (
          <span key={tick}>{formatMoney(tick)}</span>
        ))}
      </div>
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[168px] flex-col justify-between">
          {ticks.map((tick) => (
            <span key={tick} className="border-t border-dashed border-[#EEF1F6]" />
          ))}
        </div>
        <div className="relative flex h-[168px] items-end justify-around gap-3">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <div
                key={`${item.year}-${item.month}`}
                className="relative flex h-full w-full max-w-[56px] items-end"
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(null)}
              >
                <div
                  className={`w-full rounded-t-lg transition-colors ${
                    isLast || hover === index ? 'bg-gradient-to-t from-[#2563EB] to-[#3B82F6]' : 'bg-[#BFD3FF]'
                  }`}
                  style={{ height: `${item.amount ? Math.max(4, (item.amount / top) * 100) : 0}%` }}
                />
                {hover === index ? (
                  <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0F172A] px-2.5 py-1.5 text-[11px] font-semibold text-white">
                    {formatMoney(item.amount)} {t('childPage.som')}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
        <div className="mt-2 flex justify-around gap-3 text-[11px] text-[#64748B]">
          {items.map((item) => (
            <span key={`${item.year}-${item.month}`} className="w-full max-w-[56px] text-center">
              {months[item.month - 1]} {String(item.year).slice(2)}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * To'lovlar tabi. Ota-ona sahifasida `childId` bilan, o'quvchi profilida esa
 * `url` + `queryKey` bilan (o'z to'lovlari) ishlatiladi.
 */
const PaymentsTab = ({ childId, onExtend, url, queryKey }) => {
  const { t, i18n } = useTranslation()
  const [months, setMonths] = useState('6')
  const [showAll, setShowAll] = useState(false)
  const [receipt, setReceipt] = useState(null)

  const { data: response, isLoading } = useGetQuery({
    key: [queryKey || KEYS.parentChildPayments, childId],
    url: url || `${URLS.parentChildOverview}${childId}/payments/`,
    params: { months },
    enabled: !!(url || childId)
  })
  const data = response?.data

  if (isLoading && !data) {
    return <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />
  }
  if (!data) return null

  const { current, summary, history, monthly } = data
  const subjects = (current?.subjects || [])
    .map((s) => (i18n.language === 'ru' ? s.name_ru || s.name_uz : s.name_uz))
    .join(', ')
  const planName = current?.months ? t('childPage.monthsPlan', { n: current.months }) : t('childPage.plan')
  const elapsed = current?.total_days
    ? Math.min(100, ((current.total_days - current.days_left) / current.total_days) * 100)
    : 0
  const lastDiscount = history.find((h) => h.status === 'success')?.discount_percent
  const rows = showAll ? history : history.slice(0, HISTORY_PREVIEW)
  const p = (key, opts) => t(`childPage.pay.${key}`, opts)

  return (
    <div className="space-y-4">
      {/* Qisqa ko'rsatkichlar */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={Crown}
          color="#F59E0B"
          soft="#FFF6E0"
          label={p('currentPlan')}
          value={current ? planName : '—'}
          badge={
            current ? (
              <span
                className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${
                  current.is_active ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#F1F5F9] text-[#64748B]'
                }`}
              >
                {current.is_active ? p('active') : p('inactive')}
              </span>
            ) : null
          }
          footer={subjects || p('noSub')}
        />
        <SummaryCard
          icon={CalendarDays}
          color="#2563EB"
          soft="#EAF1FF"
          label={p('remaining')}
          value={p('days', { n: current?.days_left ?? 0 })}
          footer={current?.end_date ? p('until', { date: formatDate(current.end_date) }) : '—'}
        />
        <SummaryCard
          icon={Wallet}
          color="#7C3AED"
          soft="#F1EBFF"
          label={p('totalPaid')}
          value={`${formatMoney(summary.total_paid)} ${t('childPage.som')}`}
          footer={p('paymentsShort', { n: summary.success_count })}
        />
        <SummaryCard
          icon={ReceiptText}
          color="#2563EB"
          soft="#EEF2FF"
          label={p('paymentsCount')}
          value={p('pcs', { n: summary.success_count })}
          footer={p('successful')}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Faol obuna haqida */}
        <div className={`${card} p-4 sm:p-5`}>
          <div className="mb-4 flex items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 text-base font-bold text-[#0F172A] dark:text-white">
              <Crown size={20} className="fill-[#FBBF24] text-[#F59E0B]" />
              {p('activeInfo')}
            </h3>
            {current?.is_active ? (
              <span className="rounded-lg bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#16A34A]">
                {p('active')}
              </span>
            ) : null}
          </div>

          {current ? (
            <div className="rounded-2xl border border-[#EEF1F6] bg-gradient-to-br from-[#FFFBEB] via-white to-white p-4 dark:border-[#26324A] dark:from-[#2A2414] dark:via-[#111A2B] dark:to-[#111A2B]">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Crown size={44} className="shrink-0 fill-[#FBBF24] text-[#F59E0B]" />
                  <div className="min-w-0">
                    <p className="text-lg font-extrabold text-[#0B1B3F] dark:text-white">{planName}</p>
                    <p className="flex items-center gap-1 truncate text-sm text-[#64748B]">
                      {subjects || '—'} <ChevronRight size={15} />
                    </p>
                  </div>
                </div>
                {current.is_active ? (
                  <span className="shrink-0 rounded-lg bg-[#DCFCE7] px-2.5 py-1 text-sm font-bold text-[#16A34A]">
                    {t('childPage.daysLeft', { n: current.days_left })}
                  </span>
                ) : null}
              </div>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#E5EAF2]">
                <div className="h-full rounded-full bg-[#22C55E]" style={{ width: `${elapsed}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs">
                <span>
                  <span className="block font-semibold text-[#334155] dark:text-gray-200">
                    {formatDate(current.start_date)}
                  </span>
                  <span className="text-[#94A3B8]">{p('started')}</span>
                </span>
                <span className="text-right">
                  <span className="block font-semibold text-[#334155] dark:text-gray-200">
                    {formatDate(current.end_date)}
                  </span>
                  <span className="text-[#94A3B8]">{p('ends')}</span>
                </span>
              </div>
            </div>
          ) : (
            <p className="rounded-2xl bg-[#F8FAFC] p-6 text-center text-sm text-[#64748B]">{p('noSub')}</p>
          )}

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoTile icon={CalendarCheck} label={p('payDate')} value={formatDate(summary.last_date)} />
            <InfoTile icon={CalendarClock} label={p('nextPay')} value={formatDate(current?.next_payment_date)} />
            <InfoTile
              icon={Coins}
              label={p('totalPaid')}
              value={`${formatMoney(summary.total_paid)} ${t('childPage.som')}`}
            />
            <InfoTile
              icon={CreditCard}
              label={p('monthly')}
              value={`${formatMoney(summary.monthly_equivalent)} ${t('childPage.som')}`}
            />
            <InfoTile icon={Wallet} label={p('method')} value={summary.last_gateway} />
            <InfoTile icon={BadgePercent} label={p('discount')} value={lastDiscount ? `${lastDiscount}%` : '—'} />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onExtend}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2563EB] text-sm font-semibold text-white shadow-[0_10px_22px_-12px_rgba(37,99,235,0.9)] transition hover:bg-[#1D4ED8]"
            >
              {p('extend')}
              <ArrowRight size={17} />
            </button>
            <button
              type="button"
              onClick={onExtend}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#EAF1FF] text-sm font-semibold text-[#2563EB] transition hover:bg-[#DCE8FF]"
            >
              <LayoutGrid size={17} />
              {p('plans')}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* To'lovlar tarixi */}
          <div className={`${card} p-4 sm:p-5`}>
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 text-base font-bold text-[#0F172A] dark:text-white">
                <FileText size={20} className="text-[#2563EB]" />
                {p('history')}
              </h3>
              {history.length > HISTORY_PREVIEW ? (
                <button
                  type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB]"
                >
                  {showAll ? p('collapse') : p('viewAll')} <ArrowRight size={13} />
                </button>
              ) : null}
            </div>
            {!history.length ? (
              <p className="py-10 text-center text-sm text-[#94A3B8]">{p('empty')}</p>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-[#EEF1F6] dark:border-[#26324A]">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-[#F8FAFC] text-xs text-[#64748B] dark:bg-[#0F172A]">
                    <tr>
                      <th className="px-3 py-2.5 font-semibold">#</th>
                      <th className="px-3 py-2.5 font-semibold">{p('colDate')}</th>
                      <th className="px-3 py-2.5 font-semibold">{p('colAmount')}</th>
                      <th className="px-3 py-2.5 font-semibold">{p('colMethod')}</th>
                      <th className="px-3 py-2.5 font-semibold">{p('colStatus')}</th>
                      <th className="px-3 py-2.5 text-center font-semibold">{t('childPage.pay.receipt.view')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => {
                      const status = STATUS[row.status] || STATUS.pending
                      return (
                        <tr key={row.id} className="border-t border-[#EEF1F6] dark:border-[#26324A]">
                          <td className="px-3 py-2.5 text-[#64748B]">{row.number}</td>
                          <td className="px-3 py-2.5 text-[#334155] dark:text-gray-200">
                            {formatDate(row.date)}
                            {row.paid_by === 'parent' ? (
                              <span className="ml-2 inline-flex rounded-md bg-[#F1EBFF] px-1.5 py-0.5 text-[11px] font-semibold text-[#7C3AED]">
                                {t('childPage.pay.receipt.byParent')}
                              </span>
                            ) : null}
                          </td>
                          <td className="px-3 py-2.5 font-bold text-[#0F172A] dark:text-white">
                            {formatMoney(row.amount)} {t('childPage.som')}
                          </td>
                          <td className="px-3 py-2.5 text-[#334155] dark:text-gray-200">{row.gateway || '—'}</td>
                          <td className="px-3 py-2.5">
                            <span
                              className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-semibold ${status.cls}`}
                            >
                              <status.Icon size={13} />
                              {p(`status_${row.status}`)}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            <button
                              type="button"
                              onClick={() => setReceipt(row)}
                              title={t('childPage.pay.receipt.view')}
                              aria-label={t('childPage.pay.receipt.view')}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#2563EB] transition hover:bg-[#EAF1FF]"
                            >
                              <Eye size={17} />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* To'lovlar statistikasi */}
          <div className={`${card} p-4 sm:p-5`}>
            <div className="mb-4 flex items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 text-base font-bold text-[#0F172A] dark:text-white">
                <ChartColumn size={20} className="text-[#2563EB]" />
                {p('stats')}
              </h3>
              <MiniSelect
                value={months}
                onChange={setMonths}
                options={[
                  { value: '6', label: p('last6') },
                  { value: '12', label: p('last12') }
                ]}
              />
            </div>
            <MonthlyChart items={monthly} />
          </div>
        </div>
      </div>
      <ReceiptModal payment={receipt} onClose={() => setReceipt(null)} />
    </div>
  )
}

export default PaymentsTab
