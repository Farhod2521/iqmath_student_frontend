import React from 'react'
import { useTranslation } from 'react-i18next'

import { MathJax, MathJaxContext } from 'better-react-mathjax'

function ExamQuestionSelected({ selectedQuestion, selectedIndex }) {
  const { i18n } = useTranslation()
  const textQ =
    i18n.language === 'uz' ? selectedQuestion?.question_text_uz || '' : selectedQuestion?.question_text_ru || ''
  return (
    <div className="text-black text-[19px]  font-medium text-center">
      <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
        <MathJax dynamic>
          <div className="flex gap-1">
            <div
              className={`hidden md:flex min-w-10 min-h-10  w-10 mr-2 h-10  items-center border-[#007AFF] justify-center border-2 rounded-full text-black font-bold`}
            >
              {selectedIndex + 1}
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <div dangerouslySetInnerHTML={{ __html: textQ }} />
            </div>
          </div>
        </MathJax>
      </MathJaxContext>
    </div>
  )
}

export default ExamQuestionSelected
