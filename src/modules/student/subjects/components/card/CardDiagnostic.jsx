import { get } from 'lodash'
import { useTranslation } from 'react-i18next'
import { CalendarDays, ChartColumn, Play, RotateCcw, Target } from 'lucide-react'
import CardSubject from './CardSubject'

// Natija rangi: yaxshi — yashil, o'rtacha — fan rangi, past — sariq
const scoreColor = (score, accent) => (score >= 80 ? '#22C55E' : score >= 50 ? accent : '#F59E0B')

/**
 * Diagnostika kartasi: fan kartasining rasm/sarlavha qismi + diagnostika holati.
 * Topshirilgan bo'lsa — natija, sana, urinishlar va "Natijalarim" / "Qayta topshirish";
 * topshirilmagan bo'lsa — "Boshlash".
 */
const CardDiagnostic = ({ item, theme, onStart, onMistakes }) => {
  const { t } = useTranslation()
  const { accent, soft } = theme

  const taken = Boolean(get(item, 'has_taken_diagnostic'))
  const score = Math.min(100, Math.max(0, Math.round(get(item, 'progress_percent') || 0)))
  const color = scoreColor(score, accent)
  const lastTaken = get(item, 'last_taken_at')
  const attempts = get(item, 'attempts_count', 0)
  const weakTopics = get(item, 'weak_topics_count', 0)

  const stop = (handler) => (event) => {
    event.stopPropagation()
    handler()
  }

  return (
    <CardSubject item={item} theme={theme} onClick={onStart}>
      {/* Barcha kartalar bir xil tuzilishda: natija qatori, 2 qatorli ma'lumot, pastda tugmalar */}
      <div className="mt-3 flex h-[18px] items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EDF0F5] dark:bg-[#2A3547]">
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{ width: `${taken ? score : 0}%`, backgroundColor: color }}
          />
        </div>
        <span className="w-10 text-right text-xs font-bold" style={{ color: taken ? color : '#A0A8BA' }}>
          {taken ? `${score}%` : '—'}
        </span>
      </div>

      <div className="mt-2 flex h-[36px] flex-col justify-center gap-0.5 text-[11px] font-medium leading-[16px] text-[#6B7385] dark:text-gray-300">
        {taken ? (
          <>
            <span className="flex min-w-0 items-center gap-3">
              {lastTaken ? (
                <span className="inline-flex min-w-0 items-center gap-1 truncate">
                  <CalendarDays size={12} className="shrink-0" style={{ color: accent }} />
                  <span className="truncate">{t('diagLastTaken', { date: lastTaken })}</span>
                </span>
              ) : null}
              <span className="inline-flex shrink-0 items-center gap-1">
                <RotateCcw size={12} style={{ color: accent }} />
                {t('diagAttempts', { count: attempts || 1 })}
              </span>
            </span>
            <span className="inline-flex min-w-0 items-center gap-1">
              <Target size={12} className="shrink-0 text-[#F59E0B]" />
              <span className="truncate">{t('diagWeakTopics', { count: weakTopics })}</span>
            </span>
          </>
        ) : (
          <>
            <span className="truncate font-semibold text-[#5B6478] dark:text-gray-200">{t('diagNotTaken')}</span>
            <span className="truncate">{t('diagNotTakenHint')}</span>
          </>
        )}
      </div>

      <div className="mt-auto flex gap-2 pt-3">
        <button
          type="button"
          onClick={stop(taken ? onMistakes : onStart)}
          className="inline-flex h-9 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-2 text-xs font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: accent }}
        >
          {taken ? (
            <ChartColumn size={14} className="shrink-0" />
          ) : (
            <Play size={13} className="shrink-0" fill="currentColor" />
          )}
          <span className="truncate">{taken ? t('diagMistakes') : t('diagStart')}</span>
        </button>
        {taken ? (
          <button
            type="button"
            onClick={stop(onStart)}
            title={t('diagRetake')}
            aria-label={t('diagRetake')}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition hover:opacity-80"
            style={{ backgroundColor: soft, color: accent }}
          >
            <RotateCcw size={15} />
          </button>
        ) : null}
      </div>
    </CardSubject>
  )
}

export default CardDiagnostic
