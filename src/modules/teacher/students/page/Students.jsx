import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import StudentFilter from '../components/StudentFilter'
import StudentTable from '../components/StudentTable'
import ContentLoader from '@/components/loader/content-loader'
import { request } from '@/services/api'
import { exportToExcel, formatStudentsForExcel } from '@/utils/excelExport'
import toast from 'react-hot-toast'

function Students() {
  const { t } = useTranslation()
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [isExportingAll, setIsExportingAll] = useState(false)
  const [filterData, setFilterData] = useState({})
  const [pagination, setPagination] = useState({ current: 1, limit: 100, total: 0, totalPages: 0 })
  const [data, setData] = useState([])

  const getData = useCallback(
    (page = 1, limit = 10) => {
      setIsLoadingData(true)
      request
        .get('/api/v1/auth/student/student_list/', {
          params: {
            page,
            size: limit,
            ...filterData
          }
        })
        .then((res) => {
          setData(res.data.results || [])
          setPagination({
            current: page,
            limit,
            total: res.data.total || 0,
            totalPages: res.data.total_pages || 0
          })
        })
        .catch((error) => {
          setData([])
        })
        .finally(() => setIsLoadingData(false))
    },
    [filterData]
  )

  useEffect(() => {
    getData(pagination.current, pagination.limit)
  }, [getData, pagination.current, pagination.limit])

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, current: newPage + 1 }))
  }

  const handlePageSizeChange = (newPageSize) => {
    setPagination((prev) => ({ ...prev, current: 1, limit: newPageSize }))
  }

  // Barcha o'quvchilar ma'lumotlarini export qilish
  const handleExportAllStudents = async () => {
    setIsExportingAll(true)
    
    try {
      // Barcha o'quvchilar ma'lumotlarini olish (pagination siz)
      const response = await request.get('/api/v1/auth/student/student_list/', {
        params: {
          size: 10000, // Katta raqam beramiz, barcha ma'lumotlarni olish uchun
          ...filterData
        }
      })
      
      const allStudents = response.data.results || []
      
      if (allStudents.length === 0) {
        toast.error(t('noDataToExport'))
        return
      }
      
      const formattedData = formatStudentsForExcel(allStudents)
      const success = exportToExcel(formattedData, `barcha_o'quvchilar_${new Date().toISOString().split('T')[0]}.xlsx`)
      
      if (success) {
        toast.success(t('exportAllStudentsSuccess'))
      } else {
        toast.error(t('exportError'))
      }
    } catch (error) {
      console.error("Export xatosi:", error)
      toast.error(t('exportError'))
    } finally {
      setIsExportingAll(false)
    }
  }

  if (isLoadingData && data.length === 0) {
    return <ContentLoader />
  }

  return (
    <div>
      <StudentFilter 
        studentsData={data} 
        onExportAll={handleExportAllStudents}
        isExportingAll={isExportingAll}
      />
      <StudentTable
        data={data}
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoadingData}
      />
    </div>
  )
}

export default Students
