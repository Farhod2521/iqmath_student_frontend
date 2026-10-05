import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  LayoutGrid,
  List,
  MoreVertical,
  Plus,
  Search,
  Sigma,
  Triangle,
  UserPlus
} from 'lucide-react'

import LayoutAdmin from '@/layout/LayoutAdmin'
import AddChildModal from '@/modules/parent/children/components/AddChildModal.jsx'
import ModalConfidentiality from '@/modules/student/subjects/components/modal/ModalConfidentiality.jsx'
import { Initials } from '@/modules/parent/home/dashboard/shared'
import { useGetQuery } from '@/hooks'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'

const PAGE_SIZE = 10

// Sinf belgisi ranglari (sinfga qarab)
const GRADE_TONES = [
  'bg-[#E0F2FE] text-[#0284C7]',
  'bg-[#DCFCE7] text-[#16A34A]',
  'bg-[#FFEDD5] text-[#EA580C]',
  'bg-[#EDE9FE] text-[#7C3AED]',
  'bg-[#E0E7FF] text-[#4F46E5]'
]
const gradeTone = (grade) => GRADE_TONES[(Number(grade) || 0) % GRADE_TONES.length]

// Fan belgisi: nomiga qarab rang va ikonka
const subjectStyle = (name = '') =>
  /algebr|алгебр/i.test(name)
    ? { Icon: Sigma, cls: 'bg-[#F1EBFF] text-[#7C3AED]' }
    : /geometr|геометр/i.test(name)
      ? { Icon: Triangle, cls: 'bg-[#FEECEC] text-[#DC2626]' }
      : { Icon: BookOpen, cls: 'bg-[#E7F8EE] text-[#16A34A]' }

// "17/09/2026 13:28" -> ["17/09/2026", "13:28"]; vaqtni tartiblash uchun ham
const splitDateTime = (value) => {
  if (!value) return ['—', '']
  const [date, time = ''] = String(value).split(' ')
  return [date, time]
}
const toTimestamp = (value) => {
  if (!value) return 0
  const [date, time = '00:00'] = String(value).split(' ')
  const [d, m, y] = date.split('/').map(Number)
  const [h, min] = time.split(':').map(Number)
  return new Date(y, (m || 1) - 1, d || 1, h || 0, min || 0).getTime() || 0
}

const isActive = (child) => !!child.status

const RowMenu = ({ onCertificate, label }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return undefined
    const close = (event) => !ref.current?.contains(event.target) && setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="menu"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5EAF2] bg-white text-[#334155] transition hover:border-[#BFD3FF] hover:text-[#2563EB] dark:border-[#26324A] dark:bg-transparent"
      >
        <MoreVertical size={18} />
      </button>
      {open ? (
        <div className="absolute right-0 top-12 z-20 w-60 overflow-hidden rounded-xl border border-[#EEF1F6] bg-white py-1 shadow-xl dark:border-[#26324A] dark:bg-[#111A2B]">
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              onCertificate()
            }}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-medium text-[#0F172A] hover:bg-[#F5F8FF] dark:text-white"
          >
            <Download size={16} className="text-[#2563EB]" />
            {label}
          </button>
        </div>
      ) : null}
    </div>
  )
}

