'use client'
import React, { useEffect, useState } from 'react'

// MathQuill'ni to'g'ridan-to'g'ri import qilish
let EditableMathField = null
try {
  const mathQuill = require('react-mathquill')
  EditableMathField = mathQuill.EditableMathField
} catch (error) {
  // Fallback uchun dynamic import
}

function ExamAnswerText({ setTextAnswers, textAnswers, selectedQuestion, mathFieldRef }) {
  const [mathQuillLoaded, setMathQuillLoaded] = useState(false)
  const latex = textAnswers[selectedQuestion.id] || ''

  // MathQuill yuklanganini tekshirish
  useEffect(() => {
    const checkMathQuill = async () => {
      try {
        if (EditableMathField) {
          setMathQuillLoaded(true)
        } else {
          const mathQuill = await import('react-mathquill')
          EditableMathField = mathQuill.EditableMathField
          setMathQuillLoaded(true)
        }
      } catch (error) {
        setMathQuillLoaded(false)
      }
    }
    checkMathQuill()
  }, [])

  // MathQuill inputini har doim to'g'ri sinxronlash
  useEffect(() => {
    if (mathFieldRef.current && mathFieldRef.current.latex() !== latex) {
      mathFieldRef.current.latex(latex)
    }
  }, [selectedQuestion.id, latex, mathFieldRef])

  if (!mathQuillLoaded || !EditableMathField) {
    return <div>Loading MathQuill...</div>
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full">
        <React.Fragment key={selectedQuestion.id}>
          <EditableMathField
            key={selectedQuestion.id}
            latex={latex}
            onChange={(mathField) => {
              setTextAnswers((prev) => ({
                ...prev,
                [selectedQuestion.id]: mathField.latex(),
              }))
            }}
            mathquillDidMount={(mathField) => {
              mathFieldRef.current = mathField
            }}
            style={textMathStyle}
          />
        </React.Fragment>
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
