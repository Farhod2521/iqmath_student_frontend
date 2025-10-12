'use client'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React, { useEffect, useState, useRef } from 'react'
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
  const [currentQuestionId, setCurrentQuestionId] = useState(null)

  // Lokal refs: { [questionId]: { [subQuestionId]: mathField } }
  const localMathFieldRefs = useRef({})

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

  // Question o'zgarganda ref-larni tayyorlash va birinchi sub_question ni active qilish
  useEffect(() => {
    const qid = selectedQuestion?.id
    if (!qid) return

    if (qid !== currentQuestionId) {
      setCurrentQuestionId(qid)

      // tashqi refs strukturasi
      if (!mathFieldRefs.current) mathFieldRefs.current = {}
      if (!mathFieldRefs.current[qid]) mathFieldRefs.current[qid] = {}

      // lokal refs strukturasi
      if (!localMathFieldRefs.current[qid]) localMathFieldRefs.current[qid] = {}

      // birinchi sub_question ni active qilish
      const firstSubId = selectedQuestion?.sub_questions?.[0]?.id
      if (firstSubId) setActiveInputId(firstSubId)
    }
  }, [selectedQuestion?.id])

  // Maydon qiymatlarini sinxronlash
  useEffect(() => {
    const qid = selectedQuestion?.id
    if (!qid) return
    if (!selectedQuestion?.sub_questions) return
    const map = localMathFieldRefs.current[qid]
    if (!map) return

    selectedQuestion.sub_questions.forEach((sub) => {
      const mf = map[sub.id]
      const expected = compositeAnswers[qid]?.[sub.id] || ''
      if (mf && mf.latex() !== expected) {
        mf.latex(expected)
      }
    })
  }, [selectedQuestion?.id, compositeAnswers])

  // 🔎 Fokus: birinchi render/savol almashganda birinchi sub_question maydoniga
  useEffect(() => {
    if (!mathQuillLoaded) return
    const qid = selectedQuestion?.id
    const firstSubId = selectedQuestion?.sub_questions?.[0]?.id
    if (!qid || !firstSubId) return

    const mf = localMathFieldRefs.current[qid]?.[firstSubId] || mathFieldRefs.current?.[qid]?.[firstSubId]

    if (!mf) return

    const raf = requestAnimationFrame(() => {
      try {
        mf.focus()
      } catch {}
      // DOM/layout kechikishlariga chidamli bo'lishi uchun
      setTimeout(() => {
        try {
          mf.focus()
        } catch {}
      }, 0)
    })
    return () => cancelAnimationFrame(raf)
  }, [mathQuillLoaded, selectedQuestion?.id])

  if (!mathQuillLoaded || !EditableMathField) {
    return <div>Loading MathQuill...</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
        {selectedQuestion?.sub_questions?.map((item, index) => {
          // Til bo'yicha matnlar (fallback'lar bilan)
          const text1 =
            i18n.language === 'uz' ? item?.text1_uz ?? item?.text1_ru ?? '' : item?.text1_ru ?? item?.text1_uz ?? ''

          const text2 =
            i18n.language === 'uz' ? item?.text2_uz ?? item?.text2_ru ?? '' : item?.text2_ru ?? item?.text2_uz ?? ''

          const fieldValue = compositeAnswers[selectedQuestion.id]?.[item.id] || ''

          return (
            <div key={`${selectedQuestion.id}-${item.id}`}>
              <div className="flex items-center gap-4">
                <span className="text-gray-800 text-[16px]">
                  <MathJax dynamic>{text1}</MathJax>
                </span>

                <EditableMathField
                  key={`mf-${selectedQuestion.id}-${item.id}`}
                  latex={fieldValue}
                  onChange={(mathField) => {
                    const newValue = mathField.latex()
                    setCompositeAnswers((prev) => ({
                      ...prev,
                      [selectedQuestion.id]: {
                        ...(prev[selectedQuestion.id] || {}),
                        [item.id]: newValue
                      }
                    }))
                  }}
                  onFocus={() => setActiveInputId(item.id)}
                  mathquillDidMount={(mathField) => {
                    const qid = selectedQuestion.id
                    // tashqi refs
                    if (!mathFieldRefs.current) mathFieldRefs.current = {}
                    if (!mathFieldRefs.current[qid]) mathFieldRefs.current[qid] = {}
                    mathFieldRefs.current[qid][item.id] = mathField

                    // lokal refs
                    if (!localMathFieldRefs.current[qid]) localMathFieldRefs.current[qid] = {}
                    localMathFieldRefs.current[qid][item.id] = mathField

                    // Birinchi sub_question mount paytida ham fokus
                    if (index === 0) {
                      setTimeout(() => {
                        try {
                          mathField.focus()
                        } catch {}
                      }, 0)
                    }
                  }}
                  style={compositeMathStyle}
                />

                <span className="text-gray-800 text-[16px]">
                  <MathJax dynamic>{text2}</MathJax>
                </span>
              </div>
            </div>
          )
        })}
      </MathJaxContext>
    </div>
  )
}

export default ExamAnswerComposite
