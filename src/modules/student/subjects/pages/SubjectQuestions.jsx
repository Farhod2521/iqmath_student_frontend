import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { get } from 'lodash'
import { toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import parse from 'html-react-parser'

import useGetQuery from '@/hooks/api/useGetQuery'
import usePostQuery from '@/hooks/api/usePostQuery'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'

import SimpleModal from '@/components/modal/simple-modal'
import SuccessPopup from '@/components/modal/SuccessPopup'
import { Button } from '@heroui/react'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import ModalLevel from '../components/modal/ModalLevel'
import ExamQuestionList from '../components/exam/ExamQuestionList'
import ExamQuestionSelected from '../components/exam/ExamQuestionSelected'
import ExamAnswerChoice from '../components/exam/ExamAnswerChoice'
import ExamAnswerComposite from '../components/exam/ExamAnswerComposite'
import ExamAnswerImage from '../components/exam/ExamAnswerImage'
import ExamAnswerText from '../components/exam/ExamAnswerText'
import { wrapMathAnswer, wrapPlainMath } from '../utils/wrapAnswer'
import ActionSolution from '../components/actions/ActionSolution'
import ActionInfo from '../components/actions/ActionInfo'
import ActionCalculator from '../components/actions/ActionCalculator'
import Calculator from '../components/calculator/Calculator'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'

export default function SubjectQuestions() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { topicId } = router.query
  const { data: session } = useSession()
  const mathFieldRef = useRef(null)
  const mathFieldRefs = useRef({})

  const [tab, setTab] = useState(1)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showCalculator, setShowCalculator] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showMistake, setShowMistake] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [activeInputId, setActiveInputId] = useState(null)

  const [textAnswers, setTextAnswers] = useState({})
  const [choiceAnswers, setChoiceAnswers] = useState({})
  const [imageAnswers, setImageAnswers] = useState({})
  const [compositeAnswers, setCompositeAnswers] = useState({})
  const [results, setResults] = useState()
  const [score, setScore] = useState()

  const { data: questions, isLoading } = useGetQuery({
    key: KEYS.studentQuestions,
    url: `${URLS.studentQuestions}${topicId}/`,
    params: { level: tab },
    headers: { Authorization: `Bearer ${session?.accessToken}` || '' },
    enabled: !!topicId && !!session?.accessToken
  })

  const { mutate: checkMyResults } = usePostQuery({
    listKeyId: 'check-my-results-student'
  })

  const { mutate: sendToMentor } = usePostQuery({
    listKeyId: 'send-to-mentor'
  })

  useEffect(() => {
    const loadMathQuillStyles = async () => {
      try {
        const mathQuill = await import('react-mathquill')
        mathQuill.addStyles()

        if (typeof window !== 'undefined') {
          window.MathQuill = mathQuill
        }
      } catch (error) {
        console.error('MathQuill yuklanmadi:', error)
      }
    }
    loadMathQuillStyles()
  }, [])

  useEffect(() => {
    let data = []
    if (questions?.data?.questions) {
      data = questions.data.questions
    } else if (questions?.questions) {
      data = questions.questions
    } else if (questions?.data) {
      data = questions.data
    } else if (Array.isArray(questions)) {
      data = questions
    }

    if (data.length > 0 && selectedIndex < data.length) {
      setSelectedQuestion(data[selectedIndex])
    }
  }, [selectedIndex, questions])

  useEffect(() => {
    if (selectedQuestion?.question_type === 'choice') {
      setChoiceAnswers((prev) => ({
        ...prev,
        [selectedQuestion.id]: prev[selectedQuestion.id] || null
      }))
    }
  }, [selectedQuestion?.id])

  useEffect(() => {
    let data = []
    if (questions?.data?.questions) {
      data = questions.data.questions
    } else if (questions?.questions) {
      data = questions.questions
    } else if (questions?.data) {
      data = questions.data
    } else if (Array.isArray(questions)) {
      data = questions
    }

    if (data.length > 0) {
      setChoiceAnswers({})
      setTextAnswers({})
      setCompositeAnswers({})
      setSelectedIndex(0)
    }
  }, [questions])

  const handleTabChange = (level) => setTab(level)

  const getQuestionsData = () => {
    if (questions?.data?.questions) {
      return questions.data.questions
    } else if (questions?.questions) {
      return questions.questions
    } else if (questions?.data) {
      return questions.data
    } else if (Array.isArray(questions)) {
      return questions
    }
    return []
  }

  const handlePrev = () => setSelectedIndex((prev) => Math.max(prev - 1, 0))
  const handleNext = () => {
    const questionsData = getQuestionsData()
    const maxIndex = Array.isArray(questionsData) ? questionsData.length - 1 : 0
    setSelectedIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const handleCheckMyResults = () => {
    const langKey = i18n.language === 'uz' ? 'answer_uz' : 'answer_ru'
    const qData = getQuestionsData()

    if (!Array.isArray(qData)) {
      toast.error("Savollar ma'lumotlari topilmadi!")
      return
    }

    const text_answers = qData
      .filter((q) => q.question_type === 'text')
      .map((q) => ({
        question_id: q.id,
        [langKey]: wrapMathAnswer(textAnswers[q.id] || '')
      }))

    const choice_answers = qData
      .filter((q) => q.question_type === 'choice' || q.question_type === 'image_choice')
      .map((q) => {
        const selectedLetter = choiceAnswers[q.id]
        const selectedChoice = q.choices?.find((choice) => choice.letter === selectedLetter)
        return {
          question_id: q.id,
          choices: selectedChoice ? [selectedChoice.id] : []
        }
      })

    const composite_answers = qData
      .filter((q) => q.question_type === 'composite')
      .map((q) => ({
        question_id: q.id,
        answers: q.sub_questions.map((sub) => wrapPlainMath((compositeAnswers[q.id] || {})[sub.id] || ''))
      }))

    checkMyResults(
      {
        url: URLS.studentCheckAnswer,
        attributes: { choice_answers, composite_answers, text_answers },
        config: { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      },
      {
        onSuccess: (res) => {
          setScore(res)
          setResults(res)
          setShowResult(true)
          toast.success('Siz testni yakunladingiz!')
        },
        onError: (error) => {
          toast.error("Testni to'liq bajaring")
        }
      }
    )
  }

  const selectedList = useMemo(() => {
    const filterData = (fields) =>
      Object.entries(fields)
        .filter(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            return Object.values(value).some((v) => v && v.trim() !== '')
          }
          return value !== null && value !== undefined && value !== ''
        })
        .map((i) => i[0])

    const listText = filterData(textAnswers)
    const listChoice = filterData(choiceAnswers)
    const listComposite = filterData(compositeAnswers)

    return [...listText, ...listChoice, ...listComposite]
  }, [textAnswers, choiceAnswers, compositeAnswers])

  const allQuestionsList = useMemo(() => {
    const questionsData = getQuestionsData()
    if (!Array.isArray(questionsData)) {
      return []
    }
    return questionsData.map((q) => String(q.id))
  }, [questions])

  const handleSendAllToMentor = async () => {
    const dataToSend = get(results, 'data', null)
    if (!dataToSend) {
      toast.error('Yuboriladigan maʼlumot topilmadi!')
      return
    }

    if (!session?.accessToken) {
      toast.error('Avtorizatsiya xatosi!')
      return
    }

    try {
      await sendToMentor(
        {
          url: '/api/v1/func_student/student-independent/',
          attributes: dataToSend,
          config: { headers: { Authorization: `Bearer ${session.accessToken}` } }
        },
        {
          onSuccess: () => {
            setShowMistake(false)
            setShowResult(false)
            setShowSuccessPopup(true)
          },
          onError: () => toast.error('Xatolik yuz berdi!')
        }
      )
    } catch (error) {
      toast.error('Xatolik yuz berdi!')
    }
  }

  const isEndQuestion = useMemo(() => {
    const questionsData = getQuestionsData()
    const maxIndex = Array.isArray(questionsData) ? questionsData.length - 1 : 0
    return selectedIndex === maxIndex
  }, [selectedIndex])

  const handleNextEnter = () => {
    if (isEndQuestion) {
      handleCheckMyResults()
    } else {
      handleNext()
    }
  }

  useKeyboardShortcut('k', () => setShowCalculator((prev) => !prev), { mod: true })
  useKeyboardShortcut('ArrowUp', handlePrev, { ignoreInput: false })
  useKeyboardShortcut('ArrowLeft', handlePrev)
  useKeyboardShortcut('ArrowDown', handleNextEnter, { ignoreInput: false })
  useKeyboardShortcut('ArrowRight', handleNextEnter)
  useKeyboardShortcut('Enter', handleNextEnter, { ignoreInput: false })

  if (isLoading) return <div className="p-4 text-gray-500 italic  text-center w-full">{t('chooseQueation')}</div>
  return (
    <div className="font-sf">
      <ModalLevel handleTabChange={handleTabChange} tab={tab} />
      <div className="grid grid-cols-1 md:grid-cols-12 p-4 md:p-[24px] gap-6">
        <div className="md:col-span-6 md:overflow-y-auto md:max-h-[80vh] border-r border-r-[#F2F2F7]">
          <ExamQuestionList
            questions={Array.isArray(getQuestionsData()) ? getQuestionsData() : []}
            selectedList={selectedList}
            allQuestionsList={allQuestionsList}
            selectedQuestion={selectedQuestion}
            setSelectedIndex={setSelectedIndex}
          />
        </div>

        <div className="md:col-span-6 py-4 md:py-[24px] px-4 md:px-[50px] space-y-6 md:space-y-[32px]">
          <ExamQuestionSelected selectedQuestion={selectedQuestion} selectedIndex={selectedIndex} />
          <div className="w-full flex flex-col items-center">
            {(() => {
              switch (selectedQuestion?.question_type) {
                case 'image_choice':
                  return (
                    <ExamAnswerImage
                      selectedQuestion={selectedQuestion}
                      setImageAnswers={setChoiceAnswers}
                      imageAnswers={choiceAnswers}
                    />
                  )
                case 'choice':
                  return (
                    <ExamAnswerChoice
                      selectedQuestion={selectedQuestion}
                      setChoiceAnswers={setChoiceAnswers}
                      choiceAnswers={choiceAnswers}
                    />
                  )
                case 'composite':
                  return (
                    <ExamAnswerComposite
                      selectedQuestion={selectedQuestion}
                      setCompositeAnswers={setCompositeAnswers}
                      compositeAnswers={compositeAnswers}
                      setActiveInputId={setActiveInputId}
                      mathFieldRefs={mathFieldRefs}
                    />
                  )
                case 'text':
                  return (
                    <ExamAnswerText
                      mathFieldRef={mathFieldRef}
                      setTextAnswers={setTextAnswers}
                      textAnswers={textAnswers}
                      selectedQuestion={selectedQuestion}
                    />
                  )
                default:
                  return ''
              }
            })()}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              <Button
                onPress={handlePrev}
                disabled={selectedIndex === 0}
                className={`px-4 py-2 rounded-md ${
                  selectedIndex === 0 ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'
                }`}
              >
                {t('back')}
              </Button>

              {isEndQuestion ? (
                <Button onPress={handleCheckMyResults} className="px-4 py-2 rounded-md bg-blue-500 text-white">
                  {t('check')}
                </Button>
              ) : (
                <Button className="px-4 py-2 rounded-md bg-blue-500 text-white" onPress={handleNext}>
                  {t('next')}
                </Button>
              )}
            </div>

            <div className="flex gap-3 items-center">
              {questions?.data?.subject_is_active ? <ActionSolution selectedQuestion={selectedQuestion} /> : <></>}
              {/* */}
              <ActionInfo />
              {['composite', 'text'].includes(selectedQuestion?.question_type) && (
                <ActionCalculator setShowCalculator={setShowCalculator} />
              )}
            </div>
          </div>

          {showCalculator && (
            <Calculator
              mathFieldRef={mathFieldRef}
              mathFieldRefs={mathFieldRefs}
              selectedQuestion={selectedQuestion}
              setCompositeAnswers={setCompositeAnswers}
              setTextAnswers={setTextAnswers}
              activeInputId={activeInputId}
            />
          )}

          {showResult && (
            <SimpleModal open={showResult} onClose={() => setShowResult(false)} classname="modal-lg">
              <div className="relative">
                <button onClick={() => setShowResult(false)} className="absolute right-0 float-right p-[24px]">
                  <Image src={'/icons/close.svg'} alt="circle" width={24} height={24} />
                </button>
              </div>

              <div className=" flex flex-col justify-center items-center">
                <Image src={'/icons/award.svg'} alt="circle" width={84} height={118} className="mt-[24px]" />

                <p className="text-[22px] font-semibold mt-[24px] mb-[16px] ">
                  {t('yourScore', { score: get(score, 'data.result[0].correct_answers') })}
                </p>
                <p className="text-center">
                  {t('yourAnswer', {
                    answer: get(score, 'data.result[0].correct_answers'),
                    total: get(score, 'data.result[0].total_answers')
                  })}
                  <br /> {t('yourResult', { result: get(score, 'data.result[0].score', 0) })}%
                </p>

                <div className="bg-[#E9E9E9] w-full h-[1px] my-[24px]"></div>

                <div className="flex flex-wrap justify-center gap-3 pb-[24px] text-sm">
                  <Button
                    className="bg-[#007AFF] text-white hover:bg-[#007AFF]/80 rounded-md"
                    onPress={() => setShowMistake(true)}
                  >
                    {t('myResults')}
                  </Button>
                  <Button
                    className="bg-[#007AFF] text-white hover:bg-[#007AFF]/80 rounded-md"
                    onPress={() => setShowResult(false)}
                  >
                    {t('retakeTest')}
                  </Button>
                  <Button
                    className="bg-[#007AFF] text-white hover:bg-[#007AFF]/80 rounded-md"
                    onPress={() => {
                      const scorePercentage = get(score, 'data.result[0].score', 0)
                      if (scorePercentage >= 80) {
                        router.push(
                          `/dashboard/student/subjects/${router.query.id}/${router.query.chapterId}/${
                            parseInt(router.query.topicId) + 1
                          }`
                        )
                      } else {
                        router.push('/dashboard/student/subjects')
                      }
                    }}
                  >
                    {get(score, 'data.result[0].score', 0) >= 80 ? t('nextTopic') : t('toHomePage')}
                  </Button>
                </div>
              </div>
            </SimpleModal>
          )}

          {showMistake && (
            <SimpleModal open={showMistake} onClose={() => setShowMistake(false)} classname="modal-lg">
              <div className="px-8 py-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900">{t('myResults')}</h3>
              </div>
              <div className="py-6 px-8 space-y-4">
                {get(results, 'data.question', []).map((question, index) => (
                  <div key={index} className="bg-white rounded-lg   p-4 flex items-start gap-4">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg
                      ${
                        !question?.answer
                          ? 'bg-red-100 text-red-600 border-red-400'
                          : 'bg-blue-100 text-blue-600 border-blue-400'
                      } border-2`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0 text-gray-800">
                      <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
                        <MathJax dynamic>
                          <div className="text-gray-800 leading-relaxed">
                            {parse(i18n.language === 'uz' ? question?.question_uz : question?.question_ru || '')}
                          </div>
                        </MathJax>
                      </MathJaxContext>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end px-8 pb-6 gap-3">
                <Button
                  className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                  onPress={() => setShowMistake(false)}
                >
                  {t('close')}
                </Button>
                <Button
                  className="px-4 bg-[#007AFF] py-2 rounded-md  text-white hover:bg-blue-600 transition-colors"
                  onPress={handleSendAllToMentor}
                >
                  {t('sendMentor')}
                </Button>
              </div>
            </SimpleModal>
          )}
        </div>
      </div>

      <SuccessPopup open={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} />
    </div>
  )
}
