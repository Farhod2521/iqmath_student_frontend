import axios from 'axios'
import { config } from '../../config/index'
import { signOut, getSession, getCsrfToken } from 'next-auth/react'
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

const logout = () => {
  clearUserData()
  signOut({ callbackUrl: '/' })
}

/**
 * Access token (30 daqiqa) tugaganda yangilash. Bir vaqtda kelgan bir nechta 401 uchun bitta so'rov.
 * Yangi token NextAuth sessiyasiga ham yoziladi — keyingi so'rovlar eski token bilan ketmasligi uchun.
 * Natija: yangi access token; refresh token ham tugagan bo'lsa — null.
 */
let refreshPromise = null
const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const { data } = await axios.post('/api/auth/refresh')
        if (!data?.access) return null
        try {
          const csrfToken = await getCsrfToken()
          await axios.post('/api/auth/session', { csrfToken, data: { accessToken: data.access } })
        } catch {}
        return data.access
      } catch (refreshError) {
        // 401 — refresh token tugagan / qurilma o'chirilgan. Boshqa xato (tarmoq) — chiqarmaymiz
        if (refreshError?.response?.status === 401) return null
        throw refreshError
      }
    })().finally(() => {
      setTimeout(() => {
        refreshPromise = null
      }, 1000)
    })
  }
  return refreshPromise
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
    if (session?.error === 'RefreshTokenExpired') {
      logout()
      throw new axios.Cancel('Session expired')
    }
    // Qayta yuborilayotgan so'rovda yangilangan token allaqachon qo'yilgan
    if (session?.accessToken && !axiosConfig._retry) {
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

    // 401/403 — access token muddati tugagan: yangilab, so'rovni qayta yuboramiz.
    // Faqat refresh token ham yaroqsiz bo'lsagina tizimdan chiqariladi
    if ((status === 401 || status === 403) && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const access = await refreshAccessToken()
        if (!access) {
          logout()
          return Promise.reject(error)
        }
        originalRequest.headers.Authorization = `Bearer ${access}`
        return request(originalRequest)
      } catch (refreshError) {
        return Promise.reject(error)
      }
    }

    // Yangilangan token bilan ham 401 — sessiya haqiqatan yaroqsiz
    if (status === 401) logout()

    return Promise.reject(error)
  }
)

export { request }
export const apiService = request
