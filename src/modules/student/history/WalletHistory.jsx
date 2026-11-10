import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import {
  ArrowLeftRight,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Gift,
  LayoutGrid,
  Play,
  Send,
  ShieldAlert,
  ShoppingCart,
  Swords,
  Trophy
} from 'lucide-react'
import { FaFutbol } from 'react-icons/fa'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'

const PAGE_SIZE = 20

const TEXTS = {
  uz: {
    title: 'Tarix',
    totals: { gol: 'Jami gol', som: 'Hisobda', coin: 'Jami tanga', score: 'Jami ball' },
    units: { gol: 'gol', som: 'so‘m', coin: 'Tanga', score: 'Ball' },
    tabs: { all: 'Barchasi', score: 'Ball', coin: 'Tanga', som: 'So‘m', gol: 'Gol' },
    head: ['#', 'Sana va vaqt', 'Bo‘lim (manba)', 'Tavsif', 'Turi', 'Miqdor', 'Qoldiq'],
    total: (n) => (
      <>
        Jami: <b className="text-[#0B1B3F]">{n}</b> ta yozuv
      </>
    ),
    empty: 'Bu davrda hech qanday yozuv yo‘q',
    error: 'Tarixni yuklab bo‘lmadi',
    from: 'Dan',
    to: 'Gacha',
    apply: 'Qo‘llash',
    reset: 'Barcha vaqt',
    allTime: 'Barcha vaqt',
    months: ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avg', 'sen', 'okt', 'noy', 'dek']
  },
  ru: {
    title: 'История',
    totals: { gol: 'Всего голов', som: 'На счёте', coin: 'Всего монет', score: 'Всего баллов' },
    units: { gol: 'гол', som: 'сум', coin: 'Монеты', score: 'Баллы' },
    tabs: { all: 'Все', score: 'Баллы', coin: 'Монеты', som: 'Сум', gol: 'Голы' },
    head: ['#', 'Дата и время', 'Раздел (источник)', 'Описание', 'Тип', 'Сумма', 'Остаток'],
    total: (n) => (
      <>
        Всего: <b className="text-[#0B1B3F]">{n}</b> записей
      </>
    ),
    empty: 'За этот период записей нет',
    error: 'Не удалось загрузить историю',
    from: 'С',
    to: 'По',
    apply: 'Применить',
    reset: 'Всё время',
    allTime: 'Всё время',
    months: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
  }
}

// Manba nomlari (backend source_display faqat o'zbekcha)
const SOURCE_LABELS = {
  uz: {
    daily_login: 'Kundalik kirish',
    lesson: 'Dars',
    weekly_test: 'Haftalik test',
    battle: 'O‘yin',
    reward: 'Rag‘bat',
    fine: 'Jarima',
    convert: 'Almashtirish',
    shop: 'Do‘kon',
    book: 'Kitob',
    transfer: 'O‘tkazma',
    other: 'Boshqa'
  },
  ru: {
    daily_login: 'Ежедневный вход',
    lesson: 'Урок',
    weekly_test: 'Недельный тест',
    battle: 'Игра',
    reward: 'Поощрение',
    fine: 'Штраф',
    convert: 'Обмен',
    shop: 'Магазин',
    book: 'Книга',
    transfer: 'Перевод',
    other: 'Другое'
  }
}

const SOURCE_STYLE = {
  daily_login: { Icon: CalendarCheck, box: 'bg-[#E8F0FF] text-[#1D6BFF]' },
  lesson: { Icon: Play, box: 'bg-[#E7F8EE] text-[#16A34A]' },
  weekly_test: { Icon: Trophy, box: 'bg-[#FFF4DD] text-[#D97706]' },
  battle: { Icon: Swords, box: 'bg-[#FFF0E6] text-[#EA580C]' },
  reward: { Icon: Gift, box: 'bg-[#F3E8FF] text-[#9333EA]' },
  fine: { Icon: ShieldAlert, box: 'bg-[#FEE8E8] text-[#DC2626]' },
  convert: { Icon: ArrowLeftRight, box: 'bg-[#E3F7F7] text-[#0D9488]' },
  shop: { Icon: ShoppingCart, box: 'bg-[#F1ECFF] text-[#7C3AED]' },
  book: { Icon: BookOpen, box: 'bg-[#E9EDFF] text-[#4F46E5]' },
  transfer: { Icon: Send, box: 'bg-[#E4F4FD] text-[#0284C7]' },
  other: { Icon: CircleDot, box: 'bg-[#F1F5F9] text-[#64748B]' }
}

