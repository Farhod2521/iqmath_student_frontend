import SearchInput from "@/components/search";
import SelectBox from "@/components/select-box";
import React, { useState } from "react";

function StudentFilter() {
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
    <div className=" flex items-center justify-between py-[16px]">
      <div className=" flex items-center gap-x-[12px]">
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
    </div>
  );
}

export default StudentFilter; 