import { useEffect, useMemo, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Check, CheckCheck, Minus, Paperclip, SendHorizontal, X } from 'lucide-react'
import { chatAPI } from '@/shared/services'
import { config } from '@/config'
import { useChatSocket } from '@/modules/chat-box/hooks/useChatSocket'
import StudentAvatar from './StudentAvatar'

const IMAGE_RE = /\.(png|jpe?g|gif|webp|bmp|heic)(\?|$)/i
const pad = (n) => String(n).padStart(2, '0')

const fileUrl = (url) => (!url ? '' : /^https?:\/\//.test(url) ? url : `${config.API_URL}${url}`)
const timeOf = (iso) => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : `${pad(d.getHours())}:${pad(d.getMinutes())}`
}
const dayKey = (iso) => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

const dayLabel = (iso, tx) => {
  const d = new Date(iso)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  if (dayKey(iso) === dayKey(today.toISOString())) return tx.today
  if (dayKey(iso) === dayKey(yesterday.toISOString())) return tx.yesterday
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`
}

/**
 * O'qituvchi ↔ o'quvchi chati (o'quvchi sahifasining o'ng tomonida).
 * Suhbat create-direct bilan ochiladi (bor bo'lsa o'sha qaytadi), yangi xabarlar WebSocket orqali keladi.
 */
export default function StudentChatPanel({ studentId, studentUserId, studentName, tx, onClose }) {
  const { data: session } = useSession()
  const [conversationId, setConversationId] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const listRef = useRef(null)
  const fileRef = useRef(null)

  const addMessages = (incoming) =>
    setMessages((prev) => {
      const map = new Map(prev.map((m) => [m.id, m]))
      incoming.forEach((m) => map.set(m.id, { ...map.get(m.id), ...m }))
      return Array.from(map.values()).sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    })

  useEffect(() => {
    if (!studentId || !session?.accessToken) return
    let alive = true
    setLoading(true)
    chatAPI
      .createDirect(studentId)
      .then((conv) => {
        if (!alive) return null
        setConversationId(conv.id)
        return chatAPI.getMessages(conv.id)
      })
      .then((data) => {
        if (alive && data) setMessages(data.messages || [])
      })
      .catch((error) => toast.error(error?.response?.data?.error || tx.chatError))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [studentId, session?.accessToken])

  const socketRef = useChatSocket({
    chatId: conversationId,
    token: session?.accessToken,
    onMessage: (msg) => msg?.id && addMessages([msg])
  })

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages.length, minimized, loading])

  const send = async (e) => {
    e.preventDefault()
    const value = text.trim()
    if (!value || !conversationId) return
    setText('')
    // Socket ochiq bo'lsa — jonli (o'quvchiga ham darhol boradi), aks holda oddiy so'rov
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ text: value }))
      return
    }
    setSending(true)
    try {
      addMessages([await chatAPI.sendMessage({ chatId: conversationId, text: value })])
    } catch {
      setText(value)
      toast.error(tx.sendError)
    } finally {
      setSending(false)
    }
  }

  const sendFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !conversationId) return
    setSending(true)
    try {
      addMessages([await chatAPI.sendFile({ chatId: conversationId, file })])
    } catch {
      toast.error(tx.sendError)
    } finally {
      setSending(false)
    }
  }

  // Kun ajratgichlari bilan
  const items = useMemo(() => {
    const out = []
    let lastDay = ''
    messages.forEach((msg) => {
      const key = dayKey(msg.created_at)
      if (key && key !== lastDay) {
        out.push({ kind: 'day', id: `day-${key}`, label: dayLabel(msg.created_at, tx) })
        lastDay = key
      }
      out.push({ kind: 'msg', id: msg.id, msg })
    })
    return out
  }, [messages, tx])

  return (
    <aside className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#EEF1F6] bg-white shadow-[0_10px_30px_-24px_rgba(15,27,61,0.45)]">
      <div className="flex items-center justify-between px-5 pb-3 pt-4">
        <h3 className="text-lg font-bold text-[#0F1B3D]">{tx.chat}</h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMinimized((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#5B6478] hover:bg-[#F1F5F9]"
            aria-label="minimize"
          >
            <Minus size={18} />
          </button>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#5B6478] hover:bg-[#F1F5F9]"
              aria-label="close"
            >
              <X size={18} />
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-3 border-y border-[#F1F4F9] px-5 py-3">
        <StudentAvatar size={42} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-[#0F1B3D]">{studentName}</p>
          <p className="text-xs text-[#16A34A]">{tx.studentRole}</p>
        </div>
      </div>

      {minimized ? null : (
        <>
          <div ref={listRef} className="min-h-0 flex-1 space-y-2.5 overflow-y-auto bg-[#FAFBFD] px-4 py-4">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent" />
              </div>
            ) : items.length === 0 ? (
              <p className="mt-10 text-center text-sm text-[#8A93A6]">{tx.chatEmpty}</p>
            ) : (
              items.map((item) => {
                if (item.kind === 'day') {
                  return (
                    <div key={item.id} className="flex justify-center py-1">
                      <span className="rounded-full bg-[#EEF2F8] px-3 py-1 text-xs font-medium text-[#5B6478]">
                        {item.label}
                      </span>
                    </div>
                  )
                }
                const { msg } = item
                if (msg.message_type === 'system') {
                  return (
                    <p key={item.id} className="text-center text-xs text-[#8A93A6]">
                      {msg.text}
                    </p>
                  )
                }
                const mine = studentUserId ? msg.sender_id !== studentUserId : false
                const url = fileUrl(msg.file || msg.url)
                const isImage = url && IMAGE_RE.test(url)
                return (
                  <div key={item.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug ${
                        mine
                          ? 'rounded-br-md bg-[#E8F0FF] text-[#0F1B3D]'
                          : 'rounded-bl-md border border-[#EEF1F6] bg-white text-[#0F1B3D]'
                      }`}
                    >
                      {isImage ? (
                        <a href={url} target="_blank" rel="noreferrer">
                          <img src={url} alt="" className="mb-1 max-h-48 rounded-xl object-cover" />
                        </a>
                      ) : url ? (
                        <a href={url} target="_blank" rel="noreferrer" className="mb-1 block text-[#2563EB] underline">
                          📎 {tx.file}
                        </a>
                      ) : null}
                      {msg.text ? <p className="whitespace-pre-wrap break-words">{msg.text}</p> : null}
                      <span className="mt-1 flex items-center justify-end gap-1 text-[11px] text-[#8A93A6]">
                        {timeOf(msg.created_at)}
                        {mine ? (
                          msg.is_read ? (
                            <CheckCheck size={14} className="text-[#2563EB]" />
                          ) : (
                            <Check size={14} />
                          )
                        ) : null}
                      </span>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <form onSubmit={send} className="flex items-center gap-2 border-t border-[#F1F4F9] p-3">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={sendFile} />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={!conversationId || sending}
              className="flex h-11 w-10 shrink-0 items-center justify-center rounded-xl text-[#5B6478] hover:bg-[#F1F5F9] disabled:opacity-50"
              aria-label="attach"
            >
              <Paperclip size={19} />
            </button>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={tx.typeMessage}
              disabled={!conversationId}
              className="h-11 min-w-0 flex-1 rounded-xl border border-[#E3E8F1] bg-[#F8FAFD] px-3.5 text-sm outline-none focus:border-[#2563EB] focus:bg-white"
            />
            <button
              type="submit"
              disabled={!conversationId || sending || !text.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white transition hover:bg-[#1D4ED8] disabled:opacity-50"
              aria-label="send"
            >
              {sending ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <SendHorizontal size={18} />
              )}
            </button>
          </form>
        </>
      )}
    </aside>
  )
}
