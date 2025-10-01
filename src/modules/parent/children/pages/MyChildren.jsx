import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { useQueryClient } from '@tanstack/react-query'

import AddChildModal from '@/modules/parent/children/components/AddChildModal.jsx'
import ModalConfidentiality from '@/modules/student/subjects/components/modal/ModalConfidentiality.jsx'
import useGetQuery from '@/hooks/api/useGetQuery'
import ContentLoader from '@/components/loader/content-loader'
import { useRouter } from 'next/navigation'

const MyChildren = () => {
  const { t } = useTranslation()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: childrenData, isLoading } = useGetQuery({
    key: 'parent-children',
    url: 'https://api.iqmath.uz/api/v1/auth/parent/confirm-child/list/',
    showErrorMsg: true
  })

  let children = []
  if (childrenData) {
    if (Array.isArray(childrenData)) {
      children = childrenData
    } else if (childrenData.data && Array.isArray(childrenData.data)) {
      children = childrenData.data
    } else if (childrenData.results && Array.isArray(childrenData.results)) {
      children = childrenData.results
    }
  }

  const handleAddChildSuccess = () => {
    // Query'ni invalidate qilish orqali ma'lumotlarni yangilash
    queryClient.invalidateQueries(['parent-children'])
  }

  const handleLink = (id) => {
    router.push(`/dashboard/parent/my-children/${id}`)
  }

  if (isLoading) {
    return (
      <LayoutAdmin title="Farzandlarim">
        <ContentLoader></ContentLoader>
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin title="Farzandlarim">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800"></h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
          >
            + Farzand qo'shish
          </button>
        </div>

        {!Array.isArray(children) || children.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Farzandlar yo'q</h3>
            <p className="text-gray-500 mb-4">
              Hali hech qanday farzand qo'shilmagan. Farzand qo'shish uchun tugmani bosing.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 rounded-[12px] text-white px-4 py-2 rounded font-medium"
            >
              Farzand qo'shish
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(children) &&
              children.map((child, index) => (
                <div
                  key={index}
                  onClick={() => handleLink(child?.id)}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-lg">
                          {child.full_name ? child.full_name.charAt(0).toUpperCase() : '?'}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{child.full_name || "Noma'lum"}</p>
                      <p className="text-sm text-gray-500 truncate">ID: {child.identification || 'N/A'}</p>
                      {child.class_name && <p className="text-xs text-gray-400">Sinf: {child.class_name}</p>}
                      {child.academy_or_school_name && (
                        <p className="text-xs text-gray-400">Maktab: {child.academy_or_school_name}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          child.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {child.status ? 'Faol' : 'Faol emas'}
                      </span>
                    </div>
                    {child.student_date && (
                      <div className="mt-2 text-xs text-gray-400">
                        Qo'shilgan: {new Date(child.student_date).toLocaleDateString('uz-UZ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}

        <AddChildModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleAddChildSuccess}
        />

        {/* Login/parol ko'rsatadigan modal */}
        <ModalConfidentiality />
      </div>
    </LayoutAdmin>
  )
}

export default MyChildren
