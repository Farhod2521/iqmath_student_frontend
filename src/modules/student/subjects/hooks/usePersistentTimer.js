import { useCallback, useEffect, useState } from 'react'

const PREFIX = 'iq-timer:'
// Juda eski (masalan, kecha ochib qoldirilgan) test vaqti davom ettirilmaydi
const MAX_AGE_MS = 6 * 60 * 60 * 1000

const readStart = (key) => {
  try {
    const value = JSON.parse(sessionStorage.getItem(PREFIX + key))
    if (value?.start && Date.now() - value.start < MAX_AGE_MS) return value.start
  } catch {
    // storage yopiq yoki buzilgan — yangidan boshlanadi
  }
  return null
}

const writeStart = (key, start) => {
  try {
    sessionStorage.setItem(PREFIX + key, JSON.stringify({ start }))
  } catch {
    // storage yopiq bo'lsa vaqt faqat xotirada yuradi
  }
}

const removeStart = (key) => {
  try {
    sessionStorage.removeItem(PREFIX + key)
  } catch {
    // e'tiborsiz
  }
}

/**
 * Test uchun sarflangan vaqt (soniya). Boshlanish vaqti sessionStorage da saqlanadi,
 * shuning uchun sahifa yangilansa ham vaqt 0 dan boshlanmaydi.
 *
 * - key: test identifikatori (masalan, `diag-13-1`); o'zgarsa — boshqa taymer
 * - running: false bo'lsa ekrandagi qiymat yangilanmaydi
 * - finish(): vaqtni to'xtatadi, saqlangan boshlanishni o'chiradi va soniyani qaytaradi
 * - reset(): yangi urinish — vaqt 0 dan
 */
export function usePersistentTimer(key, running = true) {
  const [start, setStart] = useState(null)
  const [frozen, setFrozen] = useState(null)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!key) return
    let saved = readStart(key)
    if (!saved) {
      saved = Date.now()
      writeStart(key, saved)
    }
    setStart(saved)
    setNow(Date.now())
    setFrozen(null)
  }, [key])

  useEffect(() => {
    if (!running || frozen !== null || !start) return undefined
    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [running, frozen, start])

  const live = start ? Math.max(0, Math.floor((now - start) / 1000)) : 0
  const elapsed = frozen ?? live

  const finish = useCallback(() => {
    const seconds = start ? Math.max(0, Math.floor((Date.now() - start) / 1000)) : 0
    setFrozen(seconds)
    if (key) removeStart(key)
    return seconds
  }, [start, key])

  const reset = useCallback(() => {
    const fresh = Date.now()
    if (key) writeStart(key, fresh)
    setStart(fresh)
    setNow(fresh)
    setFrozen(null)
  }, [key])

  return { elapsed, finish, reset }
}
