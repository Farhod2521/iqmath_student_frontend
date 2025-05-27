import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { get } from 'lodash'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import parse from 'html-react-parser'

import useGetQuery from '@/hooks/api/useGetQuery'
import usePostQuery from '@/hooks/api/usePostQuery'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'

import SimpleModal from '@/components/modal/simple-modal'
import WarningModal from '@/components/modal/warning-modal'
import VideoPlayer from '@/components/video-player'
import Symbols from '@/components/mathSymbols'
import InfoCircleIcon from '@/components/icons/info-circle'
import NavbarLangue from '@/layout/navbar/NavbarLangue'
import { Button } from '@heroui/react'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import LanguageDropdown from '@/components/language'
import InfoWarning from '@/features/diagnostics/InfoWarning'

const EditableMathField = dynamic(() => import('react-mathquill').then((mod) => mod.EditableMathField), { ssr: false })

const wrapMathAnswer = (value) => {
  const trimmedValue = value.trim()
  const isMathExpression = /\\(frac|sqrt|sum|int|log|sin|cos|tan|theta|pi|cdot|times|div)\b/.test(trimmedValue)
  if (isMathExpression) return `\\(${trimmedValue}\\)`
  if (/^\d+(\.\d+)?$/.test(trimmedValue)) return trimmedValue
  return `\\(${trimmedValue}\\)`
}

const wrapPlainMath = (value) => {
  const trimmedValue = value.trim()
  const isMathExpression = /\\(frac|sqrt|sum|int|log|sin|cos|tan|theta|pi|cdot|times|div|)\b/.test(trimmedValue)
  return isMathExpression ? `\\( ${trimmedValue} \\)` : trimmedValue
}

