import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react'

import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import useGetQuery from '@/hooks/api/useGetQuery'
import MainWrapper from '@/layout/MainWrapper'
import StudentBreadcrumbs from '@/features/subjects/StudentBreadcrumbs'
import ContentLoader from '@/components/loader/content-loader'
import InfoCircleIcon from '@/components/icons/info-circle'
import RightIcon from '@/components/icons/right'
import CoinsIcon from '@/components/icons/coins'

const SubjectsPage = () => {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const router = useRouter()
  const { id } = router.query
  const [selectedChapterId, setSelectedChapterId] = useState(null)

  const {
    data: chapter,
    isLoading: isLoadingChapter,
    isFetching: isFetchingChapter
  } = useGetQuery({
    key: KEYS.studentChapters,
    url: id ? `${URLS.studentChapters}${id}/` : '',
    enabled: !!id && !!session?.accessToken
  })

  const {
    data: topic,
    isLoading: isLoadingTopic,
    isFetching: isFetchingTopic
  } = useGetQuery({
    key: [KEYS.studentTopics, selectedChapterId],
    url: selectedChapterId ? `${URLS.studentTopics}${selectedChapterId}/` : '',
    enabled: !!selectedChapterId && !!session?.accessToken
  })

  useEffect(() => {
    if (chapter?.data?.[0]?.id) {
      setSelectedChapterId(chapter.data[0].id)
    }
  }, [chapter])

  if (isLoadingChapter || isFetchingChapter) {
    return <ContentLoader />
  }

  const chapters = chapter?.data || []
  const topics = topic?.data || []

  return (
    <MainWrapper title={t('subjects')}>
      <div className="font-sf">
        <StudentBreadcrumbs mainLink="/dashboard/student/subjects" />
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-6 self-start overflow-hidden rounded-xl border border-gray-200">
            <ul>
              {chapters.map((chapter) => (
                <li
                  key={chapter.id}
                  onClick={() => setSelectedChapterId(chapter.id)}
                  className={`cursor-pointer border-b border-gray-200 p-2 sm:p-3 pl-4 sm:pl-6 text-sm sm:text-md uppercase last:border-b-0 hover:bg-blue-50 ${
                    selectedChapterId === chapter.id ? 'bg-blue-50' : 'bg-white'
                  }`}
                >
                  {i18n.language === 'uz' ? chapter.name_uz : chapter.name_ru}
                </li>
              ))}
            </ul>
          </div>

          {selectedChapterId && (
            <div className="col-span-12 md:col-span-6 self-start overflow-hidden rounded-xl border border-gray-200">
              {isLoadingTopic || isFetchingTopic ? (
                <ContentLoader />
              ) : topics.length > 0 ? (
                <ul>
                  {topics.map((topic, index) =>
                    topic.is_open ? (
                      <li
                        key={index}
                        onClick={() =>
                          router.push(`/dashboard/student/subjects/${id}/${selectedChapterId}/${topic.id}`)
                        }
                        className="flex items-center cursor-pointer justify-between border-b border-gray-200 bg-white p-2 sm:p-3 pl-4 sm:pl-6 text-sm sm:text-md last:border-b-0 hover:bg-blue-50"
                      >
                        <span className="uppercase">{i18n.language === 'uz' ? topic.name_uz : topic.name_ru}</span>
                        <div className="flex min-w-10 items-center justify-center">
                          <RightIcon />
                        </div>
                      </li>
                    ) : (
                      <Popover
                        key={index}
                        size="md"
                        showArrow
                        backdrop="opaque"
                        classNames={{ content: 'max-w-[400px]' }}
                      >
                        <PopoverTrigger>
                          <li className="flex justify-between border-b border-gray-200 p-2 sm:p-3 pl-4 sm:pl-6 text-sm sm:text-md  opacity-50 last:border-b-0">
                            <span className="uppercase">{i18n.language === 'uz' ? topic.name_uz : topic.name_ru}</span>
                            <div className="flex min-w-10 items-center justify-center">
                              <Image src="/icons/lock.svg" alt="lock" width={19} height={19} />
                            </div>
                          </li>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="px-1 py-2">
                            <p className="text-sm">{t('toUnlock')}</p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    )
                  )}
                </ul>
              ) : (
                <div className="flex h-48 items-center justify-center gap-2 bg-orange-50">
                  <InfoCircleIcon />
                  <h3 className="text-base font-normal text-gray-500">{t('noTopicsInThisSection')}</h3>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MainWrapper>
  )
}

export default SubjectsPage
