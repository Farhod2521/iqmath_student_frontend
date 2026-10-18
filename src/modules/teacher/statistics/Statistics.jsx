import React from 'react'
import StatsCards from './components/StatsCards'
import StatisticsHero from './components/StatisticsHero'
import SiteStatistics from '@/modules/teacher/site-statistics/SiteStatistics'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'

const Statistics = () => {
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

      {/* Sayt statistikasi (avval alohida sahifa edi) — kartalar ostida */}
      <div className="mt-10">
        <SiteStatistics />
      </div>
    </div>
  )
}

export default Statistics
