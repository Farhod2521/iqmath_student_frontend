import dynamic from 'next/dynamic'
import React from 'react'
import { useTranslation } from 'react-i18next'

const EditableMathField = dynamic(() => import('react-mathquill').then((mod) => mod.EditableMathField), { ssr: false })

function ExamAnswerText({ setTextAnswers, textAnswers, selectedQuestion }) {
  const { i18n } = useTranslation()
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full">
        <EditableMathField
          latex={textAnswers[selectedQuestion.id] || ''}
          onChange={(mathField) =>
            setTextAnswers((prev) => ({
              ...prev,
              [selectedQuestion.id]: mathField.latex()
            }))
          }
          style={textMathStyle}
        />
      </div>
    </div>
  )
}

export default ExamAnswerText

const textMathStyle = {
  width: '100%',
  height: '70px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '24px',
  borderRadius: '8px',
  padding: '10px',
  border: '1px solid #E9E9E9'
}
