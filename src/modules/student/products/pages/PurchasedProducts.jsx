import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaCheckCircle, FaCalendarAlt, FaCoins } from 'react-icons/fa'

const PurchasedProducts = () => {
  const { t } = useTranslation()

  const purchasedProducts = [
  
  ]



  const getPaymentMethodText = (method) => {
    return method === 'money' ? 'Pul bilan' : 'Ballar bilan'
  }

  if (purchasedProducts.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-[#202936] rounded-[10px] dark:border-[#2A3447FF] p-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold mb-2 text-[#2A3547] dark:text-white">{t('purchasedProducts')}</h2>
            <p className="text-[#5A6A85] dark:text-gray-400">
              Hali hech qanday mahsulot sotib olmagansiz
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {purchasedProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white dark:bg-[#202936] rounded-[10px] dark:border-[#2A3447FF] overflow-hidden"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = '/images/placeholder-product.png'
                }}
              />
            
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-3 text-[#2A3547] dark:text-white">
                {product.name}
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-[#5A6A85] dark:text-gray-400">
                  <FaCalendarAlt size={14} />
                  <span>Sotib olingan: {product.purchasedAt}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#5A6A85] dark:text-gray-400">
                  <FaCheckCircle size={14} />
                  <span>{getPaymentMethodText(product.paymentMethod)}</span>
                </div>

                <div className="flex items-center gap-2 p-3 bg-[#F8F9FA] dark:bg-[#2A3447] rounded-lg">
                  <FaCoins className="text-[#5D87FF]" size={16} />
                  <div>
                    <div className="text-lg font-bold text-[#2A3547] dark:text-white">
                      {product.price}
                    </div>
                    <div className="text-xs text-[#5A6A85] dark:text-gray-400">
                      {product.paymentMethod === 'money' ? 'USD' : 'ball'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PurchasedProducts
