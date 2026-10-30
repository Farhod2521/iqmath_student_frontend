import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Check, ChevronDown, CircleHelp, Quote } from 'lucide-react'
import Brand from '@/components/brand'
import LanguageDropdown from '@/components/language'
import Footer from '@/components/footer'
import AuthModal from '@/home/components/auth/AuthModal'
import Auth from '@/home/components/auth/Auth'

/*
 * Ota-ona (/parents) va o'qituvchi (/teachers) landinglari uchun umumiy qismlar.
 * Har bir sahifa o'z rangini (ACCENTS) va matnlarini beradi, tuzilish bir xil.
 */

export const ACCENTS = {
  parent: {
    button: 'bg-gradient-to-r from-[#FF8A2B] to-[#F2600C] shadow-[0_14px_28px_-12px_rgba(249,115,22,0.9)]',
    badge: 'bg-[#FFF1E6] text-[#EA580C]',
    highlight: 'text-[#1D6BFF]',
  },
  teacher: {
    button: 'bg-gradient-to-r from-[#7C3AED] to-[#9B3CF5] shadow-[0_14px_28px_-12px_rgba(124,58,237,0.9)]',
    badge: 'bg-[#F1EBFF] text-[#7C3AED]',
    highlight: 'text-[#7C3AED]',
  }
}

/**
 * Joriy til (uz/ru — header'dagi LanguageDropdown almashtiradi) va kirish oynasi. role — ro'yxatdan o'tishda oldindan tanlanadigan rol (parent / tutor).
 * Til faqat clientda aniqlanadi (localStorage) — hydration mos kelishi uchun avval o'zbekcha chiziladi.
 */
export const useRoleLanding = (role) => {
  const { i18n } = useTranslation()
  const router = useRouter()
  const [lang, setLangState] = useState('uz')
  const [authOpen, setAuthOpen] = useState(false)

  useEffect(() => {
    setLangState(i18n.language === 'ru' ? 'ru' : 'uz')
  }, [i18n.language])

  useEffect(() => {
    if (router.isReady && (router.query.tab || router.query.referral_code)) setAuthOpen(true)
  }, [router.isReady, router.query.tab, router.query.referral_code])

  const openAuth = (tab) => {
    setAuthOpen(true)
    const query = { ...router.query, tab }
    if (tab === 'signUp') query.role = role
    router.replace({ pathname: router.pathname, query }, undefined, { shallow: true })
  }

  const closeAuth = () => {
    setAuthOpen(false)
    const query = { ...router.query }
    delete query.tab
    delete query.returnUrl
    delete query.role
    router.replace({ pathname: router.pathname, query }, undefined, { shallow: true })
  }

  return {
    lang,
    openSignUp: () => openAuth('signUp'),
    openSignIn: () => openAuth('signIn'),
    authModal: (
      <AuthModal open={authOpen} onClose={closeAuth} title={lang === 'ru' ? 'Вход / Регистрация' : 'Kirish / Ro‘yxatdan o‘tish'}>
        <Auth />
      </AuthModal>
    )
  }
}

/** Fondagi bezaklar: xira dog'lar, barglar, geometrik chiziqlar */
const Leaf = ({ className }) => (
  <svg viewBox="0 0 120 200" className={className} aria-hidden="true">
    <path d="M60 195C20 150 8 95 30 40 42 12 60 4 60 4s18 8 30 36c22 55 10 110-30 155Z" fill="currentColor" />
    <path d="M60 190V20" stroke="rgba(255,255,255,0.4)" strokeWidth="3" fill="none" />
  </svg>
)

