import { useState } from 'react'
import { useRouter } from 'next/router'
import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

import reactQueryClient from '@/config/react-query'
import '@/styles/globals.css'
import '@/services/i18n' // i18n'ni faqat import qilish kifoya!

import { UserProfileProvider } from '@/context/responseProvider'
import { HeroUIProvider } from '@heroui/react'

import LayoutAdmin from '@/layout/LayoutAdmin'
import LayoutHome from '@/home/Layout'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [queryClient] = useState(() => reactQueryClient)
  const router = useRouter()

  const isAdminRoute =
    router.pathname.startsWith('/dashboard') &&
    !router.pathname.endsWith('question') &&
    !router.pathname.endsWith('diagnostics') &&
    !router.pathname.endsWith('[test]')

  const Layout = isAdminRoute ? LayoutAdmin : LayoutHome

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
