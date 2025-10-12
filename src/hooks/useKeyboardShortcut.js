// useKeyboardShortcut.js
import { useEffect, useRef } from 'react'

/**
 * keys: string | string[]  -> "s" yoki ["Enter", "Escape"]
 * options:
 *  - ctrl, shift, alt, meta: boolean
 *  - mod: boolean (Mac=⌘, Windows/Linux=Ctrl) — platformaga qarab avtomatik
 *  - enabled: boolean (default true)
 *  - preventDefault: boolean (default true)
 *  - ignoreInput: boolean (default true) — input/textarea/contentEditable ichida ishlamasin
 */
export function useKeyboardShortcut(keys, callback, options = {}) {
  const {
    ctrl = false,
    shift = false,
    alt = false,
    meta = false,
    mod = false,
    enabled = true,
    preventDefault = true,
    ignoreInput = true
  } = options

  const cbRef = useRef(callback)
  cbRef.current = callback

  useEffect(() => {
    if (typeof window === 'undefined' || !enabled) return

    const isMac = typeof navigator !== 'undefined' ? /Mac|iPhone|iPad|iPod/.test(navigator.platform) : false

    const keyList = Array.isArray(keys) ? keys : [keys]
    const normalized = keyList.map((k) => String(k).toLowerCase())

    const handler = (event) => {
      // input/textarea/contentEditable ichida yozayotgan bo'lsa — e'tiborsiz qoldiramiz
      if (ignoreInput) {
        const el = event.target
        const tag = el?.tagName?.toLowerCase()
        const isEditable = tag === 'input' || tag === 'textarea' || tag === 'select' || el?.isContentEditable
        if (isEditable) return
      }

      // modifierlar
      const ctrlOk = ctrl ? event.ctrlKey : true
      const shiftOk = shift ? event.shiftKey : true
      const altOk = alt ? event.altKey : true
      const metaOk = meta ? event.metaKey : true

      // mod (Cmd on Mac, Ctrl elsewhere)
      const modOk = mod ? (isMac ? event.metaKey : event.ctrlKey) : true

      // kalit tugma(lar)
      const keyOk = normalized.includes(String(event.key).toLowerCase())

      if (ctrlOk && shiftOk && altOk && metaOk && modOk && keyOk) {
        if (preventDefault) event.preventDefault()
        cbRef.current?.(event)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [keys, ctrl, shift, alt, meta, mod, enabled, preventDefault, ignoreInput])
}
