import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const IndependentResultCard = ({ data }) => {
  const { t, i18n } = useTranslation()
  if (!data) return null

  const { subject, chapters, topics, result } = data

  const ExpandableList = ({ label, items = [] }) => {
    const [open, setOpen] = useState(false)
    if (!items.length) return null

    const keyName = i18n.language === 'uz' ? 'name_uz' : 'name_ru'

    return (
      <div className="text-sm text-gray-700">
        <b>{label}:</b> {open ? items.map((i) => i[keyName]).join(', ') : items[0][keyName]}
        {items.length > 1 && (
          <button onClick={() => setOpen(!open)} className="ml-2 text-xs text-blue-600 underline">
            {open ? t('msgResult.collapse') : `+${items.length - 1} ${t('msgResult.moreCount')}`}
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="mt-3 ">
      <p className="mb-2 text-sm font-semibold text-blue-700">{t('msgResult.title')}</p>

      <div className="space-y-1 text-sm text-gray-700">
        {subject && (
          <>
            <p>
              <b>{t('msgResult.subject')}:</b> {i18n.language === 'uz' ? subject?.name_uz : subject?.name_ru}
            </p>
            <p>
              <b>{t('msgResult.class')}:</b> {subject?.class_num}
            </p>
          </>
        )}
        <ExpandableList label={t('msgResult.chapter')} items={chapters} />
        <ExpandableList label={t('msgResult.topic')} items={topics} />
      </div>

      {result && (
        <div className="flex justify-between p-3 mt-3 bg-blue-100 rounded-lg">
          <div>
            <p className="text-xs text-gray-500">{t('msgResult.correct')}</p>
            <p className="text-lg font-bold text-green-600">
              {result?.correct_answers}/{result?.total_answers}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">{t('msgResult.score')}</p>
            <p className="text-lg font-bold text-blue-600">{result?.score}%</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default IndependentResultCard
