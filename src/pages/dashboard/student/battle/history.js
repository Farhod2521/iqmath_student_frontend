import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Swords, Trophy, XCircle, Percent } from 'lucide-react'
import LayoutAdmin from '@/layout/LayoutAdmin'
import HeaderTitle from '@/components/header-title'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'
import BattlePlayerAvatar from '@/modules/student/battle/components/BattlePlayerAvatar'
import BattleLevelBadge from '@/modules/student/battle/components/BattleLevelBadge'

const RESULT_LABEL = { win: "G'alaba", loss: 'Mag`lubiyat', draw: 'Durrang' }
const RESULT_COLOR = { win: 'text-emerald-500 bg-emerald-50', loss: 'text-red-500 bg-red-50', draw: 'text-gray-500 bg-gray-100' }

const StatTile = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl">
    <div className="flex items-center justify-center w-10 h-10 text-indigo-500 rounded-lg bg-indigo-50 shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-lg font-extrabold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  </div>
)

const BattleHistoryPage = () => {
  const { t } = useTranslation()
  const [history, setHistory] = useState(null)
  const [eloSeries, setEloSeries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([request.get(URLS.battleHistory), request.get(URLS.battleEloHistory)])
      .then(([historyRes, eloRes]) => {
        setHistory(historyRes?.data)
        const rows = eloRes?.data?.results || []
        setEloSeries(
          rows.map((row, idx) => ({
            match: idx + 1,
            elo: row.elo_after,
            date: row.created_at ? new Date(row.created_at).toLocaleDateString() : ''
          }))
        )
      })
      .finally(() => setLoading(false))
  }, [])

  const stats = history?.stats

  return (
    <LayoutAdmin>
      <div className="py-2">
        <HeaderTitle title={t('battle.historyTitle')} />
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-400">{t('loading')}</div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatTile icon={<Swords size={18} />} label={t('battle.totalMatches')} value={stats?.total_matches ?? 0} />
            <StatTile icon={<Trophy size={18} />} label={t('battle.wins')} value={stats?.wins ?? 0} />
            <StatTile icon={<XCircle size={18} />} label={t('battle.losses')} value={stats?.losses ?? 0} />
            <StatTile icon={<Percent size={18} />} label={t('battle.winRate')} value={`${stats?.win_rate ?? 0}%`} />
          </div>

          <div className="p-4 bg-white border border-gray-100 rounded-xl sm:p-5">
            <p className="mb-4 text-sm font-bold text-gray-700">{t('battle.eloHistory')}</p>
            <div className="h-56">
              {eloSeries.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={eloSeries} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="#E9EEF8" />
                    <XAxis dataKey="match" tickLine={false} axisLine={false} tick={{ fill: '#7C8FAC', fontSize: 11 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#7C8FAC', fontSize: 11 }} />
                    <Tooltip />
                    <Line dataKey="elo" name="ELO" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-gray-300">{t('noData')}</div>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl">
            <p className="px-4 pt-4 mb-2 text-sm font-bold text-gray-700 sm:px-5">{t('battle.matchHistory')}</p>
            <div className="divide-y divide-gray-100">
              {(history?.results || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                  <BattlePlayerAvatar name={item.opponent?.name || '?'} size={36} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.opponent?.name || '—'}</p>
                    <p className="text-xs text-gray-400 truncate">{(item.subjects || []).join(', ')}</p>
                  </div>
                  <BattleLevelBadge level={item.opponent?.level} size="sm" />
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${RESULT_COLOR[item.result] || ''}`}
                  >
                    {RESULT_LABEL[item.result] || item.result}
                  </span>
                  {item.is_placement && !item.is_placement_reveal ? (
                    <span className="text-xs font-semibold text-indigo-400 shrink-0 w-16 text-right">
                      {t('battle.placement')}
                    </span>
                  ) : (
                    <span
                      className={`text-sm font-bold shrink-0 w-12 text-right ${
                        item.elo_change > 0 ? 'text-emerald-500' : item.elo_change < 0 ? 'text-red-500' : 'text-gray-400'
                      }`}
                    >
                      {item.elo_change > 0 ? '+' : ''}
                      {item.elo_change}
                    </span>
                  )}
                </div>
              ))}
              {!history?.results?.length ? <div className="py-10 text-center text-gray-400">{t('noData')}</div> : null}
            </div>
          </div>
        </div>
      )}
    </LayoutAdmin>
  )
}

export default BattleHistoryPage
