import { useEffect, useRef } from 'react'

export const useChatSocket = ({ chatId, token, onMessage }) => {
  const socketRef = useRef(null)

  useEffect(() => {
    if (!chatId || !token) return

    const ws = new WebSocket(`wss://api.iqmath.uz/ws/chat/${chatId}/?token=${token}`)

    ws.onopen = () => {
      console.log('✅ Socket connected')
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        onMessage && onMessage(data)
      } catch (err) {
        console.error('Parse error:', err)
      }
    }

    ws.onerror = (err) => {
      console.error('❌ Socket error', err)
    }

    ws.onclose = () => {
      console.log('🔌 Socket closed')
    }

    socketRef.current = ws

    return () => {
      ws.close()
    }
  }, [chatId, token])

  return socketRef
}
