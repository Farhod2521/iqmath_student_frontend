import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { Card, Button, Avatar } from '@heroui/react'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import ContentLoader from '@/components/loader/content-loader'

// Import icons
import LocationIcon from '@/components/icons/children/location'
import PhoneIcon from '@/components/icons/children/phone'
import MailIcon from '@/components/icons/children/mail'
import CalendarIcon from '@/components/icons/children/calendar'
import ClockIcon from '@/components/icons/children/clock'
import EyeIcon from '@/components/icons/children/eye'

ModuleRegistry.registerModules([AllCommunityModule])
// import ContentLoader from '@/components/loader/content-loader'

// Mock data
const mockChildrenData = [
  {
    id: 1,
    name: "Azizov Aziz",
    class: "8-sinf",
    school: "15-sonli maktab",
    region: "Toshkent viloyati",
    district: "Chirchiq tumani",
    phone: "+998 90 123 45 67",
    email: "azizov.aziz@example.com",
    birthday: "15.03.2010",
    address: "Chirchiq shahri, O'zbekiston ko'chasi, 45-uy",
    registrationDate: "15.01.2024",
    lastLogin: "2024-01-15 14:30:25",
    lastLogout: "2024-01-15 16:45:12",
    status: "online",
    studyTime: "2 soat 15 daqiqa",
    progress: 85,
    subjects: ["Algebra", "Geometriya", "Fizika"],
    testsCompleted: 24,
    points: 1250,
    coins: 450,
    avatar: "/images/avatar-profile.png"
  },
  {
    id: 2,
    name: "Karimova Malika",
    class: "9-sinf",
    school: "25-sonli litsey",
    region: "Toshkent viloyati",
    district: "Zangiota tumani",
    phone: "+998 91 234 56 78",
    email: "karimova.malika@example.com",
    birthday: "22.07.2009",
    address: "Zangiota tumani, Yangi hayot MFY, 12-uy",
    registrationDate: "20.02.2024",
    lastLogin: "2024-01-14 09:15:30",
    lastLogout: "2024-01-14 11:30:45",
    status: "offline",
    studyTime: "1 soat 45 daqiqa",
    progress: 72,
    subjects: ["Algebra", "Geometriya", "Kimyo"],
    testsCompleted: 18,
    points: 890,
    coins: 320,
    avatar: "/images/avatar-profile.png"
  },
  {
    id: 3,
    name: "Toshmatov Jamshid",
    class: "7-sinf",
    school: "12-sonli maktab",
    region: "Toshkent viloyati",
    district: "Qibray tumani",
    phone: "+998 88 345 67 89",
    email: "toshmatov.jamshid@example.com",
    birthday: "08.11.2011",
    address: "Qibray tumani, Guliston MFY, 78-uy",
    registrationDate: "10.03.2024",
    lastLogin: "2024-01-15 13:20:15",
    lastLogout: "2024-01-15 15:40:30",
    status: "online",
    studyTime: "3 soat 30 daqiqa",
    progress: 95,
    subjects: ["Algebra", "Geometriya", "Biologiya"],
    testsCompleted: 32,
    points: 2100,
    coins: 780,
    avatar: "/images/avatar-profile.png"
  }
]

const Parents = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [children, setChildren] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulate API call
    const fetchChildren = async () => {
      try {
        setLoading(true)
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        setChildren(mockChildrenData)
        setError(null)
      } catch (err) {
        setError(t('errorLoadingChildren'))
      } finally {
        setLoading(false)
      }
    }

    fetchChildren()
  }, [t])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('uz-UZ', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    return status === 'online' ? 'success' : 'default'
  }

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'success'
    if (progress >= 70) return 'warning'
    return 'danger'
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5D87FF]"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">{t('errorLoadingChildren')}</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#5D87FF] hover:bg-[#4570EA] text-white px-4 py-2 rounded-md transition-colors"
          >
            {t('retry')}
          </button>
        </div>
      </div>
    )
  }

  if (!children || children.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">{t('noChildrenFound')}</h2>
          <p className="text-gray-600">Ota-onalar uchun farzandlar ma'lumotlari topilmadi</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
     
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {children.map((child) => (  
          <div key={child.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6  transition-all duration-300">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#5D87FF] text-white mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                {child.avatar ? (
                  <img 
                    src={child.avatar} 
                    alt={child.name}
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div className="w-full h-full rounded-full bg-[#5D87FF] text-white flex items-center justify-center text-2xl font-bold" style={{ display: child.avatar ? 'none' : 'flex' }}>
                  {child.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">{child.name}</h2>
              <p className="text-gray-600">{child.class}</p>
             
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="space-y-4">
          
              <div className="flex items-center gap-3">
                <PhoneIcon />
                <div>   
                  <p className="text-sm text-gray-500">{t('childPhone')}</p>
                  <p className="font-medium">{child.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MailIcon />
                <div>
                  <p className="text-sm text-gray-500">{t('childEmail')}</p>
                  <p className="font-medium">{child.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarIcon />
                <div>
                  <p className="text-sm text-gray-500">{t('lastLogin')}</p>
                  <p className="font-medium">{formatDate(child.lastLogin)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ClockIcon />
                <div>
                  <p className="text-sm text-gray-500">{t('lastLogout')}</p>
                  <p className="font-medium">{formatDate(child.lastLogout)}</p>
                </div>
              </div>
            </div>



            <div className="border-t border-gray-200 my-4"></div>

            {/* Action Button */}
            <button
              onClick={() => router.push(`/dashboard/teacher/parents/${child.id}`)}
              className="w-full bg-[#5D87FF] hover:bg-[#4570EA] text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <EyeIcon />
              {t('viewDetails')}
            </button>
          </div> 
        ))}
      </div>
    </div>
  )
}

export default Parents
