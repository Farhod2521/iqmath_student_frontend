import React from 'react'
import { useTranslation } from 'react-i18next'

const PlansRevenueChart = ({ data }) => {
  const { t } = useTranslation()

  const maxRevenue = Math.max(...data.plans_revenue?.map((plan) => plan.revenue))

  return (
    <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6">
      <h3 className="text-lg font-semibold text-[#2A3547] dark:text-white mb-4">{t('plansRevenue')}</h3>
      <div className="space-y-4">
        {data.plans_revenue?.map((plan, index) => {
          const percentage = maxRevenue > 0 ? (plan.revenue / maxRevenue) * 100 : 0
          const colors = ['bg-[#5D87FF]', 'bg-[#13DEB9]', 'bg-[#FF8A00]', 'bg-[#8B5CF6]']

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#2A3547] dark:text-white">{plan.plan}</span>
                <span className="text-sm font-semibold text-[#5D87FF]">{plan.revenue.toLocaleString()} so'm</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-[#2A3547] rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlansRevenueChart
