import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { chatAPI } from '@/shared/services'

export const useChat = (activeChat, setActiveChat) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const chatsQuery = useQuery({
    queryKey: ['chats'],
    queryFn: chatAPI.getChats
  })

  const messagesQuery = useQuery({
    queryKey: ['messages', activeChat?.id],
    queryFn: () => chatAPI.getMessages(activeChat.id),
    enabled: !!activeChat
  })

  const sendMutation = useMutation({
    mutationFn: chatAPI.sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries(['messages', activeChat.id])
      queryClient.invalidateQueries(['chats'])
    }
  })

  const closeMutation = useMutation({
    mutationFn: (data) => chatAPI.confirmClose(activeChat.id, data),
    onSuccess: () => {
      toast.success(t('chatBox.confirm_close.chat_closed_successfully'))
      queryClient.invalidateQueries(['chats'])
      setActiveChat(null)
    }
  })

  return {
    chatsQuery,
    messagesQuery,
    sendMutation,
    closeMutation
  }
}
