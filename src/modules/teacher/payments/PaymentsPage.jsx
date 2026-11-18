import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  Download,
  Layers,
  MoreHorizontal,
  Phone,
  Search,
  User,
  Wallet
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { PaymentSystem, paymentSystemKey, paymentSystemName, PaymentSystemIcon } from './PaymentSystemIcon'

// ───────────────────────── yordamchilar ─────────────────────────

const DAY = 24 * 60 * 60 * 1000

const num = (v) => {
  const n = parseFloat(v)
  return Number.isFinite(n) ? n : 0
}

const money = (v) =>
  Math.round(num(v))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

// 998901234567 → +998 90 123 45 67
const formatPhone = (phone) => {
  const digits = String(phone || '').replace(/\D/g, '')
  const m = digits.match(/^(998)(\d{2})(\d{3})(\d{2})(\d{2})$/)
  return m ? `+${m[1]} ${m[2]} ${m[3]} ${m[4]} ${m[5]}` : phone || '—'
}

const pad = (n) => String(n).padStart(2, '0')
const formatDT = (value) => {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${String(d.getFullYear()).slice(-2)} ${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}`
}
const formatD = (d) => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`
const toInput = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

const paidAt = (p) => new Date(p.payment_date || p.created_at)

const AVATAR_TONES = [
  ['#E0E7FF', '#4F46E5'],
  ['#FFEDD5', '#EA580C'],
  ['#DBEAFE', '#2563EB'],
  ['#DCFCE7', '#16A34A'],
  ['#FCE7F3', '#DB2777'],
  ['#EDE9FE', '#7C3AED']
]
const toneFor = (name) => {
  let h = 0
  for (const ch of String(name || '')) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return AVATAR_TONES[h % AVATAR_TONES.length]
}

const COUPON_TYPES = ['tutor', 'student', 'system']

// ───────────────────────── kichik komponentlar ─────────────────────────

function useOutside(ref, onOutside) {
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onOutside()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [ref, onOutside])
}

function FilterDropdown({ icon: Icon, label, valueLabel, children, width = 240 }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOutside(ref, () => setOpen(false))

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-11 items-center gap-2.5 rounded-xl border bg-white px-3.5 text-sm transition ${
          open ? 'border-[#2563EB] ring-4 ring-[#2563EB]/10' : 'border-[#E3E8F2] hover:border-[#C9D3E6]'
        }`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F1F5FF] text-[#2563EB]">
          <Icon size={16} />
        </span>
        <span className="whitespace-nowrap text-[#5B6478]">
          {label && <>{label}: </>}
          <b className="font-semibold text-[#0F1B3D]">{valueLabel}</b>
        </span>
        <ChevronDown size={16} className={`text-[#5B6478] transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div
          className="absolute left-0 top-[calc(100%+6px)] z-30 rounded-xl border border-[#E3E8F2] bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(15,27,61,0.25)]"
          style={{ width }}
        >
          {typeof children === 'function' ? children(() => setOpen(false)) : children}
        </div>
      )}
    </div>
  )
}

function MenuItem({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
        active ? 'bg-[#EEF3FF] font-semibold text-[#1D4ED8]' : 'text-[#334155] hover:bg-[#F6F8FC]'
      }`}
    >
      <span className="flex items-center gap-2">{children}</span>
      {active && <Check size={16} strokeWidth={2.5} />}
    </button>
  )
}

function Delta({ value }) {
  if (value === null || value === undefined || !Number.isFinite(value)) return null
  const up = value >= 0
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold ${
        up ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEE2E2] text-[#B91C1C]'
      }`}
    >
      {up ? <ArrowUp size={12} strokeWidth={3} /> : <ArrowDown size={12} strokeWidth={3} />}
      {up ? '+' : ''}
      {value.toFixed(1)}%
    </span>
  )
}

// KPI kartochka: chapda 3D rasm, rangli yengil gradient fon, o'ng pastda to'lqin bezagi
const KPI_THEMES = {
  blue: { from: '#F4F8FF', to: '#E6EFFF', border: '#DCE7FB', wave: '#BFD6FF' },
  green: { from: '#F2FBF6', to: '#E1F6EA', border: '#D3F0DF', wave: '#A8E6C4' },
  purple: { from: '#F7F5FF', to: '#ECE7FF', border: '#E3DCFB', wave: '#CFC2FF' },
  orange: { from: '#FFF9F2', to: '#FFEFDD', border: '#FBE6CC', wave: '#FFD3A3' }
}

