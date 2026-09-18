import { useTranslation } from 'react-i18next'
import { ArrowRight, PlayCircle, Video, TrendingUp, Sparkles, ChevronRight } from 'lucide-react'
import backgroundImg from '@/assets/images/backgrounds/subject-bacground.png'

const QUICK_LINKS = [
  { icon: Video, color: '#5D87FF', bg: 'bg-[#5D87FF]/20', titleKey: 'subjectsHeroLink1Title', subKey: 'subjectsHeroLink1Sub' },
  { icon: TrendingUp, color: '#13DEB9', bg: 'bg-[#13DEB9]/20', titleKey: 'subjectsHeroLink2Title', subKey: 'subjectsHeroLink2Sub' },
  { icon: Sparkles, color: '#F59E0B', bg: 'bg-[#F59E0B]/20', titleKey: 'subjectsHeroLink3Title', subKey: 'subjectsHeroLink3Sub' }
]

const SubjectsBanner = () => {
  const { t } = useTranslation()

  return (
    <div className="relative w-full overflow-hidden rounded-3xl min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] shadow-[0px_10px_30px_-12px_#00000060]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImg.src})` }}
      />

      <div className="relative flex h-full flex-col justify-center gap-4 px-6 py-8 sm:px-10 sm:py-10 lg:max-w-[58%]">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
          <Sparkles size={14} className="text-[#FBBF24]" />
          {t('subjectsHeroBadge')}
        </span>

        <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[44px]">
          <span className="block">{t('subjectsHeroTitleLine1')}</span>
          <span className="block">
            {t('subjectsHeroTitleLine2')}{' '}
            <span className="bg-gradient-to-r from-[#5D87FF] to-[#22D3EE] bg-clip-text text-transparent">
              {t('subjectsHeroTitleHighlight')}
            </span>
          </span>
        </h1>

        <p className="max-w-md text-sm text-white/70 sm:text-base">{t('subjectsHeroDescription')}</p>

        <div className="mt-2 flex flex-wrap items-center gap-5">
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#5D87FF] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#5D87FF]/30 transition hover:bg-[#4570EA] sm:text-base">
            {t('subjectsHeroPrimaryCta')}
            <ArrowRight size={18} />
          </button>

          <button className="flex items-center gap-2.5 text-white transition hover:text-white/80">
            <PlayCircle size={38} strokeWidth={1.5} />
            <span className="text-left">
              <span className="block text-sm font-semibold sm:text-base">{t('subjectsHeroVideoCta')}</span>
              <span className="block text-xs text-white/60">{t('subjectsHeroVideoDuration')}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Suzuvchi tezkor havolalar kartasi — faqat kattaroq ekranlarda.
          Shaffof/blur emas — orqa fon rasmiga qarab tekis chiqmay, dogli
          ko'rinardi. Shu sababli ilovaning o'zidagi to'q rangga (#0B1030,
          HomeHero'dagi bilan bir xil) tayangan yaxlit karta ishlatildi. */}
      <div className="absolute bottom-6 right-6 top-6 hidden w-[300px] flex-col justify-center gap-1 rounded-2xl border border-white/10 bg-[#0B1030]/90 p-3 shadow-[0px_20px_45px_-15px_#00000090] xl:flex">
        {QUICK_LINKS.map(({ icon: Icon, color, bg, titleKey, subKey }, index) => (
          <div key={titleKey}>
            {index > 0 && <div className="mx-1 h-px bg-white/10" />}
            <div className="flex items-center gap-3 rounded-xl px-2.5 py-3 transition hover:bg-white/5">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg}`}>
                <Icon size={19} style={{ color }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{t(titleKey)}</p>
                <p className="truncate text-xs text-white/55">{t(subKey)}</p>
              </div>
              <ChevronRight size={16} className="shrink-0 text-white/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubjectsBanner
