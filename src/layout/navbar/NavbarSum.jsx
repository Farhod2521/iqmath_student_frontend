import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useScoreStore } from '@/store'

function NavbarSum() {
  const router = useRouter()
  const { t } = useTranslation()
  const { scoreData } = useScoreStore()

  return (
    <button
      onClick={() => router.push('/dashboard/student/coins')}
      className="flex items-center gap-1.5 rounded-full bg-[#F7F8FA] py-1 pl-1 pr-3 transition-colors hover:bg-[#EEF1F6]"
    >
      <Image src="/images/homepage/som.png" alt="So'm" width={28} height={28} className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
      <span className="flex items-baseline gap-1 leading-none">
        <span className="text-sm font-bold text-[#191C1D] sm:text-base">{scoreData.sum ?? 0}</span>
        <span className="text-xs font-medium text-[#8A8A8E]">{t('sum')}</span>
      </span>
    </button>
  )
}

export default NavbarSum
