import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import useGetQuery from '@/hooks/api/useGetQuery'
import { useSettingsStore, useTopicStore } from '@/store'
import { useSession } from 'next-auth/react'
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import BaseBreadcrumbs from '@/components/breadcrumb/Breadcrumbs'

const Index = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedTopic, setSelectedTopic] = useState(null)
  const topic = useTopicStore((state) => state.topic)

  const { t, i18n } = useTranslation()
  const { data: advisedTopics } = useGetQuery({
    key: KEYS.advisedTopics,
    url: URLS.advisedTopics,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!session?.accessToken,
    params: {
      level: 1
    }
  })

  // const { data: topics } = useGetQuery({
  //   key: [KEYS.diagnosticsTopics, selectedTopic],
  //   url: selectedTopic ? `${URLS.diagnosticsTopics}${selectedTopic}/` : null,
  //   headers: {
  //     Authorization: `Bearer ${session?.accessToken}`
  //   },
  //   enabled: !!selectedTopic && !!session?.accessToken
  // })

  const breadcrumbs = [
    { link: '/dashboard/student/subjects', title: t('main') },
    { link: '', title: t('recommended') }
  ]

  return (
    <div>
      <BaseBreadcrumbs data={breadcrumbs} />
      <h1 className="font-semibold text-[20px] mb-[18px]">{t('needToStudy')}</h1>
      <div className="w-full lg:w-4/5 border border-[#E9E9E9] rounded-[12px] overflow-hidden">
        <div className="grid grid-cols-1 gap-2">
          {get(advisedTopics, 'data.topics', [])?.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedTopic(item.id)
                router.push(`/dashboard/student/diagnostics/recommended-topics/${item.id}`)
              }}
              className="p-3 list-none hover:bg-blue-50 cursor-pointer border border-[#E9E9E9] rounded-md text-[14px] break-words whitespace-normal transition"
            >
              {i18n.language === 'uz' ? item.name_uz : item.name_ru}
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Index
