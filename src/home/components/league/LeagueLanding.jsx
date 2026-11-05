import { useEffect, useState } from 'react'
import { ArrowRight, CalendarDays, ChartColumnIncreasing, ClipboardCheck, CreditCard, Flag, Gift, Layers, Target, UserPlus, Zap } from 'lucide-react'
import { FaSignal, FaTrophy, FaUsers } from 'react-icons/fa'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'
import { Card, Faq, LandingShell, Section, useRoleLanding } from '../role-landing/shared'
import LeagueDetails from './LeagueDetails'

const TEXT = {
  uz: {
    nav: [
      ['/', 'Asosiy'],
      ['#features', 'Liga haqida'],
      ['#prizes', 'Sovg‘alar'],
      ['#rules', 'Qoidalar'],
      ['#faq', 'Savollar']
    ],
    login: 'Tizimga kirish',
    badge: 'IQMath Liga',
    title: ['Matematik', 'Liga'],
    subtitle: '1–11-sinf o‘quvchilari o‘rtasida respublika miqyosidagi onlayn matematik musobaqa',
    join: 'Ro‘yxatdan o‘tish',
    season: (number, weeks) => `${number}-mavsum · ${weeks} hafta`,
    soon: '1-mavsum tez kunda',
    stats: [
      ['1–11', 'sinflar'],
      ['100 000+', 'qatnashchi'],
      ['500 000+', 'yechilgan masala']
    ],
    howBadge: 'Ishtirok tartibi',
    howTitle: ['Qanday', 'ishtirok', 'etiladi?'],
    steps: ['Ro‘yxatdan o‘ting', 'Obunani faollashtiring', 'Ligaga qo‘shiling', 'Haftalik testlarni yeching'],
    featuresTitle: ['Ligada nimalar', 'kutmoqda?'],
    features: [
      ['Bilim sinovi', 'O‘z bilimingizni sinab ko‘ring'],
      ['Sog‘lom raqobat', 'O‘z sinfingizdagi o‘quvchilar bilan bellashing'],
      ['Reyting tizimi', 'Har bir sinf uchun alohida reyting'],
      ['Sovrinlar', 'Har bir sinfning 3 g‘olibi uchun qimmatbaho sovg‘alar']
    ],
    faqBadge: 'Savollar va javoblar',
    faqTitle: 'Ko‘p beriladigan savollar',
    faq: [
      ['Ligada kimlar qatnasha oladi?', '1–11-sinf o‘quvchilari. Har bir o‘quvchi o‘z sinfining alohida ligasida, tengdoshlari bilan bellashadi.'],
      ['Qanday ro‘yxatdan o‘tiladi?', '“Ro‘yxatdan o‘tish” tugmasini bosing, ism-familiyangiz, telefon raqamingiz va sinfingizni kiriting.'],
      ['Ligada qatnashish pullikmi?', 'Ligada obunasi faol bo‘lgan o‘quvchilar qatnashadi. Alohida ishtirok to‘lovi yo‘q.'],
      ['Musobaqalar qachon o‘tkaziladi?', 'Har haftada bitta test o‘tkaziladi. Aniq kun va soat shaxsiy kabinetdagi Liga bo‘limida e’lon qilinadi.'],
      ['Reyting qanday hisoblanadi?', 'Kunlik kirish, fanlarni ishlash va haftalik testlar uchun ball beriladi. Reyting har bir sinf uchun alohida.'],
      ['G‘oliblar qanday taqdirlanadi?', 'Mavsum yakunida har bir sinfning 3 g‘olibi sovg‘a oladi. Sovg‘a berishdan oldin hujjatlar tekshiriladi.'],
      ['Telefondan qatnashsa bo‘ladimi?', 'Ha, ligada telefon, planshet yoki kompyuter orqali qatnashish mumkin.']
    ]
  },
  ru: {
    nav: [
      ['/', 'Главная'],
      ['#features', 'О лиге'],
      ['#prizes', 'Призы'],
      ['#rules', 'Правила'],
      ['#faq', 'Вопросы']
    ],
    login: 'Вход',
    badge: 'IQMath Лига',
    title: ['Математическая', 'лига'],
    subtitle: 'Республиканское онлайн-соревнование по математике среди учеников 1–11 классов',
    join: 'Регистрация',
    season: (number, weeks) => `Сезон ${number} · недель: ${weeks}`,
    soon: 'Сезон 1 скоро',
    stats: [
      ['1–11', 'классы'],
      ['100 000+', 'участников'],
      ['500 000+', 'решённых задач']
    ],
    howBadge: 'Порядок участия',
    howTitle: ['Как', 'принять', 'участие?'],
    steps: ['Зарегистрируйтесь', 'Активируйте подписку', 'Вступите в лигу', 'Решайте еженедельные тесты'],
    featuresTitle: ['Что ждёт', 'в лиге?'],
    features: [
      ['Проверка знаний', 'Проверьте свои знания'],
      ['Здоровая конкуренция', 'Соревнуйтесь с учениками своего класса'],
      ['Система рейтинга', 'Отдельный рейтинг для каждого класса'],
      ['Призы', 'Ценные подарки для 3 победителей каждого класса']
    ],
    faqBadge: 'Вопросы и ответы',
    faqTitle: 'Часто задаваемые вопросы',
    faq: [
      ['Кто может участвовать в лиге?', 'Ученики 1–11 классов. Каждый соревнуется в отдельной лиге своего класса — со сверстниками.'],
      ['Как зарегистрироваться?', 'Нажмите «Регистрация» и укажите имя, номер телефона и свой класс.'],
      ['Участие в лиге платное?', 'В лиге участвуют ученики с активной подпиской. Отдельной платы за участие нет.'],
      ['Когда проходят соревнования?', 'Каждую неделю проходит один тест. Точные день и время публикуются в разделе Лига в личном кабинете.'],
      ['Как считается рейтинг?', 'Баллы начисляются за ежедневный вход, занятия по предметам и еженедельные тесты. Рейтинг отдельный для каждого класса.'],
      ['Как награждают победителей?', 'В конце сезона 3 победителя каждого класса получают призы. Перед вручением проверяются документы.'],
      ['Можно ли участвовать с телефона?', 'Да, участвовать можно с телефона, планшета или компьютера.']
    ]
  }
}

