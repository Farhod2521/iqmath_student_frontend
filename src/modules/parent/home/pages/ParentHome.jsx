import { useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import AddChildModal from '@/modules/parent/children/components/AddChildModal'
import ModalConfidentiality from '@/modules/student/subjects/components/modal/ModalConfidentiality'
import { ParentHero } from '../dashboard/HeroAndStats'
import { ChildrenCard, RecentCard, SubjectsResultCard } from '../dashboard/MiddleRow'
import { AchievementsCard, TopTopicsCard } from '../dashboard/BottomRow'

/** Ota-ona bosh sahifasi: barcha ma'lumot bitta API'dan (parent/dashboard) olinadi */
const ParentHome = () => {
  const queryClient = useQueryClient()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [period, setPeriod] = useState('all')

  const {
    data: response,
    isLoading,
    isError
  } = useGetQuery({
    key: KEYS.parentDashboard,
    url: URLS.parentDashboard,
    params: { period },
    refetchOnMount: true
  })

  // Zaxira: dashboard API ishlamasa (masalan, backend hali yangilanmagan), farzandlar
  // eski ro'yxat API'sidan olinadi — sahifa bo'sh qolmaydi
  const { data: childrenResponse } = useGetQuery({
    key: 'parent-children',
    url: '/api/v1/auth/parent/confirm-child/list/',
    showErrorMsg: false
  })

  const data = useMemo(() => {
    const dashboard = response?.data
    if (dashboard?.summary) return dashboard
    const list = Array.isArray(childrenResponse?.data) ? childrenResponse.data : []
    const subjects = []
    list.forEach((child) => {
      if (child.subject_name_uz && !subjects.some((s) => s.name_uz === child.subject_name_uz)) {
        subjects.push({ name_uz: child.subject_name_uz, name_ru: child.subject_name_ru })
      }
    })
    return {
      summary: {
        children_count: list.length,
        subjects,
        activity: { percent: 0, delta: null },
        solved: { count: 0, delta: null }
      },
      children: list.map((child) => ({
        id: child.id,
        full_name: child.full_name,
        class_name: child.class_num,
        is_active: typeof child.remaining_days === 'number' ? child.remaining_days > 0 : !!child.status,
        subjects: []
      })),
      subjects_overall: [],
      activity_days: [],
      recent: [],
      top_topics: [],
      achievements: []
    }
  }, [response, childrenResponse])

  const handleAddChildSuccess = () => {
    queryClient.invalidateQueries([KEYS.parentDashboard])
    queryClient.invalidateQueries(['parent-children'])
  }

  if (isLoading && !isError && !response) {
    return (
      <div className="flex flex-col gap-4 pb-4">
        <div className="h-[230px] animate-pulse rounded-3xl bg-[#EAF1FF]" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 pb-4">
      <ParentHero data={data} />

      {/* Chapda 2×2 kartalar, o'ng chetda "Fanlar bo'yicha natija" ikki qator bo'ylab */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="xl:col-start-1 xl:row-start-1">
          <ChildrenCard items={data?.children} onAddChild={() => setIsAddModalOpen(true)} />
        </div>
        <div className="xl:col-start-2 xl:row-start-1">
          <RecentCard items={data?.recent} />
        </div>
        <div className="xl:col-start-1 xl:row-start-2">
          <TopTopicsCard items={data?.top_topics} />
        </div>
        <div className="xl:col-start-2 xl:row-start-2">
          <AchievementsCard items={data?.achievements} child={data?.achievements_child} />
        </div>
        <div className="md:col-span-2 xl:col-span-1 xl:col-start-3 xl:row-span-2 xl:row-start-1">
          <SubjectsResultCard items={data?.subjects_overall} period={period} onPeriod={setPeriod} />
        </div>
      </div>

      <AddChildModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddChildSuccess}
      />
      <ModalConfidentiality />
    </div>
  )
}

export default ParentHome
