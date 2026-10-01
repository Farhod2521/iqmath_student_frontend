import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { Bookmark, Check, ChevronDown, ChevronRight, LayoutGrid, List } from 'lucide-react'

const FILTERS = ['all', 'answered', 'unanswered', 'marked']
const FILTER_LABELS = {
  all: 'questionPage.filterAll',
  answered: 'questionPage.filterAnswered',
  unanswered: 'questionPage.filterUnanswered',
  marked: 'questionPage.filterMarked'
}

const mathConfig = { loader: { load: ['input/tex', 'output/chtml'] } }

/**
 * Chap panel: savollar ro'yxati (yoki raqamlar to'ri), filtr va holat belgilari.
 * Mobil ekranda doim ixcham raqamlar to'ri ko'rinadi.
 */
function QuestionSidebar({ questions = [], selectedIndex, answeredIds, markedIds, onSelect }) {
  const { t, i18n } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState('list')

  const items = useMemo(
    () =>
      questions
        .map((question, index) => {
          const id = String(question?.id)
          return { question, index, answered: answeredIds.has(id), marked: markedIds.has(id) }
        })
        .filter((item) => {
          if (filter === 'answered') return item.answered
          if (filter === 'unanswered') return !item.answered
          if (filter === 'marked') return item.marked
          return true
        }),
    [questions, answeredIds, markedIds, filter]
  )

  const textOf = (question) =>
    (i18n.language === 'uz' ? question?.question_text_uz : question?.question_text_ru) ||
    question?.question_text_uz ||
    ''

  const grid = (
    <div className="grid grid-cols-6 gap-2 p-4 sm:grid-cols-8 lg:grid-cols-5">
      {items.map(({ index, answered, marked }) => {
        const active = index === selectedIndex
        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            className={`relative flex aspect-square items-center justify-center rounded-xl text-sm font-bold transition ${
              active
                ? 'bg-[#2563EB] text-white shadow-[0_6px_16px_-6px_rgba(37,99,235,0.7)]'
                : answered
                  ? 'bg-[#E7F8EE] text-[#16A34A] hover:bg-[#D5F3E1]'
                  : 'bg-[#F2F4F8] text-[#191C1D] hover:bg-[#E6EBF3] dark:bg-[#1F2A3C] dark:text-white'
            }`}
          >
            {index + 1}
            {marked ? <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#F59E0B]" /> : null}
          </button>
        )
      })}
    </div>
  )

  const list = (
    <MathJaxContext config={mathConfig}>
      <ul className="space-y-1 p-3">
        {items.map(({ question, index, answered, marked }) => {
          const active = index === selectedIndex
          return (
            <li key={index}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition ${
                  active ? 'bg-[#EAF1FF] dark:bg-[#1E2B48]' : 'hover:bg-[#F6F8FC] dark:hover:bg-[#162033]'
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-bold ${
                    active ? 'bg-[#2563EB] text-white' : 'bg-[#F2F4F8] text-[#191C1D] dark:bg-[#1F2A3C] dark:text-white'
                  }`}
                >
                  {index + 1}
                </span>

                <span className="min-w-0 flex-1 text-sm font-medium text-[#191C1D] dark:text-gray-100 [&_img]:hidden [&_p]:m-0 line-clamp-2">
                  <MathJax inline dynamic>
                    <span dangerouslySetInnerHTML={{ __html: textOf(question) }} />
                  </MathJax>
                </span>

                {marked ? <Bookmark size={15} className="shrink-0 fill-[#F59E0B] text-[#F59E0B]" /> : null}

                {active ? (
                  <ChevronRight size={18} className="shrink-0 text-[#6B7385]" />
                ) : answered ? (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#22C55E] text-white">
                    <Check size={15} strokeWidth={3} />
                  </span>
                ) : (
                  <span className="h-6 w-6 shrink-0 rounded-full border-2 border-[#D5DBE5] dark:border-[#33415A]" />
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </MathJaxContext>
  )

  return (
    <aside className="flex max-h-full flex-col overflow-hidden rounded-3xl border border-[#EEF1F6] bg-white shadow-[0_8px_30px_-18px_rgba(15,23,42,0.25)] dark:border-[#1F2A3C] dark:bg-[#111A2B]">
      <div className="flex items-center justify-between gap-2 border-b border-[#F0F2F6] px-5 py-4 dark:border-[#1F2A3C]">
        <h2 className="text-lg font-bold text-[#191C1D] dark:text-white">{t('questionPage.questions')}</h2>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="h-10 cursor-pointer appearance-none rounded-xl border border-[#E5EAF2] bg-white pl-3.5 pr-9 text-sm font-medium text-[#191C1D] outline-none focus:border-[#3B6FF6] dark:border-[#26324A] dark:bg-[#111A2B] dark:text-white"
            >
              {FILTERS.map((key) => (
                <option key={key} value={key}>
                  {t(FILTER_LABELS[key])}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7385]"
            />
          </div>

          <button
            type="button"
            onClick={() => setView((prev) => (prev === 'list' ? 'grid' : 'list'))}
            title={view === 'list' ? t('questionPage.gridView') : t('questionPage.listView')}
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[#E5EAF2] text-[#6B7385] transition hover:text-[#2563EB] dark:border-[#26324A] lg:inline-flex"
          >
            {view === 'list' ? <LayoutGrid size={18} /> : <List size={18} />}
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {items.length ? (
          <>
            <div className="lg:hidden">{grid}</div>
            <div className="hidden lg:block">{view === 'list' ? list : grid}</div>
          </>
        ) : (
          <p className="px-5 py-10 text-center text-sm text-[#8A93A6]">{t('questionPage.empty')}</p>
        )}
      </div>
    </aside>
  )
}

export default QuestionSidebar
