import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authSecret } from '@/config/authSecret'

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 46800 // 2 soat (7200 sekund)
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

          const response = await fetch(url, {
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
      }
      return token
    },
    async session({ session, token }) {
      if (Date.now() / 1000 > token.expiresAt) {
        return null // 2 soat o'tgach, sessiyani tozalash
      }
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
