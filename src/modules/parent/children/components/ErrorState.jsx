import React from 'react'
import { useTranslation } from 'react-i18next'
import { FiUser } from 'react-icons/fi'

const ErrorState = ({ error, onRetry }) => {
  const { t } = useTranslation()

  return (
    <div className="p-6">
      <div className="bg-white rounded-[12px] border border-[#E9E9E9] p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiUser className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-[18px] font-semibold mb-2 text-gray-800">{t('errorLoadingChildren')}</h2>
        <p className="text-gray-600 mb-4 text-[14px]">{error}</p>
        <button 
          onClick={onRetry}
          className="bg-[#5D87FF] hover:bg-[#4570EA] text-white px-4 py-2 rounded-[8px] transition-colors text-[14px] font-medium"
        >
          {t('retry')}
        </button>
      </div>
    </div>
  )
}

export default ErrorState
