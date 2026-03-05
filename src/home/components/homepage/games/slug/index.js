import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import AuthModal from '@/home/components/auth/AuthModal'
import Auth from '@/home/components/auth/Auth'
import { closeAuthModal, openAuthWithReturn } from '@/home/components/auth/AuthGate'
import { mentalGames } from '../../../../../data/gamesData'

function GameRenderer({ slug }) {
  return (
    <div className="p-6 bg-white border rounded-2xl">
      <div className="text-lg font-extrabold">O‘yin ishga tushdi: {slug}</div>
      <div className="mt-2 text-sm text-gray-600">
        Bu yerga keyin real o‘yin canvas’ni ulaymiz (Phaser / custom HTML5).
      </div>

      <div className="mt-4 rounded-xl bg-gray-100 h-[420px] flex items-center justify-center text-gray-500 font-bold">
        GAME CANVAS PLACEHOLDER
      </div>
    </div>
  )
}

export default function MentalGamePlayPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [openAuth, setOpenAuth] = useState(false)

  const slug = useMemo(() => {
    const s = router.query.slug
    return typeof s === 'string' ? s : ''
  }, [router.query.slug])

  const isAuthOpenFromUrl = useMemo(() => router.query?.tab, [router.query?.tab])

  const game = useMemo(() => mentalGames.find((g) => g.slug === slug), [slug])

  useEffect(() => {
    if (!slug) return

    if (!session) {
      setOpenAuth(true)
      if (!isAuthOpenFromUrl) {
        openAuthWithReturn(router, `/mental-games/${slug}`, 'signUp')
      }
    }
  }, [session, slug, isAuthOpenFromUrl, router])

  useEffect(() => {
    if (isAuthOpenFromUrl) setOpenAuth(true)
  }, [isAuthOpenFromUrl])

  const handleClose = () => {
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

          <h1 className="mt-3 text-3xl font-black">{game?.title ?? `O‘yin: ${slug}`}</h1>
          <p className="mt-2 text-gray-600">
            {game ? `${game.category} • ${game.ageMin ?? 6}-${game.ageMax ?? 14} yosh` : '...'}
          </p>

          <div className="mt-6">
            {session ? (
              <GameRenderer slug={slug} />
            ) : (
              <div className="text-gray-600">O‘yinni o‘ynash uchun tizimga kiring…</div>
            )}
          </div>
        </div>
      </div>

      <AuthModal open={openAuth} onClose={handleClose} title="Kirish / Ro‘yxatdan o‘tish">
        <Auth />
      </AuthModal>
    </>
  )
}
