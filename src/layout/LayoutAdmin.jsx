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
  useEffect(() => {
    setIsSidebarOpen(window.innerWidth > 1024) // Sahifa yuklanganda aniqlash
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false)
    }
  }, [router.pathname])

  if (isSidebarOpen === null) return null

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
