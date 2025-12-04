import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Button } from '@heroui/react'
import { useScoreStore } from '@/store'
import { SiWebmoney } from 'react-icons/si'

function NavbarSum() {
  const router = useRouter()
  const { t } = useTranslation()
  const { scoreData } = useScoreStore()

  return (
    <Button
      isLoading={scoreData.isLoading}
      variant="bordered"
      onPress={() => router.push('/dashboard/student/coins')}
      className="
      border-[#E9E9E9]
        rounded-md border shadow-sm
        flex items-center gap-1 sm:gap-2
        hover:bg-[#5d87ff] hover:text-white hover:border-white
        transition-all duration-200
         py-1 px-3 h-8 sm:h-9 
      "
    >
      <SiWebmoney size={16} className="text-[#FDA001] sm:size-5" />

      <p className="text-sm sm:text-md font-medium flex gap-1">
        {scoreData.sum ?? 0} <span className="hidden sm:block">{t('sum')}</span>
      </p>
    </Button>
  )
}


export default NavbarSum
