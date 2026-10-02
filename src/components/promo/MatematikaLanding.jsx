import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '@/services/i18n'
import { CONTENT } from './landing/content'
import { Container } from './landing/ui'
import { HowSection, Hero, ResultsSection, SiteHeader, SubjectsSection } from './landing/TopSections'
import {
  AppSection,
  CtaBanner,
  FaqSection,
  MotivationSection,
  PlatformSection,
  PricingSection,
  SiteFooter,
  VideoModal
} from './landing/BottomSections'
import LeadForm from './landing/LeadForm'

/**
 * Reklama uchun landing: /math/uz — o'zbekcha, /math/ru — ruscha.
 * Barcha "Bepul sinab ko'rish" tugmalari pastdagi ariza formasiga (#lead) olib boradi.
 */
const MatematikaLanding = ({ lang: routeLang }) => {
  const { i18n: i18nInstance } = useTranslation()
  const [videoOpen, setVideoOpen] = useState(false)

  // Route'dan kelgan tilga qarab sahifa tilini o'rnatamiz
  useEffect(() => {
    if ((routeLang === 'ru' || routeLang === 'uz') && i18n.language !== routeLang) {
      i18n.changeLanguage(routeLang)
    }
  }, [routeLang])

  const lang = i18nInstance.language?.startsWith('ru') ? 'ru' : 'uz'
  const c = CONTENT[lang]

  const changeLang = (next) => {
    if (next === lang) return
    i18n.changeLanguage(next)
    // URL ham /math/<til> bo'ladi (sahifa qayta yuklanmaydi)
    window.history.replaceState({}, '', `/math/${next}${window.location.search}`)
  }

  return (
    <div className="landing-root min-h-screen overflow-x-clip scroll-smooth bg-white text-[#0B1B3F] antialiased">
      <SiteHeader c={c} lang={lang} onLang={changeLang} />

      <main>
        <Hero c={c} onVideo={() => setVideoOpen(true)} />
        <ResultsSection c={c} />
        <HowSection c={c} />
        <SubjectsSection c={c} />
        <PlatformSection c={c} />
        <MotivationSection c={c} />
        <AppSection c={c} />
        <PricingSection c={c} lang={lang} />
        <FaqSection c={c} />

        {/* Ariza formasi */}
        <section id="lead" className="scroll-mt-20 bg-[#F5F8FF] py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-4xl">
              <LeadForm />
            </div>
          </Container>
        </section>

        <CtaBanner c={c} />
      </main>

      <SiteFooter c={c} />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />

      <style jsx global>{`
        .landing-root {
          font-family: 'Inter', 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        html {
          scroll-padding-top: 80px;
        }
      `}</style>
    </div>
  )
}

export default MatematikaLanding
