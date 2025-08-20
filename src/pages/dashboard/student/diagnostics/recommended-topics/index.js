import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import useGetQuery from '@/hooks/api/useGetQuery'
import { useSession } from 'next-auth/react'
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import BaseBreadcrumbs from '@/components/breadcrumb/Breadcrumbs'
import ContentLoader from '@/components/loader/content-loader'
import InfoCircleIcon from '@/components/icons/info-circle'
import LayoutAdmin from '@/layout/LayoutAdmin'

const Index = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [_, setSelectedTopic] = useState(null)

  const { t, i18n } = useTranslation()
  const {
    data: advisedTopics,
    isLoading,
    isFetching
  } = useGetQuery({
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

  const breadcrumbs = [
    { link: '/dashboard/student/subjects', title: t('main') },
    { link: '', title: t('recommended') }
  ]

  if (isLoading || isFetching) {
    return <ContentLoader />
  }

  return (
    <LayoutAdmin title={t('subjects')}>
      <div className="font-sf">
        <BaseBreadcrumbs data={breadcrumbs} />
        <h1 className="font-semibold text-[20px] mb-[18px]">{t('needToStudy')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px]">
          <div className="col-span-12 md:col-span-6 self-start border border-[#E9E9E9] rounded-[12px] overflow-hidden">
            {get(advisedTopics, 'data.topics', []).length > 0 ? (
              <ul className="w-full">
                {get(advisedTopics, 'data.topics', [])?.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedTopic(item.id)
                      router.push(`/dashboard/student/diagnostics/recommended-topics/${item.id}`)
                    }}
                    className="p-[12px] pl-[24px] border-b hover:bg-[#F0F9FF] hover:cursor-pointer border-[#E9E9E9] bg-white last:border-b-0"
                  >
                    <div className="flex justify-between">
                      <div className="uppercase">{i18n.language === 'uz' ? item.name_uz : item.name_ru}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-[200px] gap-2 bg-[#FFF4E5]">
                <InfoCircleIcon />
                <div className="flex flex-col items-center">
                  <h3 className="text-[16px] font-normal text-[#8E8E93]">{t('noTopicsInThisSection')}</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default Index
