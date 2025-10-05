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
            className="bg-[#5D87FF] text-white px-4 py-2 rounded font-medium"
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
              className="bg-[#5D87FF] rounded-[12px] text-white px-4 py-2 rounded font-medium"
            >
              Farzand qo'shish
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {Array.isArray(children) &&
              children.map((child, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-[#5D87FF] from-blue-500 to-blue-600 px-8 py-6">
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-blue-600 font-bold text-3xl">
                            {child.full_name ? child.full_name.charAt(0).toUpperCase() : '?'}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h2
                          className="text-2xl font-bold text-white mb-1 hover:underline hover:cursor-pointer"
                          onClick={handleLink}
                        >
                          {child.full_name}
                        </h2>
                        <div className="flex items-center space-x-3">
                          <span className="text-blue-100 text-sm">ID: {child.id}</span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              child.status ? 'bg-green-400 text-green-900' : 'bg-red-400 text-red-900'
                            }`}
                          >
                            {child.status ? 'Faol' : 'Faol emas'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Sinf</p>
                        <p className="text-base font-semibold text-slate-900">{child.class_num || '—'} sinf</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Fan (O'zbek)</p>
                        <p className="text-base font-semibold text-slate-900">{child.subject_name_uz || '—'}</p>
                      </div>

                      <div className="space-y-1"></div>

                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Viloyat</p>
                        <p className="text-base font-semibold text-slate-900">{child.region || '—'}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tuman</p>
                        <p className="text-base font-semibold text-slate-900">{child.districts || '—'}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Manzil</p>
                        <p className="text-base font-semibold text-slate-900">{child.address || '—'}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Tug'ilgan kun</p>
                        <p className="text-base font-semibold text-slate-900">{child.brithday || '—'}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Ta'lim muassasasi</p>
                        <p className="text-base font-semibold text-slate-900">{child.academy_or_school || '—'}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Muassasa nomi</p>
                        <p className="text-base font-semibold text-slate-900">{child.academy_or_school_name || '—'}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Hujjat turi</p>
                        <p className="text-base font-semibold text-slate-900">{child.document_type || '—'}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Hujjat</p>
                        <p className="text-base font-semibold text-slate-900">{child.document || '—'}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Ta'lim turi</p>
                        <p className="text-base font-semibold text-slate-900">{child.type_of_education || '—'}</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Obuna ma'lumotlari</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                          <p className="text-xs font-medium text-slate-500 mb-1">Ro'yxatdan o'tish</p>
                          <p className="text-sm font-semibold text-slate-900">{child.registration_date}</p>
                          <p className="text-xs text-slate-600 mt-1">{child.registration_time}</p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                          <p className="text-xs font-medium text-slate-500 mb-1">So'nggi kirish</p>
                          <p className="text-sm font-semibold text-slate-900">{child.last_login_time || '—'}</p>
                        </div>

                        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                          <p className="text-xs font-medium text-green-700 mb-1">Obuna tugash sanasi</p>
                          <p className="text-sm font-semibold text-green-900">{child.subscription_end_date}</p>
                          <p className="text-xs text-green-700 mt-1">{child.remaining_days} kun qoldi</p>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                          <p className="text-xs font-medium text-blue-700 mb-1">So'nggi to'lov</p>
                          <p className="text-sm font-semibold text-blue-900">
                            {child.last_payment_amount.toLocaleString()} so'm
                          </p>
                        </div>
                      </div>
                    </div>
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
