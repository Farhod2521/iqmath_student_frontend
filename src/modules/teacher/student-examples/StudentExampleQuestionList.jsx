import { MathJax, MathJaxContext } from 'better-react-mathjax'
import parse from 'html-react-parser'

const StudentExampleQuestionList = ({ questions, selectedIdx, setSelectedIdx, i18n }) => (
  <div className="w-full border-r border-r-[#F2F2F7] bg-white max-h-[80vh] overflow-y-auto py-8 px-4">
    <ul className="flex flex-col">
      {questions?.map((q, idx) => {
        let circleClass = ''
        if (selectedIdx === idx) {
          circleClass = 'border-white shadow-md bg-[#037AFF] text-white'
        } else if (q.answer === true) {
          circleClass = 'border-[#2EB14F] bg-[#EBF9EEFF] text-[#2EB14F]'
        } else if (q.answer === false) {
          circleClass = 'border-[#FF3B30] bg-[#FFEBEA] text-[#FF3B30]'
        } else {
          circleClass = 'border-[#E9E9E9] bg-white'
        }
        return (
          <li
            key={q.index}
            onClick={() => setSelectedIdx(idx)}
            className={`relative flex flex-row items-start cursor-pointer transition-all group`}
            style={{ transition: 'all 0.2s', padding: '0' }}
            onMouseEnter={(e) => {
              if (selectedIdx !== idx) {
                const circle = e.currentTarget.querySelector('.num-circle')
                // Hato misollar uchun hover effect'ni o'chirib qo'yamiz
                if (q.answer === false) {
                  // Hato misollar hover bo'lganda ham qizil rangda qoladi
                  return
                }
                // Boshqa misollar uchun normal hover effect
                circle.classList.add('border-[#037AFF]', 'text-[#037AFF]')
                circle.classList.remove('border-[#E9E9E9]', 'text-black')
              }
            }}
            onMouseLeave={(e) => {
              if (selectedIdx !== idx) {
                const circle = e.currentTarget.querySelector('.num-circle')
                // Hato misollar uchun hover effect'ni o'chirib qo'yamiz
                if (q.answer === false) {
                  // Hato misollar hover bo'lganda ham qizil rangda qoladi
                  return
                }
                // Boshqa misollar uchun normal hover effect
                circle.classList.remove('border-[#037AFF]', 'text-[#037AFF]')
                circle.classList.add('border-[#E9E9E9]', 'text-black')
              }
            }}
          >
            <div className="relative flex flex-col items-center">
              <div
                className={`num-circle w-[40px] h-[40px] flex items-center justify-center border-2 rounded-full font-bold text-base ${circleClass}`}
                style={{ transition: 'all 0.2s' }}
              >
                {q.index}
              </div>
              {idx !== questions.length - 1 && <div className="w-[2px] h-6 bg-[#E9E9E9] mx-auto"></div>}
            </div>
            <div className="ml-4 flex-1 flex items-center min-h-[40px]">
              <MathJaxContext>
                <span className="text-gray-900 text-[15px] leading-snug text-left break-words w-full flex items-center">
                  <MathJax dynamic>{parse(i18n.language === 'ru' ? q.question_ru : q.question_uz)}</MathJax>
                </span>
              </MathJaxContext>
            </div>
          </li>
        )
      })}
    </ul>
  </div>
)

export default StudentExampleQuestionList
