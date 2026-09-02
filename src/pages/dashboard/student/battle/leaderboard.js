import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Zap } from 'lucide-react'
import LayoutAdmin from '@/layout/LayoutAdmin'
import HeaderTitle from '@/components/header-title'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'
import BattlePlayerAvatar from '@/modules/student/battle/components/BattlePlayerAvatar'
import BattleLevelBadge from '@/modules/student/battle/components/BattleLevelBadge'

const BattleLeaderboardPage = () => {
  const { t } = useTranslation()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    request
      .get(URLS.battleLeaderboard, { params: { top_count: 50 } })
      .then((res) => setList(res?.data?.results || []))
      .finally(() => setLoading(false))
  }, [])

  const top3 = list.slice(0, 3)
  const rest = list.slice(3)

  return (
    <LayoutAdmin>
      <div className="py-2">
        <HeaderTitle title={t('battle.leaderboardTitle')} />
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-3 sm:p-5">
        {loading ? (
          <div className="py-10 text-center text-gray-400">{t('loading')}</div>
        ) : !list.length ? (
          <div className="py-10 text-center text-gray-400">{t('noData')}</div>
        ) : (
          <>
            {top3.length ? (
              <div className="flex items-end justify-center gap-3 pb-6 mb-6 border-b border-gray-100 sm:gap-6">
                {top3.map((item, index) => (
                  <div
                    key={item.student_id}
                    className={`flex flex-col items-center text-center p-4 rounded-2xl border ${
                      index === 0
                        ? 'border-amber-300 bg-amber-50 w-36 sm:w-44 order-2'
                        : 'border-gray-200 w-28 sm:w-36 ' + (index === 1 ? 'order-1' : 'order-3')
                    }`}
                  >
                    <span className="mb-2 text-xs font-bold text-gray-400">#{item.rank}</span>
                    <BattlePlayerAvatar name={item.full_name} size={index === 0 ? 64 : 52} />
                    <p className="mt-2 text-sm font-bold text-gray-800 truncate max-w-full">{item.full_name}</p>
                    <p className="mb-2 text-[11px] text-gray-400">
                      {item.class_uz ? `${item.class_uz}-${t('battle.gradeSuffix')}` : ''}
                    </p>
                    <BattleLevelBadge level={item.level} />
                    <p className="flex items-center gap-1 mt-2 text-sm font-extrabold text-gray-800">
                      <Zap size={14} className="text-amber-500" />
                      {item.elo}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            {rest.length ? (
              <div className="divide-y divide-gray-100">
                {rest.map((item) => (
                  <div key={item.student_id} className="flex items-center gap-3 py-3">
                    <span className="w-6 text-sm font-semibold text-center text-gray-400 shrink-0">{item.rank}</span>
                    <BattlePlayerAvatar name={item.full_name} size={36} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.full_name}</p>
                      <p className="text-xs text-gray-400">
                        {item.wins}W / {item.losses}L / {item.draws}D
                      </p>
                    </div>
                    <BattleLevelBadge level={item.level} size="sm" />
                    <span className="flex items-center gap-1 px-3 py-1 text-sm font-bold text-indigo-600 rounded-full shrink-0 bg-indigo-50">
                      <Zap size={13} />
                      {item.elo}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
    </LayoutAdmin>
  )
}

export default BattleLeaderboardPage
