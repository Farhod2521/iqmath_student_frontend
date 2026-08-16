import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { useGetQuery } from '@/hooks'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'

import RightIcon from '@/components/icons/right'
import ContentLoader from '@/components/loader/content-loader'

import parse from 'html-react-parser'
import StudentBreadcrumbs from '@/features/subjects/StudentBreadcrumbs'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { Button } from '@heroui/react'
import HeaderTitle from '../header-title'

// ReactPlayer brauzer API'lariga tayanadi — serverda render qilinmasin
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

const formatDuration = (seconds) => {
  if (!seconds) return '—'
  const total = Math.round(seconds)
  const mm = Math.floor(total / 60)
  const ss = total % 60
  return `${mm}:${String(ss).padStart(2, '0')}`
}

const StatTile = ({ icon, label, value, valueClass = '' }) => (
  <div className="flex items-center gap-3 px-4 py-3 bg-white border rounded-2xl border-[#eceaf4] dark:bg-[#252f3f] dark:border-[#374151]">
    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#f3f0ff] text-[#7c5cfc] shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[11px] text-[#8189a8] dark:text-gray-400 truncate">{label}</p>
      <p className={`text-sm font-semibold text-[#1f2a5b] dark:text-white truncate ${valueClass}`}>{value}</p>
    </div>
  </div>
)

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" strokeLinecap="round" />
  </svg>
)

const ChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M5 19V11M12 19V5M19 19v-6" strokeLinecap="round" />
  </svg>
)

const ListIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M8 6h12M8 12h12M8 18h12" strokeLinecap="round" />
    <circle cx="4" cy="6" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="4" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="4" cy="18" r="1.2" fill="currentColor" stroke="none" />
  </svg>
)

