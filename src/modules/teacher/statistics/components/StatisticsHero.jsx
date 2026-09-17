import { useTranslation } from 'react-i18next'
import backgroundImg from '@/assets/images/mentor/background.png'

const StatisticsHero = () => {
  const { t } = useTranslation()

  return (
    <div className="relative mb-8 min-h-[200px] overflow-hidden rounded-2xl sm:min-h-[240px]">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImg.src})`, backgroundPosition: 'right center' }}
      />

      <div className="relative flex h-full flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[#5A6A85] backdrop-blur-sm">
          {t('platformStatisticsPill')}
        </span>
        <h1 className="mt-3 max-w-md text-3xl font-extrabold leading-tight text-[#191C1D] sm:text-4xl">
          {t('statistics')}
        </h1>
        <p className="mt-2 max-w-md text-sm text-[#5A6A85] sm:text-base">{t('statisticsHeroDescription')}</p>
      </div>
    </div>
  )
}

export default StatisticsHero
