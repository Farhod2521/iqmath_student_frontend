import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { scoreColor } from './utils'

const arrowClass =
  'flex h-11 w-11 items-center justify-center rounded-xl border border-[#EEF1F6] bg-white text-[#191C1D] shadow-sm transition hover:text-[#2563EB] disabled:pointer-events-none disabled:opacity-40 dark:border-[#26324A] dark:bg-[#111A2B] dark:text-white'

/** Sarlavhadagi urinish tanlagichi: ochiladigan ro'yxat + oldingi/keyingi strelkalar */
function AttemptPicker({ attempts, activeId, onSelect }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const close = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const index = Math.max(
    0,
    attempts.findIndex((item) => String(item.id) === String(activeId))
  )
  const current = attempts[index]
  const numberOf = (i) => attempts.length - i

  return (
    <div className="flex w-full items-center gap-2 sm:w-auto">
      <div ref={ref} className="relative w-full sm:w-auto">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-12 w-full items-center gap-3 sm:h-14 sm:w-auto sm:min-w-[240px] rounded-2xl border border-[#EEF1F6] bg-white px-4 text-left shadow-sm dark:border-[#26324A] dark:bg-[#111A2B]"
        >
          <CalendarDays size={24} className="shrink-0 text-[#2563EB]" />
          <span className="min-w-0 flex-1">
            <span className="block text-xs text-[#6B7385]">
              {t('mistakes.testLabel')}: <b className="text-[#191C1D] dark:text-white">#{numberOf(index)}</b> -{' '}
              {t('diagnostics')}
            </span>
            <span className="block text-sm font-bold text-[#191C1D] dark:text-white">{current?.date || '—'}</span>
          </span>
          <ChevronDown
            size={18}
            className={`shrink-0 text-[#191C1D] transition dark:text-white ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open ? (
          <ul className="absolute right-0 top-16 z-30 max-h-72 w-full overflow-y-auto sm:min-w-[260px] rounded-2xl border border-[#EEF1F6] bg-white py-1.5 shadow-xl dark:border-[#26324A] dark:bg-[#111A2B]">
            {attempts.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    onSelect(item.id)
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-[#F6F8FC] dark:hover:bg-[#162033] ${
                    i === index ? 'bg-[#EAF1FF] dark:bg-[#1E2B48]' : ''
                  }`}
                >
                  <span className="text-[#191C1D] dark:text-white">
                    <b>#{numberOf(i)}</b> · {item.date || '—'}
                  </span>
                  <span className="font-bold" style={{ color: scoreColor(item.score) }}>
                    {Math.round(item.score)}%
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Chap — eskiroq urinish, o'ng — yangiroq */}
      <button
        type="button"
        aria-label="older"
        disabled={index >= attempts.length - 1}
        onClick={() => onSelect(attempts[index + 1].id)}
        className={arrowClass}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        aria-label="newer"
        disabled={index <= 0}
        onClick={() => onSelect(attempts[index - 1].id)}
        className={arrowClass}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

export default AttemptPicker
