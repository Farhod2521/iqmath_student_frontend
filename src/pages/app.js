import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { QRCodeSVG } from 'qrcode.react'
import { BarChart3, BookOpen, Star, Trophy } from 'lucide-react'
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/constants/appLinks'

const LOGO = 'https://api.iqmath.uz/system/logo/logo.png'

const TEXT = {
  uz: {
    badge: "Matematika o'rganish endi osonroq",
    title1: 'Matematika —',
    title2: 'kelajagingiz uchun',
    accent: 'eng yaxshi tanlov!',
    lead: "Interaktiv darslar, qiziqarli mashqlar va shaxsiy rivojlanish dasturi bilan matematikani oson va qiziqarli o'rganing.",
    play: "Google Play'dan",
    apple: "App Store'dan",
    download: 'Yuklab oling',
    scan: 'QR kodni skaner qilib, ilovani oling',
    f1: "1–11-sinflar uchun to'liq kurslar",
    f2: 'Testlar va diagnostika',
    f3: "O'yinlar va musobaqalar",
    f4: 'Shaxsiy rivojlanish va natijalar tahlili'
  },
  ru: {
    badge: 'Изучать математику стало проще',
    title1: 'Математика —',
    title2: 'лучший выбор',
    accent: 'для вашего будущего!',
    lead: 'Интерактивные уроки, интересные упражнения и персональная программа развития помогут изучать математику легко и увлекательно.',
    play: 'Скачайте в',
    apple: 'Загрузите в',
    download: 'Google Play',
    downloadApple: 'App Store',
    scan: 'Отсканируйте QR-код и установите приложение',
    f1: 'Полные курсы для 1–11 классов',
    f2: 'Тесты и диагностика',
    f3: 'Игры и соревнования',
    f4: 'Личный рост и анализ результатов'
  }
}

const PlayIcon = () => (
  <svg viewBox="0 0 48 48" className="h-8 w-8 shrink-0" aria-hidden="true">
    <path fill="#00D7FE" d="M7.6 4.3 26.2 23 7.6 41.7c-.6-.4-1-1.2-1-2.2V6.5c0-1 .4-1.8 1-2.2z" />
    <path fill="#FFCE00" d="m32.4 29.2-6.2-6.2 6.2-6.2 7.5 4.3c2.1 1.2 2.1 3.2 0 4.4z" />
    <path fill="#FF3A44" d="M32.4 29.2 26.2 23 7.6 41.7c.7.7 1.8.8 3 .1z" />
    <path fill="#00F076" d="M32.4 16.8 10.6 4.2c-1.2-.7-2.3-.6-3 .1L26.2 23z" />
  </svg>
)

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0 fill-white" aria-hidden="true">
    <path d="M16.37 12.6c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.89-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.89 2.65 3.24 2.6 1.3-.05 1.79-.84 3.36-.84s2.01.84 3.38.81c1.4-.03 2.28-1.27 3.13-2.53.99-1.45 1.4-2.85 1.42-2.92-.03-.01-2.72-1.05-2.75-4.13zM13.78 4.95c.71-.87 1.2-2.07 1.07-3.27-1.03.04-2.28.69-3.02 1.55-.66.77-1.24 2-1.08 3.18 1.15.09 2.32-.58 3.03-1.46z" />
  </svg>
)

/**
 * app-back.png (1746×901) ning o'ng qismi — telefonlar: x 700..1746.
 * Rasm siqilmaydi (asl PNG), kerakli qismi CSS bilan kesib ko'rsatiladi.
 */
const HeroImage = ({ className = '', style }) => (
  <div className={`relative aspect-[1046/861] overflow-hidden ${className}`} style={style}>
    <img
      src="/images/app-back.png"
      alt="IQ Math ilovasi"
      className="absolute right-0 top-[-4.6%] h-[104.6%] w-auto max-w-none"
    />
  </div>
)

