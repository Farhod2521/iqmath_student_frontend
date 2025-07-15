import React from "react";
import { useTranslation } from "react-i18next";

const leaderboard = [
  { name: "Ali Valiyev", score: 98, group: "A-1" },
  { name: "Dilshod Karimov", score: 95, group: "B-2" },
  { name: "Zarina Akhmedova", score: 93, group: "A-1" },
  { name: "Kamola Rustamova", score: 91, group: "C-3" },
  { name: "Jasur Usmonov", score: 90, group: "B-2" },
];

const Leaderboard = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-[#202936] border border-[#E9E9E9] dark:border-[#232D3A] rounded-[12px] shadow-sm p-6 flex flex-col justify-between min-h-[140px]">
      <h2 className="text-lg font-semibold mb-4">{t("leaderboard")}</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="py-2">#</th>
            <th className="py-2">{t("name")}</th>
            <th className="py-2">{t("group")}</th>
            <th className="py-2">{t("score")}</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((item, idx) => (
            <tr key={item.name} className="border-b border-[#E9E9E9]">
              <td className="py-2">{idx + 1}</td>
              <td className="py-2">{item.name}</td>
              <td className="py-2">{item.group}</td>
              <td className="py-2">{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
