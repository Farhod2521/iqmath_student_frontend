import React from 'react'
import StatsCards from './components/StatsCards'
import PlansRevenueChart from './components/PlansRevenueChart'
import MonthlySubscriptionsChart from './components/MonthlySubscriptionsChart'
import RevenueSummary from './components/RevenueSummary'
import StatisticsHero from './components/StatisticsHero'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useTranslation } from 'react-i18next'
import MentorClosedChatsStats from './components/MentorClosedChatsStats'

const Statistics = () => {
  const { t } = useTranslation()
  const {
    data: statisticsData,
    isLoading,
    isError
  } = useGetQuery({
    key: KEYS.statistics,
    url: URLS.statistics
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (isError) {
    return <div className="flex items-center justify-center h-screen">Sahifani qayta yuklang!</div>
  }

  return (
    <div className="font-sf">
      <StatisticsHero />

      <StatsCards data={statisticsData?.data} isLoading={isLoading} />
      <div className="mb-8">
        <MentorClosedChatsStats />
      </div>

      <div className="grid grid-cols-1 gap-8 mb-8 xl:grid-cols-2">
        <RevenueSummary data={statisticsData?.data} />
        <PlansRevenueChart data={statisticsData?.data} />
      </div>

      <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
        <MonthlySubscriptionsChart data={statisticsData?.data} />
        <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[#2A3547] dark:text-white mb-4">{t('cashbackReport')}</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-[#E9F9EC] rounded-lg">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg">🎓</span>
                <div>
                  <p className="text-sm text-[#7C8FAC]">{t('studentCashbackAmount')}</p>
                  <p className="text-lg font-bold text-[#13DEB9]">
                    {statisticsData?.data?.total_student_cashback?.toLocaleString() || 0} so'm
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-[#E6F4FF] rounded-lg">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg">
                  👨‍🏫
                </span>
                <div>
                  <p className="text-sm text-[#7C8FAC]">{t('teacherCashbackAmount')}</p>
                  <p className="text-lg font-bold text-[#5D87FF]">
                    {statisticsData?.data?.total_teacher_cashback?.toLocaleString() || 0} so'm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
