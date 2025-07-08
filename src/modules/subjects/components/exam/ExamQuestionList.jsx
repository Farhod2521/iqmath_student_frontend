import { MathJax, MathJaxContext } from 'better-react-mathjax'
import React from 'react'
import { useTranslation } from 'react-i18next'

function ExamQuestionList({ questions, selectedList, selectedQuestion, setSelectedQuestion, setSelectedIndex }) {
  const { i18n } = useTranslation()

  const getQuestionStatus = (question) => {
    const questionId = String(question?.id)
    
    // Tanlangan savol
    if (selectedQuestion?.id === question?.id) {
      return 'selected'
    }
    
    // Javob berilgan savol
    if (selectedList.includes(questionId)) {
      return 'answered'
    }
    
    // Javob berilmagan savol
    return 'unanswered'
  }

  const getQuestionStyle = (status) => {
    switch (status) {
      case 'selected':
        return 'border-white shadow-md bg-[#037AFF] text-white'
      case 'answered':
        return 'border-[#037AFF]'
      case 'unanswered':
        return 'border-[#ff0a04]'
      default:
        return 'border-[#ff0a04]'
    }
  }

  return (
    <ul className=" md:space-y-2 md:block flex flex-wrap ">
      {questions.map((question, index) => {
        const status = getQuestionStatus(question)
        const classIndex = getQuestionStyle(status)

        const questionText =
          i18n.language === 'uz' ? question?.question_text_uz || '' : question?.question_text_ru || ''

        return (
          <li
            key={index}
            className={`p-1 md:p-3 rounded-md flex items-center gap-x-[12px] cursor-pointer `}
            onClick={() => {
              setSelectedIndex(index)
              setSelectedQuestion(question)
            }}
          >
            <div
              className={`min-w-10 min-h-10 flex items-center justify-center border-2 rounded-full text-black font-bold ${classIndex}`}
            >
              {index + 1}
            </div>
            <div className="hidden md:block">
              <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
                <MathJax inline dynamic>
                  <div dangerouslySetInnerHTML={{ __html: questionText }} />
                </MathJax>
              </MathJaxContext>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ExamQuestionList
