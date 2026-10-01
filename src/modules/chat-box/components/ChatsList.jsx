import React from 'react'
import { useTranslation } from 'react-i18next'
import { Users } from 'lucide-react'

const formatDate = (dateString) => {
  if (!dateString) return ''

  const date = new Date(dateString)
  const now = new Date()
  const hours = (now - date) / 3600000

  // 1 kundan kichik bo‘lsa vaqt chiqadi
  if (hours < 24) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  // 1 kundan katta bo‘lsa sana chiqadi
  return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
}

export const ChatAvatar = ({ chat, size = 'h-14 w-14 text-xl' }) =>
  chat?.chat_type === 'group' ? (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-[#EAF1FF] text-[#2F6BFF] ${size}`}>
      <Users size={24} />
    </span>
  ) : (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] font-semibold text-white shadow-[0_6px_16px_-8px_rgba(99,102,241,0.9)] ${size}`}
    >
      {chat?.other_user_name?.charAt(0)?.toUpperCase() || '?'}
    </span>
  )

const ChatsList = ({ chatsLoading, chats = [], ...props }) => {
  const { t } = useTranslation()

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-3">
      {chatsLoading && <p className="px-3 py-4 text-sm text-gray-400">{t('loading')}</p>}

      {!chatsLoading && !chats?.length ? (
        <p className="px-3 py-10 text-center text-sm text-[#8A93A6]">{t('chatUi.noChats')}</p>
      ) : null}

      {chats?.map((chat) => {
        const active = props.activeChat?.id === chat.id
        const unread = chat.unread_count > 0
        return (
          <button
            type="button"
            key={chat.id}
            onClick={() => {
              props.setActiveChat(chat)
              props.setShowChatList(false)
              props.cancelReply()
            }}
            className={`relative flex w-full items-center gap-3.5 rounded-2xl px-3 py-3.5 text-left transition ${
              active ? 'bg-[#EAF1FF] dark:bg-[#1E2B48]' : 'hover:bg-[#F6F8FC] dark:hover:bg-[#162033]'
            }`}
          >
            {active ? <span className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-[#2F6BFF]" /> : null}

            <ChatAvatar chat={chat} />

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-[15px] font-bold text-[#0F172A] dark:text-white">
                  {chat.other_user_name}
                </h3>
                <span className="shrink-0 text-xs text-[#8A93A6]">{formatDate(chat.last_message_at)}</span>
              </div>

              <div className="mt-1 flex items-center justify-between gap-2">
                <p
                  className={`flex-1 truncate text-sm ${
                    unread ? 'font-semibold text-[#191C1D] dark:text-white' : 'text-[#6B7385] dark:text-gray-400'
                  }`}
                >
                  {chat.last_message || '—'}
                </p>

                {unread && (
                  <span className="flex h-6 min-w-[28px] shrink-0 items-center justify-center rounded-full bg-[#2F6BFF] px-2 text-xs font-bold text-white">
                    {chat.unread_count > 99 ? '99+' : chat.unread_count}
                  </span>
                )}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default ChatsList
