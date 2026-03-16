import React from 'react'
import { useTranslation } from 'react-i18next'

export const NewChatButton = ({ onClick }) => {
  const { t } = useTranslation()
  return (
    <button
      onClick={onClick}
      className="px-5 py-3 mx-3 mb-3 text-white font-medium bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <span>{t('chatBox.startConversation')}</span>
    </button>
  )
}