function KpiCard({ image, theme = 'blue', label, value, unit, delta }) {
  const t = KPI_THEMES[theme]
  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-4 pr-5 shadow-[0_10px_28px_-20px_rgba(15,27,61,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-20px_rgba(15,27,61,0.5)]"
      style={{ background: `linear-gradient(135deg, #FFFFFF 0%, ${t.from} 45%, ${t.to} 100%)`, borderColor: t.border }}
    >
      {/* to'lqin bezagi */}
      <svg
        className="pointer-events-none absolute bottom-0 right-0 h-16 w-2/3"
        viewBox="0 0 300 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 80 C 90 78, 140 30, 220 26 S 300 6, 300 0 L 300 80 Z" fill={t.wave} fillOpacity="0.45" />
        <path d="M60 80 C 140 76, 190 46, 250 40 S 300 26, 300 20 L 300 80 Z" fill={t.wave} fillOpacity="0.35" />
      </svg>

      <div className="relative flex items-center gap-4">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="h-[72px] w-[72px] shrink-0 object-contain drop-shadow-[0_8px_12px_rgba(15,27,61,0.12)]"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate pt-0.5 text-sm text-[#334155]">{label}</p>
            <Delta value={delta} />
          </div>
          <p className="mt-1.5 truncate text-[26px] font-extrabold leading-tight tracking-tight text-[#0F1B3D]">
            {value} <span className="text-lg font-bold">{unit}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

function RowMenu({ payment, L }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOutside(ref, () => setOpen(false))

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(formatPhone(payment.student_phone))
      toast.success(L('Telefon nusxalandi', 'Телефон скопирован'))
    } catch {
      toast.error(L('Nusxalab bo‘lmadi', 'Не удалось скопировать'))
    }
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#5B6478] hover:bg-[#EEF2F8]"
        aria-label={L('Amallar', 'Действия')}
      >
        <MoreHorizontal size={18} />
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-30 w-52 rounded-xl border border-[#E3E8F2] bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(15,27,61,0.25)]">
          {payment.student_phone ? (
            <>
              <a
                href={`tel:${payment.student_phone}`}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#334155] hover:bg-[#F6F8FC]"
              >
                <Phone size={15} /> {L('Qo‘ng‘iroq qilish', 'Позвонить')}
              </a>
              <button
                type="button"
                onClick={copyPhone}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[#334155] hover:bg-[#F6F8FC]"
              >
                <Copy size={15} /> {L('Telefonni nusxalash', 'Скопировать телефон')}
              </button>
            </>
          ) : (
            <p className="px-3 py-2 text-sm text-[#94A3B8]">{L('Telefon yo‘q', 'Нет телефона')}</p>
          )}
        </div>
      )}
    </div>
  )
}

function pageList(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, page, page - 1, page + 1])
  if (page <= 3) [2, 3, 4, 5].forEach((p) => pages.add(p))
  if (page >= total - 2) [total - 4, total - 3, total - 2, total - 1].forEach((p) => pages.add(p))
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const out = []
  sorted.forEach((p, i) => {
    if (i && p - sorted[i - 1] > 1) out.push('…' + p)
    out.push(p)
  })
  return out
}

// ───────────────────────── sahifa ─────────────────────────

