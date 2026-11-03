import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Check, Clock, Menu, X } from 'lucide-react'
import { FaChalkboardTeacher, FaGraduationCap, FaTrophy, FaUser, FaUsers } from 'react-icons/fa'
import Brand from '@/components/brand'
import { useSettingsStore } from '@/store'
import AuthModal from '../auth/AuthModal'
import Auth from '../auth/Auth'

const TEXT = {
  uz: {
    // Ekranda ko'rinmaydi — sahifa sarlavhasi (SEO va ekran o'quvchilar uchun)
    title: 'O‘zingizga mos yo‘nalishni tanlang',
    login: 'Tizimga kirish',
    menu: 'Menyu',
    nav: [
      ['/about', 'Biz haqimizda'],
      ['/prices', 'Tariflar'],
      ['/news', 'Yangiliklar'],
      ['/contact', 'Bog‘lanish']
    ],
    auth: 'Kirish / Ro‘yxatdan o‘tish',
    more: 'Batafsil',
    soon: 'Tez kunda',
    roles: {
      parent: {
        title: 'Ota-ona',
        text: 'Farzandingiz natijasini kuzating',
        points: ['Bir nechta farzand — bitta kabinet', 'Farzandingizning o‘qish natijalari', 'Darslar va mashqlar hisoboti', 'Rivojlanish grafigi']
      },
      student: {
        title: 'O‘quvchi',
        text: 'O‘ynab o‘rgan, bilimingni sina',
        points: ['Video darslar va tushuntirishlar', 'Mavzular bo‘yicha mashqlar', 'Testlar va sinovlar', 'O‘yinlar va bellashuvlar']
      },
      teacher: {
        title: 'O‘qituvchi',
        text: 'O‘quvchilaringizni qo‘shing va daromad qiling',
        points: ['Guruhlar va o‘quvchilarni boshqarish', 'Promo havola orqali bonus', 'Natijalar tahlili va statistika', 'Tayyor darslar va misollar']
      },
      league: {
        title: 'Matematik Liga',
        text: '1–11-sinflar o‘rtasida bilimlar bellashuvi',
        points: ['Har bir sinf uchun alohida liga', 'Haftalik va oylik musobaqalar', 'Reyting va TOP-100 o‘quvchilar', 'G‘oliblar uchun sovrinlar']
      }
    }
  },
  ru: {
    title: 'Выберите своё направление',
    login: 'Вход',
    menu: 'Меню',
    nav: [
      ['/about', 'О нас'],
      ['/prices', 'Тарифы'],
      ['/news', 'Новости'],
      ['/contact', 'Контакты']
    ],
    auth: 'Вход / Регистрация',
    more: 'Подробнее',
    soon: 'Скоро',
    roles: {
      parent: {
        title: 'Родитель',
        text: 'Следите за успехами ребёнка',
        points: ['Несколько детей — один кабинет', 'Результаты учёбы ребёнка', 'Отчёт по урокам и упражнениям', 'График прогресса']
      },
      student: {
        title: 'Ученик',
        text: 'Учись играя, проверяй свои знания',
        points: ['Видеоуроки и объяснения', 'Упражнения по темам', 'Тесты и проверки', 'Игры и баттлы']
      },
      teacher: {
        title: 'Учитель',
        text: 'Подключайте учеников и зарабатывайте',
        points: ['Управление группами и учениками', 'Бонус по промо-ссылке', 'Анализ результатов и статистика', 'Готовые уроки и задания']
      },
      league: {
        title: 'Математическая лига',
        text: 'Состязание знаний среди 1–11 классов',
        points: ['Отдельная лига для каждого класса', 'Еженедельные и ежемесячные соревнования', 'Рейтинг и ТОП-100 учеников', 'Призы для победителей']
      }
    }
  }
}

