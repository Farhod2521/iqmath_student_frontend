import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { chatAPI } from '@/shared/services'
import { useTranslation } from 'react-i18next'
import { useChatSocket } from './useChatSocket'

export const useChat = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  const [activeChat, setActiveChat] = useState(null)
  const [isNewChatMode, setIsNewChatMode] = useState(false)
  const [replyingTo, setReplyingTo] = useState(null)
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)
  const [transferTeacherId, setTransferTeacherId] = useState('')
  const [transferReason, setTransferReason] = useState('')
  const [liveMessages, setLiveMessages] = useState([])

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

  const socketRef = useChatSocket({
    chatId: messages?.conversation_id,
    token: session?.accessToken,
    onMessage: (newMessage) => {
      setLiveMessages((prev) => [...prev, newMessage])
    }
  })

  // O'qituvchilar ro'yxati - TransferModal uchun
  const {
    data: teachers = [],
    isLoading: teachersLoading,
    refetch: refetchTeachers
  } = useQuery({
    queryKey: ['teachers-for-transfer'],
    queryFn: chatAPI.getTeachersForTransfer,
    enabled: isTransferModalOpen // Faqat modal ochilganda fetch qilish
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
      toast.success(t('chatBox.confirm_close.chat_closed_successfully'))
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || t('chatBox.confirm_close.error_closing_chat'))
    }
  })

  // 4. Chatni uzatish
  const transferChat = useMutation({
    mutationFn: (data) => chatAPI.transferChat(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', activeChat?.id] })
      refetchChats()
      closeTransferModal()
      toast.success(t('chatBox.chat_transfer.chat_transferred_successfully'))
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || t('chatBox.chat_transfer.error_transferring_chat'))
    }
  })

  // 5. Yopish so'rovi
  const requestClose = useMutation({
    mutationFn: (comment) => chatAPI.requestClose(activeChat.id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', activeChat?.id] })
      refetchChats()
      toast.success(t('close_request_sent'))
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || t('chatBox.request_close.error_requesting_close'))
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
  // const handleSend = (text) => {
  //   if (!activeChat) return

  //   if (isNewChatMode) {
  //     sendFirstMessage.mutate({ text })
  //   } else {
  //     sendMessage.mutate({
  //       chatId: activeChat.id,
  //       text,
  //       reply_to: replyingTo?.id
  //     })
  //   }

  //   setReplyingTo(null)
  // }

  const handleSend = (text) => {
    if (!activeChat) return

    if (isNewChatMode) {
      sendFirstMessage.mutate({ text })
    } else {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({
            text,
            reply_to: replyingTo?.id || null
          })
        )
      } else {
        console.warn('Socket yopiq')
      }
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

  // Transfer modalni ochish
  const openTransferModal = () => {
    setIsTransferModalOpen(true)
    refetchTeachers() // O'qituvchilarni qayta yuklash
  }

  // Transfer modalni yopish
  const closeTransferModal = () => {
    setIsTransferModalOpen(false)
    setTransferTeacherId('')
    setTransferReason('')
  }

  useEffect(() => {
    setLiveMessages([])
  }, [messages?.conversation_id])

  const allMessages = [...(messages?.messages || []), ...liveMessages]

  return {
    // State'lar
    activeChat,
    chats,
    chatsLoading,
    messages: { messages: allMessages },
    messagesLoading,
    isStudent,
    isAdmin,
    isNewChatMode,
    replyingTo,

    teachers,
    teachersLoading,
    isTransferModalOpen,
    transferTeacherId,
    transferReason,

    // Handler'lar
    selectChat,
    startNewChat,
    handleSend,
    handleReply,
    cancelReply,
    isSending: sendMessage.isPending || sendFirstMessage.isPending,

    openTransferModal,
    closeTransferModal,
    setTransferTeacherId,
    setTransferReason,

    // Mutation'lar
    closeChat: closeChat.mutate,
    transferChat: transferChat.mutate,
    requestClose: requestClose.mutate,

    // Refetch
    refetchChats
  }
}
