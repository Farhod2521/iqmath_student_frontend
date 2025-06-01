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
import MainWrapper from '@/layout/MainWrapper'
import { Button } from '@heroui/react'
import parse from 'html-react-parser'
import BaseBreadcrumbs from '@/components/breadcrumb/Breadcrumbs'
import StudentBreadcrumbs from '@/features/subjects/StudentBreadcrumbs'

const Index = () => {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const router = useRouter()
  const { id, chapterId, topicId: topicID } = router.query

  const [selectedTopic, setSelectedTopic] = useState(null)
  const [selectTopicId, setSelectTopicId] = useState(topicID)
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
      setSelectTopicId(topic?.id)
      setOpen(false)
    }
  }

  const handleScroll = (direction) => {
    if (!topicsList.length) return

    const newIndex =
      direction === 'left' ? Math.max(selectedIndex - 1, 0) : Math.min(selectedIndex + 1, topicsList.length - 1)

    setSelectedIndex(newIndex)
    setSelectedTopic(topicsList[newIndex])
    setSelectTopicId(topicsList[newIndex]?.id)
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

  const breadcrumbs = [
    { link: '/dashboard/student/subjects', title: t('main') },
    { link: `/dashboard/student/subjects/${id}`, title: t('theory') },
    { link: '', title: topicName }
  ]

  return (
    <MainWrapper title={t('subjects')}>
      <StudentBreadcrumbs selectTitle={topicName} />
      {/* <BaseBreadcrumbs data={breadcrumbs} /> */}
      <div className="font-sf">
        <div className="col-span-12 bg-white border border-[#E9E9E9] rounded-[12px] mx-[169px] relative">
          <div className="relative flex items-center justify-between w-full overflow-hidden">
            <button
              className="bg-white text-xl px-[12px] py-[15px] rounded-[12px] rotate-180"
              onClick={() => handleScroll('left')}
            >
              <RightIcon />
            </button>

            <div className="cursor-pointer" onClick={() => setOpen(!open)}>
              <h1 className="text-[17px] text-center">{topicName}</h1>
            </div>

            <button
              className="bg-white text-xl px-[12px] py-[15px] rounded-[12px]"
              onClick={() => handleScroll('right')}
            >
              <RightIcon />
            </button>
          </div>

          {open && (
            <motion.div
              initial={{ opacity: 0, translateY: '30px' }}
              animate={{ opacity: 1, translateY: '0px' }}
              transition={{ duration: 0.2 }}
              className="absolute border max-w-[438px] z-20 max-h-[178px] overflow-y-auto w-full rounded-[4px] shadow-md bg-white top-[52px] left-0 right-0 mx-auto"
            >
              <ul className="p-[4px]">
                {topicsList.map((topic) => (
                  <li
                    key={topic.id}
                    className={`py-[8px] px-[12px] flex justify-between ${
                      topic.locked ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'
                    }`}
                    onClick={() => !topic.locked && handleSelect(topic)}
                  >
                    <p>{i18n.language === 'uz' ? topic.name_uz : topic.name_ru}</p>
                    {topic.locked && <Image src="/icons/lock.svg" alt="lock" width={19} height={19} />}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <div className="w-full h-[1px] bg-[#F2F2F7]"></div>

          <div className="flex justify-between py-[12px] px-[24px]">
            <div className="flex gap-x-[15px] items-center">
              <div className="w-[60px] h-[60px] bg-[#EDEDF2] flex items-center justify-center rounded-[8px]">
                <Image src="/icons/play.svg" alt="play" width={24} height={24} />
              </div>
              <div className="space-y-[4px]">
                <h3 className="text-[17px] font-medium">{t('videoExplanation')}</h3>
                <p className="text-[#8A8A8E]">{t('watchBeforeStart')}</p>
              </div>
            </div>

            <div className="flex items-center gap-x-[8px]">
              <Button onPress={() => setShowPlayer(true)} className="rounded-md">
                {t('watch')}
              </Button>
              <Link href={`/dashboard/student/subjects/${id}/${chapterId}/${selectTopicId}/question`}>
                <Button className="px-[16px] py-[11px] rounded-md" color="primary">
                  {t('examples')}
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#F2F2F7]"></div>

          <div className="py-[22px] px-[24px]">
            <div className="mx-auto bg-white">{parse(topicContent || '')}</div>
          </div>

          {showPlayer && <VideoPlayer url={videoUrl} title={topicName} onClose={() => setShowPlayer(false)} />}
        </div>
      </div>
    </MainWrapper>
  )
}

export default Index
