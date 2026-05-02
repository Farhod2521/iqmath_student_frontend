import { useEffect } from 'react'

const TawkChat = () => {
  useEffect(() => {
    // if (window.Tawk_API) return // already loaded bo‘lsa qayta qo‘shma
    if (document.getElementById('tawk-script')) return

    const s1 = document.createElement('script')
    s1.src = 'https://embed.tawk.to/67c180dad29dc8190da4dc1e/1il5tulsp'
    s1.async = true
    s1.charset = 'UTF-8'
    s1.setAttribute('crossorigin', '*')

    document.body.appendChild(s1)

    return () => {
      // scriptni o‘chirish
      document.body.removeChild(s1)

      // iframe ni tozalash
      document.querySelectorAll('iframe').forEach((el) => el.remove())

      // global objectni tozalash
      if (window.Tawk_API) {
        delete window.Tawk_API
      }
    }
  }, [])

  return null
}

export default TawkChat
