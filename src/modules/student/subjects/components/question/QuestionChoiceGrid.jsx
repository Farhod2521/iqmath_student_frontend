import { useTranslation } from 'react-i18next'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { Check } from 'lucide-react'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'

const mathConfig = { loader: { load: ['input/tex', 'output/chtml'] } }
const SHORT_TEXT = 40

const plainLength = (html = '') =>
  String(html)
    .replace(/<[^>]*>/g, '')
    .trim().length

/**
 * A / B / C / D variant kartalari — oddiy (matn/formula) va rasmli variantlar uchun.
 * Klaviaturada variant harfini bosib ham tanlash mumkin.
 */
function QuestionChoiceGrid({ selectedQuestion, answers, setAnswers, image = false }) {
  const { i18n } = useTranslation()
  const choices = selectedQuestion?.choices || []
  const questionId = selectedQuestion?.id
  const selected = answers?.[questionId]

  const textOf = (choice) => (i18n.language === 'uz' ? choice?.text_uz : choice?.text_ru) || choice?.text_uz || ''

  const choose = (letter) => setAnswers((prev) => ({ ...prev, [questionId]: letter }))

  useKeyboardShortcut(
    choices.map((choice) => String(choice.letter || '').toLowerCase()).filter(Boolean),
    (event) => {
      const letter = choices.find((choice) => String(choice.letter).toLowerCase() === event.key.toLowerCase())?.letter
      if (letter) choose(letter)
    },
    { enabled: Boolean(questionId && choices.length) }
  )

  // Qisqa variantlar (yoki rasmlar) bir qatorga 4 tadan, uzunlari 2 tadan
  const compact = image || choices.every((choice) => plainLength(textOf(choice)) <= SHORT_TEXT)
  const columns = compact ? 'grid-cols-2 xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'

  return (
    <MathJaxContext config={mathConfig}>
      <div key={questionId} role="radiogroup" className={`grid w-full gap-2.5 sm:gap-4 ${columns}`}>
        {choices.map((choice, index) => {
          const active = selected === choice.letter
          return (
            <button
              key={`${questionId}-${index}`}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => choose(choice.letter)}
              className={`group relative flex min-h-[88px] items-center justify-center rounded-2xl border-2 px-3 pb-3 pt-11 text-left sm:min-h-[132px] sm:rounded-3xl sm:px-5 sm:pb-5 sm:pt-16 transition-all duration-200 ${
                active
                  ? 'border-[#2563EB] bg-[#F3F7FF] shadow-[0_10px_30px_-16px_rgba(37,99,235,0.8)] dark:bg-[#1E2B48]'
                  : 'border-[#E9EEF6] bg-white hover:-translate-y-0.5 hover:border-[#A9C1FF] hover:shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)] dark:border-[#26324A] dark:bg-[#111A2B]'
              } ${image ? 'min-h-[140px] sm:min-h-[190px]' : ''}`}
            >
              <span
                className={`absolute left-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full text-base font-bold sm:left-4 sm:top-4 sm:h-11 sm:w-11 sm:text-lg transition ${
                  active
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-[#F2F4F8] text-[#191C1D] group-hover:bg-[#EAF1FF] dark:bg-[#1F2A3C] dark:text-white'
                }`}
              >
                {choice.letter}
              </span>

              {active ? (
                <span className="absolute right-2.5 top-2.5 flex h-6 w-6 sm:right-4 sm:top-4 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-[#2563EB] text-white">
                  <Check size={16} strokeWidth={3} />
                </span>
              ) : null}

              {image ? (
                choice.image_url ? (
                  <img
                    src={choice.image_url}
                    alt={`${choice.letter}`}
                    loading="lazy"
                    className="max-h-28 w-full object-contain sm:max-h-40"
                  />
                ) : (
                  <span className="text-sm text-[#A0A8BA]">—</span>
                )
              ) : (
                <span className="w-full min-w-0 overflow-x-auto text-center text-base font-semibold sm:text-lg text-[#191C1D] dark:text-white [&_img]:mx-auto [&_img]:max-h-32 [&_p]:m-0">
                  <MathJax dynamic>
                    <span dangerouslySetInnerHTML={{ __html: textOf(choice) }} />
                  </MathJax>
                </span>
              )}
            </button>
          )
        })}
      </div>
    </MathJaxContext>
  )
}

export default QuestionChoiceGrid
