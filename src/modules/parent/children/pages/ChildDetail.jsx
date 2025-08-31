import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import ContentLoader from '@/components/loader/content-loader'
import { FiArrowLeft, FiBarChart } from 'react-icons/fi'

// Components
import ActivityTable from '../components/child-detail/ActivityTable'
import NoActivityState from '../components/child-detail/NoActivityState'
import ChildNotFoundState from '../components/child-detail/ChildNotFoundState'
import ErrorState from '../components/ErrorState'

const ChildDetail = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id: childId } = router.query
  const { data: session } = useSession()
  const [selectedChild, setSelectedChild] = useState(null)
  const [activityData, setActivityData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock activity data
  const mockActivityData = [
    {
      id: 1,
      date: "2024-01-15",
      loginTime: "08:30:00",
      logoutTime: "10:45:00",
      sessionDuration: "2 soat 15 daqiqa",
      testsCompleted: 3,
      subjectsStudied: ["Algebra", "Geometriya"],
      pointsEarned: 45,
      status: "completed"
    },
    {
      id: 2,
      date: "2024-01-14",
      loginTime: "14:20:00",
      logoutTime: "16:30:00",
      sessionDuration: "2 soat 10 daqiqa",
      testsCompleted: 2,
      subjectsStudied: ["Fizika"],
      pointsEarned: 30,
      status: "completed"
    },
    {
      id: 3,
      date: "2024-01-13",
      loginTime: "09:15:00",
      logoutTime: "11:00:00",
      sessionDuration: "1 soat 45 daqiqa",
      testsCompleted: 1,
      subjectsStudied: ["Algebra"],
      pointsEarned: 25,
      status: "completed"
    }
  ]

  useEffect(() => {
    const fetchChildDetail = async () => {
      try {
        setLoading(true)
        
        // Session yoki mock data dan farzandni topamiz
        let child = null
        if (session?.children && Array.isArray(session.children)) {
          child = session.children.find(c => c.id == childId)
        } else {
          // Fallback: Mock data
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
          child = mockData.find(c => c.id == childId)
        }
        
        setSelectedChild(child)
        setActivityData(mockActivityData)
        setError(null)
      } catch (err) {
        console.error('Error loading child detail:', err)
        setError(t('errorLoadingActivity'))
      } finally {
        setLoading(false)
      }
    }

    if (childId) {
      fetchChildDetail()
    }
  }, [childId, session, t])

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

  if (!selectedChild) {
    return <ChildNotFoundState />
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-[24px]">
      <button
          onClick={() => router.push('/dashboard/parent/my-children')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-[8px] transition-colors flex items-center gap-2 text-[14px] font-medium"
        >
          <FiArrowLeft className="w-4 h-4" />
          {t('back')}
        </button>
        <div>
          <div className="text-[16px] uppercase font-semibold">{selectedChild.full_name}</div>
          <p className="text-gray-600 mt-1">{t('activityHistory')}</p>
        </div>
       
      </div>

      <ActivityTable activityData={activityData} />

      {activityData.length === 0 && <NoActivityState />}
    </div>
  )
}

export default ChildDetail
