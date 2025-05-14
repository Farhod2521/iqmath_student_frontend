import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import useGetQuery from '@/hooks/api/useGetQuery'
import { useSession } from 'next-auth/react'
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import RightIcon from '@/components/icons/right'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTopicStore } from '@/store'
import Button from '@/components/button'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'
import VideoPlayer from '@/components/video-player'
import ContentLoader from '@/components/loader/content-loader'

const Index = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const { id } = router.query

  const [showPlayer, setShowPlayer] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedTopic, setSelectedTopic] = useState(null)

  const {
    data: advisedTopics,
    isLoading: isLoadingTopic,
    isFetching: isFetchingTopic
  } = useGetQuery({
    key: KEYS.advisedTopics,
    url: URLS.advisedTopics,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!session?.accessToken,
    params: { level: 1 }
  })

  const { data: topics } = useGetQuery({
    key: KEYS.diagnosticsTopics,
    url: `${URLS.diagnosticsTopics}${id}/`,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!id && !!session?.accessToken
  })

  const handleSelect = (topic) => {
    const idx = topicsList.findIndex((t) => t.id === topic.id)
    if (idx !== -1) {
      setSelectedIndex(idx)
      setSelectedTopic(topic)
      setOpen(false)
    }
  }

  const topicsList = get(advisedTopics, 'data.topics', [])
  const handleScroll = (direction) => {
    if (!topicsList.length) return

    const newIndex =
      direction === 'left' ? Math.max(selectedIndex - 1, 0) : Math.min(selectedIndex + 1, topicsList.length - 1)

    setSelectedIndex(newIndex)
    setSelectedTopic(topicsList[newIndex])

    // setSelectTopicId(topicsList[newIndex]?.id)
  }

  useEffect(() => {
    if (topicsList.length && !selectedTopic) {
      setSelectedTopic(topicsList[0])
      setSelectedIndex(0)
    }
  }, [topicsList])

  if (isLoadingTopic || isFetchingTopic) return <ContentLoader />

  const topicName = i18n.language === 'uz' ? selectedTopic?.name_uz : selectedTopic?.name_ru

  return (
    <div className="font-sf">
      <div className="col-span-12 border shadow-sm rounded-[12px] mx-[169px] relative">
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

          <button className="bg-white text-xl px-[12px] py-[15px] rounded-[12px]" onClick={() => handleScroll('right')}>
            <RightIcon />
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, translateY: '30px' }}
            animate={{ opacity: 1, translateY: '0px' }}
            transition={{ duration: 0.2 }}
            className="absolute border max-w-[438px] max-h-[178px] overflow-y-auto w-full rounded-[4px] shadow-md bg-white top-[52px] left-0 right-0 mx-auto"
          >
            <ul className="p-[4px]">
              {topicsList.map((topic, index) => (
                <li
                  key={index}
                  className={`py-[8px] px-[12px] flex justify-between ${
                    topic.locked ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'
                  }`}
                  onClick={() => !topic.locked && handleSelect(topic)}
                >
                  <p>{topic.name_uz}</p>
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
            <Button
              onclick={() => setShowPlayer(true)}
              border="border border-[#D1D1D6]"
              px="px-[16px]"
              py="py-[11px]"
              classname="bg-white !text-black"
            >
              {t('watch')}
            </Button>

            <Link href={`/dashboard/student/diagnostics/recommended-topics/${selectedTopic?.id}/question`}>
              <Button px="px-[16px]" py="py-[11px]">
                {t('takeTest')}
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#F2F2F7]"></div>

        <div className="py-[22px] px-[24px]">
          <div className="mx-auto bg-white">
            {i18n.language === 'uz'
              ? parse(get(topics, 'data.content_uz') || '')
              : parse(get(topics, 'data.content_ru') || '')}
          </div>
        </div>

        {showPlayer && (
          <VideoPlayer
            url={i18n.language === 'uz' ? get(topics, 'data.video_url_uz') : get(topics, 'data.video_url_ru')}
            title={i18n.language === 'uz' ? get(topics, 'data.name_uz') : get(topics, 'data.name_ru')}
            onClose={() => setShowPlayer(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Index