/** Dumaloq bayroqlar (til tanlash uchun) */
const Flag = ({ lang, size = 22 }) => (
  <svg viewBox="0 0 30 30" width={size} height={size} className="shrink-0 rounded-full ring-1 ring-black/10" aria-hidden="true">
    <defs>
      <clipPath id={`flag-${lang}`}>
        <circle cx="15" cy="15" r="15" />
      </clipPath>
    </defs>
    {lang === 'ru' ? (
      <g clipPath={`url(#flag-${lang})`}>
        <rect width="30" height="10" fill="#FFFFFF" />
        <rect y="10" width="30" height="10" fill="#0039A6" />
        <rect y="20" width="30" height="10" fill="#D52B1E" />
      </g>
    ) : (
      <g clipPath={`url(#flag-${lang})`}>
        <rect width="30" height="10" fill="#0099B5" />
        <rect y="10" width="30" height="10" fill="#FFFFFF" />
        <rect y="9.4" width="30" height="1.2" fill="#CE1126" />
        <rect y="19.4" width="30" height="1.2" fill="#CE1126" />
        <rect y="20.6" width="30" height="9.4" fill="#1EB53A" />
        <circle cx="7.4" cy="5" r="3" fill="#FFFFFF" />
        <circle cx="8.6" cy="5" r="2.6" fill="#0099B5" />
        <circle cx="12.2" cy="3.4" r="0.55" fill="#FFFFFF" />
        <circle cx="14" cy="5" r="0.55" fill="#FFFFFF" />
        <circle cx="12.2" cy="6.6" r="0.55" fill="#FFFFFF" />
        <circle cx="15.8" cy="3.4" r="0.55" fill="#FFFFFF" />
        <circle cx="15.8" cy="6.6" r="0.55" fill="#FFFFFF" />
      </g>
    )}
  </svg>
)

const FEATURES = [
  { key: 'f1', bg: 'from-[#4F8CFF] to-[#2563EB]', Icon: BookOpen },
  { key: 'f2', bg: 'from-[#FF7A85] to-[#F43F5E]', Icon: BarChart3 },
  { key: 'f3', bg: 'from-[#34D399] to-[#10B981]', Icon: Trophy },
  { key: 'f4', bg: 'from-[#A78BFA] to-[#7C3AED]', Icon: Star }
]

