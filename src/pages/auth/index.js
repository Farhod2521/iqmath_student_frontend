import AuthLanding from '@/home/components/auth/AuthLanding'
import LayoutHome from '@/home/Layout'
import { useEffect } from 'react'

export default function LandingPage() {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <LayoutHome>
      <AuthLanding />
    </LayoutHome>
  )
}
