import CoinsIcon from '@/components/icons/coins'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { useScoreStore } from '@/store'
import CoinConvert from '@/modules/student/coins/CoinConvert'

const CoinsTab = () => {
  const { t } = useTranslation()
  const { scoreData } = useScoreStore()

  return (
    <div>
      <div
        style={{ backgroundImage: `url(/images/bg-img-2.png)` }}
        className="p-4 sm:p-6 rounded-[12px] text-white bg-no-repeat bg-cover relative overflow-hidden"
      >
        <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-row sm:flex-wrap sm:gap-6">
          <div className="min-w-0 sm:w-[180px]">
            <p className="truncate text-xs sm:text-[17px] font-medium">{t('yourballs')}</p>
            <div className="flex items-center gap-2 mt-1.5 mb-2 sm:mt-2">
              <span className="hidden sm:block"><CoinsIcon color="white" /></span>
              <p className="text-base sm:text-[26px] font-semibold leading-tight">
                {get(scoreData, 'score', 0)} {t('ball')}
              </p>
            </div>
          </div>

          <div className="min-w-0 sm:w-[180px]">
            <p className="truncate text-xs sm:text-[17px] font-medium">{t('yourcoins')}</p>
            <div className="flex items-center gap-2 mt-1.5 mb-2 sm:mt-2">
              <span className="hidden sm:block"><CoinsIcon color="white" /></span>
              <p className="text-base sm:text-[26px] font-semibold leading-tight">
                {get(scoreData, 'coin', 0)} {t('coin')}
              </p>
            </div>
          </div>

          <div className="min-w-0 sm:w-[180px]">
            <p className="truncate text-xs sm:text-[17px] font-medium">{t('yoursums')}</p>
            <div className="flex items-center gap-2 mt-1.5 mb-2 sm:mt-2">
              <span className="hidden sm:block"><CoinsIcon color="white" /></span>
              <p className="text-base sm:text-[26px] font-semibold leading-tight">
                {get(scoreData, 'sum', 0)} {t('sum')}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-2 sm:mt-0 text-[13px] sm:text-[17px] text-[#DCDCDD] w-full lg:w-3/5 relative z-10">{t('descballs')}</p>
      </div>

      <CoinConvert />
    </div>
  )
}

export default CoinsTab
