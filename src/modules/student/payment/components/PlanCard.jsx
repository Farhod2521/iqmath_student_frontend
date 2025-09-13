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
      <div className="p-4">
        {/* Plan Header */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-[#2A3547] dark:text-white mb-1">
            {plan.name}
          </h3>
        </div>

        {/* Price */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="text-2xl font-bold text-[#2A3547] dark:text-white">
              {plan.price.toLocaleString()}
            </span>
            <span className="text-sm text-[#5A6A85] dark:text-gray-400">so'm</span>
          </div>
          {plan.discount > 0 && (
            <div className="flex items-center justify-center gap-1">
              <span className="text-xs text-[#5A6A85] dark:text-gray-400 line-through">
                {plan.originalPrice.toLocaleString()}
              </span>
              <span className="bg-[#13DEB9] text-white px-1.5 py-0.5 rounded-full text-xs font-semibold">
                -{plan.discount}%
              </span>
            </div>
          )}
        </div>

        {/* Features */}
        {plan.features && plan.features.length > 0 && (
          <div className="mb-4">
            <ul className="space-y-1">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-1.5 text-xs text-[#5A6A85] dark:text-gray-400">
                  <div className="w-1 h-1 bg-[#5D87FF] rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  )
}

export default PlanCard
