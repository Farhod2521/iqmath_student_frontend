import { useEffect, useRef } from 'react'

export const useBattleSocket = ({ roomId, token, onEvent }) => {
  const socketRef = useRef(null)

  useEffect(() => {
    if (!roomId || !token) return

    const ws = new WebSocket(`wss://api.iqmath.uz/ws/battle/${roomId}/?token=${token}`)

    ws.onopen = () => {
      console.log('✅ Battle socket connected')
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        onEvent && onEvent(data.event, data.payload)
      } catch (err) {
        console.error('Battle socket parse error:', err)
      }
    }

    ws.onerror = (err) => {
      console.error('❌ Battle socket error', err)
    }

    ws.onclose = () => {
      console.log('🔌 Battle socket closed')
    }

    socketRef.current = ws

    return () => {
      ws.close()
    }
  }, [roomId, token])

  return socketRef
}
