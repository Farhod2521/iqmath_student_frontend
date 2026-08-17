import { useScoreStore } from '@/store'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

function NavbarPoints() {
  const router = useRouter()
  const { t } = useTranslation()
  const { scoreData } = useScoreStore()

  return (
    <button
      onClick={() => router.push('/dashboard/student/coins')}
      className="flex items-center gap-1.5 rounded-full bg-[#F7F8FA] py-1 pl-1 pr-3 transition-colors hover:bg-[#EEF1F6]"
    >
      <Image
        src="/images/homepage/ball.png"
        alt="Ball"
        width={28}
        height={28}
        className="h-6 w-6 shrink-0 object-contain sm:h-7 sm:w-7"
      />
      <span className="flex items-baseline gap-1 leading-none">
        <span className="text-sm font-bold text-[#191C1D] sm:text-base">{scoreData.score}</span>
        <span className="text-xs font-medium text-[#8A8A8E]">{t('ball')}</span>
      </span>
    </button>
  )
}

export default NavbarPoints
