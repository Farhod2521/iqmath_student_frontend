import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Calculator, Layers, Lightbulb, Ruler, Shapes, Triangle } from 'lucide-react'
import { cardClass, pick } from './utils'

// Qatorlar tartibi bo'yicha rang va ikonka (mavzuning o'ziga bog'liq emas)
const ROWS = [
  { Icon: Calculator, color: '#3B82F6', soft: '#E0EAFF' },
  { Icon: Triangle, color: '#F97316', soft: '#FFEDD5' },
  { Icon: Ruler, color: '#6D28D9', soft: '#EDE9FE' },
  { Icon: Lightbulb, color: '#10B981', soft: '#D1FAE5' },
  { Icon: Shapes, color: '#EF4444', soft: '#FEE2E2' },
  { Icon: Layers, color: '#0EA5E9', soft: '#E0F2FE' }
]

/** Mavzular bo'yicha natija: to'g'ri / jami va foiz */
function TopicResultsCard({ questions, lang }) {
  const { t } = useTranslation()

  const topics = useMemo(() => {
    const map = new Map()
    questions.forEach((question) => {
      const name = pick(question, 'topic', lang) || t('mistakes.noTopic')
      const row = map.get(name) || { name, total: 0, correct: 0 }
      row.total += 1
      if (question.is_correct) row.correct += 1
      map.set(name, row)
    })
    return Array.from(map.values())
      .map((row) => ({ ...row, percent: Math.round((row.correct * 100) / row.total) }))
      .sort((a, b) => b.percent - a.percent || b.total - a.total)
  }, [questions, lang, t])

  return (
    <div className={`${cardClass} p-5`}>
      <h3 className="mb-4 text-lg font-bold text-[#191C1D] dark:text-white">{t('mistakes.byTopic')}</h3>
      {topics.length ? (
        <ul className="max-h-[260px] space-y-3.5 overflow-y-auto pr-1">
          {topics.map((row, index) => {
            const { Icon, color, soft } = ROWS[index % ROWS.length]
            return (
              <li key={row.name} className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: soft, color }}
                >
                  <Icon size={17} />
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-[#191C1D] dark:text-gray-100" title={row.name}>
                  {row.name}
                </span>
                <span className="h-2.5 w-24 shrink-0 overflow-hidden rounded-full bg-[#EDF1F8] sm:w-32">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${row.percent}%`, backgroundColor: color }}
                  />
                </span>
                <span className="w-9 shrink-0 text-right text-sm text-[#5B6478]">
                  {row.correct}/{row.total}
                </span>
                <span className="w-10 shrink-0 text-right text-sm font-bold text-[#EF4444]">{row.percent}%</span>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="py-4 text-center text-sm text-[#8A93A6]">—</p>
      )}
    </div>
  )
}

export default TopicResultsCard
