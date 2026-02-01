import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { useTranslation } from 'react-i18next'
import parse from 'html-react-parser'

const cleanText = (text) =>
  text
    ?.replace(/(<br\s*\/?>|;|\s)+$/g, '') // oxiridagi <br>, ; yoki bo'sh joylarni olib tashlaydi
    ?.replace(/^\s+/, '') // boshidagi bo'sh joylarni olib tashlaydi

const StudentExampleAnswerPanel = ({ selected, result, i18n }) => {
  const { t } = useTranslation()

  // O'quvchi javobining to'g'ri yoki noto'g'ri bo'lishiga qarab rang belgilash
  const getAnswerColor = () => {
    if (selected.answer === true) {
      return 'bg-green-50 text-green-700' // To'g'ri javob - yashil
    } else if (selected.answer === false) {
      return 'bg-red-50 text-red-700' // Noto'g'ri javob - qizil
    } else {
      return 'bg-gray-100 text-gray-700' // Javob yo'q - kulrang
    }
  }

  // Savol matnini tayyorlash
  const questionText = cleanText(i18n.language === 'ru' ? selected.question_ru : selected.question_uz)

  // Savol turini aniqlash
  const questionType = selected.question_type || 'text'

  // Composite savollar uchun javoblarni ko'rsatish
  const renderCompositeAnswers = () => {
    const studentAnswers = selected.sub_answers || []
    const correctAnswers = Array.isArray(selected.system_response) ? selected.system_response : []

    return (
      <div className="space-y-3">
        {studentAnswers.map((studentAnswer, index) => (
          <div key={index} className="flex items-center gap-x-4">
            <div className="text-sm font-medium text-gray-500 min-w-max">
              {t('studentAnswer')} {index + 1}
            </div>
            <div
              className={`rounded-lg px-4 py-2 text-sm font-mono min-h-[35px] flex items-center flex-1 ${getAnswerColor()}`}
            >
              {studentAnswer ? (
                <span className="flex items-center w-full">
                  <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
                    <MathJax dynamic>{studentAnswer}</MathJax>
                  </MathJaxContext>
                </span>
              ) : (
                <span className="w-full italic text-gray-400">-</span>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Composite savollar uchun to'g'ri javoblarni ko'rsatish
  const renderCompositeCorrectAnswers = () => {
    console.log('selected', selected)
    const correctAnswers = Array.isArray(selected.system_response) ? selected.system_response : []
    console.log('correctAnswers', correctAnswers)

    return (
      <div className="space-y-3">
        {correctAnswers.map((correctAnswer, index) => (
          <div key={index} className="flex items-center gap-x-4">
            <div className={`text-gray-500 text-sm font-medium min-w-max ${i18n.language === 'uz' ? 'me-6' : ''}`}>
              {t('correctAnswerLabel')} {index + 1}
            </div>
            <div className="bg-green-50 rounded-lg px-4 py-2 text-sm font-mono text-green-700 min-h-[35px] flex items-center flex-1">
              {correctAnswer ? (
                <span className="flex items-center w-full">
                  <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
                    <MathJax dynamic>{correctAnswer}</MathJax>
                  </MathJaxContext>
                </span>
              ) : (
                <span className="w-full italic text-gray-400">{t('correctAnswer')}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Text savollar uchun oddiy javob ko'rsatish
  const renderTextAnswer = () => (
    <div className="flex items-center mb-4 gap-x-4">
      <div className="text-base font-medium text-gray-500 min-w-max">{t('studentAnswer')}</div>
      <div
        className={`rounded-lg px-4 py-3 text-sm font-mono min-h-[40px] flex items-center flex-1 ${getAnswerColor()}`}
      >
        {selected.answer_text ? (
          <span className="flex items-center w-full">
            <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
              <MathJax dynamic>{selected.answer_text}</MathJax>
            </MathJaxContext>
          </span>
        ) : (
          <span className="w-full italic text-gray-400">-</span>
        )}
      </div>
    </div>
  )

  // Text savollar uchun to'g'ri javob ko'rsatish
  const renderTextCorrectAnswer = () => (
    <div className="flex items-center gap-x-4">
      <div className={`text-gray-500 text-base font-medium min-w-max ${i18n.language === 'uz' ? 'me-6' : ''}`}>
        {t('correctAnswerLabel')}
      </div>
      <div className="bg-green-50 rounded-lg px-4 py-3 text-sm font-mono text-green-700 min-h-[40px] flex items-center flex-1">
        {selected.system_response ? (
          <span className="flex items-center w-full">
            <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
              <MathJax dynamic>{selected.system_response}</MathJax>
            </MathJaxContext>
          </span>
        ) : (
          <span className="w-full italic text-gray-400">{t('correctAnswer')}</span>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-md px-4">
      <div className="w-full">
        {/* Savol matni */}
        <div className="mb-6 text-base font-semibold text-center text-gray-900">
          <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
            <span className="text-gray-900 text-[15px] leading-snug text-center break-words w-full flex justify-center items-center">
              <MathJax dynamic>{parse(questionText)}</MathJax>
            </span>
          </MathJaxContext>
        </div>

        {/* Savol turi bo'yicha javoblarni ko'rsatish */}
        {questionType === 'composite' ? (
          <>
            {/* Composite savollar uchun o'quvchi javoblari */}
            <div className="mb-4">{renderCompositeAnswers()}</div>
            {/* Composite savollar uchun to'g'ri javoblar */}
            <div>{renderCompositeCorrectAnswers()}</div>
          </>
        ) : (
          <>
            {/* Text savollar uchun o'quvchi javobi */}
            {renderTextAnswer()}
            {/* Text savollar uchun to'g'ri javob */}
            {renderTextCorrectAnswer()}
          </>
        )}
      </div>
    </div>
  )
}

export default StudentExampleAnswerPanel
