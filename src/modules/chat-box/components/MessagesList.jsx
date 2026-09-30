import React, { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'
import { useTranslation } from 'react-i18next'

const MONTHS = {
  uz: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'],
  ru: [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
}

const dayKey = (value) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

const formatDay = (value, lang) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const months = MONTHS[lang] || MONTHS.uz
  return lang === 'ru'
    ? `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    : `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
}

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
  const { t, i18n } = useTranslation()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const showCloseAction = teacher_close_request === true && student_close_confirm !== true && role === 'student'

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="rounded-full bg-white/80 px-4 py-2 text-sm text-[#6B7385]">{t('chatBox.loadingMessages')}</p>
      </div>
    )
  }

  return (
    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-3 py-5 sm:px-5 md:px-8">
      {messages?.map((msg, index) => {
        const isMe = msg.sender_id !== otherUserId
        const showDay = index === 0 || dayKey(messages[index - 1].created_at) !== dayKey(msg.created_at)

        return (
          <React.Fragment key={msg.id}>
            {showDay && formatDay(msg.created_at, i18n.language) ? (
              <div className="flex justify-center py-1">
                <span className="rounded-full bg-[#E3EAF6]/90 px-4 py-1.5 text-xs font-semibold text-[#5B6478] backdrop-blur dark:bg-[#1F2A3C] dark:text-gray-300">
                  {formatDay(msg.created_at, i18n.language)}
                </span>
              </div>
            ) : null}
            <MessageBubble message={msg} isMe={isMe} otherUserName={otherUserName} onReply={onReply} />
          </React.Fragment>
        )
      })}
      <div ref={messagesEndRef} />

      {showCloseAction && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onRateClick}
            className="rounded-2xl border border-[#C9D8FF] bg-white px-5 py-2.5 text-sm font-semibold text-[#2F6BFF] shadow-sm transition hover:bg-[#EAF1FF] active:scale-95"
          >
            ⭐ {t('evaluateCloseChat')}
          </button>
        </div>
      )}
    </div>
  )
}
