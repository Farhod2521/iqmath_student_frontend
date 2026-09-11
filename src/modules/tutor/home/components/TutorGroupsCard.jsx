import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Users2, Plus, MoreVertical } from 'lucide-react'

const GROUP_ICON_BG = ['bg-[#EAF0FF] text-[#5D87FF]', 'bg-[#F1ECFE] text-[#8B5CF6]', 'bg-[#FFF3DD] text-[#F59E0B]', 'bg-[#E7F8EF] text-[#22C55E]']

const progressColor = (percent) => {
  if (percent >= 75) return '#22C55E'
  if (percent >= 50) return '#5D87FF'
  return '#F59E0B'
}

const TutorGroupsCard = ({ groups }) => {
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-white p-3 shadow-sm sm:p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#191C1D]">{t('tutorHome.myGroupsTitle')}</h3>
        <button
          onClick={() => toast(t('tutorHome.comingSoon'))}
          className="text-sm font-semibold text-[#5D87FF] hover:underline"
        >
          {t('tutorHome.viewAll')}
        </button>
      </div>

      <div className="mt-1 flex flex-col divide-y divide-[#F5F5F5]">
        {(groups || []).map((group, index) => {
          const color = progressColor(group.progress)
          return (
            <div key={group.key} className="flex items-center gap-2.5 py-2">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${GROUP_ICON_BG[index % GROUP_ICON_BG.length]}`}
              >
                <Users2 size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#191C1D]">{group.name}</p>
                <p className="text-xs text-[#8A8A8E]">
                  {t('tutorHome.groupsStudentsCount', { count: group.students_count })}
                </p>
              </div>
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
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
                    strokeDasharray={`${(group.progress / 100) * 97.4} 97.4`}
                  />
                </svg>
                <span className="absolute text-[9px] font-bold text-[#191C1D]">{group.progress}%</span>
              </div>
              <button
                onClick={() => toast(t('tutorHome.comingSoon'))}
                className="shrink-0 rounded-lg p-1 text-[#B0B6C9] transition hover:bg-gray-50 hover:text-[#5A6A85]"
              >
                <MoreVertical size={16} />
              </button>
            </div>
          )
        })}
      </div>

      <button
        onClick={() => toast(t('tutorHome.comingSoon'))}
        className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#F1F4FF] py-2 text-sm font-semibold text-[#5D87FF] transition hover:bg-[#E4EAFF]"
      >
        <Plus size={16} />
        {t('tutorHome.createNewGroup')}
      </button>
    </div>
  )
}

export default TutorGroupsCard
