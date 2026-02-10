import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'

export const useChatData = (session) => {
  const { i18n } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // API dan ma'lumotlarni olish
  const {
    data: mentorRequests,
    isLoading,
    refetch
  } = useGetQuery({
    key: [KEYS.mentorRequests, currentPage, pageSize],
    url: `/api/v1/func_student/my-independent/?page=${currentPage}&size=${pageSize}`,
    // headers: { Authorization: `Bearer ${session?.accessToken}` },
    enabled: !!session?.accessToken
  })

  // Ko'p tillik qo'llab-quvvatlash
  const getLocalizedField = (request, field) => {
    const lang = i18n.language
    if (lang === 'ru') {
      return request[`${field}_ru`] || request[`${field}_uz`]
    }
    return request[`${field}_uz`] || request[`${field}_ru`]
  }

  // Filter qilingan ma'lumotlar
  const filteredRequests = useMemo(() => {
    if (!mentorRequests?.data?.results) return []

    return mentorRequests.data.results.filter((request) => {
      const subjectName = getLocalizedField(request, 'subject_name')
      const chapterName = getLocalizedField(request, 'chapter_name')?.[0]
      const topicName = getLocalizedField(request, 'topic_name')?.[0]

      const matchesSearch =
        searchTerm === '' ||
        subjectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapterName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topicName?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === '' || request.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [mentorRequests, searchTerm, statusFilter, getLocalizedField])

  // Pagination ma'lumotlari
  const paginationData = mentorRequests?.data || {}
  const totalPages = paginationData.total_pages || 1
  const totalItems = paginationData.total || 0

  // Pagination handlerlari
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  return {
    // Ma'lumotlar
    filteredRequests,
    paginationData,
    totalPages,
    totalItems,
    isLoading,

    // State
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    pageSize,

    // Handlers
    handlePageChange,
    handlePageSizeChange,
    getLocalizedField,

    // Refetch
    refetch
  }
}
