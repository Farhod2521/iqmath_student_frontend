import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { EllipsisVertical, Gift, Inbox, ListChecks, LogIn, Monitor, Smartphone } from 'lucide-react'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { postLoginAsStudent } from '@/services/controllers'
import StudentPagination from './StudentPagination'
import StudentRewardModal from './StudentRewardModal'
import { Avatar, LangFlag, usePupilsText } from './PupilsUi'

const ROLE_LABEL = { student: 'student', parent: 'parent', teacher: 'teachers', tutor: 'tutor' }

/** Qatordagi "⋮" menyusi: mukofot, kunlik vazifalar, o'quvchi sifatida kirish */
// Jadval gorizontal aylantiriladi (overflow) — menyu kesilib qolmasligi uchun
// u ekranga nisbatan (fixed) joylashadi; pastda joy bo'lmasa tepaga ochiladi.
const MENU_WIDTH = 240
const MENU_HEIGHT = 150

const RowMenu = ({ items }) => {
  const [position, setPosition] = useState(null)
  const ref = useRef(null)
  const buttonRef = useRef(null)
  const open = position !== null

  useEffect(() => {
    if (!open) return undefined
    const close = (event) => {
      if (!ref.current?.contains(event.target)) setPosition(null)
    }
    const hide = () => setPosition(null)
    document.addEventListener('mousedown', close)
    window.addEventListener('scroll', hide, true)
    window.addEventListener('resize', hide)
    return () => {
      document.removeEventListener('mousedown', close)
      window.removeEventListener('scroll', hide, true)
      window.removeEventListener('resize', hide)
    }
  }, [open])

  const toggle = () => {
    if (open) {
      setPosition(null)
      return
    }
    const rect = buttonRef.current.getBoundingClientRect()
    const below = window.innerHeight - rect.bottom > MENU_HEIGHT + 12
    setPosition({
      top: below ? rect.bottom + 4 : rect.top - MENU_HEIGHT - 4,
      left: Math.max(8, rect.right - MENU_WIDTH)
    })
  }

  return (
    <div ref={ref}>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
          open ? 'bg-[#EEF3FF] text-[#2563EB]' : 'text-[#5B6478] hover:bg-[#F1F5FA]'
        }`}
      >
        <EllipsisVertical size={18} />
      </button>
      {open ? (
        <div
          style={{ top: position.top, left: position.left, width: MENU_WIDTH }}
          className="fixed z-50 rounded-xl border border-[#E3E8F1] bg-white p-1.5 shadow-[0_18px_40px_-16px_rgba(15,27,61,0.35)]"
        >
          {items.map(({ icon: Icon, label, onClick, tone }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setPosition(null)
                onClick()
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-[#191C1D] transition hover:bg-[#F1F5FF]"
            >
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${tone}`}>
                <Icon size={15} />
              </span>
              {label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

const Pill = ({ tone, children }) => (
  <span className={`inline-flex items-center whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold ${tone}`}>
    {children}
  </span>
)

function StudentTable({ filterData = {}, isExportingAll, onExportStart, onExportEnd, onStudentsDataChange }) {
  const router = useRouter()
  const { t } = useTranslation()
  const tp = usePupilsText()
  const { data: session } = useSession()
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, limit: 100, total: 0, totalPages: 0 })
  const [data, setData] = useState([])

  const getData = useCallback(
    (page = 1, limit = 10, filters = {}) => {
      setIsLoadingData(true)

      const params = { page, size: limit, ...filters }
      Object.keys(params).forEach((key) => {
        if (params[key] === '' || params[key] === null || params[key] === undefined) delete params[key]
      })

      request
        .get(URLS.studentList, { params })
        .then((res) => {
          const newData = res.data.results || []
          setData(newData)
          setPagination({
            current: page,
            limit,
            total: res.data.total || 0,
            totalPages: res.data.total_pages || 0
          })
          if (onStudentsDataChange) onStudentsDataChange(newData)
        })
        .catch((error) => {
          console.error(t('errorStudentInformation'), error)
          setData([])
          if (onStudentsDataChange) onStudentsDataChange([])
          toast.error(t('errorLoadingStudents'))
        })
        .finally(() => setIsLoadingData(false))
    },
    [t, onStudentsDataChange]
  )

  useEffect(() => {
    if (!filterData) return
    setPagination((prev) => ({ ...prev, current: 1 }))
    getData(1, pagination.limit, filterData)
  }, [filterData, getData, pagination.limit])

  useEffect(() => {
    if (!filterData) return
    if (pagination.current > 1) getData(pagination.current, pagination.limit, filterData)
  }, [pagination.current, pagination.limit, filterData, getData])

  const handleExportAllStudents = useCallback(async () => {
    onExportStart()
    try {
      const exportParams = { export: 'excel', ...filterData }
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
    if (isExportingAll) handleExportAllStudents()
  }, [isExportingAll, handleExportAllStudents])

  const handleSignAsStudent = (s) => {
    postLoginAsStudent(s.id)
      .then((res) => {
        // Avval joriy tokenni saqlaymiz — sessionStorage yoki NextAuth session'dan
        let currentAccessToken = sessionStorage.getItem('access_token')
        if (!currentAccessToken && session?.accessToken) currentAccessToken = session.accessToken
        if (!currentAccessToken) return

        // Yangi tokenni o'quvchi tokeni sifatida, o'qituvchi tokenini vaqtincha saqlaymiz
        sessionStorage.setItem('access_token', res.data?.access_token)
        sessionStorage.setItem('old_token', currentAccessToken)

        // User-store ni vaqtincha student qilib o'zgartiramiz
        const currentUser = JSON.parse(localStorage.getItem('user-store') || '{}')
        if (currentUser.user) {
          currentUser.user.role = 'student'
          localStorage.setItem('user-store', JSON.stringify(currentUser))
        }

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

  const handleOpenDetails = (student) => {
    if (filterData?.role === 'teacher') return
    router.push({
      pathname: `/dashboard/teacher/pupils/${student.id}`,
      query: { role: filterData?.role }
    })
  }

  const handleRewardSuccess = () => {
    getData(pagination.current, pagination.limit, filterData)
  }

  const handlePageChange = useCallback((newPage) => {
    setPagination((prev) => ({ ...prev, current: newPage + 1 }))
  }, [])

  const handlePageSizeChange = useCallback((newPageSize) => {
    setPagination((prev) => ({ ...prev, current: 1, limit: newPageSize }))
  }, [])

  const isStudent = filterData?.role === 'student'
  const canOpenDetails = filterData?.role !== 'teacher'
  const roleLabel = (row) => {
    const role = filterData?.role || row?.role
    return ROLE_LABEL[role] ? t(ROLE_LABEL[role]) : ''
  }

  const headClass = 'whitespace-nowrap px-3 py-3 text-left text-xs font-bold uppercase tracking-wide text-[#5B6478]'
  const cellClass = 'whitespace-nowrap px-3 py-3 text-sm text-[#191C1D]'

  return (
    <>
      <div className="relative">
        {/* Yuklanish qoplamasi — eski qatorlar ko'rinib turadi */}
        {isLoadingData ? (
          <div className="absolute inset-0 z-20 flex items-start justify-center bg-white/60 pt-24 backdrop-blur-[1px]">
            <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-[#2563EB] border-t-transparent" />
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr className="border-b border-[#EEF1F6] bg-[#F8FAFD]">
                <th className={`${headClass} w-14 pl-5`}>ID</th>
                <th className={headClass}>{t('user')}</th>
                <th className={headClass}>{t('status')}</th>
                <th className={headClass}>{t('diagnosticsStatus')}</th>
                <th className={headClass}>{tp('dailyTask')}</th>
                {isStudent ? (
                  <>
                    <th className={headClass}>
                      {t('class')} / {t('subject')}
                    </th>
                    <th className={headClass}>{t('registrationDate')}</th>
                    <th className={headClass}>{t('subscriptionDeadline')}</th>
                  </>
                ) : null}
                <th className={headClass}>{t('phone')}</th>
                <th className={headClass}>{t('registeredLanguage')}</th>
                <th className={headClass}>{t('device')}</th>
                <th className={headClass}>{tp('lastLogin')}</th>
                <th className={`${headClass} pr-5 text-right`}>{t('details')}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                const number = (pagination.current - 1) * pagination.limit + index + 1
                const device = String(row.device || '').toLowerCase()
                const DeviceIcon = device.includes('web') ? Monitor : Smartphone
                const classNumber = String(row.class_num || '').split(' ')[0]
                // date_joined: "dd/mm/YYYY HH:MM" — haqiqiy ro'yxatdan o'tgan vaqt
                const [registeredDate, registeredTime] = String(row.date_joined || row.registration_date || '').split(' ')

                return (
                  <tr
                    key={row.id ?? index}
                    className="border-b border-[#F1F4F9] transition last:border-b-0 hover:bg-[#F8FAFF]"
                  >
                    <td className={`${cellClass} pl-5 font-medium text-[#5B6478]`}>{number}</td>
                    <td className={cellClass}>
                      <button
                        type="button"
                        onClick={() => handleOpenDetails(row)}
                        disabled={!canOpenDetails}
                        className="flex items-center gap-3 text-left disabled:cursor-default"
                      >
                        <Avatar name={row.full_name} />
                        <span className="min-w-0">
                          <span className="block max-w-[200px] truncate font-semibold text-[#0F1B3D]">
                            {row.full_name || '—'}
                          </span>
                          <span className="block text-xs text-[#8A93A6]">{roleLabel(row)}</span>
                        </span>
                      </button>
                    </td>
                    <td className={cellClass}>
                      {row.status ? (
                        <Pill tone="bg-[#DCFCE7] text-[#15803D]">{t('statusActive')}</Pill>
                      ) : (
                        <Pill tone="bg-[#F1F5F9] text-[#64748B]">{t('statusInactive')}</Pill>
                      )}
                    </td>
                    <td className={cellClass}>
                      {row.has_diagnost ? (
                        <Pill tone="bg-[#DBEAFE] text-[#1D4ED8]">{t('submitted')}</Pill>
                      ) : (
                        <Pill tone="bg-[#FEE2E2] text-[#DC2626]">{t('doNotSubmit')}</Pill>
                      )}
                    </td>
                    <td className={cellClass}>
                      <button
                        type="button"
                        onClick={() => handleOpenDailyTasks(row)}
                        title={tp('dailyTasks')}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition hover:brightness-95 ${
                          row.completed_today ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FFF1E6] text-[#C2410C]'
                        }`}
                      >
                        <ListChecks size={13} />
                        {t(row.completed_today ? 'yes' : 'no')}
                      </button>
                    </td>
                    {isStudent ? (
                      <>
                        <td className={cellClass}>
                          {classNumber || row.subject_name_uz ? (
                            <span className="flex flex-col leading-tight">
                              <span className="font-medium text-[#0F1B3D]">
                                {classNumber ? `${classNumber}-${t('class')}` : '—'}
                              </span>
                              <span className="text-xs text-[#8A93A6]">{row.subject_name_uz || '—'}</span>
                            </span>
                          ) : (
                            <span className="text-[#A0A8BA]">—</span>
                          )}
                        </td>
                        <td className={cellClass}>
                          {registeredDate ? (
                            <span className="flex flex-col leading-tight">
                              <span className="font-medium text-[#0F1B3D]">{registeredDate}</span>
                              {registeredTime ? <span className="text-xs text-[#8A93A6]">{registeredTime}</span> : null}
                            </span>
                          ) : (
                            <span className="text-[#A0A8BA]">—</span>
                          )}
                        </td>
                        <td className={cellClass}>
                          {row.remaining_days || row.subscription_end_date ? (
                            <span className="flex flex-col leading-tight">
                              <span className="font-medium text-[#0F1B3D]">{row.subscription_end_date || '—'}</span>
                              <span
                                className={`text-xs ${
                                  Number(row.remaining_days) <= 3 ? 'font-semibold text-[#DC2626]' : 'text-[#8A93A6]'
                                }`}
                              >
                                {row.remaining_days} {t('remainingDays')}
                              </span>
                            </span>
                          ) : (
                            <span className="text-[#A0A8BA]">—</span>
                          )}
                        </td>
                      </>
                    ) : null}
                    <td className={`${cellClass} tabular-nums`}>{row.phone || '—'}</td>
                    <td className={cellClass}>
                      {row.lang ? (
                        <span className="inline-flex items-center gap-1.5 font-medium uppercase">
                          <LangFlag lang={row.lang} />
                          {row.lang}
                        </span>
                      ) : (
                        <span className="text-[#A0A8BA]">—</span>
                      )}
                    </td>
                    <td className={cellClass}>
                      {row.device ? (
                        <span className="inline-flex items-center gap-1.5 text-[#334155]">
                          <DeviceIcon size={15} className="text-[#5B6478]" />
                          {String(row.device).replaceAll('-', '.')}
                        </span>
                      ) : (
                        <span className="text-[#A0A8BA]">—</span>
                      )}
                    </td>
                    <td className={`${cellClass} text-[#5B6478]`}>{row.last_login_time || '—'}</td>
                    <td className={`${cellClass} pr-5`}>
                      <div className="flex items-center justify-end gap-1.5">
                        {canOpenDetails ? (
                          <button
                            type="button"
                            onClick={() => handleOpenDetails(row)}
                            className="rounded-lg bg-[#EEF3FF] px-3.5 py-1.5 text-sm font-semibold text-[#2563EB] transition hover:bg-[#2563EB] hover:text-white"
                          >
                            {t('details')}
                          </button>
                        ) : null}
                        <RowMenu
                          items={[
                            {
                              icon: Gift,
                              label: t('giveReward'),
                              tone: 'bg-[#FEF3C7] text-[#D97706]',
                              onClick: () => handleGiveReward(row)
                            },
                            {
                              icon: ListChecks,
                              label: tp('dailyTasks'),
                              tone: 'bg-[#DCFCE7] text-[#16A34A]',
                              onClick: () => handleOpenDailyTasks(row)
                            },
                            {
                              icon: LogIn,
                              label: t('loginAsStudent'),
                              tone: 'bg-[#DBEAFE] text-[#2563EB]',
                              onClick: () => handleSignAsStudent(row)
                            }
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {!isLoadingData && data.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F5FF] text-[#2563EB]">
              <Inbox size={26} />
            </span>
            <p className="text-sm font-semibold text-[#0F1B3D]">{tp('empty')}</p>
            <p className="text-xs text-[#8A93A6]">{tp('emptyHint')}</p>
          </div>
        ) : null}
      </div>

      <StudentPagination
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoadingData}
      />

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
