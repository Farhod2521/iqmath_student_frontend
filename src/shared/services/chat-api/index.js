import { request } from '../../../services/api'

export const chatAPI = {
  getChats: async () => (await request.get('/api/v1/func_chat/chat/list/')).data,

  getMessages: async (chatId) => (await request.get(`/api/v1/func_chat/chat/${chatId}/messages/`)).data,

  sendMessage: async ({ chatId, text, reply_to }) =>
    (
      await request.post(`/api/v1/func_chat/chat/${chatId}/send/`, {
        text,
        ...(reply_to && { reply_to })
      })
    ).data,

  requestClose: async (chatId, comment) =>
    (await request.post(`/api/v1/func_chat/conversation/${chatId}/request-close/`, { comment })).data,

  confirmClose: async (chatId, ratingData) =>
    (await request.post(`/api/v1/func_chat/conversation/${chatId}/confirm-close/`, ratingData)).data,

  transferChat: async (data) => (await request.post('/api/v1/func_chat/conversation/transfer/', data)).data,

  getTeachersForTransfer: async () => (await request.get('/api/v1/func_chat/conversation/transfer/')).data,

  // *** YANGI CHAT BOSHLASH *** (TO'G'RILANGAN)
  startNewChat: async ({ text }) =>
    (
      await request.post('/api/v1/func_chat/chat/student-support/send/', {
        text
      })
    ).data
}
