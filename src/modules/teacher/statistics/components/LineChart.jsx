import React from "react";
import ReactECharts from "echarts-for-react";
import { useTranslation } from "react-i18next";

const LineChart = () => {
  const { t } = useTranslation();
  const option = {
    title: { text: t("monthlyGrowth"), left: "left" },
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: [t("jan"), t("feb"), t("mar"), t("apr"), t("may"), t("jun")] },
    yAxis: { type: "value" },
    series: [{ name: t("totalStudents"), type: "line", data: [100, 120, 130, 140, 145, 150] }],
  };
  return (
    <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6 flex flex-col justify-between min-h-[140px]">
      <ReactECharts option={option} style={{ height: "300px" }} />
    </div>
  );
};

export default LineChart;
