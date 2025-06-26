'use client'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// MathQuill'ni to'g'ridan-to'g'ri import qilish
let EditableMathField = null
try {
  const mathQuill = require('react-mathquill')
  EditableMathField = mathQuill.EditableMathField
} catch (error) {
  // Fallback uchun dynamic import
}

const compositeMathStyle = {
  width: '160px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '24px',
  borderRadius: '8px',
  padding: '10px',
  border: '1px solid #E9E9E9'
}

function ExamAnswerComposite({
  selectedQuestion,
  setCompositeAnswers,
  compositeAnswers,
  setActiveInputId,
  mathFieldRefs
}) {
  const { i18n } = useTranslation()
  const [mathQuillLoaded, setMathQuillLoaded] = useState(false)
  const [mountedInputs, setMountedInputs] = useState(new Set())

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

  // Question o'zgarganda ref-larni tozalash va yangilash
  useEffect(() => {
    if (selectedQuestion?.id) {
      if (!mathFieldRefs.current) {
        mathFieldRefs.current = {}
      }
      
      if (selectedQuestion?.sub_questions?.length > 0) {
        const firstSubQuestionId = selectedQuestion.sub_questions[0].id
        setActiveInputId(firstSubQuestionId)
      }
      
      setMountedInputs(new Set())
      
      if (!mathFieldRefs.current[selectedQuestion.id]) {
        mathFieldRefs.current[selectedQuestion.id] = {}
      }
    }
  }, [selectedQuestion?.id, setActiveInputId, mathFieldRefs])

  if (!mathQuillLoaded) {
    return <div>Loading MathQuill...</div>
  }

  return (
    <div className="flex flex-col gap-4">
      {selectedQuestion?.sub_questions?.map((item, index) => {
        const text1 = i18n.language === 'uz' ? item?.text1_uz : item?.text2_uz
        const text2 = i18n.language === 'uz' ? item?.text2_uz : item?.text2_ru
        const fieldValue = compositeAnswers[selectedQuestion.id]?.[item.id] || ''

        return (
          <div key={index}>
            <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
              <div className="flex items-center gap-4">
                <span className="text-gray-800 text-[16px]">
                  <MathJax dynamic>{text1}</MathJax>
                </span>

                <EditableMathField
                  key={`${selectedQuestion.id}-${item.id}`}
                  latex={fieldValue}
                  onChange={(mathField) => {
                    setCompositeAnswers((prev) => ({
                      ...prev,
                      [selectedQuestion.id]: {
                        ...(prev[selectedQuestion.id] || {}),
                        [item.id]: mathField.latex()
                      }
                    }))
                  }}
                  onFocus={() => {
                    setActiveInputId(item.id)
                  }}
                  mathquillDidMount={(mathField) => {
                    if (!mathFieldRefs.current) {
                      mathFieldRefs.current = {}
                    }
                    
                    if (!mathFieldRefs.current[selectedQuestion.id]) {
                      mathFieldRefs.current[selectedQuestion.id] = {}
                    }
                    
                    mathFieldRefs.current[selectedQuestion.id][item.id] = mathField
                    setMountedInputs(prev => new Set([...prev, item.id]))
                  }}
                  style={compositeMathStyle}
                />

                <MathJax dynamic>{text2}</MathJax>
              </div>
            </MathJaxContext>
          </div>
        )
      })}
    </div>
  )
}

export default ExamAnswerComposite;