// components/subject-detail/QuestionTable.jsx
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import parse from 'html-react-parser'
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'
import Button from '@/components/button'
import EditIcon from '@/components/icons/edit'
import TrashIcon from '@/components/icons/trash'

const QuestionTable = ({ questions, onEdit, onDelete }) => {
  const { t, i18n } = useTranslation()

  const renderAnswer = (question) => {
    const isUzbek = i18n.language === 'uz'

    if (question.question_type === 'text') {
      return (
        <MathJax dynamic>
          {parse(get(question, isUzbek ? 'correct_text_answer_uz' : 'correct_text_answer_ru') || '')}
        </MathJax>
      )
    }

    if (question.question_type === 'composite') {
      return question.sub_questions.map((item, idx) => (
        <div key={idx} className="flex gap-1">
          <span>{item.text1_uz}</span>
          <span>{item.correct_answer}</span>
          <span>{item.text2_uz}</span>
        </div>
      ))
    }

    return question.choices.map((item, idx) => (
      <div key={idx} className="flex gap-1">
        <span className={item.is_correct ? 'text-blue-500' : ''}>{item.letter}</span>
        <span>{item.text_uz}</span>
        <span>{item?.image_url}</span>
      </div>
    ))
  }

  const getQuestionTypeLabel = (type) => {
    const typeMap = {
      text: t('textInput'),
      choice: t('selectOption'),
      image_choice: t('imageOption'),
      composite: t('multipleInput')
    }
    return typeMap[type] || ''
  }

  return (
    <MathJaxContext
      config={{
        loader: { load: ['input/tex', 'output/chtml'] },
        options: { enableMenu: false },
        tex: { packages: { '[+]': ['noerrors', 'noundefined'] } }
      }}
    >
      <div className="col-span-12 border border-[#E9E9E9] rounded-[12px]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-b-[#E9E9E9]">
              <th className="p-3 pl-6 text-left">#</th>
              <th className="p-3 text-left">{t('question')}</th>
              <th className="p-3 text-left">{t('correctAnswers')}</th>
              <th className="p-3 text-left">{t('correctAnswers')} (latex)</th>
              <th className="p-3 text-center">{t('questionType')}</th>
              <th className="p-3 text-center">{t('action')}</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={question.id} className="border-t hover:bg-[#F0F9FF]">
                <td className="p-3 pl-6">{index + 1}</td>
                <td className="p-3">
                  <MathJax dynamic>
                    {parse(get(question, i18n.language === 'uz' ? 'question_text_uz' : 'question_text_ru') || '')}
                  </MathJax>
                </td>
                <td className="p-3">{renderAnswer(question)}</td>
                <td className="p-3 text-sm">{renderAnswer(question)}</td>
                <td className="p-3 text-center">{getQuestionTypeLabel(question.question_type)}</td>
                <td className="py-2 text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <Button
                      onclick={() => onEdit(question)}
                      py="p-2"
                      px="p-2"
                      classname="text-sm bg-[#FF9500] hover:bg-[#DB8000] transition-all duration-200"
                    >
                      <EditIcon color="white" />
                    </Button>
                    <Button
                      onclick={() => onDelete(question)}
                      py="p-2"
                      px="p-2"
                      classname="text-sm bg-[#FF3B30] hover:bg-[#E1332A] transition-all duration-200"
                    >
                      <TrashIcon color="white" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MathJaxContext>
  )
}

export default QuestionTable
