import React from 'react'
import { BsCheckAll, BsCheck, BsLink45Deg } from 'react-icons/bs'
import { extractUrl, formatTime, removeUrlFromText } from '@/shared/utils'
import IndependentResultCard from './IndependentResult'
import { useTranslation } from 'react-i18next'

export const MessageBubble = ({ message, isMe, otherUserName, onReply, showAvatar }) => {
  const { t } = useTranslation()
  const extractedUrl = extractUrl(message?.url) || extractUrl(message?.text)
  const cleanText = removeUrlFromText(message.text)

  if (isMe) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[70%] group cursor-pointer" onDoubleClick={() => onReply(message)}>
          {message.reply_to_text && (
            <div className="p-3 mb-2 ml-4 border-l-4 border-blue-400 rounded-lg bg-white/50">
              <p className="mb-1 text-xs font-semibold text-blue-700">{message.reply_to_sender}</p>
              <p className="text-sm text-gray-600">{message.reply_to_text}</p>
            </div>
          )}
          <div className="relative">
            <div className="p-4 text-white rounded-tr-sm shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl">
              <p className="text-sm whitespace-pre-wrap break-all">{cleanText}</p>
              {extractedUrl && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs">{t('link')}:</span>
                  <BsLink45Deg
                    size={18}
                    onClick={() => window.open(extractedUrl, '_blank')}
                    className="text-sm text-gray-200 cursor-pointer"
                  />
                </div>
              )}
              <div className="flex items-center justify-end gap-1 mt-2">
                <span className="text-xs text-blue-100">{formatTime(message.created_at)}</span>
                {message.is_read ? <BsCheckAll className="text-sm" /> : <BsCheck className="text-sm" />}
              </div>
            </div>
            <ReplyButton position="left" onClick={() => onReply(message)} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-3">
      {/* {showAvatar && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-sm">
            {otherUserName?.charAt(0) || '?'}
          </div>
        </div>
      )} */}
      <div
        className={`max-w-[70%] group cursor-pointer ${!showAvatar ? 'ml-11' : ''}`}
        onDoubleClick={() => onReply(message)}
      >
        {message.reply_to_text && (
          <div className="p-3 mb-2 bg-gray-100 border-l-4 border-gray-400 rounded-lg">
            <p className="mb-1 text-xs font-semibold text-gray-700">{message.reply_to_sender}</p>
            <p className="text-sm text-gray-600">{message.reply_to_text}</p>
          </div>
        )}
        <div className="relative">
          <div className="p-4 bg-white border border-gray-100 rounded-tl-sm shadow-md rounded-2xl">
            <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">{cleanText}</p>
            {/* Sizning IndependentResult komponentingiz */}
            {message?.independent_data && <IndependentResultCard data={message.independent_data} />}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1">
                {extractedUrl && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{t('link')}:</span>
                    <BsLink45Deg
                      size={18}
                      onClick={() => window.open(extractedUrl, '_blank')}
                      className="text-sm text-gray-400 cursor-pointer"
                    />
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-400">{formatTime(message.created_at)}</span>
            </div>
          </div>
          <ReplyButton position="right" onClick={() => onReply(message)} />
        </div>
      </div>
    </div>
  )
}

const ReplyButton = ({ position, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute ${
      position === 'left' ? '-left-8' : '-rotate-180 -right-8'
    } top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-all`}
    title="Javob berish"
  >
    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
    </svg>
  </button>
)
