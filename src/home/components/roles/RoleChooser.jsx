import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Check } from 'lucide-react'
import { FaChalkboardTeacher, FaGraduationCap, FaUser, FaUsers } from 'react-icons/fa'
import Brand from '@/components/brand'
import { useSettingsStore } from '@/store'
import AuthModal from '../auth/AuthModal'
import Auth from '../auth/Auth'

const TEXT = {
  uz: {
    // Ekranda ko'rinmaydi — sahifa sarlavhasi (SEO va ekran o'quvchilar uchun)
    title: 'O‘zingizga mos yo‘nalishni tanlang',
    login: 'Tizimga kirish',
    auth: 'Kirish / Ro‘yxatdan o‘tish',
    roles: {
      parent: {
        title: 'Ota-ona',
        text: 'Farzandingiz natijasini kuzating',
        button: 'Ota-onalar uchun',
        points: ['Farzandingizning o‘qish natijalari', 'Darslar va mashqlar hisoboti', 'Rivojlanish grafigi', 'Bir nechta farzand — bitta kabinet']
      },
      student: {
        title: 'O‘quvchi',
        text: 'O‘ynab o‘rgan, bilimingni sina',
        button: 'O‘quvchilar uchun',
        points: ['Video darslar va tushuntirishlar', 'Mavzular bo‘yicha mashqlar', 'Testlar va sinovlar', 'O‘yinlar va bellashuvlar']
      },
      teacher: {
        title: 'O‘qituvchi',
        text: 'O‘quvchilaringizni qo‘shing va daromad qiling',
        button: 'O‘qituvchilar uchun',
        points: ['Guruhlar va o‘quvchilarni boshqarish', 'Promo havola orqali bonus', 'Natijalar tahlili va statistika', 'Tayyor darslar va misollar']
      }
    }
  },
  ru: {
    title: 'Выберите своё направление',
    login: 'Вход',
    auth: 'Вход / Регистрация',
    roles: {
      parent: {
        title: 'Родитель',
        text: 'Следите за успехами ребёнка',
        button: 'Для родителей',
        points: ['Результаты учёбы ребёнка', 'Отчёт по урокам и упражнениям', 'График прогресса', 'Несколько детей — один кабинет']
      },
      student: {
        title: 'Ученик',
        text: 'Учись играя, проверяй свои знания',
        button: 'Для учеников',
        points: ['Видеоуроки и объяснения', 'Упражнения по темам', 'Тесты и проверки', 'Игры и баттлы']
      },
      teacher: {
        title: 'Учитель',
        text: 'Подключайте учеников и зарабатывайте',
        button: 'Для учителей',
        points: ['Управление группами и учениками', 'Бонус по промо-ссылке', 'Анализ результатов и статистика', 'Готовые уроки и задания']
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
  }
]

const LANGS = ['uz', 'ru']

/** iqmath.uz bosh sahifasi: uchta to'liq balandlikdagi panel — ota-ona, o'quvchi, o'qituvchi */
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
    <div className="relative min-h-screen overflow-hidden bg-white text-[#0B1220] lg:h-[max(100dvh,680px)] lg:min-h-0">
      <h1 className="sr-only">{text.title}</h1>

      {/* ---------- Header: panellar ustida ---------- */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-2 px-4 py-4 sm:px-8 lg:px-12 lg:py-6">
        <Brand />
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
        </div>
      </header>

      {/* ---------- Panellar ---------- */}
      <div className="flex flex-col lg:h-full lg:flex-row">
        {ROLES.map(({ key, href, image, Icon, iconBg, check, button, veil }, index) => {
          const role = text.roles[key]
          return (
            <Link
              key={key}
              href={withQuery(href)}
              className={`group relative flex flex-1 flex-col overflow-hidden bg-gradient-to-b to-white lg:min-h-0 lg:basis-0 ${veil} ${
                index > 0 ? 'border-t-4 border-white lg:border-l-4 lg:border-t-0' : 'pt-16 lg:pt-0'
              }`}
            >
              {/* Fon rasmi (kompyuterda butun panel bo'ylab) */}
              <img
                src={image}
                alt=""
                className="absolute inset-0 hidden h-full w-full object-cover object-[70%_100%] lg:block"
              />
              <div className={`absolute inset-x-0 top-0 hidden h-2/3 bg-gradient-to-b to-transparent opacity-40 lg:block ${veil}`} />

              {/* Matn: yuqori-chapda, rasmdagi bo'sh joyda */}
              <div className="relative z-10 flex w-full flex-col px-6 pb-6 pt-8 sm:px-10 lg:px-[clamp(24px,3vw,60px)] lg:pt-[clamp(96px,13vh,140px)]">
                <span className={`flex h-16 w-16 items-center justify-center rounded-[20px] text-white lg:h-[clamp(56px,6.5vh,76px)] lg:w-[clamp(56px,6.5vh,76px)] ${iconBg}`}>
                  <Icon size={30} />
                </span>
                <h2 className="mt-5 text-[44px] font-extrabold leading-[1.02] tracking-[-0.035em] lg:text-[clamp(40px,4.4vw,76px)]">
                  {role.title}
                </h2>
                <p className="mt-2 max-w-[420px] text-[17px] font-medium text-[#334155] lg:text-[clamp(16px,1.25vw,22px)]">{role.text}</p>

                <ul className="mt-6 space-y-3 lg:mt-[clamp(18px,3vh,36px)] lg:space-y-[clamp(8px,1.6vh,16px)]">
                  {role.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-[15px] font-medium text-[#1E293B] lg:text-[clamp(14px,1vw,18px)]">
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white ${check}`}>
                        <Check size={14} strokeWidth={3} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                <span
                  className={`mt-8 inline-flex h-14 w-fit items-center gap-3 rounded-2xl px-8 text-[17px] font-bold text-white transition group-hover:brightness-110 lg:mt-[clamp(20px,4vh,44px)] lg:h-[clamp(52px,6.5vh,64px)] lg:text-[clamp(16px,1.15vw,20px)] ${button}`}
                >
                  {role.button}
                  <ArrowRight size={20} strokeWidth={2.5} className="transition group-hover:translate-x-1" />
                </span>
              </div>
              {/* Telefonda: rasmning odamlar turgan pastki qismi matn ostida */}
              <img src={image} alt="" className="relative h-[300px] w-full object-cover object-[70%_88%] sm:h-[380px] lg:hidden" />
            </Link>
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
