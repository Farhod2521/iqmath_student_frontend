import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiBarChart } from 'react-icons/fi'

const NoActivityState = () => {
  const { t } = useTranslation()

  return (
    <div className="bg-white rounded-[12px] border border-[#E9E9E9] p-8 text-center mt-6">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiBarChart className="w-8 h-8 text-gray-500" />
      </div>
      <h2 className="text-[18px] font-semibold mb-2 text-gray-800">{t('noActivityData')}</h2>
      <p className="text-gray-600 text-[14px]">{t('noActivityDescription')}</p>
    </div>
  )
}

export default NoActivityState
