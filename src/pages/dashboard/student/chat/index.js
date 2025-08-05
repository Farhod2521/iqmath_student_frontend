import { useState } from 'react'
import Image from 'next/image'
import { Card } from '@heroui/react'
import { Tabs, Tab } from '@heroui/react'
import { useTranslation } from 'react-i18next'
import LayoutAdmin from '@/layout/LayoutAdmin'
const Index = () => {
  const { t } = useTranslation()
  const chats = [
    {
      id: 1,
      name: 'Savlat Sultanov',
      message: 'Hey, check my design update last night...',
      time: 'Сегодня',
      avatar: '/images/avatar-profile.png'
    },
    {
      id: 2,
      name: 'Alex Johnson',
      message: "Let's schedule our meeting...",
      time: 'Вчера',
      avatar: '/images/avatar-profile.png'
    }
  ]

  const [activeTab, setActiveTab] = useState('all')
  const [selectedChat, setSelectedChat] = useState(chats[0])

  const [userMessages, setUserMessages] = useState({
    1: [{ id: 1, text: 'Salom Savlat!', fromMe: false, time: '22:00' }],
    2: [{ id: 1, text: 'Salom Alex!', fromMe: false, time: '22:05' }]
  })

  const handleChatClick = (chat) => {
    setSelectedChat(chat)
  }

  const handleSendMessage = (userId, messageText) => {
    if (!messageText.trim()) return

    const newMessage = {
      id: Date.now(),
      text: messageText,
      fromMe: true,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    setUserMessages((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), newMessage]
    }))
  }

  const MessageItem = ({ chat, onClick, isActive }) => (
    <div
      className={`flex items-start space-x-3 py-4 px-2 cursor-pointer rounded-lg transition duration-200 ease-in-out
        ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
      onClick={onClick}
    >
      <Image src={chat.avatar} alt="avatar" width={40} height={40} className="rounded-full object-cover bg-black" />
      <div className="truncate flex-1">
        <h4 className="font-semibold">{chat.name}</h4>
        <p className="text-sm text-gray-500 truncate">{chat.message}</p>
      </div>
      <div className="ml-auto text-xs text-gray-400 whitespace-nowrap">{chat.time}</div>
    </div>
  )

  const ChatBox = ({ chat, messages, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('')

    const handleSend = () => {
      if (!newMessage.trim()) return
      onSendMessage(newMessage)
      setNewMessage('')
    }

    return (
      <div className="h-[80vh] flex flex-col w-full border-l bg-white border border-[#E9E9E9] rounded-[12px]">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div>
            <h3 className="font-semibold text-gray-900">{chat?.name}</h3>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>
        <div className="h-[60vh] flex-1 overflow-y-auto custom-scroll p-4 space-y-6 bg-[#F9F9F9]">
          <div className="text-center text-xs text-gray-400 mb-4">Сегодня</div>

          {messages?.map((msg) =>
            msg.fromMe ? (
              <div key={msg.id} className="flex justify-end">
                <div className="flex items-end gap-3 max-w-[75%]">
                  <div className="bg-white p-3 rounded-xl shadow text-sm text-gray-800">{msg.text}</div>
                  <Image src={chat.avatar} alt="avatar" width={40} height={40} className="rounded-full bg-black" />
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex items-start gap-3 max-w-[75%]">
                <Image src={chat.avatar} alt="avatar" width={40} height={40} className="rounded-full bg-black" />
                <div className="bg-white p-3 rounded-xl shadow text-sm text-gray-800">{msg.text}</div>
              </div>
            )
          )}
        </div>

        <div className="border-t p-4 flex items-center gap-3 bg-white">
          <input
            type="text"
            placeholder="Введите сообщение"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-3 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSend}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  // headerTitle={"Чат"}
  return (
    <LayoutAdmin title={t('chat')}>
      <div className="flex gap-2">
        <Card className="border border-[#E9E9E9] rounded-[12px] py-[16px] px-[24px] w-[400px]">
          <h2>Сообщение</h2>
          <Tabs
            aria-label="Options"
            fullWidth
            className="mt-4 rounded-md"
            classNames={{
              tabList: '',
              cursor: 'bg-white',
              tab: '',
              tabContent: ''
            }}
          >
            <Tab key="all" title="Все">
              {chats.map((chat) => (
                <MessageItem
                  key={chat.id}
                  chat={chat}
                  onClick={() => handleChatClick(chat)}
                  isActive={selectedChat?.id === chat.id}
                />
              ))}
            </Tab>
            <Tab key="unread" title="Непрочитанные">
              {chats.slice(0, 1).map((chat) => (
                <MessageItem
                  key={chat.id}
                  chat={chat}
                  onClick={() => handleChatClick(chat)}
                  isActive={selectedChat?.id === chat.id}
                />
              ))}
            </Tab>
          </Tabs>
          {/* <div className="flex bg-[#f4f4f4] rounded-xl p-1 w-fit mt-[12px]">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition w-[150px]
                ${activeTab === 'all' ? 'bg-white shadow text-black' : 'text-gray-500'}`}
            >
              Все
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition w-[150px]
                ${activeTab === 'unread' ? 'bg-white shadow text-black' : 'text-gray-500'}`}
            >
              Непрочитанные
            </button>
          </div>

          <div className="h-[60vh] overflow-y-auto pr-2 mt-[16px] space-y-4 custom-scroll">
            {activeTab === 'all' && (
              <div>
                {chats.map((chat) => (
                  <MessageItem
                    key={chat.id}
                    chat={chat}
                    onClick={() => handleChatClick(chat)}
                    isActive={selectedChat?.id === chat.id}
                  />
                ))}
              </div>
            )}

            {activeTab === 'unread' && (
              <div>
                {chats.slice(0, 1).map((chat) => (
                  <MessageItem
                    key={chat.id}
                    chat={chat}
                    onClick={() => handleChatClick(chat)}
                    isActive={selectedChat?.id === chat.id}
                  />
                ))}
              </div>
            )}
          </div> */}
        </Card>

        <Card className="w-full">
          {selectedChat ? (
            <ChatBox
              chat={selectedChat}
              messages={userMessages[selectedChat.id] || []}
              onSendMessage={(msgText) => handleSendMessage(selectedChat.id, msgText)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">Выберите чат слева</div>
          )}
        </Card>
      </div>
    </LayoutAdmin>
  )
}

export default Index
