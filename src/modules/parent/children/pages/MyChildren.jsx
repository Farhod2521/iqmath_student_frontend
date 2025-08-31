import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import ContentLoader from '@/components/loader/content-loader'

// Components
import ChildCard from '../components/ChildCard'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

const MyChildren = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [children, setChildren] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // API dan farzandlar ma'lumotlarini olish
    const fetchMyChildren = async () => {
      try {
        setLoading(true)
        
        // Session dan children ma'lumotlarini olamiz (API response dan keladi)
        if (session?.children && Array.isArray(session.children)) {
          setChildren(session.children)
        } else {
          // Fallback: Mock data (API tayyor bo'lmagan holatda)
          const mockData = [
            {
              id: 204,
              full_name: "Gayratjon Mirzamakhmudov",
              class: "9-sinf",
              school: "15-sonli maktab",
              phone: "+998 90 123 45 67",
              email: "gayratjon@example.com",
              lastLogin: "2024-01-15T14:30:25",
              lastLogout: "2024-01-15T16:45:12",
              status: "online",
              studyTime: "2 soat 15 daqiqa",
              progress: 85,
              testsCompleted: 24,
              points: 1250,
              avatar: "/images/avatar-profile.png"
            }
          ]
          setChildren(mockData)
        }
        
        setError(null)
      } catch (err) {
        console.error('Error loading children:', err)
        setError(t('errorLoadingChildren'))
      } finally {
        setLoading(false)
      }
    }

    fetchMyChildren()
  }, [session, t])

  const handleRetry = () => {
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="p-6">
        <ContentLoader />
      </div>
    )
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRetry} />
  }

  if (!children || children.length === 0) {
    return <EmptyState />
  }

  return (
    <div>
      <div className="text-[16px] uppercase font-semibold mb-[24px]">{t('myChildren')}</div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {children.map((child) => (  
          <ChildCard key={child.id} child={child} />
        ))}
      </div>
    </div>
  )
}

export default MyChildren
