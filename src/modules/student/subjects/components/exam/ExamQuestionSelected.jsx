import React from 'react'
import { useTranslation } from 'react-i18next'

import { MathJax, MathJaxContext } from 'better-react-mathjax'

function ExamQuestionSelected({ selectedQuestion, selectedIndex }) {
  const { i18n } = useTranslation()
  const textQ =
    i18n.language === 'uz' ? selectedQuestion?.question_text_uz || '' : selectedQuestion?.question_text_ru || ''
  return (
    <div className="text-black text-[16px] md:text-[19px] font-medium">
      <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
        <MathJax dynamic>
          <div className="flex gap-1">
            <div
              className={`hidden md:flex min-w-10 min-h-10  w-10 mr-2 h-10  items-center border-[#007AFF] justify-center border-2 rounded-full text-black font-bold`}
            >
              {selectedIndex + 1}
            </div>
            {/* Mobil ekranda kesilib qolmasligi uchun: oddiy matn normal o'raladi,
                uzun formulalar (mjx-container) esa o'zi alohida gorizontal scroll qiladi. */}
            <div className="w-full overflow-x-auto">
              <div className="text-center [&_img]:max-w-full [&_mjx-container]:max-w-full [&_mjx-container]:overflow-x-auto [&_mjx-container]:overflow-y-hidden [&_p]:m-0">
                <div dangerouslySetInnerHTML={{ __html: textQ }} />
              </div>
            </div>
          </div>
        </MathJax>
      </MathJaxContext>
    </div>
  )
}

export default ExamQuestionSelected
