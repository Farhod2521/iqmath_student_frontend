import React from 'react'
import { BsCheckAll, BsCheck, BsLink45Deg } from 'react-icons/bs'
import { Reply, User } from 'lucide-react'
import { extractUrl, removeUrlFromText } from '@/shared/utils'
import IndependentResultCard from './IndependentResult'
import { useTranslation } from 'react-i18next'

const formatClock = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

const ReplyButton = ({ position, onClick }) => {
  const { t } = useTranslation()
  return (
    <button
      type="button"
      onClick={onClick}
      title={t('chatBox.reply')}
      className={`absolute top-1/2 -translate-y-1/2 ${
        position === 'left' ? '-left-10' : '-right-10'
      } flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#6B7385] opacity-0 shadow-md transition hover:text-[#2F6BFF] focus:opacity-100 group-hover:opacity-100`}
    >
      <Reply size={15} />
    </button>
  )
}

const LinkRow = ({ url, dark }) => {
  const { t } = useTranslation()
  if (!url) return null
  return (
    <button
      type="button"
      onClick={() => window.open(url, '_blank')}
      className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${dark ? 'text-blue-100 hover:text-white' : 'text-[#2F6BFF]'}`}
    >
      <BsLink45Deg size={16} />
      {t('link')}
    </button>
  )
}

export const MessageBubble = ({ message, isMe, otherUserName, onReply }) => {
  const extractedUrl = extractUrl(message?.url) || extractUrl(message?.text)
  const cleanText = removeUrlFromText(message.text)

  // O'zimning xabarim (o'ng tomonda)
  if (isMe) {
    return (
      <div className="flex items-end justify-end gap-3">
        <div
          className="group max-w-[85%] cursor-pointer sm:max-w-[70%] lg:max-w-[60%]"
          onDoubleClick={() => onReply(message)}
        >
          {message.reply_to_text && (
            <div className="mb-1.5 ml-4 rounded-xl border-l-4 border-[#2F6BFF] bg-white/80 p-2.5 backdrop-blur">
              <p className="truncate text-xs font-semibold text-[#2F6BFF]">{message.reply_to_sender}</p>
              <p className="line-clamp-2 text-sm text-[#5B6478]">{message.reply_to_text}</p>
            </div>
          )}

          <div className="relative">
            <div className="rounded-2xl rounded-br-md bg-[#2F6BFF] px-4 py-3 text-white shadow-[0_10px_24px_-14px_rgba(47,107,255,0.9)]">
              <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">{cleanText}</p>

              {message?.independent_data && (
                <div className="mt-2">
                  <IndependentResultCard data={message.independent_data} variant="dark" />
                </div>
              )}

              <LinkRow url={extractedUrl} dark />

              <div className="mt-1.5 flex items-center justify-end gap-1.5 text-xs text-blue-100">
                {formatClock(message.created_at)}
                {message.is_read ? <BsCheckAll size={16} /> : <BsCheck size={16} />}
              </div>
            </div>
            <ReplyButton position="left" onClick={() => onReply(message)} />
          </div>
        </div>

        <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#2F6BFF] shadow-md sm:flex">
          <User size={20} />
        </span>
      </div>
    )
  }

  // Boshqa odamning xabari (chap tomonda)
  return (
    <div className="flex items-start gap-3">
      <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] text-sm font-semibold text-white shadow-md sm:flex">
        {otherUserName?.charAt(0)?.toUpperCase() || '?'}
      </span>

      <div
        className="group max-w-[85%] cursor-pointer sm:max-w-[70%] lg:max-w-[60%]"
        onDoubleClick={() => onReply(message)}
      >
        {message.reply_to_text && (
          <div className="mb-1.5 rounded-xl border-l-4 border-[#A0A8BA] bg-white/80 p-2.5 backdrop-blur">
            <p className="truncate text-xs font-semibold text-[#5B6478]">{message.reply_to_sender}</p>
            <p className="line-clamp-2 text-sm text-[#6B7385]">{message.reply_to_text}</p>
          </div>
        )}

        <div className="relative">
          <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.45)] dark:bg-[#1A2436]">
            <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed text-[#191C1D] dark:text-gray-100">
              {cleanText}
            </p>

            {message?.independent_data && (
              <div className="mt-2">
                <IndependentResultCard data={message.independent_data} variant="light" />
              </div>
            )}

            <LinkRow url={extractedUrl} />

            <p className="mt-1.5 text-xs text-[#8A93A6]">{formatClock(message.created_at)}</p>
          </div>
          <ReplyButton position="right" onClick={() => onReply(message)} />
        </div>
      </div>
    </div>
  )
}
