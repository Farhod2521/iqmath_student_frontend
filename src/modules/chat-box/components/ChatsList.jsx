import React from 'react'
import { useTranslation } from 'react-i18next'

const formatDate = (dateString) => {
  if (!dateString) return '-'

  const date = new Date(dateString)
  const now = new Date()

  const diff = now - date
  const hours = diff / 3600000

  // 1 kundan kichik bo‘lsa vaqt chiqadi
  if (hours < 24) {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  // 1 kundan katta bo‘lsa sana chiqadi
  return date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  })
}

const ChatsList = ({ chatsLoading, chats = [], ...props }) => {
  const { t } = useTranslation()

  const getChatStatus = (chat) => {
    if (chat?.is_closed) {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
          {t('closed')}
        </span>
      )
    }

    if (chat?.is_transferred) {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
          {t('transferred')}
        </span>
      )
    }

    if (chat?.close_requested) {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-orange-700 bg-orange-100 rounded-full">
          {t('close_requested')}
        </span>
      )
    }

    return null
  }

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      {chatsLoading && <p className="px-6 py-4 text-sm text-gray-400">{t('loading')}</p>}

      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => {
            if (chat.is_closed) {
              // Yopilgan chatni ochish uchun ogohlantirish
              if (window.confirm(t('chat_closed_open_warning'))) {
                props.setActiveChat(chat)
                props.setShowChatList(false)
                props.cancelReply()
              }
            } else {
              props.setActiveChat(chat)
              props.setShowChatList(false)
              props.cancelReply()
            }
          }}
          className={`flex items-center gap-4 p-4 cursor-pointer transition-all border-l-4 w-full overflow-hidden
            ${props.activeChat?.id === chat.id ? 'bg-blue-50 border-blue-500' : 'border-transparent hover:bg-gray-50'}
            ${chat.is_closed ? 'opacity-70' : ''}
          `}
        >
          <div className="relative flex-shrink-0">
            <div className="flex items-center justify-center text-lg font-semibold text-white rounded-full shadow-lg w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500">
              {chat?.other_user_name?.charAt(0) || '?'}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1 gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <h3 className="font-semibold truncate">{chat.other_user_name}</h3>
              </div>

              <span className="flex-shrink-0 text-xs text-gray-500 whitespace-nowrap">
                {formatDate(chat.last_message_at)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <p
                className={`flex-1 text-sm truncate overflow-hidden ${
                  chat.unread_count > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
                }`}
              >
                {chat.last_message}
              </p>

              {chat.unread_count > 0 && (
                <span className="flex-shrink-0 min-w-[20px] h-5 px-1.5 flex items-center justify-center text-[10px] font-bold text-white bg-blue-500 rounded-full">
                  {chat.unread_count > 99 ? '99+' : chat.unread_count}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatsList
