import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { get } from 'lodash'

import usePostQuery from '@/hooks/api/usePostQuery'
import { URLS } from '@/constants/url'
import toast from 'react-hot-toast'
import SimpleModal from '@/components/modal/simple-modal'
import DiagnosticQuestions from './DiagnosticQuestions'

const DiagnosticTest = ({ subjectId, isRetake = false }) => {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const router = useRouter()
  const [tab, setTab] = useState(1)
  const [showLevelModal, setShowLevelModal] = useState(true)
  const [testQuestions, setTestQuestions] = useState(null)

  // Testni boshlash uchun post
  const { mutate: beginTest, isLoading } = usePostQuery({
    listKeyId: 'begin-test',
    hideSuccessToast: true
  })

  const handleBeginTest = () => {
    beginTest(
      {
        url: URLS.beginTest,
        attributes: {
          level: tab,
          subject_id: parseInt(subjectId)
        },
        config: {
          headers: { Authorization: `Bearer ${session?.accessToken}` }
        }
      },
      {
        onSuccess: (res) => {
          // API response strukturini tekshirish
          let questions = []

          if (res?.data?.questions) {
            questions = res.data.questions
          } else if (Array.isArray(res?.data)) {
            questions = res.data
          } else if (res?.data) {
            questions = [res.data]
          }

          console.log('Questions array:', questions)
          console.log('Questions length:', questions.length)

          if (questions.length === 0) {
            console.error('No questions received from API')
            toast.error('Test savollari topilmadi')
            return
          }

          setTestQuestions(questions)
          setShowLevelModal(false)
          toast.success(isRetake ? 'Qayta topshirish boshlandi!' : 'Diqqat! Test boshlandi.')
        },
        onError: (err) => {
          console.error('=== TEST ERROR ===')
          console.error('Error object:', err)
          console.error('Error response:', err?.response)
          console.error('Error data:', err?.response?.data)
          console.error('Error status:', err?.response?.status)
          console.error('Error message:', err?.response?.data?.message)

          // Xatolik xabarini ko'rsatish
          const errorMessage = err?.response?.data?.message || 'Testni boshlashda xatolik yuz berdi'
          toast.error(errorMessage)
        }
      }
    )
  }

  const handleTabChange = (newTab) => {
    setTab(newTab)
  }

  // Agar test savollari mavjud bo'lsa, DiagnosticQuestions komponentini ko'rsat
  if (testQuestions) {
    return <DiagnosticQuestions testQuestions={testQuestions} subjectId={subjectId} />
  }

  return (
    <div className="font-sf">
      {showLevelModal && (
        <SimpleModal>
          <div className="flex justify-between px-[16px] py-[18px]">
            <h3 className="text-[19px] font-semibold">{isRetake ? t('retakeDiagnostic') : t('diagnostics')}</h3>
            <button onClick={() => router.push('/dashboard/student/diagnostics')} className="rounded">
              <img src="/icons/close.svg" alt="close" width={24} height={24} />
            </button>
          </div>
          <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>
          <div className="p-[24px]">
            <p className="text-[15px]">{isRetake ? t('chooseLevelForRetake') : t('chooseYourLevel')}</p>
            <ul className="flex mt-[16px] gap-x-[12px]">
              <li className="flex-grow">
                <button
                  onClick={() => handleTabChange(1)}
                  className={`border  ${
                    tab === 1 ? 'border-[#5D87FF]' : 'border-[#E9E9E9]'
                  } rounded-[12px] px-[16px] w-full block py-[12px] translation-all duration-300`}
                >
                  {t('level1')}
                </button>
              </li>
              <li className="flex-grow">
                <button
                  onClick={() => handleTabChange(2)}
                  className={`border  ${
                    tab === 2 ? 'border-[#5D87FF]' : 'border-[#E9E9E9]'
                  } rounded-[12px] px-[16px] w-full block py-[12px] translation-all duration-300`}
                >
                  {t('level2')}
                </button>
              </li>
              <li className="flex-grow">
                <button
                  onClick={() => handleTabChange(3)}
                  className={`border  ${
                    tab === 3 ? 'border-[#5D87FF]' : 'border-[#E9E9E9]'
                  } rounded-[12px] px-[16px] w-full block py-[12px] translation-all duration-300`}
                >
                  {t('level3')}
                </button>
              </li>
            </ul>
          </div>

          <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

          <div className="flex flex-col sm:flex-row justify-center gap-y-2 sm:gap-y-0 gap-x-2 py-[18px]">
            <button
              onClick={handleBeginTest}
              disabled={isLoading}
              className="bg-[#5D87FF] text-white py-[11px] px-[26px] rounded-[8px] w-full sm:w-auto disabled:opacity-50"
            >
              {isLoading ? t('loading') : isRetake ? t('retakeTest') : t('takeTest')}
            </button>
          </div>
        </SimpleModal>
      )}
    </div>
  )
}

export default DiagnosticTest
