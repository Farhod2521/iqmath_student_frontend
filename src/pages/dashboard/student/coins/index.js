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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4 lg:gap-x-[24px]">
        <div
          style={{ backgroundImage: `url(/images/bg-img-2.png)` }}
          className="
      col-span-12 
      p-6 
      rounded-[12px] 
      text-white 
      bg-no-repeat bg-cover 
      relative 
      overflow-hidden
    "
        >
          {/* Info blocks */}
          <div
            className="
        flex flex-col 
        sm:flex-row 
        sm:flex-wrap 
        gap-6 
        mb-6
      "
          >
            {/* Ball */}
            <div className="w-full sm:w-[180px]">
              <p className="text-[16px] sm:text-[17px] font-medium">{t('yourballs')}</p>
              <div className="flex items-center gap-2 mt-2 mb-2">
                <CoinsIcon color="white" />
                <p className="text-[22px] sm:text-[26px] font-semibold">
                  {get(coins, 'data.score')} {t('ball')}
                </p>
              </div>
            </div>

            {/* Coins */}
            <div className="w-full sm:w-[180px]">
              <p className="text-[16px] sm:text-[17px] font-medium">{t('yourcoins')}</p>
              <div className="flex items-center gap-2 mt-2 mb-2">
                <CoinsIcon color="white" />
                <p className="text-[22px] sm:text-[26px] font-semibold">
                  {get(scoreData, 'coin', 0)} {t('coin')}
                </p>
              </div>
            </div>

            {/* Sums */}
            <div className="w-full sm:w-[180px]">
              <p className="text-[16px] sm:text-[17px] font-medium">{t('yoursums')}</p>
              <div className="flex items-center gap-2 mt-2 mb-2">
                <CoinsIcon color="white" />
                <p className="text-[22px] sm:text-[26px] font-semibold">
                  {get(scoreData, 'sum', 0)} {t('sum')}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-[15px] sm:text-[17px] text-[#DCDCDD] w-full lg:w-3/5">{t('descballs')}</p>

          {/* Images */}
          <Image
            src={'/images/wallet-img-1.png'}
            alt="wallet-img"
            width={254}
            height={266}
            className="absolute right-0 bottom-0 hidden sm:block"
          />

          <Image
            src={'/images/wallet-img-2.png'}
            alt="wallet-img"
            width={153}
            height={159}
            className="absolute right-[140px] bottom-0 hidden sm:block"
          />

          <Image
            src={'/images/wallet-img-3.png'}
            alt="wallet-img"
            width={90}
            height={90}
            className="absolute right-[160px] top-0 hidden sm:block"
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
