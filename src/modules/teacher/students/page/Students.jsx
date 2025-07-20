import React, { useCallback, useEffect, useState } from 'react'
import StudentFilter from '../components/StudentFilter'
import StudentTable from '../components/StudentTable'
import ContentLoader from '@/components/loader/content-loader'
import { request } from '@/services/api'

function Students() {
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [filterData, setFilterData] = useState({})
  const [pagination, setPagination] = useState({ current: 1, limit: 10, total: 0, totalPages: 0 })
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

  if (isLoadingData && data.length === 0) {
    return <ContentLoader />
  }

  return (
    <div>
      <StudentFilter />
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
