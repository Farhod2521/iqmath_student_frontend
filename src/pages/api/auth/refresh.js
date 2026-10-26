import { getToken } from 'next-auth/jwt'
import { authSecret } from '@/config/authSecret'
import { config } from '@/config'
import { URLS } from '@/constants/url'

// Access tokenni yangilash. refreshToken brauzerga chiqmaydi — NextAuth cookie'sidan serverda o'qiladi
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end()
  }

  const token = await getToken({ req, secret: authSecret })
  if (!token?.refreshToken) {
    return res.status(401).json({ detail: 'No refresh token' })
  }

  try {
    const response = await fetch(`${config.API_URL}${URLS.refreshToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ refresh: token.refreshToken })
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok || !data?.access) {
      return res.status(response.status === 401 ? 401 : 400).json({ detail: 'Refresh failed' })
    }
    return res.status(200).json({ access: data.access })
  } catch (error) {
    return res.status(502).json({ detail: 'Refresh failed' })
  }
}
