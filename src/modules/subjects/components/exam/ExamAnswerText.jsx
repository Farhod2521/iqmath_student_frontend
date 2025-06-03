import { MathJaxContext } from 'better-react-mathjax'
import dynamic from 'next/dynamic'
import React from 'react'

const EditableMathField = dynamic(() => import('react-mathquill').then((mod) => mod.EditableMathField), { ssr: false })

function ExamAnswerText({ setTextAnswers, textAnswers, selectedQuestion }) {
  return (
    <div className="flex items-center justify-center w-full">
      <MathJaxContext
        config={{
          loader: { load: ['input/tex', 'output/chtml'] }
        }}
      >
        <MathJax dynamic>
          <span className="text-gray-800 text-[20px] font-medium text-center">{selectedQuestion?.text1_uz}</span>
        </MathJax>
      </MathJaxContext>

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
