import React from 'react'
import { Button } from '@heroui/react'
import { useTranslation } from 'react-i18next'

export const ChatHeader = ({ chat, onBack, onTransfer, showTransfer }) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-200 md:px-6">
      <button onClick={onBack} className="p-2 mr-2 transition-colors rounded-full md:hidden hover:bg-gray-100">
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="flex items-center justify-center w-10 h-10 text-lg font-semibold text-white rounded-full shadow-md md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-purple-500">
            {chat.other_user_name?.charAt(0) || '?'}
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800 md:text-lg">{chat.other_user_name}</h3>
          {chat.is_temp && <span className="text-xs text-blue-500">{t('chatBox.newConversation')}</span>}
        </div>
      </div>

      {showTransfer && onTransfer && (
        <div className="flex items-center gap-2">
          <Button onPress={onTransfer} className="p-2 rounded-full hover:bg-gray-100" title="Suhbatni uzatish">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </Button>
        </div>
      )}

      {/* {chat?.is_closed && chat?.rating && (
        <div className="mx-3 mb-2 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border rounded-xl">
          <div className="flex justify-between">
            <span className="text-sm font-semibold">⭐ Rating: {chat.rating.stars}/5</span>
            <span className="text-xs text-gray-500">{chat.rating.mentor_name}</span>
          </div>

          <p className="mt-1 text-sm text-gray-600 italic">"{chat.rating.comment}"</p>
        </div>
      )} */}
    </div>
  )
}
