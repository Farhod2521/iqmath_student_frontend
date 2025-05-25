import axios from 'axios'
import { config } from '../../config/index'
import { signOut, getSession } from 'next-auth/react'

const request = axios.create({
  baseURL: config.API_URL,
  params: {},
  headers: {
    common: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }
  }
})

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
  (response) => {
    return response
  },
  (error) => {
    const { status } = error?.response || {}

    if (status === 401 || status === 403) {
      if (typeof window !== 'undefined') {
        localStorage.clear()
        sessionStorage.clear()
      }
      signOut({ callbackUrl: '/' })
    }
    return Promise.reject(error)
  }
)

export { request }
