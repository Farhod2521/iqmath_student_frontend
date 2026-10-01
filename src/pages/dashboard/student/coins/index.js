import CoinsIcon from '@/components/icons/coins'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import 'swiper/css'
import 'swiper/css/navigation'
import { useSession } from 'next-auth/react'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useGetQuery } from '@/hooks'
import { get } from 'lodash'
import { useScoreStore } from '@/store'
import LayoutAdmin from '@/layout/LayoutAdmin'
import CoinConvert from '@/modules/student/coins/CoinConvert'
import HeaderTitle from '@/components/header-title'

const Index = () => {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const { scoreData } = useScoreStore()

  const { data: coins, isLoading: coinsLoading } = useGetQuery({
    key: KEYS.coins,
    url: URLS.coins,
    // headers: {
    //   Authorization: `Bearer ${session?.accessToken}`
    // },
    enabled: !!session?.accessToken && false
  })

  return (
    <LayoutAdmin>
      <div className="mb-4">
        <HeaderTitle title={t('points')} />
      </div>
      <div>
        <div
          style={{ backgroundImage: `url(/images/bg-img-2.png)` }}
          className="relative overflow-hidden rounded-[12px] bg-cover bg-no-repeat p-4 text-white sm:p-6"
        >
          {/* Info blocks */}
          <div
            className="mb-3 grid grid-cols-3 gap-3 sm:mb-6 sm:flex sm:flex-row sm:flex-wrap sm:gap-6"
          >
            {/* Ball */}
            <div className="relative z-10 min-w-0 sm:w-[180px]">
              <p className="truncate text-xs sm:text-[17px] font-medium">{t('yourballs')}</p>
              <div className="flex items-center gap-2 mt-1.5 mb-2 sm:mt-2">
                <span className="hidden sm:block"><CoinsIcon color="white" /></span>
                <p className="text-base sm:text-[26px] font-semibold leading-tight">
                  {get(scoreData, 'score', 0)} {t('ball')}
                </p>
              </div>
            </div>

            {/* Coins */}
            <div className="relative z-10 min-w-0 sm:w-[180px]">
              <p className="truncate text-xs sm:text-[17px] font-medium">{t('yourcoins')}</p>
              <div className="flex items-center gap-2 mt-1.5 mb-2 sm:mt-2">
                <span className="hidden sm:block"><CoinsIcon color="white" /></span>
                <p className="text-base sm:text-[26px] font-semibold leading-tight">
                  {get(scoreData, 'coin', 0)} {t('coin')}
                </p>
              </div>
            </div>

            {/* Sums */}
            <div className="relative z-10 min-w-0 sm:w-[180px]">
              <p className="truncate text-xs sm:text-[17px] font-medium">{t('yoursums')}</p>
              <div className="flex items-center gap-2 mt-1.5 mb-2 sm:mt-2">
                <span className="hidden sm:block"><CoinsIcon color="white" /></span>
                <p className="text-base sm:text-[26px] font-semibold leading-tight">
                  {get(scoreData, 'sum', 0)} {t('sum')}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="relative z-10 text-[13px] sm:text-[17px] text-[#DCDCDD] w-full lg:w-3/5">{t('descballs')}</p>

          {/* Images */}
          <Image
            src={'/images/wallet-img-1.png'}
            alt="wallet-img"
            width={254}
            height={266}
            className="absolute right-0 bottom-0 hidden md:block"
          />

          <Image
            src={'/images/wallet-img-2.png'}
            alt="wallet-img"
            width={153}
            height={159}
            className="absolute right-[140px] bottom-0 hidden lg:block"
          />

          <Image
            src={'/images/wallet-img-3.png'}
            alt="wallet-img"
            width={90}
            height={90}
            className="absolute right-[160px] top-0 hidden lg:block"
          />

          <Image
            src={'/images/wallet-img-4.png'}
            alt="wallet-img"
            width={41}
            height={41}
            className="absolute right-[320px] top-5 hidden lg:block"
          />
        </div>
      </div>

      <CoinConvert />
    </LayoutAdmin>
  )
}

export default Index
