import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { useQueryClient } from '@tanstack/react-query'

import AddChildModal from '@/modules/parent/children/components/AddChildModal.jsx'
import ModalConfidentiality from '@/modules/student/subjects/components/modal/ModalConfidentiality.jsx'
import { useGetQuery } from '@/hooks'
import ContentLoader from '@/components/loader/content-loader'
import { useRouter } from 'next/navigation'

const MyChildren = () => {
  const { t } = useTranslation()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: childrenData, isLoading } = useGetQuery({
    key: 'parent-children',
    url: '/api/v1/auth/parent/confirm-child/list/',
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
      <LayoutAdmin title={t('myChildren')}>
        <ContentLoader></ContentLoader>
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin title={t('myChildren')}>
      <div className="">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800"></h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#5D87FF] text-white px-4 py-2 rounded font-medium"
          >
            + Farzand qo'shish
          </button>
        </div>

        {!Array.isArray(children) || children.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-lg shadow">
            <div className="mb-4 text-gray-500">
              <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">Farzandlar yo'q</h3>
            <p className="mb-4 text-gray-500">
              Hali hech qanday farzand qo'shilmagan. Farzand qo'shish uchun tugmani bosing.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#5D87FF] rounded-[12px] text-white px-4 py-2 font-medium"
            >
              Farzand qo'shish
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {Array.isArray(children) &&
              children.map((child, index) => (
                <div
                  key={index}
                  className="p-6 transition bg-white border shadow-md rounded-xl border-slate-200 hover:shadow-lg"
                >
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center text-2xl font-bold text-white bg-blue-600 rounded-full w-14 h-14">
                      {child.full_name?.charAt(0).toUpperCase() || '?'}
                    </div>

                    <div className="flex-1">
                      <h2
                        onClick={() => handleLink(child.id)}
                        className="text-lg font-bold cursor-pointer text-slate-900 hover:underline"
                      >
                        {child.full_name}
                      </h2>
                      <p className="text-sm text-slate-500">ID: {child.identification}</p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        child.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {child.status ? 'Faol' : 'Faol emas'}
                    </span>
                  </div>

                  {/* Extra Info */}
                  <div className="mt-4 space-y-2 text-sm">
                    <p>
                      <span className="font-medium text-slate-600">Sinf: </span>
                      {child.class_num || '—'} sinf
                    </p>
                    <p>
                      <span className="font-medium text-slate-600">Fan (O'zbek): </span>
                      {child.subject_name_uz || '—'}
                    </p>
                  </div>

                  {/* Subscription Info */}
                  <div className="pt-4 mt-4 space-y-1 text-sm border-t">
                    <p>
                      <span className="font-medium text-slate-600">Ro'yxatdan o'tgan sana: </span>
                      {child.registration_date}
                      {child.registration_time && ` (${child.registration_time})`}
                    </p>
                    <p>
                      <span className="font-medium text-slate-600">So'nggi kirish: </span>
                      {child.last_login_time || '—'}
                    </p>
                    <p>
                      <span className="font-medium text-slate-600">Obuna tugash sanasi: </span>
                      {child.subscription_end_date}{' '}
                      <span className="text-green-600">({child.remaining_days} kun qoldi)</span>
                    </p>
                    <p>
                      <span className="font-medium text-slate-600">So'nggi to'lov: </span>
                      {child.last_payment_amount?.toLocaleString()} so'm
                    </p>
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
