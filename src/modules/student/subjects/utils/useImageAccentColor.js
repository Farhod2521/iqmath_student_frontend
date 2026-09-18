import { useEffect, useState } from 'react'

// Rasm URL bo'yicha keshlangan aksent ranglar — bir xil rasm bir necha marta
// chizilganda (masalan, uz/ru til almashtirilganda ham) qayta hisoblanmasin.
const colorCache = new Map()

function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      default:
        h = (r - g) / d + 4
    }
    h /= 6
  }

  return [h, s, l]
}

function hslToHex(h, s, l) {
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  let r
  let g
  let b
  if (s === 0) {
    r = g = b = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  const toHex = (v) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// Rasmning "imzo rangi"ni topadi — deyarli oq/qora piksellarni e'tiborsiz
// qoldirib, eng to'yingan piksellarga ko'proq og'irlik beradi. Natija
// tugma/nishon sifatida ishlatish uchun to'yinganlik/yorqinlikka
// moslashtiriladi (juda xira yoki juda och bo'lib qolmasligi uchun).
function extractAccentColor(img) {
  const canvas = document.createElement('canvas')
  const size = 24
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, size, size)

  const { data } = ctx.getImageData(0, 0, size, size)

  let rSum = 0
  let gSum = 0
  let bSum = 0
  let weightSum = 0

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]
    if (a < 200) continue

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const lightness = (max + min) / 2 / 255
    if (lightness > 0.9 || lightness < 0.08) continue

    const [, s] = rgbToHsl(r, g, b)
    const weight = s + 0.05
    rSum += r * weight
    gSum += g * weight
    bSum += b * weight
    weightSum += weight
  }

  if (weightSum < 1) return null

  const [h] = rgbToHsl(rSum / weightSum, gSum / weightSum, bSum / weightSum)
  // Tugma sifatida har doim yorqin va o'qilishi oson bo'lishi uchun
  // to'yinganlik/yorqinlikni belgilangan oraliqqa tortamiz.
  return hslToHex(h, 0.62, 0.5)
}

/**
 * Berilgan rasmning o'ziga xos rangini (dominant/imzo rangini) qaytaradi.
 * Rasm hali yuklanmagan yoki canvas'dan o'qib bo'lmasa (masalan, CORS
 * cheklovi tufayli), `fallback` rang qaytariladi — hech qachon ilovani
 * buzmaydi, faqat ranglar mosligi yaxshilanadi.
 */
export function useImageAccentColor(imageUrl, fallback) {
  const [color, setColor] = useState(() => colorCache.get(imageUrl) || fallback)

  useEffect(() => {
    if (!imageUrl) return undefined

    if (colorCache.has(imageUrl)) {
      setColor(colorCache.get(imageUrl))
      return undefined
    }

    let cancelled = false
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.src = imageUrl

    img.onload = () => {
      if (cancelled) return
      try {
        const extracted = extractAccentColor(img)
        if (extracted) {
          colorCache.set(imageUrl, extracted)
          setColor(extracted)
        }
      } catch {
        // CORS yoki boshqa canvas xatosi — standart rangda qolaveramiz
      }
    }
    img.onerror = () => {}

    return () => {
      cancelled = true
    }
  }, [imageUrl])

  return color || fallback
}
