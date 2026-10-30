import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { FaApple, FaChalkboardTeacher, FaGraduationCap, FaPhoneAlt, FaTelegramPlane, FaUser, FaUsers } from 'react-icons/fa'
import Brand from '@/components/brand'
import { useSettingsStore } from '@/store'
import { SOCIAL_LINKS } from '@/constants/socialLinks'
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/constants/appLinks'
import AuthModal from '../auth/AuthModal'
import Auth from '../auth/Auth'
import RobotWalker from './RobotWalker'

const PHONE = '+998 78 888 18 81'

const TEXT = {
  uz: {
    title: 'Kim sifatida',
    titleAccent: 'davom etasiz?',
    subtitle: '1–11-sinf matematikasi: video darslar, misollar va natijalar bir joyda',
    login: 'Tizimga kirish',
    auth: 'Kirish / Ro‘yxatdan o‘tish',
    call: 'Bizga qo‘ng‘iroq qiling',
    write: 'Telegram orqali yozing',
    roles: {
      parent: { title: 'Ota-ona', text: 'Farzandingiz natijasini kuzating', button: 'Ota-onalar uchun' },
      student: { title: 'O‘quvchi', text: 'O‘ynab o‘rgan, bilimingni sina', button: 'O‘quvchilar uchun' },
      teacher: { title: 'O‘qituvchi', text: 'Sinfingizni oson boshqaring', button: 'O‘qituvchilar uchun' }
    }
  },
  ru: {
    title: 'Кем вы',
    titleAccent: 'продолжите?',
    subtitle: 'Математика 1–11 классов: видеоуроки, задания и результаты в одном месте',
    login: 'Вход',
    auth: 'Вход / Регистрация',
    call: 'Позвоните нам',
    write: 'Напишите в Telegram',
    roles: {
      parent: { title: 'Родитель', text: 'Следите за успехами ребёнка', button: 'Для родителей' },
      student: { title: 'Ученик', text: 'Учись играя, проверяй свои знания', button: 'Для учеников' },
      teacher: { title: 'Учитель', text: 'Управляйте классом легко', button: 'Для учителей' }
    }
  }
}

// Har bir rol: rang, rasm va qayerga olib borishi
const ROLES = [
  {
    key: 'parent',
    href: '/parents',
    image: '/images/roles/parent.webp',
    Icon: FaUsers,
    iconBg: 'bg-gradient-to-br from-[#FFA24C] to-[#F97316] shadow-[0_10px_20px_-8px_rgba(249,115,22,0.7)]',
    button: 'bg-gradient-to-r from-[#FF8A2B] to-[#F2600C] shadow-[0_14px_28px_-12px_rgba(249,115,22,0.9)]'
  },
  {
    key: 'student',
    href: '/students',
    image: '/images/roles/student.webp',
    Icon: FaGraduationCap,
    iconBg: 'bg-gradient-to-br from-[#3E9BFF] to-[#1D5CF0] shadow-[0_10px_20px_-8px_rgba(37,99,235,0.7)]',
    button: 'bg-gradient-to-r from-[#1F8BFF] to-[#1D4FE0] shadow-[0_14px_28px_-12px_rgba(37,99,235,0.9)]'
  },
  {
    key: 'teacher',
    href: '/teachers',
    image: '/images/roles/teacher.webp',
    Icon: FaChalkboardTeacher,
    iconBg: 'bg-gradient-to-br from-[#B46CFF] to-[#7C3AED] shadow-[0_10px_20px_-8px_rgba(124,58,237,0.7)]',
    button: 'bg-gradient-to-r from-[#7C3AED] to-[#9B3CF5] shadow-[0_14px_28px_-12px_rgba(124,58,237,0.9)]'
  }
]

const LANGS = ['uz', 'ru']

/** Google Play rangli belgisi */
const PlayIcon = () => (
  <svg viewBox="0 0 25 25" className="h-6 w-6 shrink-0 md:h-7 md:w-7" aria-hidden="true">
    <path d="M21.78 11.51 17.46 9.06 14.02 12.5l3.44 3.44 4.32-2.46c.77-.43.77-1.54 0-1.97Z" fill="#FFC400" />
    <path d="M14.02 12.5 3.74 2.22c-.2.2-.33.48-.33.81v18.94c0 .33.13.61.33.8L14.02 12.5Z" fill="#00C3FF" />
    <path d="M17.46 9.06 5.1 2.04c-.47-.27-1.02-.15-1.36.18L14.02 12.5l3.44-3.44Z" fill="#00E676" />
    <path d="m14.02 12.5-10.28 10.28c.34.34.89.45 1.36.18l12.36-7.02-3.44-3.44Z" fill="#FF3D57" />
  </svg>
)

