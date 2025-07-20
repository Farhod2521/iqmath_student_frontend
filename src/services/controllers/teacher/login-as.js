import { request } from '@/services/api'

export const postLoginAsStudent = (id) => request.post(`/api/v1/func_teacher/teacher/login-as-student/${id}/`)
