import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { useGetQuery } from '@/hooks'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'

import RightIcon from '@/components/icons/right'
import VideoPlayer from '@/components/video-player'
import ContentLoader from '@/components/loader/content-loader'

import parse from 'html-react-parser'
import StudentBreadcrumbs from '@/features/subjects/StudentBreadcrumbs'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { Button } from '@heroui/react'
import HeaderTitle from '../header-title'

const TopicDetail = ({ basePath = '/dashboard/student/subjects', title = 'subjects', showSidebar = false }) => {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const router = useRouter()
  const { id, chapterId, topicId: topicID } = router.query

  const [selectedTopic, setSelectedTopic] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)

  const {
    data: topics,
    isLoading: isLoadingTopic,
    isFetching: isFetchingTopic
  } = useGetQuery({
    key: `${KEYS.studentTopics}-${chapterId}-${topicID}`,
    url: `${URLS.studentTopics}${chapterId}/`,
    // headers: {
    //   Authorization: `Bearer ${session?.accessToken}` || ''
    // },
    enabled: !!chapterId && !!session?.accessToken
  })

  const topicsList = topics?.data || []

  const handleSelect = (topic) => {
    const idx = topicsList.findIndex((t) => t.id === topic.id)
    if (idx !== -1) {
      setSelectedIndex(idx)
      setSelectedTopic(topic)
      setOpen(false)

      // URL ni yangilash
      router.push(`${basePath}/${id}/${chapterId}/${topic.id}`, undefined, { shallow: true })
    }
  }

  const handleScroll = (direction) => {
    if (!topicsList.length) return

    const newIndex =
      direction === 'left' ? Math.max(selectedIndex - 1, 0) : Math.min(selectedIndex + 1, topicsList.length - 1)

    setSelectedIndex(newIndex)
    setSelectedTopic(topicsList[newIndex])

    // URL ni yangilash
    router.push(`${basePath}/${id}/${chapterId}/${topicsList[newIndex].id}`, undefined, { shallow: true })
  }

  useEffect(() => {
    if (topicsList.length) {
      const found = topicsList.find((topic) => topic.id === Number(topicID))
      const index = topicsList.findIndex((t) => t.id === found?.id)

      // Har doim URL dagi topicID ga mos mavzuni tanlash
      if (found && found.id !== selectedTopic?.id) {
        setSelectedTopic(found)
        setSelectedIndex(index !== -1 ? index : 0)
      }
    }
  }, [topicsList, topicID, selectedTopic?.id])

  if (isLoadingTopic || isFetchingTopic) return <ContentLoader />

  if (!selectedTopic) {
    return (
      <LayoutAdmin>
        <div className="mb-4 border-b">
          {' '}
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

  return (
    <LayoutAdmin>
      <div className="mb-4 border-b">
        {' '}
        <HeaderTitle title={t(title)} />
      </div>

      <StudentBreadcrumbs
        selectTitle={topicName}
        mainLink={basePath}
        subjectName={i18n.language === 'uz' ? selectedTopic.subject_name_uz : selectedTopic.subject_name_ru}
        chapterName={i18n.language === 'uz' ? selectedTopic.chapter_name_uz : selectedTopic.chapter_name_ru}
        topicName={topicName}
      />

      <div className="container px-0 mx-auto font-sf sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E9E9E9] rounded-xl mx-auto max-w-4xl relative">
          {/* Topic Selection Header */}
          <div className="relative flex items-center justify-between w-full p-4 overflow-hidden">
            <button
              className="p-3 text-xl transition rotate-180 bg-white rounded-lg hover:bg-gray-100"
              onClick={() => handleScroll('left')}
            >
              <RightIcon />
            </button>

            <div className="flex-1 text-center cursor-pointer" onClick={() => setOpen(!open)}>
              <h1 className="text-base font-medium text-center break-words sm:text-lg md:text-xl line-clamp-3">
                {topicName}
              </h1>
            </div>

            <button
              className="p-3 text-xl transition bg-white rounded-lg hover:bg-gray-100"
              onClick={() => handleScroll('right')}
            >
              <RightIcon />
            </button>
          </div>

          {/* Dropdown Menu */}
          {open && (
            <motion.div
              initial={{ opacity: 0, translateY: '30px' }}
              animate={{ opacity: 1, translateY: '0px' }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 z-20 w-full max-w-md mx-auto overflow-y-auto bg-white border rounded-md shadow-md max-h-48 top-14"
            >
              <ul className="p-2">
                {topicsList?.map((topic) => (
                  <li
                    key={topic.id}
                    className={`py-2 px-3 flex justify-between text-sm sm:text-base ${
                      topic.locked ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'
                    }`}
                    onClick={() => !topic.locked && handleSelect(topic)}
                  >
                    <p>{i18n.language === 'uz' ? topic.name_uz : topic.name_ru}</p>
                    {topic.locked && <Image src="/icons/lock.svg" alt="lock" width={16} height={16} />}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <div className="w-full h-px bg-[#F2F2F7]"></div>

          {/* Video Section */}
          <div className="flex flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row">
            <div
              className="flex items-center transition-opacity cursor-pointer gap-x-4 hover:opacity-80"
              onClick={() => setShowPlayer(true)}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#EDEDF2] flex items-center justify-center rounded-lg">
                <Image src="/icons/play.svg" alt="play" width={20} height={20} className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-medium sm:text-lg">{t('videoExplanation')}</h3>
                <p className="text-sm text-gray-500">{t('watchBeforeStart')}</p>
              </div>
            </div>

            <div className="flex items-center gap-x-2">
              <Button
                variant="bordered"
                type="button"
                onPress={() => setShowPlayer(true)}
                className="px-4 py-2 text-sm rounded-md sm:text-base"
              >
                {t('watch')}
              </Button>
              {/* Faqat subjects sahifasida "Misollar" tugmasini ko'rsatish */}
              {!basePath.includes('recommendations') && (
                <Link href={`${basePath}/${id}/${chapterId}/${selectedTopic?.id}/question`}>
                  <Button variant="flat" className="px-4 py-2 text-sm rounded-md sm:text-base" color="primary">
                    {t('examples')}
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="w-full h-px bg-[#F2F2F7]"></div>

          {/* Content Section */}
          <div className="px-6 py-6 prose-sm prose sm:prose-base max-w-none">
            <div className="mx-auto">{parse(topicContent || '')}</div>
          </div>

          {showPlayer && <VideoPlayer url={videoUrl} title={topicName} onClose={() => setShowPlayer(false)} />}
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default TopicDetail