const STAT_ICONS = [FaUsers, FaTrophy, FaSignal]
const STEP_ICONS = [UserPlus, CreditCard, Flag, ClipboardCheck]
// [burchakdagi ikonka, 3D rasm]
const FEATURES = [
  [Target, '/images/league/feature-test.webp'],
  [Zap, '/images/league/feature-rivalry.webp'],
  [ChartColumnIncreasing, '/images/league/feature-rating.webp'],
  [Gift, '/images/league/feature-prizes.webp']
]

/** Matematik Liga landingi (/liga) */
const LeagueLanding = () => {
  // Liga o'quvchilar uchun — ro'yxatdan o'tishda rol "O'quvchi" bo'lib qulflanadi
  const landing = useRoleLanding('student')
  const t = TEXT[landing.lang]
  const [season, setSeason] = useState(null)
  const [winners, setWinners] = useState(null)

  // Mavsum yo'q yoki so'rov o'tmasa sahifa odatiy matnlar bilan chiqadi
  useEffect(() => {
    request.get(URLS.ligaCurrent).then(({ data }) => setSeason(data?.season || null)).catch(() => {})
    request.get(URLS.ligaWinners).then(({ data }) => setWinners(data?.[0] || null)).catch(() => {})
  }, [])

  return (
    <LandingShell accent="league" nav={t.nav} landing={landing} loginLabel={t.login}>
      {/* ================= HERO: o'ngda kubok, chapda matn ================= */}
      <section className="relative overflow-hidden">
        {/* Telefon/planshet: kubok tepada */}
        <div className="relative h-[280px] w-full overflow-hidden sm:h-[400px] lg:hidden">
          <img src="/images/league/hero-sm.webp" alt="" className="h-full w-full object-cover object-[60%_50%]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F5F8FF] to-transparent" />
        </div>
        {/* Katta ekran: rasm butun hero bo'ylab (chap tomoni bo'sh — matn shu yerda) */}
        <div className="absolute inset-0 hidden lg:block">
          <img src="/images/league/hero.webp" alt="" className="h-full w-full object-cover object-[75%_50%]" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F5F8FF] to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-4 pb-10 pt-2 sm:px-6 lg:flex lg:min-h-[640px] lg:items-center lg:px-10 lg:pb-24 lg:pt-6 xl:min-h-[700px]">
          <div className="font-['Manrope','Inter',system-ui,sans-serif] lg:w-[54%]">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[#C9D8F5] bg-[#EAF1FF]/80 px-5 py-2.5 text-[15px] font-bold text-[#0B1B3F] shadow-[0_8px_24px_-14px_rgba(29,79,224,0.5)] backdrop-blur xl:text-[17px]">
                <FaTrophy size={20} className="text-[#F5A524]" />
                {t.badge}
              </span>
              {season?.is_closed ? null : (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2.5 text-[14px] font-bold text-[#1D4FE0] backdrop-blur xl:text-[16px]">
                  <CalendarDays size={18} />
                  {season ? t.season(season.number, season.weeks_count) : t.soon}
                </span>
              )}
            </div>
            {/* "Liga" — ko'k, qiya, ostida mo'yqalam chizig'i */}
            <h1 className="mt-6 text-[42px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#0B1B3F] sm:text-[58px] lg:whitespace-nowrap lg:text-[clamp(54px,4.3vw,84px)]">
              {t.title[0]}{' '}
              <span className="relative inline-block whitespace-nowrap pb-2 pr-1 italic text-[#1D4FE0]">
                {t.title[1]}
                <svg className="absolute -bottom-1 right-0 h-3 w-[105%]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  <path d="M3 9C60 3 140 2 197 5" stroke="#1D4FE0" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-5 max-w-[620px] text-[17px] leading-relaxed text-[#334155] lg:text-[clamp(18px,1.35vw,24px)]">{t.subtitle}</p>

            <div className="mt-9 flex flex-wrap gap-3 xl:gap-5">
              <button
                onClick={landing.openSignUp}
                className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#1F6BFF] to-[#1D3FD8] px-8 text-[17px] font-bold text-white shadow-[0_16px_32px_-12px_rgba(29,79,224,0.9)] transition hover:brightness-110 xl:h-16 xl:px-10 xl:text-[19px]"
              >
                {t.join}
                <ArrowRight size={20} strokeWidth={2.5} className="transition group-hover:translate-x-1" />
              </button>
            </div>

            {/* Ko'rsatkichlar — orasida ingichka chiziq */}
            <div className="mt-10 flex flex-wrap items-center gap-y-4">
              {t.stats.map(([value, label], i) => {
                const Icon = STAT_ICONS[i]
                return (
                  <div key={label} className={`flex items-center gap-3 pr-6 sm:pr-10 ${i ? 'border-l border-[#D5DEEE] pl-6 sm:pl-10' : ''}`}>
                    <Icon size={32} className="shrink-0 text-[#1D4FE0]" />
                    <div>
                      <p className="text-[20px] font-extrabold leading-tight text-[#0B1B3F] xl:text-[22px]">{value}</p>
                      <p className="text-[14px] text-[#475569] xl:text-[16px]">{label}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= QANDAY ISHTIROK ETILADI: 4 qadam, orasida punktir ================= */}
      <Section id="how" className="relative z-10 pt-6 font-['Manrope','Inter',system-ui,sans-serif] lg:-mt-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#E3ECFF] px-4 py-2 text-[15px] font-bold text-[#0B1B3F]">
          <Layers size={20} className="text-[#1D4FE0]" />
          {t.howBadge}
        </span>
        <h2 className="mt-4 text-[28px] font-extrabold uppercase leading-tight tracking-[-0.01em] text-[#0B1B3F] sm:text-[38px]">
          {t.howTitle[0]} <span className="text-[#1F6BFF]">{t.howTitle[1]}</span> {t.howTitle[2]}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {t.steps.map((label, i) => {
            const Icon = STEP_ICONS[i]
            return (
              <div key={label} className="relative">
                {/* Keyingi kartochkagacha punktir chiziq */}
                {i < t.steps.length - 1 && (
                  <span className="absolute left-full top-1/2 hidden w-12 -translate-y-1/2 border-t-2 border-dotted border-[#5B8CFF] lg:block" />
                )}
                <Card className="flex h-full items-center gap-4 p-4 xl:p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-xl bg-gradient-to-b from-[#2F7BFF] to-[#1D4FE0] text-[18px] font-extrabold text-white shadow-[0_8px_16px_-8px_rgba(29,79,224,0.9)]">
                    {i + 1}
                  </span>
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#EEF3FF] text-[#1D4FE0] xl:h-[72px] xl:w-[72px]">
                    <Icon size={34} strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 border-l border-[#E3E9F4] pl-4 text-[17px] font-extrabold leading-snug text-[#0B1B3F] xl:text-[19px]">
                    {label}
                  </span>
                </Card>
              </div>
            )
          })}
        </div>
      </Section>

      {/* ================= LIGADA NIMALAR KUTMOQDA ================= */}
      <Section id="features" className="pt-16 font-['Manrope','Inter',system-ui,sans-serif] sm:pt-20">
        <h2 className="text-[30px] font-extrabold leading-tight tracking-[-0.02em] text-[#0B1B3F] sm:text-[40px] xl:text-[46px]">
          {t.featuresTitle[0]}{' '}
          {/* Ajratilgan so'z: ko'k, qiya, ostida sariq chiziq */}
          <span className="relative inline-block whitespace-nowrap pb-2 italic text-[#1D4FE0]">
            {t.featuresTitle[1]}
            <svg className="absolute -bottom-1 -left-[8%] h-3 w-[120%]" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none" aria-hidden="true">
              <path d="M3 10C60 3 140 2 197 6" stroke="#F5B400" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {t.features.map(([title, text], i) => {
            const [Icon, image] = FEATURES[i]
            return (
              <div
                key={title}
                className="relative overflow-hidden rounded-[26px] border border-white bg-gradient-to-br from-white via-[#F7F9FF] to-[#EEF3FE] p-6 shadow-[0_18px_44px_-24px_rgba(30,58,138,0.35)] transition hover:-translate-y-1"
              >
                {/* Burchakdagi kichik ikonka */}
                <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E6EEFF] text-[#1D4FE0] shadow-[inset_0_1px_0_#fff]">
                  <Icon size={22} />
                </span>
                {/* 3D rasm to'liq (kesilmagan), faqat fonining chetlari kartochka foniga singib ketadi */}
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="-ml-3 h-[104px] w-auto object-contain [-webkit-mask-image:radial-gradient(closest-side,#000_72%,transparent)] [mask-image:radial-gradient(closest-side,#000_72%,transparent)] xl:h-[118px]"
                />
                <h3 className="mt-4 text-[21px] font-extrabold text-[#0B1B3F] xl:text-[23px]">{title}</h3>
                <p className="mt-2 text-[15px] leading-snug text-[#475569] xl:text-[16px]">{text}</p>
              </div>
            )
          })}
        </div>
      </Section>

      <LeagueDetails lang={landing.lang} season={season} winners={winners} onJoin={landing.openSignUp} />

      {/* ================= SAVOLLAR ================= */}
      <Faq accent="league" badge={t.faqBadge} title={t.faqTitle} items={t.faq} />
    </LandingShell>
  )
}

export default LeagueLanding
