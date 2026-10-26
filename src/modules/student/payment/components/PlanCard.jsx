import React from 'react'
import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import { formatMoney } from '@/utils/formatMoney'

const PlanCard = ({ plan, isSelected, onSelect }) => {
  const { t } = useTranslation()
  // O1: kartada tarif tarkibi (faqat kiritilgan imkoniyatlar) va oylik narx ko'rinsin
  const included = (plan.benefits || []).filter((b) => b.isSelected && b.title)
  const perMonth = plan.price_per_month || (plan.months ? plan.price / plan.months : null)
  return (
    <div
      className={`relative bg-white dark:bg-[#202936] rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
        isSelected ? 'border-[#5D87FF] shadow-lg' : 'border-[#EAEFF4] dark:border-[#2A3447] hover:border-[#5D87FF]/50'
      }`}
      onClick={() => onSelect(plan)}
    >
      <div className="p-4">
        {/* Plan Header */}
        <div className="mb-4 text-center">
          <h3 className="text-lg font-bold text-[#2A3547] dark:text-white mb-1">{plan.name}</h3>
        </div>

        {/* Price */}
        <div className="mb-4 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="text-2xl font-bold text-[#2A3547] dark:text-white">{formatMoney(plan.price)}</span>
            <span className="text-sm text-[#5A6A85] dark:text-gray-400">{t('sum')}</span>
          </div>
          {plan.months > 1 && perMonth ? (
            <p className="mb-1 text-xs font-medium text-[#2F5FD0]">
              {formatMoney(perMonth)} {t('sum')} / {t('perMonthShort')}
            </p>
          ) : null}
          {plan.discount > 0 && (
            <div className="flex items-center justify-center gap-1">
              <span className="text-xs text-[#5A6A85] dark:text-gray-400 line-through">
                {formatMoney(plan.originalPrice)}
              </span>
              <span className="bg-[#13DEB9] text-white px-1.5 py-0.5 rounded-full text-xs font-semibold">
                -{plan.discount}%
              </span>
            </div>
          )}
        </div>

        {/* Tarif tarkibi */}
        {included.length > 0 && (
          <ul className="space-y-1">
            {included.map((benefit) => (
              <li key={benefit.id} className="flex items-start gap-1.5 text-xs text-[#5A6A85] dark:text-gray-400">
                <Check size={14} className="mt-px shrink-0 text-[#13DEB9]" />
                {benefit.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PlanCard
