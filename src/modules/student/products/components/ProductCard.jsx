import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import { formatUzbekDate } from '@/utils/dayjsUzbek'
import StatusBadge from './StatusBadge'
import Image from 'next/image'

const ProductCard = ({ exchange, index }) => {
  const formatDate = (dateString) => {
    return formatUzbekDate(dateString)
  }

  return (
    <div 
      key={index} 
      className="bg-white dark:bg-[#202936] rounded-[10px] shadow-sm border border-[#EAEFF4] dark:border-[#2A3447FF] overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src="/images/SHOPITEMS.png"
          alt={exchange.product_name}
          className="w-full h-48 object-contain"
          onError={(e) => {
            e.target.src = '/images/SHOPITEMS.png'
          }}
        />
        
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
          <Image src="/icons/coins-logo.svg" alt="Coins" width={18} height={18} />
          <span className="text-xs font-medium">
            {exchange.used_coin}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-[#2A3547] dark:text-white">
            {exchange.product_name}
          </h3>
          <StatusBadge status={exchange.status} />
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-[#5A6A85] dark:text-gray-400">
            <FaCalendarAlt size={14} />
            <span>Almashtirilgan: {formatDate(exchange.created_at)}</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-[#F8F9FA] dark:bg-[#2A3447] rounded-lg">
            <div className="flex items-center gap-2">
              <Image src="/icons/coins-logo.svg" alt="Coins" width={18} height={18} />
              <span className="text-sm text-[#2A3547] dark:text-white">
                {exchange.used_coin} tanga
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
