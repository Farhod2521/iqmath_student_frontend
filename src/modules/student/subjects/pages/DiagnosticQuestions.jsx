import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useTopicStore } from '@/store'

import { useRouter } from 'next/router'
import usePostQuery from '@/hooks/api/usePostQuery'
import { URLS } from '@/constants/url'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import ModalLevel from '../components/modal/ModalLevel'
import DiagnosticResultModal from '../components/modal/DiagnosticResultModal'
import QuestionTopBar from '../components/question/QuestionTopBar'
import QuestionWorkspace from '../components/question/QuestionWorkspace'
import { wrapMathAnswer, wrapPlainMath } from '../utils/wrapAnswer'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'
import { usePersistentTimer } from '../hooks/usePersistentTimer'

const DiagnosticQuestions = ({ subjectId, title, subtitle, onBack, onClose }) => {
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

  // Sarflangan vaqt: sahifa yangilansa ham davom etadi (boshlanish vaqti sessionStorage da),
  // test tekshirilganda to'xtaydi, "Qayta topshirish" da 0 dan boshlanadi
  const {
    elapsed,
    finish: finishTimer,
    reset: resetTimer
  } = usePersistentTimer(subjectId ? `diag-${subjectId}-${tab}` : null, !!testQuestions?.length)

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
          console.log('RES', res)
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
        const selectedChoice = q.choices?.find((choice) => choice.letter === selectedLetter)
        return {
          question_id: q.id,
          choices: selectedChoice ? [selectedChoice.id] : []
        }
      })

    const composite_answers = testQuestions
      .filter((q) => q.question_type === 'composite')
      .map((q) => {
        const userSubAnswers = compositeAnswers[q.id] || {}
        const sub_answers = q?.sub_questions?.map((sub) => {
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
          composite_answers,
          duration_seconds: elapsed
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
          finishTimer()
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
    resetTimer()
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
        const hasAnyAnswer = Object.values(subAnswers)?.some((answer) => answer && answer.trim() !== '')
        if (hasAnyAnswer) {
          answeredQuestions.add(questionId)
        }
      }
    })

    return Array.from(answeredQuestions)
  }, [textAnswers, choiceAnswers, compositeAnswers])

  // Barcha savollar ID'larini o'z ichiga olgan ro'yxat
  const allQuestionsList = useMemo(() => {
    return testQuestions ? testQuestions?.map((q) => String(q.id)) : []
  }, [testQuestions])

  const isEndQuestion = useMemo(() => {
    return selectedIndex === testQuestions?.length - 1
  }, [selectedIndex, testQuestions])

  const handleNextEnter = () => {
    if (isEndQuestion) {
      handleCheckMyResults()
    } else {
      handleNext()
    }
  }

  useKeyboardShortcut('k', () => setShowCalculator((prev) => !prev), { mod: true, ignoreInput: false })
  useKeyboardShortcut('ArrowUp', handlePrev, { ignoreInput: false })
  useKeyboardShortcut('ArrowLeft', handlePrev)
  useKeyboardShortcut('ArrowDown', handleNextEnter, { ignoreInput: false })
  useKeyboardShortcut('ArrowRight', handleNextEnter)
  useKeyboardShortcut('Enter', handleNextEnter, { ignoreInput: false })

  const questionList = testQuestions || []
  const total = questionList.length

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F7FC] font-sf dark:bg-[#0B1220]">
      <QuestionTopBar
        title={title}
        subtitle={subtitle}
        current={total ? selectedIndex + 1 : 0}
        total={total}
        elapsed={elapsed}
        onBack={onBack}
        onClose={onClose}
      />
      <ModalLevel handleTabChange={(level) => setTab(level)} tab={tab} />

      {isLoading || !testQuestions ? (
        <div className="w-full p-10 text-center italic text-gray-500">{t('chooseQueation')}</div>
      ) : (
        <QuestionWorkspace
          questions={questionList}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          selectedQuestion={selectedQuestion}
          answeredIds={new Set(selectedList)}
          badge={`${t('diagnostics')} · ${t('questionPage.level', { level: tab })}`}
          choiceAnswers={choiceAnswers}
          setChoiceAnswers={setChoiceAnswers}
          textAnswers={textAnswers}
          setTextAnswers={setTextAnswers}
          compositeAnswers={compositeAnswers}
          setCompositeAnswers={setCompositeAnswers}
          mathFieldRef={mathFieldRef}
          mathFieldRefs={mathFieldRefs}
          activeInputId={activeInputId}
          setActiveInputId={setActiveInputId}
          showCalculator={showCalculator}
          setShowCalculator={setShowCalculator}
          onPrev={handlePrev}
          onNext={handleNext}
          onFinish={handleCheckMyResults}
          isEnd={isEndQuestion}
          finishing={isLoadingCheck}
        />
      )}

      <DiagnosticResultModal
        isOpen={showDiagnosticResult}
        onClose={() => setShowDiagnosticResult(false)}
        results={results}
        score={score}
        onRetake={handleRetakeTest}
        showRetakeButton={true}
        subjectId={subjectId}
      />
    </div>
  )
}

export default DiagnosticQuestions
