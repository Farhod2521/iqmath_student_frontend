import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import useGetQuery from '@/hooks/api/useGetQuery'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import ContentLoader from '@/components/loader/content-loader'
import InfoCircleIcon from '@/components/icons/info-circle'
import MainWrapper from '@/layout/MainWrapper'
import StudentBreadcrumbs from '@/features/subjects/StudentBreadcrumbs'
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react'
import RightIcon from '@/components/icons/right'

const Index = () => {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const [selectedChapterId, setSelectedChapterId] = useState(null)
  const router = useRouter()
  const { id } = router.query
  const {
    data: chapter,
    isLoading: isLoadingChapter,
    isFetching: isFetchingChapter
  } = useGetQuery({
    key: KEYS.studentChapters,
    url: `${URLS.studentChapters}${id}/`,
    headers: {
      Authorization: `Bearer ${session?.accessToken}` || ''
    },
    enabled: !!id && !!session?.accessToken
  })

  const {
    data: topic,
    isLoading: isLoadingTopic,
    isFetching: isFetchingTopic
  } = useGetQuery({
    key: [KEYS.studentTopics, selectedChapterId],
    url: selectedChapterId ? `${URLS.studentTopics}${selectedChapterId}/` : '',
    headers: {
      Authorization: `Bearer ${session?.accessToken}` || ''
    },
    enabled: !!selectedChapterId && !!session?.accessToken
  })

  useEffect(() => {
    // setSelectedChapterId(get(chapter, 'data', [])[0].id)
    chapter && setSelectedChapterId(chapter.data[0].id)
  }, [chapter])

  if (isLoadingChapter || isFetchingChapter) {
    return <ContentLoader />
  }
  return (
    <MainWrapper title={t('subjects')}>
      <div className="font-sf">
        <StudentBreadcrumbs />
        <div className="grid grid-cols-12 gap-[24px]">
          <div className="col-span-6 self-start border border-[#E9E9E9] rounded-[12px] overflow-hidden">
            <ul className="w-full">
              {get(chapter, 'data', []).map((chapter) => {
                const isActive = selectedChapterId === get(chapter, 'id')
                return (
                  <li
                    key={get(chapter, 'id')}
                    onClick={() => setSelectedChapterId(get(chapter, 'id'))}
                    className={`p-[12px] pl-[24px] border-b uppercase border-[#E9E9E9] cursor-pointer last:border-b-0 hover:bg-[#F0F9FF] ${
                      isActive ? 'bg-[#F0F9FF]' : 'bg-white'
                    }`}
                  >
                    {i18n.language === 'uz' ? get(chapter, 'name_uz') : get(chapter, 'name_ru')}
                  </li>
                )
              })}
            </ul>
          </div>

          {selectedChapterId && (
            <div className="col-span-6 self-start border border-[#E9E9E9] rounded-[12px] overflow-hidden">
              {isLoadingTopic || isFetchingTopic ? (
                <ContentLoader />
              ) : (
                <>
                  {get(topic, 'data', []).length > 0 ? (
                    <ul className="w-full">
                      {get(topic, 'data', []).map((topic, index) => {
                        return get(topic, 'is_open') ? (
                          <li
                            key={index}
                            onClick={() =>
                              router.push(`/dashboard/student/subjects/${id}/${selectedChapterId}/${get(topic, 'id')}`)
                            }
                            className={`p-[12px] pl-[24px] border-b hover:bg-[#F0F9FF] hover:cursor-pointer border-[#E9E9E9] bg-white  last:border-b-0`}
                          >
                            <div className="flex justify-between ">
                              <div className="uppercase">
                                {i18n.language === 'uz' ? get(topic, 'name_uz') : get(topic, 'name_ru')}
                              </div>
                              <div style={{ minWidth: 40 }} className="flex justify-center items-center">
                                <RightIcon />
                              </div>
                            </div>
                          </li>
                        ) : (
                          <Popover
                            classNames={{
                              content: 'max-w-[400px]'
                            }}
                            key={index}
                            size="md"
                            showArrow
                            backdrop="opaque"
                          >
                            <PopoverTrigger>
                              <li key={index} className={`p-[12px] pl-[24px] border-b opacity-50 last:border-b-0`}>
                                <div className="flex justify-between ">
                                  <div className="uppercase">
                                    {i18n.language === 'uz' ? get(topic, 'name_uz') : get(topic, 'name_ru')}
                                  </div>
                                  <div style={{ minWidth: 40 }} className="flex justify-center items-center">
                                    <Image src="/icons/lock.svg" alt="lock" width={19} height={19} />
                                  </div>
                                </div>
                              </li>
                            </PopoverTrigger>
                            <PopoverContent>
                              <div className="px-1 py-2 rounded-md">
                                <div className="text-small ">{t('toUnlock')}</div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        )
                      })}
                    </ul>
                  ) : (
                    <div className="flex items-center justify-center h-[200px] gap-2 bg-[#FFF4E5]">
                      <InfoCircleIcon />
                      <div className="flex flex-col items-center">
                        <h3 className="text-[16px] font-normal text-[#8E8E93]">{t('noTopicsInThisSection')}</h3>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </MainWrapper>
  )
}

export default Index
