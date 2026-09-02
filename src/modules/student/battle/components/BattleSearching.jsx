import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Swords, User } from 'lucide-react'
import BattlePlayerAvatar from './BattlePlayerAvatar'

const formatElapsed = (seconds) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')
  return `${m}:${s}`
}

const BattleSearching = ({ me, room }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setElapsed((prev) => prev + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  // Cosmetic "match quality" indicator — climbs toward ~95% the longer the
  // search runs, purely to make the wait feel purposeful.
  const matchQuality = Math.min(95, 45 + elapsed * 4)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-1.5 mb-1 text-sm text-gray-400">
        <Swords size={14} className="text-indigo-400" />
        <span>{t('battle.menuLabel')}</span>
        <span>›</span>
        <span className="font-medium text-gray-600">{t('battle.searchingOpponent')}</span>
      </div>
      <p className="mb-6 text-xs text-gray-400">{t('battle.searchingSubtitle')}</p>

      <div className="p-6 text-center bg-white border border-gray-100 rounded-2xl sm:p-10">
        <h2 className="mb-1 text-xl font-extrabold text-gray-900">{t('battle.searchingOpponent')}</h2>
        <p className="mb-8 text-sm text-gray-400">{t('battle.searchingDescription')}</p>

        <div className="flex items-center justify-center gap-4 mb-8 sm:gap-10">
          <div className="flex flex-col items-center w-28 sm:w-36">
            <div className="p-4 mb-3 rounded-2xl bg-indigo-50">
              <BattlePlayerAvatar name={me?.name || 'Siz'} size={56} ringColor="#6366f1" />
            </div>
            <p className="text-sm font-bold text-gray-800">{t('battle.you')}</p>
            {room?.grade ? (
              <span className="px-2 py-0.5 mt-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-600">
                {room.grade}-{t('battle.gradeSuffix')}
              </span>
            ) : null}
            <p className="mt-1 text-xs text-gray-400">
              {me?.is_placement ? t('battle.placement') : `⚡ ${me?.elo ?? '—'}`}
            </p>
          </div>

          <div className="relative flex items-center justify-center w-20 h-20 shrink-0 sm:w-24 sm:h-24">
            <span className="absolute inset-0 rounded-full border-2 border-indigo-300 battle-sonar" style={{ animationDelay: '0s' }} />
            <span className="absolute inset-0 rounded-full border-2 border-indigo-300 battle-sonar" style={{ animationDelay: '0.7s' }} />
            <span className="absolute inset-0 rounded-full border-2 border-indigo-300 battle-sonar" style={{ animationDelay: '1.4s' }} />
            <span className="relative flex items-center justify-center w-16 h-16 text-base font-extrabold text-white rounded-full shadow-lg battle-vs-pulse sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 shadow-indigo-200">
              VS
            </span>
          </div>

          <div className="flex flex-col items-center w-28 sm:w-36">
            <div className="flex items-center justify-center w-16 h-16 mb-3 bg-gray-100 rounded-2xl">
              <User size={28} className="text-gray-300" />
            </div>
            <p className="text-sm font-bold text-gray-400">{t('battle.opponent')}</p>
            <p className="mt-1 text-xs text-gray-400">{t('battle.searchingDots')}</p>
          </div>
        </div>

        <p className="mb-2 text-xs font-semibold text-gray-400">{t('battle.matchQuality')}</p>
        <div className="max-w-xs mx-auto mb-2 h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-700 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600"
            style={{ width: `${matchQuality}%` }}
          />
        </div>
        <p className="mb-6 text-lg font-extrabold text-indigo-600">{matchQuality}%</p>

        <p className="mb-6 text-xs text-gray-400">
          {t('battle.waitTime')}: <span className="font-semibold text-gray-600">{formatElapsed(elapsed)}</span>
        </p>

        <button
          onClick={() => router.push('/dashboard/student/battle')}
          className="px-6 py-2 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50"
        >
          {t('battle.cancelSearch')}
        </button>
      </div>

      <style jsx>{`
        .battle-sonar {
          animation: battle-sonar 2.1s ease-out infinite;
        }
        @keyframes battle-sonar {
          0% {
            transform: scale(0.55);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.9);
            opacity: 0;
          }
        }
        .battle-vs-pulse {
          animation: battle-vs-pulse 1.8s ease-in-out infinite;
        }
        @keyframes battle-vs-pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  )
}

export default BattleSearching
