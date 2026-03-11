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
    <div className="relative overflow-visible" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center text-blue-600 transition rounded-full w-9 h-9 bg-blue-50 hover:bg-blue-100"
      >
        <MdOutlineCalculate size={18} />
      </button>

      {open && (
        <div
          className="
            fixed top-16 left-1/2 -translate-x-1/2
            z-[9999] w-44 max-w-[calc(100vw-24px)]
            rounded-xl border bg-white shadow-lg
            md:absolute md:top-full md:left-auto md:right-0 md:mt-2 md:translate-x-0
          "
        >
          <button
            onClick={() => {
              setOpen(false)
              setOpenKarra(true)
            }}
            className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded-t-xl"
          >
            <GiAbacus size={16} />
            {t('karraTable')}
          </button>

          <button
            onClick={() => {
              setOpen(false)
              setOpenCalculator(true)
            }}
            className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-100"
          >
            <FaCalculator size={16} />
            Calculator
          </button>

          <button
            onClick={() => {
              setOpen(false)
              setOpenQuiz(true)
            }}
            className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded-b-xl"
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
