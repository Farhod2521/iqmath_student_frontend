import { BarChart3, BookOpen, TrendingUp, Calendar, AlertCircle } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

export function ProgressChart({ subject, language }) {
  const chartRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const formatDate = (d) => {
    if (!d) return null
    const dt = new Date(d)
    if (Number.isNaN(dt.getTime())) return d
    return dt.toLocaleDateString()
  }

  const history = useMemo(() => {
    const raw = Array.isArray(subject?.progress_history) ? subject.progress_history : []

    const mapped = raw
      .map((item) => {
        if (item == null) return null
        if (
          typeof item === 'number' ||
          (typeof item === 'string' && item.trim() !== '' && !Number.isNaN(Number(item)))
        ) {
          return Number(item)
        }
        if (typeof item === 'object' && item !== null) {
          const score = item.score ?? item.value ?? item.progress ?? null
          return score == null ? null : Number(score)
        }
        return null
      })
      .filter((n) => Number.isFinite(n))
      .map((n) => Math.max(0, Math.min(100, n)))

    if (!mapped.length && subject?.has_taken_diagnostic && Number.isFinite(Number(subject?.progress_percent))) {
      const p = Math.max(0, Math.min(100, Number(subject.progress_percent)))
      return [p]
    }

    return mapped
  }, [subject])

  const MAX_VISIBLE_POINTS = 25

  const dates = useMemo(() => {
    const raw = Array.isArray(subject?.progress_history) ? subject.progress_history : []
    const d = raw.map((item) => {
      if (item == null) return null
      if (typeof item === 'object' && item !== null)
        return formatDate(item.date ?? item.created_at ?? item.date_string ?? null)
      return null
    })
    if (!d.length && subject?.has_taken_diagnostic) return [null]
    return d
  }, [subject])

  const { visibleHistory, visibleDates, sampledIndices } = useMemo(() => {
    if (history.length <= MAX_VISIBLE_POINTS) {
      return {
        visibleHistory: history,
        visibleDates: dates,
        sampledIndices: history.map((_, i) => i)
      }
    }

    const step = history.length / MAX_VISIBLE_POINTS
    const sampled = []
    const sampledDates = []
    const indices = []

    for (let i = 0; i < MAX_VISIBLE_POINTS; i++) {
      const idx = Math.floor(i * step)
      sampled.push(history[idx])
      sampledDates.push(dates[idx])
      indices.push(idx)
    }

    return {
      visibleHistory: sampled,
      visibleDates: sampledDates,
      sampledIndices: indices
    }
  }, [history, dates])

  const maxValue = useMemo(() => (visibleHistory.length ? Math.max(...visibleHistory) : 100), [visibleHistory])
  const minValue = useMemo(() => (visibleHistory.length ? Math.min(...visibleHistory) : 0), [visibleHistory])
  const range = maxValue - minValue || 1

  useEffect(() => {
    const timeouts = []
    if (chartRef.current) {
      const bars = chartRef.current.querySelectorAll('.chart-bar')
      const delayPerBar = Math.min(50, 400 / visibleHistory.length)

      bars.forEach((bar, index) => {
        const id = setTimeout(() => {
          bar.style.opacity = '1'
          bar.style.transform = 'scaleY(1)'
        }, index * delayPerBar)
        timeouts.push(id)
      })
    }
    return () => {
      timeouts.forEach((id) => clearTimeout(id))
    }
  }, [visibleHistory])

  const handleMouseEnter = (e, index, value, dateLabel) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 8
    })
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  if (!visibleHistory.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'uz' ? subject?.class_uz || 'Fan' : subject?.class_ru || 'Предмет'}
          </h3>
        </div>
        <p className="text-sm text-gray-500">
          {language === 'uz' ? 'Hali tarix mavjud emas' : 'История пока отсутствует'}
        </p>
      </div>
    )
  }

  const repeatedTopics = Array.isArray(subject?.repeated_topics) ? subject.repeated_topics : []
  const topRepeatedTopics = repeatedTopics.slice(0, 3)
  const [expandedTopics, setExpandedTopics] = useState(false)

  // Get current tooltip data
  const currentTooltipData =
    hoveredIndex !== null
      ? {
          value: visibleHistory[hoveredIndex],
          dateLabel: visibleDates[hoveredIndex],
          index: hoveredIndex
        }
      : null

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200 flex flex-col h-full relative">
      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
              {language === 'uz' ? subject.class_uz : subject.class_ru}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg flex-shrink-0">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <p className="text-sm font-bold text-blue-600">{subject.progress_percent}%</p>
          </div>
        </div>

        {subject.last_date && (
          <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{formatDate(subject.last_date)}</span>
          </div>
        )}

        <div>
          {/* Chart with horizontal scroll for many data points */}
          <div className="relative mb-2 overflow-x-auto pb-2" ref={chartRef}>
            <div
              className="flex items-end justify-between gap-1.5 h-24 pb-6 border-b border-gray-200"
              style={{ minWidth: `${Math.max(visibleHistory.length * 28, 200)}px` }}
            >
              {visibleHistory.map((value, index) => {
                const height = ((value - minValue) / range) * 100
                const originalIndex = sampledIndices?.[index] ?? index
                const isLatest = originalIndex === history.length - 1
                const isHovered = hoveredIndex === index
                const dateLabel = visibleDates[index] ?? null

                return (
                  <div key={index} className="flex-1 flex flex-col items-center h-full justify-end relative group">
                    <div
                      className={`chart-bar w-full rounded-t-lg transition-all duration-300 cursor-pointer relative ${
                        isLatest
                          ? 'bg-gradient-to-t from-blue-600 to-blue-400'
                          : 'bg-gradient-to-t from-gray-400 to-gray-300 hover:from-blue-500 hover:to-blue-300'
                      } ${isHovered ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
                      style={{
                        height: `${height}%`,
                        minHeight: '4px',
                        opacity: 0,
                        transform: 'scaleY(0)',
                        transformOrigin: 'bottom'
                      }}
                      onMouseEnter={(e) => handleMouseEnter(e, index, value, dateLabel)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* No tooltip inside here anymore */}
                    </div>
                    <div className="text-[8px] md:text-[10px] text-gray-500 mt-1 font-medium">{originalIndex + 1}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Stats footer */}
          <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded bg-gradient-to-t from-blue-600 to-blue-400"></div>
              <span>
                {language === 'uz' ? 'Eng yuqori' : 'Макс'}: {Math.max(...visibleHistory)}%
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded bg-gradient-to-t from-gray-400 to-gray-300"></div>
              <span>
                {language === 'uz' ? 'Eng past' : 'Мин'}: {Math.min(...visibleHistory)}%
              </span>
            </div>
          </div>
        </div>

        {/* Repeated topics section */}
        {repeatedTopics.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <h4 className="text-sm font-semibold text-gray-900">
                {language === 'uz' ? 'Takrorlanadigan mavzular' : 'Повторяющиеся темы'}
              </h4>
            </div>

            <div className="space-y-1.5">
              {(expandedTopics ? repeatedTopics : topRepeatedTopics).map((topic) => (
                <div
                  key={topic.id}
                  className="flex items-center justify-between p-2 bg-orange-50 rounded hover:bg-orange-100 transition-colors text-xs group cursor-pointer"
                >
                  <p className="text-gray-700 truncate flex-1 group-hover:text-gray-900">
                    {language === 'uz' ? topic.name_uz : topic.name_ru}
                  </p>
                  <span className="inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 bg-orange-200 text-orange-700 font-bold rounded flex-shrink-0 ml-1">
                    {topic.repeat_count}
                  </span>
                </div>
              ))}
            </div>

            {repeatedTopics.length > 3 && (
              <button
                onClick={() => setExpandedTopics(!expandedTopics)}
                className="mt-2 w-full text-xs text-blue-600 hover:text-blue-700 font-medium text-center"
              >
                {expandedTopics
                  ? language === 'uz'
                    ? 'Kamroq'
                    : 'Меньше'
                  : language === 'uz'
                    ? `+${repeatedTopics.length - 3} Ko'proq`
                    : `+${repeatedTopics.length - 3} Ещё`}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Global Tooltip - rendered outside the chart container */}
      {currentTooltipData && (
        <div
          className="fixed bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap z-[9999] pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          <div>{currentTooltipData.value}%</div>
          {currentTooltipData.dateLabel && (
            <div className="text-[8px] md:text-[10px] opacity-80 mt-0.5">{currentTooltipData.dateLabel}</div>
          )}
          <div
            className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full"
            style={{
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '4px solid #111827'
            }}
          />
        </div>
      )}
    </div>
  )
}
