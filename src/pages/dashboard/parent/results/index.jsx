import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { useQueryClient } from '@tanstack/react-query'
import { useGetQuery } from '@/hooks'
import { useRouter } from 'next/navigation'
import { LoadingState } from '@/modules/student/products/components'
import Link from 'next/link'
import HeaderTitle from '@/components/header-title'

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
      child: 'Ученики',
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
      <LayoutAdmin>
        <HeaderTitle title={t('science_results')} />

        <LoadingState />
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('science_results')} />

      {!Array.isArray(children) || children.length === 0 ? (
        <div className="p-6 text-center bg-white rounded-lg shadow sm:p-8">
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
          <h3 className="mb-2 text-base font-medium text-gray-900 sm:text-lg">{lang.noChildren}</h3>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-lg shadow">
          {/* Desktop Table View */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase xl:px-4">
                    {lang.child}
                  </th>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase xl:px-4">
                    {lang.idPhone}
                  </th>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase xl:px-4">
                    {lang.classSubject}
                  </th>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase xl:px-4">
                    {lang.registered}
                  </th>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase xl:px-4">
                    {lang.lastLogin}
                  </th>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase xl:px-4">
                    {lang.subscription}
                  </th>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase xl:px-4">
                    {lang.status}
                  </th>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase xl:px-4">
                    {lang.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {children?.map((child) => (
                  <React.Fragment key={child.id}>
                    <tr className="transition-colors hover:bg-gray-50">
                      <td className="px-2 py-4 xl:px-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center flex-shrink-0 text-sm font-bold text-white bg-blue-600 rounded-full w-9 h-9 xl:w-10 xl:h-10">
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
                      <td className="px-2 py-4 xl:px-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{child.identification}</div>
                        <div className="text-sm text-gray-500">{child.phone_number || '—'}</div>
                      </td>
                      <td className="px-2 py-4 xl:px-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {child.class_num || '—'} {lang.class}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {isUzbek ? child.subject_name_uz : child.subject_name_ru || child.subject_name_uz || '—'}
                        </div>
                      </td>
                      <td className="px-2 py-4 xl:px-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(child.registration_date, child.registration_time)}
                        </div>
                      </td>
                      <td className="px-2 py-4 xl:px-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{child.last_login_time || '—'}</div>
                      </td>
                      <td className="px-2 py-4 xl:px-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{child.subscription_end_date}</div>
                        <div className="text-sm text-green-600">
                          {child.remaining_days} {lang.daysLeft}
                        </div>
                      </td>
                      <td className="px-2 py-4 xl:px-4 whitespace-nowrap">
                        <span
                          className={`px-2 xl:px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            child.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {child.status ? lang.active : lang.inactive}
                        </span>
                      </td>
                      <td className="px-2 py-4 text-sm font-medium xl:px-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleExpand(child.id)}
                          className="text-blue-600 transition-colors hover:text-blue-900"
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
                        <td colSpan={8} className="px-2 py-4 xl:px-4 bg-gray-50">
                          <div className="space-y-3">
                            <h4 className="mb-3 font-semibold text-gray-900">{lang.paymentInfo}</h4>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                                <p className="text-sm text-gray-500">{lang.lastPayment}</p>
                                <p className="text-lg font-semibold text-gray-900">
                                  {child.last_payment_amount?.toLocaleString() || '0'} {lang.sum}
                                </p>
                              </div>
                              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                                <p className="text-sm text-gray-500">{lang.paymentDate}</p>
                                <p className="text-lg font-semibold text-gray-900">{child.last_payment_date || '—'}</p>
                              </div>
                            </div>

                            {child.subjects && child.subjects.length > 0 && (
                              <div className="mt-4">
                                <h4 className="mb-3 font-semibold text-gray-900">{lang.selectedSubjects}</h4>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                  {child?.subjects?.map((subject, idx) => (
                                    <div
                                      key={idx}
                                      className="p-3 transition-colors bg-white border border-gray-200 rounded-lg hover:border-blue-500"
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
          <div className="hidden overflow-x-auto md:block lg:hidden">
            <div className="min-w-full">
              {children?.map((child) => (
                <div key={child.id} className="transition-colors border-b border-gray-200 hover:bg-gray-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-sm font-bold text-white bg-blue-600 rounded-full">
                          {child.full_name?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div className="flex-1 min-w-0 ml-3">
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

                    <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                      <div>
                        <span className="block text-gray-500">{lang.phone}:</span>
                        <span className="font-medium text-gray-900">{child.phone_number || '—'}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500">{lang.classSubject}:</span>
                        <span className="font-medium text-gray-900">
                          {child.class_num || '—'} /{' '}
                          {isUzbek ? child.subject_name_uz : child.subject_name_ru || child.subject_name_uz || '—'}
                        </span>
                      </div>
                      <div>
                        <span className="block text-gray-500">{lang.registered}:</span>
                        <span className="font-medium text-gray-900">
                          {formatDate(child.registration_date, child.registration_time)}
                        </span>
                      </div>
                      <div>
                        <span className="block text-gray-500">{lang.lastLogin}:</span>
                        <span className="font-medium text-gray-900">{child.last_login_time || '—'}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500">{lang.subscription}:</span>
                        <span className="font-medium text-gray-900">
                          {child.subscription_end_date} ({child.remaining_days} {lang.daysLeft})
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleExpand(child.id)}
                      className="flex items-center justify-center w-full px-2 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
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
                      <div className="pt-4 mt-4 space-y-3 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900">{lang.paymentInfo}</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-gray-50">
                            <p className="mb-1 text-xs text-gray-500">{lang.lastPayment}</p>
                            <p className="text-base font-semibold text-gray-900">
                              {child.last_payment_amount?.toLocaleString() || '0'} {lang.sum}
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-gray-50">
                            <p className="mb-1 text-xs text-gray-500">{lang.paymentDate}</p>
                            <p className="text-base font-semibold text-gray-900">{child.last_payment_date || '—'}</p>
                          </div>
                        </div>

                        {child.subjects && child.subjects.length > 0 && (
                          <div>
                            <h4 className="mb-2 text-sm font-semibold text-gray-900">{lang.selectedSubjects}</h4>
                            <div className="space-y-2">
                              {child?.subjects?.map((subject, idx) => (
                                <div key={idx} className="p-3 rounded-lg bg-gray-50">
                                  <p className="text-sm font-medium text-gray-900">
                                    {isUzbek ? subject.name_uz : subject.name_ru || subject.name_uz}
                                  </p>
                                  {subject.teacher && (
                                    <p className="mt-1 text-xs text-gray-500">
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
          <div className="divide-y divide-gray-200 md:hidden">
            {children?.map((child) => (
              <div key={child.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-lg font-bold text-white bg-blue-600 rounded-full">
                      {child.full_name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0 ml-3">
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
                    <span className="flex-shrink-0 text-gray-500">{lang.phone}:</span>
                    <span className="font-medium text-right text-gray-900">{child.phone_number || '—'}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="flex-shrink-0 text-gray-500">{lang.classSubject}:</span>
                    <span className="font-medium text-right text-gray-900 truncate">
                      {child.class_num || '—'} /{' '}
                      {isUzbek ? child.subject_name_uz : child.subject_name_ru || child.subject_name_uz || '—'}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="flex-shrink-0 text-gray-500">{lang.registered}:</span>
                    <span className="text-xs font-medium text-right text-gray-900">
                      {formatDate(child.registration_date, child.registration_time)}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="flex-shrink-0 text-gray-500">{lang.lastLogin}:</span>
                    <span className="text-xs font-medium text-right text-gray-900">{child.last_login_time || '—'}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="flex-shrink-0 text-gray-500">{lang.subscription}:</span>
                    <span className="text-xs font-medium text-right text-gray-900">
                      {child.subscription_end_date} ({child.remaining_days} {lang.daysLeft})
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleExpand(child.id)}
                  className="flex items-center justify-center w-full px-2 py-2 mt-3 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 active:bg-gray-300"
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
                  <div className="pt-4 mt-4 space-y-3 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900">{lang.paymentInfo}</h4>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-gray-50">
                        <p className="mb-1 text-xs text-gray-500">{lang.lastPayment}</p>
                        <p className="text-base font-semibold text-gray-900">
                          {child.last_payment_amount?.toLocaleString() || '0'} {lang.sum}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-50">
                        <p className="mb-1 text-xs text-gray-500">{lang.paymentDate}</p>
                        <p className="text-base font-semibold text-gray-900">{child.last_payment_date || '—'}</p>
                      </div>
                    </div>

                    {child.subjects && child.subjects.length > 0 && (
                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-gray-900">{lang.selectedSubjects}</h4>
                        <div className="space-y-2">
                          {child?.subjects?.map((subject, idx) => (
                            <div key={idx} className="p-3 rounded-lg bg-gray-50">
                              <p className="text-sm font-medium text-gray-900">
                                {isUzbek ? subject.name_uz : subject.name_ru || subject.name_uz}
                              </p>
                              {subject.teacher && (
                                <p className="mt-1 text-xs text-gray-500">
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
