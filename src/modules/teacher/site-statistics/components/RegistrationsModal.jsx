import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { LuSearch } from 'react-icons/lu'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { fmt } from '../utils'

const PAGE_SIZE = 20

const ROLE_META = {
  student: { label: "O'quvchi", cls: 'bg-[#ECF2FF] text-[#4F7CFF]' },
  tutor: { label: "O'qituvchi", cls: 'bg-[#F4ECFF] text-[#8B4FD9]' },
  parent: { label: 'Ota-ona', cls: 'bg-[#FEF5E5] text-[#B76E00]' },
  teacher: { label: 'Mentor', cls: 'bg-[#E6FFFA] text-[#0B8F7B]' }
}

const SUB_META = {
  paid: { label: "To'langan", cls: 'bg-[#E6FFFA] text-[#0B8F7B]' },
  trial: { label: 'Tekin muddat', cls: 'bg-[#ECF2FF] text-[#4F7CFF]' },
  expired: { label: 'Tugagan', cls: 'bg-[#FFF1F2] text-[#E11D48]' }
}

const ROLE_FILTERS = [
  { key: '', label: 'Hammasi' },
  { key: 'student', label: "O'quvchilar" },
  { key: 'tutor', label: "O'qituvchilar" },
  { key: 'parent', label: 'Ota-onalar' }
]

const Badge = ({ meta }) =>
  meta ? (
    <span className={`inline-block whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium ${meta.cls}`}>{meta.label}</span>
  ) : (
    <span className="text-[#7C8FAC]">—</span>
  )

const formatDateTime = (iso) => {
  const d = new Date(iso)
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// range: { start, end, title } | null
const RegistrationsModal = ({ range, onClose }) => {
  const [page, setPage] = useState(1)
  const [role, setRole] = useState('')
  const [search, setSearch] = useState('')
  const [debounced, setDebounced] = useState('')

  useEffect(() => {
    setPage(1)
    setRole('')
    setSearch('')
    setDebounced('')
  }, [range?.start, range?.end])

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(search.trim())
      setPage(1)
    }, 400)
    return () => clearTimeout(id)
  }, [search])

  useEffect(() => {
    if (!range) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [range, onClose])

  const { data, isLoading, isFetching } = useGetQuery({
    key: KEYS.siteRegistrations,
    url: URLS.siteRegistrations,
    params: { start: range?.start, end: range?.end, page, page_size: PAGE_SIZE, role, search: debounced },
    enabled: !!range
  })

  if (!range || typeof document === 'undefined') return null

  const rows = data?.data?.results || []
  const count = data?.data?.count || 0
  const pages = Math.max(1, Math.ceil(count / PAGE_SIZE))

  return createPortal(
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 p-3 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col rounded-xl bg-white shadow-2xl dark:bg-[#202936]">
        {/* Sarlavha */}
        <div className="flex items-start justify-between gap-4 border-b border-[#EAEFF4] px-5 py-4 dark:border-[#2A3447]">
          <div>
            <h3 className="text-lg font-semibold text-[#2A3547] dark:text-white">Ro'yxatdan o'tganlar</h3>
            <p className="text-sm text-[#5A6A85] dark:text-[#7C8FAC]">
              {range.title} · jami {fmt(count)} ta
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAEFF4] text-[#5A6A85] hover:bg-[#DFE5EF] dark:bg-[#2A3447]"
            aria-label="Yopish"
          >
            <X size={16} />
          </button>
        </div>

        {/* Filtrlar */}
        <div className="flex flex-wrap items-center gap-3 px-5 pt-4">
          <div className="relative min-w-[220px] flex-1">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C8FAC]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ism yoki telefon bo'yicha qidirish"
              className="w-full rounded-lg border border-[#E9E9E9] py-2 pl-9 pr-3 text-sm outline-none focus:border-[#4F7CFF] dark:border-[#2A3447] dark:bg-[#1A2232] dark:text-white"
            />
          </div>
          <div className="flex overflow-hidden rounded-lg border border-[#E9E9E9] dark:border-[#2A3447]">
            {ROLE_FILTERS.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => {
                  setRole(r.key)
                  setPage(1)
                }}
                className={`px-3 py-2 text-xs font-medium transition-colors ${
                  role === r.key ? 'bg-[#4F7CFF] text-white' : 'text-[#5A6A85] hover:bg-[#F6F8FB] dark:text-[#AAB7CF] dark:hover:bg-[#2A3447]'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Jadval */}
        <div className={`mt-4 flex-1 overflow-auto px-5 transition-opacity ${isFetching ? 'opacity-60' : ''}`}>
          {isLoading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-blue-500" />
            </div>
          ) : rows.length === 0 ? (
            <p className="py-16 text-center text-sm text-[#7C8FAC]">Bu davrda ro'yxatdan o'tganlar yo'q</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-[1]">
                <tr className="bg-[#F6F8FB] text-left text-xs text-[#5A6A85] dark:bg-[#1A2232] dark:text-[#7C8FAC]">
                  <th className="rounded-l-md px-3 py-2.5 font-medium">#</th>
                  <th className="px-3 py-2.5 font-medium">F.I.Sh</th>
                  <th className="px-3 py-2.5 font-medium">Telefon</th>
                  <th className="px-3 py-2.5 font-medium">Roli</th>
                  <th className="px-3 py-2.5 font-medium">Viloyat</th>
                  <th className="px-3 py-2.5 font-medium">Obuna</th>
                  <th className="rounded-r-md px-3 py-2.5 font-medium">Ro'yxatdan o'tgan vaqti</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((u, i) => (
                  <tr key={u.id} className="border-b border-[#F1F3F7] last:border-0 dark:border-[#2A3447]">
                    <td className="px-3 py-2.5 text-[#7C8FAC]">{(page - 1) * PAGE_SIZE + i + 1}</td>
                    <td className="px-3 py-2.5 font-medium text-[#2A3547] dark:text-white">
                      {u.full_name || <span className="font-normal text-[#7C8FAC]">Profil to'ldirilmagan</span>}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-[#2A3547] dark:text-[#AAB7CF]">{u.phone}</td>
                    <td className="px-3 py-2.5">
                      <Badge meta={ROLE_META[u.role] || { label: u.role, cls: 'bg-[#EEF1F6] text-[#5A6A85]' }} />
                    </td>
                    <td className="px-3 py-2.5 text-[#5A6A85] dark:text-[#AAB7CF]">{u.region || '—'}</td>
                    <td className="px-3 py-2.5">
                      <Badge meta={SUB_META[u.subscription]} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-[#5A6A85] dark:text-[#AAB7CF]">
                      {formatDateTime(u.date_joined)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Sahifalash */}
        <div className="flex items-center justify-between border-t border-[#EAEFF4] px-5 py-3 text-sm text-[#5A6A85] dark:border-[#2A3447] dark:text-[#7C8FAC]">
          <span>
            {count ? `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, count)} / ${fmt(count)}` : '0'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E9E9E9] disabled:opacity-40 dark:border-[#2A3447]"
              aria-label="Oldingi sahifa"
            >
              <ChevronLeft size={16} />
            </button>
            <span>
              {page} / {pages}
            </span>
            <button
              type="button"
              disabled={page >= pages}
              onClick={() => setPage((p) => p + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E9E9E9] disabled:opacity-40 dark:border-[#2A3447]"
              aria-label="Keyingi sahifa"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default RegistrationsModal
