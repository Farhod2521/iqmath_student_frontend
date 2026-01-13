import { Button } from '@heroui/react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import { HiDotsVertical } from 'react-icons/hi'
import { BsCheckAll, BsCheck, BsLink45Deg } from 'react-icons/bs'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { request } from '@/services/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import IndependentResultCard from './components/IndependentResult'
import ChatsList from './components/ChatsList'
import EmptyMessage from './components/EmptyMessage'

const chatAPI = {
  getChats: async () => {
    const { data } = await request.get('/api/v1/func_chat/chat/list/')
    return data
  },
  getMessages: async (chatId) => {
    const { data } = await request.get(`/api/v1/func_chat/chat/${chatId}/messages/`)
    return data
  },
  sendMessage: async ({ chatId, text, reply_to = null }) => {
    const payload = { text }
    if (reply_to) {
      payload.reply_to = reply_to
    }
    const { data } = await request.post(`/api/v1/func_chat/chat/${chatId}/send/`, payload)
    return data
  }
}

const formatDateTime = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleString('uz-UZ', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
}

const ChatBox = () => {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const messagesEndRef = useRef(null)
  const [activeChat, setActiveChat] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [showChatList, setShowChatList] = useState(true)
  const [replyingTo, setReplyingTo] = useState(null)

  /* === Chatlar === */
  const { data: chats = [], isLoading: chatsLoading } = useQuery({
    queryKey: ['chats'],
    queryFn: chatAPI.getChats
  })

  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ['messages', activeChat?.id],
    queryFn: () => chatAPI.getMessages(activeChat.id),
    enabled: !!activeChat
  })

  const sendMutation = useMutation({
    mutationFn: chatAPI.sendMessage,
    onSuccess: () => {
      setNewMessage('')
      setReplyingTo(null)
      queryClient.invalidateQueries(['messages', activeChat.id])
      queryClient.invalidateQueries(['chats'])
    }
  })

  const handleSend = () => {
    if (!newMessage.trim()) return

    // const newMsg = {
    //   id: Date.now(),
    //   text: newMessage,
    //   fromMe: true
    // }

    // setMessages((prev) => [...prev, newMsg])
    // setNewMessage('')

    sendMutation.mutate({
      chatId: activeChat.id,
      text: newMessage,
      reply_to: replyingTo?.id
    })
  }

  const handleReply = (msg) => {
    setReplyingTo(msg)
  }

  const cancelReply = () => {
    setReplyingTo(null)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const extractUrl = (text) => {
    if (!text) return null
    const match = text.match(/https?:\/\/[^\s]+/)
    return match ? match[0] : null
  }

  const removeUrlFromText = (text) => {
    if (!text || typeof text !== 'string') return text
    return text.replace(/https?:\/\/[^\s]+/g, '').trim()
  }

  return (
    <LayoutAdmin title="Chat">
      <div className="h-[85vh] flex gap-1 bg-white rounded-2xl  overflow-hidden">
        {/* ================= CHAT LIST ================= */}
        <div
          className={`${
            showChatList ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 absolute md:relative w-full md:w-[380px] h-full border-r border-gray-200 flex flex-col bg-white transition-transform duration-300 z-10`}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">{t('messages')}</h2>
          </div>

          {/* Chat List */}
          <ChatsList
            chats={chats}
            chatsLoading={chatsLoading}
            setActiveChat={setActiveChat}
            setShowChatList={setShowChatList}
            cancelReply={cancelReply}
            activeChat={activeChat}
          />
        </div>

        {/* ================= CHAT BOX ================= */}
        <div className="flex flex-col flex-1 bg-gray-50">
          {activeChat ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-200 md:px-6">
                <button
                  onClick={() => setShowChatList(true)}
                  className="p-2 mr-2 transition-colors rounded-full md:hidden hover:bg-gray-100"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="flex items-center justify-center w-10 h-10 font-semibold text-white rounded-full shadow-md md:w-12 md:h-12text-lg bg-gradient-to-br from-blue-400 to-purple-500">
                      {activeChat.other_user_name?.charAt(0) || '?'}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-800 md:text-lg">{activeChat.other_user_name}</h3>
                    {/* <p className="flex items-center gap-1 text-sm text-green-500">
                      {isUserOnline(activeChat) ? (
                        <>
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          Onlayn
                        </>
                      ) : (
                        <span className="text-gray-500">Oflayn</span>
                      )}
                    </p> */}
                  </div>
                </div>
                {/* <button className="p-2 transition-colors rounded-full hover:bg-gray-100">
                  <HiDotsVertical className="text-xl text-gray-600" />
                </button> */}
              </div>

              {/* Messages */}
              <div className="flex-1 p-3 space-y-4 overflow-y-auto md:p-6">
                {messagesLoading && (
                  <p className="text-sm text-center text-gray-400">
                    {t('messages')} {t('loading')}
                  </p>
                )}

                {messages?.messages?.map((msg, index) => {
                  const isMe = msg.sender_id !== activeChat.other_user_id
                  const showAvatar =
                    !isMe && (index === 0 || messages.messages[index - 1].sender_id === activeChat.other_user_id)
                  const showName = !isMe && showAvatar
                  const extractedUrl = extractUrl(msg?.url) || extractUrl(msg?.text)
                  const cleanText = removeUrlFromText(msg.text)
                  return isMe ? (
                    <div key={msg.id} className="flex justify-end">
                      <div className="max-w-[70%] group cursor-pointer" onDoubleClick={() => handleReply(msg)}>
                        {msg.reply_to_text && (
                          <div className="p-3 mb-2 ml-4 border-l-4 border-blue-400 rounded-lg bg-white/50">
                            {msg.reply_to_sender && (
                              <p className="mb-1 text-xs font-semibold text-blue-700">{msg.reply_to_sender}</p>
                            )}
                            <p className="text-sm text-gray-600">{msg.reply_to_text}</p>
                          </div>
                        )}
                        <div className="relative">
                          <div className="p-4 text-white rounded-tr-sm shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{cleanText}</p>
                            {extractedUrl && (
                              <div className="flex items-center justify-start gap-2 mt-1">
                                <span className="text-[12px]">Natija havolada:</span>
                                <BsLink45Deg
                                  size={18}
                                  onClick={() => window.open(extractedUrl, '_blank')}
                                  className="text-sm text-gray-200"
                                  title="Havola mavjud"
                                />
                              </div>
                            )}
                            <div className="flex items-center justify-end gap-1 mt-2">
                              <span className="text-xs text-blue-100">{formatTime(msg.created_at)}</span>
                              {msg.is_read ? (
                                <BsCheckAll className="text-sm text-blue-100" />
                              ) : (
                                <BsCheck className="text-sm text-blue-100" />
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleReply(msg)}
                            className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
                            title="Javob berish"
                          >
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={msg.id} className="flex gap-3">
                      {/* <div className="flex-shrink-0 w-8 h-8">
                        {showAvatar && (
                          <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-white rounded-full shadow-md bg-gradient-to-br from-purple-400 to-pink-500">
                            {msg.sender_name?.charAt(0) || activeChat.other_user_name?.charAt(0) || '?'}
                          </div>
                        )}
                      </div> */}
                      <div className="max-w-[70%] group cursor-pointer" onDoubleClick={() => handleReply(msg)}>
                        {/* {showName && (
                          <p className="mb-1 ml-1 text-xs font-medium text-gray-600">
                            {msg.sender_name || activeChat.other_user_name}
                          </p>
                        )} */}
                        {msg.reply_to_text && (
                          <div className="p-3 mb-2 bg-gray-100 border-l-4 border-gray-400 rounded-lg">
                            {msg.reply_to_sender && (
                              <p className="mb-1 text-xs font-semibold text-gray-700">{msg.reply_to_sender}</p>
                            )}
                            <p className="text-sm text-gray-600">{msg.reply_to_text}</p>
                          </div>
                        )}
                        <div className="relative">
                          <div className="p-4 bg-white border border-gray-100 rounded-tl-sm shadow-md rounded-2xl">
                            <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">{cleanText}</p>

                            {msg?.independent_data && <IndependentResultCard data={msg?.independent_data} />}

                            {/* <span className="block mt-2 text-xs text-gray-400">{formatTime(msg.created_at)}</span> */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1">
                                {extractedUrl && (
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-[12px]">Natija havolada:</span>
                                    <BsLink45Deg
                                      size={18}
                                      onClick={() => window.open(extractedUrl, '_blank')}
                                      className="text-sm text-gray-400"
                                      title="Havola mavjud"
                                    />
                                  </div>
                                )}
                              </div>
                              <span className="text-xs text-gray-400">{formatTime(msg.created_at)}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleReply(msg)}
                            className="absolute -rotate-180 -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
                            title="Javob berish"
                          >
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-t border-gray-200 md:p-4">
                {/* Reply Preview */}
                {replyingTo && (
                  <div className="flex items-start justify-between p-3 mb-3 border-l-4 border-blue-500 rounded-lg bg-blue-50">
                    <div className="flex-1 min-w-0">
                      <p className="mb-1 text-xs font-semibold text-blue-700">
                        Javob berilmoqda: {replyingTo.sender_name || activeChat.other_user_name}
                      </p>
                      <p className="text-sm text-gray-600 truncate">{replyingTo.text}</p>
                    </div>
                    <button
                      onClick={cancelReply}
                      className="flex-shrink-0 p-1 ml-2 transition-colors rounded-full hover:bg-blue-100"
                    >
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                <div className="flex items-end gap-2 md:gap-3">
                  <div className="relative flex-1">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSend()
                        }
                      }}
                      placeholder="Xabar yozing..."
                      rows="1"
                      className="w-full px-4 py-3 pr-12 text-sm transition-all border-2 border-gray-200 resize-none md:py-4 md:px-6 rounded-2xl focus:outline-none focus:border-blue-500"
                      style={{ minHeight: '56px', maxHeight: '120px' }}
                    />
                  </div>
                  <Button
                    color="primary"
                    isIconOnly
                    onPress={handleSend}
                    isLoading={sendMutation.isPending}
                    isDisabled={!newMessage.trim()}
                    className="w-12 h-12 text-white transition-all md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl hover:shadow-lg disabled:opacity-50 hover:scale-105 active:scale-95"
                  >
                    <IoMdSend className="text-lg md:text-xl" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <EmptyMessage />
          )}
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default ChatBox
