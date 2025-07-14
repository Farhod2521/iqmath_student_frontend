import React from "react";
import Filters from "./components/Filters";
import StatsCards from "./components/StatsCards";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import HeatmapChart from "./components/HeatmapChart";
import ProgressBlock from "./components/ProgressBlock";
import Leaderboard from "./components/Leaderboard";
import RecentActivity from "./components/RecentActivity";
import BarChart from "./components/BarChart";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { useTranslation } from "react-i18next";

const Statistics = () => {
  const { t } = useTranslation();
  const { data: statisticsData, isLoading } = useGetQuery({
    key: KEYS.statistics,
    url: URLS.statistics,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 font-sf">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('statistics')}</h1>
        <p className="text-gray-600 mt-2">{t('statisticsDescription', 'Platforma statistikasi va tahlillar')}</p>
      </div>
      
      <Filters />
      <StatsCards data={statisticsData?.data} isLoading={isLoading} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <BarChart />
        <LineChart />
        <PieChart />
        <HeatmapChart />
      </div>
      <ProgressBlock />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Leaderboard />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Statistics;
