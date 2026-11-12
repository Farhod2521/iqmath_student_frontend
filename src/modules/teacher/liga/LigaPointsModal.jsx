import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useGetQuery } from '@/hooks'
import { LigaTable as Table } from './LigaParts'
import { API, BUTTON_LIGHT, TD, formatDateTime } from './utils'

const POINTS_PAGE = 20

const SOURCE_STYLE = {
  daily: 'bg-[#EAF0FF] text-[#5D87FF]',
  subject: 'bg-[#E7F8EF] text-[#15803D]',
  test: 'bg-[#FFF4E5] text-[#C2410C]'
}

/** Mentor: o'quvchining mavsum ballari qayerdan kelgani — 20 talik sahifalar bilan */
const LigaPointsModal = ({ season, student, onClose }) => {
  const [source, setSource] = useState('')
  const [page, setPage] = useState(1)
  const params = { student: student.student_id, page, page_size: POINTS_PAGE, ...(source ? { source } : {}) }
  const { data: response, isFetching } = useGetQuery({
    key: ['liga-points', season.id],
    url: `${API}seasons/${season.id}/points/`,
    params,
    staleTime: 0,
    refetchOnMount: 'always'
  })
  const data = response?.data
  const rows = data?.results || []
  const total = data?.count || 0
  const pages = Math.max(1, Math.ceil(total / POINTS_PAGE))
  const summary = data?.summary || []
  const allCount = summary.reduce((sum, item) => sum + item.count, 0)

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const pick = (value) => {
    setSource(value)
    setPage(1)
  }

  const tab = (value, label, count) => (
    <button
      key={value || 'all'}
      onClick={() => pick(value)}
      className={`h-9 rounded-lg px-3 text-sm font-semibold transition ${
        source === value ? 'bg-[#5D87FF] text-white' : 'bg-[#F1F4F9] text-[#475569] hover:bg-[#E6EBF5]'
      }`}
    >
      {label} <span className="opacity-75">({count})</span>
    </button>
  )

  return createPortal(
    <div
      className="fixed inset-0 z-[1300] flex items-center justify-center bg-[#0B1B3F]/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-full w-full max-w-[900px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="border-b border-[#F0F0F0] p-5 pr-14">
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-[#8A8A8E] transition hover:bg-[#F1F4F9]"
          >
            <X size={18} />
          </button>
          <h3 className="text-lg font-bold text-[#191C1D]">{student.full_name}</h3>
          <p className="text-sm text-[#8A8A8E]">
            {student.grade}-sinf • {season.number}-mavsum • Jami:{' '}
            <span className="font-semibold text-[#191C1D]">{data?.participant?.points ?? student.points} ball</span>
          </p>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {summary.map((item) => (
              <div key={item.source} className="rounded-xl border border-[#F0F0F0] p-3">
                <p className="text-xs text-[#8A8A8E]">{item.label}</p>
                <p className="text-lg font-bold text-[#191C1D]">
                  {item.points} <span className="text-sm font-medium text-[#8A8A8E]">ball • {item.count} marta</span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tab('', 'Barchasi', allCount)}
            {summary.map((item) => tab(item.source, item.label, item.count))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <Table head={['#', 'Manba', 'Nima uchun', 'Ball', 'Sana']}>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td className={`${TD} text-[#8A8A8E]`}>{(page - 1) * POINTS_PAGE + index + 1}</td>
                <td className={TD}>
                  <span className={`rounded-md px-2 py-1 text-xs font-semibold ${SOURCE_STYLE[row.source] || ''}`}>
                    {row.source_label}
                  </span>
                </td>
                <td className={`${TD} whitespace-normal`}>{row.detail || '—'}</td>
                <td className={`${TD} font-semibold text-[#15803D]`}>+{row.points}</td>
                <td className={TD}>{formatDateTime(row.created_at)}</td>
              </tr>
            ))}
          </Table>
          {!rows.length ? (
            <p className="py-8 text-center text-sm text-[#8A8A8E]">{isFetching ? 'Yuklanmoqda...' : "Ball tarixi yo'q"}</p>
          ) : null}
        </div>

        {total > POINTS_PAGE ? (
          <div className="flex items-center justify-between gap-2 border-t border-[#F0F0F0] px-5 py-3 text-sm text-[#8A8A8E]">
            <span>Jami {total} ta yozuv</span>
            <div className="flex items-center gap-2">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className={`${BUTTON_LIGHT} disabled:opacity-50`}>
                Oldingi
              </button>
              <span>
                {page} / {pages}
              </span>
              <button disabled={page >= pages} onClick={() => setPage(page + 1)} className={`${BUTTON_LIGHT} disabled:opacity-50`}>
                Keyingi
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  )
}

export default LigaPointsModal
