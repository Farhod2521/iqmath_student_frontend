// pages/metrika/google.js
import { useEffect } from 'react'

export default function GooglePage() {
  useEffect(() => {
    // GTag kodini ishga tushirish
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', 'G-691ESLP31P')
  }, [])

  return null
}