const CURRENCY_ICON = {
  gol: null,
  som: '/images/homepage/som.png',
  coin: '/images/homepage/tanga-sm.webp',
  score: '/images/homepage/ball-sm.webp'
}

const CARD_STYLE = {
  gol: { card: 'bg-[#EAF2FF]', circle: 'bg-[#D6E5FF]' },
  som: { card: 'bg-[#E6F8EC]', circle: 'bg-[#CDEFD8]' },
  coin: { card: 'bg-[#FFF5E0]', circle: 'bg-[#FDE8BC]' },
  score: { card: 'bg-[#F1ECFF]', circle: 'bg-[#E2D8FF]' }
}

const CURRENCY_ORDER = ['gol', 'som', 'coin', 'score']
const TAB_ORDER = ['all', 'score', 'coin', 'som', 'gol']

const formatNumber = (value) => Number(value || 0).toLocaleString('ru-RU').replace(/ /g, ' ')

function CurrencyIcon({ currency, size = 20 }) {
  if (currency === 'gol') return <FaFutbol size={size - 2} className="text-[#0B1B3F]" />
  return <Image src={CURRENCY_ICON[currency]} alt="" width={size} height={size} className="object-contain" />
}

function DateRangePicker({ text, range, onChange }) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(range)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    setDraft(range)
    const onClick = (event) => ref.current && !ref.current.contains(event.target) && setOpen(false)
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open, range])

  const label = (iso) => {
    if (!iso) return ''
    const [, m, d] = iso.split('-')
    return `${d}-${text.months[Number(m) - 1]}`
  }
  const caption =
    range.from || range.to
      ? `${label(range.from) || '…'} – ${label(range.to) || '…'}, ${(range.to || range.from).slice(0, 4)}`
      : text.allTime

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 items-center gap-2.5 rounded-xl border border-[#E3E8F0] bg-white px-4 text-[14px] font-medium text-[#0B1B3F] shadow-sm transition hover:border-[#C9D3E3]"
      >
        <CalendarDays size={18} className="text-[#475569]" />
        <span className="whitespace-nowrap">{caption}</span>
        <ChevronDown size={16} className={`text-[#64748B] transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? (
        <div className="absolute right-0 z-30 mt-2 w-[270px] rounded-2xl border border-[#E3E8F0] bg-white p-4 shadow-xl">
          {[
            ['from', text.from],
            ['to', text.to]
          ].map(([field, title]) => (
            <label key={field} className="mb-3 block text-[13px] font-medium text-[#475569]">
              {title}
              <input
                type="date"
                value={draft[field] || ''}
                max={field === 'from' ? draft.to || undefined : undefined}
                min={field === 'to' ? draft.from || undefined : undefined}
                onChange={(event) => setDraft((prev) => ({ ...prev, [field]: event.target.value }))}
                className="mt-1 h-10 w-full rounded-lg border border-[#E3E8F0] px-3 text-[14px] text-[#0B1B3F] outline-none focus:border-[#1D6BFF]"
              />
            </label>
          ))}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                onChange({ from: '', to: '' })
                setOpen(false)
              }}
              className="h-10 flex-1 rounded-lg border border-[#E3E8F0] text-[13px] font-semibold text-[#475569] hover:bg-[#F7F9FC]"
            >
              {text.reset}
            </button>
            <button
              type="button"
              onClick={() => {
                onChange(draft)
                setOpen(false)
              }}
              className="h-10 flex-1 rounded-lg bg-[#1D6BFF] text-[13px] font-semibold text-white hover:bg-[#1557D6]"
            >
              {text.apply}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null
  // Ko'pi bilan 5 ta sahifa raqami: joriy sahifa atrofida
  const start = Math.max(1, Math.min(page - 2, pages - 4))
  const numbers = Array.from({ length: Math.min(5, pages) }, (_, i) => start + i)
  const btn = 'flex h-10 w-10 items-center justify-center rounded-xl border text-[14px] font-semibold transition'
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={`${btn} border-[#E3E8F0] bg-white text-[#0B1B3F] disabled:opacity-40`}
        aria-label="prev"
      >
        <ChevronLeft size={18} />
      </button>
      {numbers.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`${btn} ${
            n === page ? 'border-[#1D6BFF] bg-[#1D6BFF] text-white' : 'border-[#E3E8F0] bg-white text-[#0B1B3F] hover:bg-[#F7F9FC]'
          }`}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        className={`${btn} border-[#E3E8F0] bg-white text-[#0B1B3F] disabled:opacity-40`}
        aria-label="next"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

/**
 * Tarix sahifasi: ball, tanga, so'm va gol bo'yicha barcha kirim/chiqimlar.
 * API: GET /api/v1/func_student/wallet-history/?currency=&date_from=&date_to=&page=
 */
export default function WalletHistory() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const text = TEXTS[lang]
  const sources = SOURCE_LABELS[lang]

  const [tab, setTab] = useState('all')
  const [page, setPage] = useState(1)
  // Standart: barcha vaqt — eski ball/tanga yozuvlari ham ko'rinsin (sanani o'quvchi o'zi tanlaydi)
  const [range, setRange] = useState({ from: '', to: '' })

  const params = useMemo(() => {
    const result = { page, page_size: PAGE_SIZE }
    if (tab !== 'all') result.currency = tab
    if (range.from) result.date_from = range.from
    if (range.to) result.date_to = range.to
    return result
  }, [tab, page, range])

  const { data, isLoading, isFetching, isError } = useGetQuery({
    key: KEYS.walletHistory,
    url: URLS.walletHistory,
    params,
    refetchOnMount: true,
    staleTime: 0
  })

  const payload = data?.data || {}
  const rows = payload.results || []
  const count = payload.count || 0
  const summary = payload.summary || {}
  const pages = Math.max(1, Math.ceil(count / PAGE_SIZE))

  const formatDate = (iso) => {
    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) return ''
    const pad = (n) => String(n).padStart(2, '0')
    return `${pad(date.getDate())}-${text.months[date.getMonth()]}, ${pad(date.getHours())}:${pad(date.getMinutes())}`
  }

  const selectTab = (key) => {
    setTab(key)
    setPage(1)
  }

  const amountView = (row) => (
    <span className={`font-bold ${row.amount < 0 ? 'text-[#DC2626]' : 'text-[#16A34A]'}`}>
      {row.amount > 0 ? '+' : '−'}
      {formatNumber(Math.abs(row.amount))}
    </span>
  )

  const currencyPill = (currency) => (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#F4F6FA] px-3 py-1 text-[13px] font-medium text-[#0B1B3F]">
      <CurrencyIcon currency={currency} size={18} />
      {text.tabs[currency]}
    </span>
  )

  const sourceView = (row) => {
    const style = SOURCE_STYLE[row.source] || SOURCE_STYLE.other
    return (
      <span className="flex items-center gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${style.box}`}>
          <style.Icon size={18} strokeWidth={2.2} />
        </span>
        <span className="font-semibold text-[#0B1B3F]">{sources[row.source] || row.source_display}</span>
      </span>
    )
  }

  return (
    <div className="space-y-5">
      <h1 className="text-[22px] font-bold text-[#0B1B3F] sm:text-[26px]">{text.title}</h1>

      {/* Balans kartalari */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {CURRENCY_ORDER.map((currency) => (
          <div key={currency} className={`flex items-center gap-3 rounded-2xl px-4 py-4 sm:gap-4 sm:px-5 sm:py-5 ${CARD_STYLE[currency].card}`}>
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 ${CARD_STYLE[currency].circle}`}
            >
              <CurrencyIcon currency={currency} size={28} />
            </span>
            <span className="min-w-0">
              <span className="flex items-baseline gap-1.5">
                <span className="text-[22px] font-extrabold leading-none text-[#0B1B3F] sm:text-[28px]">
                  {formatNumber(summary[currency])}
                </span>
                <span className="truncate text-[14px] font-semibold text-[#0B1B3F] sm:text-[16px]">{text.units[currency]}</span>
              </span>
              <span className="mt-1 block truncate text-[12.5px] text-[#475569] sm:text-[14px]">{text.totals[currency]}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Filtrlar */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0 md:pb-0">
          {TAB_ORDER.map((key) => {
            const active = tab === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => selectTab(key)}
                className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border px-4 text-[14px] font-semibold transition ${
                  active
                    ? 'border-[#1D6BFF] bg-[#1D6BFF] text-white shadow-[0_10px_20px_-12px_rgba(29,107,255,0.9)]'
                    : 'border-[#E3E8F0] bg-white text-[#0B1B3F] hover:bg-[#F7F9FC]'
                }`}
              >
                {key === 'all' ? <LayoutGrid size={17} /> : <CurrencyIcon currency={key} size={18} />}
                {text.tabs[key]}
              </button>
            )
          })}
        </div>
        <DateRangePicker
          text={text}
          range={range}
          onChange={(next) => {
            setRange(next)
            setPage(1)
          }}
        />
      </div>

      {/* Jadval */}
      <div className={`overflow-hidden rounded-2xl border border-[#E8ECF3] bg-white transition ${isFetching && !isLoading ? 'opacity-70' : ''}`}>
        {isLoading ? (
          <div className="flex min-h-[260px] items-center justify-center">
            <span className="h-9 w-9 animate-spin rounded-full border-4 border-[#1D6BFF] border-t-transparent" />
          </div>
        ) : isError ? (
          <p className="py-16 text-center text-[15px] text-[#DC2626]">{text.error}</p>
        ) : rows.length === 0 ? (
          <p className="py-16 text-center text-[15px] text-[#64748B]">{text.empty}</p>
        ) : (
          <>
            {/* Kompyuter: jadval */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[860px] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[#E8ECF3] bg-[#F8FAFD] text-[13px] font-semibold text-[#475569]">
                    {text.head.map((title, index) => (
                      <th
                        key={title}
                        className={`px-4 py-3.5 ${index >= 5 ? 'text-right' : ''} ${index === 6 ? 'pr-6' : ''}`}
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={row.id} className="border-b border-[#EEF1F6] last:border-0 hover:bg-[#FAFBFE]">
                      <td className="px-4 py-3.5 text-[#475569]">{(page - 1) * PAGE_SIZE + index + 1}</td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-[#0B1B3F]">{formatDate(row.created_at)}</td>
                      <td className="px-4 py-3.5">{sourceView(row)}</td>
                      <td className="max-w-[340px] px-4 py-3.5 text-[#0B1B3F]">{row.description}</td>
                      <td className="px-4 py-3.5">{currencyPill(row.currency)}</td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-right text-[15px]">{amountView(row)}</td>
                      <td className="whitespace-nowrap px-4 py-3.5 pr-6 text-right font-medium text-[#0B1B3F]">
                        {row.balance_after === null || row.balance_after === undefined ? '—' : formatNumber(row.balance_after)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Telefon: kartochkalar */}
            <ul className="divide-y divide-[#EEF1F6] md:hidden">
              {rows.map((row) => (
                <li key={row.id} className="px-4 py-3.5">
                  <div className="flex items-start justify-between gap-3">
                    {sourceView(row)}
                    <span className="text-right text-[16px]">{amountView(row)}</span>
                  </div>
                  {row.description ? <p className="mt-2 text-[13.5px] text-[#334155]">{row.description}</p> : null}
                  <div className="mt-2 flex items-center justify-between gap-2 text-[12.5px] text-[#64748B]">
                    <span className="flex items-center gap-2">
                      {currencyPill(row.currency)}
                      {formatDate(row.created_at)}
                    </span>
                    {row.balance_after === null || row.balance_after === undefined ? null : (
                      <span>
                        {text.head[6]}: <b className="text-[#0B1B3F]">{formatNumber(row.balance_after)}</b>
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Pastki qism */}
      {!isLoading && count > 0 ? (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-[14px] text-[#475569]">{text.total(count)}</p>
          <Pagination page={page} pages={pages} onChange={setPage} />
        </div>
      ) : null}
    </div>
  )
}
