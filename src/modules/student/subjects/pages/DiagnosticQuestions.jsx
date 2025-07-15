import { useState, useEffect, useMemo, useRef } from 'react'
import { useTopicStore } from '@/store'

import { useRouter } from 'next/router'
import parse from 'html-react-parser'
import Image from 'next/image'
import SimpleModal from '@/components/modal/simple-modal'
import usePostQuery from '@/hooks/api/usePostQuery'
import { URLS } from '@/constants/url'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { get } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { Button } from '@heroui/react'
import ModalLevel from '../components/modal/ModalLevel'
import ExamQuestionList from '../components/exam/ExamQuestionList'
import ExamQuestionSelected from '../components/exam/ExamQuestionSelected'
import ExamAnswerChoice from '../components/exam/ExamAnswerChoice'
import ExamAnswerComposite from '../components/exam/ExamAnswerComposite'
import ExamAnswerText from '../components/exam/ExamAnswerText'
import ActionCalculator from '../components/actions/ActionCalculator'
import ActionInfo from '../components/actions/ActionInfo'
import Calculator from '../components/calculator/Calculator'
import { wrapMathAnswer, wrapPlainMath } from '../utils/wrapAnswer'

const DiagnosticQuestions = () => {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const mathFieldRef = useRef(null)
  const mathFieldRefs = useRef({})
  const [tab, setTab] = useState(1)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showNextModal, setShowNextModal] = useState(false)
  const router = useRouter()
  const [testQuestions, setTestQuestions] = useState()
  const [showCalculator, setShowCalculator] = useState(false)
  const [showMistake, setShowMistake] = useState(false)
  const [results, setResults] = useState()
  const [score, setScore] = useState()
  const [activeInputId, setActiveInputId] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [textAnswers, setTextAnswers] = useState({})
  const [choiceAnswers, setChoiceAnswers] = useState({})
  const [compositeAnswers, setCompositeAnswers] = useState({})

  const setTopic = useTopicStore((state) => state.setTopic)

  useEffect(() => {
    import('react-mathquill').then((mq) => {
      mq.addStyles()
    })
  }, [])

  // har sahifaga kirganda modalni ko'rsatish uchun
  useEffect(() => {
    setShowNextModal(true)
  }, [])
  
  // next and prev uchun
  useEffect(() => {
    if (testQuestions?.length > 0) {
      setSelectedQuestion(testQuestions[selectedIndex])
    }
  }, [selectedIndex, testQuestions])

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < testQuestions.length - 1 ? prev + 1 : prev))
  }

  // testni boshlash uchun post
  const { mutate: beginTest, isLoading } = usePostQuery({
    listKeyId: 'begin-test',
    hideSuccessToast: true
  })

  const handleBeginTest = () => {
    beginTest(
      { url: URLS.beginTest, attributes: { level: tab } },
      {
        onSuccess: (res) => {
          setTestQuestions(res?.data?.questions)
          setShowNextModal(false)
          toast.success('Diqqat! Test boshlandi.')
        },
        onError: (err) => {
          toast.error('Error starting test')
        }
      }
    )
  }

  useEffect(() => {
    handleBeginTest()
  }, [])

  // natijani ko'rish uchun post
  const { mutate: checkMyResults, isLoading: isLoadingCheck } = usePostQuery({
    listKeyId: 'check-my-results',
    hideSuccessToast: true
  })

  const handleCheckMyResults = () => {
    const lang = i18n.language === 'uz' ? 'uz' : 'ru'
    const langAnswerKey = lang === 'uz' ? 'answer_uz' : 'answer_ru'

    const text_answers = testQuestions
      .filter((q) => q.question_type === 'text')
      .map((q) => {
        const userAnswer = textAnswers[q.id] || ''
        const wrapped = wrapMathAnswer(userAnswer)
        return {
          question_id: q.id,
          [langAnswerKey]: wrapped
        }
      })

    const choice_answers = testQuestions
      .filter((q) => q.question_type === 'choice')
      .map((q) => {
        const selected = choiceAnswers[q.id]
        return {
          question_id: q.id,
          choices: selected ? [selected] : []
        }
      })

    const composite_answers = testQuestions
      .filter((q) => q.question_type === 'composite')
      .map((q) => {
        const userSubAnswers = compositeAnswers[q.id] || {}
        const sub_answers = q.sub_questions.map((sub) => {
          return wrapPlainMath(userSubAnswers[sub.id] || '')
        })
        return {
          question_id: q.id,
          answers: sub_answers
        }
      })

    checkMyResults(
      {
        url: URLS.checkMyResults,
        attributes: {
          text_answers,
          choice_answers,
          composite_answers
        },
        config: {
          headers: { Authorization: `Bearer ${session?.accessToken}` }
        }
      },
      {
        onSuccess: (res) => {
          setResults(res)
          setScore(res)
          setTopic(tab)
          router.push('/dashboard/student/recommendations')
          toast.success('Siz testni yakunladingiz!')
          setShowMistake(true)
        },
        onError: (err) => {
          toast.error("Testni to'liq bajaring!")
        }
      }
    )
  }

  const selectedList = useMemo(() => {
    const answeredQuestions = new Set()

    Object.entries(textAnswers).forEach(([questionId, answer]) => {
      if (answer && answer.trim() !== '') {
        answeredQuestions.add(questionId)
      }
    })

    Object.entries(choiceAnswers).forEach(([questionId, answer]) => {
      if (answer && answer !== null && answer !== undefined) {
        answeredQuestions.add(questionId)
      }
    })

    Object.entries(compositeAnswers).forEach(([questionId, subAnswers]) => {
      if (subAnswers && typeof subAnswers === 'object') {
        const hasAnyAnswer = Object.values(subAnswers).some(
          answer => answer && answer.trim() !== ''
        )
        if (hasAnyAnswer) {
          answeredQuestions.add(questionId)
        }
      }
    })

    return Array.from(answeredQuestions)
  }, [textAnswers, choiceAnswers, compositeAnswers])

  if (isLoading || !testQuestions)
    return <div className="p-4 text-gray-500 italic  text-center w-full">{t('chooseQueation')}</div>

  return (
    <div className="font-sf">
      <ModalLevel handleTabChange={(tab) => setTab(tab)} tab={tab} />

      <div className="grid grid-cols-1 md:grid-cols-12 p-4 md:p-[24px] gap-6">
        <div className="md:col-span-6 md:overflow-y-auto md:max-h-[80vh] border-r border-r-[#F2F2F7]">
          <ExamQuestionList
            questions={testQuestions || []}
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
                color="primary"
                onPress={handlePrev}
                isDisabled={selectedIndex === 0}
                className={`px-4 py-2 rounded-md`}
              >
                {t('back')}
              </Button>

              {selectedIndex === testQuestions.length - 1 ? (
                <Button
                  color="primary"
                  className="rounded-md"
                  onPress={() => {
                    handleCheckMyResults()
                  }}
                >
                  {t('check')}
                </Button>
              ) : (
                <Button className="rounded-md" color="primary" onPress={handleNext}>
                  {t('next')}
                </Button>
              )}
            </div>
            <div className="flex gap-3 items-center">
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
                        <MathJaxContext
                          config={{
                            loader: {
                              load: ['input/tex', 'output/chtml']
                            }
                          }}
                        >
                          <MathJax dynamic>
                            <div>{parse(question.question_uz || question.question_ru || '')}</div>
                          </MathJax>
                        </MathJaxContext>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

                <Link
                  href={`/dashboard/student/recommendations`}
                  className="flex items-center justify-center py-[16px]"
                >
                  <Button color="primary">{t('recommendation')}</Button>
                </Link>
              </div>
            </SimpleModal>
          )}
        </div>
      </div>
    </div>
  )
}

export default DiagnosticQuestions
