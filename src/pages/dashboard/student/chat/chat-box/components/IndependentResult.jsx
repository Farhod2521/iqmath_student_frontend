import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const IndependentResultCard = ({ data }) => {
  const { t, i18n } = useTranslation()
  if (!data) return null

  const { subject, chapters, topics, result } = data

  const ExpandableList = ({ label, items = [], keyName = 'name_uz' }) => {
    const [open, setOpen] = useState(false)
    if (!items.length) return null

    return (
      <div className="text-sm text-gray-700">
        <b>{label}:</b> {open ? items.map((i) => i[keyName]).join(', ') : items[0][keyName]}
        {items.length > 1 && (
          <button onClick={() => setOpen(!open)} className="ml-2 text-xs text-blue-600 underline">
            {open ? 'yopish' : `+${items.length - 1} ta`}
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="mt-3 ">
      <p className="mb-2 text-sm font-semibold text-blue-700">📊 Mustaqil ish natijasi</p>

      <div className="space-y-1 text-sm text-gray-700">
        {subject && (
          <p>
            <b>Fan:</b> {i18n.language === 'uz' ? subject?.name_uz : subject?.name_ru}
          </p>
        )}
        {/* {chapters?.length > 0 && (
          <p>
            <b>Bo‘lim:</b> {i18n.language === 'uz' ? chapters[0]?.name_uz : chapters[0]?.name_ru}
          </p>
        )}
        {topics?.length > 0 && (
          <p>
            <b>Mavzu:</b> {i18n.language === 'uz' ? topics[0]?.name_uz : topics[0]?.name_ru}
          </p>
        )} */}
        <ExpandableList label="Bo‘lim" items={chapters} />
        <ExpandableList label="Mavzu" items={topics} />
      </div>

      {result && (
        <div className="flex justify-between p-3 mt-3 bg-blue-100 rounded-lg">
          <div>
            <p className="text-xs text-gray-500">To‘g‘ri</p>
            <p className="text-lg font-bold text-green-600">
              {result?.correct_answers}/{result?.total_answers}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Ball</p>
            <p className="text-lg font-bold text-blue-600">{result?.score}%</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default IndependentResultCard
