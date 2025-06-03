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

function ExamAnswerComposite({ selectedQuestion, setCompositeAnswers, compositeAnswers, setActiveInputId }) {
  const { i18n } = useTranslation()

  return (
    <div className="flex flex-col gap-4">
      {selectedQuestion?.sub_questions?.map((item, index) => {
        const text1 = i18n.language === 'uz' ? item?.text1_uz : item?.text1_ru
        const text2 = i18n.language === 'uz' ? item?.text2_uz : item?.text2_ru
        return (
          <div key={index}>
            <MathJaxContext
              key={index}
              config={{
                loader: { load: ['input/tex', 'output/chtml'] }
              }}
            >
              <div className="flex items-center gap-4">
                <span className=" text-gray-800 text-[16px]">
                  <MathJax dynamic key={`${selectedQuestion.id}-${item.id}-text1`}>
                    <span> {text1}</span>
                  </MathJax>
                </span>
                <EditableMathField
                  latex={compositeAnswers[selectedQuestion.id]?.[item.id] || ''}
                  onChange={(mathField) => {
                    setCompositeAnswers((prev) => ({
                      ...prev,
                      [selectedQuestion.id]: {
                        ...(prev[selectedQuestion.id] || {}),
                        [item.id]: mathField.latex()
                      }
                    }))
                  }}
                  placeholder="..."
                  onFocus={() => setActiveInputId(item.id)}
                  style={compositeMathStyle}
                />

                <MathJax dynamic key={`${selectedQuestion.id}-${item.id}-text2`}>
                  <span>{text2}</span>
                </MathJax>
              </div>
            </MathJaxContext>
          </div>
        )
      })}
    </div>
  )
}

export default ExamAnswerComposite