export const Decorations = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div className="absolute -left-48 top-20 h-[480px] w-[480px] rounded-full bg-[#C9D8FF]/50 blur-[100px]" />
    <div className="absolute -right-40 top-[30%] h-[460px] w-[460px] rounded-full bg-[#E3D7FF]/50 blur-[100px]" />
    <div className="absolute -left-40 top-[60%] h-[420px] w-[420px] rounded-full bg-[#D6E4FF]/50 blur-[100px]" />
    <div className="absolute -right-48 bottom-40 h-[420px] w-[420px] rounded-full bg-[#DCD4FF]/50 blur-[100px]" />
    {[
      'left-[-12px] top-[6%] h-28 w-16 rotate-[35deg] blur-[2px]',
      'right-[2%] top-[22%] h-20 w-12 -rotate-[40deg] blur-[1px]',
      'left-[1%] top-[34%] h-24 w-14 rotate-[20deg] blur-[3px]',
      'right-[-10px] top-[48%] h-28 w-16 -rotate-[25deg] blur-[2px]',
      'left-[-8px] top-[64%] h-20 w-12 rotate-[45deg] blur-[1px]',
      'right-[1%] top-[78%] h-24 w-14 -rotate-[35deg] blur-[3px]',
      'left-[2%] top-[90%] h-20 w-12 rotate-[25deg] blur-[2px]'
    ].map((pos) => (
      <Leaf key={pos} className={`absolute hidden text-[#5DAA62]/45 lg:block ${pos}`} />
    ))}
    {/* Geometrik chiziqlar (piramida, kub) */}
    <svg viewBox="0 0 120 120" className="absolute left-[1%] top-[5%] hidden h-28 w-28 text-[#9DB6FF]/70 2xl:block">
      <path d="M20 95 60 15l40 80Zm40-80v80M20 95l40-25 40 25" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
    <svg viewBox="0 0 120 120" className="absolute right-[2%] top-[38%] hidden h-24 w-24 text-[#9DB6FF]/60 xl:block">
      <path d="M30 40h50v50H30Zm20-20h50v50M30 40l20-20m30 20 20-20M80 90l20-20M50 20v50h50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="0" />
    </svg>
    <span className="absolute left-[3%] top-[78%] hidden font-serif text-[64px] text-[#9DB6FF]/50 xl:block">π</span>
  </div>
)

/** Header — saytning asosiy headeri bilan bir xil uslubda: menyu, bayroqli til tanlash, "Tizimga kirish" */
export const LandingHeader = ({ nav, onLogin, loginLabel }) => (
  <header className="relative z-20 border-b border-[#EEF2F7] bg-white/90 backdrop-blur">
    <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
      <Brand />
      <nav className="hidden items-center gap-1 lg:flex">
        {nav.map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="whitespace-nowrap rounded-[14px] px-5 py-2 font-['Manrope','Inter',system-ui,sans-serif] text-[17px] font-semibold text-[#1E293B] transition hover:bg-[#EEF3FF] hover:text-[#1D6BFF]"
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2 sm:gap-3">
        <LanguageDropdown />
        <button
          onClick={onLogin}
          className="h-10 whitespace-nowrap rounded-lg bg-[#5D87FF] px-4 text-[14px] font-black text-white shadow-[0_6px_16px_-6px_rgba(93,135,255,0.8)] transition hover:bg-[#4570EA] sm:px-6 sm:text-[15px]"
        >
          {loginLabel}
        </button>
      </div>
    </div>
  </header>
)

export const PrimaryButton = ({ accent, onClick, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`group inline-flex h-14 items-center justify-center gap-2.5 rounded-2xl px-7 text-[16px] font-bold text-white transition hover:brightness-110 ${ACCENTS[accent].button} ${className}`}
  >
    {children}
    <ArrowRight size={20} strokeWidth={2.5} className="transition group-hover:translate-x-1" />
  </button>
)

export const SecondaryButton = ({ href, children, className = '' }) => (
  <a
    href={href}
    className={`inline-flex h-14 items-center justify-center gap-2.5 rounded-2xl bg-white px-6 text-[16px] font-bold text-[#0B1220] shadow-[0_8px_24px_-12px_rgba(15,23,42,0.25)] ring-1 ring-[#E8EDF7] transition hover:ring-[#C9D6F2] ${className}`}
  >
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1D6BFF] text-white">
      <svg viewBox="0 0 24 24" className="ml-0.5 h-3 w-3" fill="currentColor" aria-hidden="true">
        <path d="M6 4v16l14-8Z" />
      </svg>
    </span>
    {children}
  </a>
)

export const CheckLine = ({ items, className = '' }) => (
  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
    {items.map((item) => (
      <span key={item} className={`flex items-center gap-2 text-[14px] font-medium text-[#475569] ${className}`}>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#16A34A] text-white">
          <Check size={13} strokeWidth={3} />
        </span>
        {item}
      </span>
    ))}
  </div>
)

