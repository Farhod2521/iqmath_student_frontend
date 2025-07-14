import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const StatsCards = ({ data }) => {
  const { t } = useTranslation();

  

  const stats = [
    {
      key: "totalTeachers",
      value: data?.total_teachers,
      icon: "/icons/teacher.svg",
      badge: { value: "+2", color: "bg-[#E9F9EC] text-[#13DEB9]" },
    },
    {
      key: "totalStudents",
      value: data?.total_students,
      icon: "/icons/students.svg",
      badge: { value: "+12%", color: "bg-[#E6F4FF] text-[#5D87FF]" },
    },
    {
      key: "studentsDueWithin5Days",
      value: data?.students_due_within_5_days,
      icon: "/icons/hourglass.svg",
      badge: { value: "+1", color: "bg-[#E9F9EC] text-[#13DEB9]" },
    },
    {
      key: "totalPayments",
      value: data?.total_payments,
      icon: "/icons/wallet.svg",
      badge: { value: "+10", color: "bg-[#E9F9EC] text-[#13DEB9]" },
    },
    {
      key: "pendingPayments",
      value: data?.pending_payments,
      icon: "/icons/hourglass.svg",
      badge: { value: "+5", color: "bg-[#E9F9EC] text-[#13DEB9]" },
    },
    {
      key: "successfulPayments",
      value: data?.successful_payments,
      icon: "/icons/checked.svg",
      badge: { value: "+3", color: "bg-[#E9F9EC] text-[#13DEB9]" },
      iconClass: "text-[#13DEB9]"
    },
    {
      key: "failedPayments",
      value: data?.failed_payments,
      icon: "/icons/close.svg",
      badge: { value: "+0", color: "bg-[#E9F9EC] text-[#13DEB9]" },
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.key}
          className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6 flex flex-col justify-between min-h-[140px]"
        >
          <div className="flex items-center gap-4 mb-4">
            <Image 
              src={stat.icon} 
              alt={t(stat.key)} 
              width={28} 
              height={28} 
              className={stat.iconClass || ""}
            />
            <div>
              <p className="text-[#7C8FAC] text-sm font-medium mb-1">{t(stat.key)}</p>
              <h3 className="text-[28px] font-bold text-[#2A3547] dark:text-white leading-8">{stat.value}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className={`text-xs font-semibold px-2 py-1 rounded ${stat.badge.color}`}>{stat.badge.value}</span>
            <span className="text-xs text-[#A3AED0]">{t("thisMonth")}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
