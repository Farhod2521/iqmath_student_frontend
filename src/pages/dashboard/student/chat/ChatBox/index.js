import { Button } from '@heroui/react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import LayoutAdmin from '@/layout/LayoutAdmin'
import HeaderTitle from '@/components/header-title'
import { useTranslation } from 'react-i18next'
const ChatBox = () => {
  const { t } = useTranslation()
  const messagesEndRef = useRef(null)
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [chat, setChat] = useState({
    name: 'Support',
    avatar: '/images/avatar.png'
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim()) return

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      fromMe: true
    }

    setMessages((prev) => [...prev, newMsg])
    setNewMessage('')
  }

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('chat')} />
      <div className="h-[80vh] flex flex-col w-full border-l bg-white border border-[#E9E9E9] rounded-[12px]">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div>
            <h3 className="font-semibold text-gray-900">{chat?.name}</h3>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>
        <div className="h-[60vh] flex-1 overflow-y-auto custom-scroll p-4 space-y-6 bg-[#F9F9F9]">
          <div className="mb-4 text-xs text-center text-gray-400">Сегодня</div>

          {messages?.map((msg) =>
            msg.fromMe ? (
              <div key={msg.id} className="flex justify-end">
                <div className="flex items-end gap-3 max-w-[75%]">
                  <div className="p-3 text-sm text-gray-800 bg-white shadow rounded-xl">{msg.text}</div>
                  <Image src={chat.avatar} alt="avatar" width={40} height={40} className="bg-black rounded-full" />
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex items-start gap-3 max-w-[75%]">
                <Image src={chat.avatar} alt="avatar" width={40} height={40} className="bg-black rounded-full" />
                <div className="p-3 text-sm text-gray-800 bg-white shadow rounded-xl">{msg.text}</div>
              </div>
            )
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center gap-3 p-4 bg-white border-t">
          <input
            type="text"
            placeholder="Введите сообщение"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-3 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button color="primary" onPress={handleSend} isIconOnly className="">
            <IoMdSend />
          </Button>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default ChatBox
