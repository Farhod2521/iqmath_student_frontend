import BaseBreadcrumbs from '@/components/breadcrumb/Breadcrumbs'
import { request } from '@/services/api'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettingsStore } from '@/store'

function StudentBreadcrumbs({ selectTitle }) {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { lang } = useSettingsStore((state) => state)
  const { id, chapterId, topicId } = router.query

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const breadcrumbs = useMemo(() => {
    const mainPath = { link: '/dashboard/student/subjects', title: t('topics') }

    if (data && data.length === 1) {
      const item = data[0]
      return [mainPath, { link: '', title: item[`title_${lang}`] }]
    }
    if (data && data.length === 3) {
      const item1 = data[0]
      const item2 = data[1]
      const item3 = data[2]
      return [
        mainPath,
        { link: `/dashboard/student/subjects/${id}`, title: item1[`title_${lang}`] },
        { link: `/dashboard/student/subjects/${id}`, title: item2[`title_${lang}`] },
        { link: ``, title: selectTitle }
      ]
    }
    return [mainPath]
  }, [data, lang, selectTitle])

  const fetchData = () => {
    setIsLoading(true)

    request
      .post('/api/v1/func_student/path/list/', { subject: id, chapter: chapterId, topic: topicId })
      .then((res) => {
        setData(res.data)
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) return '...'

  return <BaseBreadcrumbs data={breadcrumbs} />
}

export default StudentBreadcrumbs
