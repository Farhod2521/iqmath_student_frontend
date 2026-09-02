import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, MessageCircle } from 'lucide-react'

const BattleChat = ({ messages, myParticipantId, onSend }) => {
  const { t } = useTranslation()
  const [text, setText] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages.length])

  const handleSend = () => {
    if (!text.trim()) return
    onSend(text)
    setText('')
  }

  return (
    <div className="flex flex-col p-4 bg-white border border-gray-100 rounded-xl h-80">
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle size={16} className="text-indigo-500" />
        <p className="text-sm font-bold text-gray-700">{t('battle.liveChat')}</p>
      </div>

      <div ref={listRef} className="flex-1 pr-1 space-y-2 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="mt-6 text-xs text-center text-gray-300">{t('battle.noMessagesYet')}</p>
        ) : (
          messages.map((m, idx) => {
            const isMe = m.participant_id === myParticipantId
            return (
              <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3 py-1.5 rounded-2xl text-xs ${
                    isMe ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {!isMe ? <p className="mb-0.5 text-[10px] font-bold opacity-70">{m.name}</p> : null}
                  {m.text}
                </div>
              </div>
            )
          })
        )}
      </div>

      <div className="flex items-center gap-2 pt-3 mt-2 border-t border-gray-100">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t('battle.chatPlaceholder')}
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSend}
          className="flex items-center justify-center w-9 h-9 text-white bg-indigo-500 rounded-full shrink-0"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  )
}

export default BattleChat
