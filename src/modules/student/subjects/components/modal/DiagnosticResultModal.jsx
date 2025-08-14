import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@heroui/react'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import SimpleModal from '@/components/modal/simple-modal'

const DiagnosticResultModal = ({ 
  isOpen, 
  onClose, 
  score, 
  onRetake,
  showRetakeButton = true,
  subjectId = null
}) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <SimpleModal open={isOpen} onClose={onClose} classname="modal-lg">
      <div className="relative">
        <button onClick={onClose} className="absolute right-0 float-right p-[24px]">
          <Image src={'/icons/close.svg'} alt="circle" width={24} height={24} />
        </button>
      </div>

      <div className="flex flex-col justify-center items-center">
        <Image src={'/icons/award.svg'} alt="circle" width={84} height={118} className="mt-[24px]" />

        <p className="text-[22px] font-semibold mt-[24px] mb-[16px]">
          {t('yourScore', { score: get(score, 'data.result[0].correct_answers') })}
        </p>
        <p className="text-center">
          {t('yourAnswer', {
            answer: get(score, 'data.result[0].correct_answers'),
            total: get(score, 'data.result[0].total_answers')
          })}
          <br /> {t('yourResult', { result: get(score, 'data.result[0].score', 0) })}%
        </p>

        <div className="bg-[#E9E9E9] w-full h-[1px] my-[24px]"></div>

        <div className="flex flex-wrap justify-center gap-3 pb-[24px] text-sm">
          {showRetakeButton && (
            <Button 
              onPress={onRetake}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200"
            >
              {t('retakeTest')}
            </Button>
          )}
          
          <Link href={subjectId ? `/dashboard/student/recommendations/${subjectId}` : '/dashboard/student/recommendations'}>
            <Button 
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200"
            >
              {t('recommendation')}
            </Button>
          </Link>
        </div>
      </div>
    </SimpleModal>
  )
}

export default DiagnosticResultModal
