import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Send, MessageCircle } from 'lucide-react'
import BattlePlayerAvatar from './BattlePlayerAvatar'

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
    <div className="flex flex-col h-full min-h-[420px] bg-white border border-gray-100 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3.5 border-b border-gray-50">
        <MessageCircle size={16} className="text-indigo-500" />
        <p className="text-sm font-bold text-gray-700">{t('battle.liveChat')}</p>
      </div>

      <div ref={listRef} className="flex-1 px-4 py-3 space-y-3 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
            <MessageCircle size={28} className="text-gray-200" />
            <p className="text-xs text-gray-300">{t('battle.noMessagesYet')}</p>
          </div>
        ) : (
          messages.map((m, idx) => {
            const isMe = m.participant_id === myParticipantId
            return (
              <div key={idx} className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
                <BattlePlayerAvatar name={m.name} size={26} />
                <div className={`max-w-[75%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  {!isMe ? <p className="mb-0.5 text-[10px] font-bold text-gray-400 px-1">{m.name}</p> : null}
                  <div
                    className={`px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-indigo-500 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-700 rounded-bl-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      <div className="flex items-center gap-2 p-3 border-t border-gray-50">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t('battle.chatPlaceholder')}
          className="flex-1 px-3.5 py-2.5 text-sm border-2 border-gray-100 rounded-full focus:outline-none focus:border-indigo-300"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="flex items-center justify-center text-white transition-opacity bg-indigo-500 rounded-full w-10 h-10 shrink-0 disabled:opacity-40"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  )
}

export default BattleChat
