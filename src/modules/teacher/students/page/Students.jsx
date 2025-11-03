import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import StudentFilter from '../components/StudentFilter'
import StudentTable from '../components/StudentTable'

function Students() {
  const { t } = useTranslation()
  const [filterData, setFilterData] = useState({ status: 'active', role: 'student', lang: '' })
  const [isExportingAll, setIsExportingAll] = useState(false)
  const [studentsData, setStudentsData] = useState([])

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