export const Badge = ({ accent, children, className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-bold ${ACCENTS[accent].badge} ${className}`}>
    {children}
  </span>
)

/**
 * Hero'ning chap tomoni (belgi, sarlavha, tavsif, tugmalar). Katta ekranda o'lchamlar ekran eniga qarab
 * kattalashadi — 1920px monitorda matn rasmga nisbatan kichik bo'lib qolmasin.
 */
export const HeroText = ({ accent, badge, title, highlightClass, subtitle, start, checks, onStart }) => (
  <div className="lg:w-[47%]">
    <Badge accent={accent} className="shadow-sm xl:px-4 xl:py-2 xl:text-[15px]">
      {badge}
    </Badge>
    <h1 className="mt-4 text-[36px] font-extrabold leading-[1.07] tracking-[-0.025em] sm:text-[48px] lg:mt-5 lg:text-[clamp(48px,3.5vw,72px)]">
      {title[0]} <span className={highlightClass}>{title[1]}</span>
    </h1>
    <p className="mt-5 max-w-[640px] text-[17px] leading-relaxed text-[#475569] lg:text-[clamp(17px,1.12vw,22px)]">{subtitle}</p>
    <div className="mt-8 flex flex-wrap gap-3 xl:mt-10 xl:gap-4">
      <PrimaryButton accent={accent} onClick={onStart} className="xl:h-16 xl:px-8 xl:text-[18px]">
        {start}
      </PrimaryButton>
    </div>
    <CheckLine items={checks} className="xl:text-[16px]" />
  </div>
)

/** Sarlavha: [oddiy qism, ajratilgan qism] */
export const SectionTitle = ({ accent, badge, title, subtitle, highlightClass }) => (
  <div className="mx-auto max-w-[760px] text-center">
    {badge && <Badge accent={accent} className="!bg-[#EAF1FF] !text-[#1D6BFF]">{badge}</Badge>}
    <h2 className="mt-3 text-[28px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[38px]">
      {title[0]} {title[1] && <span className={highlightClass || ACCENTS[accent].highlight}>{title[1]}</span>}
    </h2>
    {subtitle && <p className="mt-3 text-[16px] text-[#5B6478]">{subtitle}</p>}
  </div>
)

/** Kichik rangli ikonka kvadrati */
export const IconTile = ({ Icon, tone, size = 'md' }) => (
  <span
    className={`flex shrink-0 items-center justify-center rounded-2xl ${tone} ${
      size === 'lg' ? 'h-14 w-14' : 'h-12 w-12'
    }`}
  >
    <Icon size={size === 'lg' ? 26 : 22} />
  </span>
)

export const Card = ({ className = '', children }) => (
  <div
    className={`rounded-[26px] bg-white/90 shadow-[0_18px_50px_-24px_rgba(30,58,138,0.25)] ring-1 ring-white backdrop-blur-sm ${className}`}
  >
    {children}
  </div>
)

/** Floating UI kartochka (hero rasmi ustida) */
export const FloatCard = ({ className = '', children }) => (
  <div
    className={`absolute rounded-2xl bg-white/95 p-3.5 shadow-[0_18px_40px_-14px_rgba(15,23,42,0.35)] ring-1 ring-white backdrop-blur ${className}`}
  >
    {children}
  </div>
)

/** Bo'limni ajratib turuvchi to'liq kenglikdagi tasma: "white" — oqish fon, "plain" — umumiy fon */
export const Band = ({ tone = 'plain', className = '', children }) => (
  <div
    className={`relative ${
      tone === 'white'
        ? 'border-y border-white bg-white/65 shadow-[0_20px_50px_-40px_rgba(30,58,138,0.35)] backdrop-blur-[2px]'
        : ''
    } ${className}`}
  >
    {children}
  </div>
)

export const Section = ({ id, className = '', children }) => (
  <section id={id} className={`relative mx-auto max-w-[1400px] scroll-mt-20 px-4 sm:px-6 lg:px-10 ${className}`}>
    {children}
  </section>
)

/** Noutbuk ramkasi — ichiga kabinet UI'si chiziladi */
export const LaptopFrame = ({ children }) => (
  <div className="relative mx-auto w-full max-w-[640px]">
    <div className="rounded-t-[22px] bg-[#1E2533] p-2.5 pb-3 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.6)]">
      <div className="overflow-hidden rounded-[12px] bg-[#F7F9FD]">{children}</div>
    </div>
    <div className="relative mx-[-6%] h-4 rounded-b-[18px] bg-gradient-to-b from-[#D7DCE6] to-[#A9B1C1]">
      <div className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-lg bg-[#9AA3B5]" />
    </div>
  </div>
)

/** Telefon ramkasi */
export const PhoneFrame = ({ children, className = '' }) => (
  <div className={`relative w-[230px] rounded-[38px] bg-[#1E2533] p-2 shadow-[0_30px_60px_-24px_rgba(15,23,42,0.55)] ${className}`}>
    <div className="absolute left-1/2 top-3 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-[#1E2533]" />
    <div className="overflow-hidden rounded-[30px] bg-[#F7F9FD]">{children}</div>
  </div>
)

/** "3 qadamda boshlang" */
export const Steps = ({ accent, badge, title, subtitle, steps, className = 'pt-20 sm:pt-24' }) => {
  const numberColors = ['bg-[#1D6BFF]', 'bg-[#7C3AED]', 'bg-[#F97316]']
  return (
    <Section id="how" className={className}>
      <SectionTitle accent={accent} badge={badge} title={title} subtitle={subtitle} highlightClass="text-[#1D6BFF]" />
      <div className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-6">
        {/* Raqamlar orasidagi punktir yo'l */}
        <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute inset-x-[14%] top-1 hidden h-8 w-[72%] text-[#8FA9F5] md:block" aria-hidden="true">
          <path d="M0 30C120 0 260 0 380 26M620 30C740 0 880 0 1000 26" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="7 8" />
        </svg>
        {steps.map(({ title: stepTitle, text, Icon, tone }, i) => (
          <div key={stepTitle} className="relative flex flex-col items-center">
            <span className={`z-10 flex h-11 w-11 items-center justify-center rounded-full text-[18px] font-extrabold text-white shadow-lg ring-4 ring-white ${numberColors[i]}`}>
              {i + 1}
            </span>
            <Card className="-mt-4 flex w-full items-center gap-4 p-6 pt-9">
              <IconTile Icon={Icon} tone={tone} size="lg" />
              <div>
                <h3 className="text-[18px] font-bold">{stepTitle}</h3>
                <p className="mt-1 text-[14px] leading-snug text-[#5B6478]">{text}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  )
}

/** Keng rasm va ustida iqtibos kartochkasi */
/**
 * Yumaloq qutidagi rasm va uning ichida, o'ng tomonda iqtibos kartasi (o'qituvchi maketi bo'yicha).
 * Rasm chap tomonga tekislanadi — odamlar chapda, karta o'ngdagi bo'sh joyda turadi.
 */
export const QuoteBox = ({ image, imageSm, position = 'object-[0%_30%]', quote, author, className = '' }) => (
  <Section className={className}>
    <div className="relative overflow-hidden rounded-[28px] shadow-[0_30px_60px_-34px_rgba(30,58,138,0.55)] ring-1 ring-white">
      {/* Telefonda asl rasm, kattaroq ekranda o'ngga kengaytirilgan (karta uchun bo'sh joyli) rasm */}
      <picture>
        {imageSm && <source media="(max-width: 639px)" srcSet={imageSm} />}
        <img src={image} alt="" className={`h-[260px] w-full object-cover sm:h-[340px] lg:h-[380px] ${position}`} />
      </picture>
      <Card className="mx-4 -mt-16 mb-4 !bg-white/95 p-6 sm:absolute sm:inset-y-0 sm:right-6 sm:my-auto sm:mx-0 sm:h-fit sm:w-[300px] lg:right-8 lg:w-[330px]">
        <Quote size={30} className="fill-[#7C3AED] text-[#7C3AED]" />
        <p className="mt-3 text-[20px] font-extrabold leading-snug lg:text-[22px]">{quote}</p>
        <p className="mt-4 text-[14px] text-[#5B6478]">— {author}</p>
      </Card>
    </div>
  </Section>
)

/** Savol-javoblar (accordion) */
export const Faq = ({ accent, badge, title, items, className = 'pt-20 sm:pt-24' }) => {
  const [open, setOpen] = useState(0)
  return (
    <Section id="faq" className={className}>
      <SectionTitle accent={accent} badge={badge} title={[title]} />
      <div className="mx-auto mt-10 max-w-[860px] space-y-3">
        {items.map(([question, answer], i) => {
          const isOpen = open === i
          return (
            <Card key={question} className="overflow-hidden !rounded-2xl">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left sm:px-6"
                aria-expanded={isOpen}
              >
                <CircleHelp size={22} className="shrink-0 fill-[#1D6BFF] text-white" />
                <span className="flex-1 text-[16px] font-bold">{question}</span>
                <ChevronDown size={20} className={`shrink-0 text-[#64748B] transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && <p className="px-5 pb-5 pl-[52px] text-[15px] leading-relaxed text-[#5B6478] sm:px-6 sm:pl-[58px]">{answer}</p>}
            </Card>
          )
        })}
      </div>
    </Section>
  )
}

/** Sahifa qobig'i: fon, bezaklar, header, footer va kirish oynasi */
export const LandingShell = ({ accent, nav, landing, loginLabel, children }) => (
  <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F5F8FF] via-[#F8FAFF] to-[#F3F6FF] text-[#0B1220]">
    <Decorations />
    <LandingHeader nav={nav} onLogin={landing.openSignIn} loginLabel={loginLabel} />
    <main className="relative z-10">{children}</main>
    <div className="relative z-10 mt-16 sm:mt-20">
      <Footer />
    </div>
    {landing.authModal}
  </div>
)
