import React from 'react'
import ReactECharts from 'echarts-for-react'
import { useTranslation } from 'react-i18next'

const RevenueSummary = ({ data }) => {
  const { t } = useTranslation()

  const rows = [
    { label: t('totalRevenue'), amount: data?.total_amount || 0 },
    { label: t('lastMonthRevenue'), amount: data?.last_month_amount || 0 },
    { label: t('year2025Revenue'), amount: data?.year_2025 || 0 }
  ]

  const option = {
    grid: { left: 8, right: 16, top: 16, bottom: 8, containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      valueFormatter: (value) => `${value.toLocaleString()} so'm`
    },
    xAxis: {
      type: 'value',
      axisLabel: { formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value) }
    },
    yAxis: {
      type: 'category',
      data: rows.map((row) => row.label),
      axisTick: { show: false }
    },
    series: [
      {
        type: 'bar',
        data: rows.map((row) => row.amount),
        barWidth: 26,
        itemStyle: { color: '#5D87FF', borderRadius: [0, 6, 6, 0] },
        label: {
          show: true,
          position: 'right',
          formatter: (params) => `${params.value.toLocaleString()} so'm`,
          color: '#2A3547',
          fontWeight: 600
        }
      }
    ]
  }

  return (
    <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6">
      <h3 className="text-lg font-semibold text-[#2A3547] dark:text-white mb-2">{t('revenueReport')}</h3>
      <ReactECharts option={option} style={{ height: '260px' }} />
    </div>
  )
}

export default RevenueSummary
