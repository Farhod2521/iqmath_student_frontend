import React, { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { CalendarDays, GraduationCap, UserCheck, UserRound, Users, UsersRound } from 'lucide-react'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import StudentFilter from '../components/StudentFilter'
import StudentTable from '../components/StudentTable'
import { StatCard, usePupilsText } from '../components/PupilsUi'

const MONTHS = {
  uz: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'],
  ru: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
}

// Kartalar: rol bo'yicha haqiqiy sonlar (student_list `total`)
const STAT_CARDS = [
  {
    key: 'students',
    params: { role: 'student' },
    label: 'totalStudents',
    icon: GraduationCap,
    theme: {
      border: 'border-[#DCE7FF]',
      wash: 'from-[#EEF4FF] to-white',
      icon: 'bg-gradient-to-br from-[#60A5FA] to-[#2563EB]',
      badge: 'bg-[#DBEAFE] text-[#1D4ED8]',
      bar: 'bg-[#2563EB]'
    }
  },
  {
    key: 'activeStudents',
    params: { role: 'student', status: 'active' },
    label: 'activeStudents',
    icon: UserCheck,
    shareOf: 'students',
    theme: {
      border: 'border-[#D1FAE5]',
      wash: 'from-[#ECFDF5] to-white',
      icon: 'bg-gradient-to-br from-[#34D399] to-[#059669]',
      badge: 'bg-[#D1FAE5] text-[#047857]',
      bar: 'bg-[#10B981]'
    }
  },
  {
    key: 'parents',
    params: { role: 'parent' },
    label: 'parents',
    icon: UsersRound,
    theme: {
      border: 'border-[#FCE7F3]',
      wash: 'from-[#FDF2F8] to-white',
      icon: 'bg-gradient-to-br from-[#F472B6] to-[#DB2777]',
      badge: 'bg-[#FCE7F3] text-[#BE185D]',
      bar: 'bg-[#EC4899]'
    }
  },
  {
    key: 'tutors',
    params: { role: 'tutor' },
    label: 'tutors',
    icon: UserRound,
    theme: {
      border: 'border-[#EDE9FE]',
      wash: 'from-[#F5F3FF] to-white',
      icon: 'bg-gradient-to-br from-[#A78BFA] to-[#7C3AED]',
      badge: 'bg-[#EDE9FE] text-[#6D28D9]',
      bar: 'bg-[#8B5CF6]'
    }
  },
  {
    key: 'mentors',
    params: { role: 'teacher' },
    label: 'mentors',
    icon: Users,
    theme: {
      border: 'border-[#FFEDD5]',
      wash: 'from-[#FFF7ED] to-white',
      icon: 'bg-gradient-to-br from-[#FDBA74] to-[#F97316]',
      badge: 'bg-[#FFEDD5] text-[#C2410C]',
      bar: 'bg-[#F97316]'
    }
  }
]

function Students() {
  const { i18n } = useTranslation()
  const tp = usePupilsText()
  const router = useRouter()
  const [filterData, setFilterData] = useState(null)
  const [isExportingAll, setIsExportingAll] = useState(false)
  const [studentsData, setStudentsData] = useState([])
  const [studentsTotal, setStudentsTotal] = useState(0)
  const [counts, setCounts] = useState(null)

  useEffect(() => {
    if (!router.isReady) return

    const { role, status, lang } = router.query
    const hasQuery = Object.keys(router.query).length > 0

    // Routerdan filtr kelgan bo'lsa — faqat shuni ishlatamiz
    const initialFilters = hasQuery
      ? {
          search: '',
          class_num: '',
          subject_name: '',
          ...(role && { role }),
          ...(status && { status }),
          ...(lang && { lang }),
          device: ''
        }
      : {
          search: '',
          class_num: '',
          subject_name: '',
          role: 'student',
          status: 'active',
          lang: '',
          device: ''
        }

    setFilterData(initialFilters)
  }, [router.isReady, router.query])

  // Rollar bo'yicha sonlar — har biri uchun bitta yengil so'rov (size=1)
  useEffect(() => {
    let alive = true
    Promise.all(
      STAT_CARDS.map((card) =>
        request
          .get(URLS.studentList, { params: { page: 1, size: 1, ...card.params } })
          .then((res) => [card.key, res.data?.total || 0])
          .catch(() => [card.key, 0])
      )
    ).then((entries) => {
      if (alive) setCounts(Object.fromEntries(entries))
    })
    return () => {
      alive = false
    }
  }, [])

  const handleFilterChange = useCallback((newFilters) => {
    setFilterData(newFilters)
  }, [])

  const handleExportStart = useCallback(() => {
    setIsExportingAll(true)
  }, [])

  const handleExportEnd = useCallback(() => {
    setIsExportingAll(false)
  }, [])

  const handleStudentsDataChange = useCallback((data, total) => {
    setStudentsData(data)
    setStudentsTotal(total ?? data.length)
  }, [])

  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const now = new Date()
  const todayLabel = `${tp('today')}: ${now.getDate()} ${MONTHS[lang][now.getMonth()]}, ${now.getFullYear()}`
  const allUsers = counts ? counts.students + counts.parents + counts.tutors + counts.mentors : 0

  const shareOf = (card) => {
    if (!counts) return '—'
    const base = card.shareOf ? counts[card.shareOf] : allUsers
    const percent = base ? Math.round((counts[card.key] * 100) / base) : 0
    return `${percent}% ${tp('share')}`
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Sarlavha */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[26px] font-extrabold leading-tight text-[#0F1B3D] sm:text-[30px]">
            {lang === 'ru' ? 'Пользователи' : 'Foydalanuvchilar'}
          </h1>
          <p className="mt-1 text-sm text-[#5B6478]">{tp('subtitle')}</p>
        </div>
        <span className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#E3E8F1] bg-white px-4 text-sm font-semibold text-[#0F1B3D] shadow-sm">
          <CalendarDays size={17} className="text-[#2563EB]" />
          {todayLabel}
        </span>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {STAT_CARDS.map((card) => (
          <StatCard
            key={card.key}
            icon={card.icon}
            label={tp(card.label)}
            value={counts?.[card.key]}
            share={shareOf(card)}
            theme={card.theme}
            loading={!counts}
          />
        ))}
      </div>

      {/* Filtr va jadval — bitta oq kartada */}
      <div className="rounded-2xl border border-[#EEF1F6] bg-white shadow-[0_10px_30px_-24px_rgba(15,27,61,0.45)]">
        <StudentFilter
          filterData={filterData}
          onFilterChange={handleFilterChange}
          isExportingAll={isExportingAll}
          onExportStart={handleExportStart}
          onExportEnd={handleExportEnd}
          studentsData={studentsData}
          studentsTotal={studentsTotal}
        />
        <StudentTable
          filterData={filterData}
          isExportingAll={isExportingAll}
          onExportStart={handleExportStart}
          onExportEnd={handleExportEnd}
          onStudentsDataChange={handleStudentsDataChange}
        />
      </div>
    </div>
  )
}

export default Students
