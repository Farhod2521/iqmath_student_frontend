import Dashboard from '@/components/dashboard'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import useGetQuery from '@/hooks/api/useGetQuery'
import { useTopicStore } from '@/store'
import { useSession } from 'next-auth/react'
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useRouter } from 'next/router'

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
      level: topic
    }
  })

  const { data: topics } = useGetQuery({
    key: [KEYS.diagnosticsTopics, selectedTopic],
    url: selectedTopic ? `${URLS.diagnosticsTopics}${selectedTopic}/` : null,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!selectedTopic && !!session?.accessToken
  })

  return (
    <>
      <div className="grid grid-cols-12 gap-[24px]">
        <div className="col-span-6 border border-[#E9E9E9] rounded-[12px] overflow-hidden">
          <ul className="w-full">
            {get(advisedTopics, 'data.topics', [])?.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedTopic(item.id)
                  router.push(`/dashboard/student/diagnostics/recommended-topics/${item.id}`)
                }}
                className="p-[12px] pl-[24px] bg-white border-b border-[#E9E9E9] last:border-b-0"
              >
                {i18n.language === 'uz' ? item.name_uz : item.name_ru}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 border border-[#E9E9E9] rounded-[12px]"></div>
      </div>
    </>
  )
}

export default Index
