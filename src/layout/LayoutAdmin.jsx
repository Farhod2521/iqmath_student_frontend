import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import Sidebar from './sidebar/Sidebar'
import Main from './Main'
import { useScoreStore, useSettingStore, useCouponStore } from '@/store'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { get } from 'lodash'
import CouponModal from '@/modules/student/products/components/CouponModal'

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
  const { isCouponModalOpen, originalPrice, closeCouponModal, applyCoupon } = useCouponStore()
  
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
      <div className="relative flex min-h-screen dark:bg-[#202936] bg-white transition-all">
        <Sidebar />
        <Main title={title}>{children}</Main>
        
        {/* Global Promokod Modal */}
        <CouponModal
          isOpen={isCouponModalOpen}
          onClose={closeCouponModal}
          onApplyCoupon={applyCoupon}
          originalPrice={originalPrice}
        />
      </div>
    </ThemeProvider>
  )
}

export default LayoutAdmin
