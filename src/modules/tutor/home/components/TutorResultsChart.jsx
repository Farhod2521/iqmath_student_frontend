import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const AXIS_TICKS = [0, 25, 50, 75, 100]

const TutorResultsChart = ({ labels, values, compact, isLoading }) => {
  const { t } = useTranslation()

  const WIDTH = compact ? 320 : 560
  const HEIGHT = compact ? 130 : 200
  const PADDING_LEFT = compact ? 30 : 36
  const PADDING_RIGHT = 8
  const PADDING_TOP = compact ? 28 : 34
  const PADDING_BOTTOM = 8
  const tickFontSize = compact ? 9 : 10

  const usableWidth = WIDTH - PADDING_LEFT - PADDING_RIGHT
  const usableHeight = HEIGHT - PADDING_TOP - PADDING_BOTTOM
  const yFor = (value) => PADDING_TOP + usableHeight - (value / 100) * usableHeight

  const { linePoints, areaPoints, peak } = useMemo(() => {
    if (!values || values.length === 0) return { linePoints: '', areaPoints: '', peak: null }

    const step = values.length > 1 ? usableWidth / (values.length - 1) : 0
    const coords = values.map((value, index) => ({
      x: PADDING_LEFT + step * index,
      y: yFor(value),
      value
    }))

    const linePoints = coords.map((c) => `${c.x},${c.y}`).join(' ')
    const baseline = PADDING_TOP + usableHeight
    const areaPoints = `${PADDING_LEFT},${baseline} ${linePoints} ${PADDING_LEFT + usableWidth},${baseline}`

    const peakIndex = values.reduce((best, v, i) => (v > values[best] ? i : best), 0)
    const peak = coords[peakIndex]

    return { linePoints, areaPoints, peak }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  const visibleLabels =
    compact && labels && labels.length > 3
      ? labels.filter((_, i) => i === 0 || i === labels.length - 1 || i === Math.floor((labels.length - 1) / 2))
      : labels

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-[#F0F0F0] bg-white p-3 shadow-sm sm:p-4">
        <div className="h-5 w-40 animate-pulse rounded bg-gray-100" />
        <div className="mt-3 h-[150px] w-full animate-pulse rounded-xl bg-gray-100" />
      </div>
    )
  }

  const hasData = Array.isArray(values) && values.some((value) => value > 0)

  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-white p-3 shadow-sm sm:p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#191C1D]">{t('tutorHome.resultsChartTitle')}</h3>
        <span className="rounded-lg border border-[#E9E9E9] px-3 py-1.5 text-xs font-semibold text-[#5A6A85]">
          {t('tutorHome.resultsChartPeriod')}
        </span>
      </div>

      <div className="relative mt-2 w-full">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="tutorResultsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5D87FF" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#5D87FF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {AXIS_TICKS.map((tick) => (
            <g key={tick}>
              <line
                x1={PADDING_LEFT}
                x2={WIDTH - PADDING_RIGHT}
                y1={yFor(tick)}
                y2={yFor(tick)}
                stroke="#F0F0F0"
                strokeWidth="1"
              />
              <text x={PADDING_LEFT - 8} y={yFor(tick) + 3} textAnchor="end" fontSize={tickFontSize} fill="#8A8A8E">
                {tick}%
              </text>
            </g>
          ))}

          <polygon points={areaPoints} fill="url(#tutorResultsGradient)" />
          <polyline points={linePoints} fill="none" stroke="#5D87FF" strokeWidth="2.5" strokeLinejoin="round" />
          {peak ? <circle cx={peak.x} cy={peak.y} r="4" fill="#5D87FF" stroke="white" strokeWidth="2" /> : null}
        </svg>

        {peak ? (
          <span
            className="absolute -translate-x-1/2 -translate-y-full rounded-lg bg-[#191C1D] px-2 py-1 text-[11px] font-bold text-white"
            style={{ left: `${(peak.x / WIDTH) * 100}%`, top: `${(peak.y / HEIGHT) * 100}%` }}
          >
            {peak.value}%
          </span>
        ) : null}
      </div>

      <div className="flex justify-between text-[11px] text-[#8A8A8E]" style={{ paddingLeft: PADDING_LEFT - 4 }}>
        {(visibleLabels || []).map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      {!hasData ? (
        <p className="mt-2 text-center text-xs text-[#8A8A8E]">{t('tutorHome.resultsChartEmpty')}</p>
      ) : null}
    </div>
  )
}

export default TutorResultsChart
