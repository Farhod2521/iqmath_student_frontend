import { useTranslation } from 'react-i18next'
import { BarChart3, GraduationCap, Play } from 'lucide-react'
import { Container } from '@mui/material'
import AppStoreButtons from '@/components/app-store-buttons'

const HERO_IMAGE = '/images/students-hero-3.png'

const FEATURES = [
  { key: 'studentsHeroGrades', Icon: GraduationCap },
  { key: 'studentsHeroVideos', Icon: Play },
  { key: 'studentsHeroGames', Icon: BarChart3 }
]

/** /students sahifasining bosh bloki: chapda matn, o'ngda o'quvchi rasmi */
const PowerfulDozens = () => {
  const { t } = useTranslation()

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#EAF1FF] to-[#F7FAFF]">
      {/* Kompyuterda rasm butun blok bo'ylab: chap tomoni rasmning o'zida oqarib ketgan — matn shu yerda turadi */}
      <div className="absolute inset-0 hidden md:block">
        <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover object-[78%_center]" />
        {/* Faqat chap chetda, matn ostida yengil parda — rasmning o'zi (o'quvchi) xiralashmasin */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#F4F8FF]/80 to-transparent lg:w-[40%]" />
      </div>

      <Container sx={{ maxWidth: '1400px !important' }}>
        <div className="relative flex items-center py-10 md:min-h-[calc(80vh-60px)] md:py-16 lg:min-h-[calc(100vh-120px)]">
          <div className="w-full max-w-[680px]">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E6EDFF] px-4 py-2 text-[15px] font-semibold text-[#1E2A4A] shadow-sm">
              <GraduationCap className="h-5 w-5 text-[#1D4FE0]" />
              {t('studentsHeroBadge')}
            </div>

            <h1 className="mt-6 text-[34px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#0B1533] sm:text-5xl lg:text-[clamp(48px,4.2vw,64px)]">
              <span className="block">{t('studentsHeroTitle')}</span>
              {/* Bitta qatorda turadi — chiziq so'zlar ostidan chiqib ketmasligi uchun */}
              <span className="relative inline-block whitespace-nowrap pb-2 text-transparent bg-gradient-to-r from-[#1F8BFF] to-[#1D4FE0] bg-clip-text">
                {t('studentsHeroAccent')}
                <svg
                  className="absolute bottom-0 right-0 h-2.5 w-[55%] sm:h-3"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path d="M2 8C50 2 150 2 198 8" stroke="#1D6BFF" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-7 max-w-[540px] text-base leading-relaxed text-[#3B4763] sm:text-lg">{t('studentsHeroText')}</p>

            <AppStoreButtons className="mt-8" />

            <div className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-4">
              {FEATURES.map(({ key, Icon }) => (
                <div
                  key={key}
                  className="flex flex-col items-start gap-2 rounded-2xl sm:flex-row sm:items-center border border-black/5 bg-white/80 p-3 shadow-sm backdrop-blur-md sm:gap-3 sm:p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E6EDFF] text-[#1D4FE0]">
                    <Icon className="h-[18px] w-[18px]" fill={Icon === Play ? 'currentColor' : 'none'} />
                  </span>
                  <span className="text-xs font-semibold leading-snug text-[#1E2A4A] sm:text-sm">{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Telefonda: rasmning o'quvchi turgan qismi matn ostida */}
      <img src={HERO_IMAGE} alt="" className="block h-[280px] w-full object-cover object-[80%_center] sm:h-[360px] md:hidden" />
    </section>
  )
}

export default PowerfulDozens
