import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'

const PING_EVERY = 60_000

/**
 * Onlayn vaqtni hisoblash uchun: sayt ochiq va ko'rinib turganda daqiqada bir "ping" yuboradi.
 * Boshqa tabga o'tilsa yoki brauzer yig'ilsa yuborilmaydi — o'sha vaqt onlayn hisoblanmaydi.
 */
export default function OnlinePing() {
  const { data: session } = useSession()
  const token = session?.accessToken

  useEffect(() => {
    if (!token) return undefined
    const ping = () => {
      if (document.visibilityState !== 'visible') return
      request.post(URLS.onlinePing).catch(() => {})
    }
    ping()
    const timer = setInterval(ping, PING_EVERY)
    document.addEventListener('visibilitychange', ping)
    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', ping)
    }
  }, [token])

  return null
}
