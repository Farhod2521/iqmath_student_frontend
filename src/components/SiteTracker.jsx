import { useEffect, useRef } from 'react'
import Router, { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { trackPageView } from '@/shared/utils/siteTracker'

// Har sahifa almashganda sayt statistikasiga tashrif yozadi (UI chizmaydi)
export default function SiteTracker() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const tokenRef = useRef(null)
  const startedRef = useRef(false)

  tokenRef.current = session?.accessToken || null

  useEffect(() => {
    // Sessiya aniqlangach birinchi sahifani yozamiz — login qilgan foydalanuvchi to'g'ri bog'lansin
    if (status === 'loading' || !router.isReady || startedRef.current) return
    startedRef.current = true
    trackPageView(router.pathname, tokenRef.current)
  }, [status, router.isReady, router.pathname])

  useEffect(() => {
    // Router singleton — yopilish (closure) ichidagi eski pathname emas, joriy sahifa olinadi
    const onRouteChange = () => {
      if (startedRef.current) trackPageView(Router.pathname, tokenRef.current)
    }
    Router.events.on('routeChangeComplete', onRouteChange)
    return () => Router.events.off('routeChangeComplete', onRouteChange)
  }, [])

  return null
}
