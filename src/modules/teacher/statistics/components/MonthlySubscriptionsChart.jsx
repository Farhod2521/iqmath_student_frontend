import React from 'react'
import ReactECharts from 'echarts-for-react'
import { useTranslation } from 'react-i18next'

const MonthlySubscriptionsChart = ({ data }) => {
  const { t } = useTranslation()

  const monthNames = [
    'Yan',
    'Fev',
    'Mar',
    'Apr',
    'May',
    'Iyun',
    'Iyul',
    'Avg',
    'Sen',
    'Okt',
    'Noy',
    'Dek'
  ]

  const subscriptions = data?.monthly_subscriptions || []

  const option = {
    grid: { left: 8, right: 16, top: 24, bottom: 8, containLabel: true },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'category',
      data: subscriptions.map((sub) => monthNames[sub.month - 1] || `${sub.month}`),
      axisTick: { show: false },
      axisLine: { lineStyle: { color: '#E9E9E9' } }
    },
    yAxis: { type: 'value', splitLine: { lineStyle: { color: '#F0F0F0' } } },
    series: [
      {
        type: 'bar',
        data: subscriptions.map((sub) => sub.count),
        barWidth: '55%',
        itemStyle: { color: '#13DEB9', borderRadius: [6, 6, 0, 0] }
      }
    ]
  }

  return (
    <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6">
      <h3 className="text-lg font-semibold text-[#2A3547] dark:text-white mb-2">{t('monthlySubscriptions')}</h3>
      {subscriptions.length > 0 ? (
        <ReactECharts option={option} style={{ height: '260px' }} />
      ) : (
        <div className="flex h-[260px] items-center justify-center text-sm text-[#7C8FAC]">{t('noData')}</div>
      )}
    </div>
  )
}

export default MonthlySubscriptionsChart
