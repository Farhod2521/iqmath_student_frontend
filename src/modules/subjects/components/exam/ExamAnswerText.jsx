'use client'
import React, { useEffect, useState, useRef } from 'react'

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
  const [currentQuestionId, setCurrentQuestionId] = useState(null)
  const localMathFieldRef = useRef(null)
  
  const currentAnswer = textAnswers[selectedQuestion?.id] || ''

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

  // Savol o'zgarganda MathQuill inputini yangilash
  useEffect(() => {
    if (selectedQuestion?.id !== currentQuestionId) {
      setCurrentQuestionId(selectedQuestion?.id)
      
      // Yangi savol uchun MathQuill inputini tozalash
      if (localMathFieldRef.current) {
        localMathFieldRef.current.latex('')
      }
    }
  }, [selectedQuestion?.id, currentQuestionId])

  // MathQuill inputini har doim to'g'ri sinxronlash
  useEffect(() => {
    if (localMathFieldRef.current && selectedQuestion?.id) {
      const expectedValue = currentAnswer
      const currentValue = localMathFieldRef.current.latex()
      
      if (currentValue !== expectedValue) {
        localMathFieldRef.current.latex(expectedValue)
      }
    }
  }, [selectedQuestion?.id, currentAnswer])

  if (!mathQuillLoaded || !EditableMathField) {
    return <div>Loading MathQuill...</div>
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full">
        <React.Fragment key={selectedQuestion?.id}>
          <EditableMathField
            key={selectedQuestion?.id}
            latex={currentAnswer}
            onChange={(mathField) => {
              const newValue = mathField.latex()
              setTextAnswers((prev) => ({
                ...prev,
                [selectedQuestion.id]: newValue,
              }))
            }}
            mathquillDidMount={(mathField) => {
              localMathFieldRef.current = mathField
              if (mathFieldRef) {
                mathFieldRef.current = mathField
              }
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
