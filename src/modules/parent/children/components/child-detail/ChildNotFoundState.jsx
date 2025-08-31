import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { FiBarChart, FiArrowLeft } from 'react-icons/fi'

const ChildNotFoundState = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className="p-6">
      <div className="bg-white rounded-[12px] border border-[#E9E9E9] p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiBarChart className="w-8 h-8 text-gray-500" />
        </div>
        <h2 className="text-[18px] font-semibold mb-2 text-gray-800">{t('childNotFound')}</h2>
        <p className="text-gray-600 text-[14px]">{t('childNotFoundDescription')}</p>
        <button
          onClick={() => router.push('/dashboard/parent/my-children')}
          className="mt-4 bg-[#5D87FF] hover:bg-[#4570EA] text-white px-4 py-2 rounded-[8px] transition-colors text-[14px] font-medium flex items-center gap-2 mx-auto"
        >
          <FiArrowLeft className="w-4 h-4" />
          {t('backToChildren')}
        </button>
      </div>
    </div>
  )
}

export default ChildNotFoundState
