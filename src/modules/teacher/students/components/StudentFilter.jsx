import SearchInput from "@/components/search";
import SelectBox from "@/components/select-box";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";


function StudentFilter({ studentsData = [], onExportAll, isExportingAll = false }) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [classValue, setClassValue] = useState("");
  const [statusValue, setStatusValue] = useState("");

  const classOptions = [
    { value: "a", label: "A" },
    { value: "b", label: "B" },
    { value: "c", label: "C" },
  ];

  const statusOptions = [
    { value: "active", label: "Faol" },
    { value: "inactive", label: "Nofaol" },
  ];



  return (
    <div className="flex items-center justify-between py-[16px]">
      <div className="flex items-center gap-x-[12px]">
        <SearchInput placeholder="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} className="w-80" />
        <SelectBox
          label="Класс"
          options={classOptions}
          value={classValue}
          onChange={(e) => setClassValue(e.target.value)}
          className="w-40"
        />
        <SelectBox
          label="Статус"
          options={statusOptions}
          value={statusValue}
          onChange={(e) => setStatusValue(e.target.value)}
          className="w-40"
        />
      </div>
      
      <div className="flex items-center gap-x-[12px]">
        {/* Excel export tugmasi */}
        <button
          onClick={onExportAll}
          disabled={isExportingAll}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-md"
        >
          {isExportingAll ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Export...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('excelExport')}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default StudentFilter; 