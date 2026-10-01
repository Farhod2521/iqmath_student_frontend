import React from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

const ChatRequestCard = ({ request, getLocalizedField, getStatusColor, getStatusText }) => {
  const { t } = useTranslation()
  
  const subjectName = getLocalizedField(request, 'subject_name')
  const chapterName = getLocalizedField(request, 'chapter_name')?.[0]
  const topicName = getLocalizedField(request, 'topic_name')?.[0]

  const handleTelegramClick = () => {
    if (request.url) {
      window.open(request.url, '_blank')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="min-w-0 break-words text-base font-semibold text-gray-900 dark:text-white">
          {subjectName || t('subject', 'Fan')}
        </h3>
        <span className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
          {getStatusText(request.status)}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
        <div className="flex-1 flex flex-col gap-0.5 sm:block">
          {chapterName && (
            <span className="sm:mr-4">{t('chapter', 'Bo\'lim')}: {chapterName}</span>
          )}
          {topicName && (
            <span>{t('topic', 'Mavzu')}: {topicName}</span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        {request.result && request.result.length > 0 ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-gray-500">Ball:</span>
              <span className="font-medium">{request.result[0].score}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500">To'g'ri:</span>
              <span className="font-medium text-green-600">{request.result[0].correct_answers}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500">Jami:</span>
              <span className="font-medium">{request.result[0].total_answers}</span>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Status: {request.status}
          </div>
        )}
        
        {request.url && (
          <button
            onClick={handleTelegramClick}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
          >
            <Image
              src="/icons/telegram.svg"
              alt="Telegram"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Telegram</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default ChatRequestCard
