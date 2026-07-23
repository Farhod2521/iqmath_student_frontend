import Image from 'next/image'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { useRouter } from 'next/router'
import ContentLoader from '@/components/loader/content-loader'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import toast from 'react-hot-toast'

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import StudentPagination from './StudentPagination'
import { postLoginAsStudent } from '@/services/controllers'
import StudentRewardModal from './StudentRewardModal'
import cn from 'clsx'

ModuleRegistry.registerModules([AllCommunityModule])

function StudentTable({ filterData = {}, isExportingAll, onExportStart, onExportEnd, onStudentsDataChange }) {
  const router = useRouter()
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, limit: 100, total: 0, totalPages: 0 })
  const [data, setData] = useState([])


  const getData = useCallback(
    (page = 1, limit = 10, filters = {}) => {
      setIsLoadingData(true)

      const params = {
        page,
        size: limit,
        ...filters
      }

      Object.keys(params).forEach((key) => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) {
          delete params[key]
        }
      })

      request
        .get(URLS.studentList, {
          params
        })
        .then((res) => {
          const newData = res.data.results || []
          
          setData(newData)
          setPagination({
            current: page,
            limit,
            total: res.data.total || 0,
            totalPages: res.data.total_pages || 0
          })
          if (onStudentsDataChange) {
            onStudentsDataChange(newData)
          }
        })
        .catch((error) => {
          console.error(t('errorStudentInformation'), error)
          setData([])
          if (onStudentsDataChange) {
            onStudentsDataChange([])
          }
          toast.error(t('errorLoadingStudents'))
        })
        .finally(() => setIsLoadingData(false))
    },
    [t, onStudentsDataChange]
  )

useEffect(() => {
  if (!filterData) return // 🔥 ENG MUHIM

  setPagination((prev) => ({ ...prev, current: 1 }))
  getData(1, pagination.limit, filterData)
}, [filterData, getData, pagination.limit])

