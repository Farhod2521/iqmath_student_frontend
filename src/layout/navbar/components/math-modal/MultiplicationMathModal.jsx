import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { IoClose } from 'react-icons/io5'
const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10]

const MultiplicationMathModal = ({ open, onClose }) => {
  const [selected, setSelected] = useState(2)
  const { t } = useTranslation()

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center px-3 bg-black/40">
      <div className="relative w-full max-w-md p-4 bg-white rounded-2xl">
        <button onClick={onClose} className="absolute text-gray-500 top-3 right-3">
          <IoClose size={22} />
        </button>

        <h2 className="mb-4 text-lg font-semibold text-center">{t('karraTable')}</h2>

        {/* Karra tanlash */}
        <div className="flex flex-wrap gap-2 mb-4">
          {numbers.map((n) => (
            <button
              key={n}
              onClick={() => setSelected(n)}
              className={`px-3 py-1.5 rounded-lg border text-sm ${
                selected === n ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="p-2 text-sm text-center rounded-lg bg-blue-50">
              {selected} × {i + 1} = <b>{selected * (i + 1)}</b>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default MultiplicationMathModal
