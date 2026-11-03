import { useEffect, useRef, useState } from 'react'

/**
 * Skrinshotdan himoya (brauzerda to'liq taqiqlab bo'lmaydi — faqat qiyinlashtiradi).
 * Quyidagi holatlarda `hidden` true bo'ladi — sahifa matnini xiralashtirish uchun:
 *  - PrintScreen bosilsa (clipboard ham tozalanadi);
 *  - Win+Shift+S (Windows "Ножницы") yoki Cmd+Shift+3/4/5 (Mac) bosilganda;
 *  - oyna fokusdan chiqsa yoki boshqa vkladkaga o'tilsa (skrinshot dasturi ochilganda ham shunday bo'ladi).
 */
const useScreenshotGuard = (enabled = true) => {
  const [hidden, setHidden] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (!enabled) return undefined

    const hideFor = (ms) => {
      setHidden(true)
      clearTimeout(timer.current)
      if (ms) timer.current = setTimeout(() => setHidden(false), ms)
    }

    const onKey = (e) => {
      if (e.key === 'PrintScreen') {
        hideFor(1500)
        // Olingan skrinshot o'rniga clipboardga bo'sh matn yoziladi (brauzer ruxsat bersa)
        navigator.clipboard?.writeText('').catch(() => {})
        return
      }
      // Win+Shift+S / Cmd+Shift+3/4/5 — tugmalar bosilishi bilan, skrinshot olinishidan oldin
      if (e.shiftKey && e.metaKey) hideFor(3000)
    }
    const onBlur = () => hideFor(0)
    const onFocus = () => {
      clearTimeout(timer.current)
      setHidden(false)
    }
    const onVisibility = () => (document.hidden ? onBlur() : onFocus())

    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKey)
    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      clearTimeout(timer.current)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKey)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [enabled])

  return hidden
}

export default useScreenshotGuard