export default function StudentTestPage() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { id, chapterId, topicId } = router.query
  const { data: session } = useSession()

  const [tab, setTab] = useState(1)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showNextModal, setShowNextModal] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
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
    url: `${URLS.studentQuestions}${topicId}/`,
    params: { level: tab },
    headers: { Authorization: `Bearer ${session?.accessToken}` || '' },
    enabled: !!topicId && !!session?.accessToken
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

  const handleShowWarning = () => {
    setShowWarning(true)
    setTimeout(() => setShowWarning(false), 5000)
  }

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
        onError: () => toast.error("Testni to'liq bajaring")
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

  return (
    <div className="font-sf">
      {showNextModal && (
        <SimpleModal>
          <div className="flex justify-between px-[16px] py-[18px]">
            <h3 className="text-[19px] font-semibold">{t('theory')}</h3>
            <button onClick={() => setShowNextModal(false)} className="rounded">
              <Image src="/icons/close.svg" alt="close" width={24} height={24} />
            </button>
          </div>
          <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>
          <div className="p-[24px]">
            <p className="text-[15px]">{t('chooseYourLevel')}</p>
            <ul className="flex mt-[16px] gap-x-[12px]">
              <li className="flex-grow">
                <button
                  onClick={() => handleTabChange(1)}
                  className={`border  ${
                    tab === 1 ? 'border-[#5D87FF]' : 'border-[#E9E9E9]'
                  } rounded-[12px] px-[16px] w-full block py-[12px] translation-all duration-300`}
                >
                  {t('level1')}
                </button>
              </li>
              <li className="flex-grow">
                <button
                  onClick={() => handleTabChange(2)}
                  className={`border  ${
                    tab === 2 ? 'border-[#5D87FF]' : 'border-[#E9E9E9]'
                  } rounded-[12px] px-[16px] w-full block py-[12px] translation-all duration-300`}
                >
                  {t('level2')}
                </button>
              </li>
              <li className="flex-grow">
                <button
                  onClick={() => handleTabChange(3)}
                  className={`border  ${
                    tab === 3 ? 'border-[#5D87FF]' : 'border-[#E9E9E9]'
                  } rounded-[12px] px-[16px] w-full block py-[12px] translation-all duration-300`}
                >
                  {t('level3')}
                </button>
              </li>
            </ul>
          </div>

          <div className="bg-[#E9E9E9] w-full h-[1px] p-0"></div>

          <div className="flex flex-col sm:flex-row justify-center gap-y-2 sm:gap-y-0 gap-x-2 py-[18px]">
            <button
              onClick={() => setShowNextModal(false)}
              className="bg-[#5D87FF] text-white py-[11px] px-[26px] rounded-[8px] w-full sm:w-auto"
            >
              {t('takeTest')}
            </button>
          </div>
        </SimpleModal>
      )}
      <div className="flex justify-between pl-[24px] pr-[16px] py-[14px] border-b border-b-[#F2F2F7] items-center">
        <div className="flex items-center gap-x-[12px]">
          <h1 className="text-[22px] font-semibold">{t('theory')}</h1>
          <div className="w-[1px] h-[26px] bg-[#E9E9E9]"></div>
          <p className="text-[17px] text-[#525252]">{t('task')}</p>
        </div>

        <div className="flex items-center">
          {/* <NavbarLangue /> */}
          <LanguageDropdown />
          <div className="w-[1px] h-[25px] bg-gray-300 mx-[10px]"></div>
          <Button
            onPress={() => router.push(`/dashboard/student/subjects/${id}/${chapterId}/${topicId}`)}
            className="float-right rounded"
            variant="light"
            isIconOnly
          >
            <Image src={'/icons/close.svg'} alt="circle" width={24} height={24} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 p-[24px]">
        <div className="col-span-6 overflow-y-auto max-h-screen border-r border-r-[#F2F2F7]">
          <ul className="space-y-2">
            {get(questions, 'data', [])?.map((question, index) => {
              let classIndex = ''
              if (!selectedList.includes(String(question?.id))) classIndex = 'border-[#ff0a04]'
              if (selectedList.includes(String(question?.id))) classIndex = 'border-[#037AFF]'
              if (selectedQuestion?.id === question?.id) classIndex = 'border-white shadow-md bg-[#037AFF] text-white'
              return (
                <li
                  key={index}
                  className={`p-3  rounded-md flex items-center gap-x-[12px] cursor-pointer `}
                  onClick={() => {
                    setSelectedIndex(index)
                    setSelectedQuestion(question)
                  }}
                >
                  <div
                    className={`min-w-10 min-h-10 flex items-center justify-center border-2 rounded-full text-black font-bold ${classIndex}`}
                  >
                    {index + 1}
                  </div>
                  <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
                    <MathJax dynamic>
                      <div>
                        {parse(
                          i18n.language === 'uz' ? question?.question_text_uz || '' : question?.question_text_ru || ''
                        )}
                      </div>
                    </MathJax>
                  </MathJaxContext>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="col-span-6 py-[24px] px-[50px]">
          {selectedQuestion ? (
            <div className="">
              <div className="space-y-[32px] p-4">
                <div className="text-black text-[19px]  font-medium text-center">
                  <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
                    <MathJax dynamic>
                      <div className="flex gap-1">
                        <div
                          className={`min-w-10 min-h-10  w-10 mr-2 h-10 flex items-center border-[#007AFF] justify-center border-2 rounded-full text-black font-bold`}
                        >
                          {selectedIndex + 1}
                        </div>
                        <div className="flex flex-col justify-center items-center w-full">
                          {parse(
                            i18n.language === 'uz'
                              ? selectedQuestion?.question_text_uz || ''
                              : selectedQuestion?.question_text_ru || ''
                          )}
                        </div>
                      </div>
                    </MathJax>
                  </MathJaxContext>
                </div>
                <div className="w-full flex flex-col items-center">
                  {selectedQuestion?.question_type === 'choice' &&
                    selectedQuestion?.choices?.map((item, index) => (
                      <label key={index} className="flex items-center gap-3 cursor-pointer text-[16px]">
                        <input
                          type="radio"
                          name={`choice-${selectedQuestion.id}`} // name har bir savol uchun alohida bo‘lishi kerak
                          value={item.id}
                          checked={choiceAnswers[selectedQuestion.id] === item.id}
                          onChange={() =>
                            setChoiceAnswers((prev) => ({
                              ...prev,
                              [selectedQuestion.id]: item.id
                            }))
                          }
                          className="w-5 h-5 accent-blue-600"
                        />
                        <span className="text-gray-800">
                          <MathJaxContext
                            config={{
                              loader: { load: ['input/tex', 'output/chtml'] }
                            }}
                          >
                            <MathJax dynamic>
                              <div> {i18n.language === 'uz' ? item?.text_uz : item?.text_ru}</div>
                            </MathJax>
                          </MathJaxContext>
                        </span>
                      </label>
                    ))}
                  {selectedQuestion?.question_type === 'composite' && (
                    <div className="flex flex-col gap-4">
                      {selectedQuestion?.sub_questions?.map((item, index) => {
                        const text1 = i18n.language === 'uz' ? item?.text1_uz : item?.text1_ru
                        const text2 = i18n.language === 'uz' ? item?.text2_uz : item?.text2_ru
                        return (
                          <div key={index}>
                            <MathJaxContext
                              key={index}
                              config={{
                                loader: { load: ['input/tex', 'output/chtml'] }
                              }}
                            >
                              <div className="flex items-center gap-4">
                                <span className=" text-gray-800 text-[16px]">
                                  <MathJax dynamic key={`${selectedQuestion.id}-${item.id}-text1`}>
                                    <span> {text1}</span>
                                  </MathJax>
                                </span>
                                <EditableMathField
                                  latex={compositeAnswers[selectedQuestion.id]?.[item.id] || ''}
                                  onChange={(mathField) => {
                                    setCompositeAnswers((prev) => ({
                                      ...prev,
                                      [selectedQuestion.id]: {
                                        ...(prev[selectedQuestion.id] || {}),
                                        [item.id]: mathField.latex()
                                      }
                                    }))
                                  }}
                                  placeholder="..."
                                  onFocus={() => setActiveInputId(item.id)}
                                  style={compositeMathStyle}
                                />

                                <MathJax dynamic key={`${selectedQuestion.id}-${item.id}-text2`}>
                                  <span>{text2}</span>
                                </MathJax>
                              </div>
                            </MathJaxContext>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {selectedQuestion?.question_type === 'text' && (
                    <div className="flex items-center justify-center w-full">
                      <MathJaxContext
                        config={{
                          loader: { load: ['input/tex', 'output/chtml'] }
                        }}
                      >
                        <MathJax dynamic>
                          <span className="text-gray-800 text-[20px] font-medium text-center">
                            {selectedQuestion?.text1_uz}
                          </span>
                        </MathJax>
                      </MathJaxContext>

                      <div className="w-full">
                        <EditableMathField
                          latex={textAnswers[selectedQuestion.id] || ''}
                          onChange={(mathField) =>
                            setTextAnswers((prev) => ({
                              ...prev,
                              [selectedQuestion.id]: mathField.latex()
                            }))
                          }
                          style={textMathStyle}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex relative items-center gap-8">
                    <div className="flex justify-between items-center  gap-4">
                      <Button
                        onPress={handlePrev}
                        disabled={selectedIndex === 0}
                        className={`px-4 py-2 rounded-md  ${
                          selectedIndex === 0 ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'
                        }`}
                      >
                        {t('back')}
                      </Button>

                      {selectedIndex === get(questions, 'data', []).length - 1 ? (
                        <Button onPress={handleCheckMyResults} className="px-4 py-2 rounded-md  bg-blue-500 text-white">
                          {t('check')}
                        </Button>
                      ) : (
                        <Button className="px-4 py-2 rounded-md bg-blue-500 text-white" onPress={handleNext}>
                          {t('next')}
                        </Button>
                      )}
                    </div>

                    <Button
                      onPress={() => setShowSolution(true)}
                      className="px-8 rounded-md bg-[#EDEDF2] !text-black ml-[12px] mr-[20px]"
                    >
                      {t('showSolution')}
                    </Button>

                    <InfoWarning />
                    {/* <div className="p-[6px] mr-[20px] cursor-pointer flex items-center ">
                      <button onClick={handleShowWarning}>
                        <InfoCircleIcon color={!showWarning ? '#4D555DFF' : '#F97316FF'} />
                      </button>

                      {showWarning && (
                        <WarningModal classname={'absolute w-full max-w-[351px] -top-[80px]'}>
                          {t('cashbackNote')}
                        </WarningModal>
                      )}
                    </div> */}

                    <div className="p-[6px] mr-[20px] cursor-pointer flex items-center">
                      <button onClick={() => setShowCalculator(!showCalculator)}>
                        <Image src="/icons/calculator.svg" alt="info" width={28} height={28} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {showCalculator && (
                <div>
                  {selectedQuestion?.question_type === 'text' && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 flex items-center justify-center"
                    >
                      <Symbols
                        onClick={(symbol) => {
                          setTextAnswers((prev) => ({
                            ...prev,
                            [selectedQuestion.id]: (prev[selectedQuestion.id] || '') + symbol
                          }))
                        }}
                      />
                    </motion.div>
                  )}

                  {selectedQuestion?.question_type === 'composite' && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 flex items-center justify-center"
                    >
                      <Symbols
                        onClick={(symbol) => {
                          if (activeInputId) {
                            setCompositeAnswers((prev) => ({
                              ...prev,
                              [selectedQuestion.id]: {
                                ...(prev[selectedQuestion.id] || {}),
                                [activeInputId]: (prev[selectedQuestion.id]?.[activeInputId] || '') + symbol
                              }
                            }))
                          }
                        }}
                      />
                    </motion.div>
                  )}
                </div>
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

                    <div className="flex pb-[24px] gap-x-[12px] text-sm">
                      <Button onPress={() => setShowMistake(true)}>{t('myResults')}</Button>
                      <Button
                        onPress={() => {
                          setShowResult(false)
                          setShowNextModal(true)
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
                        onPress={() => toast.success('Mentorga yuborildi')}
                      >
                        {t('sendMentor')}
                      </Button>
                      <Button onPress={() => router.push(`/dashboard/student/subjects/${id}/${chapterId}/${topicId}`)}>
                        {t('repeatTopic')}
                      </Button>
                    </div>
                  </div>
                </SimpleModal>
              )}
            </div>
          ) : (
            <div className="p-4 text-gray-500 italic">{t('chooseQueation')}</div>
          )}
        </div>
      </div>
    </div>
  )
}

const compositeMathStyle = {
  width: '160px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '24px',
  borderRadius: '8px',
  padding: '10px',
  border: '1px solid #E9E9E9'
}

const textMathStyle = {
  width: '100%',
  height: '70px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '24px',
  borderRadius: '8px',
  padding: '10px',
  border: '1px solid #E9E9E9'
}
