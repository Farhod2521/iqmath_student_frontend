import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import reactQueryClient from '@/config/react-query'
import '@/assets/styles/globals.css'
import '@/services/i18n' // i18n'ni faqat import qilish kifoya!

import { UserProfileProvider } from '@/context/responseProvider'
import { HeroUIProvider } from '@heroui/react'

import LayoutAdmin from '@/layout/LayoutAdmin'
import LayoutHome from '@/home/Layout'
import Dashboard from '@/components/dashboard'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [queryClient] = useState(() => reactQueryClient)
  const router = useRouter()

  // Layout tanlash logikasi - Role-based
  const Layout = useMemo(() => {
    const path = router.pathname
    
    // Maxsus sahifalar uchun Fragment
    if (path.includes('/question')) return React.Fragment;
    if (path.includes('/diagnostics')) return React.Fragment;
    if (path.includes('/student-examples/')) return React.Fragment;
    
    // Dashboard sahifalari uchun LayoutAdmin (role detection bilan)
    if (path.startsWith('/dashboard')) return LayoutAdmin;
    
    // Bosh sahifa uchun LayoutHome
    return LayoutHome;
  }, [router.pathname])

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
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </HeroUIProvider>
  )
}
