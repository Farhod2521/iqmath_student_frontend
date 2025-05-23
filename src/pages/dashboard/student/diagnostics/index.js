import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useTopicStore } from '@/store'

const MathKeyboard = dynamic(() => import('@/components/test-calc/index'), {
  ssr: false // SSR o‘chirilgan
})

const EditableMathField = dynamic(() => import('react-mathquill').then((mod) => mod.EditableMathField), { ssr: false })
import { useRouter } from 'next/router'
import parse from 'html-react-parser'
import Image from 'next/image'
import SimpleModal from '@/components/modal/simple-modal'
import usePostQuery from '@/hooks/api/usePostQuery'
import { URLS } from '@/constants/url'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
// import Button from '@/components/button'
import InfoCircleIcon from '@/components/icons/info-circle'
import Link from 'next/link'
import { get } from 'react-hook-form'
import WarningModal from '@/components/modal/warning-modal'
import Symbols from '@/components/mathSymbols'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import LanguageDropdown from '@/components/language'
import NavbarLangue from '@/layout/navbar/NavbarLangue'
import { Button } from '@heroui/react'
import InfoWarning from '@/features/diagnostics/InfoWarning'

const Index = () => {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const [tab, setTab] = useState(1)
  const [answers, setAnswers] = useState({})
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showNextModal, setShowNextModal] = useState(false)
  const router = useRouter()
  const [testQuestions, setTestQuestions] = useState()
  const [showWarning, setShowWarning] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const [showMistake, setShowMistake] = useState(false)
  const [compositeInput, setCompositeInput] = useState({})
  const [textInput, setTextInput] = useState()
  const [selectedChoice, setSelectedChoice] = useState(null)
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
  // ogohlantirsh uchun
  const handleShowWarning = () => {
    setShowWarning(true)
    setTimeout(() => setShowWarning(false), 5000)
  }
  // composite holatida
  const handleChange = (id, value) => {
    setCompositeInput((prev) => ({ ...prev, [id]: value }))
  }

  const handleInsertSymbol = (id, symbol) => {
    setCompositeInput((prev) => ({
      ...prev,
      [id]: (prev[id] || '') + symbol
    }))
  }
  //
  const handleTabChange = (tab) => {
    setTab(tab)
  }

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
      {
        url: URLS.beginTest,
        attributes: {
          level: tab
        },
        config: {
          headers: { Authorization: `Bearer ${session?.accessToken}` }
        }
      },
      {
        onSuccess: (res) => {
          setTestQuestions(res?.data)

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

  const wrapMathAnswer = (value) => {
    const trimmedValue = value.trim()

    // Agar LaTeX belgilar bo'lsa (fraction, sqrt, sum va h.k.), LaTeX formatda yuboramiz
    const isMathExpression = /\\(frac|sqrt|sum|int|log|sin|cos|tan|theta|pi|cdot|times|div)\b/.test(trimmedValue)

    if (isMathExpression) {
      return `<p>\\( ${trimmedValue} \\)</p>`
    }

    // Agar shunchaki raqam yoki oddiy ifoda bo'lsa
    if (/^\d+(\.\d+)?$/.test(trimmedValue)) {
      return trimmedValue // faqat sonni yubor
    }

    // Boshqa holatlarda ham LaTeX sifatida yuboramiz
    return `<p>\\( ${trimmedValue} \\)</p>`
  }

  const wrapPlainMath = (value) => {
    const trimmedValue = value.trim()
    const isMathExpression = /\\(frac|sqrt|sum|int|log|sin|cos|tan|theta|pi|cdot|times|div)\b/.test(trimmedValue)

    if (isMathExpression) {
      return `\\( ${trimmedValue} \\)`
    }

    return trimmedValue // oddiy text bo'lsa, o'zini qaytar
  }

  const handleCheckMyResults = () => {
    const lang = i18n.language === 'uz' ? 'uz' : 'ru'
    const langAnswerKey = lang === 'uz' ? 'answer_uz' : 'answer_ru'

    const text_answers = testQuestions
      .filter((q) => q.question_type === 'text')
      .map((q) => {
        const userAnswer = textAnswers[q.id] || ''
        const wrapped = wrapMathAnswer(userAnswer) // optional: format like \frac etc.
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
        // const sub_answers = q.sub_questions.map((sub) => ({
        //   question_id: sub.id,
        //   answer: wrapPlainMath(userSubAnswers[sub.id] || '') // wrap qilingan javob
        // }))
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
          setTextAnswers({})
          setCompositeAnswers({})
          setChoiceAnswers({})
          toast.success('Siz testni yakunladingiz!')
          setShowMistake(true)
        },
        onError: (err) => {
          // toast.error(err?.response?.data?.message)
          toast.error("Testni to'liq bajaring!")
        }
      }
    )
  }

  return (
    <div className="font-sf">
      {/* {showNextModal && (
        <SimpleModal>
          <div className="flex justify-between px-[16px] py-[18px]">
            <h3 className="text-[19px] font-semibold">{t('diagnostics')}</h3>
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
              onClick={handleBeginTest}
              className="bg-[#5D87FF] text-white py-[11px] px-[26px] rounded-[8px] w-full sm:w-auto"
            >
              {t('takeTest')}
            </button>
          </div>
        </SimpleModal>
      )} */}
      <div className="flex justify-between pl-[24px] pr-[16px] py-[14px] border-b border-b-[#F2F2F7] items-center">
        <div className="flex items-center gap-x-[12px]">
          <h1 className="text-[22px] font-semibold">{t('diagnostics')}</h1>
          <div className="w-[1px] h-[26px] bg-[#E9E9E9]"></div>
          <p className="text-[17px] text-[#525252]">{t('task')}</p>
        </div>

        <div className="flex items-center">
          {/* <NavbarLangue /> */}
          <LanguageDropdown />
          <div className="w-[1px] h-[25px] bg-gray-300 mx-[10px]"></div>
          <Button
            variant="light"
            isIconOnly
            onPress={() => router.push('/dashboard/student/subjects')}
            className="float-right rounded"
          >
            <Image src={'/icons/close.svg'} alt="circle" width={24} height={24} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 p-[24px]">
        <div className="col-span-6 overflow-y-auto max-h-screen border-r border-r-[#F2F2F7]">
          <ul className="space-y-2">
            {testQuestions?.map((question, index) => (
              <li
                key={index}
                className="p-3 rounded-md flex items-center gap-x-[12px] cursor-pointer"
                onClick={() => {
                  setSelectedIndex(index)
                  setSelectedQuestion(question)
                }}
              >
                <div
                  className={`min-w-10 min-h-10 flex items-center justify-center border-2 ${
                    selectedQuestion?.id === question?.id ? 'border-[#007AFF]' : 'hover:bg-gray-100 border-gray-300'
                  } rounded-full text-black font-bold`}
                >
                  {index + 1}
                </div>
                <div>
                  <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
                    <MathJax dynamic>
                      {parse(
                        i18n.language === 'uz' ? question?.question_text_uz || '' : question?.question_text_ru || ''
                      )}
                    </MathJax>
                  </MathJaxContext>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 py-[24px] px-[50px]">
          {selectedQuestion ? (
            <div className="">
              <div className="space-y-[32px] p-4">
                <MathJaxContext config={{ loader: { load: ['input/tex', 'output/chtml'] } }}>
                  <MathJax dynamic>
                    <div className="flex gap-1">
                      <div>{selectedIndex + 1})</div>
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

                <div className="w-full flex-col">
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
                        <span className="text-gray-800">{i18n.language === 'uz' ? item?.text_uz : item?.text_ru}</span>
                      </label>
                    ))}
                  {selectedQuestion?.question_type === 'composite' && (
                    <div className="flex flex-col gap-4 items-center">
                      {selectedQuestion?.sub_questions?.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <MathJaxContext
                            config={{
                              loader: { load: ['input/tex', 'output/chtml'] }
                            }}
                          >
                            <MathJax dynamic>
                              <span className=" text-gray-800 text-[16px]">
                                {i18n.language === 'uz' ? item?.text1_uz : item?.text1_ru}
                              </span>
                            </MathJax>
                          </MathJaxContext>

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
                            onFocus={() => setActiveInputId(item.id)}
                            style={compositeMathStyle}
                          />
                          <MathJaxContext
                            config={{
                              loader: { load: ['input/tex', 'output/chtml'] }
                            }}
                          >
                            <MathJax dynamic>
                              <span>{i18n.language === 'uz' ? item?.text2_uz : item?.text2_ru}</span>
                            </MathJax>
                          </MathJaxContext>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedQuestion?.question_type === 'text' && (
                    <div className="flex items-center justify-center">
                      <span className="text-gray-800 text-[20px] font-medium text-center">
                        <MathJaxContext
                          config={{
                            loader: { load: ['input/tex', 'output/chtml'] }
                          }}
                        >
                          <MathJax dynamic>{selectedQuestion?.text1_uz}</MathJax>
                        </MathJaxContext>
                      </span>
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
                            // setShowMistake(true)
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

                    <InfoWarning />

                    <div className="p-[6px] mr-[20px] cursor-pointer flex items-center">
                      <button onClick={() => setShowCalculator(!showCalculator)}>
                        <Image src="/icons/calculator.svg" alt="info" width={28} height={28} />
                      </button>
                    </div>
                  </div>

                  {/* <div className="p-[4px]">3 попытки</div> */}
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
                      href={`/dashboard/student/diagnostics/recommended-topics`}
                      className="flex items-center justify-center py-[16px]"
                    >
                      <Button color="primary">{t('recommendation')}</Button>
                    </Link>
                  </div>
                </SimpleModal>
              )}
            </div>
          ) : (
            <div className="p-4 text-gray-500 italic">Savolni tanlang...</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Index

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
