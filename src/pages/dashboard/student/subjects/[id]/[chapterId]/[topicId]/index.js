import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import useGetQuery from '@/hooks/api/useGetQuery'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'
import { useEffect, useRef, useState } from 'react'
import { get } from 'lodash'
import RightIcon from '@/components/icons/right'
import { motion } from 'framer-motion'
// import Button from '@/components/button'
import Image from 'next/image'
import Link from 'next/link'
import parse from 'html-react-parser'
import { useTranslation } from 'react-i18next'
import VideoPlayer from '@/components/video-player'
import ContentLoader from '@/components/loader/content-loader'
import MainWrapper from '@/layout/MainWrapper'
import { Button } from '@heroui/react'
const Index = () => {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [open, setOpen] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const router = useRouter()
  const { id, chapterId, topicId } = router.query
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { topicId: topicID } = router.query

  const scrollRef = useRef(null)

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
  const topicsList = get(topics, 'data', [])

  // const handleScroll = (direction) => {
  //   const scrollAmount = 200;
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollBy({
  //       left: direction === "left" ? -scrollAmount : scrollAmount,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  const handleSelect = (topic) => {
    const idx = topicsList.findIndex((t) => t.id === topic.id)
    if (idx !== -1) {
      setSelectedIndex(idx)
      setSelectedTopic(topic)
      setOpen(false)
    }
  }

  useEffect(() => {
    if (topicsList.length && !selectedTopic) {
      const found = topicsList.find((topic) => topic.id === Number(topicID))
      if (found) {
        setSelectedTopic(found)
        setSelectedIndex(topicsList.findIndex((t) => t.id === found.id))
      } else {
        setSelectedTopic(topicsList[0])
        setSelectedIndex(0)
      }
    }
  }, [topicsList, selectedTopic, topicID])

  // chap-o‘ng tugmalar uchun
  const handleScroll = (direction) => {
    if (!topicsList.length) return

    if (direction === 'left' && selectedIndex > 0) {
      const newIndex = selectedIndex - 1
      setSelectedIndex(newIndex)
      setSelectedTopic(topicsList[newIndex])
    }

    if (direction === 'right' && selectedIndex < topicsList.length - 1) {
      const newIndex = selectedIndex + 1
      setSelectedIndex(newIndex)
      setSelectedTopic(topicsList[newIndex])
    }
  }

  if (isLoadingTopic || isFetchingTopic) {
    return (
      // <Dashboard Темы/разделы>
      <ContentLoader />
      // {/* </Dashboard> */}
    )
  }

  return (
    <MainWrapper title={t('topics')}>
      <div className="font-sf ">
        <div className="col-span-12 border bg-white border-[#E9E9E9] rounded-[12px] mx-[169px] relative">
          <div className="relative flex items-center justify-between w-full overflow-hidden">
            <button
              className="bg-white text-xl px-[12px] py-[15px]  rounded-[12px] rotate-180"
              onClick={() => handleScroll('left')}
            >
              <RightIcon />
            </button>

            <div className="cursor-pointer" onClick={() => setOpen(!open)}>
              <h1 className="text-[17px] text-center">
                {i18n.language === 'uz' ? selectedTopic?.name_uz : selectedTopic?.name_ru}
              </h1>
            </div>

            <button
              className="bg-white text-xl px-[12px] py-[15px]  rounded-[12px]"
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
              className="absolute border max-w-[438px] max-h-[178px] overflow-y-auto w-full rounded-[4px] shadow-md bg-white top-[52px] left-0 right-0 mx-auto "
            >
              <ul className="p-[4px]">
                {get(topics, 'data', []).map((topic, index) => (
                  <li
                    key={index}
                    className={`py-[8px] px-[12px] flex justify-between ${
                      topic.locked ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'
                    }`}
                    onClick={() => handleSelect(topic)}
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
                <Image src={'/icons/play.svg'} alt="play" width={24} height={24} />
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

              <Link href={`/dashboard/student/subjects/${id}/${chapterId}/${topicId}/question`}>
                <Button className="px-[16px] py-[11px] rounded-md" color="primary">
                  {t('takeTest')}
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#F2F2F7]"></div>

          <div className="py-[22px] px-[24px]">
            <div className=" mx-auto bg-white">
              {i18n.language === 'uz' ? parse(selectedTopic?.content_uz || '') : parse(selectedTopic?.content_ru || '')}
            </div>
          </div>

          {showPlayer && (
            <VideoPlayer
              url={i18n.language === 'uz' ? selectedTopic?.video_url_uz : selectedTopic?.video_url_ru}
              title={i18n.language === 'uz' ? selectedTopic?.name_uz : selectedTopic?.name_ru}
              onClose={() => setShowPlayer(false)}
            />
          )}
        </div>
      </div>
    </MainWrapper>
  )
}

export default Index
