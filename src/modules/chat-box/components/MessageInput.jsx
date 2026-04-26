import React, { useState } from 'react'
import { Button } from '@heroui/react'
import { IoMdSend } from 'react-icons/io'
import { FaFlagCheckered } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'

export const MessageInput = ({ onSend, onClose, isSending, showCloseButton, replyingTo, onCancelReply, role }) => {
  const [message, setMessage] = useState('')
  const { t } = useTranslation()

  const handleSend = () => {
    if (!message.trim()) return
    onSend(message)
    setMessage('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const isTeacher = role === 'teacher'

  return (
    <div className="flex-shrink-0 px-3 bg-white border-t border-gray-200 md:px-4">
      {replyingTo && (
        <div className="flex items-start justify-between p-3 mb-3 border-l-4 border-blue-500 rounded-lg bg-blue-50">
          <div className="flex-1 min-w-0">
            <p className="mb-1 text-xs font-semibold text-blue-700">Javob: {replyingTo.sender_name}</p>
            <p className="text-sm text-gray-600 truncate">{replyingTo.text}</p>
          </div>
          <button
            onClick={onCancelReply}
            className="flex-shrink-0 p-1 ml-2 transition-colors rounded-full hover:bg-blue-100"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex-1 mt-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('chatBox.writeMessage')}
            rows="1"
            className="w-full px-3 py-3 text-sm transition-all border-2 border-gray-200 resize-none md:px-6 md:py-4 rounded-2xl focus:outline-none focus:border-blue-500"
            style={{ minHeight: '56px', maxHeight: '120px' }}
          />
        </div>

        <div className="flex items-end gap-2">
          <Button
            color="primary"
            isIconOnly
            onPress={handleSend}
            isLoading={isSending}
            isDisabled={!message.trim()}
            className="w-10 h-10 text-white transition-all md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl hover:shadow-lg disabled:opacity-50 active:scale-95"
          >
            <IoMdSend className="text-lg md:text-xl" />
          </Button>

          {showCloseButton && onClose && isTeacher && (
            <Button
              color="primary"
              isIconOnly
              onPress={onClose}
              className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-red-50 hover:bg-red-100 relative group"
            >
              <FaFlagCheckered className="text-lg md:text-xl" />
              <span className="absolute px-2 py-1 text-xs text-white transition scale-0 bg-gray-800 rounded -top-8 group-hover:scale-100">
                {t('chatBox.closeConversation')}
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