useEffect(() => {
  if (!filterData) return // 🔥 SHU HAM MUHIM

  if (pagination.current > 1) {
    getData(pagination.current, pagination.limit, filterData)
  }
}, [pagination.current, pagination.limit, filterData, getData])

  const handleExportAllStudents = useCallback(async () => {
    onExportStart()

    try {
      const exportParams = {
        export: 'excel',
        ...filterData
      }

      Object.keys(exportParams).forEach((key) => {
        if (exportParams[key] === '' || exportParams[key] === null || exportParams[key] === undefined) {
          delete exportParams[key]
        }
      })

      const response = await request.get('/api/v1/auth/student/student_list/', {
        params: exportParams,
        responseType: 'blob'
      })

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `o'quvchilar_${new Date().toISOString().split('T')[0]}.xlsx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast.success(t('exportAllStudentsSuccess'))
    } catch (error) {
      console.error('Export xatosi:', error)
      toast.error(t('exportError'))
    } finally {
      onExportEnd()
    }
  }, [filterData, t, onExportStart, onExportEnd])

  useEffect(() => {
    if (isExportingAll) {
      handleExportAllStudents()
    }
  }, [isExportingAll, handleExportAllStudents])

  const handleSignAsStudent = (s) => {
    postLoginAsStudent(s.id)
      .then((res) => {
        // Avval current token'ni saqlaymiz - sessionStorage yoki NextAuth session'dan
        let currentAccessToken = sessionStorage.getItem('access_token')
        if (!currentAccessToken && session?.accessToken) {
          currentAccessToken = session.accessToken
        }

        if (!currentAccessToken) {
          return
        }

        // Yangi tokenni o'quvchi tokeni sifatida saqlaymiz
        sessionStorage.setItem('access_token', res.data?.access_token)

        // O'qituvchi tokenini vaqtincha saqlaymiz
        sessionStorage.setItem('old_token', currentAccessToken)

        // User-store ni vaqtincha student qilib o'zgartiramiz
        const currentUser = JSON.parse(localStorage.getItem('user-store') || '{}')
        if (currentUser.user) {
          currentUser.user.role = 'student'
          localStorage.setItem('user-store', JSON.stringify(currentUser))
        }

        // O'quvchi sahifasiga yo'naltiramiz
        router.push('/dashboard/student/subjects')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleGiveReward = (student) => {
    setSelectedStudent(student)
    setIsRewardModalOpen(true)
  }

  const handleOpenDailyTasks = useCallback(
    (student) => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('teacher_daily_tasks_student', JSON.stringify(student))
      }

      router.push(`/dashboard/teacher/pupils/tasks/${student?.id}`)
    },
    [router]
  )

  const handleRewardSuccess = () => {
    // Refresh data if needed
    getData(pagination.current, pagination.limit, filterData)
  }

  const handlePageChange = useCallback((newPage) => {
    setPagination((prev) => ({ ...prev, current: newPage + 1 }))
  }, [])

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPagination((prev) => ({ ...prev, current: 1, limit: newPageSize }))
  }, [])

  const colDefs = useMemo(() => {
    const baseColumns = [
      {
        headerName: 'ID',
        field: 'id',
        filter: false,
        maxWidth: 80,
        checkboxSelection: true,
        valueGetter: (params) => {
          const current = pagination.current ?? 1
          const pageSize = pagination.limit ?? 10
          return (current - 1) * pageSize + params?.node.rowIndex + 1
        }
      },
      {
        headerName: t('user'),
        field: 'full_name',
        maxWidth: 200,
        //  filter: 'agNumberColumnFilter',
        // suppressMenu: true,
        onCellClicked: (params) => {
          if (filterData?.role === 'teacher') return // 🔥 STOP

          router.push({
            pathname: `/dashboard/teacher/pupils/${params.data.id}`,
            query: {
              role: filterData?.role
            }
          })
        },
        cellRenderer: (params) => (
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src={'/icons/pupil.svg'} alt="pupil" width={23} height={22} />
            <span className="font-medium">{params.value}</span>
          </div>
        )
      }
    ]

      baseColumns.push(
      {
        headerName: t('dailyTaskCompleted'),
        field: 'completed_today', 
        filter: false,
        cellRenderer: (params) => (
          <div className='flex w-full gap-2 justify-end'>
          <button
              disabled
              className={cn('flex-1 text-white px-3 py-1 rounded-lg text-sm',
                params?.value ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
              )}
            >
              {t(params?.value ? 'yes' : 'no')}
            </button>
          <button
              onClick={(event) => {
                event.stopPropagation()
                handleOpenDailyTasks(params.data)
              }}
              className="bg-blue-500 hover:bg-blue-600 flex-1 text-white px-3 py-1 rounded-lg text-sm"
            >
              {t('details')}
            </button>
          </div>
        )
      })
      baseColumns.push(
      {
        headerName: t('phone'),
        field: 'phone',
        minWidth: 120
      },
    )

      baseColumns.push({
        headerName: t('diagnosticsStatus'),
        field: 'has_diagnost',
        maxWidth: 150,
        // filter: false,
        cellClass: 'text-center',
        cellRenderer: (params) => {
          return params.value ? t('submitted') : t('doNotSubmit')
        }
      }) 

    if (filterData?.role === 'student') {
      baseColumns.push({
        headerName: t('class'),
        field: 'class_num',
        maxWidth: 100,
        cellClass: 'text-center',
        cellRenderer: (params) => {
          const classText = params.value || ''
          const classNumber = classText.split(' ')[0]
          return classNumber + '-' + t('class')
        }
      })

      baseColumns.push({
        headerName: t('subject'),
        field: 'subject_name_uz',
        maxWidth: 150,
        filter: false,
        cellClass: 'text-center'
      })

      baseColumns.push({
        headerName: t('subscriptionDeadline'),
        field: 'remaining_days',
        maxWidth: 170,
        filter: false,
        suppressMenu: false,
        cellClass: 'text-center',
        cellRenderer: (params) => {
          const days = params.data?.remaining_days
          const endDate = params.data?.subscription_end_date

          if (!days && !endDate) return '-'

          return (
            <div className="flex flex-col leading-tight">
              <span className="text-gray-800 text-sm font-medium">{endDate}</span>
              <span className="text-xs text-gray-500">
                {days} {t('remainingDays')}
              </span>
            </div>
          )
        }
      })
      // subject_name_uz
    }

    // Qolgan ustunlarni qo'shish
    baseColumns.push(
      {
        headerName: t('phone'),
        field: 'phone',
        minWidth: 120
      },
      {
        headerName: t('status'),
        field: 'status',
        minWidth: 110,
        flex: 1,
        filter: false,
        cellRenderer: (params) => {
          return params.value ? <span>{t('statusActive')}</span> : <span>{t('statusInactive')}</span>
        }
      },
      {
        headerName: t('device'),
        field: 'device',
        maxWidth: 150,
        filter: false,
        cellRenderer: (params) => {
          if (!params.value) {
            return <span className="text-gray-400">-</span>
          }
          return <span>{params.value.replaceAll('-', '.')}</span>
        }
      },
      {
        headerName: t('registeredLanguage'),
        field: 'lang',
        maxWidth: 100,
        filter: false,
        cellRenderer: (params) => {
          return params.value
        }
      },
      {
        headerName: t('register_date'),
        field: 'registration_date',
        minWidth: 100,
        cellRenderer: (params) => {
          const registration_date = params.data?.registration_date
          const registration_time = params.data?.registration_time

          if (!params.value) {
            return <span className="text-gray-400">-</span>
          }
          return <span>{registration_date}</span>
        }
      },
      {
        headerName: t('lastLoginTime') || 'Oxirgi kirish',
        field: 'last_login_time',
        minWidth: 100,
        cellRenderer: (params) => {
          if (!params.value) {
            return <span className="text-gray-400">-</span>
          }
          return <span>{params.value}</span>
        }
      },
      {
        headerName: t('action'),
        field: 'actions',
        minWidth: 260,
        filter: false,
        cellRenderer: (p) => (
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => handleGiveReward(p.data)}
              className="bg-[#5D87FF] hover:bg-[#4570EA] text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1"
              title={t('giveReward')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
              {t('reward')}
            </button>
            <button
              onClick={() => handleSignAsStudent(p.data)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              {t('loginAsStudent')}
            </button>
          </div>
        )
      },
    )

    return baseColumns
  }, [filterData?.role, t, router, handleGiveReward, handleSignAsStudent, handleOpenDailyTasks])

  // Loading holatida bo'sh loader ko'rsatmaymiz, chunki table o'rniga overlay ishlatamiz

  return (
    <>
      <div className="flex flex-col">
        {isLoadingData ? (
          <div className="relative">
            <ContentLoader classNames="!min-h-[400px] !w-full" />
          </div>
        ) : (
          <AgGridReact
            rowData={data}
            columnDefs={colDefs}
            domLayout="autoHeight"
            className="custom-grid ag-theme-quartz"
            pagination={false}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
              wrapHeaderText: true,
              autoHeaderHeight: true
            }}
          />
        )}
        {!isLoadingData && (
          <StudentPagination
            pagination={pagination}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            isLoading={isLoadingData}
          />
        )}
      </div>

      {/* Reward Modal */}
      <StudentRewardModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        student={selectedStudent}
        onSuccess={handleRewardSuccess}
      />
    </>
  )
}

export default StudentTable
