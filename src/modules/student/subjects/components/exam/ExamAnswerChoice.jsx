import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

function ExamAnswerChoice({ selectedQuestion, setChoiceAnswers, choiceAnswers }) {
  const { i18n } = useTranslation()

  // Har bir savol uchun unique key yaratish
  const questionKey = `question-${selectedQuestion?.id || 'default'}`
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [selectedQuestion?.id])

  return (
    <div key={questionKey} className="space-y-3">
      <MathJaxContext
        config={{
          loader: { load: ['input/tex', 'output/chtml'] }
        }}
      >
        {selectedQuestion?.choices?.map((item, index) => (
          <label key={`${questionKey}-${index}`} className="flex items-center gap-3 cursor-pointer text-[16px]">
            <input
              ref={index === 0 ? inputRef : null}
              type="radio"
              name={`choice-${selectedQuestion.id}`}
              value={item.letter}
              checked={choiceAnswers[selectedQuestion.id] === item.letter}
              onChange={() => {
                setChoiceAnswers((prev) => ({
                  ...prev,
                  [selectedQuestion.id]: item.letter
                }))
              }}
              className="w-5 h-5 accent-blue-600"
            />
            <span className="text-gray-800">
              <MathJax dynamic>
                <div> {i18n.language === 'uz' ? item?.text_uz : item?.text_ru}</div>
              </MathJax>
            </span>
          </label>
        ))}
      </MathJaxContext>
    </div>
  )
}

export default ExamAnswerChoice
