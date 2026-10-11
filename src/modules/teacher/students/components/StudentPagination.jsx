import React from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { FilterSelect, formatNumber, usePupilsText } from './PupilsUi'

const PAGE_SIZES = [100, 200, 300, 400, 500, 1000]

/** Ko'rsatiladigan sahifa raqamlari: 1 … 4 5 6 … 125 */
const pageItems = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current - 1, current, current + 1])
  if (current <= 3) [2, 3, 4].forEach((p) => pages.add(p))
  if (current >= total - 2) [total - 1, total - 2, total - 3].forEach((p) => pages.add(p))
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const result = []
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) result.push(`gap-${page}`)
    result.push(page)
  })
  return result
}

function StudentPagination({ pagination, onPageChange, onPageSizeChange, isLoading }) {
  const tp = usePupilsText()
  const { current, limit, total, totalPages } = pagination
  const pages = Math.max(totalPages, 1)

  // onPageChange avvalgidek 0 dan boshlanuvchi indeks oladi
  const go = (page) => {
    if (isLoading || page < 1 || page > pages || page === current) return
    onPageChange(page - 1)
  }

  const navButton = (Icon, page, disabled, label) => (
    <button
      type="button"
      aria-label={label}
      onClick={() => go(page)}
      disabled={disabled || isLoading}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E3E8F1] bg-white text-[#334155] transition hover:border-[#2563EB] hover:text-[#2563EB] disabled:pointer-events-none disabled:opacity-40"
    >
      <Icon size={16} />
    </button>
  )

  return (
    <div className="flex flex-col gap-3 border-t border-[#EEF1F6] px-4 py-3.5 md:flex-row md:items-center md:justify-between md:px-5">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm font-medium text-[#5B6478]">
          {tp('totalUsers', { count: formatNumber(total) })}
        </p>
        <FilterSelect
          label={tp('perPage', { count: limit })}
          options={PAGE_SIZES.map((size) => ({ value: size, label: tp('perPage', { count: size }) }))}
          value={limit}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          className="w-32"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {navButton(ChevronsLeft, 1, current <= 1, 'first')}
        {navButton(ChevronLeft, current - 1, current <= 1, 'previous')}
        {pageItems(current, pages).map((item) =>
          typeof item === 'string' ? (
            <span key={item} className="flex h-9 w-7 items-center justify-center text-sm text-[#8A93A6]">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => go(item)}
              disabled={isLoading}
              className={`h-9 min-w-[36px] rounded-lg px-2 text-sm font-semibold transition ${
                item === current
                  ? 'bg-[#2563EB] text-white shadow-[0_8px_16px_-10px_rgba(37,99,235,0.9)]'
                  : 'border border-[#E3E8F1] bg-white text-[#334155] hover:border-[#2563EB] hover:text-[#2563EB]'
              }`}
            >
              {item}
            </button>
          )
        )}
        {navButton(ChevronRight, current + 1, current >= pages, 'next')}
        {navButton(ChevronsRight, pages, current >= pages, 'last')}
      </div>
    </div>
  )
}

export default StudentPagination
