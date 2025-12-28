import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import useGetQuery from '@/hooks/api/useGetQuery'
import StudentBreadcrumbs from '@/features/subjects/StudentBreadcrumbs'
import ContentLoader from '@/components/loader/content-loader'
import InfoCircleIcon from '@/components/icons/info-circle'
import RightIcon from '@/components/icons/right'
import LayoutAdmin from '@/layout/LayoutAdmin'

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
    key: 'my-diagnost-subject',
    url: id ? `/api/v1/func_student/my-diagnost-subject/${id}/chapters/` : '',
    enabled: !!id && !!session?.accessToken
  })

  const {
    data: topic,
    isLoading: isLoadingTopic,
    isFetching: isFetchingTopic
  } = useGetQuery({
    key: ['my-diagnost-chapter', selectedChapterId],
    url: selectedChapterId ? `/api/v1/func_student/my-diagnost-chapter/${selectedChapterId}/topics/` : '',
    enabled: !!selectedChapterId && !!session?.accessToken
  })

  useEffect(() => {
    if (chapter?.data?.[0]?.id) {
      console.log(chapter)
      setSelectedChapterId(chapter.data[0].id)
    }
  }, [chapter])

  if (isLoadingChapter || isFetchingChapter) {
    return <ContentLoader />
  }

  const chapters = chapter?.data || []
  const topics = topic?.data || []

  return (
    <LayoutAdmin title={t('subjects')}>
      <div className="font-sf">
        <StudentBreadcrumbs mainLink="/dashboard/student/subjects" />
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-6 self-start overflow-hidden rounded-xl border border-gray-200">
            <div className=" bg-gray-100 px-4 py-3 border-b border-gray-200">
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
                  <h3 className="text-base font-semibold text-gray-800 uppercase">{t('chapters')}</h3>
                  <p className="text-gray-500 text-xs">{t('select')}</p>
                </div>
              </div>
            </div>
            <ul>
              {chapters.map((chapter, idx) => (
                <li
                  key={idx}
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
              <div className=" bg-gray-100 px-4 py-3 border-b border-gray-200">
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
                  {topics.map((topic, index) => (
                    <li
                      key={index}
                      // key={index}
                      // onClick={() =>
                      //   router.push(`/dashboard/student/recommendations/${id}/${selectedChapterId}/${topic.id}`)
                      // }
                      className="flex cursor-pointer items-center  justify-between border-b border-gray-200 bg-white p-2 sm:p-3 pl-4 sm:pl-6 text-sm sm:text-md last:border-b-0 hover:bg-blue-50"
                    >
                      <span className="uppercase">{i18n.language === 'uz' ? topic.name_uz : topic.name_ru}</span>
                      {/* <div className="flex min-w-10 items-center justify-center">
                        <RightIcon />
                      </div> */}
                    </li>
                  ))}
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
    </LayoutAdmin>
  )
}

export default SubjectsPage
