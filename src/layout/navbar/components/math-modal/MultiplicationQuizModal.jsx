import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { IoClose } from 'react-icons/io5'

const MAX_HINTS = 3 // maksimal hintlar soni
const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10]

const MultiplicationQuizModal = ({ open, onClose }) => {
  const [number, setNumber] = useState(2)
  const [currentKarra, setCurrentKarra] = useState(2)
  const [question, setQuestion] = useState(1)
  const [userAnswer, setUserAnswer] = useState('')

  const [showHint, setShowHint] = useState(false)
  const [hintUsed, setHintUsed] = useState(0)
  const [unlockedKarras, setUnlockedKarras] = useState([2]) // faqat 2 karra ochiq

  if (!open) return null
  const correctAnswer = currentKarra * question

  const handleNext = () => {
    if (!userAnswer) {
      toast.error('Iltimos, javob kiriting!')
      return
    }

    if (Number(userAnswer) === currentKarra * question) {
      toast.success('Ajoyib! To‘g‘ri javob.')

      if (question === 10) {
        toast.success(`${currentKarra} karra tugatildi!`)
        if (currentKarra < 10) {
          const next = currentKarra + 1
          setUnlockedKarras((prev) => [...prev, next])
          setCurrentKarra(next)
        }
        setQuestion(1)
        setHintUsed(0)
      } else {
        setQuestion((prev) => prev + 1)
      }
      setUserAnswer('')
      setShowHint(false)
    } else {
      toast.error('Afsus, noto‘g‘ri javob. Qayta urinib ko‘ring.')
    }
  }

  const handleHint = () => {
    if (hintUsed >= MAX_HINTS) {
      toast.error('Sizning yordam olish imkoniyatingiz tugadi!')
      return
    }
    setShowHint(true)
    setHintUsed((prev) => prev + 1)
  }

  const handleClose = () => {
    onClose()
    setCurrentKarra(2)
    setQuestion(1)
    setUserAnswer('')
    setShowHint(false)
    setHintUsed(0)
    setUnlockedKarras([2])
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 bg-black/40">
      <div className="bg-white w-full max-w-md rounded-2xl p-4 relative max-h-[85vh] overflow-y-auto">
        <button onClick={handleClose} className="absolute text-gray-500 top-3 right-3">
          <IoClose size={22} />
        </button>

        <h2 className="mb-4 text-lg font-semibold text-center">Karra Quiz</h2>
        {/* Karra buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {numbers.map((n) => (
            <button
              key={n}
              onClick={() => unlockedKarras.includes(n) && setCurrentKarra(n)}
              className={`px-3 py-1.5 rounded-lg border text-sm ${
                currentKarra === n
                  ? 'bg-blue-500 text-white'
                  : unlockedKarras.includes(n)
                  ? 'hover:bg-gray-100'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!unlockedKarras.includes(n)}
            >
              {n} karra
            </button>
          ))}
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
          />
          <button
            onClick={handleHint}
            className={`w-12 h-12 flex items-center justify-center font-bold text-lg rounded-lg
              ${
                hintUsed < MAX_HINTS
                  ? 'bg-green-200 text-green-800 hover:bg-green-300'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            title="Yordam"
            disabled={hintUsed >= MAX_HINTS}
          >
            ?
          </button>
        </div>

        {/* Feedback + Hint */}
        {showHint && (
          <div className="mb-2 text-sm font-semibold text-center text-blue-600">To‘g‘ri javob: {correctAnswer}</div>
        )}

        <button onClick={handleNext} className="w-full py-2 mb-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Keyingi
        </button>
        {/* Hint count */}
        <div className="text-xs text-right text-gray-500">Qolgan yordam: {MAX_HINTS - hintUsed}</div>
      </div>
    </div>
  )
}

export default MultiplicationQuizModal