// Har bir panel: fon rasmi (odamlar pastda-o'ngda, yuqori-chap bo'sh — matn uchun), rang va qayerga olib borishi
const ROLES = [
  {
    key: 'parent',
    href: '/parents',
    image: '/images/roles/panel-parent.webp',
    Icon: FaUsers,
    iconBg: 'bg-gradient-to-br from-[#FFA24C] to-[#F97316] shadow-[0_12px_24px_-10px_rgba(249,115,22,0.8)]',
    check: 'bg-[#F97316]',
    button: 'bg-gradient-to-r from-[#FF8A2B] to-[#F2600C] shadow-[0_16px_32px_-12px_rgba(249,115,22,0.9)]',
    // Telefonda rasm ustidagi matn o'qilishi uchun yuqoridan rangli parda
    veil: 'from-[#FFF1E4]'
  },
  {
    key: 'student',
    href: '/students',
    image: '/images/roles/panel-student.webp',
    Icon: FaGraduationCap,
    iconBg: 'bg-gradient-to-br from-[#3E9BFF] to-[#1D5CF0] shadow-[0_12px_24px_-10px_rgba(37,99,235,0.8)]',
    check: 'bg-[#1D6BFF]',
    button: 'bg-gradient-to-r from-[#1F8BFF] to-[#1D4FE0] shadow-[0_16px_32px_-12px_rgba(37,99,235,0.9)]',
    veil: 'from-[#E3F0FF]'
  },
  {
    key: 'teacher',
    href: '/teachers',
    image: '/images/roles/panel-teacher.webp',
    Icon: FaChalkboardTeacher,
    iconBg: 'bg-gradient-to-br from-[#B46CFF] to-[#7C3AED] shadow-[0_12px_24px_-10px_rgba(124,58,237,0.8)]',
    check: 'bg-[#7C3AED]',
    button: 'bg-gradient-to-r from-[#7C3AED] to-[#9B3CF5] shadow-[0_16px_32px_-12px_rgba(124,58,237,0.9)]',
    veil: 'from-[#EFE6FF]'
  },
  {
    key: 'league',
    href: '/liga',
    // Liga sahifasi hali tayyor emas — panel bosilmaydi, tugmada "Tez kunda"
    soon: true,
    image: '/images/roles/panel-league.webp',
    Icon: FaTrophy,
    iconBg: 'bg-gradient-to-br from-[#FFCB45] to-[#F59E0B] shadow-[0_12px_24px_-10px_rgba(245,158,11,0.8)]',
    check: 'bg-[#F59E0B]',
    button: 'bg-gradient-to-r from-[#FFC233] to-[#F29A0B] shadow-[0_16px_32px_-12px_rgba(245,158,11,0.9)]',
    veil: 'from-[#FFF6DA]'
  }
]

const LANGS = ['uz', 'ru']

