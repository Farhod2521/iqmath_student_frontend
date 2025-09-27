import React from "react";
import StatsCards from "./components/StatsCards";
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
    
      
      {/* <Filters /> */}
      <StatsCards data={statisticsData?.data} isLoading={isLoading} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* <BarChart /> */}
        {/* <LineChart /> */}
        {/* <PieChart /> */}
        {/* <HeatmapChart /> */}
      </div>
      {/* <ProgressBlock /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* <Leaderboard /> */}
        {/* <RecentActivity /> */}
      </div>
    </div>
  );
};

export default Statistics;
