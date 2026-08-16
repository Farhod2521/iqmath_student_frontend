import { useEffect, useMemo, useState } from 'react'
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
import PanelCard from '@/modules/student/subjects/components/panel/PanelCard'
import ProgressMeter from '@/modules/student/subjects/components/panel/ProgressMeter'
import MotivationCard from '@/modules/student/subjects/components/panel/MotivationCard'

const ChapterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H5.5A1.5 1.5 0 0 1 4 15.5z" />
    <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H14a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h4.5a1.5 1.5 0 0 0 1.5-1.5z" />
  </svg>
)

const TopicIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
    <path d="M8 6h12M8 12h12M8 18h12" strokeLinecap="round" />
    <circle cx="4" cy="6" r="1.3" fill="white" stroke="none" />
    <circle cx="4" cy="12" r="1.3" fill="white" stroke="none" />
    <circle cx="4" cy="18" r="1.3" fill="white" stroke="none" />
  </svg>
)

/** Mavzu tartib raqami — bajarilganda yashil belgi, boshlanganda binafsha. */
const TopicBadge = ({ index, score }) => {
  const done = Number(score) >= 100
  const started = Number(score) > 0

  const style = done
    ? 'bg-[#e3f5e8] text-[#16a34a]'
    : started
      ? 'bg-[#efeaff] text-[#7c5cfc]'
      : 'bg-[#f2f3f7] text-[#9aa1b9] dark:bg-[#3a4658] dark:text-gray-400'

  return (
    <span
      className={`flex items-center justify-center w-7 h-7 rounded-lg text-[11px] font-bold shrink-0 ${style}`}
      aria-hidden="true"
    >
      {done ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        index + 1
      )}
    </span>
  )
}

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

  const chapters = chapter?.data || []
  const topics = topic?.data || []

  // Fan bo'yicha umumiy progress — barcha boblarning o'rtachasi
  const subjectProgress = useMemo(() => {
    if (!chapters.length) return 0
    const sum = chapters.reduce((acc, item) => acc + (Number(item?.progress) || 0), 0)
    return sum / chapters.length
  }, [chapters])

  // Mavzular paneli tanlangan bobning progressini ko'rsatadi
  const chapterProgress = useMemo(
    () => Number(chapters.find((item) => item.id === selectedChapterId)?.progress) || 0,
    [chapters, selectedChapterId]
  )

  if (isLoadingChapter || isFetchingChapter) {
    return <ContentLoader />
  }

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
          <div className="mb-6 pb-3 border-b border-[#eceaf4] dark:border-[#374151]">
            <div className="flex items-center gap-2 [&>div]:!mb-0">
              <span className="w-[6px] h-[20px] rounded-full bg-[#ff5b8d] shrink-0" />
              <BaseBreadcrumbs
                data={pathList?.map((item) => ({
                  link: '/dashboard/student/subjects',
                  title: i18n.language === 'uz' ? item.title_uz : item.title_ru
                }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
            {/* BOB (Chapter) */}
            <div className="flex flex-col col-span-12 gap-4 md:col-span-6 self-start">
              <PanelCard icon={<ChapterIcon />} title={t('chapter')} subtitle={t('select')} progress={subjectProgress}>
                <ul>
                  {chapters?.map((item, idx) => {
                    const isActive = selectedChapterId === item.id

                    return (
                      <li
                        key={idx}
                        onClick={() => setSelectedChapterId(item.id)}
                        className={`flex items-center justify-between gap-3 px-4 py-3 text-sm uppercase cursor-pointer border-b border-[#f1f0f7] dark:border-[#374151] last:border-b-0 border-l-[3px] transition-colors ${
                          isActive
                            ? 'border-l-[#7c5cfc] bg-[#f6f3ff] dark:bg-[#2b3648]'
                            : 'border-l-transparent hover:bg-[#faf9ff] dark:hover:bg-[#2b3648]'
                        }`}
                      >
                        <MathJax>
                          <span
                            className={`break-words ${isActive ? 'font-semibold text-[#1f2a5b] dark:text-white' : 'text-[#4a5273] dark:text-gray-300'}`}
                          >
                            {i18n.language === 'uz' ? item?.name_uz : item?.name_ru}
                          </span>
                        </MathJax>
                        <ProgressMeter value={item?.progress} />
                      </li>
                    )
                  })}
                </ul>
              </PanelCard>

              <MotivationCard />
            </div>

            {/* MAVZU (Topic) */}
            {selectedChapterId && (
              <div className="col-span-12 md:col-span-6 self-start">
                <PanelCard
                  icon={<TopicIcon />}
                  title={t('topic')}
                  subtitle={t('topicsList')}
                  progress={chapterProgress}
                  accent="green"
                >
                  {isLoadingTopic || isFetchingTopic ? (
                    <ContentLoader />
                  ) : topics.length > 0 ? (
                    <ul>
                      {topics?.map((item, index) =>
                        item.is_open ? (
                          <li
                            key={index}
                            onClick={() => router.push(`/dashboard/student/subjects/${id}/${selectedChapterId}/${item.id}`)}
                            className="flex items-center justify-between gap-3 px-4 py-3 text-sm uppercase cursor-pointer border-b border-[#f1f0f7] dark:border-[#374151] last:border-b-0 hover:bg-[#f6fbf7] dark:hover:bg-[#2b3648] transition-colors"
                          >
                            <div className="flex items-center min-w-0 gap-3">
                              <TopicBadge index={index} score={item.score} />
                              <MathJax>
                                <span className="break-words text-[#4a5273] dark:text-gray-300">
                                  {i18n.language === 'uz' ? item.name_uz : item.name_ru}
                                </span>
                              </MathJax>
                            </div>

                            {(typeof item.score === 'number' || item.score === null) && (
                              <ProgressMeter value={item.score} />
                            )}
                          </li>
                        ) : (
                          <Popover key={index} size="md" showArrow backdrop="opaque" classNames={{ content: 'max-w-[400px]' }}>
                            <PopoverTrigger>
                              <li className="flex items-center justify-between gap-3 px-4 py-3 text-sm uppercase border-b border-[#f1f0f7] dark:border-[#374151] last:border-b-0 opacity-50 cursor-pointer">
                                <div className="flex items-center min-w-0 gap-3">
                                  <TopicBadge index={index} score={0} />
                                  <span className="break-words text-[#4a5273] dark:text-gray-300">
                                    {i18n.language === 'uz' ? item.name_uz : item.name_ru}
                                  </span>
                                </div>
                                <Image src="/icons/lock.svg" alt="lock" width={18} height={18} />
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
                    <div className="flex flex-col items-center justify-center h-48 gap-2 px-4 text-center">
                      <InfoCircleIcon />
                      <h3 className="text-sm font-normal text-[#8189a8]">{t('noTopicsInThisSection')}</h3>
                    </div>
                  )}
                </PanelCard>
              </div>
            )}
          </div>
        </div>
      </MathJaxContext>
    </LayoutAdmin>
  )
}

export default SubjectsPage
