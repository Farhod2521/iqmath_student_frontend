// Brauzer uchun doimiy qurilma identifikatori: backend shu bo'yicha qurilmani taniydi
// (2 ta qurilma cheklovi). Chiqishda (localStorage.clear) ham saqlab qolinadi.
export const DEVICE_ID_KEY = 'iq-device-id'

const makeId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0
    return (char === 'x' ? random : (random & 0x3) | 0x8).toString(16)
  })
}

export const getDeviceId = () => {
  if (typeof window === 'undefined') return ''
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY)
    if (!id) {
      id = makeId()
      localStorage.setItem(DEVICE_ID_KEY, id)
    }
    return id
  } catch {
    return ''
  }
}

/** Login so'roviga qo'shiladigan qurilma ma'lumotlari */
export const getDeviceCredentials = () => ({
  device_id: getDeviceId(),
  user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
})

/** next-auth xatosidan qurilma cheklovi ma'lumotini ajratib oladi */
export const DEVICE_LIMIT_PREFIX = 'DEVICE_LIMIT::'

export const parseDeviceLimitError = (message) => {
  if (!message || !String(message).startsWith(DEVICE_LIMIT_PREFIX)) return null
  try {
    return JSON.parse(String(message).slice(DEVICE_LIMIT_PREFIX.length))
  } catch {
    return null
  }
}