export default function PaymentsPage({ payments = [] }) {
  const { i18n } = useTranslation()
  const ru = i18n.language === 'ru'
  const L = (uz, r) => (ru ? r : uz)

  const PRESETS = [
    { key: '1', label: L('Bugun', 'Сегодня'), days: 1 },
    { key: '7', label: L('Oxirgi 7 kun', 'Последние 7 дней'), days: 7 },
    { key: '30', label: L('Oxirgi 30 kun', 'Последние 30 дней'), days: 30 },
    { key: '90', label: L('Oxirgi 90 kun', 'Последние 90 дней'), days: 90 },
    { key: '365', label: L('Oxirgi 1 yil', 'Последний год'), days: 365 },
    { key: 'all', label: L('Barcha vaqt', 'Всё время'), days: null }
  ]

  // Standart — barcha vaqt: eski (masalan, 2025-yilgi Multicard) to'lovlar ham darhol ko'rinsin
  const [preset, setPreset] = useState('all')
  const [custom, setCustom] = useState(null) // { from: Date, to: Date }
  const [method, setMethod] = useState('all')
  const [source, setSource] = useState('all')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Tanlangan davr [from, to) — "Barcha vaqt" uchun null
  const range = useMemo(() => {
    if (custom) return { from: startOfDay(custom.from), to: new Date(startOfDay(custom.to).getTime() + DAY) }
    const p = PRESETS.find((x) => x.key === preset)
    if (!p?.days) return null
    const to = new Date(startOfDay(new Date()).getTime() + DAY)
    return { from: new Date(to.getTime() - p.days * DAY), to }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, custom])

  const rangeLabel = range
    ? `${formatD(range.from)} – ${formatD(new Date(range.to.getTime() - DAY))}`
    : L('Barcha vaqt', 'Всё время')

  const methods = useMemo(() => {
    const set = new Set(payments.map((p) => paymentSystemKey(p.payment_gateway)))
    return [...set].sort()
  }, [payments])

  // Davrdan tashqari filtrlar (usul, manba, qidiruv)
  const matchesOther = (p) => {
    if (method !== 'all' && paymentSystemKey(p.payment_gateway) !== method) return false
    if (source === 'none' && p.coupon_code) return false
    if (COUPON_TYPES.includes(source) && p.coupon_type !== source) return false
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      const phone = String(p.student_phone || '').replace(/\D/g, '')
      const qDigits = q.replace(/\D/g, '')
      if (!String(p.student_name || '').toLowerCase().includes(q) && !(qDigits && phone.includes(qDigits))) return false
    }
    return true
  }

  const inRange = (p, r) => {
    if (!r) return true
    const t = paidAt(p).getTime()
    return t >= r.from.getTime() && t < r.to.getTime()
  }

  const filtered = useMemo(
    () =>
      payments
        .filter((p) => inRange(p, range) && matchesOther(p))
        .sort((a, b) => paidAt(b) - paidAt(a)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [payments, range, method, source, query]
  )

  const stats = (rows) => {
    const total = rows.reduce((s, p) => s + num(p.amount), 0)
    const payers = new Set(rows.map((p) => p.student_phone || p.student_name)).size
    const cashback = rows.reduce((s, p) => s + num(p.teacher_cashback_amount) + num(p.student_cashback_amount), 0)
    return { total, payers, avg: rows.length ? total / rows.length : 0, cashback, count: rows.length }
  }

  const cur = stats(filtered)
  const prev = useMemo(() => {
    if (!range) return null
    const len = range.to - range.from
    const pr = { from: new Date(range.from.getTime() - len), to: range.from }
    return stats(payments.filter((p) => inRange(p, pr) && matchesOther(p)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments, range, method, source, query])

  const delta = (a, b) => (prev && b > 0 ? ((a - b) / b) * 100 : null)

  useEffect(() => setPage(1), [range, method, source, query, pageSize])

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, pages)
  const rows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize)

  const exportCsv = () => {
    const head = [
      '#',
      L("O'quvchi", 'Ученик'),
      L('Telefon', 'Телефон'),
      L("Summa (so'm)", 'Сумма (сум)'),
      L('Chegirma %', 'Скидка %'),
      L('Kupon', 'Купон'),
      L("To'lov usuli", 'Способ оплаты'),
      L('Cashback', 'Кешбэк'),
      L('Yaratilgan sana', 'Дата создания'),
      L("To'lov sanasi", 'Дата оплаты')
    ]
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const lines = filtered.map((p, i) =>
      [
        i + 1,
        p.student_name,
        formatPhone(p.student_phone),
        Math.round(num(p.amount)),
        p.discount_percent || 0,
        p.coupon_code || '',
        paymentSystemName(p.payment_gateway),
        Math.round(num(p.teacher_cashback_amount)),
        formatDT(p.created_at),
        formatDT(p.payment_date)
      ]
        .map(esc)
        .join(';')
    )
    const blob = new Blob(['﻿' + [head.map(esc).join(';'), ...lines].join('\n')], {
      type: 'text/csv;charset=utf-8'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tolovlar_${range ? toInput(range.from) + '_' + toInput(new Date(range.to - DAY)) : 'hammasi'}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const sourceLabel = {
    all: L('Barchasi', 'Все'),
    none: L('Kuponsiz', 'Без купона'),
    tutor: L('Tutor kuponi', 'Купон тьютора'),
    student: L("O'quvchi kuponi", 'Купон ученика'),
    system: L('Tizim kuponi', 'Системный купон')
  }

  const th = 'px-3 py-3 text-left text-[12.5px] font-semibold text-[#5B6478] whitespace-nowrap'
  const td = 'px-3 py-3 text-sm text-[#0F1B3D] whitespace-nowrap'

  return (
    <div className="space-y-5 pb-6">
      {/* Sarlavha */}
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.8)]">
          <Wallet size={28} />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#0F1B3D]">{L("To'lovlar", 'Платежи')}</h1>
          <p className="text-sm text-[#5B6478]">
            {L(
              "Foydalanuvchilarning to'lovlari va tranzaksiyalar ro'yxati",
              'Список платежей и транзакций пользователей'
            )}
          </p>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          image="/images/payments/coins.webp"
          theme="blue"
          label={L("Jami to'lovlar", 'Всего платежей')}
          value={money(cur.total)}
          unit={L("so'm", 'сум')}
          delta={delta(cur.total, prev?.total)}
        />
        <KpiCard
          image="/images/payments/users.webp"
          theme="green"
          label={L("To'lov qilganlar", 'Оплатившие')}
          value={money(cur.payers)}
          unit={L('nafar', 'чел.')}
          delta={delta(cur.payers, prev?.payers)}
        />
        <KpiCard
          image="/images/payments/cards.webp"
          theme="purple"
          label={L("O'rtacha summa", 'Средняя сумма')}
          value={money(cur.avg)}
          unit={L("so'm", 'сум')}
          delta={delta(cur.avg, prev?.avg)}
        />
        <KpiCard
          image="/images/payments/gift.webp"
          theme="orange"
          label={L('Jami cashback', 'Всего кешбэка')}
          value={money(cur.cashback)}
          unit={L("so'm", 'сум')}
          delta={delta(cur.cashback, prev?.cashback)}
        />
      </div>

      {/* Filtrlar + jadval */}
      <div className="rounded-2xl border border-[#E8ECF4] bg-white shadow-[0_8px_24px_-18px_rgba(15,27,61,0.35)]">
        <div className="flex flex-wrap items-center gap-3 border-b border-[#EEF2F8] p-4">
          <FilterDropdown icon={CalendarDays} valueLabel={rangeLabel} width={280}>
            {(close) => (
              <>
                {PRESETS.map((p) => (
                  <MenuItem
                    key={p.key}
                    active={!custom && preset === p.key}
                    onClick={() => {
                      setCustom(null)
                      setPreset(p.key)
                      close()
                    }}
                  >
                    {p.label}
                  </MenuItem>
                ))}
                <div className="mt-1.5 border-t border-[#EEF2F8] px-2 pb-1 pt-2.5">
                  <p className="mb-2 text-xs font-semibold text-[#5B6478]">{L('Boshqa davr', 'Другой период')}</p>
                  <form
                    className="flex flex-col gap-2"
                    onSubmit={(e) => {
                      e.preventDefault()
                      const f = new FormData(e.currentTarget)
                      const from = f.get('from')
                      const to = f.get('to')
                      if (!from || !to) return
                      const a = new Date(`${from}T00:00:00`)
                      const b = new Date(`${to}T00:00:00`)
                      setCustom(a <= b ? { from: a, to: b } : { from: b, to: a })
                      close()
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        name="from"
                        type="date"
                        defaultValue={range ? toInput(range.from) : ''}
                        className="h-9 w-full rounded-lg border border-[#E3E8F2] px-2 text-sm outline-none focus:border-[#2563EB]"
                      />
                      <span className="text-[#94A3B8]">–</span>
                      <input
                        name="to"
                        type="date"
                        defaultValue={range ? toInput(new Date(range.to - DAY)) : ''}
                        className="h-9 w-full rounded-lg border border-[#E3E8F2] px-2 text-sm outline-none focus:border-[#2563EB]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="h-9 rounded-lg bg-[#2563EB] text-sm font-semibold text-white hover:bg-[#1D4ED8]"
                    >
                      {L("Qo'llash", 'Применить')}
                    </button>
                  </form>
                </div>
              </>
            )}
          </FilterDropdown>

          <FilterDropdown
            icon={CreditCard}
            label={L("To'lov usuli", 'Способ оплаты')}
            valueLabel={method === 'all' ? L('Barchasi', 'Все') : paymentSystemName(method)}
          >
            {(close) => (
              <>
                <MenuItem
                  active={method === 'all'}
                  onClick={() => {
                    setMethod('all')
                    close()
                  }}
                >
                  {L('Barchasi', 'Все')}
                </MenuItem>
                {methods.map((m) => (
                  <MenuItem
                    key={m}
                    active={method === m}
                    onClick={() => {
                      setMethod(m)
                      close()
                    }}
                  >
                    <PaymentSystemIcon value={m} size={20} /> {paymentSystemName(m)}
                  </MenuItem>
                ))}
              </>
            )}
          </FilterDropdown>

          <FilterDropdown icon={Layers} label={L('Manba', 'Источник')} valueLabel={sourceLabel[source]}>
            {(close) =>
              Object.keys(sourceLabel).map((k) => (
                <MenuItem
                  key={k}
                  active={source === k}
                  onClick={() => {
                    setSource(k)
                    close()
                  }}
                >
                  {sourceLabel[k]}
                </MenuItem>
              ))
            }
          </FilterDropdown>

          <label className="flex h-11 min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-[#E3E8F2] bg-white px-3.5 focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/10">
            <Search size={17} className="text-[#94A3B8]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={L("O'quvchi ismi yoki telefon", 'Имя ученика или телефон')}
              className="w-full bg-transparent text-sm text-[#0F1B3D] outline-none placeholder:text-[#94A3B8]"
            />
          </label>

          <button
            type="button"
            onClick={exportCsv}
            disabled={!filtered.length}
            className="ml-auto flex h-11 items-center gap-2 rounded-xl border border-[#E3E8F2] bg-white px-4 text-sm font-semibold text-[#0F1B3D] transition hover:border-[#C9D3E6] hover:bg-[#F8FAFF] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download size={17} /> Excel
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#F8FAFD]">
              <tr className="border-b border-[#EEF2F8]">
                <th className={`${th} pl-5`}>#</th>
                <th className={th}>{L("O'quvchi", 'Ученик')}</th>
                <th className={th}>{L('Telefon', 'Телефон')}</th>
                <th className={`${th} text-right`}>
                  {L('Summa', 'Сумма')}
                  <br />
                  <span className="font-normal">({L("so'm", 'сум')})</span>
                </th>
                <th className={`${th} text-center`}>{L('Chegirma', 'Скидка')}</th>
                <th className={`${th} text-center`}>{L('Kupon', 'Купон')}</th>
                <th className={th}>{L('Holati', 'Статус')}</th>
                <th className={th}>{L("To'lov usuli", 'Способ оплаты')}</th>
                <th className={`${th} text-right`}>
                  Cashback
                  <br />
                  <span className="font-normal">({L("so'm", 'сум')})</span>
                </th>
                <th className={th}>{L('Yaratilgan sana', 'Дата создания')}</th>
                <th className={th}>{L("To'lov sanasi", 'Дата оплаты')}</th>
                <th className={`${th} pr-5`} />
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => {
                const [abg, afg] = toneFor(p.student_name)
                const discounted = num(p.original_amount) > num(p.amount)
                return (
                  <tr key={p.id} className="border-b border-[#F1F4F9] transition hover:bg-[#F6F9FF]">
                    <td className={`${td} pl-5`}>
                      <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-lg bg-[#F1F5F9] px-1.5 text-xs font-semibold text-[#5B6478]">
                        {(safePage - 1) * pageSize + i + 1}
                      </span>
                    </td>
                    <td className={td}>
                      <div className="flex items-center gap-2.5">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                          style={{ background: abg, color: afg }}
                        >
                          <User size={16} strokeWidth={2.4} />
                        </span>
                        <span className="max-w-[240px] truncate font-semibold" title={p.student_name}>
                          {p.student_name || '—'}
                        </span>
                      </div>
                    </td>
                    <td className={td}>
                      {p.student_phone ? (
                        <a href={`tel:${p.student_phone}`} className="hover:text-[#2563EB] hover:underline">
                          {formatPhone(p.student_phone)}
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className={`${td} text-right`}>
                      <b className="font-bold">{money(p.amount)}</b>
                      {discounted && (
                        <div className="text-xs text-[#94A3B8] line-through">{money(p.original_amount)}</div>
                      )}
                    </td>
                    <td className={`${td} text-center`}>
                      {p.discount_percent > 0 ? (
                        <span className="rounded-md bg-[#FFE4E6] px-1.5 py-0.5 text-xs font-bold text-[#E11D48]">
                          -{p.discount_percent}%
                        </span>
                      ) : (
                        <span className="text-[#94A3B8]">–</span>
                      )}
                    </td>
                    <td className={`${td} text-center`}>
                      {p.coupon_code ? (
                        <span className="rounded-md bg-[#EEF3FF] px-2 py-0.5 font-mono text-xs font-semibold text-[#1D4ED8]">
                          {p.coupon_code}
                        </span>
                      ) : (
                        <span className="text-[#94A3B8]">–</span>
                      )}
                    </td>
                    <td className={td}>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#15803D]">
                        <Check size={13} strokeWidth={3} /> Success
                      </span>
                    </td>
                    <td className={td}>
                      <PaymentSystem value={p.payment_gateway} />
                    </td>
                    <td className={`${td} text-right`}>{money(num(p.teacher_cashback_amount))}</td>
                    <td className={`${td} text-[#334155]`}>{formatDT(p.created_at)}</td>
                    <td className={`${td} text-[#334155]`}>{formatDT(p.payment_date)}</td>
                    <td className={`${td} pr-5`}>
                      <RowMenu payment={p} L={L} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {!rows.length && (
            <div className="flex flex-col items-center gap-2 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F1F5FF] text-[#2563EB]">
                <Wallet size={24} />
              </span>
              <p className="text-sm text-[#5B6478]">
                {L("Tanlangan filtr bo'yicha to'lov topilmadi", 'По выбранным фильтрам платежей не найдено')}
              </p>
            </div>
          )}
        </div>

        {/* Sahifalash */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-5 text-sm text-[#5B6478]">
            <span>
              {L('Jami', 'Всего')}: <b className="text-[#0F1B3D]">{money(filtered.length)}</b> {L('ta', 'шт.')}
            </span>
            <label className="flex items-center gap-2">
              {L('Sahifada', 'На странице')}:
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="h-9 rounded-lg border border-[#E3E8F2] bg-white px-2 text-sm font-semibold text-[#0F1B3D] outline-none focus:border-[#2563EB]"
              >
                {[10, 20, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n} {L('ta', 'шт.')}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage(safePage - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E3E8F2] text-[#334155] hover:bg-[#F6F8FC] disabled:opacity-40"
              aria-label={L('Oldingi', 'Назад')}
            >
              <ChevronLeft size={17} />
            </button>
            {pageList(safePage, pages).map((p) =>
              typeof p === 'string' ? (
                <span key={p} className="px-1 text-[#94A3B8]">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`h-9 min-w-[36px] rounded-lg px-2 text-sm font-semibold transition ${
                    p === safePage
                      ? 'bg-[#2563EB] text-white shadow-[0_6px_14px_-6px_rgba(37,99,235,0.8)]'
                      : 'border border-[#E3E8F2] text-[#334155] hover:bg-[#F6F8FC]'
                  }`}
                >
                  {p}
                </button>
              )
            )}
            <button
              type="button"
              disabled={safePage >= pages}
              onClick={() => setPage(safePage + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E3E8F2] text-[#334155] hover:bg-[#F6F8FC] disabled:opacity-40"
              aria-label={L('Keyingi', 'Вперёд')}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
