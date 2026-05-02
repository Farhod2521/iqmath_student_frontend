import { useScoreStore } from '@/store'
import { Button } from '@heroui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

function NavbarPoints() {
  const router = useRouter()
  const { t } = useTranslation()
  const { scoreData } = useScoreStore()

  return (
    <Button
      isLoading={scoreData.isLoading}
      variant="bordered"
      onPress={() => router.push('/dashboard/student/coins')}
      className="border-[#E9E9E9] rounded-md border shadow-sm flex items-center gap-0.5 min-[400px]:gap-1 sm:gap-2 hover:bg-[#5d87ff] hover:text-white hover:border-white transition-all duration-200 py-0.5 px-1.5 min-[400px]:px-2 sm:px-3 h-7 min-[400px]:h-8 sm:h-9"
    >
      <Image
        src="/icons/coins-logo.svg"
        alt="Coins logo"
        width={12}
        height={12}
        className="min-[400px]:w-3.5 min-[400px]:h-3.5 sm:w-[22px] sm:h-[22px]"
      />
      <p className="text-xs min-[400px]:text-sm sm:text-md font-medium flex gap-0.5 min-[400px]:gap-1">
        {scoreData.score}
        <span className="hidden min-[320px]:block sm:hidden">{t('ball')}</span>
        <span className="hidden sm:block">{t('ball')}</span>
      </p>
    </Button>
  )
}

export default NavbarPoints
