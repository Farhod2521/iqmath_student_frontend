import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react'

import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useGetQuery } from '@/hooks'
import ContentLoader from '@/components/loader/content-loader'
import InfoCircleIcon from '@/components/icons/info-circle'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { request } from '@/services/api'
import BaseBreadcrumbs from '@/components/breadcrumb/Breadcrumbs'
import HeaderTitle from '@/components/header-title'

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
    key: `${KEYS.studentChapters}-${id}`,
    url: id ? `${URLS.studentChapters}${id}/` : '',
    enabled: !!id && !!session?.accessToken
  })

  const {
    data: topic,
    isLoading: isLoadingTopic,
    isFetching: isFetchingTopic
  } = useGetQuery({
    key: `my-diagnost-chapter-${selectedChapterId}`,
    url: selectedChapterId ? `${URLS.studentTopics}${selectedChapterId}/` : '',
    enabled: !!selectedChapterId && !!session?.accessToken
  })

  useEffect(() => {
    if (chapter?.data?.length && !selectedChapterId) {
      setSelectedChapterId(chapter.data[0].id)
    }
  }, [chapter])

  const [pathList, setPathList] = useState([])
  const fetchData = () => {
    request.post('/api/v1/func_student/path/list/', { subject: id }).then((res) => {
      setPathList(res.data)
    })
  }

  useEffect(() => {
    if (id) fetchData()
  }, [id])

  if (isLoadingChapter || isFetchingChapter) {
    return <ContentLoader />
  }

  const chapters = chapter?.data || []
  const topics = topic?.data || []

  return (
    <LayoutAdmin>
      <div className="mb-4 border-b-1">
        <HeaderTitle title={t('subjects')} />
      </div>
      <MathJaxContext
        config={{
          loader: { load: ['input/tex', 'output/chtml'] }
        }}
      >
        <div className="font-sf">
          {/* <StudentBreadcrumbs mainLink="/dashboard/student/subjects" /> */}
          <BaseBreadcrumbs
            data={pathList.map((item) => ({
              link: '/dashboard/student/subjects',
              title: i18n.language === 'uz' ? item.title_uz : item.title_ru
            }))}
          />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {/* BOB (Chapter) Section */}
            <div className="col-span-12 md:col-span-6 self-start overflow-hidden rounded-xl border border-gray-200 max-h-[45vh] md:max-h-none overflow-y-auto">
              {/* Mobile Header - BOB */}

              <div className="sticky top-0 z-10 bg-gray-100 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-600 rounded-md flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-800 uppercase">{t('chapter')}</h3>
                    <p className="text-gray-500 text-xs">{t('select')}</p>
                  </div>
                </div>
              </div>

              <ul>
                {chapters.map((chapter, idx) => (
                  <li
                    key={idx}
                    onClick={() => setSelectedChapterId(chapter.id)}
                    className={`cursor-pointer border-b  border-gray-200 p-2 sm:p-3  pl-4 sm:pl-6 text-sm sm:text-md uppercase last:border-b-0 hover:bg-blue-50 ${
                      selectedChapterId === chapter.id ? 'bg-blue-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex gap-2 justify-between">
                      <MathJax>{i18n.language === 'uz' ? chapter?.name_uz : chapter?.name_ru}</MathJax>
                      <div className="flex items-center gap-1 min-w-[120px]">
                        <div className="w-[80px] h-1.5 bg-gray-200 rounded">
                          <div
                            className="h-1.5 bg-green-500 rounded"
                            style={{ width: `${chapter?.progress === null ? 0 : chapter?.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 font-medium min-w-[24px]">
                          {chapter?.progress === null ? 0 : chapter?.progress}%
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* MAVZU (Topic) Section */}
            {selectedChapterId && (
              <div className="col-span-12 md:col-span-6 self-start overflow-hidden rounded-xl border border-gray-200 max-h-[55vh] md:max-h-none overflow-y-auto">
                {/* Mobile Header - MAVZU */}
                <div className="sticky top-0 z-10 bg-gray-100 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-600 rounded-md flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-800 uppercase">{t('topic')}</h3>
                      <p className="text-gray-500 text-xs">{t('topicsList')}</p>
                    </div>
                  </div>
                </div>

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
                          className="flex flex-col gap-1 cursor-pointer justify-between border-b border-gray-200 bg-white p-2 sm:p-3 pl-4 sm:pl-6 text-sm sm:text-md last:border-b-0 hover:bg-blue-50"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <MathJax>
                              <span className="uppercase break-words">
                                {i18n.language === 'uz' ? topic.name_uz : topic.name_ru}
                              </span>
                            </MathJax>

                            {(typeof topic.score === 'number' || topic.score === null) && (
                              <div className="flex items-center gap-1 min-w-[120px]">
                                <div className="w-[80px] h-1.5 bg-gray-200 rounded">
                                  <div
                                    className="h-1.5 bg-green-500 rounded"
                                    style={{ width: `${topic.score === null ? 0 : topic.score}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-600 font-medium min-w-[24px]">
                                  {topic.score === null ? 0 : topic.score}%
                                </span>
                              </div>
                            )}
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
                            <li className="flex justify-between border-b border-gray-200 p-2 sm:p-3 pl-4 sm:pl-6 text-sm sm:text-md opacity-50 last:border-b-0">
                              <span className="uppercase">
                                {i18n.language === 'uz' ? topic.name_uz : topic.name_ru}
                              </span>
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
      </MathJaxContext>
    </LayoutAdmin>
  )
}

export default SubjectsPage
