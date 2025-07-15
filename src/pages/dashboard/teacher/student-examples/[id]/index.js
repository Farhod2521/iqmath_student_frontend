import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { request } from "@/services/api";
import { useTranslation } from "react-i18next";
import StudentExampleDetailLayout from "@/modules/student-examples/StudentExampleDetailLayout";
import MainWrapper from "@/layout/MainWrapper";
const StudentExampleDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) fetchDetail();
    // eslint-disable-next-line
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await request.get(`/api/v1/func_teacher/teacher-independent/detail/${id}/`);
      setData(res.data);
      setSelectedIdx(0);
    } catch (e) {
      setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        {error}
      </div>
    );
  }
  if (!data) return null;

  const questions = data.question_json || [];

  return (
    <MainWrapper title={t("studentExampleDetail")}>
    <StudentExampleDetailLayout
      questions={questions}
      selectedIdx={selectedIdx}
      setSelectedIdx={setSelectedIdx}
      i18n={i18n}
    />
    </MainWrapper>
  );
};

export default StudentExampleDetailPage; 