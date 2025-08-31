import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { FiPhone, FiCalendar, FiClock, FiEye, FiBookOpen, FiAward } from 'react-icons/fi'

const ChildCard = ({ child }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const formatDate = (dateString) => {
    if (!dateString) return '-'
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
    return status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white rounded-[12px] border border-[#E9E9E9] p-[24px] transition-all duration-300">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 rounded-full bg-[#5D87FF] text-white mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
          {child.avatar ? (
            <img 
              src={child.avatar} 
              alt={child.full_name}
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
          ) : null}
          <div className="w-full h-full rounded-full bg-[#5D87FF] text-white flex items-center justify-center text-2xl font-bold" style={{ display: child.avatar ? 'none' : 'flex' }}>
            {child.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'}
          </div>
        </div>
        <h2 className="text-[18px] font-semibold text-gray-800 mb-1">{child.full_name}</h2>
        <p className="text-gray-600">{child.class || t('noClass')}</p>
        {child.status && (
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(child.status)}`}>
            {child.status === 'online' ? t('online') : t('offline')}
          </span>
        )}
      </div>

      <div className="border-t border-[#E9E9E9] my-4"></div>

      <div className="space-y-4">
        {child.phone && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <FiPhone className="w-4 h-4 text-gray-600" />
            </div>
            <div>   
              <p className="text-[12px] text-gray-500">{t('phone')}</p>
              <p className="font-medium text-[14px]">{child.phone}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <FiCalendar className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <p className="text-[12px] text-gray-500">{t('lastLogin')}</p>
            <p className="font-medium text-[14px]">{formatDate(child.lastLogin)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <FiClock className="w-4 h-4 text-gray-600" />
          </div>
          <div>
            <p className="text-[12px] text-gray-500">{t('lastLogout')}</p>
            <p className="font-medium text-[14px]">{formatDate(child.lastLogout)}</p>
          </div>
        </div>

        {child.studyTime && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <FiBookOpen className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-[12px] text-gray-500">{t('studyTime')}</p>
              <p className="font-medium text-[14px]">{child.studyTime}</p>
            </div>
          </div>
        )}

        {child.testsCompleted && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <FiBookOpen className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-[12px] text-gray-500">{t('testsCompleted')}</p>
              <p className="font-medium text-[14px]">{child.testsCompleted} ta</p>
            </div>
          </div>
        )}

        {child.points && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <FiAward className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-[12px] text-gray-500">{t('points')}</p>
              <p className="font-medium text-[14px]">{child.points} ball</p>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[#E9E9E9] my-4"></div>

      {/* Action Button */}
      <button
        onClick={() => router.push(`/dashboard/parent/my-children/${child.id}`)}
        className="w-full bg-[#5D87FF] hover:bg-[#4570EA] text-white px-4 py-2 rounded-[8px] transition-colors flex items-center justify-center gap-2 text-[14px] font-medium"
      >
        <FiEye className="w-4 h-4" />
        {t('viewActivity')}
      </button>
    </div> 
  )
}

export default ChildCard
