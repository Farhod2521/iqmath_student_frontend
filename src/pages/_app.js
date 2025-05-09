import i18 from '@/services/i18n'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import reactQueryClient from '@/config/react-query'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { UserProfileProvider } from '@/context/responseProvider'
import { useTranslation } from 'react-i18next'
import LayoutAdmin from '@/layout/LayoutAdmin'
import LayoutHome from '@/home/Layout'

import { HeroUIProvider } from '@heroui/react'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [queryClient] = useState(() => reactQueryClient)
  const [mounted, setMounted] = useState(false)
  const { i18n } = useTranslation()

  const router = useRouter()

  const isAdminRoute =
    router.pathname.startsWith('/dashboard') &&
    !router.pathname.endsWith('question') &&
    !router.pathname.endsWith('diagnostics')
  const Layout = isAdminRoute ? LayoutAdmin : LayoutHome

  // Set language on the client after the component is mounted
  useEffect(() => {
    setMounted(true)
    const storedLang = localStorage.getItem('lang') || 'uz' // Default to 'uz'
    if (i18n.language !== storedLang) {
      i18n.changeLanguage(storedLang) // Set the language in i18next
    }
  }, [i18n])

  if (!mounted) {
    return null // Wait until the app is hydrated
  }

  return (
    <HeroUIProvider>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps?.dehydratedState}>
            <UserProfileProvider>
              <Layout>
                <Component {...pageProps} />
                <Toaster />
              </Layout>
            </UserProfileProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </HeroUIProvider>
  )
}
