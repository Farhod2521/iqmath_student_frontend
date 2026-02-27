import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import Filters from './Filters'
import GameCard from './GameCard'
import { closeAuthModal, openAuthWithReturn } from '@/home/components/auth/AuthGate'

import AuthModal from '@/home/components/auth/AuthModal'
import Auth from '@/home/components/auth/Auth'
import { mentalGames } from '@/home/components/homepage/games/gamesData'
import LayoutHome from '@/home/Layout'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ThemeSettings } from '@/home/theme/Theme'
import ScrollToTop from '@/home/components/shared/scroll-to-top'

export default function MentalGamesPage() {
  const theme = ThemeSettings()
  const router = useRouter()
  const { data: session } = useSession()

  const [openAuth, setOpenAuth] = useState(false)
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

  const isAuthOpenFromUrl = useMemo(() => Boolean(router.query?.tab), [router.query?.tab])

  useEffect(() => {
    if (isAuthOpenFromUrl) setOpenAuth(true)
  }, [isAuthOpenFromUrl])

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    return mentalGames.filter((g) => {
      const byCat = category === 'all' ? true : g.category === category
      const bySearch = !s ? true : g.title.toLowerCase().includes(s) || g.slug.toLowerCase().includes(s)
      return byCat && bySearch
    })
  }, [category, search])

  const onPlay = (slug) => {
    const returnUrl = `/mental-games/${slug}`
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
      <LayoutHome>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="min-h-screen px-4 py-10 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-black">Aqliy o‘yinlar</h1>

              <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-4">
                <div className="md:col-span-1">
                  <Filters category={category} setCategory={setCategory} search={search} setSearch={setSearch} />
                </div>

                <div className="md:col-span-3">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((g) => (
                      <GameCard key={g.slug} game={g} onPlay={onPlay} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ScrollToTop />
          <AuthModal open={openAuth} onClose={onClose} title="Kirish / Ro‘yxatdan o‘tish">
            <Auth />
          </AuthModal>
        </ThemeProvider>
      </LayoutHome>
    </>
  )
}
