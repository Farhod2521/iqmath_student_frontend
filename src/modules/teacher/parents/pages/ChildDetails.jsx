import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { Book } from 'lucide-react'

ModuleRegistry.registerModules([AllCommunityModule])

// Mock data for detailed view
const mockChildDetails = {
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
  subjects: [
    {
      name: "Algebra",
      progress: 90,
      testsCompleted: 12,
      averageScore: 92
    },
    {
      name: "Geometriya", 
      progress: 78,
      testsCompleted: 8,
      averageScore: 85
    },
    {
      name: "Fizika",
      progress: 82,
      testsCompleted: 4,
      averageScore: 88
    }
  ],
  testsCompleted: 24,
  points: 1250,
  coins: 450,
  avatar: "/images/avatar.png",
  testHistory: [
    {
      id: 1,
      subject: "Algebra",
      class: "8-sinf",
      chapter: "Kvadrat tenglamalar",
      topic: "Kvadrat tenglamalarni yechish",
      solvedTime: "2024-01-15 16:30:00",
      result: 95,
      duration: "25 daqiqa"
    },
    {
      id: 2,
      subject: "Geometriya",
      class: "8-sinf", 
      chapter: "Uchburchaklar",
      topic: "Pifagor teoremasi",
      solvedTime: "2024-01-15 15:45:00",
      result: 88,
      duration: "30 daqiqa"
    },
    {
      id: 3,
      subject: "Fizika",
      class: "8-sinf",
      chapter: "Mexanika",
      topic: "Tezlanish",
      solvedTime: "2024-01-15 14:20:00",
      result: 92,
      duration: "20 daqiqa"
    },
    {
      id: 4,
      subject: "Algebra",
      class: "8-sinf",
      chapter: "Funksiyalar",
      topic: "Chiziqli funksiya",
      solvedTime: "2024-01-14 16:15:00",
      result: 85,
      duration: "35 daqiqa"
    },
    {
      id: 5,
      subject: "Geometriya",
      class: "8-sinf",
      chapter: "To'rtburchaklar",
      topic: "Kvadrat va to'rtburchak",
      solvedTime: "2024-01-14 15:30:00",
      result: 90,
      duration: "28 daqiqa"
    }
  ]
}

const ChildDetails = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [child, setChild] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchChildDetails = async () => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setChild(mockChildDetails)
        setError(null)
      } catch (err) {
        setError('Farzand ma\'lumotlarini yuklashda xatolik yuz berdi')
      } finally {
        setLoading(false)
      }
    }

    fetchChildDetails()
  }, [])

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


  const getResultColor = (result) => {
    if (result >= 90) return 'text-green-600'
    if (result >= 70) return 'text-yellow-600'
    return 'text-red-600'
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
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Xatolik</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => router.back()}
            className="bg-[#5D87FF] hover:bg-[#4570EA] text-white px-4 py-2 rounded-md transition-colors"
          >
            Orqaga qaytish
          </button>
        </div>
      </div>
    )
  }

  if (!child) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Farzand topilmadi</h2>
          <p className="text-gray-600 mb-4">Kechirasiz, farzand ma'lumotlari topilmadi</p>
          <button 
            onClick={() => router.back()}
            className="bg-[#5D87FF] hover:bg-[#4570EA] text-white px-4 py-2 rounded-md transition-colors"
          >
            Orqaga qaytish
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Test History Table */}
      <div className="w-full">
      

        {child.testHistory && child.testHistory.length > 0 ? (
          <div className="relative">
            <AgGridReact
              rowData={child.testHistory}
              columnDefs={[
                {
                  headerName: t("number"),
                  valueGetter: "node.rowIndex + 1",
                  width: 80,
                  minWidth: 60,
                  maxWidth: 100,
                  flex: 0.5,
                  sortable: false,
                  resizable: false,
                },
                {
                  headerName: t("subject"),
                  field: "subject",
                  width: 150,
                  minWidth: 120,
                  maxWidth: 200,
                  flex: 1,
                  cellRenderer: (params) => (
                    <div className="flex items-center gap-2">
                      <Book />
                      <span className="font-medium">{params.value}</span>
                    </div>
                  ),
                },
                {
                  headerName: t("class"),
                  field: "class",
                  width: 120,
                  minWidth: 100,
                  maxWidth: 150,
                  flex: 0.8,
                  cellClass: "text-center",
                },
                {
                  headerName: t("chapter"),
                  field: "chapter",
                  width: 180,
                  minWidth: 150,
                  maxWidth: 250,
                  flex: 1.2,
                },
                {
                  headerName: t("topic"),
                  field: "topic",
                  width: 200,
                  minWidth: 150,
                  maxWidth: 300,
                  flex: 1.5,
                },
                {
                  headerName: t("solvedTime"),
                  field: "solvedTime",
                  width: 160,
                  minWidth: 130,
                  maxWidth: 200,
                  flex: 1,
                  cellClass: "text-center",
                  cellRenderer: (params) => formatDate(params.value),
                },
                {
                  headerName: t("result"),
                  field: "result",
                  width: 100,
                  minWidth: 80,
                  maxWidth: 120,
                  flex: 0.6,
                  cellClass: "text-center",
                  cellRenderer: (params) => (
                    <span className={`font-semibold ${getResultColor(params.value)}`}>
                      {params.value}%
                    </span>
                  ),
                },
              ]}
              domLayout="autoHeight"
              className="custom-grid"
              pagination={false}
              defaultColDef={{
                resizable: true,
                sortable: true,
                filter: true,
                suppressSizeToFit: false,
                flex: 1,
              }}
              suppressColumnVirtualisation={false}
              suppressRowVirtualisation={false}
              suppressCellFocus={true}
            />
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{t('noTestsFound')}</h3>
            <p className="text-gray-600">Hali hech qanday test bajarilmagan</p>
          </div>
        )}
      </div>
    </>
  )
} 

export default ChildDetails
