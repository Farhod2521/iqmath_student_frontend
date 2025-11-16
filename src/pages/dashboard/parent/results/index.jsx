import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { useQueryClient } from '@tanstack/react-query'
import useGetQuery from '@/hooks/api/useGetQuery'
import { useRouter } from 'next/navigation'
import { LoadingState } from '@/modules/student/products/components'
import Link from 'next/link'

const Index = () => {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const router = useRouter()
  const [expandedChildId, setExpandedChildId] = useState(null)

  const isUzbek = i18n.language === 'uz'

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
    queryClient.invalidateQueries(['parent-children'])
  }

  const handleToggleExpand = (id) => {
    setExpandedChildId(expandedChildId === id ? null : id)
  }

  const formatDate = (date, time) => {
    if (!date) return '—'
    return time ? `${date} ${time}` : date
  }

  const translations = {
    uz: {
      noChildren: "Farzandlar yo'q",
      child: 'Farzand',
      idPhone: 'ID / Telefon',
      classSubject: 'Sinf / Fan',
      registered: "Ro'yxatdan o'tgan",
      lastLogin: "So'nggi kirish",
      subscription: 'Obuna',
      status: 'Holat',
      actions: 'Amallar',
      active: 'Faol',
      inactive: 'Faol emas',
      viewDetails: "Batafsil ko'rish",
      hide: 'Yashirish',
      paymentInfo: "To'lov ma'lumotlari",
      lastPayment: "So'nggi to'lov",
      paymentDate: "To'lov sanasi",
      selectedSubjects: 'Tanlangan fanlar',
      teacher: "O'qituvchi",
      phone: 'Telefon',
      class: 'sinf',
      daysLeft: 'kun qoldi',
      sum: "so'm"
    },
    ru: {
      noChildren: 'Нет детей',
      child: 'Ребенок',
      idPhone: 'ID / Телефон',
      classSubject: 'Класс / Предмет',
      registered: 'Зарегистрирован',
      lastLogin: 'Последний вход',
      subscription: 'Подписка',
      status: 'Статус',
      actions: 'Действия',
      active: 'Активен',
      inactive: 'Не активен',
      viewDetails: 'Подробнее',
      hide: 'Скрыть',
      paymentInfo: 'Информация об оплате',
      lastPayment: 'Последний платеж',
      paymentDate: 'Дата платежа',
      selectedSubjects: 'Выбранные предметы',
      teacher: 'Учитель',
      phone: 'Телефон',
      class: 'класс',
      daysLeft: 'дней осталось',
      sum: 'сум'
    }
  }

  const lang = translations[isUzbek ? 'uz' : 'ru']

  if (isLoading) {
    return (
      <LayoutAdmin title={t('myChildren')}>
        <LoadingState />
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin title={t('myChildren')}>
      {!Array.isArray(children) || children.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 sm:p-8 text-center">
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
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">{lang.noChildren}</h3>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lang.child}
                  </th>
                  <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lang.idPhone}
                  </th>
                  <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lang.classSubject}
                  </th>
                  <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lang.registered}
                  </th>
                  <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lang.lastLogin}
                  </th>
                  <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lang.subscription}
                  </th>
                  <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lang.status}
                  </th>
                  <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lang.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {children.map((child) => (
                  <React.Fragment key={child.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-2 xl:px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-9 h-9 xl:w-10 xl:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {child.full_name?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <div className="ml-3">
                            <Link
                              href={`/dashboard/parent/results/${child.id}`}
                              className={`text-sm font-medium hover:underline text-gray-900 line-clamp-1`}
                            >
                              {child.full_name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 xl:px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{child.identification}</div>
                        <div className="text-sm text-gray-500">{child.phone_number || '—'}</div>
                      </td>
                      <td className="px-2 xl:px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {child.class_num || '—'} {lang.class}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {isUzbek ? child.subject_name_uz : child.subject_name_ru || child.subject_name_uz || '—'}
                        </div>
                      </td>
                      <td className="px-2 xl:px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(child.registration_date, child.registration_time)}
                        </div>
                      </td>
                      <td className="px-2 xl:px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{child.last_login_time || '—'}</div>
                      </td>
                      <td className="px-2 xl:px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{child.subscription_end_date}</div>
                        <div className="text-sm text-green-600">
                          {child.remaining_days} {lang.daysLeft}
                        </div>
                      </td>
                      <td className="px-2 xl:px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 xl:px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            child.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {child.status ? lang.active : lang.inactive}
                        </span>
                      </td>
                      <td className="px-2 xl:px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleToggleExpand(child.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title={expandedChildId === child.id ? lang.hide : lang.viewDetails}
                        >
                          <svg
                            className={`w-5 h-5 transform transition-transform ${
                              expandedChildId === child.id ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                    {expandedChildId === child.id && (
                      <tr>
                        <td colSpan={8} className="px-2 xl:px-4 py-4 bg-gray-50">
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-900 mb-3">{lang.paymentInfo}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <p className="text-sm text-gray-500">{lang.lastPayment}</p>
                                <p className="text-lg font-semibold text-gray-900">
                                  {child.last_payment_amount?.toLocaleString() || '0'} {lang.sum}
                                </p>
                              </div>
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <p className="text-sm text-gray-500">{lang.paymentDate}</p>
                                <p className="text-lg font-semibold text-gray-900">{child.last_payment_date || '—'}</p>
                              </div>
                            </div>

                            {child.subjects && child.subjects.length > 0 && (
                              <div className="mt-4">
                                <h4 className="font-semibold text-gray-900 mb-3">{lang.selectedSubjects}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                                  {child.subjects.map((subject, idx) => (
                                    <div
                                      key={idx}
                                      className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
                                    >
                                      <p className="font-medium text-gray-900">
                                        {isUzbek ? subject.name_uz : subject.name_ru || subject.name_uz}
                                      </p>
                                      {subject.teacher && (
                                        <p className="text-sm text-gray-500">
                                          {lang.teacher}: {subject.teacher}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tablet View (md - lg) */}
          <div className="hidden md:block lg:hidden overflow-x-auto">
            <div className="min-w-full">
              {children.map((child) => (
                <div key={child.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {child.full_name?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <h3 className="text-base font-semibold text-gray-900 truncate">{child.full_name}</h3>
                          <p className="text-sm text-gray-500">{child.identification}</p>
                        </div>
                      </div>
                      <span
                        className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                          child.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {child.status ? lang.active : lang.inactive}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                      <div>
                        <span className="text-gray-500 block">{lang.phone}:</span>
                        <span className="font-medium text-gray-900">{child.phone_number || '—'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">{lang.classSubject}:</span>
                        <span className="font-medium text-gray-900">
                          {child.class_num || '—'} /{' '}
                          {isUzbek ? child.subject_name_uz : child.subject_name_ru || child.subject_name_uz || '—'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">{lang.registered}:</span>
                        <span className="font-medium text-gray-900">
                          {formatDate(child.registration_date, child.registration_time)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">{lang.lastLogin}:</span>
                        <span className="font-medium text-gray-900">{child.last_login_time || '—'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">{lang.subscription}:</span>
                        <span className="font-medium text-gray-900">
                          {child.subscription_end_date} ({child.remaining_days} {lang.daysLeft})
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleExpand(child.id)}
                      className="w-full py-2 px-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center justify-center"
                    >
                      <span>{expandedChildId === child.id ? lang.hide : lang.viewDetails}</span>
                      <svg
                        className={`w-4 h-4 ml-2 transform transition-transform ${
                          expandedChildId === child.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {expandedChildId === child.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                        <h4 className="font-semibold text-gray-900 text-sm">{lang.paymentInfo}</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">{lang.lastPayment}</p>
                            <p className="text-base font-semibold text-gray-900">
                              {child.last_payment_amount?.toLocaleString() || '0'} {lang.sum}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">{lang.paymentDate}</p>
                            <p className="text-base font-semibold text-gray-900">{child.last_payment_date || '—'}</p>
                          </div>
                        </div>

                        {child.subjects && child.subjects.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">{lang.selectedSubjects}</h4>
                            <div className="space-y-2">
                              {child.subjects.map((subject, idx) => (
                                <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                                  <p className="font-medium text-gray-900 text-sm">
                                    {isUzbek ? subject.name_uz : subject.name_ru || subject.name_uz}
                                  </p>
                                  {subject.teacher && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      {lang.teacher}: {subject.teacher}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-200">
            {children.map((child) => (
              <div key={child.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {child.full_name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="ml-3 min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-gray-900 truncate">{child.full_name}</h3>
                      <p className="text-sm text-gray-500 truncate">{child.identification}</p>
                    </div>
                  </div>
                  <span
                    className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                      child.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {child.status ? lang.active : lang.inactive}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-500 flex-shrink-0">{lang.phone}:</span>
                    <span className="font-medium text-gray-900 text-right">{child.phone_number || '—'}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-500 flex-shrink-0">{lang.classSubject}:</span>
                    <span className="font-medium text-gray-900 text-right truncate">
                      {child.class_num || '—'} /{' '}
                      {isUzbek ? child.subject_name_uz : child.subject_name_ru || child.subject_name_uz || '—'}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-500 flex-shrink-0">{lang.registered}:</span>
                    <span className="font-medium text-gray-900 text-right text-xs">
                      {formatDate(child.registration_date, child.registration_time)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-500 flex-shrink-0">{lang.lastLogin}:</span>
                    <span className="font-medium text-gray-900 text-right text-xs">{child.last_login_time || '—'}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-500 flex-shrink-0">{lang.subscription}:</span>
                    <span className="font-medium text-gray-900 text-right text-xs">
                      {child.subscription_end_date} ({child.remaining_days} {lang.daysLeft})
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleExpand(child.id)}
                  className="mt-3 w-full py-2 px-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center justify-center"
                >
                  <span>{expandedChildId === child.id ? lang.hide : lang.viewDetails}</span>
                  <svg
                    className={`w-4 h-4 ml-2 transform transition-transform ${
                      expandedChildId === child.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedChildId === child.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    <h4 className="font-semibold text-gray-900 text-sm">{lang.paymentInfo}</h4>
                    <div className="space-y-2">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">{lang.lastPayment}</p>
                        <p className="text-base font-semibold text-gray-900">
                          {child.last_payment_amount?.toLocaleString() || '0'} {lang.sum}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">{lang.paymentDate}</p>
                        <p className="text-base font-semibold text-gray-900">{child.last_payment_date || '—'}</p>
                      </div>
                    </div>

                    {child.subjects && child.subjects.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">{lang.selectedSubjects}</h4>
                        <div className="space-y-2">
                          {child.subjects.map((subject, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                              <p className="font-medium text-gray-900 text-sm">
                                {isUzbek ? subject.name_uz : subject.name_ru || subject.name_uz}
                              </p>
                              {subject.teacher && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {lang.teacher}: {subject.teacher}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </LayoutAdmin>
  )
}

export default Index
