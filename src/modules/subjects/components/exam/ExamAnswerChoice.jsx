import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React from 'react'
import { useTranslation } from 'react-i18next'

function ExamAnswerChoice({ selectedQuestion, setChoiceAnswers, choiceAnswers }) {
  const { i18n } = useTranslation()

  return selectedQuestion?.choices?.map((item, index) => (
    <label key={index} className="flex items-center gap-3 cursor-pointer text-[16px]">
      <input
        type="radio"
        name={`choice-${selectedQuestion.id}`} // name har bir savol uchun alohida bo‘lishi kerak
        value={item.id}
        checked={choiceAnswers[selectedQuestion.id] === item.id}
        onChange={() =>
          setChoiceAnswers((prev) => ({
            ...prev,
            [selectedQuestion.id]: item.id
          }))
        }
        className="w-5 h-5 accent-blue-600"
      />
      <span className="text-gray-800">
        <MathJaxContext
          config={{
            loader: { load: ['input/tex', 'output/chtml'] }
          }}
        >
          <MathJax dynamic>
            <div> {i18n.language === 'uz' ? item?.text_uz : item?.text_ru}</div>
          </MathJax>
        </MathJaxContext>
      </span>
    </label>
  ))
}

export default ExamAnswerChoice
