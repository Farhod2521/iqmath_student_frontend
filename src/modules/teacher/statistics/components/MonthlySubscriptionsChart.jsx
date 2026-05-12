import React from 'react'
import { useTranslation } from 'react-i18next'

const MonthlySubscriptionsChart = ({ data }) => {
  const { t } = useTranslation()

  const monthNames = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentabr',
    'Oktabr',
    'Noyabr',
    'Dekabr'
  ]

  const maxCount = Math.max(...data.monthly_subscriptions?.map((sub) => sub.count))

  return (
    <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6">
      <h3 className="text-lg font-semibold text-[#2A3547] dark:text-white mb-4">{t('monthlySubscriptions')}</h3>
      <div className="space-y-4">
        {data.monthly_subscriptions?.map((subscription, index) => {
          const percentage = maxCount > 0 ? (subscription.count / maxCount) * 100 : 0
          const monthName = monthNames[subscription.month - 1] || `Oy ${subscription.month}`

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#2A3547] dark:text-white">{monthName}</span>
                <span className="text-sm font-semibold text-[#13DEB9]">{subscription.count} ta</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-[#2A3547] rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-[#13DEB9] transition-all duration-500"
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

export default MonthlySubscriptionsChart
