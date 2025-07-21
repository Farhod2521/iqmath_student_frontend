import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

const cleanText = (text) =>
  text
    ?.replace(/(<br\s*\/?>|;|\s)+$/g, '') // oxiridagi <br>, ; yoki bo'sh joylarni olib tashlaydi
    ?.replace(/^\s+/, ''); // boshidagi bo'sh joylarni olib tashlaydi

const StudentExampleAnswerPanel = ({ selected, i18n }) => {
  const { t } = useTranslation();
  
  // O'quvchi javobining to'g'ri yoki noto'g'ri bo'lishiga qarab rang belgilash
  const getAnswerColor = () => {
    if (selected.answer === true) {
      return "bg-green-50 text-green-700"; // To'g'ri javob - yashil
    } else if (selected.answer === false) {
      return "bg-red-50 text-red-700"; // Noto'g'ri javob - qizil
    } else {
      return "bg-gray-100 text-gray-700"; // Javob yo'q - kulrang
    }
  };

  // Savol matnini tayyorlash
  const questionText = cleanText(
    i18n.language === "ru"
      ? selected.question_ru
      : selected.question_uz
  );

  return (
    <div className="w-full max-w-xl flex flex-col items-center justify-center h-full">
      <div className="w-full">
        {/* Savol matni */}
        <div className="mb-8 text-gray-900 text-lg font-semibold text-center">
          <MathJaxContext config={{ loader: { load: ["input/tex", "output/chtml"] } }}>
            <span className="text-gray-900 text-[15px] leading-snug text-center break-words w-full flex justify-center items-center">
              <MathJax dynamic>
                {parse(questionText)}
              </MathJax>
            </span>
          </MathJaxContext>
        </div>
        {/* Foydalanuvchi javobi */}
        <div className="mb-4 flex items-center gap-x-4">
          <div className="text-gray-500 text-base font-medium min-w-max">
            {t("studentAnswer")}
          </div>
          <div className={`rounded-lg px-6 py-4 text-base font-mono min-h-[48px] flex items-center flex-1 ${getAnswerColor()}`}>
            {selected.answer_text ? (
              <span className="w-full flex items-center">
                <MathJaxContext config={{ loader: { load: ["input/tex", "output/chtml"] } }}>
                  <MathJax dynamic>{selected.answer_text}</MathJax>
                </MathJaxContext>
              </span>
            ) : (
              <span className="italic text-gray-400 w-full">-</span>
            )}
          </div>
        </div>
        {/* To'g'ri javob */}
        <div className="flex items-center gap-x-4">
          <div className={`text-gray-500 text-base  font-medium min-w-max ${i18n.language === "uz" ? "me-6" : ""}`} >
            {t("correctAnswerLabel")}
          </div>
          <div className="bg-green-50 rounded-lg px-6 py-4 text-base font-mono text-green-700 min-h-[48px] flex items-center flex-1">
            {selected.correct_answer ? (
              <span className="w-full flex items-center">
                <MathJaxContext config={{ loader: { load: ["input/tex", "output/chtml"] } }}>
                  <MathJax dynamic>{selected.correct_answer}</MathJax>
                </MathJaxContext>
              </span>
            ) : (
              <span className="italic text-gray-400 w-full ">{t("correctAnswer")}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentExampleAnswerPanel; 