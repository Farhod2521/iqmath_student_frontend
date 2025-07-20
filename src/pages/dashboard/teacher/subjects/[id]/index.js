import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import useGetQuery from '@/hooks/api/useGetQuery'
import { useSession } from 'next-auth/react'
import { get } from 'lodash'
import Button from '@/components/button'
import usePostQuery from '@/hooks/api/usePostQuery'
import { useState, useEffect } from 'react'
import SimpleModalTeacher from '@/components/modal/simple-modal-teacher'
import Image from 'next/image'
import Input from '@/components/input'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { CKEditor } from 'ckeditor4-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useQueryClient } from '@tanstack/react-query'
import EditIcon from '@/components/icons/edit'
import TrashIcon from '@/components/icons/trash'
import usePutQuery from '@/hooks/api/usePutQuery'
import useDeleteQuery from '@/hooks/api/useDeleteQuery'
import { config } from '@/config'
import { useTranslation } from 'react-i18next'
import InfoCircleIcon from '@/components/icons/info-circle'
import ContentLoader from '@/components/loader/content-loader'
import QuestionCountIcon from '@/components/icons/question-count'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableTableRow from '@/modules/teacher/subjects/components/sortable-table-row'
import Link from 'next/link'
import LayoutAdmin from '@/layout/LayoutAdmin'