/** Do'kon kartasi: tepada qora tugma, ostida QR kod va izoh (dizayn rasmidagidek) */
const StoreCard = ({ href, icon, small, big, scan, qrIcon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group block w-full rounded-[24px] bg-white p-2.5 shadow-[0_20px_45px_-25px_rgba(15,23,42,0.45)] ring-1 ring-[#E9EFF8] transition hover:-translate-y-0.5 hover:shadow-[0_26px_50px_-24px_rgba(37,99,235,0.45)]"
  >
    <span className="flex items-center gap-3 rounded-[18px] bg-[#0B0D12] px-5 py-3 text-white">
      {icon}
      <span className="leading-tight">
        <span className="block text-[13px] font-medium text-white/85">{small}</span>
        <span className="block text-[22px] font-semibold tracking-tight">{big}</span>
      </span>
    </span>
    <span className="hidden items-center gap-4 px-3 pb-2 pt-4 sm:flex">
      <QRCodeSVG
        value={href}
        size={92}
        level="H"
        fgColor="#0B0D12"
        className="shrink-0"
        imageSettings={{ src: qrIcon, height: 24, width: 24, excavate: true }}
      />
      <span className="text-[15px] font-medium leading-snug text-[#1D4ED8]">{scan}</span>
    </span>
  </a>
)

export default function IqMathAppPage() {
  const [lang, setLang] = useState('uz')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const t = TEXT[lang]

  useEffect(() => {
    try {
      const saved = localStorage.getItem('app-page-lang')
      if (saved === 'ru' || saved === 'uz') setLang(saved)
    } catch {
      // brauzer xotirasi yopiq bo'lsa — standart til
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const close = (event) => !menuRef.current?.contains(event.target) && setMenuOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [menuOpen])

  const pickLang = (value) => {
    setLang(value)
    setMenuOpen(false)
    try {
      localStorage.setItem('app-page-lang', value)
    } catch {
      // jim
    }
  }

  return (
    <>
      <Head>
        <title>IQ Math ilovasi</title>
        <meta
          name="description"
          content="IQ Math mobil ilovasini Android yoki iOS uchun yuklab oling. Скачайте мобильное приложение IQ Math для Android или iOS."
        />
      </Head>

      <main className="relative min-h-[100svh] overflow-hidden bg-[#EEF4FF] text-[#0B1B3F]">
        {/* Fon: yumshoq ko'k gradient; kompyuterda o'ng tomonda telefonlar rasmi (chetlari fonga singib ketadi) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F7FAFF] via-[#EEF4FF] to-[#DCE9FF]" />
        <div className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-[#BFD7FF]/40 blur-3xl" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] items-center lg:flex">
          <HeroImage
            className="w-full"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, #000 16%), linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)',
              WebkitMaskComposite: 'source-in',
              maskImage:
                'linear-gradient(to right, transparent 0%, #000 16%), linear-gradient(to bottom, transparent 0%, #000 10%, #000 90%, transparent 100%)',
              maskComposite: 'intersect'
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-4 py-5 sm:px-8 lg:px-14 lg:py-8">
          {/* Yuqori qator: logo va til */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-[0_10px_25px_-12px_rgba(37,99,235,0.6)] sm:h-14 sm:w-14">
                <img src={LOGO} alt="IQ Math" className="h-8 w-8 object-contain sm:h-9 sm:w-9" />
              </span>
              <span className="text-[26px] font-extrabold tracking-tight sm:text-[32px]">MATH</span>
            </div>
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex h-11 items-center gap-2 rounded-full bg-white/90 px-4 text-sm font-bold shadow-[0_10px_25px_-15px_rgba(15,23,42,0.5)] backdrop-blur"
              >
                <Flag lang={lang} />
                {lang.toUpperCase()}
                <span className="text-xs">▾</span>
              </button>
              {menuOpen ? (
                <div className="absolute right-0 top-12 z-20 w-40 overflow-hidden rounded-2xl bg-white py-1 shadow-xl ring-1 ring-[#E7EEF9]">
                  {[
                    ['uz', "O'zbekcha"],
                    ['ru', 'Русский']
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => pickLang(value)}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-semibold hover:bg-[#F1F5FF] ${
                        lang === value ? 'text-[#2563EB]' : 'text-[#0F172A]'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Flag lang={value} size={20} />
                        {label}
                      </span>
                      {lang === value ? <span>✓</span> : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </header>

          {/* Mobil: telefonlar rasmi */}
          <HeroImage className="mx-auto mt-4 w-full max-w-[560px] rounded-[28px] lg:hidden" />

          <section className="py-6 lg:flex lg:flex-1 lg:items-center lg:py-10">
            <div className="w-full max-w-[640px] lg:max-w-[46%] xl:max-w-[600px]">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E3EDFF] px-4 py-2 text-[13px] font-semibold text-[#2563EB] sm:text-sm">
                🎓 {t.badge}
              </span>
              <h1 className="mt-5 text-[34px] font-extrabold leading-[1.08] tracking-tight sm:text-[48px] lg:text-[46px] xl:text-[56px]">
                {t.title1}
                <br />
                {t.title2}
                <br />
                <span className="bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#38BDF8] bg-clip-text text-transparent">
                  {t.accent}
                </span>
              </h1>
              <p className="mt-5 max-w-[540px] text-[15px] leading-relaxed text-[#475569] sm:text-[18px]">{t.lead}</p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <StoreCard
                  href={GOOGLE_PLAY_URL}
                  icon={<PlayIcon />}
                  small={t.play}
                  big={lang === 'ru' ? t.download : t.download}
                  scan={t.scan}
                  qrIcon="/icons/google-play.svg"
                />
                <StoreCard
                  href={APP_STORE_URL}
                  icon={<AppleIcon />}
                  small={t.apple}
                  big={lang === 'ru' ? t.downloadApple : t.download}
                  scan={t.scan}
                  qrIcon="/icons/apple.svg"
                />
              </div>
            </div>
          </section>

          {/* Afzalliklar */}
          <footer className="grid grid-cols-2 gap-3 pb-2 lg:max-w-[1000px] lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#D9E3F3]">
            {FEATURES.map(({ key, bg, Icon }) => (
              <div key={key} className="flex items-center gap-3 rounded-2xl bg-white/80 p-3 backdrop-blur lg:rounded-none lg:bg-transparent lg:px-5 lg:py-1 lg:backdrop-blur-0 lg:first:pl-0">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm ${bg}`}>
                  <Icon size={21} strokeWidth={2.2} />
                </span>
                <span className="text-[13px] font-semibold leading-snug text-[#0F172A] sm:text-sm">{t[key]}</span>
              </div>
            ))}
          </footer>
        </div>
      </main>
    </>
  )
}
