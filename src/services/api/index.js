import axios from 'axios'
import { config } from '../../config/index'
import { signOut, getSession } from 'next-auth/react'
import { useUserStore } from '@/store/userStore'
import { useAuthTabStore } from '@/store'
import { DEVICE_ID_KEY } from '@/shared/utils/device'
import { exitImpersonation } from '@/components/ImpersonationBar'

const request = axios.create({
  baseURL: config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// Helper function to clear user data
const clearUserData = () => {
  if (typeof window === 'undefined') return

  const { setUser, setRole } = useUserStore.getState()
  const { clearCredentials } = useAuthTabStore.getState()

  setUser(null)
  setRole(null)
  clearCredentials()

  // Qurilma identifikatori saqlanadi — aks holda keyingi kirish yangi qurilma deb hisoblanadi
  const deviceId = localStorage.getItem(DEVICE_ID_KEY)
  localStorage.clear()
  if (deviceId) localStorage.setItem(DEVICE_ID_KEY, deviceId)
  sessionStorage.clear()
}

/**
 * Mentor "O'quvchi sifatida kirish" rejimi: o'quvchi tokeni sessionStorage'da (access_token),
 * mentorniki esa old_token'da turadi. Bu rejimda barcha so'rovlar o'quvchi nomidan ketishi kerak —
 * aks holda backend mentorni ko'radi (boblar 100%, mavzular ballsiz).
 */
const getImpersonationToken = () => {
  if (typeof window === 'undefined') return null
  try {
    return sessionStorage.getItem('old_token') ? sessionStorage.getItem('access_token') : null
  } catch {
    return null
  }
}

// O'quvchi tokeni (30 daqiqa) tugasa — mentor tizimdan chiqarilmaydi, o'z sahifasiga qaytariladi
const endImpersonation = exitImpersonation

request.interceptors.request.use(
  async (axiosConfig) => {
    const impersonationToken = getImpersonationToken()
    if (impersonationToken) {
      axiosConfig.headers.Authorization = `Bearer ${impersonationToken}`
      return axiosConfig
    }
    const session = await getSession()
    if (session?.accessToken) {
      axiosConfig.headers.Authorization = `Bearer ${session.accessToken}`
    }
    return axiosConfig
  },
  (error) => Promise.reject(error)
)

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status, config: originalRequest } = error?.response || {}

    // O'quvchi sifatida kirilgan: mentor tokeni bilan qayta urinish ham, chiqarib yuborish ham kerak emas
    if (getImpersonationToken()) {
      if (status === 401) endImpersonation()
      return Promise.reject(error)
    }

    // Handle 401 - Unauthorized
    if (status === 401) {
      clearUserData()
      signOut({ callbackUrl: '/' })
      return Promise.reject(error)
    }

    // Handle 403 - Token refresh
    if (status === 403 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // refreshToken faqat serverda — yangilash Next API orqali
        const response = await axios.post('/api/auth/refresh')

        const { access } = response.data
        originalRequest.headers.Authorization = `Bearer ${access}`

        return request(originalRequest)
      } catch (refreshError) {
        if (refreshError?.response?.status === 401) {
          clearUserData()
          signOut({ callbackUrl: '/' })
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export { request }
export const apiService = request
