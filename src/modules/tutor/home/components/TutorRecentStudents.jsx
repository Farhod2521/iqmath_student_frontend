import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { UserPlus } from 'lucide-react'

const initialsOf = (name) =>
  (name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || '?'

const AVATAR_COLORS = ['#5D87FF', '#8B5CF6', '#22C55E', '#F59E0B', '#EC4899']

const TutorRecentStudents = ({ students, isLoading }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const items = (students || []).slice(0, 5)

  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-white p-3 shadow-sm sm:p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#191C1D]">{t('tutorHome.recentStudentsTitle')}</h3>
        <button
          onClick={() => router.push('/dashboard/tutor/referal')}
          className="text-sm font-semibold text-[#5D87FF] hover:underline"
        >
          {t('tutorHome.viewAll')}
        </button>
      </div>

      {isLoading ? (
        <div className="mt-3 flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 w-full animate-pulse rounded-lg bg-gray-100" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="mt-4 flex flex-col items-center py-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF0FF]">
            <UserPlus size={22} className="text-[#5D87FF]" />
          </div>
          <p className="mt-3 text-sm text-[#8A8A8E]">{t('tutorHome.recentStudentsEmpty')}</p>
        </div>
      ) : (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[420px] text-left">
            <thead>
              <tr className="text-[11px] uppercase text-[#8A8A8E]">
                <th className="pb-2 font-semibold">#</th>
                <th className="pb-2 font-semibold">{t('tutorHome.tableColStudent')}</th>
                <th className="pb-2 font-semibold">{t('tutorHome.tableColBonus')}</th>
                <th className="pb-2 font-semibold">{t('tutorHome.tableColDate')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F5]">
              {items.map((student, index) => (
                <tr key={student.id ?? index}>
                  <td className="py-2 text-sm text-[#8A8A8E]">{index + 1}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
                      >
                        {initialsOf(student.student_name)}
                      </span>
                      <span className="truncate text-sm font-semibold text-[#191C1D]">
                        {student.student_name || '-'}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 text-sm text-[#5A6A85]">{student.bonus_amount ?? '-'}</td>
                  <td className="py-2 text-sm text-[#5A6A85]">{student.used_at || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default TutorRecentStudents