const TopicDetail = ({ basePath = '/dashboard/student/subjects', title = 'subjects' }) => {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const router = useRouter()
  const { id, chapterId, topicId: topicID } = router.query

  const [selectedTopic, setSelectedTopic] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [duration, setDuration] = useState(0)

  const {
    data: topics,
    isLoading: isLoadingTopic,
    isFetching: isFetchingTopic
  } = useGetQuery({
    key: `${KEYS.studentTopics}-${chapterId}-${topicID}`,
    url: `${URLS.studentTopics}${chapterId}/`,
    enabled: !!chapterId && !!session?.accessToken
  })

  const topicsList = useMemo(() => topics?.data || [], [topics])

  const goToTopic = (topic, index) => {
    setSelectedIndex(index)
    setSelectedTopic(topic)
    setDuration(0)
    router.push(`${basePath}/${id}/${chapterId}/${topic.id}`, undefined, { shallow: true })
  }

  const handleSelect = (topic) => {
    const idx = topicsList.findIndex((item) => item.id === topic.id)
    if (idx !== -1) goToTopic(topic, idx)
  }

  const handleScroll = (direction) => {
    if (!topicsList.length) return

    const newIndex =
      direction === 'left' ? Math.max(selectedIndex - 1, 0) : Math.min(selectedIndex + 1, topicsList.length - 1)

    if (newIndex !== selectedIndex) goToTopic(topicsList[newIndex], newIndex)
  }

  useEffect(() => {
    if (topicsList.length) {
      const found = topicsList.find((topic) => topic.id === Number(topicID))
      const index = topicsList.findIndex((item) => item.id === found?.id)

      if (found && found.id !== selectedTopic?.id) {
        setSelectedTopic(found)
        setSelectedIndex(index !== -1 ? index : 0)
        setDuration(0)
      }
    }
  }, [topicsList, topicID, selectedTopic?.id])

  // Yakunlangan darslar soni — pastdagi umumiy progress uchun
  const completedCount = useMemo(
    () => topicsList.filter((item) => Number(item?.score) >= 100).length,
    [topicsList]
  )

  if (isLoadingTopic || isFetchingTopic) return <ContentLoader />

  if (!selectedTopic) {
    return (
      <LayoutAdmin>
        <div className="mb-4 border-b">
          <HeaderTitle title={t(title)} />
        </div>
        <div className="flex items-center justify-center h-48">
          <h3 className="text-base font-normal text-gray-500">{t('topicNotFound')}</h3>
        </div>
      </LayoutAdmin>
    )
  }

  const topicName = i18n.language === 'uz' ? selectedTopic?.name_uz : selectedTopic?.name_ru
  const topicContent = i18n.language === 'uz' ? selectedTopic?.content_uz : selectedTopic?.content_ru
  const videoUrl = i18n.language === 'uz' ? selectedTopic?.video_url_uz : selectedTopic?.video_url_ru
  const score = Math.round(Number(selectedTopic?.score) || 0)

  return (
    <LayoutAdmin>
      <div className="font-sf">
        <StudentBreadcrumbs selectTitle={topicName} mainLink={basePath} />

        <div className="grid grid-cols-12 gap-5 lg:gap-6">
          {/* ============ CHAP USTUN ============ */}
          <div className="col-span-12 lg:col-span-8">
            {/* Sarlavha + navigatsiya */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
              <h1 className="text-[22px] sm:text-[26px] lg:text-[30px] font-bold leading-tight text-[#1f2a5b] dark:text-white break-words min-w-0">
                {topicName}
              </h1>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  aria-label={t('previous')}
                  disabled={selectedIndex === 0}
                  onClick={() => handleScroll('left')}
                  className="flex items-center justify-center w-10 h-10 rotate-180 transition border rounded-xl border-[#eceaf4] hover:bg-[#f6f3ff] disabled:opacity-40 disabled:hover:bg-transparent dark:border-[#374151]"
                >
                  <RightIcon />
                </button>
                <button
                  type="button"
                  aria-label={t('next')}
                  disabled={selectedIndex === topicsList.length - 1}
                  onClick={() => handleScroll('right')}
                  className="flex items-center justify-center w-10 h-10 transition border rounded-xl border-[#eceaf4] hover:bg-[#f6f3ff] disabled:opacity-40 disabled:hover:bg-transparent dark:border-[#374151]"
                >
                  <RightIcon />
                </button>

                {!basePath.includes('recommendations') && (
                  <Link href={`${basePath}/${id}/${chapterId}/${selectedTopic?.id}/question`}>
                    <Button className="h-10 px-5 text-sm font-semibold text-white rounded-xl bg-[#7c5cfc]">
                      {t('examples')}
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Video — sahifa ochilishi bilan ko'rinib turadi */}
            <div className="overflow-hidden bg-white border rounded-2xl border-[#eceaf4] dark:bg-[#252f3f] dark:border-[#374151]">
              <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[#eceaf4] bg-[#faf9ff] dark:bg-[#2b3648] dark:border-[#374151]">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#7c5cfc]">
                  <Image src="/icons/play.svg" alt="" width={14} height={14} />
                  {t('videoExplanation')}
                </span>
                {duration > 0 && (
                  <span className="text-xs text-[#8189a8] dark:text-gray-400">{formatDuration(duration)}</span>
                )}
              </div>

              {videoUrl ? (
                <div className="relative w-full bg-black aspect-video">
                  <ReactPlayer
                    url={videoUrl}
                    controls
                    width="100%"
                    height="100%"
                    className="absolute top-0 left-0"
                    onDuration={setDuration}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full gap-2 aspect-video bg-[#faf9ff] dark:bg-[#2b3648]">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white text-[#b3b8cc] dark:bg-white/10">
                    <ClockIcon />
                  </div>
                  <p className="text-sm text-[#8189a8]">{t('videoNotAvailable')}</p>
                </div>
              )}
            </div>

            {/* Statistika plitkalari */}
            <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-3">
              <StatTile icon={<ClockIcon />} label={t('videoDuration')} value={formatDuration(duration)} />
              <StatTile
                icon={<ChartIcon />}
                label={t('mastery')}
                value={`${score}%`}
                valueClass={score >= 100 ? 'text-[#16a34a]' : ''}
              />
              <StatTile
                icon={<ListIcon />}
                label={t('lessonNumber')}
                value={`${selectedIndex + 1} / ${topicsList.length}`}
              />
            </div>

            {/* Mavzu matni */}
            {topicContent ? (
              <div className="mt-4 overflow-hidden bg-white border rounded-2xl border-[#eceaf4] dark:bg-[#252f3f] dark:border-[#374151]">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-[#eceaf4] bg-[#faf9ff] dark:bg-[#2b3648] dark:border-[#374151]">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#7c5cfc] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                      <path d="M12 4 2 9l10 5 10-5z" strokeLinejoin="round" />
                      <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h2 className="text-[15px] font-bold text-[#1f2a5b] dark:text-white">{t('aboutTopic')}</h2>
                </div>

                <div className="px-5 py-5 prose-sm prose sm:prose-base max-w-none dark:prose-invert">
                  {parse(topicContent)}
                </div>
              </div>
            ) : null}
          </div>

          {/* ============ O'NG USTUN: DARS REJASI ============ */}
          <aside className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-4 overflow-hidden bg-white border rounded-2xl border-[#eceaf4] dark:bg-[#252f3f] dark:border-[#374151] shadow-[0px_4px_20px_-12px_#00000040]">
              <div className="px-5 py-4 border-b border-[#eceaf4] dark:border-[#374151]">
                <h2 className="text-[15px] font-bold text-[#1f2a5b] dark:text-white">{t('lessonPlan')}</h2>
              </div>

              <ul className="max-h-[46vh] lg:max-h-[52vh] overflow-y-auto">
                {topicsList.map((item, index) => {
                  const isActive = item.id === selectedTopic.id
                  const isLocked = item.is_open === false
                  const isDone = Number(item?.score) >= 100

                  return (
                    <li
                      key={item.id}
                      onClick={() => !isLocked && handleSelect(item)}
                      className={`flex items-center gap-3 px-4 py-3 border-b border-[#f1f0f7] dark:border-[#374151] last:border-b-0 transition-colors ${
                        isLocked
                          ? 'opacity-50 cursor-not-allowed'
                          : `cursor-pointer ${isActive ? 'bg-[#f6f3ff] dark:bg-[#2b3648]' : 'hover:bg-[#faf9ff] dark:hover:bg-[#2b3648]'}`
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-7 h-7 rounded-lg text-[11px] font-bold shrink-0 ${
                          isActive
                            ? 'bg-[#7c5cfc] text-white'
                            : 'bg-[#f2f3f7] text-[#9aa1b9] dark:bg-[#3a4658] dark:text-gray-400'
                        }`}
                      >
                        {index + 1}
                      </span>

                      <span
                        className={`flex-1 min-w-0 text-sm break-words ${
                          isActive
                            ? 'font-semibold text-[#7c5cfc]'
                            : 'text-[#4a5273] dark:text-gray-300'
                        }`}
                      >
                        {i18n.language === 'uz' ? item.name_uz : item.name_ru}
                      </span>

                      {isLocked ? (
                        <Image src="/icons/lock.svg" alt="lock" width={16} height={16} />
                      ) : isDone ? (
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#22c55e] shrink-0">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
                            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-[#8189a8] shrink-0">
                          {Math.round(Number(item?.score) || 0)}%
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>

              {/* Umumiy progress */}
              <div className="p-4 border-t border-[#eceaf4] dark:border-[#374151]">
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#f6f3ff] dark:bg-[#2b3648]">
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white text-[#7c5cfc] shrink-0 dark:bg-white/10">
                    <ChartIcon />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1f2a5b] dark:text-white">{t('overallProgress')}</p>
                    <div className="h-[6px] mt-1.5 rounded-full bg-white dark:bg-[#3a4658] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#a78bfa] to-[#7c5cfc] transition-all duration-500"
                        style={{
                          width: `${topicsList.length ? (completedCount / topicsList.length) * 100 : 0}%`
                        }}
                      />
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-[#6b7394] dark:text-gray-300 shrink-0">
                    {completedCount} / {topicsList.length} {t('lessons').toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default TopicDetail
