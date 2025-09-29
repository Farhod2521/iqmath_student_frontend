import React from 'react'
import { useTranslation } from 'react-i18next'

const ChatFilters = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
  const { t } = useTranslation()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
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
  )
}

export default ChatFilters
