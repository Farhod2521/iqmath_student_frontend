import StudentExampleQuestionList from "./StudentExampleQuestionList";
import StudentExampleAnswerPanel from "./StudentExampleAnswerPanel";
import { MathJaxContext } from "better-react-mathjax";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const StudentExampleDetailLayout = ({
  questions,
  result,
  selectedIdx,
  setSelectedIdx,
  i18n,
}) => {
  const selected = questions[selectedIdx] || {};
  const router = useRouter();
  const { t } = useTranslation();
  const { student_name } = router.query;
  return (
    <MathJaxContext config={{ loader: { load: ["input/tex", "output/chtml"] } }}>
      <div className="font-sf">
        <div className="flex justify-between pl-6 pr-4 py-3 border-b border-gray-100 items-center bg-white">
          <div className="flex items-center gap-x-3">
            <h1 className="text-xl font-bold">{student_name || t("diagnostics")}</h1>
            <div className="w-px h-6 bg-gray-200"></div>
            <p className="text-base text-gray-600">{t("task")}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <button onClick={() => router.back()} className="rounded p-1 hover:bg-gray-100 transition">
              <Image src="/icons/close.svg" alt="close" width={24} height={24} />
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] bg-white">
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <StudentExampleQuestionList
              questions={questions}
              selectedIdx={selectedIdx}
              setSelectedIdx={setSelectedIdx}
              i18n={i18n}
            />
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <StudentExampleAnswerPanel selected={selected} result={result} i18n={i18n} />
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
};

export default StudentExampleDetailLayout; 