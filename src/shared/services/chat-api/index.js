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

  // O'qituvchi o'quvchi sahifasidan to'g'ridan-to'g'ri chat ochadi (bor bo'lsa — o'shani qaytaradi)
  createDirect: async (studentId) =>
    (await request.post('/api/v1/func_chat/chat/create-direct/', { student_id: studentId })).data,

  // Rasm / fayl yuborish (multipart)
  sendFile: async ({ chatId, file, text }) => {
    const form = new FormData()
    form.append('file', file)
    if (text) form.append('text', text)
    return (
      await request.post(`/api/v1/func_chat/chat/${chatId}/send/`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    ).data
  },

  // *** YANGI CHAT BOSHLASH *** (TO'G'RILANGAN)
  startNewChat: async ({ text }) =>
    (
      await request.post('/api/v1/func_chat/chat/student-support/send/', {
        text
      })
    ).data
}
