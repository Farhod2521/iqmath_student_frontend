import React from "react";
import { useTranslation } from "react-i18next";

const RevenueSummary = ({ data }) => {
  const { t } = useTranslation();

  const revenueData = [
    {
      title: t("totalRevenue"),
      amount: data?.total_amount || 0,
      color: "text-[#13DEB9]",
      bgColor: "bg-[#E9F9EC]",
      icon: "💰"
    },
    {
      title: t("lastMonthRevenue"), 
      amount: data?.last_month_amount || 0,
      color: "text-[#5D87FF]",
      bgColor: "bg-[#E6F4FF]",
      icon: "📅"
    },
    {
      title: t("year2025Revenue"),
      amount: data?.year_2025 || 0,
      color: "text-[#FF8A00]",
      bgColor: "bg-[#FFF2E6]",
      icon: "📊"
    }
  ];

  return (
    <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6">
      <h3 className="text-lg font-semibold text-[#2A3547] dark:text-white mb-6">
        {t("revenueReport")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {revenueData.map((item, index) => (
          <div key={index} className="text-center p-4 rounded-lg border border-[#E9E9E9] dark:border-[#232D3A]">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${item.bgColor} mb-3`}>
              <span className="text-2xl">{item.icon}</span>
            </div>
            <h4 className="text-sm font-medium text-[#7C8FAC] mb-2">{item.title}</h4>
            <p className={`text-xl font-bold ${item.color}`}>
              {item.amount.toLocaleString()} so'm
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueSummary;
