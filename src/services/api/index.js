import axios from 'axios'
import { config } from '../../config/index'
import { signOut } from 'next-auth/react'

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

request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { status, data } = error?.response
    if (status === 401 || status === 403) {
      localStorage.clear()
      sessionStorage.clear()
      signOut({
        callbackUrl: '/'
      })
    }

    return Promise.reject(error)
  }
)

export { request }
