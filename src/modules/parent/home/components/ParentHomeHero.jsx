import { useTranslation } from 'react-i18next'
import { UserPlus } from 'lucide-react'
import backgroundImg from '@/assets/parent/background.png'

const ParentHomeHero = ({ fullName, onAddChild }) => {
  const { t } = useTranslation()

  return (
    <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl bg-white px-6 py-7 sm:min-h-[320px] sm:px-9 sm:py-10">
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: `url(${backgroundImg.src})`, backgroundPosition: 'right 68%' }}
      />

      <div className="relative flex h-full max-w-lg flex-col justify-center">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-[#5A6A85] backdrop-blur-sm">
          {t('parentHome.welcome')} 👋
        </span>

        <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#191C1D] sm:text-4xl">
          {fullName || t('parentHome.you')}
        </h2>
        <p className="mt-2 max-w-md text-sm text-[#5A6A85] sm:text-base">{t('parentHome.heroDescription')}</p>

        <button
          onClick={onAddChild}
          className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-xl bg-[#5D87FF] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#5D87FF]/25 transition hover:bg-[#4570EA]"
        >
          <UserPlus size={20} />
          {t('childAdd')}
        </button>
      </div>
    </div>
  )
}

export default ParentHomeHero
