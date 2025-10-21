import { BarChart3 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

export function ProgressChart({ subject, language }) {
  const chartRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // ✅ progress_history ni xavfsiz olish
  const history = useMemo(() => {
    const raw = Array.isArray(subject?.progress_history) ? subject.progress_history : []
    // Faqat sonlarga o‘tkazamiz va 0–100 oralig‘ida cheklaymiz (ixtiyoriy)
    return raw
      .map((n) => Number(n))
      .filter((n) => Number.isFinite(n))
      .map((n) => Math.max(0, Math.min(100, n)))
  }, [subject])

  // ✅ max/min ni xavfsiz hisoblash (bo‘sh bo‘lsa 100/0 fallback)
  const maxValue = useMemo(() => (history.length ? Math.max(...history) : 100), [history])
  const minValue = useMemo(() => (history.length ? Math.min(...history) : 0), [history])

  // Range 0 bo‘lsa bo‘linishda xato bo‘lmasligi uchun
  const range = maxValue - minValue || 1

  useEffect(() => {
    if (chartRef.current) {
      const bars = chartRef.current.querySelectorAll('.chart-bar')
      bars.forEach((bar, index) => {
        // ketma-ket animatsiya
        const id = setTimeout(() => {
          bar.style.opacity = '1'
          bar.style.transform = 'scaleY(1)'
        }, index * 100)
        // ixtiyoriy cleanup
        return () => clearTimeout(id)
      })
    }
  }, [history])

  // Agar ma’lumot bo‘lmasa, yoqimli placeholder
  if (!history.length) {
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'uz' ? subject.class_uz : subject.class_ru}
          </h3>
          <p className="text-sm text-gray-500">{language === 'uz' ? 'Rivojlanish grafigi' : 'График развития'}</p>
        </div>
      </div>

      <div className="relative" ref={chartRef}>
        <div className="flex items-end justify-between gap-2 h-32 pb-8 border-b border-gray-200">
          {history.map((value, index) => {
            const height = ((value - minValue) / range) * 100
            const isLatest = index === history.length - 1
            const isHovered = hoveredIndex === index

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
                    minHeight: '8px',
                    opacity: 0,
                    transform: 'scaleY(0)',
                    transformOrigin: 'bottom'
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {(isHovered || isLatest) && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap z-10">
                      {value}%
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-2 font-medium">{index + 1}</div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-t from-blue-600 to-blue-400"></div>
              <span className="text-gray-600">{language === 'uz' ? 'Oxirgi natija' : 'Последний результат'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-t from-gray-400 to-gray-300"></div>
              <span className="text-gray-600">{language === 'uz' ? 'Oldingi natijalar' : 'Предыдущие результаты'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-600 mb-1">{language === 'uz' ? 'Eng yuqori' : 'Максимум'}</p>
            <p className="text-lg font-bold text-green-600">{Math.max(...history)}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">{language === 'uz' ? 'Eng past' : 'Минимум'}</p>
            <p className="text-lg font-bold text-red-600">{Math.min(...history)}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">{language === 'uz' ? 'Farq' : 'Разница'}</p>
            <p className="text-lg font-bold text-blue-600">
              {(Math.max(...history) - Math.min(...history)).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
