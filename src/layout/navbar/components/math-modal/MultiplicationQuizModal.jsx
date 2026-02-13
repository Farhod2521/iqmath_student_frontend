import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
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

const MultiplicationQuizModal = ({ open, onClose }) => {
  const [currentKarra, setCurrentKarra] = useState(2)

  // random savollar tartibi (1..10) va hozirgi index
  const [quizOrder, setQuizOrder] = useState(() => shuffle(QUESTIONS))
  const [idx, setIdx] = useState(0)

  const [userAnswer, setUserAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)

  // hozirgi savol
  const question = quizOrder[idx] ?? quizOrder[0]
  const correctAnswer = useMemo(() => currentKarra * question, [currentKarra, question])

  // Modal ochilganda: reset (xohlasang olib tashlasa ham bo‘ladi)
  useEffect(() => {
    if (open) {
      setUserAnswer('')
      setShowHint(false)
    }
  }, [open])

  // Karra o‘zgarsa: savollarni qayta random qilib boshlash
  const startForKarra = (k) => {
    setCurrentKarra(k)
    setQuizOrder(shuffle(QUESTIONS))
    setIdx(0)
    setUserAnswer('')
    setShowHint(false)
  }

  const handleNext = () => {
    if (userAnswer === '' || userAnswer === null) {
      toast.error('Iltimos, javob kiriting!')
      return
    }

    if (Number(userAnswer) === correctAnswer) {
      toast.success('Ajoyib! To‘g‘ri javob.')

      const isLast = idx >= quizOrder.length - 1
      if (isLast) {
        toast.success(`${currentKarra} karra bo‘yicha test tugadi!`)
        // shu karrani qayta random qilib yana davom ettirish:
        setQuizOrder(shuffle(QUESTIONS))
        setIdx(0)
      } else {
        setIdx((p) => p + 1)
      }

      setUserAnswer('')
      setShowHint(false)
    } else {
      toast.error('Afsus, noto‘g‘ri javob. Qayta urinib ko‘ring.')
    }
  }

  const handleHint = () => {
    setShowHint((p) => !p) // xohlasang toggle
  }

  const handleClose = () => {
    onClose?.()
    setCurrentKarra(2)
    setQuizOrder(shuffle(QUESTIONS))
    setIdx(0)
    setUserAnswer('')
    setShowHint(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 bg-black/40">
      <div className="bg-white w-full max-w-md rounded-2xl p-4 relative max-h-[85vh] overflow-y-auto">
        <button onClick={handleClose} className="absolute text-gray-500 top-3 right-3">
          <IoClose size={22} />
        </button>

        <h2 className="mb-4 text-lg font-semibold text-center">Karra Quiz (Random)</h2>

        {/* Karra buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {numbers.map((n) => (
            <button
              key={n}
              onClick={() => startForKarra(n)}
              className={`px-3 py-1.5 rounded-lg border text-sm ${
                currentKarra === n ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {n} karra
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-2 text-xs text-right text-gray-500">
          {idx + 1}/{quizOrder.length}
        </div>

        {/* Savol */}
        <div className="mb-2 text-lg font-semibold text-center">
          Savol: {currentKarra} × {question} = ?
        </div>

        {/* Input + Hint */}
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg"
            placeholder="Javobingizni kiriting"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleNext()
            }}
          />
          <button
            onClick={handleHint}
            className="flex items-center justify-center w-12 h-12 text-lg font-bold text-green-800 bg-green-200 rounded-lg hover:bg-green-300"
            title="Yordam"
          >
            ?
          </button>
        </div>

        {showHint && (
          <div className="mb-2 text-sm font-semibold text-center text-blue-600">To‘g‘ri javob: {correctAnswer}</div>
        )}

        <button onClick={handleNext} className="w-full py-2 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Keyingi
        </button>
      </div>
    </div>
  )
}

export default MultiplicationQuizModal
