import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";

const cleanText = (text) =>
  text
    ?.replace(/(<br\s*\/?>|;|\s)+$/g, '') // oxiridagi <br>, ; yoki bo'sh joylarni olib tashlaydi
    ?.replace(/^\s+/, ''); // boshidagi bo'sh joylarni olib tashlaydi

const StudentExampleAnswerPanel = ({ selected, i18n }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full max-w-xl flex flex-col items-center justify-center h-full">
      <div className="w-full">
        {/* Savol matni */}
        <MathJaxContext>
          <div className="mb-8 text-gray-900 text-lg font-semibold text-center">
            {parse(
              cleanText(
                i18n.language === "ru"
                  ? selected.question_ru
                  : selected.question_uz
              )
            )}
          </div>
        </MathJaxContext>
        {/* Foydalanuvchi javobi */}
        <div className="mb-4 flex items-center gap-x-4">
          <div className="text-gray-500 text-base font-medium min-w-max">
            {i18n.language === "ru" ? "Полученный ответ" : "O'quvchi javobi"}
          </div>
          <div className="bg-gray-100 rounded-lg px-6 py-4 text-base font-mono text-gray-700 min-h-[48px] flex items-center flex-1">
            {selected.answer_text ? (
              <span className="w-full flex items-center">
                <MathJax dynamic>{selected.answer_text}</MathJax>
              </span>
            ) : (
              <span className="italic text-gray-400 w-full">-</span>
            )}
          </div>
        </div>
        {/* To'g'ri javob */}
        <div className="flex items-center gap-x-4">
          <div className={`text-gray-500 text-base  font-medium min-w-max ${i18n.language === "uz" ? "me-6" : ""}`} >
            {i18n.language === "ru" ? "Правильный ответ" : "To'g'ri javob"}
          </div>
          <div className="bg-green-50 rounded-lg px-6 py-4 text-base font-mono text-green-700 min-h-[48px] flex items-center flex-1">
            {selected.correct_answer ? (
              <span className="w-full flex items-center">
                <MathJax dynamic>{selected.correct_answer}</MathJax>
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