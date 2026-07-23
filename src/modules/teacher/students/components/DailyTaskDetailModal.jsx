import { createPortal } from 'react-dom'

const DailyTaskDetailModal = ({ detail, language, t, onClose, getLocalizedName, getLocalizedClassName, formatScore }) => {
  if (!detail || typeof document === 'undefined') return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t('details')}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {detail.date.toLocaleDateString(language || 'uz', {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            {t('close')}
          </button>
        </div>
        <div className="max-h-[70vh] overflow-auto p-5">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">{t('class')}</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">{t('subject')}</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">{t('chapterName')}</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">{t('topicName')}</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">{t('score')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {detail.tasks.map((task, index) => (
                <tr key={`detail-${index}`}>
                  <td className="px-4 py-3 text-gray-700">{getLocalizedClassName(task.subject, language)}</td>
                  <td className="px-4 py-3 text-gray-700">{getLocalizedName(task.subject, language)}</td>
                  <td className="min-w-[260px] px-4 py-3 text-gray-700">
                    {getLocalizedName(task.chapter, language)}
                  </td>
                  <td className="min-w-[280px] px-4 py-3 font-medium text-gray-900">
                    {getLocalizedName(task.topic, language)}
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#5D87FF]">{formatScore(task.score)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default DailyTaskDetailModal