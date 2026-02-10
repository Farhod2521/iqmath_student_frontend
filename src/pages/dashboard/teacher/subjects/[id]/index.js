import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useGetQuery } from '@/hooks'
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
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
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
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import BaseBreadcrumbs from '@/components/breadcrumb/Breadcrumbs'
import { request } from '@/services/api'

// ClientOnly helper
function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return children
}

const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then((mod) => mod.CKEditor), { ssr: false })
let ClassicEditor
if (typeof window !== 'undefined') {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
}

const mentorCKEditorConfig = {
  toolbar: {
    items: [
      'bold',
      'italic',
      'strikethrough',
      '|',
      'bulletedList',
      'numberedList',
      'outdent',
      'indent',
      'blockQuote',
      '|',
      'imageUpload',
      'table',
      'specialCharacters',
      '|',
      'link',
      'unlink',
      '|',
      'maximize',
      '|',
      'undo',
      'redo'
    ],
    shouldNotGroupWhenFull: false,
    removeItems: []
  },
  removePlugins: [
    'CKFinderUploadAdapter',
    'CKFinder',
    'EasyImage',
    'Image',
    'ImageCaption',
    'ImageStyle',
    'ImageToolbar',
    'ImageUpload'
  ],
  height: '200px',
  minHeight: '200px'
}

