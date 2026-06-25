import { useTranslation } from 'react-i18next'
import { useState, useEffect, useCallback } from 'react'
import { request } from '@/services/api'
import SearchInput from '@/components/search'
import SelectBox from '@/components/select-box'
import { useRouter } from 'next/router'
import StudentExampleTable from '@/modules/teacher/student-examples/StudentExampleTable'
import CommentModal from '@/modules/teacher/student-examples/CommentModal'
import ContentLoader from '@/components/loader/content-loader'
import LayoutAdmin from '@/layout/LayoutAdmin'
import HeaderTitle from '@/components/header-title'

const StudentExamples = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionLoading, setActionLoading] = useState({})
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [pagination, setPagination] = useState({ current: 1, limit: 100, total: 0, totalPages: 0 })
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [selectedComment, setSelectedComment] = useState('')
  const [selectedStudentName, setSelectedStudentName] = useState('')

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // API dan ma'lumotlarni olish
  const fetchData = async (page = 1, limit = 100) => {
    try {
      setLoading(true)
      setError(null)
      const response = await request.get('/api/v1/func_teacher/teacher-independent/list/')

      // Ma'lumotlarni tayyorlash
      const tableData = []
      if (response?.data?.results) {
        response.data.results.forEach((student) => {
          student.requests.forEach((request) => {
            tableData.push({
              id: request.id,
              student_id: student.student_id,
              student_name: student.student_full_name,
              class_name: i18n.language === 'ru' ? request.class_ru : request.class_uz,
              topic: i18n.language === 'ru' ? request.topics_name_ru[0] : request.topics_name_uz[0],
              created_at: request.created_at,
              status: request.status,
              formatted_date: formatDate(request.created_at),
              has_answers:
                request.question_json && Array.isArray(request.question_json) && request.question_json.length > 0,
              // Teacher ma'lumotlari - API response strukturasiga mos
              teacher: request.teacher
            })
          })
        })
      }

      // Filtrlash
      const filteredData = tableData.filter((item) => {
        const matchesSearch =
          search === '' ||
          item.student_name.toLowerCase().includes(search.toLowerCase()) ||
          item.class_name.toLowerCase().includes(search.toLowerCase()) ||
          item.topic.toLowerCase().includes(search.toLowerCase())

        const matchesStatus = statusFilter === '' || item.status === statusFilter

        return matchesSearch && matchesStatus
      })

      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedData = filteredData.slice(startIndex, endIndex)

      setData(paginatedData)
      setPagination({
        current: page,
        limit,
        total: filteredData.length,
        totalPages: Math.ceil(filteredData.length / limit)
      })
    } catch (error) {
      console.error('Error fetching data:', error)
      setError("Ma'lumotlarni yuklashda xatolik yuz berdi")
      setData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(1, 100)
  }, [])

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, current: newPage + 1 }))
    fetchData(newPage + 1, pagination.limit)
  }

  const handlePageSizeChange = (newPageSize) => {
    setPagination((prev) => ({ ...prev, current: 1, limit: newPageSize }))
    fetchData(1, newPageSize)
  }

  const handleViewDetails = (requestId, studentName) => {
    router.push({
      pathname: `/dashboard/teacher/student-examples/${requestId}`,
      query: { student_name: studentName }
    })
  }

  const handleShowComment = (comment, studentName) => {
    setSelectedComment(comment)
    setSelectedStudentName(studentName)
    setShowCommentModal(true)
  }

  const statusOptions = [
    { value: '', label: 'Hammasi' },
    { value: 'kutmoqda', label: t('pending') },
    { value: 'tasdiqlangan', label: t('approved') },
    { value: 'rad etilgan', label: t('rejected') }
  ]

  if (loading && data.length === 0) {
    return (
      <LayoutAdmin>
        <HeaderTitle title={t('studentExamples')} />
        <ContentLoader />
      </LayoutAdmin>
    )
  }

  if (error) {
    return (
      <LayoutAdmin>
        <HeaderTitle title={t('studentExamples')} />
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 text-red-400">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Xatolik yuz berdi</h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">{error}</p>
            <button
              onClick={() => fetchData(pagination.current, pagination.limit)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              {t('retry')}
            </button>
          </div>
        </div>
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('studentExamples')} />
      <div className="space-y-6">
        {/* Filters - pupils sahifasidagidek */}
        <div className="flex flex-col w-full gap-3 py-4 lg:flex-row lg:items-center lg:justify-between">
          {/* <div className="flex items-center gap-x-[12px]"> */}
          <div className="flex flex-col w-full gap-3 sm:flex-row lg:w-auto">
            <SearchInput
              placeholder="Qidiruv..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-80"
            />

            <SelectBox
              label="Holat"
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-40"
            />
          </div>
        </div>

        {/* Table */}
        <div className="w-full min-w-0 overflow-x-auto bg-white dark:bg-gray-800">
          {data.length === 0 ? (
            <div className="w-full py-12 text-center">
              <div className="w-12 h-12 mx-auto text-gray-400">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Ma'lumot topilmadi</h3>
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
              context={{ onShowComment: handleShowComment }}
            />
          )}
        </div>
      </div>

      {/* Comment Modal */}
      <CommentModal
        isOpen={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        comment={selectedComment}
        studentName={selectedStudentName}
      />
    </LayoutAdmin>
  )
}

export default StudentExamples
