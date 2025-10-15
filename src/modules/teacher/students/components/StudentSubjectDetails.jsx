import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'

import ContentLoader from '@/components/loader/content-loader'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import LayoutAdmin from '@/layout/LayoutAdmin'

const StudentSubjectDetails = () => {
  const router = useRouter()
  const { id, subjectId, subjectName } = router.query
  const { data: session } = useSession()
  const { t } = useTranslation()

  const [chapters, setChapters] = useState([])
  const [selectedChapter, setSelectedChapter] = useState(null)
  const [isTopicsLoading, setIsTopicsLoading] = useState(false)

  const { data, isLoading, isFetching } = useGetQuery({
    key: [KEYS.studentSubjectChapters, id, subjectId],
    url: id && subjectId ? `${URLS.studentSubjectChapters}${id}/subjects/${subjectId}/chapters/` : null,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
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

  if (isLoading || isFetching) {
    return (
      <div>
        <ContentLoader />
      </div>
    )
  }

  return (
    <LayoutAdmin>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Chapters List (Left Column) */}
          <div className="lg:col-span-5 bg-white rounded-xl border p-4 min-h-[400px]">
            <h3 className="text-lg font-semibold mb-2">{t('chapters')}</h3>
            <table className="w-full">
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
                      {chapter.chapter_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Topics List (Right Column) */}
          <div className="lg:col-span-7 bg-white rounded-xl border p-4 min-h-[400px] flex flex-col">
            <h3 className="text-lg font-semibold mb-2">{t('topics')}</h3>

            {isTopicsLoading ? (
              <div className="flex-grow flex items-center justify-center">
                <ContentLoader classNames="!min-h-[500px]" />
              </div>
            ) : selectedChapter ? (
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-400 uppercase">
                    <th className="p-2 font-medium w-10">#</th>
                    <th className="p-2 font-medium">{t('title')}</th>
                    <th className="p-2 font-medium w-1/3">{t('mastery')}</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedChapter.topics.map((topic, index) => (
                    <tr key={topic.topic_id} className="border-t">
                      <td className="p-3 text-center font-medium text-gray-500">{index + 1}</td>
                      <td className="p-3">{topic.topic_name}</td>
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
                          <span className="font-semibold text-xs text-gray-500">
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
              <div className="flex-grow flex items-center justify-center">
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