/** Fondagi xira barg (dekor) */
const Leaf = ({ className }) => (
  <svg viewBox="0 0 120 200" className={className} aria-hidden="true">
    <path d="M60 195C20 150 8 95 30 40 42 12 60 4 60 4s18 8 30 36c22 55 10 110-30 155Z" fill="currentColor" />
    <path d="M60 190V20" stroke="rgba(255,255,255,0.35)" strokeWidth="3" fill="none" />
  </svg>
)

/** iqmath.uz bosh sahifasi: ota-ona, o'quvchi yoki o'qituvchi — har biri o'z landingiga olib boradi */
const RoleChooser = () => {
  const { i18n } = useTranslation()
  const router = useRouter()
  const setLang = useSettingsStore((state) => state.setLang || (() => {}))
  const [lang, setLangState] = useState('uz')
  const [authOpen, setAuthOpen] = useState(false)
  const text = TEXT[lang]

  // Til faqat clientda aniqlanadi (localStorage) — hydration mos kelishi uchun avval o'zbekcha chiziladi
  useEffect(() => {
    setLangState(i18n.language === 'ru' ? 'ru' : 'uz')
  }, [i18n.language])

  // ?tab=... yoki taklif havolasi (?referral_code=...) bilan kelinsa — kirish/ro'yxatdan o'tish oynasi darhol ochiladi
  useEffect(() => {
    if (router.isReady && (router.query.tab || router.query.referral_code)) setAuthOpen(true)
  }, [router.isReady, router.query.tab, router.query.referral_code])

  const changeLang = (code) => {
    try {
      localStorage.setItem('lang', code)
    } catch {}
    setLang(code)
    i18n.changeLanguage(code)
  }

  const openAuth = () => {
    setAuthOpen(true)
    router.replace({ pathname: router.pathname, query: { ...router.query, tab: 'signIn' } }, undefined, { shallow: true })
  }

  const closeAuth = () => {
    setAuthOpen(false)
    const query = { ...router.query }
    delete query.tab
    delete query.returnUrl
    router.replace({ pathname: router.pathname, query }, undefined, { shallow: true })
  }

  // Taklif kodi landingga o'tganda ham yo'qolmasin
  const withQuery = (pathname) => ({
    pathname,
    query: router.query.referral_code ? { referral_code: router.query.referral_code } : {}
  })

  return (
    // Kompyuterda sahifa bitta ekranga sig'adi (scroll yo'q): kartalar rasmi ekran balandligiga qarab qisqaradi.
    // Juda past ekranlarda (660px dan kam) oddiy scroll qoladi.
    <div className="relative flex min-h-screen flex-col overflow-hidden lg:h-[max(100dvh,660px)] lg:min-h-0 bg-gradient-to-b from-[#F5F8FF] via-[#F8FAFF] to-[#F1F5FF] text-[#0B1220]">
      {/* ---------- Fon bezaklari ---------- */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-48 top-16 h-[460px] w-[460px] rounded-full bg-[#C9D8FF]/60 blur-[90px]" />
        <div className="absolute -right-40 -top-24 h-[420px] w-[420px] rounded-full bg-[#E3D7FF]/70 blur-[90px]" />
        <div className="absolute -right-48 bottom-24 h-[380px] w-[380px] rounded-full bg-[#DCD4FF]/60 blur-[100px]" />
        <Leaf className="absolute -bottom-10 -left-8 hidden h-56 w-36 rotate-[28deg] text-[#4F9D57]/35 blur-[3px] lg:block" />
        <Leaf className="absolute bottom-24 -left-10 hidden h-40 w-24 -rotate-[20deg] text-[#5DAA62]/30 blur-[4px] lg:block" />
        <Leaf className="absolute -right-6 bottom-56 hidden h-44 w-28 -rotate-[30deg] text-[#4F9D57]/30 blur-[4px] lg:block" />
        <span className="absolute left-[11%] top-[19%] hidden h-3 w-3 rounded-full border-2 border-[#9DB6FF] lg:block" />
        <span className="absolute left-[1.5%] top-[37%] hidden h-2.5 w-2.5 rounded-full border-2 border-[#C3D1FF] lg:block" />
        {/* Qog'oz samolyot */}
        <svg viewBox="0 0 64 64" className="absolute bottom-28 right-6 hidden h-16 w-16 text-[#4C7DFF] lg:block">
          <path d="M60 6 4 28l20 7 6 21 9-14 15 9 6-45Z" fill="#fff" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M24 35 60 6 30 42" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="relative mx-auto flex w-full min-h-0 max-w-[1520px] flex-1 flex-col px-4 sm:px-6 lg:px-12">
        {/* ---------- Header ---------- */}
        <header className="flex shrink-0 items-center justify-between gap-2 py-4 lg:py-3 xl:py-4">
          <Brand />
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <div className="flex h-9 items-center rounded-full sm:h-11 bg-white/90 px-1.5 shadow-[0_4px_16px_rgba(30,64,175,0.08)] ring-1 ring-[#EEF2FF]">
              {LANGS.map((code, i) => (
                <span key={code} className="flex items-center">
                  {i > 0 && <span className="h-4 w-px bg-[#D9E0EE]" />}
                  <button
                    onClick={() => changeLang(code)}
                    className={`px-2 text-[13px] font-bold uppercase transition sm:px-3 sm:text-[15px] ${
                      lang === code ? 'text-[#1D4FE0]' : 'text-[#9AA6BC] hover:text-[#475569]'
                    }`}
                  >
                    {code}
                  </button>
                </span>
              ))}
            </div>
            <button
              onClick={openAuth}
              className="flex h-9 items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#1F8BFF] to-[#1D4FE0] px-3.5 text-[13px] font-bold sm:h-11 sm:px-5 sm:text-[15px] text-white shadow-[0_10px_24px_-10px_rgba(29,79,224,0.9)] transition hover:brightness-110 sm:h-12 sm:px-7"
            >
              <FaUser size={15} className="hidden sm:block" />
              {text.login}
            </button>
          </div>
        </header>

        {/* ---------- Sarlavha ---------- */}
        <div className="relative mx-auto mt-1 shrink-0 text-center sm:mt-2 lg:mt-0">
          {/* Sarlavha oldidagi "chaqnash" chiziqlari */}
          <svg viewBox="0 0 48 40" className="absolute -left-9 -top-5 hidden h-10 w-12 text-[#1D4FE0] sm:block" aria-hidden="true">
            <path d="M8 30 2 25M18 20 13 6M32 18 35 3" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
          <h1 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-[46px] lg:text-[56px] [@media(min-width:1024px)_and_(max-height:780px)]:text-[42px]">
            {text.title}{' '}
            <span className="bg-gradient-to-r from-[#1D6BFF] to-[#1D4FE0] bg-clip-text text-transparent">{text.titleAccent}</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[680px] text-[15px] font-medium text-[#55627A] sm:text-[19px] [@media(min-width:1024px)_and_(max-height:780px)]:mt-1.5 [@media(min-width:1024px)_and_(max-height:780px)]:text-[16px]">{text.subtitle}</p>
          {/* Punktir o'q */}
          <svg viewBox="0 0 220 70" className="absolute -right-56 top-6 hidden h-16 w-52 text-[#8FA9F5] xl:block" aria-hidden="true">
            <path d="M4 64C60 60 120 40 165 18" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 7" fill="none" strokeLinecap="round" />
            <path d="M150 34c4-12 14-20 30-22m0 0c-10-2-18-1-26 3m26-3c-6 6-8 13-8 20" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* ---------- Rollar ---------- */}
        <div className="mt-8 grid gap-5 md:grid-cols-3 lg:mt-7 lg:min-h-0 lg:flex-1 lg:gap-7 [@media(min-width:1024px)_and_(max-height:780px)]:mt-5">
          {ROLES.map(({ key, href, image, Icon, iconBg, button }) => {
            const role = text.roles[key]
            const content = (
              <>
                <div className="relative aspect-[5/4] overflow-hidden lg:aspect-auto lg:min-h-[150px] lg:flex-1">
                  <img
                    src={image}
                    alt={role.title}
                    className="h-full w-full object-cover object-[50%_30%] transition duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="relative -mt-8 flex shrink-0 flex-col rounded-t-[28px] bg-white px-5 pb-6 pt-6 sm:px-7 sm:pb-7 [@media(min-width:1024px)_and_(max-height:780px)]:pb-5 [@media(min-width:1024px)_and_(max-height:780px)]:pt-4">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] text-white sm:h-[76px] sm:w-[76px] [@media(min-width:1024px)_and_(max-height:780px)]:h-14 [@media(min-width:1024px)_and_(max-height:780px)]:w-14 ${iconBg}`}>
                      <Icon size={32} />
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-[24px] font-extrabold leading-tight tracking-[-0.01em] sm:text-[30px]">{role.title}</h2>
                      <p className="mt-1 text-[15px] font-medium text-[#5B6478] sm:text-[17px]">{role.text}</p>
                    </div>
                  </div>
                  <span
                    className={`mt-6 [@media(min-width:1024px)_and_(max-height:780px)]:mt-4 [@media(min-width:1024px)_and_(max-height:780px)]:h-12 flex h-14 items-center justify-center gap-2.5 rounded-[18px] text-[17px] font-bold text-white transition group-hover:brightness-110 sm:h-16 sm:text-[19px] ${button}`}
                  >
                    {role.button}
                    <ArrowRight size={22} strokeWidth={2.5} className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </>
            )
            const cardClass =
              'group flex flex-col overflow-hidden lg:min-h-0 rounded-[30px] bg-white text-left ring-1 ring-white shadow-[0_18px_50px_-18px_rgba(30,58,138,0.28)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(30,58,138,0.4)]'
            return href ? (
              <Link key={key} href={withQuery(href)} className={cardClass}>
                {content}
              </Link>
            ) : (
              <button key={key} type="button" onClick={openAuth} className={cardClass}>
                {content}
              </button>
            )
          })}
        </div>
      </div>

      {/* ---------- Aloqa va ilovalar: to'lqinsimon oq panel ---------- */}
      <footer className="relative mt-8 shrink-0 lg:mt-4">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block h-6 w-full text-white/80 sm:h-8" aria-hidden="true">
          <path d="M0 60V38C240 4 480 0 720 14s480 30 720 2v44Z" fill="currentColor" />
        </svg>
        <div className="bg-white/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1200px] flex-col items-stretch gap-3 px-4 pb-6 pt-2 md:flex-row md:items-center md:justify-center md:gap-10 lg:pb-5 lg:pt-1">
            <a href="tel:+998788881881" className="group flex items-center gap-4 rounded-2xl bg-white p-3 shadow-[0_6px_20px_-12px_rgba(30,58,138,0.3)] ring-1 ring-[#EEF2F7] md:rounded-none md:bg-transparent md:p-0 md:shadow-none md:ring-0">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F0FF] md:h-14 md:w-14 text-[#1D6BFF] transition group-hover:bg-[#D6E4FF]">
                <FaPhoneAlt size={22} />
              </span>
              <span>
                <span className="block text-[17px] font-extrabold tracking-[-0.01em] md:text-[19px]">{PHONE}</span>
                <span className="block text-[13px] text-[#64748B] md:text-[15px]">{text.call}</span>
              </span>
            </a>
            <span className="hidden h-12 w-px bg-[#DCE3F0] md:block" />
            <a href={SOCIAL_LINKS.telegramHelp} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl bg-white p-3 shadow-[0_6px_20px_-12px_rgba(30,58,138,0.3)] ring-1 ring-[#EEF2F7] md:rounded-none md:bg-transparent md:p-0 md:shadow-none md:ring-0">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5F4FD] md:h-14 md:w-14 text-[#229ED9] transition group-hover:bg-[#D3ECFB]">
                <FaTelegramPlane size={24} />
              </span>
              <span>
                <span className="block text-[17px] font-extrabold tracking-[-0.01em] md:text-[19px]">@Iqmath_help</span>
                <span className="block text-[13px] text-[#64748B] md:text-[15px]">{text.write}</span>
              </span>
            </a>
            <span className="hidden h-12 w-px bg-[#DCE3F0] md:block" />
            <div className="grid grid-cols-2 gap-3 md:flex md:items-center">
              <a
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[54px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[14px] bg-black px-3 text-white transition hover:-translate-y-0.5 hover:bg-[#111827] md:h-[58px] md:justify-start md:gap-3 md:px-5"
              >
                <PlayIcon />
                <span className="leading-tight">
                  <span className="block text-[10px] font-medium uppercase tracking-wide text-white/80">Get it on</span>
                  <span className="block text-[16px] font-semibold md:text-[19px]">Google Play</span>
                </span>
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[54px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[14px] bg-black px-3 text-white transition hover:-translate-y-0.5 hover:bg-[#111827] md:h-[58px] md:justify-start md:gap-3 md:px-5"
              >
                <FaApple size={26} className="shrink-0" />
                <span className="leading-tight">
                  <span className="block text-[10px] font-medium tracking-wide text-white/80">Download on the</span>
                  <span className="block text-[16px] font-semibold md:text-[19px]">App Store</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Pastda yuradigan 3D robot (faqat kompyuterda) */}
      <div className="hidden lg:block">
        <RobotWalker />
      </div>

      <AuthModal open={authOpen} onClose={closeAuth} title={text.auth}>
        <Auth />
      </AuthModal>
    </div>
  )
}

export default RoleChooser
