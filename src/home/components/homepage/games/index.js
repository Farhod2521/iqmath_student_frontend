import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { IconArrowRight } from '@tabler/icons-react'

import AuthModal from '../../auth/AuthModal'
import Auth from '../../auth/Auth'

import { popularMentalGames } from './gamesData'
import { closeAuthModal, openAuthWithReturn } from '../../auth/AuthGate'

export default function GamesSlider() {
  const router = useRouter()
  const { data: session } = useSession()
  const [openAuth, setOpenAuth] = useState(false)

  const isAuthOpenFromUrl = useMemo(() => Boolean(router.query?.tab), [router.query?.tab])

  useEffect(() => {
    if (isAuthOpenFromUrl) setOpenAuth(true)
  }, [isAuthOpenFromUrl])

  const handleOpenAll = () => router.push('/mental-games')

  const handlePlay = (slug) => {
    const returnUrl = `/mental-games/${slug}`
    if (!session) {
      setOpenAuth(true)
      openAuthWithReturn(router, returnUrl, 'signUp')
      return
    }
    router.push(returnUrl)
  }

  const handleClose = () => {
    setOpenAuth(false)
    closeAuthModal(router)
  }

  return (
    <>
      <section className="px-4 py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-xl font-extrabold">Popular o‘yinlar</h3>
              <p className="text-sm text-gray-600">Bolalar uchun aqliy mashqlar</p>
            </div>

            <button
              onClick={handleOpenAll}
              className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 hover:underline"
            >
              Barcha o‘yinlar <IconArrowRight size={18} />
            </button>
          </div>

          <div className="flex gap-4 pb-2 overflow-x-auto">
            {popularMentalGames.map((g) => (
              <div key={g.slug} className="min-w-[260px] rounded-2xl overflow-hidden border bg-white shadow-sm">
                <div className="bg-gray-100 h-36">
                  <img src={g.cover} alt={g.title} className="object-cover w-full h-full" />
                </div>

                <div className="p-4">
                  <div className="font-extrabold">{g.title}</div>
                  <div className="mt-1 text-xs text-gray-500">{g.category}</div>

                  <button
                    onClick={() => handlePlay(g.slug)}
                    className="w-full py-2 mt-3 font-extrabold text-white bg-blue-600 rounded-xl hover:bg-blue-700"
                  >
                    O‘ynash
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AuthModal open={openAuth} onClose={handleClose} title="Kirish / Ro‘yxatdan o‘tish">
        <Auth />
      </AuthModal>
    </>
  )
}
