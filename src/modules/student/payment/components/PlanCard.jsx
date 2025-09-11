import React from 'react'
import Button from '@/components/button'

const PlanCard = ({ 
  plan, 
  isSelected, 
  onSelect 
}) => {
  return (
    <div
      className={`relative bg-white dark:bg-[#202936] rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
        isSelected
          ? 'border-[#5D87FF] shadow-lg'
          : 'border-[#EAEFF4] dark:border-[#2A3447] hover:border-[#5D87FF]/50'
      }`}
      onClick={() => onSelect(plan)}
    >
      <div className="p-6">
        {/* Plan Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-[#2A3547] dark:text-white mb-2">
            {plan.name}
          </h3>
       
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl font-bold text-[#2A3547] dark:text-white">
              {plan.price.toLocaleString()}
            </span>
            <span className="text-[#5A6A85] dark:text-gray-400">so'm</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-[#5A6A85] dark:text-gray-400 line-through">
              {plan.originalPrice.toLocaleString()}
            </span>
            <span className="bg-[#13DEB9] text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{plan.discount}%
            </span>
          </div>
        </div>

    
      </div>
    </div>
  )
}

export default PlanCard
