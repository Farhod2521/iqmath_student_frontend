import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import useGetQuery from '@/hooks/api/useGetQuery'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'

import RightIcon from '@/components/icons/right'
import VideoPlayer from '@/components/video-player'
import ContentLoader from '@/components/loader/content-loader'

import parse from 'html-react-parser'
import StudentBreadcrumbs from '@/features/subjects/StudentBreadcrumbs'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { Button } from '@heroui/react'

const Index = () => {
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
    key: KEYS.studentTopics,
    url: `${URLS.studentTopics}${chapterId}/`,
    headers: {
      Authorization: `Bearer ${session?.accessToken}` || ''
    },
    enabled: !!chapterId && !!session?.accessToken
  })

  const topicsList = topics?.data || []

  const handleSelect = (topic) => {
    const idx = topicsList.findIndex((t) => t.id === topic.id)
    if (idx !== -1) {
      setSelectedIndex(idx)
      setSelectedTopic(topic)
      setOpen(false)
    }
  }

  const handleScroll = (direction) => {
    if (!topicsList.length) return

    const newIndex =
      direction === 'left' ? Math.max(selectedIndex - 1, 0) : Math.min(selectedIndex + 1, topicsList.length - 1)

    setSelectedIndex(newIndex)
    setSelectedTopic(topicsList[newIndex])
  }

  useEffect(() => {
    if (topicsList.length && !selectedTopic) {
      const found = topicsList.find((topic) => topic.id === Number(topicID))
      const index = topicsList.findIndex((t) => t.id === found?.id)

      setSelectedTopic(found || topicsList[0])
      setSelectedIndex(index !== -1 ? index : 0)
    }
  }, [topicsList, selectedTopic, topicID])

  if (isLoadingTopic || isFetchingTopic) return <ContentLoader />

  const topicName = i18n.language === 'uz' ? selectedTopic?.name_uz : selectedTopic?.name_ru
  const topicContent = i18n.language === 'uz' ? selectedTopic?.content_uz : selectedTopic?.content_ru
  const videoUrl = i18n.language === 'uz' ? selectedTopic?.video_url_uz : selectedTopic?.video_url_ru

  return (
    <LayoutAdmin title={t('subjects')}>
      <StudentBreadcrumbs selectTitle={topicName} mainLink="/dashboard/student/subjects" />
      <div className="font-sf container mx-auto px-0 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E9E9E9] rounded-xl mx-auto max-w-4xl relative">
          {/* Topic Selection Header */}
          <div className="relative flex items-center justify-between w-full overflow-hidden p-4">
            <button
              className="bg-white text-xl p-3 rounded-lg rotate-180 hover:bg-gray-100 transition"
              onClick={() => handleScroll('left')}
            >
              <RightIcon />
            </button>

            <div className="cursor-pointer flex-1 text-center" onClick={() => setOpen(!open)}>
              <h1 className="text-base sm:text-lg md:text-xl font-medium text-center break-words line-clamp-3">
                {topicName}
              </h1>
            </div>

            <button
              className="bg-white text-xl p-3 rounded-lg hover:bg-gray-100 transition"
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
              className="absolute border w-full max-w-md z-20 max-h-48 overflow-y-auto rounded-md shadow-md bg-white top-14 left-0 right-0 mx-auto"
            >
              <ul className="p-2">
                {topicsList.map((topic) => (
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
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 gap-4">
            <div className="flex gap-x-4 items-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#EDEDF2] flex items-center justify-center rounded-lg">
                <Image src="/icons/play.svg" alt="play" width={20} height={20} className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-medium">{t('videoExplanation')}</h3>
                <p className="text-gray-500 text-sm">{t('watchBeforeStart')}</p>
              </div>
            </div>

            <div className="flex items-center gap-x-2">
              <Button
                variant="bordered"
                type="button"
                onPress={() => setShowPlayer(true)}
                className="rounded-md text-sm sm:text-base px-4 py-2"
              >
                {t('watch')}
              </Button>
              <Link href={`/dashboard/student/subjects/${id}/${chapterId}/${selectedTopic?.id}/question`}>
                <Button variant="flat" className="px-4 py-2 rounded-md text-sm sm:text-base" color="primary">
                  {t('examples')}
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full h-px bg-[#F2F2F7]"></div>

          {/* Content Section */}
          <div className="py-6 px-6 prose prose-sm sm:prose-base max-w-none">
            <div className="mx-auto">{parse(topicContent || '')}</div>
          </div>

          {showPlayer && <VideoPlayer url={videoUrl} title={topicName} onClose={() => setShowPlayer(false)} />}
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default Index
