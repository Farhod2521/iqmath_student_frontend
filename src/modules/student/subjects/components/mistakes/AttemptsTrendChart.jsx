import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { cardClass } from './utils'

const RANGES = [5, 10, 20, 0] // 0 — barchasi
const W = 360
const H = 200
const PAD = { top: 28, right: 18, bottom: 28, left: 40 }
const LINE = '#2563EB'

/**
 * Natija grafigi: urinishlar natijasi (0–100%) — bitta seriya, maydonli chiziq.
 * Tanlangan urinish yorliq bilan ajratiladi; nuqtani bosib o'sha urinishga o'tish mumkin.
 */
function AttemptsTrendChart({ attempts, activeId, onSelect }) {
  const { t } = useTranslation()
  const [range, setRange] = useState(10)
  const [hover, setHover] = useState(null)

  const numbered = attempts.map((item, index) => ({ ...item, label: `#${attempts.length - index}` }))
  const points = (range ? numbered.slice(0, range) : numbered).reverse()

  const plotW = W - PAD.left - PAD.right
  const plotH = H - PAD.top - PAD.bottom
  const x = (i) => PAD.left + (points.length > 1 ? (plotW * i) / (points.length - 1) : plotW / 2)
  const y = (score) => PAD.top + plotH - (plotH * Math.max(0, Math.min(100, score))) / 100
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(p.score)}`).join(' ')
  const area = points.length ? `${line} L${x(points.length - 1)},${y(0)} L${x(0)},${y(0)} Z` : ''

  const activeIndex = points.findIndex((p) => String(p.id) === String(activeId))
  const shownIndex = hover ?? (activeIndex >= 0 ? activeIndex : points.length - 1)
  const shown = points[shownIndex]
  // Ko'p nuqtada yorliqlar ustma-ust tushmasin
  const labelStep = Math.ceil(points.length / 10)

  return (
    <div className={`${cardClass} p-5`}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-lg font-bold text-[#191C1D] dark:text-white">{t('mistakes.trendTitle')}</h3>
        <label className="relative">
          <select
            value={range}
            onChange={(event) => setRange(Number(event.target.value))}
            className="h-10 cursor-pointer appearance-none rounded-xl border border-[#E5EAF2] bg-white pl-3.5 pr-9 text-sm font-medium text-[#191C1D] outline-none focus:border-[#2563EB] dark:border-[#26324A] dark:bg-[#111A2B] dark:text-white"
          >
            {RANGES.map((value) => (
              <option key={value} value={value}>
                {value ? t('mistakes.lastN', { count: value }) : t('mistakes.all')}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7385]"
          />
        </label>
      </div>

      {points.length < 2 ? (
        <p className="py-8 text-center text-sm text-[#8A93A6]">{t('mistakes.trendNeedMore')}</p>
      ) : (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t('mistakes.trendTitle')}>
          <defs>
            <linearGradient id="mistakes-trend-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={LINE} stopOpacity="0.18" />
              <stop offset="100%" stopColor={LINE} stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 25, 50, 75, 100].map((tick) => (
            <g key={tick}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(tick)} y2={y(tick)} stroke="#E9EEF6" strokeWidth="1" />
              <text x={PAD.left - 8} y={y(tick) + 4} textAnchor="end" fontSize="10" fill="#8A93A6">
                {tick}%
              </text>
            </g>
          ))}

          <path d={area} fill="url(#mistakes-trend-fill)" />
          <path d={line} fill="none" stroke={LINE} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

          {points.map((p, i) => {
            const active = i === shownIndex
            return (
              <g key={p.id}>
                <circle
                  cx={x(i)}
                  cy={y(p.score)}
                  r={active ? 6 : 3.5}
                  fill={active ? '#fff' : LINE}
                  stroke={LINE}
                  strokeWidth={active ? 3 : 1.5}
                />
                {/* Katta ko'rinmas nishon — nuqtani oson tanlash uchun */}
                <circle
                  cx={x(i)}
                  cy={y(p.score)}
                  r="12"
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => onSelect?.(p.id)}
                >
                  <title>{`${p.label} · ${p.date || ''} · ${Math.round(p.score)}%`}</title>
                </circle>
                {i % labelStep === 0 || i === points.length - 1 ? (
                  <text x={x(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#6B7385">
                    {p.label}
                  </text>
                ) : null}
              </g>
            )
          })}

          {shown ? (
            <g
              transform={`translate(${Math.min(Math.max(x(shownIndex), PAD.left + 20), W - PAD.right - 20)}, ${Math.max(y(shown.score) - 20, 12)})`}
            >
              <rect x="-21" y="-11" width="42" height="21" rx="6" fill={LINE} />
              <text y="4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
                {Math.round(shown.score)}%
              </text>
            </g>
          ) : null}
        </svg>
      )}
    </div>
  )
}

export default AttemptsTrendChart
