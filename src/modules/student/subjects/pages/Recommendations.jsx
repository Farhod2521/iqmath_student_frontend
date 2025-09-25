import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'

import ContentLoader from '@/components/loader/content-loader'
import CardSubjectWithProgress from '../components/card/CardSubjectWithProgress'
import { groupSubjectsByType } from '../utils/groupSubjectsByType'
import { useRouter } from 'next/router'
import { get } from 'lodash'

const Recommendations = () => {
  const { i18n } = useTranslation()
  const router = useRouter()

  const {
    data: recommendations,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.recommendations,
    url: URLS.recommendations
  })

  const subjectsData = useMemo(() => {
    if (!recommendations?.data) return []
    return groupSubjectsByType(recommendations.data, i18n.language)
  }, [recommendations, i18n.language])

  if (isLoading || isFetching) return <ContentLoader />

  const filteredData = subjectsData.filter(({ data }) => {
    const hasDiagnostic = data && data.length > 0 && data.some(item => {
      // To'g'ri field nomi - oxirida bo'sh joy bor
      return item['has_taken_diagnostic '] === true
    })
    return hasDiagnostic
  })

  return (
    <div>
      {filteredData.map(({ type, data }, idx) => {
        // Faqat diagnostic o'tgan fanlarni filter qilish
        const diagnosticPassedSubjects = data.filter(item => item['has_taken_diagnostic '] === true)
        
        return (
          <section key={idx} className="pb-4">
            <h2 className="font-bold mb-2 text-[20px]">{type}</h2>
            <div className="flex flex-wrap gap-4 mb-4">
              {diagnosticPassedSubjects.map((item, index) => (
                <CardSubjectWithProgress
                  onDiagnosticsClick={() => router.push(`/dashboard/student/diagnostics/test/${get(item, 'id')}`)}
                  onRecommendationsClick={() => router.push(`/dashboard/student/recommendations/${get(item, 'id')}`)}
                  key={index}
                  item={item}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default Recommendations
