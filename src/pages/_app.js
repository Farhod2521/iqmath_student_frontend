import { useState } from 'react'
import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import reactQueryClient from '@/config/react-query'
import '@/assets/styles/globals.css'
import '@/styles/ckeditor.css'
import '@/services/i18n' 

import { UserProfileProvider } from '@/context/responseProvider'
import { HeroUIProvider } from '@heroui/react'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [queryClient] = useState(() => reactQueryClient)

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <Hydrate state={pageProps?.dehydratedState}>
            <UserProfileProvider>
              <Component {...pageProps} />
              <Toaster />
            </UserProfileProvider>
          </Hydrate>
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
