import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import useGetQuery from '@/hooks/api/useGetQuery'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { get, set } from 'lodash'
import Button from '@/components/button'
import { useState, useRef } from 'react'
import Image from 'next/image'
import parse from 'html-react-parser'
import { AnimatePresence, motion } from 'framer-motion'
import Input from '@/components/input'
import usePostQuery from '@/hooks/api/usePostQuery'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import usePutQuery from '@/hooks/api/usePutQuery'
import EditIcon from '@/components/icons/edit'
import TrashIcon from '@/components/icons/trash'
import useDeleteQuestion from '@/hooks/api/useDeleteQuestion'
import { config } from '@/config'
import SimpleModal from '@/components/modal/simple-modal'
import { useTranslation } from 'react-i18next'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import VideoPlayer from '@/components/video-player'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

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
  toolbar: [
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
    'sourceEditing',
    '|',
    'undo',
    'redo'
  ],
  removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'EasyImage'],
  image: {
    upload: {
      types: ['jpeg', 'png', 'gif', 'webp']
    }
  },
  height: '200px',
  minHeight: '200px'
}

const SubjectDetail = () => {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const router = useRouter()
  const { id, chapterId, topicId } = router.query
  const [showPlayer, setShowPlayer] = useState(false)
  const [openTestModal, setOpenTestModal] = useState(false)
  const [questionText, setQuestionText] = useState('')
  const [questionTextRu, setQuestionTextRu] = useState('')
  // Choice uchun
  const [correctAnswers, setCorrectAnswers] = useState([])
  // Matnli javob uchun
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [correctAnswerRu, setCorrectAnswerRu] = useState('')
  const [questionType, setQuestionType] = useState('')
  const [questionLevel, setQuestionLevel] = useState('')
  const [levelTab, setLevelTab] = useState('all')
  const [videoLink, setVideoLink] = useState('')
  const [videoLinkRu, setVideoLinkRu] = useState('')
  const [compositeQuestions, setCompositeQuestions] = useState([
    { text1_uz: '', text1_ru: '', correct_answer: '', text2_uz: '', text2_ru: '' }
  ])

  const [selectedQuestion, setSelectedQuestion] = useState(null)

  // Modallar
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const [choices, setChoices] = useState({
    A: { text_uz: '', text_ru: '' },
    B: { text_uz: '', text_ru: '' },
    C: { text_uz: '', text_ru: '' },
    D: { text_uz: '', text_ru: '' }
  })

  const [images, setImages] = useState({ A: null, B: null, C: null, D: null })

  // darajani belgilab savollarni ko'rish
  const handleLevelTab = (level) => {
    setLevelTab(level)
  }

  const formattedChoices = Object.entries(choices).map(([letter, { text_uz, text_ru }]) => ({
    letter,
    text_uz,
    text_ru,
    is_correct: correctAnswers.includes(letter)
  }))

  const handleChange = (e) => {
    setQuestionType(e.target.value)
  }
  const handleImageChange = (e, letter) => {
    const file = e.target.files[0]
    if (file) {
      // Rasmni images obyektiga to'g'ri qo'shish
      setImages((prevImages) => {
        const updatedImages = { ...prevImages, [letter]: file }
        console.log(updatedImages) // images obyektini konsolga chiqarish
        return updatedImages
      })
    }
  }

  // inputli savol uchun
  const handleInputChange = (index, e) => {
    const { name, value } = e.target
    const newQuestions = [...compositeQuestions]
    newQuestions[index][name] = value
    setCompositeQuestions(newQuestions)
  }

  // Yangi input blokini qo'shish
  const handleAddQuestion = () => {
    setCompositeQuestions([
      ...compositeQuestions,
      { text1_uz: '', text2_uz: '', correct_answer: '', text1_ru: '', text2_ru: '' }
    ])
  }
  // Yangi input blokini o'chirish
  const handleRemoveQuestion = (indexToRemove) => {
    if (compositeQuestions.length <= 1) return
    setCompositeQuestions((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleChoiceChange = (e, letter) => {
    const { value } = e.target // Inputdan kelgan matn qiymatini olamiz
    setChoices((prev) => ({
      ...prev, // Avvalgi holatni saqlab qolamiz
      [letter]: value // O'zgartirilgan variantning matnini yangilaymiz
    }))
  }

  const {
    data: topics,
    isLoading: isLoadingTopics,
    isFetching: isFetchingTopics
  } = useGetQuery({
    key: KEYS.topics,
    url: chapterId ? `${URLS.topics}${chapterId}/` : null,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!chapterId && !!session?.accessToken
  })
  // savollarni olish
  const {
    data: questionList,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.questionList,
    url: `${URLS.questionList}${topicId}/`,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!topicId && !!session?.accessToken
  })

  const filteredTopic = get(topics, 'data', [])?.find((topic) => topic.id === Number(topicId))

  // Savol yaratish

  const { mutate: createQuestion } = usePostQuery({
    key: 'create-question'
  })

  const onSubmitCreateQuestion = () => {
    const formData = new FormData()
    formData.append('topic', topicId)
    formData.append('question_text_uz', questionText)
    formData.append('question_text_ru', questionTextRu)
    formData.append('question_type', questionType)
    formData.append('video_url_uz', videoLink)
    formData.append('video_url_ru', videoLinkRu)
    // formData.append("correct_text_answer", correctAnswer);
    formData.append('level', questionLevel)

    if (questionType === 'image_choice') {
      // Matn + rasmli variantlar
      Object.entries(choices).forEach(([letter, text], index) => {
        formData.append(`choices[${index}][letter]`, letter)
        formData.append(`choices[${index}][text]`, text)
        formData.append(`choices[${index}][is_correct]`, correctAnswer === letter)

        // Har bir variantga mos rasmni qo‘shish
        if (images[letter]) {
          formData.append(`choices[${index}][image]`, images[letter])
        }
      })
    } else if (questionType === 'text') {
      // Matnli javob
      formData.append('correct_text_answer_uz', correctAnswer)
      formData.append('correct_text_answer_ru', correctAnswerRu)
    } else if (questionType === 'choice') {
      formattedChoices.forEach((choice, index) => {
        formData.append(`choices[${index}][letter]`, choice.letter)
        formData.append(`choices[${index}][text_uz]`, choice.text_uz)
        formData.append(`choices[${index}][text_ru]`, choice.text_ru)
        formData.append(`choices[${index}][is_correct]`, choice.is_correct)
      })
      // ko'p inputli
    } else if (questionType === 'composite') {
      compositeQuestions.forEach((question, index) => {
        formData.append(`sub_questions[${index}][text1_uz]`, question.text1_uz)
        formData.append(`sub_questions[${index}][text1_ru]`, question.text1_ru)
        formData.append(`sub_questions[${index}][correct_answer]`, question.correct_answer)

        formData.append(`sub_questions[${index}][text2_uz]`, question.text2_uz)
        formData.append(`sub_questions[${index}][text2_ru]`, question.text2_ru)
      })
    }

    createQuestion(
      {
        url: URLS.createQuestion,
        attributes: formData,
        config: {
          headers: { Authorization: `Bearer ${session?.accessToken}` }
        }
      },
      {
        onSuccess: () => {
          setOpenTestModal(false) // Modalni yopish
          setQuestionText('') // Inputlarni tozalash
          setCorrectAnswers([])
          setCorrectAnswer('')
          setQuestionType('')
          setQuestionLevel('')
          queryClient.invalidateQueries([KEYS.questionList])
          toast.success('Mavzu muvaqqiyatli yaratildi')
        },
        onError: (error) => {
          toast.error(error.response?.data.error)
        }
      }
    )
  }

  // Savolni tahrirlash
  const { mutate: changeCreatedQuestion } = usePutQuery({
    listKeyId: 'edit-created-question'
  })

  const onSubmitEditCreatedQuestion = (id) => {
    const formData = new FormData()
    formData.append('topic', topicId)
    formData.append('question_text_uz', questionText)
    formData.append('question_text_ru', questionTextRu)
    formData.append('question_type', questionType)
    formData.append('video_url_uz', videoLink)
    formData.append('video_url_ru', videoLinkRu)
    // formData.append("correct_text_answer", correctAnswer);
    formData.append('level', questionLevel)

    if (questionType === 'image_choice') {
      // Matn + rasmli variantlar
      Object.entries(choices).forEach(([letter, text], index) => {
        formData.append(`choices[${index}][letter]`, letter)
        formData.append(`choices[${index}][text]`, text)
        formData.append(`choices[${index}][is_correct]`, correctAnswer === letter)

        // Har bir variantga mos rasmni qo‘shish
        if (images[letter]) {
          formData.append(`choices[${index}][image]`, images[letter])
        }
      })
    } else if (questionType === 'text') {
      // Matnli javob
      formData.append('correct_text_answer_uz', correctAnswer)
      formData.append('correct_text_answer_ru', correctAnswerRu)
    } else if (questionType === 'choice') {
      formattedChoices.forEach((choice, index) => {
        formData.append(`choices[${index}][letter]`, choice.letter)
        formData.append(`choices[${index}][text_uz]`, choice.text_uz)
        formData.append(`choices[${index}][text_ru]`, choice.text_ru)
        formData.append(`choices[${index}][is_correct]`, choice.is_correct)
      })
      // ko'p inputli
    } else if (questionType === 'composite') {
      compositeQuestions.forEach((question, index) => {
        formData.append(`sub_questions[${index}][text1_uz]`, question.text1_uz)
        formData.append(`sub_questions[${index}][text1_ru]`, question.text1_ru)
        formData.append(`sub_questions[${index}][correct_answer]`, question.correct_answer)

        formData.append(`sub_questions[${index}][text2_uz]`, question.text2_uz)
        formData.append(`sub_questions[${index}][text2_ru]`, question.text2_ru)
      })
    }

    changeCreatedQuestion(
      {
        url: `${URLS.updateQuestion}${selectedQuestion.id}/`,
        attributes: formData,
        config: {
          headers: { Authorization: `Bearer ${session?.accessToken}` }
        }
      },
      {
        onSuccess: () => {
          setOpenTestModal(false) // Modalni yopish
          setQuestionText('') // Inputlarni tozalash
          setCorrectAnswers([])
          setCorrectAnswer('')
          setQuestionType('')
          setQuestionLevel('')
          setEditModal(false)
          queryClient.invalidateQueries([KEYS.questionList])
          toast.success('Mavzu muvaqqiyatli yaratildi')
        },
        onError: (error) => {
          console.log(error)
          toast.error(error.response?.data.error)
        }
      }
    )
  }

  const { mutate: deleteQuestion, isLoading: isDeleting } = useDeleteQuestion(() => {
    setDeleteModal(false)
  })

  const onSubmitDeleteQuestion = (id) => {
    if (!id) {
      toast.error('Savol ID topilmadi')
      return
    }

    if (!session?.accessToken) {
      toast.error('Avtorizatsiya tokeni topilmadi')
      return
    }

    deleteQuestion(`${config.API_URL}${URLS.deleteQuestion}${id}/`, {
      headers: { Authorization: `Bearer ${session?.accessToken}` }
    })
  }

  const filteredQuestions = get(questionList, 'data', []).filter((item) =>
    levelTab === 'all' ? true : item.level?.toString() === levelTab
  )

  return (
    <>
      <div className="grid grid-cols-12 gap-[24px]">
        <div className="col-span-12 self-start space-y-[12px] border border-[#E9E9E9] rounded-[12px]  py-[12px]">
          <h1 className="text-center">
            {i18n.language === 'uz' ? get(filteredTopic, 'name_uz') : get(filteredTopic, 'name_ru')}
          </h1>

          <div className="w-full bg-[#E9E9E9] h-[1px]"></div>

          <div className="flex justify-between py-[12px] px-[24px]">
            <div className="flex gap-x-[15px] items-center">
              <div className="w-[60px] h-[60px] bg-[#EDEDF2] flex items-center justify-center rounded-[8px]">
                <Image src={'/icons/play.svg'} alt="play" width={24} height={24} />
              </div>

              <div className="space-y-[4px]">
                <h3 className="text-[17px] font-medium">{t('watchBeforeStart')}</h3>
                <p className="text-[#8A8A8E]">{t('videoExplanation')}</p>
              </div>
            </div>

            <div className="flex items-center gap-x-[8px]">
              <Button
                onclick={() => setShowPlayer(true)}
                border={'border border-[#D1D1D6]'}
                px="px-[16px]"
                py="py-[11px]"
                classname={'bg-white !text-black hover:bg-[#F3F3F3FF] transform-all duration-300'}
              >
                {t('watch')}
              </Button>

              <Button
                onclick={() => {
                  setOpenTestModal(true)
                  setQuestionText('')
                  setQuestionTextRu('')
                  setCorrectAnswers([])
                  setCorrectAnswer('')
                  setCorrectAnswerRu('')
                  setVideoLink('')
                  setVideoLinkRu('')
                  setQuestionType('')
                  setChoices({
                    A: { text_uz: '', text_ru: '' },
                    B: { text_uz: '', text_ru: '' },
                    C: { text_uz: '', text_ru: '' },
                    D: { text_uz: '', text_ru: '' }
                  })
                  setCompositeQuestions([
                    { text1_uz: '', text1_ru: '', correct_answer: '', text2_uz: '', text2_ru: '' }
                  ])
                  setQuestionLevel('')
                }}
                px="px-[16px]"
                py="py-[11px]"
                classname={'hover:bg-[#537AE4FF] transition-all duration-200'}
              >
                {t('createTest')}
              </Button>
            </div>
          </div>

          <div className="w-full bg-[#E9E9E9] h-[1px]"></div>

          <div className="py-[12px] px-[24px]">
            {i18n.language === 'uz'
              ? parse(get(filteredTopic, 'content_uz') || '')
              : parse(get(filteredTopic, 'content_ru') || '')}
          </div>
        </div>

        <div className="col-span-12 flex gap-2">
          <button
            onClick={() => handleLevelTab('all')}
            className={`border px-[16px] py-[8px] rounded-md scale-100 active:scale-90 transition-all duration-300 border-[#5D87FF] ${
              levelTab === 'all' ? 'bg-[#5D87FF] text-white' : 'bg-transparent hover:bg-[#D1D6E4FF]'
            }`}
          >
            {t('all')}
          </button>
          <button
            onClick={() => handleLevelTab('1')}
            className={`border px-[16px] py-[8px] rounded-md scale-100 active:scale-90 transition-all duration-300 border-[#5D87FF] ${
              levelTab === '1' ? 'bg-[#5D87FF] text-white' : 'bg-transparent'
            }`}
          >
            {t('level1')}
          </button>
          <button
            onClick={() => handleLevelTab('2')}
            className={`border px-[16px] py-[8px] rounded-md scale-100 active:scale-90 transition-all duration-300 border-[#5D87FF] ${
              levelTab === '2' ? 'bg-[#5D87FF] text-white' : 'bg-transparent'
            }`}
          >
            {t('level2')}
          </button>
          <button
            onClick={() => handleLevelTab('3')}
            className={`border px-[16px] py-[8px] rounded-md scale-100 active:scale-90 transition-all duration-300 border-[#5D87FF] ${
              levelTab === '3' ? 'bg-[#5D87FF] text-white' : 'bg-transparent'
            }`}
          >
            {t('level3')}
          </button>
        </div>
        <div className="col-span-12 self-start space-y-[12px] border border-[#E9E9E9] rounded-[12px] ">
          <MathJaxContext
            config={{
              loader: { load: ['input/tex', 'output/chtml'] },
              options: { enableMenu: false },
              tex: { packages: { '[+]': ['noerrors', 'noundefined'] } }
            }}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-b-[#E9E9E9]">
                  <th className="p-[12px] pl-[24px] text-left">#</th>
                  <th className="p-[12px] text-left ">{t('question')}</th>
                  <th className="p-[12px] text-left ">{t('correctAnswers')}</th>
                  <th className="p-[12px] text-left ">{t('correctAnswers')} (latex) </th>
                  <th className="p-[12px]">{t('questionType')}</th>
                  <th className="p-[12px] text-center">{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuestions.map((topic, index) => (
                  <tr key={index} className="border-t  hover:bg-[#F0F9FF]">
                    <td className="p-[12px] pl-[24px]">{index + 1}</td>
                    <td className="p-[12px] ">
                      <MathJax dynamic>
                        {i18n.language === 'uz'
                          ? parse(get(topic, 'question_text_uz') || '')
                          : parse(get(topic, 'question_text_ru') || '')}
                      </MathJax>
                    </td>

                    <td className="p-[12px] pl-[24px]">
                      <MathJax dynamic>
                        {topic?.question_type === 'text' ? (
                          <>
                            {i18n.language === 'uz'
                              ? parse(get(topic, 'correct_text_answer_uz') || '')
                              : parse(get(topic, 'correct_text_answer_ru') || '')}
                          </>
                        ) : topic?.question_type === 'composite' ? (
                          topic.sub_questions.map((i, idx) => (
                            <div key={idx} className="flex gap-1">
                              <span>{i.text1_uz}</span>
                              <span>{i.correct_answer}</span>
                              <span>{i.text2_uz}</span>
                            </div>
                          ))
                        ) : (
                          topic.choices.map((i, idx) => (
                            <div key={idx} className="flex gap-1">
                              <span className={`${i.is_correct ? 'text-blue-500' : ''}`}>{i.letter}</span>
                              <span>{i.text_uz}</span>
                            </div>
                          ))
                        )}
                      </MathJax>
                    </td>
                    <td className="p-[12px] pl-[24px]">
                      {topic?.question_type === 'text' ? (
                        <>
                          {i18n.language === 'uz'
                            ? parse(get(topic, 'correct_text_answer_uz') || '')
                            : parse(get(topic, 'correct_text_answer_ru') || '')}
                        </>
                      ) : topic?.question_type === 'composite' ? (
                        topic.sub_questions.map((i, idx) => (
                          <div key={idx} className="flex gap-1">
                            <span>{i.text1_uz}</span>
                            <span>{i.correct_answer}</span>
                            <span>{i.text2_uz}</span>
                          </div>
                        ))
                      ) : (
                        topic.choices.map((i, idx) => (
                          <div key={idx} className="flex gap-1 text-sm">
                            <span className={`${i.is_correct ? 'text-blue-500' : ''}`}>{i.letter}</span>
                            <span>{i.text_uz}</span>
                          </div>
                        ))
                      )}
                    </td>
                    <td className="p-[12px] text-center">
                      {get(topic, 'question_type') === 'text' ? (
                        <p className="">{t('textInput')}</p>
                      ) : get(topic, 'question_type') === 'choice' ? (
                        <p>{t('selectOption')}</p>
                      ) : get(topic, 'question_type') === 'image_choice' ? (
                        <p>{t('imageOption')}</p>
                      ) : get(topic, 'question_type') === 'composite' ? (
                        <p>{t('multipleInput')}</p>
                      ) : null}
                    </td>

                    <td className="py-2 text-center">
                      <div className="flex items-center gap-2 justify-center">
                        {/* <Button py="py-[8px] px-[8px] block text-sm  border">
                        Batafsil
                      </Button> */}
                        <Button
                          onclick={() => {
                            const qt = get(topic, 'question_type')
                            setQuestionText(get(topic, 'question_text_uz') || '')
                            setQuestionTextRu(get(topic, 'question_text_ru'))

                            setSelectedQuestion(topic)
                            setQuestionType(qt)
                            setVideoLink(get(topic, 'video_url_uz') || '')
                            setVideoLinkRu(get(topic, 'video_url_ru') || '')
                            setQuestionLevel(get(topic, 'level'))
                            console.log('SHOW', get(topic, 'level'))
                            if (qt === 'text') {
                              setCorrectAnswer(get(topic, 'correct_text_answer_uz') || '')
                              setCorrectAnswerRu(get(topic, 'correct_text_answer_ru') || '')
                            } else if (qt === 'choice' || qt === 'image_choice') {
                              const correct = get(topic, 'choices', [])
                              const result = {}
                              correct.forEach((item) => {
                                result[item.letter] = {
                                  text_uz: item.text_uz,
                                  text_ru: item.text_ru
                                }
                              })
                              setCorrectAnswers(correct.filter((i) => i.is_correct).map((i) => i.letter))
                              setChoices(result)
                            } else if (qt === 'composite') {
                              console.log(get(topic, 'sub_questions'))
                              // Composite savollar uchun maxsus formatda ishlanadi
                              setCompositeQuestions(get(topic, 'sub_questions') || [])
                            }

                            setEditModal(true)
                          }}
                          py="py-[8px] px-[8px] block text-sm bg-[#FF9500FF] hover:bg-[#DB8000FF]  transform-all duration-200"
                        >
                          <EditIcon color="white" />
                        </Button>
                        <Button
                          onclick={() => {
                            setSelectedQuestion(topic)
                            setDeleteModal(true) // O'chirish modalini ochish
                          }}
                          classname="py-[8px] px-[8px] text-sm bg-[#FF3B30] hover:bg-[#E1332AFF] transform-all duration-200"
                        >
                          <TrashIcon color="white" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </MathJaxContext>

          {showPlayer && (
            <VideoPlayer
              url={i18n.language === 'uz' ? filteredTopic?.video_url_uz : filteredTopic?.video_url_ru}
              title={i18n.language === 'uz' ? filteredTopic?.name_uz : filteredTopic?.name_ru}
              onClose={() => setShowPlayer(false)}
            />
          )}
        </div>
      </div>
      {/* Test yaratish */}
      {openTestModal && (
        <AnimatePresence>
          <motion.div
            className={`fixed inset-0 right-0 flex items-center justify-end z-50 transition-all bg-black bg-opacity-70 duration-300 `}
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-bl-[16px]  rounded-tl-[16px] right-0 shadow-lg w-1/2 h-screen overflow-y-auto font-sf"
            >
              <div className="flex justify-between px-[16px] py-[18px]">
                <h3 className="text-[19px] font-semibold">{t('createQuestion')}</h3>
                <button onClick={() => setOpenTestModal(false)} className="rounded">
                  <Image src={'/icons/close.svg'} alt="circle" width={24} height={24} />
                </button>
              </div>

              <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

              <div className="space-y-[15px] my-[20px]">
                <div className="px-[16px] mt-[18px] mb-[9px]">
                  <label>{t('question')} (O&apos;zbek tilida)</label>

                  <ClientOnly>
                    {ClassicEditor && (
                      <div style={{ minHeight: '200px' }}>
                        <CKEditor
                          editor={ClassicEditor}
                          data={questionText}
                          onChange={(event, editor) => {
                            const data = editor.getData()
                            setQuestionText(data)
                          }}
                          config={mentorCKEditorConfig}
                        />
                      </div>
                    )}
                  </ClientOnly>
                </div>

                <div className="px-[16px] mt-[18px] mb-[9px]">
                  <label>{t('question')} (Rus tilida)</label>

                  <ClientOnly>
                    {ClassicEditor && (
                      <div style={{ minHeight: '200px' }}>
                        <CKEditor
                          editor={ClassicEditor}
                          data={questionTextRu}
                          onChange={(event, editor) => {
                            const data = editor.getData()
                            setQuestionTextRu(data)
                          }}
                          config={mentorCKEditorConfig}
                        />
                      </div>
                    )}
                  </ClientOnly>
                </div>

                <div className="px-[16px] mt-[18px] mb-[9px]">
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

                <div className="flex gap-4 mb-[10px]">
                  <div className="px-[16px] w-full space-y-[9px] flex flex-col">
                    <label>{t('questionType')}</label>
                    <select
                      value={questionType}
                      onChange={handleChange}
                      className="border border-[#E9E9E9] rounded-[8px] w-full py-[10px] px-[16px] "
                    >
                      <option value="" disabled>
                        {t('selectType')}
                      </option>
                      <option value="text">{t('textInput')}</option>
                      <option value="composite">{t('multipleInput')}</option>
                      <option value="choice">{t('selectOption')}</option>
                      <option value="image_choice">{t('imageOption')}</option>
                    </select>
                  </div>

                  <div className="px-[16px] w-full space-y-[9px] flex flex-col">
                    <label className="block  font-medium">{t('questionLevel')}</label>
                    <select
                      value={questionLevel}
                      onChange={(e) => setQuestionLevel(e.target.value)}
                      className="border border-[#E9E9E9] rounded-[8px] w-full py-[10px] px-[16px] "
                    >
                      <option value="" disabled>
                        ----------
                      </option>
                      <option value="1">{t('level1Easy')}</option>
                      <option disabled value="2">
                        {t('level2Medium')}
                      </option>
                      <option disabled value="3">
                        {t('level3Hard')}
                      </option>
                    </select>
                  </div>
                </div>

                {questionType === 'text' && (
                  <div className="px-[16px] mt-[18px] mb-[9px]">
                    <MathJaxContext>
                      <label>To&apos;g&apos;ri javob (O&apos;zbek tilida)</label>
                      <div>
                        <input
                          type="text"
                          value={correctAnswer}
                          onChange={(e) => setCorrectAnswer(e.target.value.replace(/\s/g, ''))}
                          placeholder="Latext (O'zbek)"
                          className="w-full border rounded-[8px] py-[8px] px-[12px]"
                        />
                        <MathJax dynamic>{correctAnswer}</MathJax>
                      </div>
                      <label>To&apos;g&apos;ri javob (Rus tilida)</label>
                      <div>
                        <input
                          type="text"
                          value={correctAnswerRu}
                          onChange={(e) => setCorrectAnswerRu(e.target.value.replace(/\s/g, ''))}
                          placeholder="Latext (Rus)"
                          className="w-full border rounded-[8px] py-[8px] px-[12px]"
                        />
                        <MathJax dynamic>{correctAnswerRu}</MathJax>
                      </div>
                    </MathJaxContext>
                  </div>
                )}

                {questionType === 'choice' &&
                  ['A', 'B', 'C', 'D'].map((option) => (
                    <div key={option} className="space-y-2 px-[16px]">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="correctAnswers"
                          checked={correctAnswers.includes(option)}
                          onChange={() =>
                            setCorrectAnswers((prev) =>
                              prev.includes(option) ? prev.filter((ans) => ans !== option) : [...prev, option]
                            )
                          }
                        />
                        <span className="font-medium">{option}:</span>
                      </div>
                      <input
                        type="text"
                        value={choices[option].text_uz}
                        onChange={(e) =>
                          setChoices((prev) => ({
                            ...prev,
                            [option]: {
                              ...prev[option],
                              text_uz: e.target.value
                            }
                          }))
                        }
                        className="border border-[#E9E9E9] rounded-[8px] py-[8px] px-[12px] w-full"
                        placeholder={`${option} javobini o'zbek tilida kiriting`}
                      />
                      <input
                        type="text"
                        value={choices[option].text_ru}
                        onChange={(e) =>
                          setChoices((prev) => ({
                            ...prev,
                            [option]: {
                              ...prev[option],
                              text_ru: e.target.value
                            }
                          }))
                        }
                        className="border border-[#E9E9E9] rounded-[8px] py-[8px] px-[12px] w-full"
                        placeholder={`${option} javobini rus tilida kiriting`}
                      />
                    </div>
                  ))}

                {questionType === 'image_choice' && (
                  <div className="mt-4 px-[16px] space-y-2">
                    {['A', 'B', 'C', 'D'].map((letter) => (
                      <div key={letter}>
                        <label>{letter} varianti:</label>
                        <input
                          type="text"
                          placeholder="Variant matni"
                          value={choices[letter]}
                          onChange={(e) => handleChoiceChange(e, letter)}
                        />
                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, letter)} />
                        {images[letter] && <span>{images[letter].name}</span>}
                      </div>
                    ))}
                  </div>
                )}

                {questionType === 'composite' && (
                  <div className="px-[16px] space-y-4">
                    <MathJaxContext
                      config={{
                        loader: { load: ['input/tex', 'output/chtml'] }
                      }}
                    >
                      {compositeQuestions.map((question, index) => (
                        <div key={index} className="space-y-2 border border-gray-200 p-4 rounded-md">
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <input
                                type="text"
                                name="text1_uz"
                                value={question.text1_uz}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Text 1 (O'zbek)"
                                className="w-full border rounded-[8px] py-[8px] px-[12px]"
                              />
                              <MathJax dynamic>{question.text1_uz}</MathJax>
                            </div>
                            <div>
                              <input
                                type="text"
                                name="correct_answer"
                                value={question.correct_answer}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="To‘g‘ri javob (O'zbek)"
                                className="w-full border rounded-[8px] py-[8px] px-[12px]"
                              />
                              <MathJax dynamic>{question.correct_answer}</MathJax>
                            </div>
                            <div>
                              <input
                                type="text"
                                name="text2_uz"
                                value={question.text2_uz}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Text 2 (O'zbek)"
                                className="w-full border rounded-[8px] py-[8px] px-[12px]"
                              />
                              <MathJax dynamic>{question.text2_uz}</MathJax>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <input
                                type="text"
                                name="text1_ru"
                                value={question.text1_ru}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Text 1 (Rus)"
                                className="w-full border rounded-[8px] py-[8px] px-[12px]"
                              />
                              <MathJax dynamic>{question.text1_ru}</MathJax>
                            </div>
                            <div>
                              <input
                                type="text"
                                name="correct_answer"
                                value={question.correct_answer}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="To‘g‘ri javob (Rus)"
                                className="w-full border rounded-[8px] py-[8px] px-[12px]"
                              />
                              <MathJax dynamic>{question.correct_answer}</MathJax>
                            </div>
                            <div>
                              <input
                                type="text"
                                name="text2_ru"
                                value={question.text2_ru}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Text 2 (Rus)"
                                className="w-full border rounded-[8px] py-[8px] px-[12px]"
                              />
                              <MathJax dynamic>{question.text2_ru}</MathJax>
                            </div>
                          </div>

                          {compositeQuestions.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveQuestion(index)}
                              className="text-red-500 hover:text-red-700 text-lg mt-2"
                            >
                              ❌ O'chirish
                            </button>
                          )}
                        </div>
                      ))}
                    </MathJaxContext>
                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                      {t('addNewQuestion')}
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

              <div className="px-[16px] py-[12px] flex items-center justify-end">
                <Button onclick={onSubmitCreateQuestion} classname={'!py-2'}>
                  {t('complete')}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Test o'zgartirish */}
      {editModal && (
        <AnimatePresence>
          <motion.div
            className={`fixed inset-0 right-0 flex items-center justify-end z-50 transition-all bg-black bg-opacity-70 duration-300 `}
          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-bl-[16px]  rounded-tl-[16px] right-0 shadow-lg w-1/2 h-screen overflow-y-auto font-sf"
            >
              <div className="flex justify-between px-[16px] py-[18px]">
                <h3 className="text-[19px] font-semibold">{t('createQuestion')}</h3>
                <button onClick={() => setEditModal(false)} className="rounded">
                  <Image src={'/icons/close.svg'} alt="circle" width={24} height={24} />
                </button>
              </div>

              <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

              <div className="space-y-[15px] my-[20px]">
                <div className="px-[16px] mt-[18px] mb-[9px]">
                  <label>{t('question')} (O&apos;zbek tilida)</label>

                  <ClientOnly>
                    {ClassicEditor && (
                      <div style={{ minHeight: '200px' }}>
                        <CKEditor
                          editor={ClassicEditor}
                          data={questionText}
                          onChange={(event, editor) => {
                            const data = editor.getData()
                            setQuestionText(data)
                          }}
                          config={mentorCKEditorConfig}
                        />
                      </div>
                    )}
                  </ClientOnly>
                </div>

                <div className="px-[16px] mt-[18px] mb-[9px]">
                  <label>{t('question')} (Rus tilida)</label>

                  <ClientOnly>
                    {ClassicEditor && (
                      <div style={{ minHeight: '200px' }}>
                        <CKEditor
                          editor={ClassicEditor}
                          data={questionTextRu}
                          onChange={(event, editor) => {
                            const data = editor.getData()
                            setQuestionTextRu(data)
                          }}
                          config={mentorCKEditorConfig}
                        />
                      </div>
                    )}
                  </ClientOnly>
                </div>

                <div className="px-[16px] mt-[18px] mb-[9px]">
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

                <div className="flex gap-4 mb-[10px]">
                  <div className="px-[16px] w-full space-y-[9px] flex flex-col">
                    <label>{t('questionType')}</label>
                    <select
                      value={questionType}
                      onChange={handleChange}
                      className="border border-[#E9E9E9] rounded-[8px] w-full py-[10px] px-[16px] "
                    >
                      <option value="" disabled>
                        {t('selectType')}
                      </option>
                      <option value="text">{t('textInput')}</option>
                      <option value="composite">{t('multipleInput')}</option>
                      <option value="choice">{t('selectOption')}</option>
                      <option value="image_choice">{t('imageOption')}</option>
                    </select>
                  </div>

                  <div className="px-[16px] w-full space-y-[9px] flex flex-col">
                    <label className="block  font-medium">{t('questionLevel')}</label>
                    <select
                      value={questionLevel}
                      onChange={(e) => setQuestionLevel(e.target.value)}
                      className="border border-[#E9E9E9] rounded-[8px] w-full py-[10px] px-[16px] "
                    >
                      <option value="" disabled>
                        ----------
                      </option>
                      <option value="1">{t('level1Easy')}</option>
                      <option disabled value="2">
                        {t('level2Medium')}
                      </option>
                      <option disabled value="3">
                        {t('level3Hard')}
                      </option>
                    </select>
                  </div>
                </div>

                {questionType === 'text' && (
                  <div className="px-[16px] mt-[18px] mb-[9px]">
                    <MathJaxContext>
                      <label>To&apos;g&apos;ri javob (O&apos;zbek tilida)</label>
                      <div>
                        <input
                          type="text"
                          value={correctAnswer}
                          onChange={(e) => setCorrectAnswer(e.target.value.replace(/\s/g, ''))}
                          placeholder="Latext (O'zbek)"
                          className="w-full border rounded-[8px] py-[8px] px-[12px]"
                        />
                        <MathJax dynamic>{correctAnswer}</MathJax>
                      </div>
                      <label>To&apos;g&apos;ri javob (Rus tilida)</label>
                      <div>
                        <input
                          type="text"
                          value={correctAnswerRu}
                          onChange={(e) => setCorrectAnswerRu(e.target.value.replace(/\s/g, ''))}
                          placeholder="Latext (Rus)"
                          className="w-full border rounded-[8px] py-[8px] px-[12px]"
                        />
                        <MathJax dynamic>{correctAnswerRu}</MathJax>
                      </div>
                    </MathJaxContext>
                  </div>
                )}

                {questionType === 'choice' &&
                  ['A', 'B', 'C', 'D'].map((option) => (
                    <div key={option} className="space-y-2 px-[16px]">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="correctAnswers"
                          checked={correctAnswers.includes(option)}
                          onChange={() =>
                            setCorrectAnswers((prev) =>
                              prev.includes(option) ? prev.filter((ans) => ans !== option) : [...prev, option]
                            )
                          }
                        />
                        <span className="font-medium">{option}:</span>
                      </div>
                      <input
                        type="text"
                        value={choices[option].text_uz}
                        onChange={(e) =>
                          setChoices((prev) => ({
                            ...prev,
                            [option]: {
                              ...prev[option],
                              text_uz: e.target.value
                            }
                          }))
                        }
                        className="border border-[#E9E9E9] rounded-[8px] py-[8px] px-[12px] w-full"
                        placeholder={`${option} javobini o'zbek tilida kiriting`}
                      />
                      <input
                        type="text"
                        value={choices[option].text_ru}
                        onChange={(e) =>
                          setChoices((prev) => ({
                            ...prev,
                            [option]: {
                              ...prev[option],
                              text_ru: e.target.value
                            }
                          }))
                        }
                        className="border border-[#E9E9E9] rounded-[8px] py-[8px] px-[12px] w-full"
                        placeholder={`${option} javobini rus tilida kiriting`}
                      />
                    </div>
                  ))}

                {questionType === 'image_choice' && (
                  <div className="mt-4 px-[16px] space-y-2">
                    {['A', 'B', 'C', 'D'].map((letter) => (
                      <div key={letter}>
                        <label>{letter} varianti:</label>
                        <input
                          type="text"
                          placeholder="Variant matni"
                          value={choices[letter]}
                          onChange={(e) => handleChoiceChange(e, letter)}
                        />
                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, letter)} />
                        {images[letter] && <span>{images[letter].name}</span>}
                      </div>
                    ))}
                  </div>
                )}

                {questionType === 'composite' && (
                  <div className="px-[16px] space-y-4">
                    <MathJaxContext
                      config={{
                        loader: { load: ['input/tex', 'output/chtml'] }
                      }}
                    >
                      {compositeQuestions.map((question, index) => (
                        <div key={index} className="space-y-2 border border-gray-200 p-4 rounded-md">
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <input
                                type="text"
                                name="text1_uz"
                                value={question.text1_uz}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Text 1 (O'zbek)"
                                className="w-full border rounded-[8px] py-[8px] px-[12px]"
                              />
                              <MathJax dynamic>{question.text1_uz}</MathJax>
                            </div>
                            <div>
                              <input
                                type="text"
                                name="correct_answer"
                                value={question.correct_answer}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="To‘g‘ri javob (O'zbek)"
                                className="w-full border rounded-[8px] py-[8px] px-[12px]"
                              />
                              <MathJax dynamic>{question.correct_answer}</MathJax>
                            </div>
                            <div>
                              <input
                                type="text"
                                name="text2_uz"
                                value={question.text2_uz}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Text 2 (O'zbek)"
                                className="w-full border rounded-[8px] py-[8px] px-[12px]"
                              />
                              <MathJax dynamic>{question.text2_uz}</MathJax>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <input
                                type="text"
                                name="text1_ru"
                                value={question.text1_ru}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Text 1 (Rus)"
                                className="w-full border rounded-[8px] py-[8px] px-[12px]"
                              />
                              <MathJax dynamic>{question.text1_ru}</MathJax>
                            </div>
                            <div>
                              <input
                                type="text"
                                name="correct_answer"
                                value={question.correct_answer}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="To‘g‘ri javob (Rus)"
                                className="w-full border rounded-[8px] py-[8px] px-[12px]"
                              />
                              <MathJax dynamic>{question.correct_answer}</MathJax>
                            </div>
                            <div>
                              <input
                                type="text"
                                name="text2_ru"
                                value={question.text2_ru}
                                onChange={(e) => handleInputChange(index, e)}
                                placeholder="Text 2 (Rus)"
                                className="w-full border rounded-[8px] py-[8px] px-[12px]"
                              />
                              <MathJax dynamic>{question.text2_ru}</MathJax>
                            </div>
                          </div>
                          {/* <div className="flex gap-4">
                            <EditableMathField
                              latex={question.text1_uz || ""}
                              onChange={(mathField) => {
                                handleInputChange(index, {
                                  target: { name: "text1_uz", value: mathField.latex() },
                                });
                              }}
                              style={textMathStyle}
                            />
                            <EditableMathField
                              latex={question.correct_answer || ""}
                              onChange={(mathField) => {
                                handleInputChange(index, {
                                  target: { name: "correct_answer", value: mathField.latex() },
                                });
                              }}
                              style={textMathStyle}
                            />
                            <EditableMathField
                              latex={question.text2_uz || ""}
                              onChange={(mathField) => {
                                handleInputChange(index, {
                                  target: { name: "text2_uz", value: mathField.latex() },
                                });
                              }}
                              style={textMathStyle}
                            />
                          </div>

                          <div className="flex gap-4">
                            <EditableMathField
                              latex={question.text1_ru || ""}
                              onChange={(mathField) => {
                                handleInputChange(index, {
                                  target: { name: "text1_ru", value: mathField.latex() },
                                });
                              }}
                              style={textMathStyle}
                            />
                            <EditableMathField
                              latex={question.correct_answer || ""}
                              onChange={(mathField) => {
                                handleInputChange(index, {
                                  target: { name: "correct_answer", value: mathField.latex() },
                                });
                              }}
                              style={textMathStyle}
                            />
                            <EditableMathField
                              latex={question.text2_ru || ""}
                              onChange={(mathField) => {
                                handleInputChange(index, {
                                  target: { name: "text2_ru", value: mathField.latex() },
                                });
                              }}
                              style={textMathStyle}
                            />
                          </div> */}

                          {compositeQuestions.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveQuestion(index)}
                              className="text-red-500 hover:text-red-700 text-lg mt-2"
                            >
                              ❌ O'chirish
                            </button>
                          )}
                        </div>
                      ))}
                    </MathJaxContext>

                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
                    >
                      {t('addNewQuestion')}
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

              <div className="px-[16px] py-[12px] flex items-center justify-end">
                <Button onclick={() => onSubmitEditCreatedQuestion(selectedQuestion?.id)} classname={'!py-2'}>
                  {t('complete')}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
      {/* Testni o'chirish */}
      {deleteModal && (
        <SimpleModal open={deleteModal} onClose={() => setDeleteModal(false)}>
          <div className="flex justify-between px-[16px] py-[18px]">
            <h3 className="text-[19px] font-semibold">Savolni o&apos;chirish</h3>
            <button onClick={() => setDeleteModal(false)} className="rounded">
              <Image src={'/icons/close.svg'} alt="circle" width={24} height={24} />
            </button>
          </div>

          <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

          <div>
            <p className="px-[16px] py-[18px]">
              {' '}
              Belgilangan savolni o&apos;chirganingizdan so&apos;ng, uni tiklab bo&apos;lmaydi.
            </p>
          </div>

          <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>
          <div className="px-[16px] py-[12px] flex items-center justify-center">
            <Button
              classname={'!py-2'}
              disabled={isDeleting}
              onclick={() => {
                onSubmitDeleteQuestion(selectedQuestion?.id)
              }}
            >
              {isDeleting ? "O'chirilmoqda..." : "O'chirish"}
            </Button>
          </div>
        </SimpleModal>
      )}
    </>
  )
}

export default SubjectDetail
