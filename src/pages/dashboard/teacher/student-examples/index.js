import MainWrapper from '@/layout/MainWrapper'
import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback } from "react";
import { request } from "@/services/api";
import SearchInput from "@/components/search";
import SelectBox from "@/components/select-box";
import { useRouter } from "next/router";
import StudentExampleTable from "@/modules/student-examples/StudentExampleTable";
import ContentLoader from "@/components/loader/content-loader";

const StudentExamples = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [pagination, setPagination] = useState({ current: 1, limit: 10, total: 0, totalPages: 0 });

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // API dan ma'lumotlarni olish
  const fetchData = useCallback(async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response = await request.get("/api/v1/func_teacher/teacher-independent/list/");
      
      // Ma'lumotlarni tayyorlash
      const tableData = [];
      if (response?.data?.results) {
        response.data.results.forEach(student => {
          student.requests.forEach(request => {
            tableData.push({
              id: request.id,
              student_id: student.student_id,
              student_name: student.student_full_name,
              class_name: i18n.language === 'ru' ? request.class_ru : request.class_uz,
              topic: i18n.language === 'ru' ? request.topics_name_ru[0] : request.topics_name_uz[0],
              created_at: request.created_at,
              status: request.status,
              formatted_date: formatDate(request.created_at)
            });
          });
        });
      }

      // Filtrlash
      const filteredData = tableData.filter(item => {
        const matchesSearch = search === "" || 
          item.student_name.toLowerCase().includes(search.toLowerCase()) ||
          item.class_name.toLowerCase().includes(search.toLowerCase()) ||
          item.topic.toLowerCase().includes(search.toLowerCase());
        
        const matchesStatus = statusFilter === "" || item.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      });

      setData(filteredData);
      setPagination({
        current: page,
        limit,
        total: filteredData.length,
        totalPages: Math.ceil(filteredData.length / limit)
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, i18n.language]);

  useEffect(() => {
    fetchData(pagination.current, pagination.limit);
  }, [fetchData, pagination.current, pagination.limit]);

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, current: newPage + 1 }));
  };

  const handlePageSizeChange = (newPageSize) => {
    setPagination(prev => ({ ...prev, current: 1, limit: newPageSize }));
  };

  const handleViewDetails = (requestId, studentName) => {
    router.push({
      pathname: `/dashboard/teacher/student-examples/${requestId}`,
      query: { student_name: studentName }
    });
  };

  const statusOptions = [
    { value: "", label: "Hammasi" },
    { value: "kutmoqda", label: t("pending") },
    { value: "tasdiqlangan", label: t("approved") },
    { value: "rad etilgan", label: t("rejected") },
  ];

  if (loading && data.length === 0) {
    return (
      <MainWrapper title={t("studentExamples")}>
        <ContentLoader />
      </MainWrapper>
    );
  }

  if (error) {
    return (
      <MainWrapper title={t("studentExamples")}>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-red-400 mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Xatolik yuz berdi
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => fetchData(pagination.current, pagination.limit)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Qayta urinish
            </button>
          </div>
        </div>
      </MainWrapper>
    );
  }

  return (
    <MainWrapper title={t("studentExamples")}>
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex items-center justify-between py-[16px]">
          <div className="flex items-center gap-x-[12px]">
            <SearchInput
              placeholder="Qidiruv..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-80"
            />

            <SelectBox
              label="Holat"
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-40"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 ">
          {data.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                Ma'lumot topilmadi
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Tanlangan filtrlarda ma'lumot mavjud emas.
              </p>
            </div>
          ) : (
            <StudentExampleTable 
              data={data} 
              pagination={pagination}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              isLoading={loading}
              actionLoading={actionLoading}
              onViewDetails={handleViewDetails}
            />
          )}
        </div>
      </div>
    </MainWrapper>
  );
};

export default StudentExamples; 