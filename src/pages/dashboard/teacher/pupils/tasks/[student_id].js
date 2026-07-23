import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import LayoutAdmin from '@/layout/LayoutAdmin'
import HeaderTitle from '@/components/header-title'
import ContentLoader from '@/components/loader/content-loader'
import DailyTaskDetailModal from '@/modules/teacher/students/components/DailyTaskDetailModal'
import Eye from '@/components/icons/eye/Eye'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'


const pad = (value) => String(value).padStart(2, '0')
const STORAGE_KEY = 'teacher_daily_tasks_student'

const toInputDate = (date) => {
  if (!date) return ''
  const value = String(date)

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value

  const dotMatch = value.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
  if (dotMatch) return `${dotMatch[3]}-${dotMatch[2]}-${dotMatch[1]}`

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return ''

  return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}`
}

const toApiDate = (date) => {
  const inputDate = toInputDate(date)
  if (!inputDate) return ''

  const [year, month, day] = inputDate.split('-')
  return `${day}.${month}.${year}`
}

const getCurrentWeek = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const monday = new Date(today)
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7))

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + index)

    return {
      date,
      dateKey: toInputDate(date),
      isFuture: date > today
    }
  })

  return {
    dateFrom: days[0].dateKey,
    dateTo: days[days.length - 1].dateKey,
    days
  }
}

const getDaysInRange = (dateFrom, dateTo) => {
  const start = new Date(`${dateFrom}T00:00:00`)
  const end = new Date(`${dateTo}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) return []

  const days = []
  const current = new Date(start)

  while (current <= end) {
    days.push({
      date: new Date(current),
      dateKey: toInputDate(current),
      isFuture: current > today
    })
    current.setDate(current.getDate() + 1)
  }

  return days
}

const WEEKDAY_KEYS = ['weekdays.sunday', 'weekdays.monday', 'weekdays.tuesday', 'weekdays.wednesday', 'weekdays.thursday', 'weekdays.friday', 'weekdays.saturday']

const getQueryValue = (value) => {
  if (Array.isArray(value)) return value[0] || ''
  return value ? String(value) : ''
}

const buildApiParams = (filters, studentId) => {
  const params = {
    student_id: studentId,
    date_from: toApiDate(filters.dateFrom),
    date_to: toApiDate(filters.dateTo),
    page: filters.page || 1,
    page_size: 100
  }

  Object.keys(params).forEach((key) => {
    if (!params[key]) delete params[key]
  })

  return params
}

const getLocalizedName = (entity, language) => {
  if (!entity) return '-'

  if (typeof entity === 'string') return entity

  const suffix = language === 'ru' ? 'ru' : 'uz'
  return entity[`name_${suffix}`] || entity.name_uz || entity.name_ru || entity.name || '-'
}

const getLocalizedClassName = (subject, language) => {
  if (!subject) return '-'

  if (typeof subject === 'string') return subject

  const suffix = language === 'ru' ? 'ru' : 'uz'
  return subject[`class_name_${suffix}`] || subject.class_name_uz || subject.class_name_ru || subject.class_num || '-'
}

const formatScore = (score) => {
  const value = Number(score)

  if (!Number.isFinite(value)) return '0%'
  return `${Number.isInteger(value) ? value : value.toFixed(2)}%`
}

const getResponseList = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.list)) return payload.list
  return []
}

const getTotalCount = (payload, listLength) => {
  const value = payload?.count ?? payload?.total ?? payload?.data?.count ?? payload?.data?.total ?? payload?.pagination?.total
  const total = Number(value)

  return Number.isFinite(total) ? total : listLength
}

const getTaskList = (item) => {
  const directList = item?.details || item?.tasks || item?.completed_tasks || item?.topics || item?.lessons

  if (Array.isArray(directList)) return directList

  if (directList && typeof directList === 'object') {
    const nested = Object.values(directList).flatMap((value) => (Array.isArray(value) ? value : []))
    if (nested.length) return nested
  }

  if (item?.topic || item?.subject || item?.chapter) return [item]

  return []
}

const getRowDate = (item) => {
  const rawDate = item?.date || item?.day || item?.created_at || item?.created_date || item?.date_from
  const inputDate = toInputDate(rawDate)

  return inputDate ? new Date(inputDate) : null
}

const getRowScore = (item, tasks) => {
  const directScore = item?.score ?? item?.avg_score ?? item?.average_score ?? item?.percent ?? item?.percentage
  const directScoreNumber = Number(directScore)

  if (Number.isFinite(directScoreNumber)) return directScoreNumber

  const scores = tasks.map((task) => Number(task?.score)).filter(Number.isFinite)
  if (!scores.length) return null

  return scores.reduce((sum, score) => sum + score, 0) / scores.length
}

const DailyTasksPage = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const routeStudentId = getQueryValue(router.query.student_id)
  const currentWeek = useMemo(() => getCurrentWeek(), [])
  const [student, setStudent] = useState(null)
  const [filters, setFilters] = useState(currentWeek)
  const [appliedFilters, setAppliedFilters] = useState({ ...currentWeek, page: 1 })
  const [statsData, setStatsData] = useState(null)
  const [selectedDetail, setSelectedDetail] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const displayedDays = useMemo(
    () => getDaysInRange(appliedFilters.dateFrom, appliedFilters.dateTo),
    [appliedFilters.dateFrom, appliedFilters.dateTo]
  )

  useEffect(() => {
    if (!router.isReady) return

    const nextFilters = {
      dateFrom: currentWeek.dateFrom,
      dateTo: currentWeek.dateTo
    }
    const nextAppliedFilters = {
      ...nextFilters,
      page: 1
    }

    setFilters(nextFilters)
    setAppliedFilters(nextAppliedFilters)

    if (typeof window === 'undefined') return

    const storedStudent = sessionStorage.getItem(STORAGE_KEY)
    if (!storedStudent) return

    try {
      const parsedStudent = JSON.parse(storedStudent)

      if (!routeStudentId || String(parsedStudent?.id) === routeStudentId) {
        setStudent(parsedStudent)
      }
    } catch (error) {
      setStudent(null)
    }
  }, [router.isReady, routeStudentId, currentWeek.dateFrom, currentWeek.dateTo])

  useEffect(() => {
    if (!routeStudentId) {
      setStatsData(null)
      return
    }

    let isMounted = true
    setIsLoading(true)
    setErrorMessage('')

    request
      .get(URLS.studentStudyStatsByDate, {
        params: buildApiParams(appliedFilters, routeStudentId)
      })
      .then((response) => {
        if (!isMounted) return
        setStatsData(response.data)
      })
      .catch((error) => {
        if (!isMounted) return
        setStatsData(null)
        setErrorMessage(error?.response?.data?.message || t('errorLoadingStudents'))
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [appliedFilters.dateFrom, appliedFilters.dateTo, appliedFilters.page, routeStudentId, t])

  const rows = useMemo(() => {
    const list = getResponseList(statsData)
    const itemsByDate = new Map()

    list.forEach((item) => {
      const rowDate = getRowDate(item)
      const dateKey = rowDate ? toInputDate(rowDate) : ''

      if (dateKey && !itemsByDate.has(dateKey)) itemsByDate.set(dateKey, item)
    })

    return displayedDays.map((day) => {
      const item = itemsByDate.get(day.dateKey)
      const tasks = day.isFuture || !item ? [] : getTaskList(item)
      const completedValue = item?.is_completed ?? item?.completed ?? item?.status
      const normalizedStatus = typeof completedValue === 'string' ? completedValue.trim().toLowerCase() : completedValue
      const isCompleted =
        typeof normalizedStatus === 'boolean'
          ? normalizedStatus
          : typeof normalizedStatus === 'number'
            ? normalizedStatus === 1
            : ['false', '0', 'not_completed', 'incomplete', 'pending', 'failed'].includes(normalizedStatus)
              ? false
              : ['true', '1', 'completed', 'complete', 'done', 'success'].includes(normalizedStatus) || tasks.length > 0

      return {
        id: item?.id || day.dateKey,
        date: day.date,
        isCompleted: day.isFuture ? false : isCompleted,
        score: day.isFuture || !item ? null : getRowScore(item, tasks),
        tasks,
        emptyText: day.isFuture
          ? t('tasksNotCompleted')
          : typeof item?.details === 'string'
            ? item.details
            : item?.message || item?.empty_text || t('tasksNotCompleted')
      }
    })
  }, [displayedDays, statsData, t])

  const totalCount = rows.length
  const totalPages = 1
  const currentPage = 1
  const studentName = student?.full_name || router.query.studentName || ''

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const updateRoute = (nextFilters) => {
    const nextQuery = {
      ...router.query,
      date_from: toApiDate(nextFilters.dateFrom),
      date_to: toApiDate(nextFilters.dateTo),
      page: nextFilters.page
    }

    Object.keys(nextQuery).forEach((key) => {
      if (!nextQuery[key]) delete nextQuery[key]
    })

    router.push(
      {
        pathname: router.pathname,
        query: nextQuery
      },
      undefined,
      { shallow: true }
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextFilters = {
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
      page: 1
    }

    setAppliedFilters(nextFilters)
    updateRoute(nextFilters)
  }

  const handlePageChange = (page) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages)
    const nextFilters = { ...appliedFilters, page: nextPage }

    setAppliedFilters(nextFilters)
    updateRoute(nextFilters)
  }

  const handleOpenDetail = (row) => {
    if (!row.tasks.length || !row.date) return

    setSelectedDetail({
      date: row.date,
      tasks: row.tasks
    })
  }

  const handleCloseDetail = () => {
    setSelectedDetail(null)
  }

  return (
    <LayoutAdmin>
      <div className="space-y-4">
        <HeaderTitle title={t('dailyTasks')} />

        <form
          onSubmit={handleSubmit}
          className="grid gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4 lg:items-end"
        >
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">{t('dateFrom', 'Boshlanish sanasi')}</span>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(event) => handleFilterChange('dateFrom', event.target.value)}
              className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-[#5D87FF] focus:ring-2 focus:ring-[#5D87FF]/20"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">{t('dateTo', 'Tugash sanasi')}</span>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(event) => handleFilterChange('dateTo', event.target.value)}
              className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-[#5D87FF] focus:ring-2 focus:ring-[#5D87FF]/20"
            />
          </label>
          <button
            type="submit"
            className="h-10 rounded-md bg-[#5D87FF] px-4 text-sm font-medium text-white transition hover:bg-[#4570EA]"
          >
            {t('applyFilter')}
          </button>
        </form>

        <div className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <span className="text-sm text-gray-500">{t('student')}</span>
          {studentName ? <span className="text-base font-semibold text-gray-900">{studentName}</span> : null}
        </div>

        {isLoading ? (
          <ContentLoader classNames="!min-h-[320px] !w-full rounded-lg" />
        ) : errorMessage ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{errorMessage}</div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{t('number')}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{t('date')}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{t('status')}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{t('score')}</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">{t('completedTasks')}</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">{t('details')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {rows.length ? (
                    rows.map((row, index) => (
                      <tr key={row.id}>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {row.date
                            ? row.date.toLocaleDateString(i18n.language || 'uz', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                              })
                            : '-'}
                          {row.date ? (
                            <div className="mt-0.5 text-xs capitalize text-gray-400">
                              {t(WEEKDAY_KEYS[row.date.getDay()])}
                            </div>
                          ) : null}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              row.isCompleted ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}
                          >
                            {row.isCompleted ? t('yes') : t('no')}
                          </span>
                        </td>
                        <td className="min-w-[120px] px-4 py-3 text-gray-700">
                          {row.score !== null ? (
                            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#5D87FF]">
                              {formatScore(row.score)}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="min-w-[260px] max-w-[520px] px-4 py-3 text-gray-700">
                          {row.tasks.length ? (
                            <div className="flex flex-wrap gap-2">
                              {row.tasks.slice(0, 4).map((task, taskIndex) => (
                                <span
                                  key={`${row.id}-topic-${taskIndex}`}
                                  className="max-w-[240px] truncate rounded-md border border-gray-100 bg-gray-50 px-2.5 py-1.5 text-xs font-medium text-gray-800"
                                  title={getLocalizedName(task.topic, i18n.language)}
                                >
                                  {getLocalizedName(task.topic, i18n.language)}
                                </span>
                              ))}
                              {row.tasks.length > 4 ? (
                                <span className="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-[#5D87FF]">
                                  +{row.tasks.length - 4}
                                </span>
                              ) : null}
                            </div>
                          ) : (
                            <span className="text-gray-500">{row.emptyText || t('tasksNotCompleted')}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleOpenDetail(row)}
                            disabled={!row.tasks.length}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#5D87FF] transition hover:bg-[#4570EA] disabled:cursor-not-allowed disabled:bg-gray-300"
                            aria-label={t('details')}
                          >
                            <Eye width={18} height={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                        {t('noData')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-gray-600">
                {t('total')}: {totalCount}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t('previous')}
                </button>
                <span className="text-sm font-medium text-gray-700">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t('next')}
                </button>
              </div>
            </div>
          </>
        )}

        <DailyTaskDetailModal
          detail={selectedDetail}
          language={i18n.language}
          t={t}
          onClose={handleCloseDetail}
          getLocalizedName={getLocalizedName}
          getLocalizedClassName={getLocalizedClassName}
          formatScore={formatScore}
        />
      </div>
    </LayoutAdmin>
  )
}

export default DailyTasksPage
