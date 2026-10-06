import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

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
            current_token
          } = credentials
          const formData = new FormData()
          let url = 'https://api.iqmath.uz/api/v1/auth/student/login/'
          const headers = { Accept: 'application/json' }

          if (switch_child_id) {
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

          // Get password from API response if using sms_code
          const userPassword = sms_code ? data.password : password

          return {
            token: data.access_token,
            refreshToken: data.refresh_token,
            phone: data.phone || phone || '',
            login: data.login || phone || '', // Assuming `login` exists in response
            password: userPassword, // Use password from API response or credentials
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
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token
        token.refreshToken = user.refreshToken
        token.phone = user.phone
        token.login = user.login
        token.password = user.password
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
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.phone = token.phone
      session.login = token.login
      session.password = token.password
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
  secret: process.env.NEXTAUTH_SECRET || '0bb43cd9f73216be2a5676af4f6b4de5efdcb40443e84b962c6b07267a108f7c',
  pages: {
    signIn: '/'
  }
})
