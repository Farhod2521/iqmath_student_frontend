import React from "react";
import ReactECharts from "echarts-for-react";
import { useTranslation } from "react-i18next";

const BarChart = () => {
  const { t } = useTranslation();
  const option = {
    title: { text: t("statisticsOverview"), left: "left" },
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: [t("totalStudents"), t("completedLessons"), t("completionRate")] },
    yAxis: { type: "value" },
    series: [{ name: t("value"), type: "bar", data: [150, 450, 78] }],
  };
  return (
    <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6 flex flex-col justify-between min-h-[140px]">
      <ReactECharts option={option} style={{ height: "300px" }} />
    </div>
  );
};

export default BarChart;
