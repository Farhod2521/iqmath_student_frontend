import React from 'react'
import ReactECharts from 'echarts-for-react'
import { useTranslation } from 'react-i18next'

const DONUT_COLORS = ['#5D87FF', '#13DEB9', '#FF8A00', '#8B5CF6', '#EC4899']

const PlansRevenueChart = ({ data }) => {
  const { t } = useTranslation()

  const plans = data?.plans_revenue || []
  const total = plans.reduce((sum, plan) => sum + (plan.revenue || 0), 0)

  const option = {
    tooltip: {
      trigger: 'item',
      valueFormatter: (value) => `${value.toLocaleString()} so'm`
    },
    legend: {
      bottom: 0,
      left: 'center',
      textStyle: { color: '#7C8FAC', fontSize: 12 }
    },
    color: DONUT_COLORS,
    series: [
      {
        name: t('plansRevenue'),
        type: 'pie',
        radius: ['55%', '75%'],
        center: ['50%', '42%'],
        avoidLabelOverlap: false,
        itemStyle: { borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 700, color: '#2A3547' }
        },
        data: plans.map((plan) => ({ name: plan.plan, value: plan.revenue }))
      }
    ]
  }

  return (
    <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-[#2A3547] dark:text-white">{t('plansRevenue')}</h3>
        <span className="text-sm font-semibold text-[#5D87FF]">{total.toLocaleString()} so'm</span>
      </div>
      {plans.length > 0 ? (
        <ReactECharts option={option} style={{ height: '260px' }} />
      ) : (
        <div className="flex h-[260px] items-center justify-center text-sm text-[#7C8FAC]">{t('noData')}</div>
      )}
    </div>
  )
}

export default PlansRevenueChart
