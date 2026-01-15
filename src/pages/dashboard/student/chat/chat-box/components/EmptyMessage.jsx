import React from 'react'
import { useTranslation } from 'react-i18next'

const EmptyMessage = () => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="text-center">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full shadow-2xl bg-gradient-to-br from-blue-400 to-purple-500">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-2xl font-bold text-gray-700">{t('startConversation')}</h3>
        <p className="text-gray-500">{t('chatSendMessage')}</p>
      </div>
    </div>
  )
}

export default EmptyMessage
