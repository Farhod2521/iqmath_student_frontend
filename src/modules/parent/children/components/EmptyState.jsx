import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiUser } from 'react-icons/fi'

const EmptyState = () => {
  const { t } = useTranslation()

  return (
    <div className="p-6">
      <div className="bg-white rounded-[12px] border border-[#E9E9E9] p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiUser className="w-8 h-8 text-gray-500" />
        </div>
        <h2 className="text-[18px] font-semibold mb-2 text-gray-800">{t('noChildrenFound')}</h2>
        <p className="text-gray-600 text-[14px]">{t('noChildrenDescription')}</p>
      </div>
    </div>
  )
}

export default EmptyState
