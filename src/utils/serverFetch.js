/**
 * Serverdan (Next.js API route / NextAuth) backend'ga so'rov — ulanish xatosida bir marta qayta urinadi.
 *
 * Node'ning fetch'i (undici) ba'zan birinchi so'rovda "fetch failed" beradi:
 *   - server yopib qo'ygan eski keep-alive ulanish qayta ishlatilganda (ECONNRESET / UND_ERR_SOCKET);
 *   - Windows'da DNS / IPv6 ulanishi birinchi marta kechikkanda (ETIMEDOUT, UND_ERR_CONNECT_TIMEOUT).
 * Bunday holatda so'rov backend'ga yetib bormagan bo'ladi — qayta yuborish xavfsiz.
 * Javob kelgan (masalan 400/401) so'rovlar qayta yuborilmaydi.
 */
const RETRYABLE_CODES = new Set([
  'ECONNRESET',
  'ECONNREFUSED',
  'ETIMEDOUT',
  'EPIPE',
  'EAI_AGAIN',
  'ENETUNREACH',
  'EHOSTUNREACH',
  'UND_ERR_SOCKET',
  'UND_ERR_CONNECT_TIMEOUT',
  'UND_ERR_CLOSED'
])

const errorCode = (error) => error?.cause?.code || error?.cause?.errors?.[0]?.code || error?.code || ''

const isNetworkError = (error) =>
  error instanceof TypeError && (error.message === 'fetch failed' || RETRYABLE_CODES.has(errorCode(error)))

export async function serverFetch(url, options = {}, { retries = 1, retryDelayMs = 300 } = {}) {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await fetch(url, options)
    } catch (error) {
      const code = errorCode(error)
      // Haqiqiy sabab "fetch failed" ichida (error.cause) yashiringan — konsolda ko'rinsin
      console.warn(`[serverFetch] ${url} — ${error.message}${code ? ` (${code})` : ''}, urinish ${attempt + 1}`)
      if (attempt >= retries || !isNetworkError(error)) {
        // Foydalanuvchiga tushunarli xabar
        const friendly = new Error('Server bilan aloqa uzildi. Qaytadan urinib ko‘ring.')
        friendly.cause = error
        throw friendly
      }
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs))
    }
  }
}

export default serverFetch
