import { useTranslation } from 'react-i18next'

const RANK_STYLES = {
  1: 'bg-[#F59E0B] text-white',
  2: 'bg-[#94A3B8] text-white',
  3: 'bg-[#C2793B] text-white'
}

const HomeTopStudents = ({ topStudents, currentStudent, isLoading }) => {
  const { t } = useTranslation()
  const students = topStudents || []

  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#191C1D]">{t('studentHome.topStudents')}</h3>
        <button className="text-sm font-semibold text-[#5D87FF] hover:underline">{t('studentHome.viewAll')}</button>
      </div>

      <div className="mt-3 flex flex-col gap-2.5">
        {isLoading ? (
          <div className="flex flex-col gap-2.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-full animate-pulse rounded-lg bg-gray-100" />
            ))}
          </div>
        ) : (
          students.map((student, index) => {
            const rank = index + 1
            return (
              <div key={rank} className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    RANK_STYLES[rank] ?? 'bg-[#F5F5F5] text-[#8A8A8E]'
                  }`}
                >
                  {rank}
                </span>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF0FF] text-xs font-bold text-[#5D87FF]">
                  {student.full_name?.charAt(0)}
                </div>
                <p className="flex-1 truncate text-sm font-medium text-[#191C1D]">{student.full_name}</p>
                <p className="text-sm font-bold text-[#191C1D]">{(student.score ?? 0).toLocaleString()}</p>
              </div>
            )
          })
        )}

        <div className="mt-1 flex items-center gap-3 rounded-xl bg-[#EAF0FF] px-2 py-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#5D87FF]">
            {currentStudent?.rank ?? '-'}
          </span>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5D87FF] text-xs font-bold text-white">
            {currentStudent?.name?.charAt(0) ?? t('studentHome.you').charAt(0)}
          </div>
          <p className="flex-1 truncate text-sm font-semibold text-[#191C1D]">{t('studentHome.you')}</p>
          <p className="text-sm font-bold text-[#191C1D]">{(currentStudent?.score ?? 0).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default HomeTopStudents
