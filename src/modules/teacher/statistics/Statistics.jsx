import React from "react";
import StatsCards from "./components/StatsCards";
import PlansRevenueChart from "./components/PlansRevenueChart";
import MonthlySubscriptionsChart from "./components/MonthlySubscriptionsChart";
import RevenueSummary from "./components/RevenueSummary";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { useTranslation } from "react-i18next";

const Statistics = () => {
  const { t } = useTranslation();
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen">Sahifani qayta yuklang!</div>
  }

  return (
    <div className="p-6 md:p-8 font-sf">
     
      
      <StatsCards data={statisticsData?.data} isLoading={isLoading} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <RevenueSummary data={statisticsData?.data} />
        <PlansRevenueChart data={statisticsData?.data} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <MonthlySubscriptionsChart data={statisticsData?.data} />
        <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[#2A3547] dark:text-white mb-4">
            {t("cashbackReport")}
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-[#E9F9EC] rounded-lg">
              <div>
                <p className="text-sm text-[#7C8FAC]">{t("studentCashbackAmount")}</p>
                <p className="text-lg font-bold text-[#13DEB9]">
                  {statisticsData?.data?.total_student_cashback?.toLocaleString() || 0} so'm
                </p>
              </div>
              <span className="text-2xl">🎓</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-[#E6F4FF] rounded-lg">
              <div>
                <p className="text-sm text-[#7C8FAC]">{t("teacherCashbackAmount")}</p>
                <p className="text-lg font-bold text-[#5D87FF]">
                  {statisticsData?.data?.total_teacher_cashback?.toLocaleString() || 0} so'm
                </p>
              </div>
              <span className="text-2xl">👨‍🏫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
