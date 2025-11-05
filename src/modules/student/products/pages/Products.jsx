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

  const { data: products, isLoading, error } = useGetQuery({ key: KEYS.products, url: URLS.products })

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
      const errorMessage = error?.response?.data?.error_uz || t('purchaseError') || 'Xato yuz berdi'
      toast.error(errorMessage)
      setExchangingProduct(null)
    }
  })

  const handlePurchase = (product, paymentType = 'coins') => {
    // Stok tekshiruvi — agar count 0 bo'lsa modalga o'tmaydi
    if (!product || product.count === 0) {
      const msg = t('outOfStock') || "Mahsulot stokda yo'q"
      toast.error(msg)
      return
    }
    setConfirmModalData({ product, paymentType })
    setIsConfirmModalOpen(true)
  }

  const handleConfirmPurchase = (product) => {
    if (!product || product.count === 0) {
      const msg = t('outOfStock') || "Mahsulot stokda yo'q"
      toast.error(msg)
      return
    }
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

  // products strukturasiga qarab tekshirish: odatda API { data: [...] }
  const productList = products?.data || []

  if (!productList || productList.length === 0) {
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
        {productList.map((product) => {
          const isOutOfStock = product.count === 0
          return (
            <div
              key={product.id}
              className={`relative bg-white dark:bg-[#202936] rounded-[10px] shadow-sm border border-[#EAEFF4] dark:border-[#2A3447FF] overflow-hidden hover:shadow-md transition-shadow duration-300
                ${isOutOfStock ? 'opacity-60 pointer-events-none' : ''}`}
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

                {isOutOfStock ? (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span className="text-lg text-white font-bold">Sotuvda yo'q</span>
                  </div>
                ) : null}
              </div>

              <div className="p-4 flex flex-col justify-between">
                {/* Mahsulot nomi */}
                <h3 className="text-lg font-semibold text-[#2A3547] dark:text-white mb-3 line-clamp-2 leading-snug">
                  {i18n.language === 'uz' ? product.name_uz : product.name_ru}
                </h3>

                {/* Mahsulot ma'lumotlari */}
                <div className="space-y-3 mb-5">
                  {/* Narx / Coin */}
                  <div className="flex items-center justify-between p-3 bg-[#F8F9FA] dark:bg-[#2A3447] rounded-lg hover:bg-[#EEF1F4] dark:hover:bg-[#2E3A50] transition-colors duration-200">
                    <div className="flex items-center gap-2">
                      <Image src="/icons/coins-logo.svg" alt="Coins" width={18} height={18} />
                      <span className="text-sm font-medium text-[#2A3547] dark:text-gray-100">1 dona</span>
                    </div>
                    <div className="text-sm font-semibold text-[#5A6A85] dark:text-gray-300">
                      {product.coin} {t('coin')}
                    </div>
                  </div>

                  {/* Ombordagi miqdor */}
                  <div className="flex items-center justify-between p-3 bg-[#F8F9FA] dark:bg-[#2A3447] rounded-lg hover:bg-[#EEF1F4] dark:hover:bg-[#2E3A50] transition-colors duration-200">
                    <div className="flex items-center gap-2 text-sm font-medium text-[#2A3547] gap-2 dark:text-gray-100">
                      <span>🏷</span> Omborda
                    </div>
                    <div className="text-sm font-semibold text-[#5A6A85] dark:text-gray-300">
                      {isOutOfStock ? <span className="">0 ta</span> : <span className="">{product.count} ta</span>}
                    </div>
                  </div>
                </div>

                {/* Tugma */}
                <Button
                  classname={`w-full font-medium rounded-lg py-2 transition-all duration-300 ${
                    isOutOfStock
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm hover:shadow-md'
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
