import React, { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'
import { useTranslation } from 'react-i18next'

export const MessagesList = ({
  messages,
  otherUserId,
  otherUserName,
  onReply,
  isLoading,
  onRateClick,
  teacher_close_request,
  student_close_confirm,
  role
}) => {
  const messagesEndRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const showCloseAction = teacher_close_request === true && student_close_confirm !== true && role === 'student'

  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <p className="text-xs text-gray-400 xs:text-sm">{t('chatBox.loadingMessages')}</p>
      </div>
    )
  }

  return (
    <div className="flex-1 min-h-0 px-2 py-3 space-y-4 overflow-y-auto xs:px-3 sm:px-4 md:px-5 lg:px-6 xs:py-4 sm:py-5 md:py-6">
      {messages?.map((msg, index) => {
        const isMe = msg.sender_id !== otherUserId
        const showAvatar = !isMe && (index === 0 || messages[index - 1].sender_id === otherUserId)

        return (
          <MessageBubble
            key={msg.id}
            message={msg}
            isMe={isMe}
            otherUserName={otherUserName}
            onReply={onReply}
            showAvatar={showAvatar}
          />
        )
      })}
      <div ref={messagesEndRef} />

      {showCloseAction && (
        <div className="flex justify-center mt-2 bottom-2">
          <button
            onClick={onRateClick}
            className="px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 active:scale-95 transition-all shadow-sm"
          >
            ⭐ {t('evaluateCloseChat')}
          </button>
        </div>
      )}
    </div>
  )
}
