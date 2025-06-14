import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'

import ContentLoader from '@/components/loader/content-loader'
import CardSubject from '../components/card/CardSubject'
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

  return (
    <div>
      {subjectsData.map(({ type, data }, idx) => (
        <section key={idx} className="pb-4">
          <h2 className="font-bold mb-2 text-[20px]">{type}</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            {data.map((item, index) => (
              <CardSubject
                onClick={() => router.push(`/dashboard/student/recommendations/${get(item, 'id')}`)}
                key={index}
                item={item}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default Recommendations
