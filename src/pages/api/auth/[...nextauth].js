import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authSecret } from '@/config/authSecret'
import { serverFetch } from '@/utils/serverFetch'
import { config } from '@/config'
import { URLS } from '@/constants/url'

// Access token (backend) 30 daqiqa yashaydi, refresh token — 7 kun.
// Sessiya refresh token bilan bir xil yashaydi; access token muddati tugashiga oz qolganda
// jwt callback uni serverda o'zi yangilaydi — foydalanuvchi tizimdan chiqarib yuborilmaydi.
const SESSION_MAX_AGE = 7 * 24 * 60 * 60
const REFRESH_MARGIN_SECONDS = 120

// JWT ichidagi `exp` (sekund). Imzo tekshirilmaydi — faqat qachon yangilashni bilish uchun
const tokenExpiry = (jwt) => {
  try {
    const payload = JSON.parse(Buffer.from(String(jwt).split('.')[1], 'base64url').toString('utf8'))
    return typeof payload.exp === 'number' ? payload.exp : null
  } catch {
    return null
  }
}

async function refreshAccessToken(token) {
  try {
    const response = await serverFetch(`${config.API_URL}${URLS.refreshToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ refresh: token.refreshToken })
    })
    const data = await response.json().catch(() => ({}))
    if (response.ok && data?.access) {
      return {
        ...token,
        accessToken: data.access,
        // ROTATE_REFRESH_TOKENS yoqilsa — yangi refresh token ham saqlanadi
        refreshToken: data.refresh || token.refreshToken,
        error: null
      }
    }
    // Refresh token muddati tugagan yoki qurilma o'chirilgan — qayta kirish kerak
    if (response.status === 401 || response.status === 400) return { ...token, error: 'RefreshTokenExpired' }
    return token
  } catch {
    // Tarmoq xatosi — sessiyani o'chirmaymiz, keyingi so'rovda yana urinadi
    return token
  }
}

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: SESSION_MAX_AGE
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const {
            phone,
            password,
            sms_code = null,
            role,
            device_id,
            user_agent,
            replace_device_id,
            switch_child_id,
            return_to_parent,
            current_token,
            parent_qr_token
          } = credentials
          const formData = new FormData()
          let url = 'https://api.iqmath.uz/api/v1/auth/student/login/'
          const headers = { Accept: 'application/json' }

          if (parent_qr_token) {
            // Ota-ona farzandning QR kodi orqali kiradi (farzand avtomatik biriktiriladi)
            formData.append('token', parent_qr_token)
            formData.append('phone', phone)
            formData.append('password', password)
            url = 'https://api.iqmath.uz/api/v1/auth/parent-qr/login/'
          } else if (switch_child_id) {
            // Ota-ona farzand profiliga o'tadi (ota-ona tokeni bilan)
            url = `https://api.iqmath.uz/api/v1/auth/parent/children/${encodeURIComponent(switch_child_id)}/switch/`
            headers.Authorization = `Bearer ${current_token}`
          } else if (return_to_parent) {
            // Farzand profilidan ota-ona hisobiga qaytish (farzand tokeni bilan)
            url = 'https://api.iqmath.uz/api/v1/auth/child/return-to-parent/'
            headers.Authorization = `Bearer ${current_token}`
          } else if (sms_code) {
            formData.append('phone', phone)
            formData.append('sms_code', sms_code)
            url = 'https://api.iqmath.uz/api/v1/auth/student/register-verify-sms/'
          } else {
            formData.append('phone', phone)
            formData.append('password', password)
          }
          // Qurilma: brauzer identifikatori va haqiqiy User-Agent (so'rov serverdan ketadi)
          if (device_id) formData.append('device_id', device_id)
          if (user_agent) formData.append('user_agent', user_agent)
          if (replace_device_id) formData.append('replace_device_id', replace_device_id)

          const response = await serverFetch(url, {
            method: 'POST',
            headers,
            body: formData
          })

          const data = await response.json()

          // 2 ta qurilma chegarasi — frontend qurilmani tanlash oynasini ochadi
          if (response.status === 409 && data?.code === 'device_limit') {
            throw new Error(
              'DEVICE_LIMIT::' + JSON.stringify({ devices: data.devices, max_devices: data.max_devices })
            )
          }

          if (!response.ok) {
            throw new Error(data.message || data.detail || 'Login failed')
          }

          return {
            token: data.access_token,
            refreshToken: data.refresh_token,
            phone: data.phone || phone || '',
            login: data.login || phone || '', // Assuming `login` exists in response
            // Parol sessiyaga yozilmaydi. Faqat SMS bilan ro'yxatdan o'tganda server yaratgan parol
            // bir marta ko'rsatish uchun saqlanadi va ModalConfidentiality uni darhol o'chiradi
            initialPassword: sms_code ? data.password || null : null,
            id: data.id,
            role: data.role || 'student', // Role ni qo'shamiz, default student
            full_name: data.full_name,
            // Ota-ona farzand profiliga o'tgan bo'lsa — qaytish uchun
            actingParent: data.acting_parent || null
          }
        } catch (error) {
          console.error('Login Error:', error.message)
          throw new Error(error.message || 'Something went wrong')
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.clearInitialPassword) {
        delete token.initialPassword
      }
      // Brauzer (services/api) access tokenni yangilagach sessiyaga yozadi
      if (trigger === 'update' && session?.accessToken && typeof session.accessToken === 'string') {
        token.accessToken = session.accessToken
        token.error = null
      }
      if (user) {
        token.accessToken = user.token
        token.refreshToken = user.refreshToken
        token.phone = user.phone
        token.login = user.login
        token.initialPassword = user.initialPassword || null
        token.id = user.id
        token.role = user.role // Role ni JWT ga qo'shamiz
        token.full_name = user.full_name
        token.children = user.children // Parent uchun farzandlar ma'lumotlari
        token.actingParent = user.actingParent || null
        token.error = null
        return token
      }
      if (!token.accessToken || !token.refreshToken || token.error) return token
      const exp = tokenExpiry(token.accessToken)
      if (exp && exp - Date.now() / 1000 < REFRESH_MARGIN_SECONDS) {
        return refreshAccessToken(token)
      }
      return token
    },
    async session({ session, token }) {
      // Refresh token ham tugagan — brauzer qayta kirishga yo'naltiradi (services/api)
      if (token.error) session.error = token.error
      // refreshToken brauzerga berilmaydi — u faqat shifrlangan cookie ichida qoladi (/api/auth/refresh)
      session.accessToken = token.accessToken
      session.phone = token.phone
      session.login = token.login
      if (token.initialPassword) session.initialPassword = token.initialPassword
      session.id = token.id
      session.role = token.role // Role ni session ga qo'shamiz
      session.full_name = token.full_name
      session.children = token.children // Parent uchun farzandlar ma'lumotlari
      session.actingParent = token.actingParent || null
      return session
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl
    }
  },
  secret: authSecret,
  pages: {
    signIn: '/'
  }
})
