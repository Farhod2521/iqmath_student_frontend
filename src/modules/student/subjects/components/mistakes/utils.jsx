export const GREEN = '#22C55E'
export const RED = '#EF4444'
export const BLUE = '#2563EB'
export const GRAY = '#CBD5E1'

// Natija rangi: yaxshi — yashil, o'rtacha — ko'k, past — qizil
export const scoreColor = (score) => (score >= 80 ? '#16A34A' : score >= 50 ? BLUE : RED)

// Savol holati: to'g'ri / xato / javoblanmagan
export const statusOf = (question) =>
  question.is_correct ? 'correct' : question.is_answered === false ? 'unanswered' : 'wrong'

export const pick = (obj, field, lang) =>
  (lang === 'ru' ? obj?.[`${field}_ru`] || obj?.[`${field}_uz`] : obj?.[`${field}_uz`]) || ''

// Javob HTML/delimiterli bo'lsa o'zicha, oddiy LaTeX bo'lsa \( \) ichida chiqariladi
export const toMathHtml = (value) => {
  const text = String(value ?? '').trim()
  if (!text) return ''
  if (/<[a-z][\s\S]*>|\\\(|\\\[|\$/i.test(text)) return text
  return `\\(${text}\\)`
}

/** Sarflangan vaqt: "12 daqiqa" / "45 soniya"; saqlanmagan bo'lsa null */
export const formatDuration = (seconds, t) => {
  if (seconds === null || seconds === undefined) return null
  if (seconds < 60) return t('mistakes.seconds', { count: seconds })
  return t('mistakes.minutes', { count: Math.round(seconds / 60) })
}

export const cardClass =
  'rounded-3xl border border-[#EEF1F6] bg-white shadow-[0_8px_30px_-22px_rgba(15,23,42,0.35)] dark:border-[#1F2A3C] dark:bg-[#111A2B]'

/** Kichik halqa (foiz) — natija va urinish kartalari uchun */
export const Ring = ({ value, size = 96, stroke = 10, color = BLUE, track = '#EDF1F8', gradient, children }) => {
  const radius = (100 - stroke) / 2
  const length = 2 * Math.PI * radius
  const id = gradient ? `ring-${gradient.join('').replace(/#/g, '')}` : null
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden="true">
        {gradient ? (
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>
        ) : null}
        <circle cx="50" cy="50" r={radius} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={gradient ? `url(#${id})` : color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${(length * Math.max(0, Math.min(100, value))) / 100} ${length}`}
          className="transition-[stroke-dasharray] duration-700"
        />
      </svg>
      <span className="relative">{children}</span>
    </span>
  )
}
