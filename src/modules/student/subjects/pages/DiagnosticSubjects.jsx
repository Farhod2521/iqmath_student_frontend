import { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { get } from 'lodash'

import { useGetQuery } from '@/hooks'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'
import CardSubjectWithProgress from '../components/card/CardSubjectWithProgress'
import { groupSubjectsByType } from '../utils/groupSubjectsByType'
import ContentLoader from '@/components/loader/content-loader'
import toast from 'react-hot-toast'

const DiagnosticSubjects = () => {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const router = useRouter()

  // Fanlar ro'yxatini olish
  const {
    data: subjects,
    isLoading,
    isFetching
  } = useGetQuery({
    listKeyId: KEYS.diagnosticSubjects,
    url: URLS.recommendations
    // config: {
    //   headers: { Authorization: `Bearer ${session?.accessToken}` }
    // }
  })

  const subjectsData = useMemo(() => {
    if (!subjects?.data) return []
    return groupSubjectsByType(subjects.data, i18n.language)
  }, [subjects, i18n.language])

  const handleSubjectClick = (subject) => {
    router.push(`/dashboard/student/diagnostics/test/${subject.id}`)
  }

  const handleGoToRecommendations = (subject) => {
    router.push(`/dashboard/student/recommendations/${subject.id}`)
  }

  if (isLoading || isFetching) return <ContentLoader />

  return (
    <div className="p-4 font-sf">
      <div>
        {subjectsData?.map(({ type, data }, idx) => (
          <section key={idx} className="pb-4">
            <h2 className="font-bold mb-2 text-[20px]">{type}</h2>
            <div className="flex flex-wrap gap-4 mb-4">
              {data?.map((item, index) => (
                <CardSubjectWithProgress
                  onDiagnosticsClick={() => handleSubjectClick(item)}
                  onRecommendationsClick={() => handleGoToRecommendations(item)}
                  key={index}
                  item={item}
                  showDiagnosticStatus={true}
                  isDiagnostic={true}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {subjectsData.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">Fanlar topilmadi</p>
        </div>
      )}
    </div>
  )
}

export default DiagnosticSubjects
