import SearchInput from "@/components/search";
import SelectBox from "@/components/select-box";
import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { useTranslation } from "react-i18next";
import StudentRewardHistory from "./StudentRewardHistory";
import { debounce } from "lodash";
import { URLS } from "@/constants/url";

const StudentFilter = memo(({ 
  onFilterChange,
  isExportingAll = false,
  onExportStart,
  onExportEnd,
  studentsData = []
}) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [classValue, setClassValue] = useState(""); // Default: "Hammasi" (empty value)
  const [subjectValue, setSubjectValue] = useState(""); // Default: "Hammasi" (empty value)
  const [statusValue, setStatusValue] = useState("");
  const [roleValue, setRoleValue] = useState(""); // Default: "Hammasi"
  const [isRewardHistoryOpen, setIsRewardHistoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Debounce funksiyasini ref bilan saqlaymiz
  const debouncedSearchRef = useRef(null);

  // Sinf raqamlari (5-11)
  const classOptions = [
    { value: "", label: "Hammasi" },
    { value: "5", label: "5-sinf" },
    { value: "6", label: "6-sinf" },
    { value: "7", label: "7-sinf" },
    { value: "8", label: "8-sinf" },
    { value: "9", label: "9-sinf" },
    { value: "10", label: "10-sinf" },
    { value: "11", label: "11-sinf" },
  ];

  // Fanlar ro'yxati
  const subjectOptions = [
    { value: "", label: "Hammasi" },
    { value: "Algebra", label: "Algebra" },
    { value: "Matematika", label: "Matematika" },
    { value: "Geometriya", label: "Geometriya" },
  ];

  const statusOptions = [
    { value: "active", label: "Faol" },
    { value: "inactive", label: "Nofaol" },
  ];

  // Role options
  const roleOptions = [
    { value: "", label: "Hammasi" },
    { value: "student", label: "O'quvchi" },
    { value: "teacher", label: "O'qituvchi" },
    { value: "parent", label: "Ota-ona" },
    { value: "tutor", label: "Tutor" },
  ];

  // Debounced search function - faqat bir marta yaratiladi
  useEffect(() => {
    debouncedSearchRef.current = debounce((searchTerm, classVal, subjectVal, statusVal, roleVal) => {
      const filterData = {
        search: searchTerm,
        class_num: classVal,
        subject_name: subjectVal, // subject_name parametri sifatida yuboramiz
        status: statusVal,
        role: roleVal
      };
      onFilterChange(filterData);
      setIsLoading(false);
    }, 500);

    return () => {
      if (debouncedSearchRef.current) {
        debouncedSearchRef.current.cancel();
      }
    };
  }, [onFilterChange]);

  // Search input o'zgarishini kuzatish - focus'ni buzmaslik uchun
  const handleSearchChange = useCallback((e) => {
    const newValue = e.target.value;
    setSearch(newValue);
    setIsLoading(true);
    
    if (debouncedSearchRef.current) {
      debouncedSearchRef.current(newValue, classValue, subjectValue, statusValue, roleValue);
    }
  }, [classValue, subjectValue, statusValue, roleValue]);

  // Class o'zgarishini kuzatish
  const handleClassChange = useCallback((e) => {
    const newValue = e.target.value;
    setClassValue(newValue);
    setIsLoading(true);
    
    if (debouncedSearchRef.current) {
      debouncedSearchRef.current(search, newValue, subjectValue, statusValue, roleValue);
    }
  }, [search, subjectValue, statusValue, roleValue]);

  // Subject o'zgarishini kuzatish
  const handleSubjectChange = useCallback((e) => {
    const newValue = e.target.value;
    setSubjectValue(newValue);
    setIsLoading(true);
    
    if (debouncedSearchRef.current) {
      debouncedSearchRef.current(search, classValue, newValue, statusValue, roleValue);
    }
  }, [search, classValue, statusValue, roleValue]);

  const handleStatusChange = useCallback((e) => {
    const newValue = e.target.value;
    setStatusValue(newValue);
    setIsLoading(true);
    
    if (debouncedSearchRef.current) {
      debouncedSearchRef.current(search, classValue, subjectValue, newValue, roleValue);
    }
  }, [search, classValue, subjectValue, roleValue]);

  // Role o'zgarishini kuzatish
  const handleRoleChange = useCallback((e) => {
    const newValue = e.target.value;
    setRoleValue(newValue);
    setIsLoading(true);
    
    if (debouncedSearchRef.current) {
      debouncedSearchRef.current(search, classValue, subjectValue, statusValue, newValue);
    }
  }, [search, classValue, subjectValue, statusValue, roleValue]);

  // Clear filters function
  const handleClearFilters = useCallback(() => {
    setSearch("");
    setClassValue(""); // "Hammasi" ga qaytaradi
    setSubjectValue(""); // "Hammasi" ga qaytaradi
    setStatusValue("");
    setRoleValue(""); // "Hammasi" ga qaytaradi
    
    // Clear filters immediately
    onFilterChange({
      search: "",
      class_num: "",
      subject_name: "",
      status: "",
      role: ""
    });
  }, [onFilterChange]);

  // Export function
  const handleExport = useCallback(() => {
    onExportStart();
    
    // Excel export uchun API so'rov
    const exportParams = {
      role: roleValue || '',
      export: 'excel'
    };
    
    // URL yaratish
    const exportUrl = `${URLS.studentList}?${new URLSearchParams(exportParams).toString()}`;
    
    // Excel faylni yuklab olish
    window.open(exportUrl, '_blank');
    
    // Export tugashini bildirish
    setTimeout(() => {
      onExportEnd();
    }, 1000);
  }, [onExportStart, onExportEnd, roleValue]);

  return (
    <>
    <div className="flex items-center justify-between py-[16px]">
      <div className="flex items-center gap-x-[12px]">
        <SearchInput 
          placeholder={t('searchStudents')} 
          value={search} 
          onChange={handleSearchChange} 
          className="w-80"
        />
        <SelectBox
          label={t('all')}
          options={roleOptions}
          value={roleValue}
          onChange={handleRoleChange}
          className="w-40"
        />
        {/* Faqat "O'quvchi" tanlanganda sinf va fan filtrlari ko'rinadi */}
        {roleValue === 'student' && (
          <>
            <SelectBox
              label={t('class')}
              options={classOptions}
              value={classValue}
              onChange={handleClassChange}
              className="w-40"
            />
            <SelectBox
              label={t('subject')}
              options={subjectOptions}
              value={subjectValue}
              onChange={handleSubjectChange}
              className="w-40"
            />
          </>
        )}
        {/* <SelectBox
          label={t('status')}
          options={statusOptions}
          value={statusValue}
          onChange={handleStatusChange}
          className="w-40"
        /> */}
        
        {/* Clear filters button - faqat filter qilinganida ko'rinadi */}
        {(search || statusValue) && (
          <button
            onClick={handleClearFilters}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {t('clearFilters')}
          </button>
        )}
      </div>
      
      <div className="flex items-center gap-x-[12px]">
          {/* Reward History button */}
          <button
            onClick={() => setIsRewardHistoryOpen(true)}
            className="bg-[#5D87FF] hover:bg-[#4570EA] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t('rewardHistory')}
          </button>
          
        {/* Excel export tugmasi */}
        <button
          onClick={handleExport}
          disabled={isExportingAll || isLoading}
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

    {/* Search results info */}
    {search && (
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 text-sm">
          {t('searchResultsFor')}: <span className="font-semibold">"{search}"</span>
          {studentsData.length > 0 && (
            <span className="ml-2 text-blue-600">
              ({studentsData.length} {t('studentsFound')})
            </span>
          )}
        </p>
      </div>
    )}

      {/* Reward History Modal */}
      <StudentRewardHistory
        isOpen={isRewardHistoryOpen}
        onClose={() => setIsRewardHistoryOpen(false)}
      />
    </>
  );
});

StudentFilter.displayName = 'StudentFilter';

export default StudentFilter; 