const MyChildren = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('login')
  const [view, setView] = useState('list')
  const [page, setPage] = useState(1)
  const c = (key, opts) => t(`childrenPage.${key}`, opts)

  const { data: childrenData, isLoading } = useGetQuery({
    key: 'parent-children',
    url: '/api/v1/auth/parent/confirm-child/list/',
    showErrorMsg: true
  })

  const children = useMemo(() => {
    if (Array.isArray(childrenData)) return childrenData
    if (Array.isArray(childrenData?.data)) return childrenData.data
    if (Array.isArray(childrenData?.results)) return childrenData.results
    return []
  }, [childrenData])

  const subjectName = (child) =>
    (i18n.language === 'ru' ? child.subject_name_ru || child.subject_name_uz : child.subject_name_uz) || ''

  const counts = useMemo(
    () => ({
      all: children.length,
      active: children.filter(isActive).length,
      inactive: children.filter((child) => !isActive(child)).length
    }),
    [children]
  )

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase()
    const list = children.filter((child) => {
      if (filter === 'active' && !isActive(child)) return false
      if (filter === 'inactive' && isActive(child)) return false
      if (!query) return true
      return [child.full_name, child.identification, child.class_num, child.subject_name_uz, child.subject_name_ru]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    })
    const sorted = [...list]
    if (sort === 'login') sorted.sort((a, b) => toTimestamp(b.last_login_time) - toTimestamp(a.last_login_time))
    if (sort === 'name') sorted.sort((a, b) => String(a.full_name).localeCompare(String(b.full_name)))
    if (sort === 'class') sorted.sort((a, b) => (Number(b.class_num) || 0) - (Number(a.class_num) || 0))
    if (sort === 'days') sorted.sort((a, b) => (b.remaining_days || 0) - (a.remaining_days || 0))
    return sorted
  }, [children, filter, search, sort])

  const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE))
  const current = Math.min(page, pages)
  const rows = visible.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)

  useEffect(() => setPage(1), [filter, search, sort])

  const openChild = (id) => router.push(`/dashboard/parent/my-children/${id}`)

  const downloadCertificate = (studentId) => {
    if (!studentId) return
    request
      .post(URLS.downloadCertificate, { student_id: studentId }, { responseType: 'blob' })
      .then((res) => {
        if (res.status !== 200 || !res.data) return
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'Certificate_file.pdf')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      })
      .catch((err) => {
        toast.error(err?.message || err?.data?.message || t('downloadCertificateError'))
      })
  }

  const filterTabs = [
    {
      key: 'all',
      label: c('all'),
      active: 'bg-[#DCE8FF] text-[#1D4ED8]',
      idle: 'bg-[#F1F5FF] text-[#2563EB]',
      count: 'bg-white text-[#2563EB]'
    },
    {
      key: 'active',
      label: c('active'),
      active: 'bg-[#BBF7D0] text-[#15803D]',
      idle: 'bg-[#E7F8EE] text-[#16A34A]',
      count: 'bg-white text-[#16A34A]'
    },
    {
      key: 'inactive',
      label: c('inactive'),
      active: 'bg-[#FECACA] text-[#B91C1C]',
      idle: 'bg-[#FEECEC] text-[#DC2626]',
      count: 'bg-white text-[#DC2626]'
    }
  ]

  const StatusBadge = ({ child }) => (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ${
        isActive(child) ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEE2E2] text-[#DC2626]'
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${isActive(child) ? 'bg-[#16A34A]' : 'bg-[#DC2626]'}`} />
      {isActive(child) ? c('active') : c('inactive')}
    </span>
  )

  const SubjectBadge = ({ child }) => {
    const name = subjectName(child)
    if (!name) return <span className="text-[#94A3B8]">—</span>
    const { Icon, cls } = subjectStyle(child.subject_name_uz)
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${cls}`}>
        <Icon size={15} />
        <span className="max-w-[140px] truncate">{name}</span>
      </span>
    )
  }

  const SubEnd = ({ child }) =>
    child.subscription_end_date ? (
      <div>
        <p className="font-semibold text-[#0F172A] dark:text-white">{child.subscription_end_date}</p>
        {child.remaining_days > 0 ? (
          <span className="mt-1 inline-block rounded-md bg-[#DCFCE7] px-1.5 py-0.5 text-[11px] font-semibold text-[#16A34A]">
            {c('daysLeft', { n: child.remaining_days })}
          </span>
        ) : null}
      </div>
    ) : (
      <span className="text-[#94A3B8]">—</span>
    )

  const DetailsButton = ({ child }) => (
    <button
      type="button"
      onClick={() => openChild(child.id)}
      className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#EAF1FF] px-4 text-sm font-semibold text-[#2563EB] transition hover:bg-[#DCE8FF]"
    >
      <Eye size={17} />
      {c('details')}
    </button>
  )

  return (
    <LayoutAdmin>
      <div className="space-y-5 pb-4">
        {/* Sarlavha: banner rasmi butun kenglik bo'ylab, ustida matn va tugma */}
        <nav className="flex items-center gap-1.5 text-sm text-[#64748B]">
          <button type="button" onClick={() => router.push('/dashboard/parent/home')} className="hover:text-[#2563EB]">
            {c('home')}
          </button>
          <ChevronRight size={14} />
          <span className="font-semibold text-[#0F172A] dark:text-white">{c('title')}</span>
        </nav>
        <section className="relative overflow-hidden rounded-3xl bg-[#DCE9FF]">
          <img
            src="/images/parant-back.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[70%_60%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#EAF2FF] via-[#EAF2FF]/80 to-transparent md:via-[#EAF2FF]/40" />
          <div className="relative flex min-h-[150px] flex-wrap items-center justify-between gap-4 p-5 md:p-7">
            <div className="max-w-xl">
              <h1 className="text-[28px] font-extrabold text-[#0B1B3F]">{c('title')}</h1>
              <p className="mt-1 text-sm text-[#475569]">{c('subtitle')}</p>
            </div>
          </div>
        </section>

        <div className="rounded-3xl border border-[#EEF1F6] bg-white p-4 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.25)] dark:border-[#1F2A3C] dark:bg-[#111A2B] sm:p-5">
          {/* Asboblar paneli */}
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex h-11 min-w-[240px] flex-1 items-center gap-2 rounded-xl border border-[#DCE3F0] px-3.5 focus-within:border-[#2563EB] dark:border-[#26324A] lg:max-w-[460px]">
              <Search size={18} className="text-[#64748B]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={c('search')}
                className="h-full w-full bg-transparent text-sm text-[#0F172A] outline-none placeholder:text-[#94A3B8] dark:text-white"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition ${
                    filter === tab.key ? `${tab.active} ring-2 ring-white` : tab.idle
                  }`}
                >
                  {tab.label}
                  <span
                    className={`flex h-6 min-w-[24px] items-center justify-center rounded-full px-1.5 text-xs font-bold ${tab.count}`}
                  >
                    {counts[tab.key]}
                  </span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#2563EB] px-5 text-sm font-semibold text-white shadow-[0_10px_22px_-12px_rgba(37,99,235,0.9)] transition hover:bg-[#1D4ED8]"
              >
                <Plus size={17} />
                {c('add')}
              </button>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <label className="relative">
                <ArrowDownUp
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                />
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="h-11 cursor-pointer appearance-none rounded-xl border border-[#DCE3F0] bg-white pl-9 pr-9 text-sm font-medium text-[#0F172A] outline-none focus:border-[#2563EB] dark:border-[#26324A] dark:bg-[#111A2B] dark:text-white"
                >
                  <option value="login">{c('sortLogin')}</option>
                  <option value="name">{c('sortName')}</option>
                  <option value="class">{c('sortClass')}</option>
                  <option value="days">{c('sortDays')}</option>
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                />
              </label>
              <div className="flex rounded-xl border border-[#DCE3F0] p-1 dark:border-[#26324A]">
                {[
                  ['list', List, c('listView')],
                  ['grid', LayoutGrid, c('gridView')]
                ].map(([key, Icon, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setView(key)}
                    title={label}
                    aria-label={label}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                      view === key ? 'bg-[#DCE8FF] text-[#2563EB]' : 'text-[#64748B] hover:text-[#2563EB]'
                    }`}
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Kontent */}
          <div className="mt-5">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 animate-pulse rounded-2xl bg-gray-100" />
                ))}
              </div>
            ) : !children.length ? (
              <div className="flex flex-col items-center py-14 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF1FF] text-[#2563EB]">
                  <UserPlus size={28} />
                </span>
                <p className="mt-4 text-lg font-bold text-[#0F172A] dark:text-white">{c('emptyTitle')}</p>
                <p className="mt-1 text-sm text-[#64748B]">{c('emptyText')}</p>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-[#2563EB] px-5 font-semibold text-white hover:bg-[#1D4ED8]"
                >
                  <Plus size={18} />
                  {c('add')}
                </button>
              </div>
            ) : !visible.length ? (
              <p className="py-12 text-center text-sm text-[#64748B]">{c('notFound')}</p>
            ) : view === 'list' ? (
              <div className="overflow-x-auto rounded-2xl border border-[#EEF1F6] dark:border-[#26324A]">
                <table className="w-full min-w-[1080px] text-left text-sm">
                  <thead className="bg-[#F5F8FF] text-[13px] font-semibold text-[#334155] dark:bg-[#0F172A] dark:text-gray-300">
                    <tr>
                      <th className="px-4 py-4">#</th>
                      <th className="px-4 py-4">{c('colChild')}</th>
                      <th className="px-4 py-4">{c('colClass')}</th>
                      <th className="px-4 py-4">{c('colSubject')}</th>
                      <th className="px-4 py-4">{c('colRegistered')}</th>
                      <th className="px-4 py-4">{c('colLastLogin')}</th>
                      <th className="px-4 py-4">{c('colSubEnd')}</th>
                      <th className="px-4 py-4">{c('colStatus')}</th>
                      <th className="px-4 py-4">{c('colActions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((child, index) => {
                      const [loginDate, loginTime] = splitDateTime(child.last_login_time)
                      return (
                        <tr
                          key={child.id}
                          className="border-t border-[#EEF1F6] transition hover:bg-[#FAFBFF] dark:border-[#26324A] dark:hover:bg-[#16213A]"
                        >
                          <td className="px-4 py-4 text-[#64748B]">{(current - 1) * PAGE_SIZE + index + 1}</td>
                          <td className="px-4 py-4">
                            <button
                              type="button"
                              onClick={() => openChild(child.id)}
                              className="flex items-center gap-3 text-left"
                            >
                              <Initials name={child.full_name} className="h-12 w-12 text-base" />
                              <span>
                                <span className="block font-bold text-[#0F172A] hover:text-[#2563EB] dark:text-white">
                                  {child.full_name}
                                </span>
                                <span className="text-xs text-[#64748B]">ID: {child.identification}</span>
                              </span>
                            </button>
                          </td>
                          <td className="px-4 py-4">
                            {child.class_num ? (
                              <span
                                className={`inline-block rounded-lg px-3 py-1.5 text-xs font-semibold ${gradeTone(child.class_num)}`}
                              >
                                {c('grade', { grade: child.class_num })}
                              </span>
                            ) : (
                              <span className="text-[#94A3B8]">—</span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <SubjectBadge child={child} />
                          </td>
                          <td className="px-4 py-4">
                            <p className="font-medium text-[#0F172A] dark:text-white">
                              {child.registration_date || '—'}
                            </p>
                            <p className="text-xs text-[#64748B]">{child.registration_time}</p>
                          </td>
                          <td className="px-4 py-4">
                            <p className="font-medium text-[#0F172A] dark:text-white">{loginDate}</p>
                            <p className="text-xs text-[#64748B]">{loginTime}</p>
                          </td>
                          <td className="px-4 py-4">
                            <SubEnd child={child} />
                          </td>
                          <td className="px-4 py-4">
                            <StatusBadge child={child} />
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <DetailsButton child={child} />
                              <RowMenu label={c('certificate')} onCertificate={() => downloadCertificate(child.id)} />
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {rows.map((child) => {
                  const [loginDate, loginTime] = splitDateTime(child.last_login_time)
                  return (
                    <div
                      key={child.id}
                      className="rounded-2xl border border-[#E3EBFA] bg-gradient-to-br from-[#F5F8FF] via-white to-white p-4 transition hover:shadow-[0_16px_30px_-20px_rgba(37,99,235,0.6)] dark:border-[#26324A] dark:from-[#16213A] dark:via-[#111A2B] dark:to-[#111A2B]"
                    >
                      <div className="flex items-start gap-3">
                        <Initials name={child.full_name} className="h-12 w-12 text-base" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold text-[#0F172A] dark:text-white">{child.full_name}</p>
                          <p className="text-xs text-[#64748B]">ID: {child.identification}</p>
                        </div>
                        <StatusBadge child={child} />
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {child.class_num ? (
                          <span
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${gradeTone(child.class_num)}`}
                          >
                            {c('grade', { grade: child.class_num })}
                          </span>
                        ) : null}
                        <SubjectBadge child={child} />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#EEF1F6] pt-3 text-sm dark:border-[#26324A]">
                        <div>
                          <p className="text-[11px] text-[#64748B]">{c('colLastLogin')}</p>
                          <p className="font-medium text-[#0F172A] dark:text-white">
                            {loginDate} <span className="text-xs text-[#64748B]">{loginTime}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] text-[#64748B]">{c('colSubEnd')}</p>
                          <SubEnd child={child} />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex-1 [&>button]:w-full [&>button]:justify-center">
                          <DetailsButton child={child} />
                        </div>
                        <RowMenu label={c('certificate')} onCertificate={() => downloadCertificate(child.id)} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Pastki qism */}
          {visible.length ? (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#64748B]">{c('total', { n: visible.length })}</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={current <= 1}
                  onClick={() => setPage(current - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5EAF2] text-[#334155] disabled:opacity-40 dark:border-[#26324A] dark:text-white"
                >
                  <ArrowLeft size={17} />
                </button>
                {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    className={`flex h-10 min-w-[40px] items-center justify-center rounded-xl px-2 text-sm font-semibold ${
                      n === current
                        ? 'bg-[#2563EB] text-white'
                        : 'border border-[#E5EAF2] text-[#334155] dark:border-[#26324A] dark:text-white'
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={current >= pages}
                  onClick={() => setPage(current + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5EAF2] text-[#334155] disabled:opacity-40 dark:border-[#26324A] dark:text-white"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <AddChildModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => queryClient.invalidateQueries(['parent-children'])}
      />
      <ModalConfidentiality />
    </LayoutAdmin>
  )
}

export default MyChildren
