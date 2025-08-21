import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaCheckCircle, FaCoins } from 'react-icons/fa'
import Button from '@/components/button'

const PurchaseSuccessModal = ({ isOpen, onClose, purchaseData }) => {
  const { t } = useTranslation()

  if (!isOpen || !purchaseData) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#202936] rounded-2xl shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
            <FaCheckCircle className="text-green-600 dark:text-green-400 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-[#2A3547] dark:text-white mb-2">
            {t('purchaseSuccessful')}
          </h2>
          <p className="text-[#5A6A85] dark:text-gray-400">
            {purchaseData.message_uz}
          </p>
        </div>

        {/* Purchase Details */}
        <div className="space-y-4 mb-6">
          {/* Exchange ID */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#2A3447] rounded-lg">
            <span className="text-sm font-medium text-[#2A3547] dark:text-white">
              {t('exchangeId')}
            </span>
            <span className="text-sm font-bold text-[#5D87FF]">
              #{purchaseData.exchange_id}
            </span>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#2A3447] rounded-lg">
            <span className="text-sm font-medium text-[#2A3547] dark:text-white">
              {t('status')}
            </span>
            <span className="text-sm font-bold text-green-600 dark:text-green-400">
              {purchaseData.status === 'approved' ? t('approved') : purchaseData.status}
            </span>
          </div>

          {/* Remaining Coins */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg border border-yellow-200 dark:border-yellow-700/30">
            <div className="flex items-center gap-2">
              <FaCoins className="text-yellow-600 dark:text-yellow-400" size={16} />
              <span className="text-sm font-medium text-[#2A3547] dark:text-white">
                {t('remainingCoins')}
              </span>
            </div>
            <span className="text-lg font-bold text-yellow-700 dark:text-yellow-300">
              {purchaseData.remaining_coin}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            classname="flex-1 bg-gray-300 hover:bg-gray-400 text-[#2A3547] dark:bg-[#2A3447] dark:hover:bg-[#1F2937] dark:text-white "
            onclick={onClose}
          >
            {t('close')}
          </Button>
          <Button
            classname="text-white bg-[#5D87FF] hover:bg-[#4463bb] flex-1"
            onclick={() => {
              onClose()
              // Harid qilingan mahsulotlar sahifasiga o'tish
              window.location.href = '/dashboard/student/purchased-products'
            }}
          >
            {t('viewPurchasedProducts')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PurchaseSuccessModal
