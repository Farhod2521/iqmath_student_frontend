import StudentExampleQuestionList from "./StudentExampleQuestionList";
import StudentExampleAnswerPanel from "./StudentExampleAnswerPanel";
import { MathJaxContext } from "better-react-mathjax";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import usePostQuery from '@/hooks/api/usePostQuery';

const StudentExampleDetailLayout = ({
  questions,
  result,
  selectedIdx,
  setSelectedIdx,
  i18n,
  helpRequestId,
  currentStatus,
  onCommentSubmitted, 
}) => {
  const selected = questions[selectedIdx] || {};
  const router = useRouter();
  const { t } = useTranslation();
  const { student_name } = router.query;
  const [comment, setComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // React Query hook for comment submission
  const { mutate: submitComment, isLoading: isSubmitting } = usePostQuery({
    hideSuccessToast: true, // We'll handle success toast manually
    hideErrorToast: true,   // We'll handle error toast manually
  });

  // Comment yuborish funksiyasi
  const handleSubmitComment = () => {
    if (!comment.trim()) {
      toast.error(t('commentRequired'));
      return;
    }

    submitComment({
      url: '/api/v1/func_teacher/teacher-independent/commit/',
      attributes: {
        help_request_id: helpRequestId,
        commit: comment.trim()
      }
    }, {
      onSuccess: (data) => {
        toast.success(t('commentSuccess'));
        setComment('');
        setIsModalOpen(false);
        if (onCommentSubmitted) {
          onCommentSubmitted();
        }
      },
      onError: (error) => {
        console.error('Error submitting comment:', error);
        toast.error(t('commentError'));
      }
    });
  };  

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
            {/* Comment tugmasi */}
            {currentStatus !== 'tasdiqlangan' && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                {t('comment')}
              </button>
            )}
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <button onClick={() => router.push('/dashboard/teacher/student-examples')} className="rounded p-1 hover:bg-gray-100 transition">
              <Image src="/icons/close.svg" alt="close" width={24} height={24} />
            </button>
          </div>
        </div>
        {/* Desktop Layout - hozirgi holatida */}
        <div className="hidden md:flex flex-row h-[calc(100vh-80px)] bg-white">
          <div className="w-1/2 flex-shrink-0 flex items-center">
            <StudentExampleQuestionList
              questions={questions}
              selectedIdx={selectedIdx}
              setSelectedIdx={setSelectedIdx}
              i18n={i18n}
            />
          </div>
          <div className="w-1/2 flex-shrink-0 flex items-center justify-center">
            <StudentExampleAnswerPanel selected={selected} result={result} i18n={i18n} />
          </div>
        </div>

        {/* Mobile Layout - savollar raqamlari tepada, savol matni pastda */}
        <div className="md:hidden bg-white h-[calc(100vh-80px)]">
          {/* Questions Numbers - Tepada */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-wrap gap-2 justify-center">
              {questions.map((q, idx) => {
                let circleClass = '';
                if (selectedIdx === idx) {
                  circleClass = 'border-white shadow-md bg-[#037AFF] text-white';
                } else if (q.answer === true) {
                  circleClass = 'border-[#2EB14F] bg-[#EBF9EEFF] text-[#2EB14F]';
                } else if (q.answer === false) {
                  circleClass = 'border-[#FF3B30] bg-[#FFEBEA] text-[#FF3B30]';
                } else {
                  circleClass = 'border-[#E9E9E9] bg-white';
                }
                
                return (
                  <button
                    key={q.index}
                    onClick={() => setSelectedIdx(idx)}
                    className={`w-[40px] h-[40px] flex items-center justify-center border-2 rounded-full font-bold text-base ${circleClass} transition-all duration-200 hover:scale-105`}
                  >
                    {q.index}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Answer Panel - Pastda */}
          <div className="p-4 flex-1 overflow-y-auto flex items-center justify-center">
            <StudentExampleAnswerPanel selected={selected} result={result} i18n={i18n} />
          </div>
        </div>
        
        {/* Comment Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {t('comment')}
                  </h3>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setComment('');
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="px-6 py-4">
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E9E9E9] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder={t('commentPlaceholder')}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setComment('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleSubmitComment}
                  disabled={isSubmitting || !comment.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Yuborilmoqda...
                    </>
                  ) : (
                    t('submitComment')
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MathJaxContext>
  );
};

export default StudentExampleDetailLayout; 