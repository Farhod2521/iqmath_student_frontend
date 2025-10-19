import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import useGetQuery from '@/hooks/api/useGetQuery'
import { useMutation } from '@tanstack/react-query'
import { request } from '@/services/api'
import Button from '@/components/button'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useScoreStore } from '@/store'
import { config } from '@/config'
import PurchaseSuccessModal from '../components/PurchaseSuccessModal'
import ConfirmPurchaseModal from '../components/ConfirmPurchaseModal'

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
      const errorMessage = error?.response?.data?.error_uz || t('purchaseError')
      toast.error(errorMessage)
      setExchangingProduct(null)
    }
  })

  const handlePurchase = (product, paymentType = 'coins') => {
    setConfirmModalData({ product, paymentType })
    setIsConfirmModalOpen(true)
  }

  const handleConfirmPurchase = (product) => {
    setExchangingProduct(product.id)
    exchangeProduct({ productId: product.id })
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-[#202936] rounded-[10px] shadow-sm border border-[#EAEFF4] dark:border-[#2A3447FF] p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5D87FF] mx-auto mb-4"></div>
            <p className="text-[#5A6A85] dark:text-white">Mahsulotlar yuklanmoqda...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-[#202936] rounded-[10px] shadow-sm border border-[#EAEFF4] dark:border-[#2A3447FF] p-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-semibold mb-2 text-[#2A3547] dark:text-white">Xatolik yuz berdi</h2>
            <p className="text-[#5A6A85] dark:text-gray-400">Mahsulotlarni yuklashda muammo yuz berdi</p>
          </div>
        </div>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-[#202936] rounded-[10px] shadow-sm border border-[#EAEFF4] dark:border-[#2A3447FF] p-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-2xl font-semibold mb-2 text-[#2A3547] dark:text-white">{t('noProductsAvailable')}</h2>
            <p className="text-[#5A6A85] dark:text-gray-400">Hozircha mahsulotlar mavjud emas</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.data.map((product) => (
          <div
            key={product.id}
            className="bg-white opacity-80 dark:bg-[#202936] rounded-[10px] shadow-sm border border-[#EAEFF4] dark:border-[#2A3447FF] overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            {/* Mahsulot rasmi */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain"
                onError={(e) => {
                  e.target.src = '/images/SHOPITEMS.png'
                }}
              />

              <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                <Image src="/icons/coins-logo.svg" alt="Coins" width={18} height={18} />
                <span className="text-xs font-medium">{product.coin}</span>
              </div>
              <div className="absolute inset-0 bg-[#1C1E2699] bg-opacity-50 flex items-center justify-center">
                <span className="text-lg text-white font-bold">Tez kunda</span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-3 text-[#2A3547] dark:text-white">
                {i18n.language === 'uz' ? product.name_uz : product.name_ru}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between p-2 bg-[#F8F9FA] dark:bg-[#2A3447] rounded-lg">
                  <div className="flex items-center gap-2">
                    <Image src="/icons/coins-logo.svg" alt="Coins" width={18} height={18} />
                    <span className="text-sm text-[#2A3547] dark:text-white">
                      {product.coin} {t('coin')}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                // classname="w-full hover:bg-[#4463bb] hover:text-white"
                classname="w-full "
                disabled={exchangingProduct === product.id || true}
                onclick={() => handlePurchase(product, 'coins')}
              >
                {exchangingProduct === product.id ? t('purchasing') : t('buyNow')}
              </Button>
            </div>
          </div>
        ))}
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
