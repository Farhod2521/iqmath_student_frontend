import Landing from '@/home/Landing'
import LayoutHome from '@/home/Layout'
import { ThemeSettings } from '@/home/theme/Theme'
import { useEffect } from 'react'
import TawkChat from './tawk'
import { useRouter } from 'next/router'

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const isDashboard = router.asPath.includes('/dashboard')

  useEffect(() => {
    if (!window.Tawk_API) return

    if (isDashboard) {
      window.Tawk_API.hide()
    } else {
      window.Tawk_API.show()
    }
  }, [router.asPath])

  return (
    <LayoutHome>
      <Landing />
      <TawkChat />
    </LayoutHome>
  )
}
