import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { IoClose } from 'react-icons/io5'

const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10]
const QUESTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generateAllQuestions() {
  const allQuestions = []
  for (const karra of numbers) {
    for (const question of QUESTIONS) {
      allQuestions.push({ karra, question, answer: karra * question })
    }
  }
  return shuffle(allQuestions)
}

const MultiplicationQuizModal = ({ open, onClose }) => {
  const [currentKarra, setCurrentKarra] = useState(2)
  const [quizMode, setQuizMode] = useState('single')
  const { t } = useTranslation()

  const [quizOrder, setQuizOrder] = useState(() => shuffle(QUESTIONS))
  const [idx, setIdx] = useState(0)

  const [allQuestions, setAllQuestions] = useState(() => generateAllQuestions())
  const [allIdx, setAllIdx] = useState(0)

  const [userAnswer, setUserAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [stats, setStats] = useState({ correct: 0, total: 0 })

  const currentQuestion = useMemo(() => {
    if (quizMode === 'single') {
      const q = quizOrder[idx] ?? quizOrder[0]
      return { karra: currentKarra, question: q, answer: currentKarra * q }
    } else {
      return allQuestions[allIdx]
    }
  }, [quizMode, currentKarra, quizOrder, idx, allQuestions, allIdx])

  useEffect(() => {
    if (open) {
      setUserAnswer('')
      setShowHint(false)
      setStats({ correct: 0, total: 0 })
    }
  }, [open])

  const startForKarra = (k) => {
    setCurrentKarra(k)
    setQuizOrder(shuffle(QUESTIONS))
    setIdx(0)
    setUserAnswer('')
    setShowHint(false)
  }

  const startAllKarraQuiz = () => {
    setAllQuestions(generateAllQuestions())
    setAllIdx(0)
    setUserAnswer('')
    setShowHint(false)
    setStats({ correct: 0, total: 0 })
  }

  const handleNext = () => {
    if (userAnswer === '' || userAnswer === null) {
      toast.error(t('pleaseEnterAnswer'))
      return
    }

    const isCorrect = Number(userAnswer) === currentQuestion.answer

    if (isCorrect) {
      toast.success(t('correct'))
      setStats((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }))
    } else {
      toast.error(t('wrongWithAnswer', { answer: currentQuestion.answer }))
      setStats((prev) => ({ correct: prev.correct, total: prev.total + 1 }))
    }

    if (quizMode === 'single') {
      const isLast = idx >= quizOrder.length - 1
      if (isLast) {
        toast.success(t('testCompleted', { karra: currentKarra }))
        setQuizOrder(shuffle(QUESTIONS))
        setIdx(0)
      } else {
        setIdx((p) => p + 1)
      }
    } else {
      const isLast = allIdx >= allQuestions.length - 1
      if (isLast) {
        const correctCount = stats.correct + (isCorrect ? 1 : 0)
        const percentage = Math.round((correctCount / allQuestions.length) * 100)
        toast.success(
          t('quizCompleted', {
            correct: correctCount,
            total: allQuestions.length,
            percentage: percentage
          })
        )
        if (window.confirm(t('startNewQuiz'))) {
          startAllKarraQuiz()
        }
      } else {
        setAllIdx((p) => p + 1)
      }
    }

    setUserAnswer('')
    setShowHint(false)
  }

  const handleHint = () => {
    setShowHint((p) => !p)
  }

  const handleClose = () => {
    onClose?.()
    setCurrentKarra(2)
    setQuizOrder(shuffle(QUESTIONS))
    setIdx(0)
    setAllQuestions(generateAllQuestions())
    setAllIdx(0)
    setUserAnswer('')
    setShowHint(false)
    setStats({ correct: 0, total: 0 })
    setQuizMode('single')
  }

  const switchMode = (mode) => {
    setQuizMode(mode)
    setUserAnswer('')
    setShowHint(false)
    setStats({ correct: 0, total: 0 })
    if (mode === 'all') {
      setAllQuestions(generateAllQuestions())
      setAllIdx(0)
    }
  }

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center px-3 bg-black/40">
      <div className="bg-white w-full max-w-md rounded-2xl p-4 relative max-h-[85vh] overflow-y-auto">
        <button onClick={handleClose} className="absolute text-gray-500 top-3 right-3">
          <IoClose size={22} />
        </button>

        <h2 className="mb-4 text-lg font-semibold text-center">{t('KarraQuiz')}</h2>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => switchMode('single')}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              quizMode === 'single' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {t('singleMode')}
          </button>
          <button
            onClick={() => switchMode('all')}
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              quizMode === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {t('allMode')}
          </button>
        </div>

        {quizMode === 'single' && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {numbers.map((n) => (
              <button
                key={n}
                onClick={() => startForKarra(n)}
                className={`px-3 py-1.5 rounded-lg border text-sm transition ${
                  currentKarra === n ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                }`}
              >
                {n} {t('karra')}
              </button>
            ))}
          </div>
        )}

        {quizMode === 'all' && (
          <button
            onClick={startAllKarraQuiz}
            className="w-full py-2 mb-4 text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
          >
            {t('newRandomQuiz')}
          </button>
        )}

        <div className="flex justify-between mb-2 text-xs text-gray-500">
          <span>
            {quizMode === 'single' ? `${idx + 1}/${quizOrder.length}` : `${allIdx + 1}/${allQuestions.length}`}
          </span>
          {quizMode === 'all' && stats.total > 0 && (
            <span className="text-green-600">
              ✅ {stats.correct}/{stats.total}
            </span>
          )}
        </div>

        <div className="mb-4 text-center">
          <div className="text-sm text-gray-500 mb-1">
            {quizMode === 'all' && currentQuestion?.karra && (
              <span className="inline-block px-2 py-1 bg-purple-100 rounded-full text-purple-700 text-xs">
                {currentQuestion.karra} {t('karra')}
              </span>
            )}
          </div>
          <div className="text-2xl font-bold">
            {currentQuestion?.karra} × {currentQuestion?.question} = ?
          </div>
        </div>

        <div className="flex gap-2 mb-2">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('enterAnswer')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleNext()
            }}
            autoFocus
          />
          <button
            onClick={handleHint}
            className="flex items-center justify-center w-12 h-12 text-lg font-bold text-green-800 bg-green-200 rounded-lg hover:bg-green-300 transition"
            title={t('footer.support')}
          >
            ?
          </button>
        </div>

        {showHint && (
          <div className="mb-3 text-sm font-semibold text-center text-blue-600">
            {t('correctAnswer')}: {currentQuestion?.answer}
          </div>
        )}

        <button
          onClick={handleNext}
          className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          {t('next')} ⏎
        </button>

        {quizMode === 'all' && stats.total > 0 && (
          <div className="mt-3 p-2 bg-gray-100 rounded-lg text-center text-sm">
            <span className="font-medium">{t('progress')}:</span>{' '}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(stats.total / allQuestions.length) * 100}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-gray-600">
              {t('totalQuestions')}: {allQuestions.length}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

export default MultiplicationQuizModal
