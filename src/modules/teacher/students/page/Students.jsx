import React, { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import StudentFilter from '../components/StudentFilter'
import StudentTable from '../components/StudentTable'
import { useRouter } from 'next/router'

function Students() {
  const { t } = useTranslation()
  // const [filterData, setFilterData] = useState({ status: 'active', role: 'student', lang: '' })
  const [filterData, setFilterData] = useState(null)
  const [isExportingAll, setIsExportingAll] = useState(false)
  const [studentsData, setStudentsData] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return

    const { role, status, lang } = router.query

    const hasQuery = Object.keys(router.query).length > 0

    let initialFilters

    if (hasQuery) {
      // 🔥 Routerdan kelgan bo‘lsa → faqat shuni ishlat
      initialFilters = {
        search: '',
        class_num: '',
        subject_name: '',
        ...(role && { role }),
        ...(status && { status }),
        ...(lang && { lang }),
        device: ''
      }
    } else {
      initialFilters = {
        search: '',
        class_num: '',
        subject_name: '',
        role: 'student',
        status: 'active',
        lang: '',
        device: ''
      }
    }

    setFilterData(initialFilters)
  }, [router.isReady, router.query])

  const handleFilterChange = useCallback((newFilters) => {
    setFilterData(newFilters)
  }, [])

  const handleExportStart = useCallback(() => {
    setIsExportingAll(true)
  }, [])

  const handleExportEnd = useCallback(() => {
    setIsExportingAll(false)
  }, [])

  const handleStudentsDataChange = useCallback((data) => {
    setStudentsData(data)
  }, [])

  return (
    <div>
      <StudentFilter
        filterData={filterData}
        onFilterChange={handleFilterChange}
        isExportingAll={isExportingAll}
        onExportStart={handleExportStart}
        onExportEnd={handleExportEnd}
        studentsData={studentsData}
      />
      <StudentTable
        filterData={filterData}
        isExportingAll={isExportingAll}
        onExportStart={handleExportStart}
        onExportEnd={handleExportEnd}
        onStudentsDataChange={handleStudentsDataChange}
      />
    </div>
  )
}

export default Students
