import BaseBreadcrumbs from '@/components/breadcrumb/Breadcrumbs'
import { request } from '@/services/api'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function StudentBreadcrumbs() {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const breadcrumbs = [
    { link: '/dashboard/student/subjects', title: t('topics') },
    { link: '', title: t('departments') }
  ]

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true)
      request
        .post('/api/v1/func_student/path/list/', { subject: '3', chapter: '26' })
        .then((res) => {
          console.log(res)
        })
        .finally(() => setIsLoading(false))
    }
    fetchData()
  }, [])

  if (isLoading) return '...'

  return <BaseBreadcrumbs data={breadcrumbs} />
}

export default StudentBreadcrumbs
