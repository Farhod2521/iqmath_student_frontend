import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import LayoutAdmin from '@/layout/LayoutAdmin'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { toast } from 'react-hot-toast'
import dayjs from 'dayjs'

const ChatPage = () => {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Mentorga yuborilgan murojaatlarni olish
  const { data: mentorRequests, isLoading, refetch } = useGetQuery({
    key: KEYS.mentorRequests,
    url: '/api/v1/func_student/my-unsolved-question/list/',
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    enabled: !!session?.accessToken
  })

  const formatDate = (dateString) => {
    return dayjs(dateString).format('DD MMMM YYYY, HH:mm')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'answered':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return t('pending', 'Kutilmoqda')
      case 'answered':
        return t('answered', 'Javob berilgan')
      case 'rejected':
        return t('rejected', 'Rad etilgan')
      default:
        return status
    }
  }

  const filteredRequests = mentorRequests?.data?.results?.filter(request => {
    const matchesSearch = searchTerm === '' || 
      request.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.subject_name?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === '' || request.status === statusFilter
    
    return matchesSearch && matchesStatus
  }) || []

  if (isLoading) {
    return (
      <LayoutAdmin title={t('chat', 'Chat')}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin title={t('chat', 'Chat')}>
      <div className="space-y-6">
   
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('search', 'Qidirish')}
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('searchRequests', 'Murojaatlarni qidirish...')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('status', 'Holat')}
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">{t('allStatuses', 'Barcha holatlar')}</option>
                <option value="pending">{t('pending', 'Kutilmoqda')}</option>
                <option value="answered">{t('answered', 'Javob berilgan')}</option>
                <option value="rejected">{t('rejected', 'Rad etilgan')}</option>
              </select>
            </div>
          </div>
          </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
              <div className="text-gray-500 dark:text-gray-400">
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-lg font-medium mb-2">
                  {t('noRequests', 'Hozircha murojaatlar yo\'q')}
                </p>
                <p className="text-sm">
                  {t('noRequestsDescription', 'Mentorga murojaat yuborganingizda bu yerda ko\'rinadi')}
                </p>
              </div>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {request.subject_name || t('subject', 'Fan')}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusText(request.status)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(request.created_at)}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('message', 'Xabar')}:
                  </h4>
                  <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    {request.message || t('noMessage', 'Xabar yo\'q')}
                  </p>
                </div>

                {request.teacher_response && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('mentorResponse', 'Mentor javobi')}:
                    </h4>
                    <p className="text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border-l-4 border-blue-500">
                      {request.teacher_response}
                    </p>
              </div>
            )}

                {request.question_json && Array.isArray(request.question_json) && request.question_json.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('attachedQuestions', 'Biriktirilgan savollar')}:
                    </h4>
                    <div className="space-y-2">
                      {request.question_json.map((question, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {question.question_text || `Savol ${index + 1}`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default ChatPage