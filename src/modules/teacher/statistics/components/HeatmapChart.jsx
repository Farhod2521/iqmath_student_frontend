import React from "react";
import ReactECharts from "echarts-for-react";
import { useTranslation } from "react-i18next";

const hours = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

// Har bir kun va har bir soat uchun random yoki static qiymatlar
const heatmapData = [];
for (let day = 0; day < days.length; day++) {
  for (let hour = 0; hour < hours.length; hour++) {
    // Static yoki random qiymat (masalan, 0-10 oralig'ida)
    heatmapData.push([day, hour, Math.floor(Math.random() * 11)]);
  }
}

const HeatmapChart = () => {
  const { t } = useTranslation();
  const option = {
    title: { text: t("activityHeatmap"), left: "left" },
    tooltip: {
      position: "top",
      formatter: (params) =>
        `${t("activity")}: <b>${params.value[2]}</b><br/>${t(days[params.value[0]])}, ${hours[params.value[1]]}`,
    },
    grid: {
      left: 60,
      right: 20,
      top: 60,
      bottom: 60, // pastdan joy qoldiramiz
    },
    xAxis: {
      type: "category",
      data: days.map((d) => t(d)),
      splitArea: { show: true },
      axisLabel: { fontSize: 14 },
    },
    yAxis: {
      type: "category",
      data: hours,
      splitArea: { show: true },
      axisLabel: { fontSize: 14 },
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: "vertical",
      right: 10,
      top: "center",
      inRange: { color: ["#f5e6e8", "#f7b267", "#f4845f", "#e05d5d"] },
      textStyle: { fontSize: 12 },
    },
    series: [
      {
        name: t("activity"),
        type: "heatmap",
        data: heatmapData,
        label: { show: false },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.5)" } },
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6 flex flex-col justify-between min-h-[140px]">
      <ReactECharts option={option} style={{ height: "350px" }} />
    </div>
  );
};

export default HeatmapChart;
