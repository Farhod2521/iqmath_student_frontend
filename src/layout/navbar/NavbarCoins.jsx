import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useScoreStore } from '@/store'

function NavbarCoins() {
  const router = useRouter()
  const { t } = useTranslation()
  const { scoreData } = useScoreStore()

  return (
    <button
      onClick={() => router.push('/dashboard/student/coins')}
      className="flex min-w-0 items-center justify-center gap-1 rounded-full bg-[#F7F8FA] py-1 pl-1 pr-2 transition-colors hover:bg-[#EEF1F6] sm:gap-1.5 sm:pr-3"
    >
      <Image
        src="/images/homepage/tanga.png"
        alt="Tanga"
        width={28}
        height={28}
        className="h-6 w-6 shrink-0 object-contain sm:h-7 sm:w-7"
      />
      <span className="flex min-w-0 items-baseline gap-0.5 leading-none sm:gap-1">
        <span className="text-sm font-bold text-[#191C1D] sm:text-base">{scoreData.coin}</span>
        <span className="truncate text-[11px] font-medium text-[#8A8A8E] sm:text-xs">{t('coin')}</span>
      </span>
    </button>
  )
}

export default NavbarCoins
