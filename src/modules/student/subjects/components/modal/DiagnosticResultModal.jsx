import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button } from '@heroui/react'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { CheckCircle2, XCircle, ArrowLeft, ArrowRight, Rocket, TrendingUp } from 'lucide-react'
import SimpleModal from '@/components/modal/simple-modal'

// Pullik obunaga yo'naltiriladigan to'lov sahifasi.
const PAYMENT_URL = '/dashboard/prices/subscriptionPlans'
const MAX_VISIBLE_TOPICS = 5

const DiagnosticResultModal = ({ isOpen, onClose, score, onRetake, showRetakeButton = true }) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [showDetails, setShowDetails] = useState(false)

  const lang = i18n.language?.startsWith('ru') ? 'ru' : 'uz'

  // API (my-generate-check-answer) javobidagi har bir savolning to'g'ri/noto'g'riligi.
  const questions =
    get(score, 'data.question') || get(score, 'data.result[0].question') || get(score, 'question') || []

  // Pullik talaba (obuna) reklamani ko'rmaydi. Zaif mavzular backend'dan keladi.
  const isPaid = get(score, 'data.is_paid', false) === true
  const weakTopics = get(score, 'data.weak_topics', []) || []
  const showAd = !isPaid && weakTopics.length > 0

  // Modal yopilganda batafsil ko'rinishni tiklaymiz.
  useEffect(() => {
    if (!isOpen) setShowDetails(false)
  }, [isOpen])

  if (!isOpen) return null

  const goToPayment = () => {
    router.push(PAYMENT_URL)
  }

  const visibleTopics = weakTopics.slice(0, MAX_VISIBLE_TOPICS)
  const restTopics = weakTopics.length - visibleTopics.length

  return (
    <SimpleModal open={isOpen} onClose={onClose} classname="modal-lg">
      {showDetails ? (
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
            <button onClick={onClose} className="absolute right-0 float-right p-[24px]">
              <Image src={'/icons/close.svg'} alt="close" width={24} height={24} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center px-[24px]">
            <Image src={'/icons/award.svg'} alt="award" width={84} height={118} className="mt-[24px]" />

            <p className="mb-[16px] mt-[24px] text-[22px] font-semibold">
              {t('yourScore', { score: get(score, 'data.result[0].correct_answers') })}
            </p>
            <p className="text-center">
              {t('yourAnswer', {
                answer: get(score, 'data.result[0].correct_answers'),
                total: get(score, 'data.result[0].total_answers')
              })}
              <br /> {t('yourResult', { result: get(score, 'data.result[0].score', 0) })}%
            </p>

            {/* ---------- Motivatsion reklama (faqat pullik bo'lmaganlar uchun) ---------- */}
            {showAd && (
              <div className="mt-[24px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] p-[1px]">
                <div className="rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] p-5 text-white">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                      <Rocket size={22} />
                    </span>
                    <h3 className="text-[18px] font-bold leading-tight">{t('upsellTitle')}</h3>
                  </div>

                  <p className="mb-3 text-[13px] font-medium text-white/80">{t('upsellTopicsIntro')}</p>

                  <div className="mb-4 space-y-2">
                    {visibleTopics.map((tp, i) => (
                      <div
                        key={tp.topic_id ?? i}
                        className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-3 py-2"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-[11px] font-medium uppercase tracking-wide text-white/60">
                            {tp[`chapter_${lang}`] || tp.chapter_uz || ''}
                          </p>
                          <p className="truncate text-[14px] font-semibold">
                            {tp[`topic_${lang}`] || tp.topic_uz || ''}
                          </p>
                        </div>
                        {tp.wrong_count > 0 && (
                          <span className="shrink-0 rounded-full bg-[#F43F5E] px-2 py-0.5 text-[11px] font-semibold">
                            {t('upsellWrongBadge', { count: tp.wrong_count })}
                          </span>
                        )}
                      </div>
                    ))}
                    {restTopics > 0 && (
                      <p className="pl-1 text-[12px] font-medium text-white/70">
                        {t('upsellMoreTopics', { count: restTopics })}
                      </p>
                    )}
                  </div>

                  <p className="mb-4 flex items-start gap-2 text-[13px] leading-relaxed text-white/90">
                    <TrendingUp size={18} className="mt-0.5 shrink-0 text-[#FEAE2C]" />
                    {t('upsellMotivation')}
                  </p>

                  <button
                    onClick={goToPayment}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FEAE2C] px-6 py-3 text-[16px] font-bold text-[#291800] shadow-lg transition-all hover:bg-[#f0a41f] active:scale-[0.98]"
                  >
                    {t('upsellCta')} <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}

            <div className="my-[24px] h-[1px] w-full bg-[#E9E9E9]"></div>

            <div className="flex flex-wrap justify-center gap-3 pb-[24px] text-sm">
              {showRetakeButton && (
                <Button
                  onPress={onRetake}
                  className="rounded-lg bg-blue-500 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-600"
                >
                  {t('retakeTest')}
                </Button>
              )}

              <Button
                onPress={() => setShowDetails(true)}
                className="rounded-lg bg-green-500 px-6 py-2 font-medium text-white transition-colors duration-200 hover:bg-green-600"
              >
                {t('myResults')}
              </Button>
            </div>
          </div>
        </>
      )}
    </SimpleModal>
  )
}

export default DiagnosticResultModal
