import React from 'react'
import { useTranslation } from 'react-i18next'

const ChatEmptyState = () => {
  const { t } = useTranslation()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
      <div className="text-gray-500 dark:text-gray-400">
        <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="text-lg font-medium mb-2">
          {t('noRequests', 'Hozircha murojaatlar yo\'q')}
        </p>
        <p className="text-sm">
          {t('noRequestsDescription', 'Mentorga murojaat yuborganingizda bu yerda ko\'rinadi')}
        </p>
      </div>
    </div>
  )
}

export default ChatEmptyState
