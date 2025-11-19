// components/subject-detail/QuestionModal/CompositeAnswerInput.jsx
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { useTranslation } from 'react-i18next'

const CompositeAnswerInput = ({ questions, onChange }) => {
  const { t } = useTranslation()

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index][field] = value
    onChange('compositeQuestions', updatedQuestions)
  }

  const handleAddQuestion = () => {
    const newQuestion = {
      text1_uz: '',
      text1_ru: '',
      correct_answer: '',
      text2_uz: '',
      text2_ru: ''
    }
    onChange('compositeQuestions', [...questions, newQuestion])
  }

  const handleRemoveQuestion = (index) => {
    if (questions.length <= 1) return
    const updatedQuestions = questions.filter((_, i) => i !== index)
    onChange('compositeQuestions', updatedQuestions)
  }

  return (
    <div className="px-4 space-y-4">
      <MathJaxContext
        config={{
          loader: { load: ['input/tex', 'output/chtml'] }
        }}
      >
        {questions.map((question, index) => (
          <div key={index} className="space-y-2 border border-gray-200 p-4 rounded-md">
            {/* Uzbek Inputs */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <input
                  type="text"
                  value={question.text1_uz}
                  onChange={(e) => handleQuestionChange(index, 'text1_uz', e.target.value)}
                  placeholder="Text 1 (O'zbek)"
                  className="w-full border rounded-lg py-2 px-3"
                />
                <MathJax dynamic>{question.text1_uz}</MathJax>
              </div>
              <div>
                <input
                  type="text"
                  value={question.correct_answer}
                  onChange={(e) => handleQuestionChange(index, 'correct_answer', e.target.value)}
                  placeholder="To'g'ri javob"
                  className="w-full border rounded-lg py-2 px-3"
                />
                <MathJax dynamic>{question.correct_answer}</MathJax>
              </div>
              <div>
                <input
                  type="text"
                  value={question.text2_uz}
                  onChange={(e) => handleQuestionChange(index, 'text2_uz', e.target.value)}
                  placeholder="Text 2 (O'zbek)"
                  className="w-full border rounded-lg py-2 px-3"
                />
                <MathJax dynamic>{question.text2_uz}</MathJax>
              </div>
            </div>

            {/* Russian Inputs */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <input
                  type="text"
                  value={question.text1_ru}
                  onChange={(e) => handleQuestionChange(index, 'text1_ru', e.target.value)}
                  placeholder="Text 1 (Rus)"
                  className="w-full border rounded-lg py-2 px-3"
                />
                <MathJax dynamic>{question.text1_ru}</MathJax>
              </div>
              <div>
                <input
                  type="text"
                  value={question.correct_answer}
                  onChange={(e) => handleQuestionChange(index, 'correct_answer', e.target.value)}
                  placeholder="To'g'ri javob"
                  className="w-full border rounded-lg py-2 px-3"
                />
                <MathJax dynamic>{question.correct_answer}</MathJax>
              </div>
              <div>
                <input
                  type="text"
                  value={question.text2_ru}
                  onChange={(e) => handleQuestionChange(index, 'text2_ru', e.target.value)}
                  placeholder="Text 2 (Rus)"
                  className="w-full border rounded-lg py-2 px-3"
                />
                <MathJax dynamic>{question.text2_ru}</MathJax>
              </div>
            </div>

            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="text-red-500 hover:text-red-700 text-lg mt-2"
              >
                ❌ O'chirish
              </button>
            )}
          </div>
        ))}
      </MathJaxContext>

      <button
        type="button"
        onClick={handleAddQuestion}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        {t('addNewQuestion')}
      </button>
    </div>
  )
}

export default CompositeAnswerInput