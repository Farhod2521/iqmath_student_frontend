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
        className="p-6 rounded-[12px] text-white bg-no-repeat bg-cover relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6">
          <div className="w-full sm:w-[180px]">
            <p className="text-[16px] sm:text-[17px] font-medium">{t('yourballs')}</p>
            <div className="flex items-center gap-2 mt-2 mb-2">
              <CoinsIcon color="white" />
              <p className="text-[22px] sm:text-[26px] font-semibold">
                {get(scoreData, 'score', 0)} {t('ball')}
              </p>
            </div>
          </div>

          <div className="w-full sm:w-[180px]">
            <p className="text-[16px] sm:text-[17px] font-medium">{t('yourcoins')}</p>
            <div className="flex items-center gap-2 mt-2 mb-2">
              <CoinsIcon color="white" />
              <p className="text-[22px] sm:text-[26px] font-semibold">
                {get(scoreData, 'coin', 0)} {t('coin')}
              </p>
            </div>
          </div>

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

        <p className="text-[15px] sm:text-[17px] text-[#DCDCDD] w-full lg:w-3/5 relative z-10">{t('descballs')}</p>
      </div>

      <CoinConvert />
    </div>
  )
}

export default CoinsTab
