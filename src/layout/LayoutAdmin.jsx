import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import Sidebar from './sidebar/Sidebar'
import Main from './Main'
import { useSettingStore } from '@/store'

const LayoutAdmin = ({ children }) => {
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

  if (!isMounted) return null // SSR bilan muammoni oldini olish

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className="relative flex min-h-screen dark:bg-[#202936] bg-white transition-all">
        <Sidebar />
        <Main>{children}</Main>
      </div>
    </ThemeProvider>
  )
}

export default LayoutAdmin
