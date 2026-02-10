import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useMutation } from '@tanstack/react-query'
import { request } from '@/services/api'
import Button from '@/components/button'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useScoreStore } from '@/store'
import PurchaseSuccessModal from '../components/PurchaseSuccessModal'
import ConfirmPurchaseModal from '../components/ConfirmPurchaseModal'
import { FaBoxOpen } from 'react-icons/fa'
import { useGetQuery } from '@/hooks'

const Products = () => {
  const { t, i18n } = useTranslation()
  const { setScoreData } = useScoreStore()

  const [exchangingProduct, setExchangingProduct] = useState(null)
  const [purchaseModalData, setPurchaseModalData] = useState(null)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [confirmModalData, setConfirmModalData] = useState(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const {
    data: products,
    isLoading,
    error
  } = useGetQuery({
    key: KEYS.products,
    url: URLS.products
  })

  const { mutate: exchangeProduct } = useMutation({
    mutationFn: ({ productId }) => request.post(`${URLS.exchangeProduct}${productId}/`, {}),
    onSuccess: (data) => {
      const responseData = data?.data || data
      setPurchaseModalData(responseData)
      setIsPurchaseModalOpen(true)
      setExchangingProduct(null)

      if (responseData.remaining_coin !== undefined) {
        setScoreData({ coin: responseData.remaining_coin })
      }
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error_uz || t('productError')
      toast.error(errorMessage)
      setExchangingProduct(null)
    }
  })

  const handlePurchase = (product, paymentType = 'coins') => {
    if (!product || product.count === 0) {
      toast.error(t('productOutOfStock'))
      return
    }
    setConfirmModalData({ product, paymentType })
    setIsConfirmModalOpen(true)
  }

  const handleConfirmPurchase = (product) => {
    if (!product || product.count === 0) {
      toast.error(t('productOutOfStock'))
      return
    }
    setExchangingProduct(product.id)
    exchangeProduct({ productId: product.id })
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-[#202936] rounded-[10px] p-6 text-center border">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-white">{t('loadingProducts')}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-[#202936] rounded-[10px] p-6 text-center border">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-semibold mb-2 text-[#2A3547] dark:text-white">{t('errorTitle')}</h2>
          <p className="text-gray-600 dark:text-gray-400">{t('errorDescription')}</p>
        </div>
      </div>
    )
  }

  const productList = products?.data || []

  if (!productList.length) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-[#202936] rounded-[10px] p-6 text-center border">
          <div className="text-6xl mb-4">🛍️</div>
          <h2 className="text-2xl font-semibold mb-2 text-[#2A3547] dark:text-white">{t('noProductsAvailable')}</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productList.map((product) => {
          const isOutOfStock = product.count === 0

          return (
            <div
              key={product.id}
              className={`relative bg-white dark:bg-[#202936] rounded-[10px] border shadow-sm overflow-hidden 
                ${isOutOfStock ? 'opacity-60 pointer-events-none' : ''}`}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-contain"
                  onError={(e) => {
                    e.target.src = '/images/SHOPITEMS.png'
                  }}
                />

                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md flex items-center gap-1">
                  <Image src="/icons/coins-logo.svg" alt="Coins" width={18} height={18} />
                  <span className="text-xs font-medium">{product.coin}</span>
                </div>

                {isOutOfStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span className="text-lg text-white font-bold">{t('outOfStock')}</span>
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-[#2A3547] dark:text-white mb-3 line-clamp-2">
                  {i18n.language === 'uz' ? product.name_uz : product.name_ru}
                </h3>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#2A3447] rounded-lg">
                    <div className="flex items-center gap-2">
                      <Image src="/icons/coins-logo.svg" alt="Coins" width={18} height={18} />
                      <span className="text-sm font-medium">{t('onePiece')}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      {product.coin} {t('coin')}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#2A3447] rounded-lg">
                    <div className="flex items-center gap-2 text-sm font-medium dark:text-gray-100">
                      <FaBoxOpen size={18} color="#eab30a" /> {t('inStock')}
                    </div>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      {isOutOfStock ? '0' : product.count} {t('piece')}
                    </div>
                  </div>
                </div>

                <Button
                  classname={`w-full font-medium rounded-lg py-2 ${
                    isOutOfStock ? 'bg-gray-400 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  disabled={exchangingProduct === product.id || isOutOfStock}
                  onclick={() => handlePurchase(product, 'coins')}
                >
                  {exchangingProduct === product.id ? t('purchasing') : isOutOfStock ? t('outOfStock') : t('buyNow')}
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      <PurchaseSuccessModal
        isOpen={isPurchaseModalOpen}
        onClose={() => {
          setIsPurchaseModalOpen(false)
          setPurchaseModalData(null)
        }}
        purchaseData={purchaseModalData}
      />

      <ConfirmPurchaseModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false)
          setConfirmModalData(null)
        }}
        onConfirm={() => handleConfirmPurchase(confirmModalData?.product)}
        product={confirmModalData?.product}
        paymentType={confirmModalData?.paymentType}
      />
    </div>
  )
}

export default Products
