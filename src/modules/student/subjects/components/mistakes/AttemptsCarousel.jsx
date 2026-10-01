import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarDays, Check, ChevronRight, Clock3, X } from 'lucide-react'
import { GREEN, RED, Ring, formatDuration, scoreColor } from './utils'

const LAST = 10

/** Oldingi urinishlar (so'nggi 10 ta) — gorizontal kartalar */
function AttemptsCarousel({ attempts, activeId, onSelect }) {
  const { t } = useTranslation()
  const scrollRef = useRef(null)
  const items = attempts.slice(0, LAST)

  const scrollNext = () => {
    const el = scrollRef.current
    if (!el) return
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div>
      <p className="mb-2.5 text-base font-bold text-[#191C1D] dark:text-white">
        {t('mistakes.lastAttempts', { count: LAST })}
      </p>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-1 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, index) => {
            const active = String(item.id) === String(activeId)
            const score = Math.round(item.score || 0)
            // Vaqt faqat saqlangan urinishlarda chiqadi (eskilarida bo'lmaydi)
            const duration = formatDuration(item.duration_seconds, t)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={`w-[190px] shrink-0 rounded-2xl border-2 bg-white px-4 py-3 text-left transition dark:bg-[#111A2B] ${
                  active
                    ? 'border-[#2563EB] shadow-[0_10px_24px_-16px_rgba(37,99,235,0.9)]'
                    : 'border-[#EEF1F6] hover:border-[#A9C1FF] dark:border-[#26324A]'
                }`}
              >
                <p className="text-xs font-semibold text-[#2563EB]">#{attempts.length - index}</p>
                <p className="flex items-center gap-1.5 text-sm font-bold text-[#191C1D] dark:text-white">
                  <CalendarDays size={14} className="shrink-0 text-[#2563EB]" />
                  {item.date?.split(' ')[0] || '—'}
                  <span className="font-semibold text-[#5B6478]">{item.date?.split(' ')[1] || ''}</span>
                </p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-[11px] font-semibold">
                    <Ring value={score} size={30} stroke={14} color={scoreColor(score)} />
                    <span className="flex flex-col leading-tight">
                      <span className="inline-flex items-center gap-0.5" style={{ color: GREEN }}>
                        {item.correct_answers}
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span className="inline-flex items-center gap-0.5" style={{ color: RED }}>
                        {item.wrong_answers}
                        <X size={11} strokeWidth={3} />
                      </span>
                    </span>
                  </span>
                  <span className="flex flex-col items-end leading-none">
                    <span className="text-2xl font-bold" style={{ color: scoreColor(score) }}>
                      {score}%
                    </span>
                    {duration ? (
                      <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-[#6B7385]">
                        <Clock3 size={11} className="text-[#2563EB]" />
                        {duration}
                      </span>
                    ) : null}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {items.length > 3 ? (
          <button
            type="button"
            onClick={scrollNext}
            aria-label="next"
            className="absolute -right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#EEF1F6] bg-white text-[#2563EB] shadow-md transition hover:bg-[#EAF1FF]"
          >
            <ChevronRight size={18} />
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default AttemptsCarousel
