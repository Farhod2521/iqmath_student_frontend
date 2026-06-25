import Image from 'next/image'
import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import ContentLoader from '@/components/loader/content-loader'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import StudentExamplePagination from './StudentExamplePagination'
import { FaTelegram } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

ModuleRegistry.registerModules([AllCommunityModule])

function StudentExampleTable({
  data,
  pagination,
  onPageChange,
  onPageSizeChange,
  isLoading,
  actionLoading,
  onViewDetails,
  context
}) {
  const router = useRouter()
  const { t } = useTranslation()

  // Global funksiya sifatida saqlash
  if (typeof window !== 'undefined') {
    window.showCommentModal = context?.onShowComment || (() => {})
  }

  const formatDate = (dateString) => {
    // "2025 M06 30 20:28" formatini parse qilish
    const match = dateString.match(/(\d{4})\s+M(\d{2})\s+(\d{2})\s+(\d{2}):(\d{2})/)

    if (match) {
      const [, year, month, day, hour, minute] = match

      // Oylar nomlari
      const monthNames = {
        '01': 'yanvar',
        '02': 'fevral',
        '03': 'mart',
        '04': 'aprel',
        '05': 'may',
        '06': 'iyun',
        '07': 'iyul',
        '08': 'avgust',
        '09': 'sentabr',
        10: 'oktabr',
        11: 'noyabr',
        12: 'dekabr'
      }

      const monthName = monthNames[month] || month

      return `${year} ${day}-${monthName} ${hour}:${minute}`
    }

    // Agar format to'g'ri kelmasa, asl qiymatni qaytarish
    return dateString
  }

  const formatTeacherDate = (dateString) => {
    try {
      const date = new Date(dateString)

      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')

      return `${year}.${month}.${day} ${hours}:${minutes}`
    } catch (error) {
      return dateString
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'kutmoqda':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'tasdiqlangan':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'rad etilgan':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'javob berilgan':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'kutmoqda':
        return t('waiting')
      case 'tasdiqlangan':
        return t('approved')
      case 'rad etilgan':
        return t('rejected')
      case 'javob berilgan':
        return 'Javob berilgan'
      default:
        return status
    }
  }

  const handleTelegramClick = (studentId, studentName) => {
    // Telegram bot linkini yaratish
    const botUsername = 'iqmath_mentor_bot' // Bot username
    const startParam = `start_${studentId}` // Student ID bilan start parametri
    const telegramUrl = `https://t.me/${botUsername}?start=${startParam}`

    // Yangi tab da ochish
    window.open(telegramUrl, '_blank')

    // Toast xabar
    toast.success(`${studentName} bilan Telegram orqali bog'lanish uchun bot ochildi`)
  }

  const colDefs = [
    {
      headerName: t('number'),
      valueGetter: 'node.rowIndex + 1',
      width: 80,
      minWidth: 60,
      maxWidth: 100,
      flex: 0.5,
      sortable: false,
      checkboxSelection: true,
      resizable: false,
      suppressSizeToFit: true
    },
    {
      headerName: t('student'),
      field: 'student_name',
      width: 400,
      minWidth: 150,
      // maxWidth: 300,
      flex: 1.5,
      cellRenderer: (params) => (
        <div className={`flex items-center gap-2 cursor-pointer ${params.data.has_answers ? 'text-green-600' : ''}`}>
          <Image src={'/icons/pupil.svg'} alt="pupil" width={23} height={22} />
          <span
            onClick={() => onViewDetails(params.data.id, params.data.student_name)}
            className={`font-medium hover:underline ${params.data.has_answers ? 'text-green-600' : ''}`}
          >
            {params.value}
          </span>
          {params.data.has_answers && <div className="flex-shrink-0 w-2 h-2 ml-1 bg-green-500 rounded-full"></div>}
        </div>
      )
    },
    {
      headerName: t('class'),
      field: 'class_name',
      width: 180,
      minWidth: 120,
      maxWidth: 200,
      flex: 1,
      cellClass: 'text-center'
    },
    {
      headerName: t('submittedTime'),
      field: 'created_at',
      width: 180,
      minWidth: 130,
      maxWidth: 220,
      flex: 1.2,
      suppressSizeToFit: true,
      cellClass: 'text-center',
      cellRenderer: (params) => {
        return formatDate(params.value)
      }
    },
    {
      headerName: t('status'),
      field: 'status',
      width: 140,
      minWidth: 100,
      maxWidth: 160,
      flex: 0.8,
      cellRenderer: (params) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
            params.value
          )}`}
        >
          {getStatusText(params.value)}
        </span>
      )
    },
    {
      headerName: "Javob bergan o'qituvchi",
      field: 'teacher.full_name',
      width: 200,
      minWidth: 150,
      maxWidth: 280,
      flex: 1.3,
      cellRenderer: (params) => {
        if (!params.value) {
          return <span className="text-xs italic text-gray-400">-</span>
        }
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">{params.value}</span>
          </div>
        )
      }
    },
    {
      headerName: 'Javob berilgan vaqti',
      field: 'teacher.reviewed_at',
      width: 160,
      minWidth: 120,
      maxWidth: 180,
      flex: 1,
      cellRenderer: (params) => {
        if (!params.value) {
          return <span className="text-xs italic text-gray-400">-</span>
        }
        return <span className="text-center">{formatTeacherDate(params.value)}</span>
      }
    },
    {
      headerName: 'Izoh',
      field: 'teacher.commit',
      width: 80,
      minWidth: 60,
      maxWidth: 100,
      flex: 0.5,
      cellRenderer: (params) => {
        if (!params.value) {
          return <span className="text-xs italic text-gray-400">-</span>
        }

        return (
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.showCommentModal) {
                  window.showCommentModal(params.value, params.data.student_name)
                }
              }}
              className="p-2 text-blue-500 transition-colors rounded-full hover:text-blue-700 hover:bg-blue-50"
              title="Izohni ko'rish"
            >
              {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg> */}
              <img src={'/icons/eye-dark.svg'} alt="comment" className="text-black" width={18} height={18} />
            </button>
          </div>
        )
      }
    },
    {
      headerName: 'Telegram',
      field: 'telegram',
      width: 100,
      minWidth: 80,
      maxWidth: 120,
      flex: 0.5,
      resizable: false,
      cellRenderer: (params) => {
        return (
          <div className="flex justify-center">
            <button
              onClick={() => handleTelegramClick(params.data.student_id, params.data.student_name)}
              className="flex items-center justify-center gap-1 px-2 py-1 text-xs transition-colors duration-200 rounded-lg"
              title="Telegram orqali bog'lanish"
            >
              <FaTelegram className="w-5 h-5 ml-2 text-blue-500" />
            </button>
          </div>
        )
      }
    },
    {
      headerName: '',
      field: 'actions',
      width: 120,
      minWidth: 80,
      maxWidth: 140,
      flex: 0.6,
      resizable: false,
      cellRenderer: (params) => {
        const isLoading = actionLoading[params.data.id]

        return (
          <div className="flex justify-end gap-2">
            <button
              onClick={() => onViewDetails(params.data.id, params.data.student_name)}
              className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 whitespace-nowrap"
            >
              {t('details')}
            </button>
          </div>
        )
      }
    }
  ]

  return (
    <div className="flex flex-col w-full min-w-0 overflow-x-hidden">
      <style jsx global>{`
        .custom-grid {
          width: 100%;
          min-width: 0;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }
        .custom-grid .ag-header {
          background-color: #f9fafb;
          border-bottom: 2px solid #e5e7eb;
        }
        .custom-grid .ag-header-cell {
          background-color: #f9fafb !important;
          border-right: 1px solid #e5e7eb;
          font-weight: 600;
          color: #374151;
        }
        .custom-grid .ag-row {
          border-bottom: 1px solid #f3f4f6;
        }
        .custom-grid .ag-row:hover {
          background-color: #f8fafc;
        }
        .custom-grid .ag-cell {
          border-right: 1px solid #f3f4f6;
          padding: 8px 12px;
        }
      `}</style>
      <div className="w-full min-w-0 overflow-x-auto">
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-75">
              <ContentLoader classNames="!min-h-[400px] !w-full" />
            </div>
          )}
          <AgGridReact
            rowData={data}
            columnDefs={colDefs}
            domLayout="autoHeight"
            className="custom-grid"
            pagination={false}
            context={context}
            defaultColDef={{
              resizable: true,
              sortable: true,
              filter: true,
              suppressSizeToFit: false,
              flex: 1
            }}
            suppressColumnVirtualisation={false}
            suppressRowVirtualisation={false}
            suppressCellFocus={true}
            suppressHorizontalScroll={false}
            onGridReady={(params) => {
              params.api.setGridOption('context', context)
              // Auto size columns
              params.api.autoSizeAllColumns()
            }}
          />
        </div>
      </div>
      <StudentExamplePagination
        pagination={pagination}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        isLoading={isLoading}
      />
    </div>
  )
}

export default StudentExampleTable
