import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { request } from '@/services/api'
import { useTranslation } from 'react-i18next'
import StudentExampleDetailLayout from '@/modules/teacher/student-examples/StudentExampleDetailLayout'
import ContentLoader from '@/components/loader/content-loader'
import LayoutAdmin from '@/layout/LayoutAdmin'

const StudentExampleDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { t, i18n } = useTranslation()
  const [data, setData] = useState(null)
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) fetchDetail()
    // eslint-disable-next-line
  }, [id])

  const fetchDetail = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await request.get(`/api/v1/func_teacher/teacher-independent/detail/${id}/`)
      setData(res.data)
      setSelectedIdx(0)
    } catch (e) {
      setError(t("loadingError"))
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <ContentLoader classNames="min-h-[100vh]" />
  }
  if (error) {
    return <div className="flex items-center justify-center h-64 text-red-500">{error}</div>
  }
  if (!data) return null

  // Yangi API strukturasi bilan ishlash
  let questions = []
  let result = []

  if (data.question_json) {
    // Yangi strukturani tekshirish
    if (data.question_json.question && Array.isArray(data.question_json.question)) {
      // Yangi struktura: question_json.question array
      questions = data.question_json.question
      result = data.question_json.result || []
    } else if (Array.isArray(data.question_json)) {
      // Eski struktura: question_json to'g'ridan-to'g'ri array
      questions = data.question_json
      result = data.result_json || []
    }
  }

  // Savollarni index bilan boyitish
  const questionsWithIndex = questions.map((q, index) => ({
    ...q,
    index: index + 1
  }))

  return (
    <StudentExampleDetailLayout
      questions={questionsWithIndex}
      result={result}
      selectedIdx={selectedIdx}
      setSelectedIdx={setSelectedIdx}
      i18n={i18n}
      helpRequestId={id} // API uchun help_request_id
      currentStatus={data.status} // Joriy holat
    />
  )
}

export default StudentExampleDetailPage
