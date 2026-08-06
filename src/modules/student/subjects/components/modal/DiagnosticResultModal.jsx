import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@heroui/react'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { CheckCircle2, XCircle, ArrowLeft, RefreshCw, FileText } from 'lucide-react'
import SimpleModal from '@/components/modal/simple-modal'
import SubscriptionExitPromo from './SubscriptionExitPromo'

const DiagnosticResultModal = ({ isOpen, onClose, score, onRetake, showRetakeButton = true }) => {
  const { t, i18n } = useTranslation()
  const [showDetails, setShowDetails] = useState(false)
  const [showExitPromo, setShowExitPromo] = useState(false)

  const lang = i18n.language?.startsWith('ru') ? 'ru' : 'uz'

  // API (my-generate-check-answer) javobidagi har bir savolning to'g'ri/noto'g'riligi.
  const questions =
    get(score, 'data.question') || get(score, 'data.result[0].question') || get(score, 'question') || []

  // Pullik talaba (obuna) reklamani ko'rmaydi.
  const isPaid = get(score, 'data.is_paid', false) === true
  const showAd = !isPaid

  const totalAnswers = get(score, 'data.result[0].total_answers', 0)
  const correctAnswers = get(score, 'data.result[0].correct_answers', 0)
  const wrongAnswers = Math.max(totalAnswers - correctAnswers, 0)
  const resultPercent = get(score, 'data.result[0].score', 0)

  // Modal yopilganda batafsil ko'rinishni tiklaymiz.
  useEffect(() => {
    if (!isOpen) {
      setShowDetails(false)
      setShowExitPromo(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  // Pullik bo'lmagan talaba X tugmasini bosganda, yopishdan oldin obuna taklifini ko'rsatamiz.
  const handleCloseAttempt = () => {
    if (showAd) {
      setShowExitPromo(true)
    } else {
      onClose()
    }
  }

  return (
    <SimpleModal open={isOpen} onClose={onClose} classname="modal-lg">
      {showExitPromo ? (
        /* ---------- Yopishdan oldingi obuna taklifi ---------- */
        <div>
          <div className="relative">
            <button onClick={onClose} className="absolute right-0 float-right z-10 p-[24px]">
              <Image src={'/icons/close.svg'} alt="close" width={24} height={24} />
            </button>
          </div>
          <SubscriptionExitPromo onSkip={onClose} />
        </div>
      ) : showDetails ? (
        /* ---------- Batafsil natija: har savol bo'yicha ---------- */
        <div>
          <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-[#E9E9E9] bg-white px-[24px] py-[18px]">
            <button onClick={() => setShowDetails(false)} className="rounded p-1 hover:bg-gray-100">
              <ArrowLeft size={22} />
            </button>
            <h3 className="text-[18px] font-semibold">{t('resultDetailsTitle')}</h3>
          </div>

          <div className="space-y-3 p-[24px]">
            {questions.map((q) => {
              const isCorrect = q.answer === true
              return (
                <div
                  key={q.question_id ?? q.index}
                  className={`flex items-start gap-3 rounded-xl border p-3 ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-gray-700 shadow-sm">
                    {q.index}
                  </span>
                  <div
                    className="flex-1 text-[14px] leading-relaxed text-[#1F2937] [&_p]:m-0"
                    dangerouslySetInnerHTML={{ __html: q[`question_${lang}`] || q.question_uz || '' }}
                  />
                  <span
                    className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-medium ${
                      isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {isCorrect ? t('resultCorrect') : t('resultIncorrect')}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* ---------- Umumiy natija ---------- */
        <>
          <div className="relative">
            <button onClick={handleCloseAttempt} className="absolute right-0 float-right z-10 p-[24px]">
              <Image src={'/icons/close.svg'} alt="close" width={24} height={24} />
            </button>
          </div>

          <div className="flex flex-col gap-4 px-[20px] pb-[24px] pt-[16px] sm:px-[24px]">
            {/* ---------- Natija kartasi ---------- */}
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#EEF3FF] to-[#F7FAFF] p-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="w-full sm:max-w-[58%]">
                  <p className="mb-2 text-[15px] font-semibold text-[#5D87FF]">{t('resultCongrats')} 🎉</p>
                  <h2 className="text-[20px] font-extrabold leading-tight text-[#1E2A4A] sm:text-[26px]">
                    {t('yourAnswer', { total: totalAnswers, answer: correctAnswers })}
                  </h2>

                  <p className="mb-2 mt-5 text-[13px] font-medium text-[#8A93A6]">{t('resultLabel')}</p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-[#E0EAFF] px-5 py-4 sm:w-[150px]">
                      <span className="text-[26px] font-extrabold text-[#3758F9]">{resultPercent}%</span>
                      <span className="text-[11px] font-medium text-[#5C6A93]">{t('resultPercentLabel')}</span>
                    </div>

                    <div className="flex-1 space-y-1 rounded-2xl bg-white/70 px-4 py-3">
                      <div className="flex items-center justify-between py-1">
                        <span className="flex items-center gap-2 text-[13px] text-[#3B4257]">
                          <CheckCircle2 size={16} className="text-emerald-500" />
                          {t('resultCorrectAnswers')}
                        </span>
                        <span className="text-[13px] font-bold text-[#1E2A4A]">
                          {correctAnswers} {t('piece')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="flex items-center gap-2 text-[13px] text-[#3B4257]">
                          <XCircle size={16} className="text-rose-500" />
                          {t('resultWrongAnswers')}
                        </span>
                        <span className="text-[13px] font-bold text-[#1E2A4A]">
                          {wrongAnswers} {t('piece')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="flex items-center gap-2 text-[13px] text-[#3B4257]">
                          <FileText size={16} className="text-[#5D87FF]" />
                          {t('resultTotalQuestions')}
                        </span>
                        <span className="text-[13px] font-bold text-[#1E2A4A]">
                          {totalAnswers} {t('piece')}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="flex h-[120px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm sm:h-[180px] sm:w-[180px]">
                  <Image
                    src="/images/kubik.png"
                    alt="trophy"
                    width={180}
                    height={180}
                    className="h-[85%] w-[85%] object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="pt-1 text-center">
              <p className="mb-2 text-[12px] font-medium text-[#8A93A6]">{t('satisfiedQuestion')}</p>
              <div className={`grid gap-3 ${showRetakeButton ? 'grid-cols-2' : 'mx-auto max-w-[220px] grid-cols-1'}`}>
                {showRetakeButton && (
                  <Button
                    onPress={onRetake}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#D6DEEC] bg-white px-5 py-2 text-[13px] font-medium text-[#3758F9] transition-colors duration-200 hover:bg-[#F3F6FF]"
                  >
                    <RefreshCw size={15} />
                    {t('retakeTest')}
                  </Button>
                )}

                <Button
                  onPress={() => setShowDetails(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3758F9] px-5 py-2 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-[#2c48e0]"
                >
                  <FileText size={15} />
                  {t('myResults')}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </SimpleModal>
  )
}

export default DiagnosticResultModal
