import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { ChevronRight, Plus, Users2 } from 'lucide-react'

const GROUP_ICON_BG = [
  'bg-[#EAF0FF] text-[#5D87FF]',
  'bg-[#F1ECFE] text-[#8B5CF6]',
  'bg-[#FFF3DD] text-[#F59E0B]',
  'bg-[#E7F8EF] text-[#22C55E]'
]

const progressColor = (percent) => {
  if (percent >= 75) return '#22C55E'
  if (percent >= 50) return '#5D87FF'
  return '#F59E0B'
}

const TutorGroupsCard = ({ groups, isLoading }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const items = (groups || []).slice(0, 4)

  const goToGroups = () => router.push('/dashboard/tutor/groups')
  const goToCreate = () => router.push('/dashboard/tutor/groups?create=1')

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#F0F0F0] bg-white p-3 shadow-sm sm:p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#191C1D]">{t('tutorHome.myGroupsTitle')}</h3>
        <button
          onClick={goToGroups}
          className="text-sm font-semibold text-[#5D87FF] hover:underline"
        >
          {t('tutorHome.viewAll')}
        </button>
      </div>

      {isLoading ? (
        <div className="mt-2 flex flex-col gap-2">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="h-12 w-full animate-pulse rounded-lg bg-gray-100" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="mt-3 flex flex-1 flex-col items-center justify-center py-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF0FF] text-[#5D87FF]">
            <Users2 size={22} />
          </span>
          <p className="mt-3 text-sm text-[#8A8A8E]">{t('tutorGroups.emptyTitle')}</p>
        </div>
      ) : (
        <div className="mt-1 flex flex-col divide-y divide-[#F5F5F5]">
          {items.map((group, index) => {
            const percent = Math.round(group.average_score || 0)
            const color = progressColor(percent)

            return (
              <button
                key={group.id}
                onClick={() => router.push(`/dashboard/tutor/groups/${group.id}`)}
                className="group flex items-center gap-2.5 py-2 text-left transition"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    GROUP_ICON_BG[index % GROUP_ICON_BG.length]
                  }`}
                >
                  <Users2 size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-[#191C1D]">{group.name}</span>
                  <span className="block text-xs text-[#8A8A8E]">
                    {t('tutorHome.groupsStudentsCount', { count: group.student_count || 0 })}
                  </span>
                </span>
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                  <svg viewBox="0 0 36 36" className="h-8 w-8 -rotate-90">
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="#F0F0F0" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      stroke={color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${(percent / 100) * 97.4} 97.4`}
                    />
                  </svg>
                  <span className="absolute text-[9px] font-bold text-[#191C1D]">{percent}%</span>
                </span>
                <span className="shrink-0 rounded-lg p-1 text-[#B0B6C9] transition group-hover:text-[#5D87FF]">
                  <ChevronRight size={16} />
                </span>
              </button>
            )
          })}
        </div>
      )}

      <button
        onClick={goToCreate}
        className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-[#F1F4FF] py-2 text-sm font-semibold text-[#5D87FF] transition hover:bg-[#E4EAFF]"
      >
        <Plus size={16} />
        {t('tutorHome.createNewGroup')}
      </button>
    </div>
  )
}

export default TutorGroupsCard
