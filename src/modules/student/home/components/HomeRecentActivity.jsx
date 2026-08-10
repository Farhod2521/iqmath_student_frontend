import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { BookOpen, CheckCircle2 } from 'lucide-react'
import { get } from 'lodash'

const HomeRecentActivity = ({ activities, isLoading }) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const items = activities || []

  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#191C1D]">{t('studentHome.recentActivity')}</h3>
        <button
          onClick={() => router.push('/dashboard/student/diagnostics/history')}
          className="text-sm font-semibold text-[#5D87FF] hover:underline"
        >
          {t('studentHome.viewAll')}
        </button>
      </div>

      {isLoading ? (
        <div className="mt-3 flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 w-full animate-pulse rounded-lg bg-gray-100" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="mt-4 text-sm text-[#8A8A8E]">{t('studentHome.noRecentActivity')}</p>
      ) : (
        <div className="mt-3 flex flex-col divide-y divide-[#F5F5F5]">
          {items.map((activity) => {
            const isMastered = activity.score >= 80
            const Icon = isMastered ? CheckCircle2 : BookOpen
            const iconBg = isMastered ? 'bg-[#E7F8EF]' : 'bg-[#EAF0FF]'
            const iconColor = isMastered ? 'text-[#22C55E]' : 'text-[#5D87FF]'

            return (
              <div key={activity.topic_id} className="flex items-center gap-3 py-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
                  <Icon size={16} className={iconColor} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#191C1D]">
                    {get(activity, `topic_name_${lang}`, '')}
                  </p>
                  <p className="truncate text-xs text-[#8A8A8E]">
                    {get(activity, `subject_name_${lang}`, '')} • {activity.score}% {t('result')}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-xs text-[#8A8A8E]">{activity.completed_at}</span>
                  <div className="flex items-center gap-1">
                    {activity.ball_earned > 0 && (
                      <span className="rounded-md bg-[#E7F8EF] px-1.5 py-0.5 text-[11px] font-semibold text-[#22C55E]">
                        +{activity.ball_earned} {t('ball')}
                      </span>
                    )}
                    {activity.coin_earned > 0 && (
                      <span className="rounded-md bg-[#FFF7E6] px-1.5 py-0.5 text-[11px] font-semibold text-[#F59E0B]">
                        +{activity.coin_earned} {t('coin')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default HomeRecentActivity
