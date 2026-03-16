import React, { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'

export const MessagesList = ({ messages, otherUserId, otherUserName, onReply, isLoading }) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-gray-400">Xabarlar yuklanmoqda...</p>
      </div>
    )
  }

  return (
    <div className="flex-1 p-3 space-y-4 overflow-y-auto md:p-6">
      {messages.map((msg, index) => {
        const isMe = msg.sender_id !== otherUserId
        const showAvatar = !isMe && (index === 0 || messages[index - 1].sender_id === otherUserId)

        return (
          <MessageBubble
            key={msg.id}
            message={msg}
            isMe={isMe}
            otherUserName={otherUserName}
            onReply={onReply}
            showAvatar={showAvatar}
          />
        )
      })}
      <div ref={messagesEndRef} />
    </div>
  )
}
