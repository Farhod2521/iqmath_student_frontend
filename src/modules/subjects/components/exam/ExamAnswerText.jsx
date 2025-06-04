'use client'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'

const EditableMathField = dynamic(() => import('react-mathquill').then((mod) => mod.EditableMathField), { ssr: false })

function ExamAnswerText({ setTextAnswers, textAnswers, selectedQuestion, mathFieldRef }) {
  const latex = textAnswers[selectedQuestion.id] || ''

  // agar tashqaridan qiymat o‘zgarsa, u holda `latex()` yangilansin
  useEffect(() => {
    if (mathFieldRef.current) {
      mathFieldRef.current.latex(latex)
    }
  }, [latex, mathFieldRef])

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full">
        <EditableMathField
          latex={latex}
          onChange={(mathField) => {
            setTextAnswers((prev) => ({
              ...prev,
              [selectedQuestion.id]: mathField.latex()
            }))
          }}
          mathquillDidMount={(mathField) => {
            mathFieldRef.current = mathField
          }}
          style={textMathStyle}
        />
      </div>
    </div>
  )
}

export default ExamAnswerText

const textMathStyle = {
  width: '100%',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '24px',
  borderRadius: '8px',
  padding: '4px',
  border: '1px solid #E9E9E9'
}
