'use client'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React from 'react'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'

const EditableMathField = dynamic(() => import('react-mathquill').then((mod) => mod.EditableMathField), { ssr: false })

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

  return (
    <div className="flex flex-col gap-4">
      {selectedQuestion?.sub_questions?.map((item, index) => {
        const text1 = i18n.language === 'uz' ? item?.text1_uz : item?.text1_ru
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
                  onFocus={() => setActiveInputId(item.id)}
                  mathquillDidMount={(mathField) => {
                    if (!mathFieldRefs.current[selectedQuestion.id]) {
                      mathFieldRefs.current[selectedQuestion.id] = {}
                    }
                    mathFieldRefs.current[selectedQuestion.id][item.id] = mathField
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

export default ExamAnswerComposite
