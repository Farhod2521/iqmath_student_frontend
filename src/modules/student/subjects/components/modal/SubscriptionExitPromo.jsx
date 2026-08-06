import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { motion } from 'framer-motion'
import { Calendar, Check, Sparkles } from 'lucide-react'
import { useGetPlans } from '@/hooks'

const PLANS_URL = '/prices'

const SubscriptionExitPromo = ({ onSkip }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const { data: plansResponse, isLoading } = useGetPlans()
  const plans = get(plansResponse, 'data', []) || []

  const goToPlans = () => {
    router.push(PLANS_URL)
  }

  return (
    <div className="px-[20px] pb-[24px] pt-[16px] sm:px-[24px]">
      <div className="mb-5 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF3FF] px-3 py-1 text-[12px] font-semibold text-[#3758F9]">
          <Sparkles size={14} />
          {t('exitPromoBadge')}
        </span>
        <h2 className="mt-3 text-[20px] font-extrabold leading-tight text-[#1E2A4A] sm:text-[24px]">
          {t('exitPromoTitle')}
        </h2>
        <p className="mt-1 text-[13px] text-[#6B7590]">{t('exitPromoSubtitle')}</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3758F9] border-t-transparent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {plans.slice(0, 3).map((plan, index) => {
            const categoryTitle = get(plan, 'category.title_uz', '')
            const isBest = categoryTitle?.toLowerCase() === 'best value'
            const isPopular = categoryTitle?.toLowerCase() === 'popular'

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.08, duration: 0.35, ease: 'easeOut' }}
                className={`relative flex flex-col rounded-2xl border p-4 ${
                  isBest || isPopular ? 'border-[#3758F9] shadow-lg' : 'border-[#E5E9F5]'
                }`}
              >
                {categoryTitle && (
                  <span
                    className={`absolute -top-2.5 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white ${
                      isBest ? 'bg-gradient-to-r from-orange-500 to-amber-500' : 'bg-[#3758F9]'
                    }`}
                  >
                    {categoryTitle}
                  </span>
                )}

                <h3 className="text-[15px] font-bold text-[#1E2A4A]">{plan.name_uz}</h3>

                <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-[#EEF3FF] px-2.5 py-1 text-[11px] font-semibold text-[#3758F9]">
                  <Calendar size={12} />
                  {plan.months} {t('month')}
                </span>

                <p className="mt-3 text-[18px] font-extrabold text-[#1E2A4A]">
                  {Number(plan.sale_price || 0).toLocaleString()} {t('pricing.currency')}
                </p>

                {plan.discount_percent > 0 && (
                  <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                    -{plan.discount_percent}%
                  </span>
                )}

                <ul className="mt-3 flex-1 space-y-1.5">
                  {plan.benefits
                    ?.filter((b) => b.is_selected)
                    .slice(0, 2)
                    .map((b) => (
                      <li key={b.id} className="flex items-center gap-1.5 text-[11px] text-[#3B4257]">
                        <Check size={12} className="text-emerald-500 shrink-0" />
                        {b.title_uz}
                      </li>
                    ))}
                </ul>

                <button
                  onClick={goToPlans}
                  className={`mt-3 w-full rounded-lg py-2 text-[12px] font-bold text-white transition-transform active:scale-95 ${
                    isBest ? 'bg-gradient-to-r from-[#3758F9] to-[#7C3AED]' : 'bg-[#3758F9]'
                  }`}
                >
                  {t('buy')}
                </button>
              </motion.div>
            )
          })}
        </div>
      )}

      <button
        onClick={onSkip}
        className="mx-auto mt-5 block text-[13px] font-medium text-[#8A93A6] transition-colors hover:text-[#3758F9]"
      >
        {t('maybeLater')}
      </button>
    </div>
  )
}

export default SubscriptionExitPromo
