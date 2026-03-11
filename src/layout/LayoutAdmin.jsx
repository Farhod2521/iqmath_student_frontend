import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import Sidebar from './sidebar/Sidebar'
import Main from './Main'
import { useScoreStore, useSettingStore } from '@/store'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { get } from 'lodash'

const LayoutAdmin = ({ children, title }) => {
  const router = useRouter()
  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useSettingStore((state) => state.setIsSidebarOpen)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const updateSidebarState = () => {
      setIsSidebarOpen(window.innerWidth > 1024)
    }

    updateSidebarState()
    window.addEventListener('resize', updateSidebarState)

    setIsMounted(true)

    return () => window.removeEventListener('resize', updateSidebarState)
  }, [setIsSidebarOpen])

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false)
    }
  }, [router.pathname, setIsSidebarOpen])

  const { setScoreData } = useScoreStore()

  const isTeacherMode = typeof window !== 'undefined' ? sessionStorage.getItem('is_teacher_mode') === 'true' : false

  const coinsUrl = isTeacherMode ? URLS.coins : URLS.coins
  const { data: score, isLoading } = useGetQuery({ key: KEYS.coins, url: coinsUrl })

  useEffect(() => {
    if (score) {
      const data = get(score, 'data', {})
      setScoreData({ ...data, isLoading })
    }
  }, [score, isLoading, setScoreData])

  if (!isMounted) return null

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className="flex min-h-screen bg-white dark:bg-[#202936]">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0 min-h-screen">
          <Main title={title}>{children}</Main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default LayoutAdmin
