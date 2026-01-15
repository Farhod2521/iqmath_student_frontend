import { useState } from 'react'
import { IoClose } from 'react-icons/io5'

const buttons = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
  ['C', 'DEL']
]

const CalculatorModal = ({ open, onClose }) => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')

  if (!open) return null

  const handleButton = (val) => {
    if (val === 'C') {
      setInput('')
      setResult('')
    } else if (val === 'DEL') {
      setInput((prev) => prev.slice(0, -1))
    } else if (val === '=') {
      try {
        // eslint-disable-next-line no-eval
        setResult(eval(input))
      } catch {
        setResult('Xato!')
      }
    } else {
      setInput((prev) => prev + val)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 bg-black/40">
      <div className="bg-white w-full max-w-md rounded-2xl p-4 relative max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Close button */}
        <button onClick={onClose} className="absolute text-gray-500 top-3 right-3">
          <IoClose size={22} />
        </button>

        <h2 className="mb-4 text-lg font-semibold text-center">Calculator</h2>

        {/* Display */}
        <div className="bg-gray-100 p-3 rounded-lg mb-4 min-h-[50px] text-right font-mono text-xl">{input || '0'}</div>

        {result !== '' && (
          <div className="p-2 mb-4 font-mono text-lg text-right text-blue-600 rounded-lg bg-gray-50">= {result}</div>
        )}

        {/* Buttons grid */}
        <div className="grid grid-cols-4 gap-2">
          {buttons.flat().map((btn) => (
            <button
              key={btn}
              onClick={() => handleButton(btn)}
              className={`
                py-3 rounded-lg text-lg font-medium
                ${
                  ['/', '*', '-', '+', '='].includes(btn)
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : btn === 'C'
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : btn === 'DEL'
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-gray-100 hover:bg-gray-200'
                }
              `}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CalculatorModal
