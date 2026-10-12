// Sayt statistikasi uchun sahifa ko'rishlarni backendga yuboradi.
// Tashrifchi ID — qurilma identifikatori (iq-device-id), sessiya — 30 daqiqa faolsizlikkacha.
import { config } from '@/config'
import { URLS } from '@/constants/url'
import { getDeviceId } from './device'

const SESSION_KEY = 'iq-visit-session'
const SESSION_TTL = 30 * 60 * 1000
const IGNORED_HOSTS = ['localhost', '127.0.0.1']

const makeId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`

// { id, isNew } — sessiya 30 daqiqa faolsizlikdan keyin yangilanadi
const touchSession = () => {
  const now = Date.now()
  try {
    const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
    if (saved?.id && now - saved.last < SESSION_TTL) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ id: saved.id, last: now }))
      return { id: saved.id, isNew: false }
    }
    const id = makeId()
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id, last: now }))
    return { id, isNew: true }
  } catch {
    return { id: makeId(), isNew: true }
  }
}

export const trackPageView = (path, accessToken) => {
  if (typeof window === 'undefined' || IGNORED_HOSTS.includes(window.location.hostname)) return

  const visitorId = getDeviceId()
  if (!visitorId) return
  const session = touchSession()
  const params = new URLSearchParams(window.location.search)

  const headers = { 'Content-Type': 'application/json' }
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`

  fetch(`${config.API_URL}${URLS.siteVisitTrack}`, {
    method: 'POST',
    keepalive: true,
    headers,
    body: JSON.stringify({
      visitor_id: visitorId,
      session_id: session.id,
      is_entry: session.isNew,
      path,
      referrer: session.isNew ? document.referrer : '',
      utm_source: session.isNew ? params.get('utm_source') || '' : ''
    })
  }).catch(() => {})
}
