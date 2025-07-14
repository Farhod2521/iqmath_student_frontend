import React from "react";
import ReactECharts from "echarts-for-react";
import { useTranslation } from "react-i18next";

const PieChart = () => {
  const { t } = useTranslation();
  const pieData = [
    { value: 60, name: t("Faol") },
    { value: 30, name: t("Passiv") },
    { value: 10, name: t("Yangi") },
  ];
  const option = {
    title: { text: t("segmentation"), left: "left", top: 0 },
    tooltip: { trigger: "item" },
    legend: { orient: "vertical", left: "right", top: 20 },
    series: [
      {
        name: t("studentSegment"),
        type: "pie",
        radius: "50%",
        data: pieData,
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: "rgba(0, 0, 0, 0.5)" },
        },
      },
    ],
  };
  return (
    <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6 flex flex-col justify-between min-h-[140px]">
      <ReactECharts option={option} style={{ height: "300px" }} />
    </div>
  );
};

export default PieChart;
