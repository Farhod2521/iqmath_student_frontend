import axios from 'axios'
import { config } from '../../config/index'
import { signOut, getSession } from 'next-auth/react'
import { URLS } from '../../constants/url'

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
    // Avval sessionStorage'dan access_token olib ko'ramiz
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      // Agar yo'q bo'lsa, NextAuth sessionidan olamiz
      const session = await getSession();
      if (session?.accessToken) {
        axiosConfig.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return axiosConfig;
  },
  (error) => Promise.reject(error)
)

request.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const { status, config: originalRequest } = error?.response || {}
    // Agar 401 bo'lsa, refresh token ham eskirgan, sign out qilamiz
    if (status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.clear()
        sessionStorage.clear()
      }
      signOut({ callbackUrl: '/' })
      return Promise.reject(error)
    }
    // Agar 403 bo'lsa, access token eskirgan, refresh token orqali yangilashga harakat qilamiz
    if (status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        // Refresh tokenni NextAuth sessionidan olamiz
        const session = await getSession()
        const refreshToken = session?.refreshToken
        if (!refreshToken) throw new Error('No refresh token')
        const res = await axios.post(config.API_URL + URLS.refreshToken, {
          refresh: refreshToken
        })
        const { access, refresh } = res.data
        // Tokenlarni yangilash: access token sessionStorage'ga, refresh token NextAuth sessionida yangilanadi
        sessionStorage.setItem('access_token', access)
        // So'rovni yangi access token bilan qayta yuboramiz
        originalRequest.headers['Authorization'] = `Bearer ${access}`
        return request(originalRequest)
      } catch (refreshError) {
        // Agar refresh ham eskirgan bo'lsa (401), sign out qilamiz
        if (refreshError?.response?.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.clear()
            sessionStorage.clear()
          }
          signOut({ callbackUrl: '/' })
        }
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export { request }
export const apiService = request;
