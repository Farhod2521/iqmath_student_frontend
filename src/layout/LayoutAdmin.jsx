import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import Sidebar from './sidebar/Sidebar'
import Main from './Main'
import { useScoreStore, useSettingStore } from '@/store'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { get } from 'lodash'

const LayoutAdmin = ({ children, title }) => {
  const router = useRouter()
  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useSettingStore((state) => state.setIsSidebarOpen)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Faqat bir marta ishga tushadi
    const updateSidebarState = () => {
      setIsSidebarOpen(window.innerWidth > 1024)
    }

    updateSidebarState() // dastlabki holat
    window.addEventListener('resize', updateSidebarState)

    setIsMounted(true)

    return () => window.removeEventListener('resize', updateSidebarState)
  }, [setIsSidebarOpen])

  useEffect(() => {
    // Route o'zgarsa va kichik ekran bo‘lsa, sidebar yopiladi
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false)
    }
  }, [router.pathname, setIsSidebarOpen])

  const { setScoreData } = useScoreStore()
  const { data: score, isLoading } = useGetQuery({ key: KEYS.coins, url: URLS.coins })

  useEffect(() => {
    if (score) {
      const data = get(score, 'data', {})
      setScoreData({ ...data, isLoading })
    }
  }, [score, isLoading, setScoreData])

  if (!isMounted) return null // SSR bilan muammoni oldini olish

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className="relative flex min-h-screen dark:bg-[#202936] bg-white transition-all">
        <Sidebar />
        <Main title={title}>{children}</Main>
      </div>
    </ThemeProvider>
  )
}

export default LayoutAdmin
