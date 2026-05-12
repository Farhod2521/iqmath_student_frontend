import { useEffect, useRef, useState } from 'react'
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
import { useRouter } from 'next/router'

// function TawkManager() {
//   const router = useRouter()

//   useEffect(() => {
//     // Faqat bir marta tekshirish
//     const isDashboard = router.asPath?.startsWith('/dashboard')

//     if (!isDashboard && !window.Tawk_API) {
//       // Dashboard emas va Tawk yuklanmagan -> yuklash
//       window.Tawk_API = window.Tawk_API || {}
//       window.Tawk_LoadStart = new Date()

//       const script = document.createElement('script')
//       script.async = true
//       script.src = 'https://embed.tawk.to/67c180dad29dc8190da4dc1e/1il5tulsp'
//       script.charset = 'UTF-8'
//       script.setAttribute('crossorigin', '*')
//       document.body.appendChild(script)
//     }
//   }, []) // ⬅️ Faqat bir marta ishlaydi

//   return null
// }

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
              {/* <TawkManager /> */}
            </UserProfileProvider>
          </Hydrate>
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
