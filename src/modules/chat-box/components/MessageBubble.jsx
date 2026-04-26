import React from 'react'
import { BsCheckAll, BsCheck, BsLink45Deg } from 'react-icons/bs'
import { extractUrl, formatMessageDateTime, formatTime, removeUrlFromText } from '@/shared/utils'
import IndependentResultCard from './IndependentResult'
import { useTranslation } from 'react-i18next'

const ReplyButton = ({ position, onClick }) => {
  const { t } = useTranslation()
  return (
    <button
      onClick={onClick}
      className={`
      absolute 
      ${position === 'left' ? '-left-6 xs:-left-7 sm:-left-8' : '-right-6 xs:-right-7 sm:-right-8'}
      top-1/2 -translate-y-1/2 
      opacity-0 group-hover:opacity-100 
      p-1 xs:p-1.5 
      bg-gray-100 hover:bg-gray-200 
      rounded-full 
      transition-all duration-200
      shadow-sm
      focus:outline-none focus:ring-2 focus:ring-blue-400
    `}
      title={t('chatBox.reply')}
    >
      <svg
        className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
        />
      </svg>
    </button>
  )
}

export const MessageBubble = ({ message, isMe, otherUserName, onReply, showAvatar }) => {
  const { t } = useTranslation()
  const extractedUrl = extractUrl(message?.url) || extractUrl(message?.text)
  const cleanText = removeUrlFromText(message.text)

  // O'zimning xabarim (o'ng tomonda)
  if (isMe) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[85%] xs:max-w-[80%] sm:max-w-[75%] md:max-w-[70%] lg:max-w-[65%] group cursor-pointer"
          onDoubleClick={() => onReply(message)}
        >
          {/* Reply to quoted message */}
          {message.reply_to_text && (
            <div className="p-2 xs:p-2.5 sm:p-3 mb-1.5 xs:mb-2 ml-2 xs:ml-3 sm:ml-4 border-l-3 xs:border-l-4 border-blue-400 rounded-lg bg-white/50">
              <p className="mb-0.5 xs:mb-1 text-[10px] xs:text-xs font-semibold text-blue-700 truncate">
                {message.reply_to_sender}
              </p>
              <p className="text-xs xs:text-sm text-gray-600 line-clamp-2">{message.reply_to_text}</p>
            </div>
          )}

          <div className="relative">
            <div className="p-2 xs:p-3 sm:p-4 text-white rounded-tr-sm shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl">
              <p className="text-xs xs:text-sm sm:text-base whitespace-pre-wrap break-all leading-relaxed">
                {cleanText}
              </p>

              {message?.independent_data && (
                <div className="mt-2">
                  <IndependentResultCard data={message.independent_data} variant="dark" />
                </div>
              )}

              {extractedUrl && (
                <div className="flex items-center gap-1 xs:gap-2 mt-1 xs:mt-2">
                  <span className="text-[10px] xs:text-xs text-blue-100">{t('link')}:</span>
                  <BsLink45Deg
                    size={16}
                    onClick={() => window.open(extractedUrl, '_blank')}
                    className="text-blue-100 cursor-pointer hover:text-white transition-colors"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-1 mt-1 xs:mt-2">
                <span className="text-[9px] xs:text-[10px] sm:text-xs text-blue-100">
                  {formatMessageDateTime(message.created_at)}
                </span>
                {message.is_read ? (
                  <BsCheckAll className="text-xs xs:text-sm text-blue-100" />
                ) : (
                  <BsCheck className="text-xs xs:text-sm text-blue-100" />
                )}
              </div>
            </div>
            <ReplyButton position="left" onClick={() => onReply(message)} />
          </div>
        </div>
      </div>
    )
  }

  // Boshqa odamning xabari (chap tomonda)
  return (
    <div className="flex flex-col">
      <div className="flex gap-1 xs:gap-2 sm:gap-3">
        <div
          className="max-w-[85%] xs:max-w-[80%] sm:max-w-[75%] md:max-w-[70%] lg:max-w-[65%] group cursor-pointer"
          onDoubleClick={() => onReply(message)}
        >
          {/* Reply to quoted message */}
          {message.reply_to_text && (
            <div className="p-2 xs:p-2.5 sm:p-3 mb-1.5 xs:mb-2 bg-gray-100 border-l-3 xs:border-l-4 border-gray-400 rounded-lg">
              <p className="mb-0.5 xs:mb-1 text-[10px] xs:text-xs font-semibold text-gray-700 truncate">
                {message.reply_to_sender}
              </p>
              <p className="text-xs xs:text-sm text-gray-600 line-clamp-2">{message.reply_to_text}</p>
            </div>
          )}

          <div className="relative">
            <div className="p-2 xs:p-3 sm:p-4 bg-white border border-gray-100 rounded-tl-sm shadow-md rounded-2xl">
              <p className="text-xs xs:text-sm sm:text-base leading-relaxed text-gray-800 whitespace-pre-wrap break-all">
                {cleanText}
              </p>

              {message?.independent_data && (
                <div className="mt-2">
                  <IndependentResultCard data={message.independent_data} variant="light" />
                </div>
              )}

              <div className="flex items-center justify-between mt-1 xs:mt-2 gap-2">
                <div className="flex items-center gap-1 xs:gap-2 flex-1 min-w-0">
                  {extractedUrl && (
                    <div className="flex items-center gap-1 xs:gap-2">
                      <span className="text-[9px] xs:text-[10px] sm:text-xs text-gray-500">{t('link')}:</span>
                      <BsLink45Deg
                        size={14}
                        onClick={() => window.open(extractedUrl, '_blank')}
                        className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                      />
                    </div>
                  )}
                </div>
                <span className="flex-shrink-0 text-[9px] xs:text-[10px] sm:text-xs text-gray-400">
                  {formatMessageDateTime(message.created_at)}
                </span>
              </div>
            </div>
            <ReplyButton position="right" onClick={() => onReply(message)} />
          </div>
        </div>
      </div>
    </div>
  )
}
