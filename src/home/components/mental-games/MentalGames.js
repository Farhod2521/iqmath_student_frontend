import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { closeAuthModal, openAuthWithReturn } from '@/home/components/auth/AuthGate'
import AuthModal from '@/home/components/auth/AuthModal'
import Auth from '@/home/components/auth/Auth'

import Filters from './Filters'
import GameCard from './GameCard'
import CarouselGames from './CarouselGames'

export default function MentalGames() {
  const router = useRouter()
  const { data: session } = useSession()

  const [openAuth, setOpenAuth] = useState(false)
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  const isAuthOpenFromUrl = useMemo(() => Boolean(router.query?.tab), [router.query?.tab])

  useEffect(() => {
    if (isAuthOpenFromUrl) setOpenAuth(true)
  }, [isAuthOpenFromUrl])

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        setLoading(true)
        const r = await fetch('/api/games/safekidgames')
        const data = await r.json()
        if (alive) setGames(Array.isArray(data) ? data : [])
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    return (games || []).filter((g) => {
      const byCat = category === 'all' ? true : g.category === category
      const bySearch = !s ? true : (g.title || '').toLowerCase().includes(s) || (g.slug || '').toLowerCase().includes(s)
      return byCat && bySearch
    })
  }, [games, category, search])

  const onPlay = (game) => {
    const returnUrl = `/mental-games/out?to=${encodeURIComponent(game.href)}`
    if (!session) {
      setOpenAuth(true)
      openAuthWithReturn(router, returnUrl, 'signUp')
      return
    }
    router.push(returnUrl)
  }

  const onClose = () => {
    setOpenAuth(false)
    closeAuthModal(router)
  }

  return (
    <>
      <div className="min-h-screen px-4 py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="text-3xl font-black">Aqliy o‘yinlar</h1>
            <div className="text-sm text-gray-500">SafeKidGames’dan olingan o‘yinlar</div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-4">
            <div className="md:col-span-1">
              <Filters
                category={category}
                setCategory={setCategory}
                search={search}
                setSearch={setSearch}
                // Filters ichida category optionlarni xohlasangiz dynamic qilamiz:
                categories={Array.from(new Set(games.map((g) => g.category))).sort()}
              />
            </div>

            <div className="md:col-span-3">
              {loading ? (
                <div className="p-6 text-sm text-gray-500 bg-white border rounded-2xl">Yuklanmoqda…</div>
              ) : (
                <CarouselGames items={filtered} renderItem={(g) => <GameCard game={g} onPlay={onPlay} />} />
              )}
            </div>
          </div>
        </div>
      </div>

      <AuthModal open={openAuth} onClose={onClose} title="Kirish / Ro‘yxatdan o‘tish">
        <Auth />
      </AuthModal>
    </>
  )
}
