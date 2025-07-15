// @jsxImportSource react
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Filters = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // You can lift state up or use context for global filter/search

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
      <input
        type="text"
        placeholder={t("searchByName")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-[#E9E9E9] rounded px-4 py-2 w-full md:w-64"
      />
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-[#E9E9E9] rounded px-4 py-2">
        <option value="all">{t("all")}</option>
        <option value="A-1">A-1</option>
        <option value="B-2">B-2</option>
        <option value="C-3">C-3</option>
      </select>
      <button className="bg-[#5D87FF] text-white px-4 py-2 rounded">{t("exportExcel")}</button>
    </div>
  );
};

export default Filters;
