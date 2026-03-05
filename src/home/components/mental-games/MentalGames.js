import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { openAuthWithReturn, closeAuthModal } from '@/home/components/auth/AuthGate'
import AuthModal from '@/home/components/auth/AuthModal'
import Auth from '@/home/components/auth/Auth'

import { safekidSeeds } from '@/data/gamesData'
import GameCard from './GameCard'
import Filters from './Filters'
import { useTranslation } from 'react-i18next'

export default function MentalGames() {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()
  const [openAuth, setOpenAuth] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')

  const games = useMemo(() => {
    return (safekidSeeds || []).map((g) => {
      const img = g.cover || g.image || null
      const imgSrc = img ? (typeof img === 'string' ? img : img.src) : null

      return {
        ...g,
        title: g.title || g.slug.replaceAll('-', ' '),
        cover: imgSrc || `/games/${g.slug}.png`
      }
    })
  }, [])

    const categories = useMemo(() => [...new Set(games.map((g) => g.category))], [games])


  const filtered = useMemo(() => {
    if (activeCategory === 'all') return games
    return games.filter((g) => g.category === activeCategory)
  }, [games, activeCategory])

  const onPlay = (game) => {
      const returnUrl = `/mental-games/out?to=${encodeURIComponent(game.href)}`

    if (!session) {
      setOpenAuth(true)
      openAuthWithReturn(router, returnUrl, 'signUp')
      return
    }

    window.open(returnUrl, '_blank', 'noopener,noreferrer')
  }

  const onClose = () => {
    setOpenAuth(false)
    closeAuthModal?.(router)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        {/* Header */}
        <div className="mx-auto max-w-[1400px] px-4 pt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-3xl font-black text-slate-900">{t('games.hero.badge')}</div>
              <div className="mt-1 text-sm font-semibold text-slate-500">{t('games.hero.collapse')}</div>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6">
            <Filters categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          </div>
        </div>

        {/* Grid */}
        <div id="games-grid" className="mx-auto max-w-[1400px] px-4 pb-14 pt-6">
          {filtered.length === 0 ? (
            <div className="p-6 text-sm text-gray-500 bg-white border rounded-2xl">{t('games.section.noFound')}</div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((game) => (
                <GameCard key={game.slug} game={game} onPlay={() => onPlay(game)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal open={openAuth} onClose={onClose} title={t('auth')}>
        <Auth />
      </AuthModal>
    </>
  )
}
