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

  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto">
      {chatsLoading && <p className="px-4 py-3 text-xs text-gray-400 md:px-6 md:py-4 md:text-sm">{t('loading')}</p>}

      {chats?.map((chat) => (
        <div
          key={chat.id}
          onClick={() => {
            // if (chat.is_closed) {
            //   // Yopilgan chatni ochish uchun ogohlantirish
            //   if (window.confirm(t('chatBox.chat_closed_open_warning'))) {
            //     props.setActiveChat(chat)
            //     props.setShowChatList(false)
            //     props.cancelReply()
            //   }
            // } else {
            props.setActiveChat(chat)
            props.setShowChatList(false)
            props.cancelReply()
            // }
          }}
          className={`
          flex items-start gap-3 md:gap-4
          px-3 md:px-4 py-3 md:py-4
          cursor-pointer transition-all border-l-4
          w-full max-w-full overflow-hidden
          ${props.activeChat?.id === chat.id ? 'bg-blue-50 border-blue-500' : 'border-transparent hover:bg-gray-50'}
          `}
          // ${chat.is_closed ? 'opacity-70' : ''}
        >
          <div className="relative flex-shrink-0">
            <div className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-white rounded-full shadow-lg md:text-lg md:w-14 md:h-14 bg-gradient-to-br from-blue-400 to-purple-500">
              {chat?.other_user_name?.charAt(0) || '?'}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center flex-1 min-w-0 gap-2">
                <h3 className="font-semibold truncate">{chat.other_user_name}</h3>
              </div>

              <span className="flex-shrink-0 text-[10px] md:text-xs text-gray-500 whitespace-nowrap">
                {formatDate(chat.last_message_at)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <p
                className={`flex-1 text-xs md:text-sm truncate ${
                  chat.unread_count > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
                }`}
              >
                {chat.last_message}
              </p>

              {chat.unread_count > 0 && (
                <span className="flex-shrink-0 min-w-[18px] h-4 md:min-w-[20px] md:h-5 px-1 flex items-center justify-center text-[9px] md:text-[10px] font-bold text-white bg-blue-500 rounded-full">
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
