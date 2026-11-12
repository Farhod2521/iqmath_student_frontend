import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  BookOpen,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Coins,
  Gamepad2,
  Gift,
  Goal,
  Loader2,
  Repeat,
  ShoppingBag,
  Star,
  Trophy,
  TriangleAlert,
  Wallet,
  X
} from 'lucide-react'
import { useGetQuery } from '@/hooks'
import { API, formatDateTime } from './utils'

const PAGE = 20

// Yuqoridagi 3 ta asosiy hisob
const CURRENCIES = {
  gol: { label: 'Gol', unit: 'gol', Icon: Goal, active: 'from-[#5D87FF] to-[#4570EA]', field: 'points' },
  score: { label: 'Ball', unit: 'ball', Icon: Star, active: 'from-[#8B5CF6] to-[#7C3AED]', field: 'score' },
  coin: { label: 'Tanga', unit: 'tanga', Icon: Coins, active: 'from-[#F59E0B] to-[#EA8A00]', field: 'coin' }
}

// Manbalar (liga gol manbalari + hamyon manbalari)
const SOURCES = {
  daily: { Icon: CalendarCheck, tone: 'blue' },
  daily_login: { Icon: CalendarCheck, tone: 'blue' },
  subject: { Icon: BookOpen, tone: 'green' },
  lesson: { Icon: BookOpen, tone: 'green' },
  test: { Icon: Trophy, tone: 'orange' },
  weekly_test: { Icon: Trophy, tone: 'orange' },
  battle: { Icon: Gamepad2, tone: 'violet' },
  reward: { Icon: Gift, tone: 'teal' },
  fine: { Icon: TriangleAlert, tone: 'red' },
  convert: { Icon: Repeat, tone: 'slate' },
  shop: { Icon: ShoppingBag, tone: 'pink' },
  book: { Icon: BookOpen, tone: 'pink' },
  transfer: { Icon: Wallet, tone: 'slate' },
  other: { Icon: Wallet, tone: 'slate' }
}

const TONES = {
  blue: { pill: 'bg-[#EAF0FF] text-[#4570EA]', card: 'from-[#EEF3FF]', icon: 'bg-[#5D87FF]' },
  green: { pill: 'bg-[#E7F8EF] text-[#15803D]', card: 'from-[#EAFBF2]', icon: 'bg-[#16A34A]' },
  orange: { pill: 'bg-[#FFF1E6] text-[#C2410C]', card: 'from-[#FFF4EA]', icon: 'bg-[#F97316]' },
  violet: { pill: 'bg-[#F3EEFF] text-[#7C3AED]', card: 'from-[#F5F0FF]', icon: 'bg-[#8B5CF6]' },
  teal: { pill: 'bg-[#E6FAF6] text-[#0F8A68]', card: 'from-[#E9FBF7]', icon: 'bg-[#13A97F]' },
  red: { pill: 'bg-[#FEECEC] text-[#DC2626]', card: 'from-[#FFF0F0]', icon: 'bg-[#EF4444]' },
  pink: { pill: 'bg-[#FDECF5] text-[#BE185D]', card: 'from-[#FEF0F7]', icon: 'bg-[#EC4899]' },
  slate: { pill: 'bg-[#F1F4F9] text-[#475569]', card: 'from-[#F5F7FB]', icon: 'bg-[#64748B]' }
}

const sourceStyle = (source) => {
  const item = SOURCES[source] || SOURCES.other
  return { Icon: item.Icon, ...TONES[item.tone] }
}

const TH = 'sticky top-0 z-10 whitespace-nowrap bg-[#F5F8FD] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8A8A8E]'
const TD = 'px-4 py-3.5 align-middle text-sm text-[#191C1D]'

