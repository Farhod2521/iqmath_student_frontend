import React, { useEffect, useRef, useState } from 'react'
import { Send, Smile, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const EMOJIS = [
  '😀',
  '😂',
  '😊',
  '😍',
  '🤔',
  '😅',
  '😢',
  '😮',
  '👍',
  '👏',
  '🙏',
  '💪',
  '🔥',
  '⭐',
  '✅',
  '❤️',
  '🎉',
  '📚',
  '✏️',
  '🧮',
  '💯',
  '👌',
  '🤝',
  '🙂'
]

export const MessageInput = ({ onSend, isSending, replyingTo, onCancelReply }) => {
  const [message, setMessage] = useState('')
  const [emojiOpen, setEmojiOpen] = useState(false)
  const inputRef = useRef(null)
  const emojiRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (!emojiOpen) return undefined
    const close = (event) => {
      if (!emojiRef.current?.contains(event.target)) setEmojiOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [emojiOpen])

  // Matn ko'payganda maydon balandlashadi (maksimum 120px)
  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [message])

  const handleSend = () => {
    if (!message.trim() || isSending) return
    onSend(message)
    setMessage('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const addEmoji = (emoji) => {
    const el = inputRef.current
    const start = el?.selectionStart ?? message.length
    const end = el?.selectionEnd ?? message.length
    setMessage((prev) => prev.slice(0, start) + emoji + prev.slice(end))
    requestAnimationFrame(() => {
      el?.focus()
      el?.setSelectionRange(start + emoji.length, start + emoji.length)
    })
  }

  const canSend = !!message.trim() && !isSending

  return (
    <div className="relative z-10 shrink-0 px-3 pb-4 pt-2 md:px-6 md:pb-5">
      {replyingTo && (
        <div className="mb-2 flex items-start justify-between rounded-2xl border-l-4 border-[#2F6BFF] bg-white/95 p-3 shadow-sm backdrop-blur">
          <div className="min-w-0 flex-1">
            <p className="mb-0.5 text-xs font-semibold text-[#2F6BFF]">
              {t('chatUi.replyTo', { name: replyingTo.sender_name })}
            </p>
            <p className="truncate text-sm text-[#5B6478]">{replyingTo.text}</p>
          </div>
          <button
            type="button"
            onClick={onCancelReply}
            className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#6B7385] hover:bg-[#EAF1FF]"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex items-end gap-3 rounded-3xl bg-white/95 p-2.5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.4)] backdrop-blur dark:bg-[#111A2B]/95">
        <div className="flex min-h-[52px] flex-1 items-center gap-2 rounded-2xl border border-[#E5EAF2] bg-white px-4 dark:border-[#26324A] dark:bg-[#0F172A]">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('chatBox.writeMessage')}
            rows={1}
            className="max-h-[120px] w-full resize-none bg-transparent py-3.5 text-[15px] text-[#191C1D] outline-none placeholder:text-[#8A93A6] dark:text-white"
          />

          <div ref={emojiRef} className="relative self-center">
            <button
              type="button"
              onClick={() => setEmojiOpen((prev) => !prev)}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition hover:text-[#2F6BFF] ${
                emojiOpen ? 'text-[#2F6BFF]' : 'text-[#6B7385]'
              }`}
            >
              <Smile size={22} />
            </button>
            {emojiOpen ? (
              <div className="absolute bottom-12 right-0 grid w-[264px] grid-cols-6 gap-1 rounded-2xl border border-[#EEF1F6] bg-white p-2 shadow-xl dark:border-[#26324A] dark:bg-[#111A2B]">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => addEmoji(emoji)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-xl transition hover:bg-[#EAF1FF]"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          aria-label="send"
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#2F6BFF] text-white shadow-[0_10px_22px_-10px_rgba(47,107,255,0.95)] transition hover:bg-[#1F5AF0] active:scale-95 disabled:opacity-50 md:h-14 md:w-14"
        >
          {isSending ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send size={22} className="-ml-0.5" />
          )}
        </button>
      </div>
    </div>
  )
}
