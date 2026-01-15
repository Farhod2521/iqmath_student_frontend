import React from 'react'
import { useTranslation } from 'react-i18next'

const EmptyState = () => {
  const { t } = useTranslation()

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-[#202936] rounded-[10px] dark:border-[#2A3447FF] p-6">
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl">📦</div>
          <h2 className="text-2xl font-semibold mb-2 text-[#2A3547] dark:text-white">{t('purchasedProducts')}</h2>
          <p className="text-[#5A6A85] dark:text-gray-400">{t('emptyPurchasedProducts')}</p>
        </div>
      </div>
    </div>
  )
}

export default EmptyState
