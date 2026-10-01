import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { ArrowLeft, ArrowRight, Bookmark, Box, Calculator as CalculatorIcon, CheckCheck } from 'lucide-react'

import ExamAnswerComposite from '../exam/ExamAnswerComposite'
import ExamAnswerText from '../exam/ExamAnswerText'
import ActionInfo from '../actions/ActionInfo'
import Calculator from '../calculator/Calculator'
import QuestionSidebar from './QuestionSidebar'
import QuestionChoiceGrid from './QuestionChoiceGrid'

const mathConfig = { loader: { load: ['input/tex', 'output/chtml'] } }
const iconButton =
  'inline-flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#F4F6FA] text-[#6B7385] transition hover:bg-[#EAF1FF] hover:text-[#2563EB] dark:bg-[#1F2A3C] dark:text-gray-300'

/**
 * Savol yechish maydoni (fan savollari va diagnostika uchun umumiy):
 * chapda savollar ro'yxati, o'ngda savol, javob variantlari va navigatsiya.
 * Javob holatlari (state) sahifaning o'zida saqlanadi.
 */
function QuestionWorkspace({
  questions = [],
  selectedIndex,
  onSelect,
  selectedQuestion,
  answeredIds,
  badge,
  extraActions,
  choiceAnswers,
  setChoiceAnswers,
  textAnswers,
  setTextAnswers,
  compositeAnswers,
  setCompositeAnswers,
  mathFieldRef,
  mathFieldRefs,
  activeInputId,
  setActiveInputId,
  showCalculator,
  setShowCalculator,
  onPrev,
  onNext,
  onFinish,
  isEnd,
  finishing = false
}) {
  const { t, i18n } = useTranslation()
  const [markedIds, setMarkedIds] = useState(() => new Set())

  // Yangi savollar to'plami kelganda belgilar tozalanadi
  useEffect(() => {
    setMarkedIds(new Set())
  }, [questions])

  const total = questions.length
  const questionType = selectedQuestion?.question_type
  const selectedId = String(selectedQuestion?.id)
  const isMarked = markedIds.has(selectedId)
  const questionText =
    (i18n.language === 'uz' ? selectedQuestion?.question_text_uz : selectedQuestion?.question_text_ru) ||
    selectedQuestion?.question_text_uz ||
    ''

  const toggleMark = () => {
    if (!selectedQuestion?.id) return
    setMarkedIds((prev) => {
      const next = new Set(prev)
      if (next.has(selectedId)) next.delete(selectedId)
      else next.add(selectedId)
      return next
    })
  }

  return (
    <div className="mx-auto grid w-full max-w-[1760px] flex-1 grid-cols-1 gap-3 p-3 sm:gap-5 md:p-6 lg:grid-cols-[minmax(300px,420px)_minmax(0,1fr)] lg:gap-6">
      <div className="lg:sticky lg:top-[92px] lg:h-[calc(100vh-116px)]">
        <QuestionSidebar
          questions={questions}
          selectedIndex={selectedIndex}
          answeredIds={answeredIds}
          markedIds={markedIds}
          onSelect={onSelect}
        />
      </div>

      <section className="flex min-w-0 flex-col rounded-2xl border border-[#EEF1F6] bg-white p-3.5 sm:rounded-3xl shadow-[0_8px_30px_-18px_rgba(15,23,42,0.25)] dark:border-[#1F2A3C] dark:bg-[#111A2B] sm:p-6 lg:p-8">
        {/* Savol raqami, mavzu va amallar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="inline-flex h-9 items-center rounded-xl bg-[#2563EB] px-3.5 text-sm sm:h-11 sm:px-5 sm:text-[15px] font-bold text-white shadow-[0_8px_20px_-10px_rgba(37,99,235,0.9)]">
            {t('questionPage.questionNumber', { number: total ? selectedIndex + 1 : 0 })}
          </span>
          {badge ? (
            <span className="inline-flex h-9 min-w-0 max-w-full flex-1 items-center gap-2 rounded-xl bg-[#EEF3FF] px-3 text-sm sm:h-11 sm:flex-none sm:px-4 sm:text-[15px] font-semibold text-[#2563EB] dark:bg-[#1E2B48]">
              <Box size={18} className="shrink-0" />
              <span className="truncate">{badge}</span>
            </span>
          ) : null}

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            {['composite', 'text'].includes(questionType) && (
              <button
                type="button"
                onClick={() => setShowCalculator((prev) => !prev)}
                title="Ctrl + K"
                className={`${iconButton} ${showCalculator ? '!bg-[#EAF1FF] !text-[#2563EB]' : ''}`}
              >
                <CalculatorIcon size={20} />
              </button>
            )}
            <div className={iconButton}>
              <ActionInfo />
            </div>
            <button
              type="button"
              onClick={toggleMark}
              title={isMarked ? t('questionPage.unmark') : t('questionPage.mark')}
              aria-pressed={isMarked}
              className={`${iconButton} ${isMarked ? '!bg-[#FFF4E0] !text-[#F59E0B]' : ''}`}
            >
              <Bookmark size={20} className={isMarked ? 'fill-current' : ''} />
            </button>
            {extraActions}
          </div>
        </div>

        {/* Savol matni */}
        <div
          key={selectedQuestion?.id}
          className="mt-5 overflow-x-auto text-lg font-semibold sm:mt-7 sm:text-xl leading-snug text-[#0F172A] dark:text-white md:text-[26px] [&_img]:mx-auto [&_img]:my-4 [&_img]:block [&_img]:max-h-[220px] sm:[&_img]:my-6 sm:[&_img]:max-h-[300px] [&_img]:max-w-full [&_mjx-container]:max-w-full [&_mjx-container]:overflow-x-auto [&_mjx-container]:overflow-y-hidden [&_p]:m-0"
        >
          <MathJaxContext config={mathConfig}>
            <MathJax dynamic>
              <div dangerouslySetInnerHTML={{ __html: questionText }} />
            </MathJax>
          </MathJaxContext>
        </div>

        {/* Javob */}
        <div className="mt-5 flex-1 sm:mt-8">
          {(() => {
            switch (questionType) {
              case 'image_choice':
                return (
                  <QuestionChoiceGrid
                    image
                    selectedQuestion={selectedQuestion}
                    answers={choiceAnswers}
                    setAnswers={setChoiceAnswers}
                  />
                )
              case 'choice':
                return (
                  <QuestionChoiceGrid
                    selectedQuestion={selectedQuestion}
                    answers={choiceAnswers}
                    setAnswers={setChoiceAnswers}
                  />
                )
              case 'composite':
                return (
                  <div className="overflow-x-auto rounded-2xl border border-[#E9EEF6] bg-[#F8FAFD] p-3 sm:rounded-3xl sm:p-5 dark:border-[#26324A] dark:bg-[#0F172A]">
                    <ExamAnswerComposite
                      selectedQuestion={selectedQuestion}
                      setCompositeAnswers={setCompositeAnswers}
                      compositeAnswers={compositeAnswers}
                      setActiveInputId={setActiveInputId}
                      mathFieldRefs={mathFieldRefs}
                    />
                  </div>
                )
              case 'text':
                return (
                  <div className="rounded-2xl border border-[#E9EEF6] bg-[#F8FAFD] p-3 sm:rounded-3xl sm:p-5 dark:border-[#26324A] dark:bg-[#0F172A]">
                    <p className="mb-3 text-sm font-semibold text-[#6B7385]">{t('questionPage.typeAnswer')}</p>
                    <div className="rounded-xl bg-white">
                      <ExamAnswerText
                        mathFieldRef={mathFieldRef}
                        setTextAnswers={setTextAnswers}
                        textAnswers={textAnswers}
                        selectedQuestion={selectedQuestion}
                      />
                    </div>
                  </div>
                )
              default:
                return null
            }
          })()}

          {showCalculator && (
            <div className="mt-6">
              <Calculator
                mathFieldRef={mathFieldRef}
                mathFieldRefs={mathFieldRefs}
                selectedQuestion={selectedQuestion}
                setCompositeAnswers={setCompositeAnswers}
                setTextAnswers={setTextAnswers}
                activeInputId={activeInputId}
              />
            </div>
          )}
        </div>

        {/* Navigatsiya */}
        <div className="mt-6 flex items-center justify-between gap-2.5 border-t border-[#EEF1F6] pt-4 sm:mt-8 sm:gap-3 sm:pt-6 dark:border-[#1F2A3C]">
          <button
            type="button"
            onClick={onPrev}
            disabled={selectedIndex === 0}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-[#D6DEEA] bg-white px-3 text-[15px] sm:h-14 sm:flex-none sm:gap-3 sm:text-base font-semibold text-[#191C1D] transition hover:border-[#2563EB] hover:text-[#2563EB] disabled:pointer-events-none disabled:opacity-40 dark:border-[#33415A] dark:bg-transparent dark:text-white sm:px-10"
          >
            <ArrowLeft size={20} />
            {t('questionPage.prev')}
          </button>

          {isEnd ? (
            <button
              type="button"
              onClick={onFinish}
              disabled={finishing}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#16A34A] px-3 text-[15px] sm:h-14 sm:flex-none sm:gap-3 sm:text-base font-semibold text-white shadow-[0_10px_24px_-12px_rgba(22,163,74,0.9)] transition hover:bg-[#15803D] disabled:opacity-60 sm:px-12"
            >
              {t('questionPage.finish')}
              {finishing ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <CheckCheck size={20} />
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#2563EB] px-3 text-[15px] sm:h-14 sm:flex-none sm:gap-3 sm:text-base font-semibold text-white shadow-[0_10px_24px_-12px_rgba(37,99,235,0.9)] transition hover:bg-[#1D4ED8] sm:px-12"
            >
              {t('questionPage.next')}
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </section>
    </div>
  )
}

export default QuestionWorkspace
