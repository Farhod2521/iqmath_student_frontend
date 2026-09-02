import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useBattleSocket } from './useBattleSocket'

const SECONDS_PER_QUESTION_FALLBACK = 60

export const useBattle = (roomId) => {
  const { data: session } = useSession()

  const [room, setRoom] = useState(null)
  const [status, setStatus] = useState('connecting') // connecting | waiting | active | finished | voided
  const [myParticipantId, setMyParticipantId] = useState(null)
  const [question, setQuestion] = useState(null) // { order, question }
  const [questionIndex, setQuestionIndex] = useState(0)
  const [questionStartedAt, setQuestionStartedAt] = useState(null)
  const [myAnswered, setMyAnswered] = useState(false)
  const [opponentAnswered, setOpponentAnswered] = useState(false)
  const [result, setResult] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [voidReason, setVoidReason] = useState(null)

  const myParticipantIdRef = useRef(null)
  useEffect(() => {
    myParticipantIdRef.current = myParticipantId
  }, [myParticipantId])

  const handleEvent = useCallback((eventType, payload) => {
    switch (eventType) {
      case 'room_snapshot': {
        setRoom(payload)
        setStatus(payload.status)
        setQuestionIndex(payload.current_question_index || 0)
        const mine = payload.participants?.find((p) => p.is_self)
        if (mine) setMyParticipantId(mine.participant_id)

        // Recover an in-progress match on (re)connect — without this a
        // refreshed/duplicated connection would show the header but never
        // receive another event to populate the question again.
        if (payload.current_question) {
          setQuestion(payload.current_question)
          const elapsedMs = (payload.question_seconds_elapsed || 0) * 1000
          setQuestionStartedAt(Date.now() - elapsedMs)
        }
        break
      }
      case 'opponent_joined': {
        setRoom((prev) =>
          prev ? { ...prev, participants: [...prev.participants, payload.participant] } : prev
        )
        break
      }
      case 'battle_started': {
        setRoom(payload.room)
        setStatus('active')
        setQuestion(payload.question)
        setQuestionIndex(payload.question?.order ?? 0)
        setMyAnswered(false)
        setOpponentAnswered(false)
        setQuestionStartedAt(Date.now())
        break
      }
      case 'next_question': {
        setQuestion(payload.question)
        setQuestionIndex(payload.index)
        setMyAnswered(false)
        setOpponentAnswered(false)
        setQuestionStartedAt(Date.now())
        break
      }
      case 'opponent_progress': {
        if (payload.participant_id === myParticipantIdRef.current) {
          setMyAnswered(true)
        } else {
          setOpponentAnswered(true)
        }
        break
      }
      case 'battle_finished': {
        setStatus('finished')
        setResult(payload)
        break
      }
      case 'battle_voided': {
        setStatus('voided')
        setVoidReason(payload?.reason || 'unknown')
        break
      }
      case 'chat_message': {
        setChatMessages((prev) => [...prev, payload])
        break
      }
      default:
        break
    }
  }, [])

  const socketRef = useBattleSocket({ roomId, token: session?.accessToken, onEvent: handleEvent })

  const sendAnswer = useCallback(
    (answer) => {
      if (!question || myAnswered) return
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({ type: 'answer', question_order: question.order, answer })
        )
        setMyAnswered(true)
      }
    },
    [socketRef, question, myAnswered]
  )

  const sendSkip = useCallback(() => {
    if (!question || myAnswered) return
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'skip', question_order: question.order }))
      setMyAnswered(true)
    }
  }, [socketRef, question, myAnswered])

  const sendChat = useCallback(
    (text) => {
      const trimmed = (text || '').trim()
      if (!trimmed) return
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ type: 'chat', text: trimmed }))
      }
    },
    [socketRef]
  )

  const { me, opponent } = useMemo(() => {
    const participants = room?.participants || []
    return {
      me: participants.find((p) => p.participant_id === myParticipantId) || null,
      opponent: participants.find((p) => p.participant_id !== myParticipantId) || null
    }
  }, [room, myParticipantId])

  const secondsPerQuestion = room?.seconds_per_question || SECONDS_PER_QUESTION_FALLBACK

  return {
    room,
    status,
    me,
    opponent,
    question,
    questionIndex,
    questionStartedAt,
    secondsPerQuestion,
    myAnswered,
    opponentAnswered,
    result,
    chatMessages,
    voidReason,
    chatEnabled: !!room?.chat_enabled,
    sendAnswer,
    sendSkip,
    sendChat
  }
}
