import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import DashboardNav from '@/components/dashboard/dashboard-nav'
import Main from './Main'
import { useScoreStore, useSettingStore } from '@/store'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { get } from 'lodash'
import { useSession } from 'next-auth/react'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import SimpleLoader from '@/components/loader/simple-loader'

const LayoutAdmin = ({ children }) => {
  const router = useRouter()
  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useSettingStore((state) => state.setIsSidebarOpen)
  const [isMounted, setIsMounted] = useState(false)
  const [hasRedirected, setHasRedirected] = useState(false)

  const { data: session } = useSession()
  const { role, isTeacher, isLoading: roleLoading } = useRoleDetection()

  const { setScoreData } = useScoreStore()
  const { data: score, isLoading: scoreLoading } = useGetQuery({ 
    key: KEYS.coins, 
    url: URLS.coins,
    enabled: !!session?.accessToken
  })

  // Role-based redirection
  useEffect(() => {
    if (!roleLoading && !hasRedirected) {
      const currentPath = router.pathname
      
      // Special handling for /dashboard route
      if (currentPath === '/dashboard') {
        if (isTeacher) {
          console.log('Redirecting teacher from /dashboard to teacher dashboard')
          router.replace('/dashboard/teacher/statistics')
        } else {
          console.log('Redirecting student from /dashboard to student dashboard')
          router.replace('/dashboard/student/subjects')
        }
        setHasRedirected(true)
        return
      }
      
      // Check if user is on the wrong dashboard
      if (isTeacher) {
        // Teacher should be on teacher dashboard
        if (currentPath.startsWith('/dashboard/student/')) {
          console.log('Redirecting teacher to teacher dashboard')
          router.replace('/dashboard/teacher/statistics')
          setHasRedirected(true)
        }
      } else {
        // Student should be on student dashboard
        if (currentPath.startsWith('/dashboard/teacher/')) {
          console.log('Redirecting student to student dashboard')
          router.replace('/dashboard/student/subjects')
          setHasRedirected(true)
        }
      }
    }
  }, [role, isTeacher, roleLoading, router, hasRedirected])

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

  useEffect(() => {
    if (score) {
      const data = get(score, 'data', {})
      setScoreData({ ...data, isLoading: scoreLoading })
    }
  }, [score, scoreLoading, setScoreData])

  // Show loader while role is being detected
  if (!isMounted || roleLoading) {
    return (
      <ThemeProvider defaultTheme="light" attribute="class">
        <div className="flex justify-center items-center min-h-screen">
          <SimpleLoader />
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className="relative flex min-h-screen dark:bg-[#202936] bg-white transition-all">
        {/* SIDEBAR */}
        <div
          className={`fixed left-0 top-0 h-full bg-white dark:bg-[#202936] border-r border-[#EAEFF4] dark:border-[#2A3447FF] 
          transition-transform duration-300 z-50 w-[300px] overflow-y-auto ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <DashboardNav />
        </div>
        {/* MAIN */}
        <Main>{children}</Main>
      </div>
    </ThemeProvider>
  )
}

export default LayoutAdmin
