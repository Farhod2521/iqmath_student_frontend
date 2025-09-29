import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useTopicStore } from '@/store'

import { useRouter } from 'next/router'
import usePostQuery from '@/hooks/api/usePostQuery'
import { URLS } from '@/constants/url'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { Button } from '@heroui/react'
import ModalLevel from '../components/modal/ModalLevel'
import ExamQuestionList from '../components/exam/ExamQuestionList'
import ExamQuestionSelected from '../components/exam/ExamQuestionSelected'
import ExamAnswerChoice from '../components/exam/ExamAnswerChoice'
import ExamAnswerComposite from '../components/exam/ExamAnswerComposite'
import ExamAnswerText from '../components/exam/ExamAnswerText'
import ActionCalculator from '../components/actions/ActionCalculator'
import ActionInfo from '../components/actions/ActionInfo'
import ActionSolution from '../components/actions/ActionSolution'
import Calculator from '../components/calculator/Calculator'
import DiagnosticResultModal from '../components/modal/DiagnosticResultModal'
import { wrapMathAnswer, wrapPlainMath } from '../utils/wrapAnswer'

const DiagnosticQuestions = ({ subjectId }) => {
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
  const [showDiagnosticResult, setShowDiagnosticResult] = useState(false)
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

  // selectedQuestion o'zgarganda choiceAnswers ni to'g'ri boshqarish
  useEffect(() => {
    if (selectedQuestion?.question_type === 'choice') {
      setChoiceAnswers((prev) => ({
        ...prev,
        [selectedQuestion.id]: prev[selectedQuestion.id] || null
      }))
    }
  }, [selectedQuestion?.id]) // selectedQuestion.id ga o'zgartirish

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < testQuestions.length - 1 ? prev + 1 : prev))
  }

  // Klaviatura eventlari
  const handleKeyDown = useCallback((event) => {
    // Input field'larda event'larni to'xtatish
    const target = event.target
    if (target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.contentEditable === 'true' ||
        target.closest('.mathquill-editable') ||
        target.closest('.mq-editable-field')) {
      return
    }
    
    // Modifier key'lar bosilganda event'larni to'xtatish
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return
    }
    
    // Orqaga: Page Up, Backspace, Arrow Left, Arrow Up
    if (event.key === 'PageUp' || 
        event.key === 'Backspace' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowUp') {
      event.preventDefault()
      if (selectedIndex > 0) {
        handlePrev()
      }
    }
    // Oldinga: Enter, Page Down, Arrow Right, Arrow Down
    else if (event.key === 'Enter' || 
             event.key === 'PageDown' || 
             event.key === 'ArrowRight' ||
             event.key === 'ArrowDown') {
      event.preventDefault()
      
      if (selectedIndex < testQuestions.length - 1) {
        handleNext()
      } else {
        handleCheckMyResults()
      }
    }
  }, [selectedIndex, testQuestions])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, true)
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [handleKeyDown])

  // testni boshlash uchun post
  const { mutate: beginTest, isLoading } = usePostQuery({
    listKeyId: 'begin-test',
    hideSuccessToast: true
  })

  const handleBeginTest = () => {
    // subjectId null bo'lsa kutish
    if (!subjectId) {
      console.log('SubjectId is null, waiting...')
      return
    }

    beginTest(
      { 
        url: URLS.beginTest, 
        attributes: { 
          level: tab,
          subject_id: parseInt(subjectId)
        },
        config: {
          headers: { Authorization: `Bearer ${session?.accessToken}` }
        }
      },
      {
        onSuccess: (res) => {
          setTestQuestions(res?.data?.questions)
          setShowNextModal(false)
          // Yangi test boshlanganda state'larni tozalash
          setChoiceAnswers({})
          setTextAnswers({})
          setCompositeAnswers({})
          setSelectedIndex(0)
          toast.success('Diqqat! Test boshlandi.')
        },
        onError: (err) => {
          toast.error('Error starting test')
        }
      }
    )
  }

  useEffect(() => {
    if (subjectId) {
      handleBeginTest()
    }
  }, [subjectId])

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
        const selectedLetter = choiceAnswers[q.id]
        const selectedChoice = q.choices?.find(choice => choice.letter === selectedLetter)
        return {
          question_id: q.id,
          choices: selectedChoice ? [selectedChoice.id] : []
        }
      })

    const composite_answers = testQuestions
      .filter((q) => q.question_type === 'composite')
      .map((q) => {
        const userSubAnswers = compositeAnswers[q.id] || {}
        const sub_answers = q.sub_questions.map((sub) => {
          const answer = userSubAnswers[sub.id] || ''
          return wrapPlainMath(answer)
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
          setShowDiagnosticResult(true)
          toast.success('Siz testni yakunladingiz!')
        },
        onError: (err) => {
          toast.error("Testni to'liq bajaring!")
        }
      }
    )
  }

  const handleRetakeTest = () => {
    setShowDiagnosticResult(false)
    setChoiceAnswers({})
    setTextAnswers({})
    setCompositeAnswers({})
    setSelectedIndex(0)
    setResults(null)
    setScore(null)
    handleBeginTest()
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

  // Barcha savollar ID'larini o'z ichiga olgan ro'yxat
  const allQuestionsList = useMemo(() => {
    return testQuestions ? testQuestions.map(q => String(q.id)) : []
  }, [testQuestions])

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
            allQuestionsList={allQuestionsList}
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

              {selectedIndex === testQuestions.length - 1 ? (
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

          <DiagnosticResultModal
            isOpen={showDiagnosticResult}
            onClose={() => setShowDiagnosticResult(false)}
            results={results}
            score={score}
            onRetake={handleRetakeTest}
            showRetakeButton={true}
            subjectId={tab}
          />
        </div>
      </div>
    </div>
  )
}

export default DiagnosticQuestions
