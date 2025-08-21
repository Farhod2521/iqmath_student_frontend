import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaExclamationTriangle, FaCoins } from 'react-icons/fa'
import Button from '@/components/button'
import Image from 'next/image'

const ConfirmPurchaseModal = ({ isOpen, onClose, onConfirm, product, paymentType }) => {
  const { t } = useTranslation()

  if (!isOpen || !product) return null

  const getPaymentInfo = () => {
    switch (paymentType) {
      case 'coins':
        return {
          icon: <Image src="/icons/coins-logo.svg" alt="Coins" width={20} height={20} />,
          value: product.coin,
          label: t('coin')
        }
      case 'points':
        return {
          icon: <Image src="/icons/ball.svg" alt="Points" width={20} height={20} />,
          value: product.price_score,
          label: t('ball')
        }
      case 'money':
        return {
          icon: <span className="text-[#2A3547] dark:text-white font-bold text-lg">₽</span>,
          value: product.price_money,
          label: 'so\'m'
        }
      default:
        return null
    }
  }

  const paymentInfo = getPaymentInfo()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#202936] rounded-2xl shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mb-4">
            <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400 text-3xl" />
          </div>
        
          <p className="text-[#5A6A85] dark:text-gray-400">
            {t('confirmPurchaseMessage')}
          </p>
        </div>

        {/* Product Info */}
        <div className="bg-gray-50 dark:bg-[#2A3447] rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-contain rounded-lg"
              onError={(e) => {
                e.target.src = '/images/SHOPITEMS.png'
              }}
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#2A3547] dark:text-white mb-1">
                {product.name}
              </h3>
              <div className="flex items-center gap-2">
                {paymentInfo?.icon}
                <span className="text-lg font-bold text-[#5D87FF]">
                  {paymentInfo?.value} {paymentInfo?.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            classname="flex-1 bg-gray-300 hover:bg-gray-400 text-[#2A3547] dark:bg-[#2A3447] dark:hover:bg-[#1F2937] dark:text-white"
            onclick={onClose}
          >
            {t('cancel')}
          </Button>
          <Button
            classname="flex-1 bg-green-500 hover:bg-green-600 text-white"
            onclick={() => {
              onConfirm()
              onClose()
            }}
          >
            {t('confirmPurchase')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmPurchaseModal
