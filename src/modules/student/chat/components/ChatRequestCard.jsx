import React from 'react'
import { useTranslation } from 'react-i18next'

const ChatRequestCard = ({ request, getLocalizedField, getStatusColor, getStatusText }) => {
  const { t } = useTranslation()
  
  const subjectName = getLocalizedField(request, 'subject_name')
  const chapterName = getLocalizedField(request, 'chapter_name')?.[0]
  const topicName = getLocalizedField(request, 'topic_name')?.[0]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {subjectName || t('subject', 'Fan')}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
              {getStatusText(request.status)}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {chapterName && (
              <span className="block">{t('chapter', 'Bo\'lim')}: {chapterName}</span>
            )}
            {topicName && (
              <span className="block">{t('topic', 'Mavzu')}: {topicName}</span>
            )}
          </p>
        </div>
      </div>

      {request.result && request.result.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Test natijasi:
          </h4>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Ball:</span>
                <span className="ml-2 font-medium">{request.result[0].score}</span>
              </div>
              <div>
                <span className="text-gray-500">To'g'ri:</span>
                <span className="ml-2 font-medium text-green-600">{request.result[0].correct_answers}</span>
              </div>
              <div>
                <span className="text-gray-500">Jami:</span>
                <span className="ml-2 font-medium">{request.result[0].total_answers}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Status: {request.status}
        </div>
      </div>
    </div>
  )
}

export default ChatRequestCard
