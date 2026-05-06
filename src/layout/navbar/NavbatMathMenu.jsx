import { useEffect, useRef, useState } from 'react'
import { MdOutlineCalculate } from 'react-icons/md'
import { GiAbacus } from 'react-icons/gi'
import { FaCalculator } from 'react-icons/fa'
import MultiplicationMathModal from './components/math-modal/MultiplicationMathModal'
import CalculatorModal from './components/math-modal/CalculatorModal'
import MultiplicationQuizModal from './components/math-modal/MultiplicationQuizModal'
import { useTranslation } from 'react-i18next'

const NavbarMathMenu = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [openKarra, setOpenKarra] = useState(false)
  const [openCalculator, setOpenCalculator] = useState(false)
  const [openQuiz, setOpenQuiz] = useState(false)

  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center text-blue-600 transition rounded-full w-7 h-7 min-[400px]:w-8 min-[400px]:h-8 sm:w-9 sm:h-9 bg-blue-50 hover:bg-blue-100"
      >
        <MdOutlineCalculate size={14} className="min-[400px]:size-4 sm:size-5" />
      </button>

      {open && (
        <div className="absolute top-full right-auto left-0 mt-2 z-[9999999] w-36 min-[400px]:w-40 sm:w-44 max-w-[90vw] rounded-xl border bg-white shadow-lg">
          <button
            onClick={() => {
              setOpen(false)
              setOpenKarra(true)
            }}
            className="flex items-center w-full gap-1.5 px-2 py-1.5 text-xs min-[400px]:text-sm hover:bg-gray-100 rounded-t-xl"
          >
            <GiAbacus size={12} className="min-[400px]:size-3.5 sm:size-4" />
            {t('karraTable')}
          </button>

          <button
            onClick={() => {
              setOpen(false)
              setOpenCalculator(true)
            }}
            className="flex items-center w-full gap-1.5 px-2 py-1.5 text-xs min-[400px]:text-sm hover:bg-gray-100"
          >
            <FaCalculator size={12} className="min-[400px]:size-3.5 sm:size-4" />
            Calculator
          </button>

          <button
            onClick={() => {
              setOpen(false)
              setOpenQuiz(true)
            }}
            className="flex items-center w-full gap-1.5 px-2 py-1.5 text-xs min-[400px]:text-sm hover:bg-gray-100 rounded-b-xl"
          >
            🧩 {t('KarraQuiz')}
          </button>
        </div>
      )}

      <MultiplicationMathModal open={openKarra} onClose={() => setOpenKarra(false)} />
      <CalculatorModal open={openCalculator} onClose={() => setOpenCalculator(false)} />
      <MultiplicationQuizModal open={openQuiz} onClose={() => setOpenQuiz(false)} />
    </div>
  )
}

export default NavbarMathMenu