const Index = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const { id } = router.query
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
    key: [KEYS.chapters, KEYS.chapters],
    url: `${URLS.chapters}${id}/`,
    // headers: {
    //   Authorization: `Bearer ${session?.accessToken}`
    // },
    enabled: !!session?.accessToken && !!id
  })

  const {
    data: topicsData,
    isLoading: isLoadingTopics,
    isFetching: isFetchingTopics
  } = useGetQuery({
    key: [KEYS.topics, selectedId, id],
    url: `${URLS.topics}${selectedId}/`,
    // headers: {
    //   Authorization: `Bearer ${session?.accessToken}`
    // },
    enabled: Boolean(selectedId && session?.accessToken)
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
    const chapterList = chaptersData?.data ?? []
    if (chapterList.length > 0) {
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
  const onSubmitDeleteChapter = async () => {
    try {
      const response = await axios.delete(`${config.API_URL}${URLS.deleteChapter}${selectedId}/`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 204) {
        setOpenChapterModal(false)

        // Immediate state update - o'chirilgan bobni darhol olib tashlash
        setChapters((prevChapters) => prevChapters.filter((chapter) => chapter.id !== selectedId))

        // Cache invalidation
        await queryClient.invalidateQueries([KEYS.chapters])

        toast.success("Bob muvaqqiyatli o'chirildi")
      }
    } catch (error) {
      console.error('Delete chapter error:', error)
      toast.error(error.response?.data?.error || "Bobni o'chirishda xatolik yuz berdi")
    }
  }

  // Mavzu yaratish
  const onSubmitCreateTopic = async () => {
    try {
      const response = await axios.post(
        `${config.API_URL}${URLS.createTopic}`,
        {
          chapter: selectedId,
          name_uz: topicName,
          name_ru: topicNameRu,
          video_url_uz: videoLink,
          video_url_ru: videoLinkRu,
          content_uz: content,
          content_ru: contentRu
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 201) {
        setOpenTopicsModal(false) // Modalni yopish
        setTopicName('') // Inputlarni tozalash
        setVideoLink('')
        setTopicNameRu('')
        setVideoLinkRu('')
        setContent('')
        setContentRu('')

        // Immediate state update - yangi mavzuni darhol qo'shish
        if (response.data?.data) {
          setTopics((prevTopics) => [...prevTopics, response.data.data])
        }

        // Cache invalidation
        await queryClient.invalidateQueries([KEYS.topics, selectedId])
        await queryClient.invalidateQueries([KEYS.topics])
        await queryClient.refetchQueries([KEYS.topics, selectedId])

        // Manual API call agar refetch ishlamasa
        try {
          const manualResponse = await axios.get(`${config.API_URL}${URLS.topics}${selectedId}/`, {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
              'Content-Type': 'application/json'
            }
          })

          if (manualResponse.data?.data) {
            setTopics(manualResponse.data.data)
          }
        } catch (manualError) {
          console.error('Manual API error:', manualError)
        }

        toast.success('Mavzu muvaqqiyatli yaratildi')
      }
    } catch (error) {
      console.error('Create topic error:', error)
      toast.error(error.response?.data?.error || 'Xatolik yuz berdi')
    }
  }

  // Mavzu o'zgartirish
  const onSubmitUpdateTopic = async () => {
    try {
      const response = await axios.put(
        `${config.API_URL}${URLS.updateTopic}${selectedTopic?.id}/`,
        {
          chapter: selectedId,
          name_uz: topicName,
          name_ru: topicNameRu,
          video_url_uz: videoLink,
          video_url_ru: videoLinkRu,
          content_uz: content,
          content_ru: contentRu
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 200) {
        setOpenTopicsModal(false) // Modalni yopish
        setTopicName('') // Inputlarni tozalash
        setTopicNameRu('')
        setVideoLink('')
        setVideoLinkRu('')
        setContent('')
        setContentRu('')

        // Immediate state update - o'zgartirilgan mavzuni darhol yangilash
        if (response.data?.data) {
          setTopics((prevTopics) =>
            prevTopics.map((topic) => (topic.id === selectedTopic?.id ? response.data.data : topic))
          )
        }

        // Cache invalidation
        await queryClient.invalidateQueries([KEYS.topics, selectedId])
        await queryClient.invalidateQueries([KEYS.topics])
        await queryClient.refetchQueries([KEYS.topics, selectedId])

        // Manual API call agar refetch ishlamasa
        try {
          const manualResponse = await axios.get(`${config.API_URL}${URLS.topics}${selectedId}/`, {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
              'Content-Type': 'application/json'
            }
          })

          if (manualResponse.data?.data) {
            setTopics(manualResponse.data.data)
          }
        } catch (manualError) {
          console.error('Manual API error:', manualError)
        }

        toast.success("Mavzu muvaqqiyatli o'zgartirildi")
      }
    } catch (error) {
      console.error('Update topic error:', error)
      toast.error(error.response?.data?.error || 'Xatolik yuz berdi')
    }
  }

  // Mavzu o'chirish
  const onSubmitDeleteTopic = async (id) => {
    try {
      const response = await axios.delete(`${config.API_URL}${URLS.deleteTopic}${id}/`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 204) {
        setOpenTopicsModal(false)

        // Immediate state update - o'chirilgan mavzuni darhol olib tashlash
        setTopics((prevTopics) => prevTopics.filter((topic) => topic.id !== id))

        // Cache invalidation
        await queryClient.invalidateQueries([KEYS.topics, selectedId])
        await queryClient.invalidateQueries([KEYS.topics])
        await queryClient.refetchQueries([KEYS.topics, selectedId])

        // Manual API call agar refetch ishlamasa
        try {
          const manualResponse = await axios.get(`${config.API_URL}${URLS.topics}${selectedId}/`, {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
              'Content-Type': 'application/json'
            }
          })

          if (manualResponse.data?.data) {
            setTopics(manualResponse.data.data)
          }
        } catch (manualError) {
          console.error('Manual API error:', manualError)
        }

        toast.success("Mavzu muvaqqiyatli o'chirildi")
      }
    } catch (error) {
      console.error('Delete topic error:', error)
      toast.error(error.response?.data?.error || "Mavzuni o'chirishda xatolik yuz berdi")
    }
  }

  const [pathList, setPathList] = useState([])
  const fetchData = () => {
    request.post('/api/v1/func_student/path/list/', { subject: id }).then((res) => {
      setPathList(res.data)
    })
  }
  useEffect(() => {
    if (id) fetchData()
  }, [id])

  if (isLoading) {
    return (
      <LayoutAdmin title={t('topics')}>
        <ContentLoader />
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin title={t('topics')}>
      <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
        <div className="font-sf">
          <BaseBreadcrumbs
            data={pathList.map((item) => ({
              link: '/dashboard/student/subjects',
              title: i18n.language === 'uz' ? item.title_uz : item.title_ru
            }))}
          />
          <div className="grid grid-cols-12 gap-[24px]">
            <div className="lg:col-span-6 col-span-12">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-[16px] uppercase ">{t('chapters')}</h2>
                <Button
                  py="py-[8px] text-sm"
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
              <div className=" self-start border border-[#E9E9E9] rounded-[12px]">
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
                                <MathJax dynamic>
                                  {i18n.language === 'uz' ? get(chapter, 'name_uz') : get(chapter, 'name_ru')}
                                </MathJax>
                              </td>
                              <td className="p-[12px] text-right rounded-br-[12px]">
                                <div className="flex justify-end gap-1">
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
            </div>

            {selectedId && (
              <div className="lg:col-span-6 col-span-12">
                <div className="flex justify-between items-center mb-2 ">
                  <h2 className="font-semibold text-[16px] uppercase">{t('topics')}</h2>
                  <Button
                    py="py-[8px] text-sm"
                    onclick={(e) => {
                      e.stopPropagation()
                      setOpenTopicsModal(true)
                      setTopicName('')
                      setTopicNameRu('')
                      setContent('')
                      setContentRu('')
                      setVideoLink('')
                      setVideoLinkRu('')
                      setSelectedId(selectedId)
                      setModalTypeOfTopic('create')
                    }}
                    classname={'hover:bg-[#2F66FF] transition-all duration-300 scale-100 active:scale-95'}
                  >
                    {t('createTopic')}
                  </Button>
                </div>
                <div
                  className={` self-start border border-[#E9E9E9] ${
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
                                      <MathJax dynamic>
                                        {i18n.language === 'uz' ? topic.name_uz : topic.name_ru}
                                      </MathJax>
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
              </div>
            )}
          </div>
        </div>
      </MathJaxContext>
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
                    <ClientOnly>
                      {ClassicEditor && (
                        <div className="ck-editor-wrapper" style={{ minHeight: '250px' }}>
                          <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            onChange={(event, editor) => {
                              const data = editor.getData()
                              setContent(data)
                            }}
                            config={mentorCKEditorConfig}
                          />
                        </div>
                      )}
                    </ClientOnly>
                  </div>

                  <div className="px-[16px] mt-[15px]">
                    <h3 className="text-[16px] font-normal mb-[10px]">{t('topicContent')} (rus tilida)</h3>
                    <ClientOnly>
                      {ClassicEditor && (
                        <div className="ck-editor-wrapper" style={{ minHeight: '250px' }}>
                          <CKEditor
                            editor={ClassicEditor}
                            data={contentRu}
                            onChange={(event, editor) => {
                              const data = editor.getData()
                              setContentRu(data)
                            }}
                            config={mentorCKEditorConfig}
                          />
                        </div>
                      )}
                    </ClientOnly>
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
