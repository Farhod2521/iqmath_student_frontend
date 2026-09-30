import { useState } from 'react'
import { MathJax } from 'better-react-mathjax'
import { Check, ChevronDown, CircleCheck, CircleMinus, CircleX, SlidersHorizontal, X } from 'lucide-react'
import ActionSolution from '../actions/ActionSolution'
import { pick, statusOf, toMathHtml } from './utils'

const MathHtml = ({ html, inline = false }) => (
  <MathJax dynamic inline={inline}>
    <span dangerouslySetInnerHTML={{ __html: html || '' }} />
  </MathJax>
)

const NUMBER_STYLE = {
  wrong: 'bg-[#FEE2E2] text-[#DC2626]',
  correct: 'bg-[#DCFCE7] text-[#15803D]',
  unanswered: 'bg-[#F1F5F9] text-[#64748B]'
}

/** Variantlar qatori: belgilangan xato — qizil ×, belgilangan to'g'ri — yashil ✓ */
function ChoiceRow({ question, lang }) {
  const isImage = question.question_type === 'image_choice'
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {(question.choices || []).map((choice) => {
        const wrongPick = choice.is_selected && !choice.is_correct
        const rightPick = choice.is_selected && choice.is_correct
        return (
          <span
            key={choice.id}
            className={`relative flex min-h-[38px] items-center justify-center rounded-lg border px-7 py-1.5 text-sm font-semibold ${
              wrongPick
                ? 'border-[#FCA5A5] bg-[#FEE2E2] text-[#DC2626]'
                : rightPick
                  ? 'border-[#86EFAC] bg-[#DCFCE7] text-[#15803D]'
                  : 'border-[#E5EAF2] bg-white text-[#191C1D] dark:border-[#26324A] dark:bg-[#111A2B] dark:text-white'
            }`}
          >
            {isImage ? (
              choice.image_url ? (
                <img src={choice.image_url} alt={choice.letter} loading="lazy" className="h-12 w-full object-contain" />
              ) : (
                choice.letter
              )
            ) : (
              <span className="[&_img]:max-h-10 [&_p]:m-0">
                <MathHtml inline html={pick(choice, 'text', lang) || choice.letter} />
              </span>
            )}
            {wrongPick ? <X size={15} strokeWidth={3} className="absolute right-2.5" /> : null}
            {rightPick ? <Check size={15} strokeWidth={3} className="absolute right-2.5" /> : null}
          </span>
        )
      })}
    </div>
  )
}

const choiceText = (choices, lang, isImage) =>
  choices.map((choice) => (isImage ? choice.letter : pick(choice, 'text', lang) || choice.letter)).join(', ')

/** "Sizning javobingiz" va "To'g'ri javob" uchun HTML */
const answersOf = (question, lang) => {
  const type = question.question_type
  if (type === 'text') {
    return {
      own: question.student_answer ? toMathHtml(question.student_answer) : '',
      correct: toMathHtml(pick(question, 'correct_answer', lang))
    }
  }
  if (type === 'composite') {
    const subs = question.sub_questions || []
    return {
      own: subs.some((sub) => sub.student_answer)
        ? subs.map((sub) => (sub.student_answer ? toMathHtml(sub.student_answer) : '—')).join(', ')
        : '',
      correct: subs.map((sub) => toMathHtml(sub.correct_answer)).join(', ')
    }
  }
  const choices = question.choices || []
  const isImage = type === 'image_choice'
  return {
    own: choiceText(
      choices.filter((choice) => choice.is_selected),
      lang,
      isImage
    ),
    correct: choiceText(
      choices.filter((choice) => choice.is_correct),
      lang,
      isImage
    )
  }
}

function MistakeQuestionCard({ question, lang, t, solutionEnabled }) {
  const [open, setOpen] = useState(true)
  const status = statusOf(question)
  const isChoice = ['choice', 'image_choice'].includes(question.question_type)
  const topic = pick(question, 'topic', lang)
  const { own, correct } = answersOf(question, lang)

  return (
    <article className="border-b border-[#EEF1F6] px-1 py-5 last:border-b-0 dark:border-[#1F2A3C]">
      <div className="flex items-start gap-4">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold ${NUMBER_STYLE[status]}`}
        >
          {question.number}
        </span>

        <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_190px_auto]">
          <div className="min-w-0">
            {topic ? (
              <span className="mb-1.5 inline-block rounded-md bg-[#EAF1FF] px-2.5 py-0.5 text-xs font-semibold text-[#2563EB]">
                {topic}
              </span>
            ) : null}
            <div
              className={`font-semibold text-[#0F172A] dark:text-white [&_img]:my-2 [&_img]:max-h-[180px] [&_img]:max-w-full [&_p]:m-0 ${
                open ? '' : 'line-clamp-1'
              }`}
            >
              <MathHtml html={pick(question, 'question_text', lang)} />
            </div>
            {open && isChoice ? (
              <div className="mt-3">
                <ChoiceRow question={question} lang={lang} />
              </div>
            ) : null}
          </div>

          {/* Javoblar bloki */}
          <div className="overflow-hidden rounded-xl text-sm">
            {question.has_answer ? (
              <p
                className={`flex flex-wrap items-center gap-1.5 px-3 py-2.5 ${
                  status === 'unanswered'
                    ? 'bg-[#F1F5F9] text-[#64748B]'
                    : status === 'correct'
                      ? 'bg-[#EFFBF3] text-[#15803D]'
                      : 'bg-[#FEF2F2] text-[#DC2626]'
                }`}
              >
                {status === 'unanswered' ? (
                  <CircleMinus size={15} className="shrink-0" />
                ) : status === 'correct' ? (
                  <CircleCheck size={15} className="shrink-0" />
                ) : (
                  <CircleX size={15} className="shrink-0" />
                )}
                {status === 'unanswered' ? (
                  t('mistakes.unansweredShort')
                ) : (
                  <>
                    {t('mistakes.yourAnswer')}:
                    <span
                      className={`rounded-md px-1.5 font-bold ${status === 'correct' ? 'bg-[#DCFCE7]' : 'bg-[#FEE2E2]'}`}
                    >
                      <MathHtml inline html={own || '—'} />
                    </span>
                  </>
                )}
              </p>
            ) : null}
            <p className="flex flex-wrap items-center gap-1.5 bg-[#EFFBF3] px-3 py-2.5 text-[#191C1D] dark:bg-[#123322] dark:text-white">
              <CircleCheck size={15} className="shrink-0 fill-[#22C55E] text-white" />
              {t('mistakes.correctAnswer')}:
              <span className="font-bold">
                <MathHtml inline html={correct || '—'} />
              </span>
            </p>
          </div>

          <div className="flex items-start gap-2">
            {solutionEnabled ? (
              <ActionSolution
                selectedQuestion={{ ...question, id: question.question_id }}
                className="h-10 min-w-0 rounded-xl border border-[#E1E7F0] bg-white px-3.5 text-sm font-semibold text-[#191C1D] shadow-sm dark:border-[#26324A] dark:bg-transparent dark:text-white"
              >
                <span className="flex items-center gap-1.5">
                  <SlidersHorizontal size={16} className="text-[#2563EB]" />
                  {t('mistakes.analysis')}
                </span>
              </ActionSolution>
            ) : null}
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E1E7F0] bg-white text-[#191C1D] shadow-sm transition hover:text-[#2563EB] dark:border-[#26324A] dark:bg-transparent dark:text-white"
            >
              <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default MistakeQuestionCard
