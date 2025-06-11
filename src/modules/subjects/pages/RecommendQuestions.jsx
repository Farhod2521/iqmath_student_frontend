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
import VideoPlayer from '@/components/video-player'

import { Button } from '@heroui/react'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import ModalLevel from '../components/modal/ModalLevel'
import ExamQuestionList from '../components/exam/ExamQuestionList'
import ExamQuestionSelected from '../components/exam/ExamQuestionSelected'
import ExamAnswerChoice from '../components/exam/ExamAnswerChoice'
import ExamAnswerComposite from '../components/exam/ExamAnswerComposite'
import ExamAnswerText from '../components/exam/ExamAnswerText'
import ActionSolution from '../components/actions/ActionSolution'
import ActionInfo from '../components/actions/ActionInfo'
import Calculator from '../components/calculator/Calculator'
import ActionCalculator from '../components/actions/ActionCalculator'
import { wrapMathAnswer, wrapPlainMath } from '../utils/wrapAnswer'

export default function RecommendQuestions() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { chapterId, id } = router.query
  const { data: session } = useSession()
  const mathFieldRef = useRef(null)
  const mathFieldRefs = useRef({})

  const [tab, setTab] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const [showCalculator, setShowCalculator] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showMistake, setShowMistake] = useState(false)
  const [activeInputId, setActiveInputId] = useState(null)

  const [textAnswers, setTextAnswers] = useState({})
  const [choiceAnswers, setChoiceAnswers] = useState({})
  const [compositeAnswers, setCompositeAnswers] = useState({})
  const [results, setResults] = useState()
  const [score, setScore] = useState()

  const { data: questions, isLoading } = useGetQuery({
    key: KEYS.studentQuestions,
    url: `${URLS.studentQuestions}${id}/`,
    params: { level: 1 },
    headers: { Authorization: `Bearer ${session?.accessToken}` || '' },
    enabled: !!id && !!session?.accessToken
  })

  const { mutate: checkMyResults } = usePostQuery({
    listKeyId: 'check-my-results-student'
  })

  useEffect(() => {
    import('react-mathquill').then((mq) => mq.addStyles())
  }, [])

  useEffect(() => {
    const data = get(questions, 'data', [])
    if (data.length > 0) {
      setSelectedQuestion(data[selectedIndex])
    }
  }, [selectedIndex, questions])

  const handleTabChange = (level) => setTab(level)
  const handlePrev = () => setSelectedIndex((prev) => Math.max(prev - 1, 0))
  const handleNext = () => setSelectedIndex((prev) => Math.min(prev + 1, get(questions, 'data', []).length - 1))

  const handleCheckMyResults = () => {
    const langKey = i18n.language === 'uz' ? 'answer_uz' : 'answer_ru'
    const qData = get(questions, 'data', [])

    const text_answers = qData
      .filter((q) => q.question_type === 'text')
      .map((q) => ({
        question_id: q.id,
        [langKey]: wrapMathAnswer(textAnswers[q.id] || '')
      }))

    const choice_answers = qData
      .filter((q) => q.question_type === 'choice')
      .map((q) => ({
        question_id: q.id,
        choices: choiceAnswers[q.id] ? [choiceAnswers[q.id]] : []
      }))

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
          setTextAnswers({})
          setCompositeAnswers({})
          setChoiceAnswers({})
          setShowResult(true)
          toast.success('Siz testni yakunladingiz!')
        },
        onError: () => toast.error("Test to'liq bajaring!")
      }
    )
  }

  const selectedList = useMemo(() => {
    const filterData = (fields) =>
      Object.entries(fields)
        .filter(([key, value]) => !!value)
        .map((i) => i[0])

    const listText = filterData(textAnswers)
    const listChoice = filterData(choiceAnswers)
    const listComposite = filterData(compositeAnswers)

    return [...listText, ...listChoice, ...listComposite]
  }, [textAnswers, choiceAnswers, compositeAnswers])

  if (isLoading) return <div className="p-4 text-gray-500 italic  text-center w-full">{t('chooseQueation')}</div>

  return (
    <div className="font-sf">
      <ModalLevel handleTabChange={handleTabChange} tab={tab} />
      <div className="grid grid-cols-1 md:grid-cols-12 p-4 md:p-[24px] gap-6">
        <div className="md:col-span-6 md:overflow-y-auto md:max-h-[80vh] border-r border-r-[#F2F2F7]">
          <ExamQuestionList
            questions={get(questions, 'data', [])}
            selectedList={selectedList}
            selectedQuestion={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
            setSelectedIndex={setSelectedIndex}
          />
        </div>

        <div className="md:col-span-6 py-4 md:py-[24px] px-4 md:px-[50px] space-y-6 md:space-y-[32px]">
          <ExamQuestionSelected selectedQuestion={selectedQuestion} selectedIndex={selectedIndex} />

          <div className="w-full flex flex-col items-center">
            {(() => {
              switch (selectedQuestion?.question_type) {
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

              {selectedIndex === get(questions, 'data', []).length - 1 ? (
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
              <ActionSolution selectedQuestion={selectedQuestion} />
              <ActionInfo />
              <ActionCalculator setShowCalculator={setShowCalculator} />
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

          {showSolution && (
            <VideoPlayer
              url={i18n.language === 'uz' ? selectedQuestion?.video_url_uz : selectedQuestion?.video_url_ru}
              title={i18n.language === 'uz' ? selectedQuestion.name_uz : selectedQuestion.name_ru}
              onClose={() => setShowSolution(false)}
            />
          )}

          {showResult && (
            <SimpleModal>
              <div className="relative">
                <button onClick={() => setShowResult(false)} className="absolute right-0 float-right p-[24px]">
                  <Image src={'/icons/close.svg'} alt="circle" width={24} height={24} />
                </button>
              </div>

              <div className=" flex flex-col justify-center items-center">
                <Image src={'/icons/award.svg'} alt="circle" width={84} height={118} className="mt-[24px]" />

                <p className="text-[22px] font-semibold mt-[24px] mb-[16px] ">
                  {t('yourScore', { score: get(score, 'data.result[0].score', 0) })}
                </p>
                <p className="text-center">
                  {t('yourAnswer', {
                    answer: get(score, 'data.result[0].correct_answers'),
                    total: get(score, 'data.result[0].total_answers')
                  })}
                  <br /> {t('yourResult', { result: get(score, 'data.result[0].score', 0) })}
                </p>

                <div className="bg-[#E9E9E9] w-full h-[1px] my-[24px]"></div>

                <div className="flex pb-[24px] gap-x-[12px] text-sm">
                  <Button onPress={() => setShowMistake(true)}>{t('myResults')}</Button>
                  <Button
                    onPress={() => {
                      setShowResult(false)
                    }}
                  >
                    {t('goAgain')}
                  </Button>
                  <Button onPress={() => router.push('/dashboard/student/subjects')}>{t('toHomePage')}</Button>
                </div>
              </div>
            </SimpleModal>
          )}

          {showMistake && (
            <SimpleModal>
              <div>
                <div className="flex justify-between px-[16px] py-[18px]">
                  <h3 className="text-[19px] font-semibold">{t('myResults')}</h3>
                  <button onClick={() => setShowMistake(false)} className="rounded">
                    <Image src={'/icons/close.svg'} alt="circle" width={24} height={24} />
                  </button>
                </div>

                <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

                <div className="py-[16px] px-[24px] flex justify-between items-center">
                  <div className="flex gap-1 items-center">
                    <div className=" w-6 h-6 flex items-center justify-center border rounded-full text-sm">
                      {get(score, 'data.result[0].total_answers')}
                    </div>
                    <p>/</p>
                    <div className=" w-6 h-6 flex items-center justify-center border rounded-full text-sm border-[#2EB14F] bg-[#EBF9EEFF]">
                      {get(score, 'data.result[0].correct_answers')}
                    </div>
                  </div>

                  <div className="flex gap-1 items-center">
                    <p>{t('totalPoints')}: </p>
                    <div className="text-sm">{get(score, 'data.result[0].score')}</div>
                  </div>
                </div>

                <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

                <div className="py-[16px] px-[24px] max-h-[400px] overflow-y-auto">
                  <ul className="space-y-2">
                    {get(results, 'data.question', []).map((question, index) => (
                      <li key={index} className={`p-3  rounded-md flex items-center gap-x-[12px] cursor-pointer `}>
                        <div
                          className={`min-w-10 min-h-10 flex items-center justify-center border-2  ${
                            question?.answer === false
                              ? 'bg-[#FFEBEA] border-[#FF3B30]'
                              : 'border-[#2EB14F] bg-[#EBF9EEFF]'
                          }  rounded-full text-black font-bold`}
                        >
                          {index + 1}
                        </div>
                        <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
                          <MathJax dynamic>
                            <div> {parse(question?.question_uz || question?.question_ru || '')}</div>
                          </MathJax>
                        </MathJaxContext>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

                <div className="py-[16px] px-[16px] flex justify-end gap-[12px]">
                  <Button
                    className={'!bg-transparent border !text-black'}
                    onPress={() => {
                      toast.success('Mentorga yuborildi')
                    }}
                  >
                    {t('sendMentor')}
                  </Button>
                  <Button onPress={() => router.push(`/dashboard/student/diagnostics/recommended-topics/${id}`)}>
                    {t('repeatTopic')}
                  </Button>
                </div>
              </div>
            </SimpleModal>
          )}
        </div>
      </div>
    </div>
  )
}
