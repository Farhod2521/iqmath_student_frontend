import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { ChevronRight, Star, Trophy } from 'lucide-react'
import { useScoreStore } from '@/store'
import { cardClass } from './utils'

/** Hisob-kitob: o'quvchining ballari, tangalari va mavzuni qayta o'rganishga havola */
function BalanceCard({ subjectId }) {
  const { t } = useTranslation()
  const router = useRouter()
  const { scoreData } = useScoreStore()

  return (
    <div className={`${cardClass} p-5`}>
      <h3 className="mb-4 text-lg font-bold text-[#191C1D] dark:text-white">{t('mistakes.balance')}</h3>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => router.push('/dashboard/student/ball-coins-history')}
          className="flex items-center gap-3 rounded-2xl bg-[#F1F5FF] p-3 text-left dark:bg-[#1A2436]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#60A5FA] to-[#2563EB] text-white">
            <Star size={20} className="fill-current" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs text-[#6B7385]">{t('mistakes.points')}</span>
            <span className="text-lg font-bold text-[#191C1D] dark:text-white">
              {scoreData?.score ?? 0} <span className="text-sm font-semibold">{t('mistakes.pointsUnit')}</span>
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => router.push('/dashboard/student/coins')}
          className="flex items-center gap-3 rounded-2xl bg-[#FFF8E6] p-3 text-left dark:bg-[#2A2414]"
        >
          <Image
            src="/images/homepage/tanga.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 object-contain"
          />
          <span className="text-lg font-bold text-[#191C1D] dark:text-white">
            {scoreData?.coin ?? 0} <span className="text-sm font-semibold">{t('mistakes.coinsUnit')}</span>
          </span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => router.push(`/dashboard/student/subjects/${subjectId}`)}
        className="mt-4 flex w-full items-center gap-3 rounded-2xl bg-[#FFFAEB] p-4 text-left transition hover:bg-[#FFF3D1] dark:bg-[#2A2414]"
      >
        <Trophy size={30} className="shrink-0 fill-[#FBBF24] text-[#F59E0B]" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-[#191C1D] dark:text-white">{t('mistakes.improveTitle')}</span>
          <span className="block text-xs text-[#6B7385]">{t('mistakes.improveText')}</span>
        </span>
        <ChevronRight size={18} className="shrink-0 text-[#6B7385]" />
      </button>
    </div>
  )
}

export default BalanceCard
