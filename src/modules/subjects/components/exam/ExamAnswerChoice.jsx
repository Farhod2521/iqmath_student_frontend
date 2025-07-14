import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React from 'react'
import { useTranslation } from 'react-i18next'

function ExamAnswerChoice({ selectedQuestion, setChoiceAnswers, choiceAnswers }) {
  const { i18n } = useTranslation()

  // Har bir savol uchun unique key yaratish
  const questionKey = `question-${selectedQuestion?.id || 'default'}`

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
              type="radio"
              name={`choice-${selectedQuestion.id}`}
              value={item.letter}
              checked={choiceAnswers[selectedQuestion.id] === item.letter}
              onChange={() => {
                console.log('Choice onChange:', selectedQuestion.id, item.letter)
                setChoiceAnswers((prev) => {
                  const newState = {
                    ...prev,
                    [selectedQuestion.id]: item.letter
                  }
                  console.log('New choiceAnswers:', newState)
                  return newState
                })
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