/** Mentor: o'quvchining goli (liga mavsumi), balli va tangasi qayerdan kelgani — 20 talik sahifalar bilan */
const LigaPointsModal = ({ season, student, initialCurrency = 'gol', onClose }) => {
  const [currency, setCurrency] = useState(initialCurrency)
  const [source, setSource] = useState('')
  const [page, setPage] = useState(1)
  const isGol = currency === 'gol'
  const meta = CURRENCIES[currency]

  const params = { page, page_size: PAGE, ...(source ? { source } : {}), ...(isGol ? { student: student.student_id } : { currency }) }
  const { data: response, isFetching } = useGetQuery({
    key: ['liga-wallet', season.id, student.student_id, currency],
    url: isGol ? `${API}seasons/${season.id}/points/` : `${API}students/${student.student_id}/wallet/`,
    params,
    staleTime: 0,
    refetchOnMount: 'always'
  })
  const data = response?.data
  const rows = data?.results || []
  const total = data?.count || 0
  const pages = Math.max(1, Math.ceil(total / PAGE))
  const summary = (data?.summary || []).map((item) => ({
    ...item,
    income: isGol ? item.points : item.income,
    expense: isGol ? 0 : item.expense
  }))
  const allCount = summary.reduce((sum, item) => sum + item.count, 0)
  const totalIncome = summary.reduce((sum, item) => sum + item.income, 0)

  const [balances, setBalances] = useState({ gol: student.points, score: student.score ?? 0, coin: student.coin ?? 0 })
  useEffect(() => {
    if (!data) return
    const value = isGol ? data.participant?.points : data.balance
    if (value !== undefined) setBalances((prev) => ({ ...prev, [currency]: value }))
  }, [data, currency, isGol])

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [onClose])

  const switchCurrency = (value) => {
    setCurrency(value)
    setSource('')
    setPage(1)
  }

  const pickSource = (value) => {
    setSource(value)
    setPage(1)
  }

  const empty = <span className="text-[#CBD5E1]">—</span>
  const head = ['#', 'Manba', 'Fan', 'Sinf', 'Bob', 'Mavzu', ...(isGol ? ['Savol'] : []), meta.label, ...(isGol ? [] : ['Qoldiq']), 'Sana']

  const renderRow = (row, index) => {
    const style = sourceStyle(row.source)
    // Eski javobda sinf alohida emas, "Matematika (1-sinf)" ko'rinishida `book` ichida kelardi
    const work = row.work && {
      ...row.work,
      grade: row.work.grade || row.work.book?.match(/\(([^)]+?)-sinf\)/)?.[1] || ''
    }
    const positive = row.points >= 0
    return (
      <tr key={row.id} className="border-b border-[#F1F4F9] transition hover:bg-[#F9FBFE]">
        <td className={`${TD} w-12 text-[#8A8A8E]`}>{(page - 1) * PAGE + index + 1}</td>
        <td className={`${TD} whitespace-nowrap`}>
          <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ${style.pill}`}>
            <style.Icon size={14} />
            {row.source_label}
          </span>
        </td>
        {work ? (
          <>
            <td className={`${TD} whitespace-nowrap font-medium`}>{work.subject || empty}</td>
            <td className={`${TD} whitespace-nowrap`}>
              {work.grade ? (
                <span className="rounded-md bg-[#F1F4F9] px-2 py-0.5 text-xs font-semibold text-[#475569]">{work.grade}-sinf</span>
              ) : (
                empty
              )}
            </td>
            <td className={`${TD} text-[#475569]`}>{work.chapter || empty}</td>
            <td className={`${TD} font-semibold`}>{work.topic || empty}</td>
            {isGol ? <td className={`${TD} whitespace-nowrap text-xs text-[#8A8A8E]`}>#{work.question_id}</td> : null}
          </>
        ) : (
          <td colSpan={isGol ? 5 : 4} className={`${TD} text-[#475569]`}>
            {row.detail || empty}
          </td>
        )}
        <td className={`${TD} whitespace-nowrap`}>
          <span
            className={`rounded-lg px-2.5 py-1 text-sm font-bold ${
              positive ? 'bg-[#E7F8EF] text-[#15803D]' : 'bg-[#FEECEC] text-[#DC2626]'
            }`}
          >
            {positive ? '+' : ''}
            {row.points}
          </span>
        </td>
        {isGol ? null : <td className={`${TD} whitespace-nowrap text-[#64748B]`}>{row.balance_after ?? '—'}</td>}
        <td className={`${TD} whitespace-nowrap text-[#64748B]`}>{formatDateTime(row.created_at)}</td>
      </tr>
    )
  }

  return createPortal(
    <div className="fixed inset-0 z-[1300] flex items-center justify-center bg-[#0B1B3F]/45 p-3 backdrop-blur-sm sm:p-6" onClick={onClose}>
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative flex h-full max-h-[92vh] w-full max-w-[1280px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* Sarlavha */}
        <div className="border-b border-[#F0F0F0] px-6 pb-5 pt-6 sm:px-8">
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl text-[#8A8A8E] transition hover:bg-[#F1F4F9] hover:text-[#191C1D]"
          >
            <X size={20} />
          </button>

          <div className="flex flex-wrap items-start justify-between gap-4 pr-12">
            <div>
              <h3 className="text-2xl font-bold text-[#191C1D]">{student.full_name}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-lg bg-[#F1F4F9] px-2.5 py-1 font-semibold text-[#475569]">{student.grade}-sinf</span>
                <span className="rounded-lg bg-[#F1F4F9] px-2.5 py-1 font-semibold text-[#475569]">{season.number}-mavsum</span>
                {student.phone ? <span className="text-[#8A8A8E]">{student.phone}</span> : null}
              </div>
            </div>

            {/* Gol / Ball / Tanga — bosilganda shu hisob tarixi ochiladi */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(CURRENCIES).map(([key, item]) => {
                const active = key === currency
                return (
                  <button
                    key={key}
                    onClick={() => switchCurrency(key)}
                    className={`flex min-w-[130px] items-center gap-3 rounded-2xl px-4 py-2.5 text-left transition ${
                      active
                        ? `bg-gradient-to-br ${item.active} text-white shadow-md`
                        : 'border border-[#EEF1F6] bg-white text-[#191C1D] hover:border-[#D6DEEB] hover:bg-[#F9FBFE]'
                    }`}
                  >
                    <item.Icon size={22} className={active ? 'opacity-90' : 'text-[#8A8A8E]'} />
                    <span>
                      <span className={`block text-xs font-medium ${active ? 'opacity-80' : 'text-[#8A8A8E]'}`}>
                        {item.label}
                        {key === 'gol' ? ' (mavsum)' : ''}
                      </span>
                      <span className="block text-2xl font-bold leading-tight">{balances[key] ?? 0}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Manbalar bo'yicha */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {summary.map((item) => {
              const style = sourceStyle(item.source)
              const share = totalIncome ? Math.round((item.income / totalIncome) * 100) : 0
              const selected = source === item.source
              return (
                <button
                  key={item.source}
                  onClick={() => pickSource(selected ? '' : item.source)}
                  className={`flex items-center gap-3 rounded-2xl border bg-gradient-to-br to-white p-3.5 text-left transition ${style.card} ${
                    selected ? 'border-[#5D87FF] ring-2 ring-[#5D87FF]/20' : 'border-[#EEF1F6] hover:border-[#D6DEEB]'
                  }`}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${style.icon}`}>
                    <style.Icon size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-[#64748B]">{item.label}</span>
                    <span className="block text-xl font-bold text-[#191C1D]">
                      {item.income ? `+${item.income}` : 0}
                      {item.expense ? <span className="ml-1.5 text-base text-[#DC2626]">−{item.expense}</span> : null}
                      <span className="ml-1 text-sm font-medium text-[#8A8A8E]">{meta.unit}</span>
                    </span>
                    <span className="block text-xs text-[#8A8A8E]">
                      {item.count} marta{item.income ? ` • ${share}%` : ''}
                    </span>
                  </span>
                </button>
              )
            })}
            {!summary.length && !isFetching ? (
              <p className="col-span-full rounded-2xl bg-[#F9FBFE] py-4 text-center text-sm text-[#8A8A8E]">
                {meta.label} bo'yicha yozuvlar yo'q
              </p>
            ) : null}
          </div>

          {summary.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {[{ source: '', label: 'Barchasi', count: allCount }, ...summary].map((item) => {
                const selected = source === item.source
                return (
                  <button
                    key={item.source || 'all'}
                    onClick={() => pickSource(item.source)}
                    className={`inline-flex h-9 items-center gap-2 rounded-xl px-3.5 text-sm font-semibold transition ${
                      selected ? 'bg-[#5D87FF] text-white shadow-sm' : 'bg-[#F1F4F9] text-[#475569] hover:bg-[#E6EBF5]'
                    }`}
                  >
                    {item.label}
                    <span className={`rounded-md px-1.5 text-xs ${selected ? 'bg-white/25' : 'bg-white text-[#8A8A8E]'}`}>{item.count}</span>
                  </button>
                )
              })}
            </div>
          ) : null}
        </div>

        {/* Jadval */}
        <div className="relative flex-1 overflow-auto px-6 sm:px-8">
          <table className="w-full min-w-[960px] border-separate border-spacing-0">
            <thead>
              <tr>
                {head.map((title, index) => (
                  <th key={title} className={`${TH} ${index === 0 ? 'rounded-l-xl' : ''} ${index === head.length - 1 ? 'rounded-r-xl' : ''}`}>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{rows.map(renderRow)}</tbody>
          </table>
          {!rows.length ? (
            <p className="py-16 text-center text-sm text-[#8A8A8E]">{isFetching ? 'Yuklanmoqda...' : `${meta.label} tarixi yo'q`}</p>
          ) : null}
          {isFetching && rows.length ? (
            <div className="pointer-events-none absolute inset-0 flex items-start justify-center bg-white/50 pt-24">
              <Loader2 className="animate-spin text-[#5D87FF]" size={28} />
            </div>
          ) : null}
        </div>

        {/* Sahifalash */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#F0F0F0] px-6 py-4 text-sm text-[#8A8A8E] sm:px-8">
          <span>
            Jami <b className="text-[#191C1D]">{total}</b> ta yozuv
            {total ? ` • ${(page - 1) * PAGE + 1}–${Math.min(page * PAGE, total)} ko'rsatilmoqda` : ''}
          </span>
          {total > PAGE ? (
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="flex h-10 items-center gap-1 rounded-xl bg-[#F1F4F9] px-4 font-semibold text-[#475569] transition hover:bg-[#E6EBF5] disabled:opacity-40"
              >
                <ChevronLeft size={16} /> Oldingi
              </button>
              <span className="min-w-[64px] text-center font-semibold text-[#191C1D]">
                {page} / {pages}
              </span>
              <button
                disabled={page >= pages}
                onClick={() => setPage(page + 1)}
                className="flex h-10 items-center gap-1 rounded-xl bg-[#5D87FF] px-4 font-semibold text-white transition hover:bg-[#4570EA] disabled:opacity-40"
              >
                Keyingi <ChevronRight size={16} />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default LigaPointsModal
