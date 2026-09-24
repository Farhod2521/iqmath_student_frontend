import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { request } from '@/services/api'
import { KEYS } from '@/constants/key'
import { apiErrorMessage } from './utils'

const METHODS = {
  post: (url, data) => request.post(url, data),
  put: (url, data) => request.put(url, data),
  patch: (url, data) => request.patch(url, data),
  // DELETE ba'zi endpointlarda body talab qiladi (masalan student_ids)
  delete: (url, data) => request.delete(url, data ? { data } : undefined)
}

const TUTOR_KEYS = [KEYS.tutorGroups, KEYS.tutorGroupDetail, KEYS.tutorMyStudents, KEYS.tutorGroupInvitations]

/**
 * Guruhlar uchun mutatsiya. Muvaffaqiyatda guruh/o'quvchi keshlarini yangilaydi
 * va backenddan kelgan aniq xato matnini ko'rsatadi.
 * invalidateKeys — yangilanadigan keshlar (default: tutor guruhlari; teacher o'z kalitlarini beradi).
 */
const useGroupMutation = ({ method = 'post', successMessage, errorMessage, onDone, invalidateKeys = TUTOR_KEYS }) => {
  const queryClient = useQueryClient()

  return useMutation(({ url, data }) => METHODS[method](url, data), {
    onSuccess: (response, variables) => {
      if (successMessage) toast.success(successMessage)

      invalidateKeys.forEach((key) => queryClient.invalidateQueries(key))

      if (onDone) onDone(response, variables)
    },
    onError: (error) => {
      toast.error(apiErrorMessage(error, errorMessage))
    }
  })
}

export default useGroupMutation
