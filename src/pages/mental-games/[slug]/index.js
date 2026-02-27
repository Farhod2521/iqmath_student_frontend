import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import GameRenderer from '@/home/components/mental-games/GameRenderer'
import AuthModal from '@/home/components/auth/AuthModal'
import Auth from '@/home/components/auth/Auth'
import { mentalGames } from '@/home/components/homepage/games/gamesData'
import { openAuthWithReturn, closeAuthModal } from '@/home/components/auth/AuthGate'

export default function MentalGamePlayPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [openAuth, setOpenAuth] = useState(false)

  const slug = useMemo(() => (typeof router.query.slug === 'string' ? router.query.slug : ''), [router.query.slug])
  const game = useMemo(() => mentalGames.find((g) => g.slug === slug), [slug])
  const isAuthOpenFromUrl = useMemo(() => Boolean(router.query?.tab), [router.query?.tab])

  useEffect(() => {
    if (!slug) return
    if (!session) {
      setOpenAuth(true)
      if (!isAuthOpenFromUrl) openAuthWithReturn(router, `/mental-games/${slug}`, 'signUp')
    }
  }, [slug, session, isAuthOpenFromUrl, router])

  useEffect(() => {
    if (isAuthOpenFromUrl) setOpenAuth(true)
  }, [isAuthOpenFromUrl])

  const onClose = () => {
    setOpenAuth(false)
    closeAuthModal(router)
    router.push('/mental-games')
  }

  return (
    <>
      <div className="min-h-screen px-4 py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.push('/mental-games')}
            className="text-sm font-bold text-blue-700 hover:underline"
          >
            ← Ortga (o‘yinlar)
          </button>

          <h1 className="mt-3 text-3xl font-black">{game?.title ?? slug}</h1>
          <p className="mt-2 text-gray-600">{game?.category ?? ''}</p>

          <div className="mt-6">
            {session ? (
              <GameRenderer slug={slug} />
            ) : (
              <div className="text-gray-600">O‘yinni o‘ynash uchun tizimga kiring…</div>
            )}
          </div>
        </div>
      </div>

      <AuthModal open={openAuth} onClose={onClose} title="Kirish / Ro‘yxatdan o‘tish">
        <Auth />
      </AuthModal>
    </>
  )
}