/** iqmath.uz bosh sahifasi: to'rtta to'liq balandlikdagi panel — ota-ona, o'quvchi, o'qituvchi, matematik liga */
const RoleChooser = () => {
  const { i18n } = useTranslation()
  const router = useRouter()
  const setLang = useSettingsStore((state) => state.setLang || (() => {}))
  const [lang, setLangState] = useState('uz')
  const [authOpen, setAuthOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const text = TEXT[lang]
  // Kompyuterda sarlavhalar bir qatorda va to'rttalasida bir xil o'lchamda: eng uzun sarlavha panelga sig'adigan qilib olinadi
  const longestTitle = Math.max(...ROLES.map(({ key }) => text.roles[key].title.length))
  const titleSize = `clamp(26px, ${Math.min(2.9, 16 / (longestTitle * 0.62)).toFixed(2)}vw, 54px)`
  // Planshetda (2×2 to'r) — panel kengligi ekranning yarmi
  const titleSizeTablet = `min(46px, calc((50vw - 192px) / ${(longestTitle * 0.62).toFixed(2)}))`

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
    <div className="relative min-h-screen overflow-hidden bg-white text-[#0B1220] xl:h-[max(100dvh,680px)] xl:min-h-0">
      <h1 className="sr-only">{text.title}</h1>

      {/* ---------- Header: panellar ustida ---------- */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-2 px-4 py-4 sm:px-8 xl:px-12 xl:py-6">
        <Brand />
        {/* Menyu: kompyuterda header o'rtasida */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full bg-white/90 p-1.5 shadow-[0_4px_16px_rgba(30,64,175,0.12)] backdrop-blur xl:flex">
          {text.nav.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="whitespace-nowrap rounded-full px-4 py-2 text-[15px] font-semibold text-[#1E293B] transition hover:bg-[#EEF3FF] hover:text-[#1D4FE0]"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <div className="flex h-9 items-center rounded-full bg-white/95 px-1.5 shadow-[0_4px_16px_rgba(30,64,175,0.12)] sm:h-11">
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
            className="flex h-9 items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#1F8BFF] to-[#1D4FE0] px-3.5 text-[13px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(29,79,224,0.9)] transition hover:brightness-110 sm:h-11 sm:px-6 sm:text-[15px]"
          >
            <FaUser size={14} className="hidden sm:block" />
            {text.login}
          </button>
          {/* Telefon va planshetda menyu tugmasi */}
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={text.menu}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#1D4FE0] shadow-[0_4px_16px_rgba(30,64,175,0.12)] sm:h-11 sm:w-11 xl:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="absolute inset-x-4 top-full flex flex-col rounded-2xl bg-white p-2 shadow-[0_20px_40px_-16px_rgba(30,64,175,0.35)] sm:left-auto sm:right-8 sm:w-[260px] xl:hidden">
            {text.nav.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-[16px] font-semibold text-[#1E293B] transition hover:bg-[#EEF3FF] hover:text-[#1D4FE0]"
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* ---------- Panellar ---------- */}
      {/* Telefonda ustma-ust, planshetda har biri bitta qator (rasm | matn, navbatma-navbat), kompyuterda (xl) to'rttasi yonma-yon */}
      <div className="flex flex-col gap-1 xl:h-full xl:flex-row">
        {ROLES.map(({ key, href, soon, image, Icon, iconBg, check, button, veil }, index) => {
          const role = text.roles[key]
          const Panel = soon ? 'div' : Link
          return (
            <Panel
              key={key}
              {...(soon ? { 'aria-disabled': true } : { href: withQuery(href) })}
              className={`group relative flex flex-1 flex-col overflow-hidden bg-gradient-to-b to-white md:grid md:grid-cols-2 xl:flex xl:min-h-0 xl:basis-0 ${veil} ${
                index === 0 ? 'pt-16 xl:pt-0' : ''
              }`}
            >
              {/* Fon rasmi (kompyuterda butun panel bo'ylab) */}
              <img
                src={image}
                alt=""
                className="absolute inset-x-0 bottom-0 hidden h-auto max-h-full w-full object-cover object-[70%_100%] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_22%)] [mask-image:linear-gradient(to_bottom,transparent,#000_22%)] xl:block"
              />
              {/* Tepada yumshoq rangli parda — rasm cheti ko'rinmasin va matn o'qilsin */}
              <div className={`absolute inset-x-0 top-0 hidden h-[55%] bg-gradient-to-b to-transparent opacity-80 xl:block ${veil}`} />

              {/* Matn: panel tepasida (header ostida), odamlar esa rasm bilan birga pastda */}
              <div className="relative z-10 flex w-full flex-col px-6 pb-6 pt-8 sm:px-10 md:justify-center xl:justify-start xl:px-[clamp(20px,2.2vw,44px)] xl:pt-[clamp(120px,19vh,220px)]">
                {/* Chapda kattaroq ikonka, o'ngida sarlavha va uning ostida shior */}
                <div className="flex items-center gap-4 xl:items-start xl:gap-[clamp(14px,1.1vw,20px)]">
                  <span className={`flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[20px] text-white md:h-[76px] md:w-[76px] md:rounded-[22px] xl:h-[clamp(64px,7.6vh,86px)] xl:w-[clamp(64px,7.6vh,86px)] ${iconBg}`}>
                    <Icon className="h-8 w-8 md:h-9 md:w-9" />
                  </span>
                  <div className="min-w-0">
                    <h2
                      className="text-[36px] font-extrabold leading-[1.02] tracking-[-0.035em] md:whitespace-nowrap md:text-[length:var(--title-size-tablet)] xl:text-[length:var(--title-size)]"
                      style={{ '--title-size': titleSize, '--title-size-tablet': titleSizeTablet }}
                    >
                      {role.title}
                    </h2>
                    {/* Kompyuterda shior uchun 2 qatorlik joy — shior 1 yoki 2 qator bo'lsa ham to'rtala panelda ro'yxat va tugma bir chiziqda */}
                    <p className="mt-1.5 text-[15px] font-medium leading-[1.35] text-[#334155] xl:min-h-[2.7em] xl:text-[clamp(14px,0.95vw,18px)]">
                      {role.text}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 pl-[22px] md:pl-[26px] xl:mt-[clamp(14px,2.4vh,28px)] xl:space-y-[clamp(6px,1.3vh,13px)] xl:pl-0">
                  {role.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-[15px] font-medium text-[#1E293B] xl:gap-3 xl:text-[clamp(14px,0.92vw,18px)]">
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white xl:h-[22px] xl:w-[22px] ${check}`}>
                        <Check size={14} strokeWidth={3} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                <span
                  className={`mt-8 inline-flex h-14 w-fit items-center gap-3 rounded-2xl px-8 text-[17px] font-bold text-white transition xl:mt-[clamp(18px,3vh,32px)] xl:h-[clamp(44px,5.4vh,54px)] xl:rounded-xl xl:px-6 xl:text-[clamp(15px,1.02vw,18px)] ${button} ${
                    soon ? 'cursor-default' : 'group-hover:brightness-110'
                  }`}
                >
                  {soon ? <Clock size={20} strokeWidth={2.5} /> : null}
                  {soon ? text.soon : text.more}
                  {soon ? null : <ArrowRight size={20} strokeWidth={2.5} className="transition group-hover:translate-x-1" />}
                </span>
              </div>
              {/* Telefonda rasm matndan oldin. Planshetda shaxmat: rasm va uning matni yonma-yon,
                  qatorlar navbatma-navbat (rasm | matn, matn | rasm) */}
              <div
                className={`relative order-first h-[300px] sm:h-[380px] md:h-auto md:min-h-[320px] xl:hidden ${
                  index % 2 ? 'md:order-last' : ''
                }`}
              >
                <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover object-[70%_88%]" />
              </div>
            </Panel>
          )
        })}
      </div>

      <AuthModal open={authOpen} onClose={closeAuth} title={text.auth}>
        <Auth />
      </AuthModal>
    </div>
  )
}

export default RoleChooser
