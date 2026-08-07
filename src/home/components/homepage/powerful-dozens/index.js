import { useTranslation } from 'react-i18next'
import { Rocket, Sparkles } from 'lucide-react'
import { Container } from '@mui/material'
import AppStoreButtons from '@/components/app-store-buttons'

const PowerfulDozens = () => {
  const { t } = useTranslation()

  return (
    <section className="relative w-full overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      {/* Mobil: rasm juda "cover"lanib matn ustiga chiqib ketmasligi uchun faqat yumshoq gradient ko'rsatamiz. */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EAF1FF] to-[#F5F8FF] md:hidden" />
      <div className="absolute inset-0 hidden bg-[#F5F8FF] md:block">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: 'url(/images/homepagebacgkround.png)' }}
        />
        {/* Matn tomonini o'qish uchun yengil oq gradient (rasmning o'zidagi fade'ni kuchaytiradi) */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/15 to-transparent" />
      </div>

      <Container sx={{ maxWidth: '1400px !important', py: { xs: '18px', sm: '24px', md: '32px', lg: '36px' } }}>
        <div className="relative flex items-center py-10 md:min-h-[calc(80vh-60px)] md:py-16 lg:min-h-[calc(100vh-120px)]">
          <div className="max-w-3xl space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm text-[#1E2A4A] border rounded-full border-black/5 bg-white/70 shadow-sm backdrop-blur-md">
              <Rocket className="w-4 h-4 text-[#5D87FF]" />
              <span className="font-semibold">{t('headerInfo')}</span>
            </div>

            <h1 className="text-3xl font-extrabold leading-[1.15] text-[#1E2A4A] sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="block">{t('newMatem')}</span>
              <span className="text-transparent bg-gradient-to-r from-[#048ffd] to-[#272efc] bg-clip-text">
                {t('learnPrefix') ? `${t('learnPrefix')} ` : ''}
                <span className="relative inline-block">
                  {t('learn')}
                  <svg
                    className="absolute -bottom-1 left-0 h-2 w-full sm:h-2.5"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path
                      d="M2 6C40 10 160 10 198 6"
                      stroke="url(#heroUnderlineGradient)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="heroUnderlineGradient" x1="0" y1="0" x2="200" y2="0">
                        <stop stopColor="#048ffd" />
                        <stop offset="1" stopColor="#272efc" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Sparkles className="absolute -right-6 -top-3 h-5 w-5 text-[#272efc] sm:h-6 sm:w-6" />
                </span>
              </span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-[#4B5670] sm:text-lg md:text-xl">
              {t('iqMathHeartitle')}
            </p>

            <AppStoreButtons />

            {/* Stats (qoldiravering) */}
            <div className="grid grid-cols-3 gap-3 pt-2 sm:gap-4">
              <div className="p-4 text-[#1E2A4A] border rounded-2xl border-black/5 bg-white/70 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-1 text-2xl font-extrabold md:text-3xl">
                  <p>8,000</p> <span>+</span>
                </div>
                <div className="mt-1 text-xs text-[#6B7590] sm:text-sm">{t('activeReader')}</div>
              </div>
              <div className="p-4 text-[#1E2A4A] border rounded-2xl border-black/5 bg-white/70 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-1 text-2xl font-extrabold md:text-3xl">
                  <p>400</p>
                  <span>+</span>
                </div>
                <div className="mt-1 text-xs text-[#6B7590] sm:text-sm">{t('VideoTutorials')}</div>
              </div>
              <div className="p-4 text-[#1E2A4A] border rounded-2xl border-black/5 bg-white/70 shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-1 text-2xl font-extrabold md:text-3xl">
                  <p>4.9</p>
                  <span>⭐</span>
                </div>
                <div className="mt-1 text-xs text-[#6B7590] sm:text-sm">{t('ratings')}</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default PowerfulDozens
