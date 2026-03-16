import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { chatAPI } from '@/shared/services'

export const useChat = () => {
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  // State'lar
  const [activeChat, setActiveChat] = useState(null)
  const [isNewChatMode, setIsNewChatMode] = useState(false)
  const [replyingTo, setReplyingTo] = useState(null)

  // Foydalanuvchi roli
  const isStudent = ['student', 'superadmin'].includes(session?.role || '')
  const isAdmin = ['superadmin', 'teacher'].includes(session?.role || '')

  // Chatlar ro'yxati
  const {
    data: chats = [],
    isLoading: chatsLoading,
    refetch: refetchChats
  } = useQuery({
    queryKey: ['chats'],
    queryFn: chatAPI.getChats
  })

  // Xabarlar
  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ['messages', activeChat?.id],
    queryFn: () => chatAPI.getMessages(activeChat.id),
    enabled: !!activeChat && !activeChat?.is_temp
  })

  // 1. BIRINCHI XABAR YUBORISH
  const sendFirstMessage = useMutation({
    mutationFn: chatAPI.startNewChat,
    onSuccess: (data, variables) => {
      refetchChats().then(({ data: newChats }) => {
        const newChat = newChats?.find((chat) => chat.last_message === variables.text || chat.id === data?.chat_id)

        if (newChat) {
          setActiveChat(newChat)
          setIsNewChatMode(false)
          queryClient.invalidateQueries({ queryKey: ['messages', newChat.id] })
          toast.success('Xabar yuborildi')
        }
      })
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Xabar yuborilmadi')
    }
  })

  // 2. ODDIY XABAR YUBORISH
  const sendMessage = useMutation({
    mutationFn: chatAPI.sendMessage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['messages', variables.chatId] })
      refetchChats()
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Xabar yuborilmadi')
    }
  })

  // 3. Chatni yopish
  const closeChat = useMutation({
    mutationFn: (ratingData) => chatAPI.confirmClose(activeChat.id, ratingData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', activeChat?.id] })
      refetchChats()
      setActiveChat(null)
      setIsNewChatMode(false)
      toast.success('Suhbat yopildi')
    }
  })

  // 4. Chatni uzatish
  const transferChat = useMutation({
    mutationFn: (data) => chatAPI.transferChat(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', activeChat?.id] })
      refetchChats()
      toast.success('Suhbat uzatildi')
    }
  })

  // 5. Yopish so'rovi
  const requestClose = useMutation({
    mutationFn: (comment) => chatAPI.requestClose(activeChat.id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', activeChat?.id] })
      refetchChats()
      toast.success("Yopish so'rovi yuborildi")
    }
  })

  // Yangi chat boshlash
  const startNewChat = () => {
    setIsNewChatMode(true)
    setActiveChat({
      id: 'temp-' + Date.now(),
      is_temp: true,
      other_user_name: 'Yangi suhbat',
      other_user_id: null
    })
    setReplyingTo(null)
  }

  // Chat tanlash
  const selectChat = (chat) => {
    setActiveChat(chat)
    setIsNewChatMode(false)
    setReplyingTo(null)
  }

  // Xabar yuborish
  const handleSend = (text) => {
    if (!activeChat) return

    if (isNewChatMode) {
      sendFirstMessage.mutate({ text })
    } else {
      sendMessage.mutate({
        chatId: activeChat.id,
        text,
        reply_to: replyingTo?.id
      })
    }

    setReplyingTo(null)
  }

  // Javob berish
  const handleReply = (msg) => {
    setReplyingTo(msg)
  }

  // Javobni bekor qilish
  const cancelReply = () => {
    setReplyingTo(null)
  }

  return {
    // State'lar
    activeChat,
    chats,
    chatsLoading,
    messages,
    messagesLoading,
    isStudent,
    isAdmin,
    isNewChatMode,
    replyingTo,

    // Handler'lar
    selectChat,
    startNewChat,
    handleSend,
    handleReply,
    cancelReply,
    isSending: sendMessage.isPending || sendFirstMessage.isPending,

    // Mutation'lar
    closeChat: closeChat.mutate,
    transferChat: transferChat.mutate,
    requestClose: requestClose.mutate,

    // Refetch
    refetchChats
  }
}
