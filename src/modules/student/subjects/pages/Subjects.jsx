import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'

import ContentLoader from '@/components/loader/content-loader'
import CardSubject from '../components/card/CardSubject'
import CardLockedSubject from '../components/card/CardLockedSubject'
import { groupSubjectsByType } from '../utils/groupSubjectsByType'
import { useRouter } from 'next/router'
import { get } from 'lodash'

const Subjects = () => {
  const { i18n } = useTranslation()
  const router = useRouter()

  const {
    data: studentSubjects,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.studentSubjects,
    url: URLS.studentSubjects
  })

  const subjectsData = useMemo(() => {
    if (!studentSubjects?.data) return []
    return groupSubjectsByType(studentSubjects.data, i18n.language)
  }, [studentSubjects, i18n.language])

  if (isLoading || isFetching) return <ContentLoader />

  return (
    <div>
      {subjectsData?.map(({ type, data }, idx) => (
        <section key={idx} className="pb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-[6px] h-[22px] rounded-full bg-[#ff5b8d]" />
            <h2 className="font-bold text-[18px] sm:text-[20px] text-[#1f2a5b] dark:text-white">{type}</h2>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            {data?.map((item, index) =>
              item.is_open ? (
                <CardSubject
                  onClick={() => router.push(`/dashboard/student/subjects/${get(item, 'id')}`)}
                  key={index}
                  item={item}
                />
              ) : (
                <CardLockedSubject key={index} item={item} />
              )
            )}
          </div>
        </section>
      ))}
    </div>
  )
}

export default Subjects
