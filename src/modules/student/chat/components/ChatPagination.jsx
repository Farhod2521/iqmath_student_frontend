import React from 'react'
import { useTranslation } from 'react-i18next'

const ChatPagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  pageSize, 
  onPageChange, 
  onPageSizeChange 
}) => {
  const { t } = useTranslation()

  if (totalPages <= 1) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between">
        {/* Ma'lumotlar soni */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {t('showing', 'Ko\'rsatilmoqda')}: {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, totalItems)} {t('of', 'dan')} {totalItems}
        </div>
        
        {/* Pagination kontrolleri */}
        <div className="flex items-center gap-3">
          {/* Sahifa o'lchami */}
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm dark:bg-gray-700 dark:text-white"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          
          {/* Sahifa tugmalari */}
          <div className="flex items-center gap-1">
            {/* Oldingi sahifa */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← {t('previous', 'Oldingi')}
            </button>
            
            {/* Sahifa raqami */}
            <span className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md">
              {currentPage} / {totalPages}
            </span>
            
            {/* Keyingi sahifa */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('next', 'Keyingi')} →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPagination
