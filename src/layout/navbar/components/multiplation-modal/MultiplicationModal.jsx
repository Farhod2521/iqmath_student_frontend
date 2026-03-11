import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineClose } from 'react-icons/ai'

const numbers = [2, 3, 4, 5, 6, 7, 8, 9]

const MultiplicationModal = ({ onClose }) => {
  const [selected, setSelected] = useState(2)
  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-md p-5 bg-white rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">🧮 {t('karraTable')}</h3>
          <button onClick={onClose}>
            <AiOutlineClose size={20} />
          </button>
        </div>

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

        {/* Jadval */}
        <div className="space-y-1 text-sm">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="flex justify-between px-3 py-1 rounded bg-gray-50">
              <span>
                {selected} × {i + 1}
              </span>
              <span className="font-semibold">{selected * (i + 1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MultiplicationModal
