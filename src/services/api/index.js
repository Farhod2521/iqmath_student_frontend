import axios from 'axios'
import { config } from '../../config/index'
import { signOut, getSession } from 'next-auth/react'
import { URLS } from '../../constants/url'
import { useUserStore } from '@/store/userStore'
import { useAuthTabStore } from '@/store'

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

  localStorage.clear()
  sessionStorage.clear()
}

request.interceptors.request.use(
  async (axiosConfig) => {
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
        const session = await getSession()
        if (!session?.refreshToken) {
          throw new Error('No refresh token')
        }

        const response = await axios.post(`${config.API_URL}${URLS.refreshToken}`, {
          refresh: session.refreshToken
        })

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
