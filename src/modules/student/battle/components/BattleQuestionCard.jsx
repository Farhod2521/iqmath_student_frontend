import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { SkipForward } from 'lucide-react'

const MJ_CONFIG = { loader: { load: ['input/tex', 'output/chtml'] } }

const BattleQuestionCard = ({ question, index, total, disabled, onAnswer, onSkip }) => {
  const { t, i18n } = useTranslation()
  const q = question?.question
  const [selectedChoices, setSelectedChoices] = useState([])
  const [textAnswer, setTextAnswer] = useState('')
  const [compositeAnswers, setCompositeAnswers] = useState([])

  useEffect(() => {
    setSelectedChoices([])
    setTextAnswer('')
    setCompositeAnswers(q?.sub_questions ? q.sub_questions.map(() => '') : [])
  }, [q?.id])

  const questionText = useMemo(() => {
    if (!q) return ''
    return i18n.language === 'ru' ? q.question_text_ru || q.question_text_uz : q.question_text_uz
  }, [q, i18n.language])

  if (!q) return null

  const isMultiChoice = q.question_category === 'checkbox'

  const toggleChoice = (choiceId) => {
    if (disabled) return
    if (isMultiChoice) {
      setSelectedChoices((prev) =>
        prev.includes(choiceId) ? prev.filter((id) => id !== choiceId) : [...prev, choiceId]
      )
    } else {
      setSelectedChoices([choiceId])
      onAnswer({ choices: [choiceId] })
    }
  }

  const submitMultiChoice = () => {
    if (!selectedChoices.length) return
    onAnswer({ choices: selectedChoices })
  }

  const submitText = () => {
    if (!textAnswer.trim()) return
    onAnswer(i18n.language === 'ru' ? { answer_ru: textAnswer.trim() } : { answer_uz: textAnswer.trim() })
  }

  const submitComposite = () => {
    if (compositeAnswers.some((a) => !String(a).trim())) return
    onAnswer({ answers: compositeAnswers })
  }

  return (
    <div className="p-4 bg-white border border-gray-100 rounded-xl sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 text-xs font-semibold text-indigo-600 rounded-full bg-indigo-50">
          {index + 1} / {total} - {t('battle.question')}
        </span>
        <button
          onClick={onSkip}
          disabled={disabled}
          className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-gray-600 disabled:opacity-30"
        >
          {t('battle.skipQuestion')} <SkipForward size={14} />
        </button>
      </div>

      <MathJaxContext config={MJ_CONFIG}>
        <MathJax dynamic>
          <div
            className="text-base font-medium text-center text-gray-900 sm:text-lg [&_img]:max-w-full [&_mjx-container]:max-w-full [&_mjx-container]:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: questionText }}
          />
        </MathJax>

        <div className="mt-6">
          {q.question_type === 'choice' || q.question_type === 'image_choice' ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {q.choices?.map((choice) => {
                const active = selectedChoices.includes(choice.id)
                return (
                  <button
                    key={choice.id}
                    disabled={disabled}
                    onClick={() => toggleChoice(choice.id)}
                    className={`flex items-center gap-3 p-3 border rounded-xl text-left transition-colors disabled:opacity-50 ${
                      active ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full shrink-0 ${
                        active ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {choice.letter}
                    </span>
                    <MathJax dynamic>
                      <span
                        className="text-sm text-gray-800"
                        dangerouslySetInnerHTML={{
                          __html: i18n.language === 'ru' ? choice.text_ru || choice.text_uz : choice.text_uz
                        }}
                      />
                    </MathJax>
                  </button>
                )
              })}
              {isMultiChoice ? (
                <button
                  onClick={submitMultiChoice}
                  disabled={disabled || !selectedChoices.length}
                  className="py-2 mt-2 text-sm font-semibold text-white bg-indigo-500 col-span-full rounded-xl disabled:opacity-40"
                >
                  {t('battle.submitAnswer')}
                </button>
              ) : null}
            </div>
          ) : null}

          {q.question_type === 'text' ? (
            <div className="max-w-md mx-auto">
              <input
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                disabled={disabled}
                onKeyDown={(e) => e.key === 'Enter' && submitText()}
                placeholder={t('battle.typeAnswer')}
                className="w-full px-4 py-3 text-center border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              />
              <button
                onClick={submitText}
                disabled={disabled || !textAnswer.trim()}
                className="w-full py-2 mt-3 text-sm font-semibold text-white bg-indigo-500 rounded-xl disabled:opacity-40"
              >
                {t('battle.submitAnswer')}
              </button>
            </div>
          ) : null}

          {q.question_type === 'composite' ? (
            <div className="max-w-md mx-auto space-y-3">
              {q.sub_questions?.map((sub, idx) => (
                <div key={sub.id} className="flex items-center gap-2">
                  <MathJax dynamic>
                    <span
                      className="text-sm text-gray-700 whitespace-nowrap"
                      dangerouslySetInnerHTML={{
                        __html: i18n.language === 'ru' ? sub.text1_ru || sub.text1_uz : sub.text1_uz
                      }}
                    />
                  </MathJax>
                  <input
                    value={compositeAnswers[idx] || ''}
                    disabled={disabled}
                    onChange={(e) =>
                      setCompositeAnswers((prev) => {
                        const next = [...prev]
                        next[idx] = e.target.value
                        return next
                      })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  />
                </div>
              ))}
              <button
                onClick={submitComposite}
                disabled={disabled || compositeAnswers.some((a) => !String(a || '').trim())}
                className="w-full py-2 text-sm font-semibold text-white bg-indigo-500 rounded-xl disabled:opacity-40"
              >
                {t('battle.submitAnswer')}
              </button>
            </div>
          ) : null}
        </div>
      </MathJaxContext>

      {disabled ? (
        <p className="mt-4 text-xs font-semibold text-center text-emerald-500">{t('battle.waitingOpponent')}</p>
      ) : null}
    </div>
  )
}

export default BattleQuestionCard
