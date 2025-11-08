import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import ContentLoader from '@/components/loader/content-loader'
import { FiArrowLeft } from 'react-icons/fi'

// Components
import ActivityTable from '../components/child-detail/ActivityTable'
import NoActivityState from '../components/child-detail/NoActivityState'
import ChildNotFoundState from '../components/child-detail/ChildNotFoundState'
import { useGetQuery } from '@/hooks'
import StudentDetails from '@/modules/teacher/students/page/StudentDetails'

const ChildDetail = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id: childId } = router.query
  const { data: session } = useSession()

  const { data, isLoading, isError } = useGetQuery({
    key: ['/student-statistics', childId],
    url: `/api/v1/func_student/student-statistics/${childId}/`,
    enabled: !!childId && !!session?.accessToken
  })

  if (isLoading) {
    return (
      <div className="p-6">
        <ContentLoader />
      </div>
    )
  }

  if (isError) {
    return <ChildNotFoundState />
  }
  return <StudentDetails />
}

export default ChildDetail
