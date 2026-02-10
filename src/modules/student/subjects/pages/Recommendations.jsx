import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'

import ContentLoader from '@/components/loader/content-loader'
import CardSubjectWithProgress from '../components/card/CardSubjectWithProgress'
import { groupSubjectsByType } from '../utils/groupSubjectsByType'
import { useRouter } from 'next/router'
import { get } from 'lodash'
import { useGetQuery } from '@/hooks'

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
    const fitlerData = recommendations?.data.filter((i) => i.has_taken_diagnostic) || []
    return groupSubjectsByType(fitlerData, i18n.language)
  }, [recommendations, i18n.language])

  if (isLoading || isFetching) return <ContentLoader />
  // dashboard/student/recommendations/1
  // dashboard/student/recommendations/1
  return (
    <div>
      {subjectsData.map(({ type, data }, idx) => {
        return (
          <section key={idx} className="pb-4">
            <h2 className="font-bold mb-2 text-[20px]">{type}</h2>
            <div className="flex flex-wrap gap-4 mb-4">
              {data.map((item, index) => (
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