const Index = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const { id } = router.query
  const [dataChapter, setDataChapter] = useState([])
  const { data: session } = useSession()
  const [newChapter, setNewChapter] = useState('')
  const [newChapterRu, setNewChapterRu] = useState('')
  const [modalTypeOfChapter, setModalTypeOfChapter] = useState('create')
  const [topicName, setTopicName] = useState('')
  const [topicNameRu, setTopicNameRu] = useState('')
  const [modalTypeOfTopic, setModalTypeOfTopic] = useState('create')
  const [content, setContent] = useState('')
  const [contentRu, setContentRu] = useState('')
  const [videoLink, setVideoLink] = useState('')
  const [videoLinkRu, setVideoLinkRu] = useState('')
  const [openChapterModal, setOpenChapterModal] = useState(false)
  const [openTopicsModal, setOpenTopicsModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [chapters, setChapters] = useState([])
  const [topics, setTopics] = useState([])
  const [isChaptersDragEnabled, setIsChaptersDragEnabled] = useState(false)
  const [isTopicsDragEnabled, setIsTopicsDragEnabled] = useState(false)
  const queryClient = useQueryClient()

  const {
    data: chaptersData,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.chapters,
    url: `${URLS.chapters}${id}/`,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!session?.accessToken
  })

  const {
    data: topicsData,
    isLoading: isLoadingTopics,
    isFetching: isFetchingTopics
  } = useGetQuery({
    key: [KEYS.topics, selectedId],
    url: selectedId ? `${URLS.topics}${selectedId}/` : null,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!selectedId && !!session?.accessToken
  })

  const { mutate: reorderChapters } = usePostQuery({
    key: 'reorder-chapters'
  })

  const { mutate: reorderTopics } = usePostQuery({
    key: 'reorder-topics'
  })

  useEffect(() => {
    if (chaptersData?.data) {
      setChapters(chaptersData.data)
    }
  }, [chaptersData])

  useEffect(() => {
    if (topicsData?.data) {
      setTopics(topicsData.data)
    }
  }, [topicsData])

  useEffect(() => {
    const chapterList = get(chaptersData, 'data', [])
    if (chapterList.length > 0 && !selectedId) {
      setSelectedId(get(chapterList[0], 'id'))
    }
  }, [chaptersData])

  const handleChaptersDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = chapters.findIndex((item) => item.id === active.id)
      const newIndex = chapters.findIndex((item) => item.id === over.id)

      const newOrder = arrayMove(chapters, oldIndex, newIndex)
      setChapters(newOrder)

      // Send reorder request to backend
      const orderedIds = newOrder.map((item) => item.id)
      reorderChapters(
        {
          url: URLS.reorderChapters,
          attributes: {
            ordered_ids: orderedIds
          },
          config: {
            headers: { Authorization: `Bearer ${session?.accessToken}` }
          }
        },
        {
          onSuccess: () => {
            // toast.success("Boblar ketma-ketligi o'zgartirildi");
          },
          onError: (error) => {
            toast.error(error.response?.data?.error || 'Xatolik yuz berdi')
            // Revert to original order on error
            setChapters(chaptersData.data)
          }
        }
      )
    }
  }

  const handleTopicsDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = topics.findIndex((item) => item.id === active.id)
      const newIndex = topics.findIndex((item) => item.id === over.id)

      const newOrder = arrayMove(topics, oldIndex, newIndex)
      setTopics(newOrder)

      // Send reorder request to backend
      const orderedIds = newOrder.map((item) => item.id)
      reorderTopics(
        {
          url: URLS.reorderTopics,
          attributes: {
            ordered_ids: orderedIds
          },
          config: {
            headers: { Authorization: `Bearer ${session?.accessToken}` }
          }
        },
        {
          onSuccess: () => {
            // toast.success("Mavzular ketma-ketligi o'zgartirildi");
          },
          onError: (error) => {
            toast.error(error.response?.data?.error || 'Xatolik yuz berdi')
            // Revert to original order on error
            setTopics(topicsData.data)
          }
        }
      )
    }
  }

  // Bob yaratish
  const { mutate: createChapter } = usePostQuery({
    key: 'create-chapter'
  })

  const onSubmitCreateChapter = () => {
    createChapter(
      {
        url: URLS.createChapter,
        attributes: {
          subject: +id,
          name_uz: newChapter,
          name_ru: newChapterRu
        },
        config: {
          headers: { Authorization: `Bearer ${session?.accessToken}` }
        }
      },
      {
        onSuccess: () => {
          setOpenChapterModal(false)
          setNewChapter('')
          toast.success('Bob muvaqqiyatli yaratildi')
          queryClient.invalidateQueries([KEYS.chapters])
        },
        onError: (error) => {
          console.log('Full error response:')

          toast.error(error.response?.data.error)
        }
      }
    )
  }

  // Bob o'zgartirish

  const { mutate: updateChapter } = usePutQuery({
    listKeyId: 'update-chapter'
  })

  const onSubmitUpdateChapter = () => {
    updateChapter(
      {
        url: `${URLS.updateChapter}${selectedId}/`,
        attributes: {
          subject: +id,
          name_uz: newChapter,
          name_ru: newChapterRu
        },
        config: {
          headers: { Authorization: `Bearer ${session?.accessToken}` }
        }
      },
      {
        onSuccess: () => {
          setOpenChapterModal(false)
          setNewChapter('')
          toast.success('Bob muvaqqiyatli yaratildi')
          queryClient.invalidateQueries([KEYS.chapters])
        },
        onError: (error) => {
          console.log('Full error response:')
          toast.error(error.response?.data.error)
        }
      }
    )
  }

  // Bob o'chirish

  const { mutate: deleteChapter } = useDeleteQuery({
    listKeyId: 'delete-chapter'
  })

  const onSubmitDeleteChapter = () => {
    deleteChapter(`${config.API_URL}${URLS.deleteChapter}${selectedId}/`)
    setOpenChapterModal(false)
  }

  // Mavzu yaratish

  const { mutate: createTopic } = usePostQuery({
    key: 'create-topic'
  })

  const onSubmitCreateTopic = () => {
    createTopic(
      {
        url: URLS.createTopic,
        attributes: {
          chapter: selectedId,
          name_uz: topicName,
          name_ru: topicNameRu,
          video_url_uz: videoLink,
          video_url_ru: videoLinkRu,
          content_uz: content,
          content_ru: contentRu
        },
        config: {
          headers: { Authorization: `Bearer ${session?.accessToken}` }
        }
      },
      {
        onSuccess: () => {
          setOpenTopicsModal(false) // Modalni yopish
          setTopicName('') // Inputlarni tozalash
          setVideoLink('')
          setTopicNameRu('')
          setVideoLinkRu('')
          setContent('')
          setContentRu('')
          queryClient.invalidateQueries([KEYS.topics]) // Queryni yangilash
          toast.success('Mavzu muvaqqiyatli yaratildi')
        },
        onError: (error) => {
          toast.error(error.response?.data.error)
        }
      }
    )
  }

  // Mavzu o'zgartirish
  const { mutate: updateTopic } = usePutQuery({
    listKeyId: 'update-topic'
  })

  const onSubmitUpdateTopic = () => {
    updateTopic(
      {
        url: `${URLS.updateTopic}${selectedTopic?.id}/`,
        attributes: {
          chapter: selectedId,
          name_uz: topicName,
          name_ru: topicNameRu,
          video_url_uz: videoLink,
          video_url_ru: videoLinkRu,
          content_uz: content,
          content_ru: contentRu
        },
        config: {
          headers: { Authorization: `Bearer ${session?.accessToken}` }
        }
      },
      {
        onSuccess: () => {
          setOpenTopicsModal(false) // Modalni yopish
          setTopicName('') // Inputlarni tozalash
          setTopicNameRu('')
          setVideoLink('')
          setVideoLinkRu('')
          setContent('')
          setContentRu('')
          queryClient.invalidateQueries([KEYS.topics]) // Queryni yangilash
          toast.success("Mavzu muvaqqiyatli o'zgartirildi")
        },
        onError: (error) => {
          toast.error(error.response?.data.error)
        }
      }
    )
  }

  // Mavzu o'chirish
  const { mutate: deleteTopic } = useDeleteQuery({
    listKeyId: 'delete-topic'
  })

  const onSubmitDeleteTopic = (id) => {
    deleteTopic(`${config.API_URL}${URLS.deleteTopic}${id}/`)
    setOpenTopicsModal(false)
  }

  if (isLoading || isFetching) {
    return (
      <LayoutAdmin title={'Mavzular'}>
        <ContentLoader />
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin title={'Mavzular'}>
      <div className="font-sf">
        <div className="flex justify-between mb-2">
          <h2 className="font-semibold text-[22px] mb-[18px]">{t('topics')}</h2>
          <Button
            classname={'hover:bg-[#2F66FF] transition-all duration-300 scale-100 active:scale-95'}
            onclick={() => {
              setOpenChapterModal(true)
              setNewChapter('')
              setNewChapterRu('')
              setModalTypeOfChapter('create')
            }}
          >
            {t('createChapter')}
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-[24px]">
          <div className="lg:col-span-6 col-span-12 self-start border border-[#E9E9E9] rounded-[12px]">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleChaptersDragEnd}>
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="border-b border-b-[#E9E9E9] p-[12px]">
                    <th className="p-[12px] text-center">
                      <button
                        onClick={() => setIsChaptersDragEnabled((prev) => !prev)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                        title="Tartiblash"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          <path d="m15 5 4 4" />
                        </svg>
                      </button>
                    </th>
                    <th className="p-[12px] text-center">#</th>
                    <th className="p-[12px] text-left">{t('title')}</th>
                    <th className="p-[12px] text-right">{t('action')}</th>
                  </tr>
                </thead>
                <SortableContext
                  items={chapters}
                  strategy={verticalListSortingStrategy}
                  disabled={!isChaptersDragEnabled}
                >
                  <tbody>
                    {chapters.map((chapter, index) => {
                      const isActive = selectedId === get(chapter, 'id')

                      return (
                        <SortableTableRow
                          key={chapter.id}
                          id={chapter.id}
                          showDragHandle={isChaptersDragEnabled}
                          onClick={() => setSelectedId(get(chapter, 'id'))}
                          isActive={isActive}
                          className="group border-b"
                        >
                          <td className="p-[12px] text-center w-[40px]">{index + 1}</td>
                          <td className="p-[12px] text-left w-[60%] text-[15px] font-medium transition-all">
                            {i18n.language === 'uz' ? get(chapter, 'name_uz') : get(chapter, 'name_ru')}
                          </td>
                          <td className="p-[12px] text-right rounded-br-[12px]">
                            <div className="flex justify-end gap-1">
                              <Button
                                onclick={(e) => {
                                  e.stopPropagation()
                                  setOpenTopicsModal(true)
                                  setTopicName('')
                                  setTopicNameRu('')
                                  setContent('')
                                  setContentRu('')
                                  setVideoLink('')
                                  setSelectedId(get(chapter, 'id'))
                                }}
                                py="py-[8px] text-sm"
                                classname={'hover:bg-[#2F66FF] transition-all duration-300 scale-100 active:scale-95'}
                              >
                                {t('createTopic')}
                              </Button>
                              <Button
                                onclick={(e) => {
                                  e.stopPropagation()
                                  setOpenChapterModal(true)
                                  setSelectedId(get(chapter, 'id'))
                                  setNewChapter(get(chapter, 'name_uz'))
                                  setNewChapterRu(get(chapter, 'name_ru'))
                                  setModalTypeOfChapter('update')
                                }}
                                py="py-[8px] px-[8px] block text-sm bg-[#FF9500FF] hover:bg-[#DB8000FF]  transition-all duration-200 scale-100 active:scale-95"
                              >
                                <EditIcon color="white" />
                              </Button>
                              <Button
                                onclick={(e) => {
                                  e.stopPropagation()
                                  setOpenChapterModal(true)
                                  setSelectedId(get(chapter, 'id'))
                                  setModalTypeOfChapter('delete')
                                }}
                                classname="py-[8px] px-[8px] text-sm bg-[#FF3B30] hover:bg-[#E1332AFF] transition-all duration-300 scale-100 active:scale-95"
                              >
                                <TrashIcon color="white" />
                              </Button>
                            </div>
                          </td>
                        </SortableTableRow>
                      )
                    })}
                  </tbody>
                </SortableContext>
              </table>
            </DndContext>
          </div>

          {selectedId && (
            <div
              className={`lg:col-span-6 col-span-12 self-start border border-[#E9E9E9] ${
                topics.length > 0 ? 'border-[#E9E9E9]' : 'border-[#FF9500] bg-[#FFF4E5]'
              } rounded-[12px]`}
            >
              {isLoadingTopics || isFetchingTopics ? (
                <ContentLoader />
              ) : (
                <div>
                  {topics.length > 0 ? (
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleTopicsDragEnd}>
                      <table className="w-full table-auto border-collapse">
                        <thead>
                          <tr className="border-b border-b-[#E9E9E9] p-[12px]">
                            <th className="p-[12px] text-center">
                              <button
                                onClick={() => setIsTopicsDragEnabled((prev) => !prev)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
                                title="Tartiblash"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                  <path d="m15 5 4 4" />
                                </svg>
                              </button>
                            </th>
                            <th className="p-[12px] text-center">#</th>
                            <th className="p-[12px] text-left">{t('title')}</th>
                            <th className="p-[12px] text-center">{t('questionCount')}</th>
                            <th className="p-[12px] text-left">{t('action')}</th>
                          </tr>
                        </thead>
                        <SortableContext
                          items={topics}
                          strategy={verticalListSortingStrategy}
                          disabled={!isTopicsDragEnabled}
                        >
                          <tbody>
                            {topics.map((topic, index) => (
                              <SortableTableRow
                                key={topic.id}
                                id={topic.id}
                                showDragHandle={isTopicsDragEnabled}
                                className="group border-b hover:bg-gray-50 transition-all"
                              >
                                <td className="p-[12px] text-center w-[40px]">{index + 1}</td>
                                
                                <td
                                  className="p-[12px] text-left text-[15px] w-[50%] font-medium transition-all cursor-pointer hover:underline"
                                  onClick={(e) => {
                                    e.stopPropagation
                                    router.push(`/dashboard/teacher/subjects/${id}/${selectedId}/${topic.id}`)
                                  }}
                                >
                                  {i18n.language === 'uz' ? topic.name_uz : topic.name_ru}
                                </td>
                                <td className="p-3 align-middle">
                                  <span className="flex items-center gap-1">
                                    <QuestionCountIcon size={16} color="#FF9500" />
                                    {topic.question_count}
                                  </span>
                                </td>
                                <td className="p-3 text-right align-middle">
                                  <div className="flex items-center justify-end gap-1">
                                    <Button
                                      onclick={(e) => {
                                        e.stopPropagation()
                                        setOpenTopicsModal(true)
                                        setSelectedTopic(topic)
                                        setTopicName(topic.name_uz)
                                        setTopicNameRu(topic.name_ru)
                                        setContent(topic.content_uz)
                                        setContentRu(topic.content_ru)
                                        setVideoLink(topic.video_url_uz)
                                        setVideoLinkRu(topic.video_url_ru)
                                        setModalTypeOfTopic('update')
                                      }}
                                      py="py-[8px] px-[8px] block text-sm bg-[#FF9500FF] border"
                                    >
                                      <EditIcon color="white" />
                                    </Button>
                                    <Button
                                      onclick={(e) => {
                                        e.stopPropagation()
                                        setOpenTopicsModal(true)
                                        setSelectedTopic(topic)
                                        setModalTypeOfTopic('delete')
                                      }}
                                      classname="py-[8px] px-[8px] text-sm bg-[#FF3B30]"
                                    >
                                      <TrashIcon color="white" />
                                    </Button>
                                  </div>
                                </td>
                              </SortableTableRow>
                            ))}
                          </tbody>
                        </SortableContext>
                      </table>
                    </DndContext>
                  ) : (
                    <div className="flex items-center justify-center h-[200px] gap-2">
                      <InfoCircleIcon />
                      <h3 className="text-[16px] font-normal text-[#8E8E93]">{/* {t("noTopics")} */}</h3>
                      <p className="">Bu bobda mavzular mavjud emas</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {openChapterModal && (
        <SimpleModalTeacher>
          <div className="flex justify-between px-[16px] py-[18px]">
            <h3 className="text-[19px] font-semibold">
              {modalTypeOfChapter === 'create'
                ? `${t('createChapter')}`
                : modalTypeOfChapter === 'update'
                ? `${t('editChapter')}`
                : `${t('deleteChapter')}`}
            </h3>
            <button onClick={() => setOpenChapterModal(false)} className="rounded">
              <Image src={'/icons/close.svg'} alt="circle" width={24} height={24} />
            </button>
          </div>

          <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

          {modalTypeOfChapter === 'delete' ? (
            <div>
              <p className="px-[16px] py-[18px]">{t('deleteWarning')}</p>
            </div>
          ) : (
            <div className="px-[16px] py-[18px]">
              <label>{t('chapterName')} (o&apos;zbek tilida)</label>
              <Input
                value={newChapter}
                onChange={(e) => setNewChapter(e.target.value)}
                placeholder={t('enterChapterName')}
                className={'mb-[20px]'}
              />

              <label className="mt-[10px]">{t('chapterName')} (rus tilida)</label>
              <Input
                value={newChapterRu}
                onChange={(e) => setNewChapterRu(e.target.value)}
                placeholder={t('enterChapterName')}
              />
            </div>
          )}

          <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

          <div className="px-[16px] py-[12px] flex items-center justify-center">
            <Button
              onclick={
                modalTypeOfChapter === 'create'
                  ? onSubmitCreateChapter
                  : modalTypeOfChapter === 'update'
                  ? onSubmitUpdateChapter
                  : onSubmitDeleteChapter
              }
              classname={'!py-2'}
            >
              {modalTypeOfChapter === 'delete' ? `${t('delete')}` : `${t('complete')}`}
            </Button>
          </div>
        </SimpleModalTeacher>
      )}

      {openTopicsModal && (
        <AnimatePresence>
          <motion.div
            className={`fixed inset-0 right-0 flex items-center justify-end z-50 transition-all bg-black bg-opacity-70 duration-300 `}
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-bl-[16px]  rounded-tl-[16px] right-0 shadow-lg w-1/2 h-screen overflow-y-auto  font-sf"
            >
              <div className="flex justify-between px-[16px] py-[18px]">
                <h3 className="text-[19px] font-semibold">
                  {modalTypeOfTopic === 'create'
                    ? `${t('createTopic')}`
                    : modalTypeOfTopic === 'update'
                    ? `${t('editTopic')}`
                    : `${t('deleteTopic')}`}
                </h3>
                <button onClick={() => setOpenTopicsModal(false)} className="rounded">
                  <Image src={'/icons/close.svg'} alt="circle" width={24} height={24} />
                </button>
              </div>

              <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

              {modalTypeOfTopic === 'delete' ? (
                <div>
                  <p className="px-[16px] py-[18px]">
                    Belgilangan mavzuni o'chirganingizdan so'ng, uni tiklab bo'lmaydi.
                  </p>
                </div>
              ) : (
                <>
                  <div className="px-[16px] mt-[18px] mb-[9px]">
                    <label>{t('topicName')} (o&apos;zbek tilida)</label>
                    <Input
                      value={topicName}
                      onChange={(e) => setTopicName(e.target.value)}
                      placeholder={t('enterTopicName')}
                    />
                  </div>

                  <div className="px-[16px] mt-[18px] mb-[9px]">
                    <label>{t('topicName')} (rus tilida)</label>
                    <Input
                      value={topicNameRu}
                      onChange={(e) => setTopicNameRu(e.target.value)}
                      placeholder={t('enterTopicName')}
                    />
                  </div>
                  <div className="bg-[#E9E9E9] w-full h-[1px] p-0 my-[18px]"></div>

                  <div className="px-[16px]  mb-[9px]">
                    <label>{t('videoLink')} (o&apos;zbek tilida)</label>
                    <Input
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                      placeholder={t('enterVideoLinkName')}
                    />
                  </div>

                  <div className="px-[16px] mt-[18px] mb-[9px]">
                    <label>{t('videoLink')} (rus tilida)</label>
                    <Input
                      value={videoLinkRu}
                      onChange={(e) => setVideoLinkRu(e.target.value)}
                      placeholder={t('enterVideoLinkName')}
                    />
                  </div>

                  <div className="bg-[#E9E9E9] w-full h-[1px] p-0 my-[18px]"></div>

                  <div className="px-[16px]">
                    <h3 className="text-[16px] font-normal mb-[10px]">{t('topicContent')} (o&apos;zbek tilida)</h3>
                    <CKEditor
                      initData={content}
                      onChange={(event) => setContent(event.editor.getData())}
                      config={{
                        toolbar: [
                          ['Bold', 'Italic', 'Strike'], // Text styling
                          ['BulletedList', 'NumberedList', 'Outdent', 'Indent', 'Blockquote'], // Lists and indentation
                          ['Image', 'Table', 'SpecialChar'], // Media and special characters
                          ['Link', 'Unlink'], // Links
                          ['Maximize', 'Source'], // Fullscreen & Source mode
                          ['Undo', 'Redo'] // Undo/Redo
                        ]
                      }}
                    />
                  </div>

                  <div className="px-[16px] mt-[15px]">
                    <h3 className="text-[16px] font-normal mb-[10px]">{t('topicContent')} (rus tilida)</h3>
                    <CKEditor
                      initData={contentRu}
                      onChange={(event) => setContentRu(event.editor.getData())}
                      config={{
                        toolbar: [
                          ['Bold', 'Italic', 'Strike'], // Text styling
                          ['BulletedList', 'NumberedList', 'Outdent', 'Indent', 'Blockquote'], // Lists and indentation
                          ['Image', 'Table', 'SpecialChar'], // Media and special characters
                          ['Link', 'Unlink'], // Links
                          ['Maximize', 'Source'], // Fullscreen & Source mode
                          ['Undo', 'Redo'] // Undo/Redo
                        ]
                      }}
                    />
                  </div>
                </>
              )}

              <div className="bg-[#E9E9E9] w-full h-[1px] p-0 my-[18px]"></div>

              <div className="px-[16px] py-[12px] flex items-center justify-end">
                <Button
                  onclick={
                    modalTypeOfTopic === 'create'
                      ? onSubmitCreateTopic
                      : modalTypeOfTopic === 'update'
                      ? onSubmitUpdateTopic
                      : () => onSubmitDeleteTopic(selectedTopic?.id)
                  }
                  classname={'!py-2 hover:bg-[#2F66FF] transition-all duration-300 scale-100 active:scale-95'}
                >
                  {modalTypeOfTopic === 'delete' ? t('delete') : t('complete')}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </LayoutAdmin>
  )
}

export default Index
