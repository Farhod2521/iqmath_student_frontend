import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'

import ContentLoader from '@/components/loader/content-loader'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import BaseBreadcrumbs from '@/components/breadcrumb/Breadcrumbs'
import { request } from '@/services/api'

const StudentSubjectDetails = () => {
  const router = useRouter()
  const { id, subjectId, subjectName } = router.query
  const { data: session } = useSession()
  const { t, i18n } = useTranslation()

  const [chapters, setChapters] = useState([])
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [isTopicsLoading, setIsTopicsLoading] = useState(false)

  const { data, isLoading, isFetching } = useGetQuery({
    key: [KEYS.studentSubjectChapters, id, subjectId],
    url: id && subjectId ? `${URLS.studentSubjectChapters}${id}/subjects/${subjectId}/chapters/` : null,
    // headers: {
    //   Authorization: `Bearer ${session?.accessToken}`
    // },
    enabled: !!id && !!subjectId && !!session?.accessToken
  })

  useEffect(() => {
    const chapterData = get(data, 'data', [])
    if (chapterData.length > 0) {
      setChapters(chapterData)
      setSelectedChapter(chapterData[0])
    }
  }, [data])

  const handleChapterSelect = (chapter) => {
    if (selectedChapter?.chapter_id !== chapter.chapter_id) {
      setIsTopicsLoading(true)
      setTimeout(() => {
        setSelectedChapter(chapter)
        setIsTopicsLoading(false)
      }, 200)
    }
  }

  const { data: databreadcrumbs } = useGetQuery({
    key: ['api/v1/func_student/path/list/student_id/', id, subjectId],
    url: `/api/v1/func_student/path/list/student_id/${id}`,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!id && !!subjectId && !!session?.accessToken
  })

  const breadcrumbs = [
    { link: '/dashboard/parent/my-children', title: t('myChildren') },
    { link: `/dashboard/parent/my-children/${id}`, title: t('childInfo') },
    { link: ``, title: t('mastery') }
  ]

  //   const breadcrumbs = useMemo(() => {
  //   if (session?.role === 'teacher') {
  //     return [{ link: '', title: t('mastery') }]
  //   }

  //   return [
  //     { link: '/dashboard/parent/my-children', title: t('myChildren') },
  //     { link: `/dashboard/parent/my-children/${id}`, title: t('childInfo') },
  //     { link: '', title: t('mastery') }
  //   ]
  // }, [session?.role, id, t])

  if (isLoading || isFetching) {
    return (
      <div>
        <ContentLoader />
      </div>
    )
  }

  return (
    <LayoutAdmin>
      <div className="p-4">
        <BaseBreadcrumbs data={breadcrumbs} />
        <div className="grid items-start grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Chapters List (Left Column) */}
          <div className="lg:col-span-5 bg-white rounded-xl border p-4 min-h-[400px]">
            <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 ">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-gray-600 rounded-md">
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
                  <p className="text-xs text-gray-500">{t('select')}</p>
                </div>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-xs text-left text-gray-400 uppercase">
                  <th className="w-10 p-2 font-medium">#</th>
                  <th className="p-2 font-medium">{t('title')}</th>
                  <th className="w-1/3 p-2 font-medium">{t('mastery')}</th>
                </tr>
              </thead>
              <tbody>
                {chapters.map((chapter, index) => (
                  <tr
                    key={chapter.chapter_id}
                    onClick={() => handleChapterSelect(chapter)}
                    className={`border-t transition-colors duration-200 cursor-pointer ${
                      selectedChapter?.chapter_id === chapter.chapter_id ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td
                      className={`p-3 w-10 text-center font-medium ${
                        selectedChapter?.chapter_id === chapter.chapter_id ? 'text-blue-600' : 'text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </td>
                    <td
                      className={`p-3 font-medium ${
                        selectedChapter?.chapter_id === chapter.chapter_id ? 'text-blue-600' : ''
                      }`}
                    >
                      {i18n.language === 'ru' ? chapter.chapter_name_ru : chapter.chapter_name_uz}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className=" min-w-[120px] bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5   rounded-full ${
                              chapter.progress === null || chapter.progress === undefined
                                ? 'bg-gray-400'
                                : chapter.progress >= 80
                                  ? 'bg-green-500'
                                  : chapter.progress >= 50
                                    ? 'bg-yellow-400'
                                    : 'bg-red-500'
                            }`}
                            style={{
                              width: `${
                                chapter.progress === null || chapter.progress === undefined ? 0 : chapter.progress
                              }%`
                            }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold text-gray-500">
                          {chapter.progress === null || chapter.progress === undefined ? 0 : chapter.progress}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Topics List (Right Column) */}
          <div className="lg:col-span-7 bg-white rounded-xl border p-4 min-h-[400px] flex flex-col">
            <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 ">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-gray-600 rounded-md">
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
                  <p className="text-xs text-gray-500">{t('topicsList')}</p>
                </div>
              </div>
            </div>
            {isTopicsLoading ? (
              <div className="flex items-center justify-center flex-grow">
                <ContentLoader classNames="!min-h-[500px]" />
              </div>
            ) : selectedChapter ? (
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-left text-gray-400 uppercase">
                    <th className="w-10 p-2 font-medium">#</th>
                    <th className="p-2 font-medium">{t('title')}</th>
                    <th className="w-1/3 p-2 font-medium">{t('mastery')}</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedChapter.topics.map((topic, index) => (
                    <tr key={topic.topic_id} className="border-t">
                      <td className="p-3 font-medium text-center text-gray-500">{index + 1}</td>
                      <td className="p-3">{i18n.language === 'ru' ? topic.topic_name_ru : topic.topic_name_uz}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className=" min-w-[120px] bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5   rounded-full ${
                                topic.score_percent === null || topic.score_percent === undefined
                                  ? 'bg-gray-400'
                                  : topic.score_percent >= 80
                                    ? 'bg-green-500'
                                    : topic.score_percent >= 50
                                      ? 'bg-yellow-400'
                                      : 'bg-red-500'
                              }`}
                              style={{
                                width: `${
                                  topic.score_percent === null || topic.score_percent === undefined
                                    ? 0
                                    : topic.score_percent
                                }%`
                              }}
                            ></div>
                          </div>
                          <span className="text-xs font-semibold text-gray-500">
                            {topic.score_percent === null || topic.score_percent === undefined
                              ? 0
                              : topic.score_percent}
                            %
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center flex-grow">
                <p className="text-gray-500">{t('selectChapter')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default StudentSubjectDetails
