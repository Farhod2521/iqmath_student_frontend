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
  const columns = compact ? 'sm:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-2'

  return (
    <MathJaxContext config={mathConfig}>
      <div key={questionId} role="radiogroup" className={`grid w-full grid-cols-1 gap-4 ${columns}`}>
        {choices.map((choice, index) => {
          const active = selected === choice.letter
          return (
            <button
              key={`${questionId}-${index}`}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => choose(choice.letter)}
              className={`group relative flex min-h-[132px] items-center justify-center rounded-3xl border-2 px-5 pb-5 pt-16 text-left transition-all duration-200 ${
                active
                  ? 'border-[#2563EB] bg-[#F3F7FF] shadow-[0_10px_30px_-16px_rgba(37,99,235,0.8)] dark:bg-[#1E2B48]'
                  : 'border-[#E9EEF6] bg-white hover:-translate-y-0.5 hover:border-[#A9C1FF] hover:shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)] dark:border-[#26324A] dark:bg-[#111A2B]'
              } ${image ? 'min-h-[190px]' : ''}`}
            >
              <span
                className={`absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold transition ${
                  active
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-[#F2F4F8] text-[#191C1D] group-hover:bg-[#EAF1FF] dark:bg-[#1F2A3C] dark:text-white'
                }`}
              >
                {choice.letter}
              </span>

              {active ? (
                <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#2563EB] text-white">
                  <Check size={16} strokeWidth={3} />
                </span>
              ) : null}

              {image ? (
                choice.image_url ? (
                  <img
                    src={choice.image_url}
                    alt={`${choice.letter}`}
                    loading="lazy"
                    className="max-h-40 w-full object-contain"
                  />
                ) : (
                  <span className="text-sm text-[#A0A8BA]">—</span>
                )
              ) : (
                <span className="w-full text-center text-lg font-semibold text-[#191C1D] dark:text-white [&_img]:mx-auto [&_img]:max-h-32 [&_p]:m-0">
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
