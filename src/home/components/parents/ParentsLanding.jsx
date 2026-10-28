import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  LineChart,
  QrCode,
  Target,
  TrendingUp,
  Trophy,
  UserPlus,
  Users,
  Wallet
} from 'lucide-react'
import { request } from '@/services/api'
import { closeAuthModal } from '@/home/components/auth/AuthGate'
import AuthModal from '@/home/components/auth/AuthModal'
import Auth from '@/home/components/auth/Auth'

const formatCount = (value) => Number(value || 0).toLocaleString('ru-RU').replace(/,/g, ' ')

const TEXTS = {
  uz: {
    students: (n) => `${n}+ foydalanuvchi IQmath’ni tanlagan`,
    title: ['Farzandingiz', 'matematikani', 'sevib o‘rgansin'],
    subtitle:
      'Siz esa uning har bir yutug‘ini ko‘rib borasiz. Maktab dasturiga mos video darslar, mashqlar va ota-ona kabineti — bitta platformada.',
    start: 'Bepul boshlash',
    trial: (n) => `${n} kun bepul`,
    pains: [
      {
        q: 'Farzandingiz matematikada qiynalyaptimi?',
        a: 'Har bir mavzu qisqa video bilan sodda tushuntiriladi, so‘ng oson misollardan boshlab mashq qilinadi. Farzandingiz o‘z tezligida o‘rganadi va o‘ziga ishonch hosil qiladi.'
      },
      {
        q: 'Repetitorga vaqt va pul yetmayaptimi?',
        a: 'Qatnov va jadvalga moslashish shart emas: farzandingiz uydan chiqmasdan, istalgan vaqtda telefon yoki kompyuterdan o‘qiydi.',
        link: 'Tariflar bilan tanishing'
      },
      {
        q: 'Uy vazifasini tekshira olmayapsizmi?',
        a: 'Platforma har bir javobni o‘zi tekshiradi va to‘g‘ri yechimni ko‘rsatadi. Siz esa natijalarni ota-ona kabinetida ko‘rib turasiz.'
      }
    ],
    cabinetBadge: 'Ota-ona kabineti',
    cabinetTitle: ['Farzandingiz o‘qishi', 'doim ko‘z oldingizda'],
    cabinetSub: 'Kabinetga kirib, bir qarashda farzandingiz qanday o‘qiyotganini bilib olasiz.',
    features: [
      ['Fanlar bo‘yicha o‘zlashtirish', 'Matematika, algebra va geometriyadan nechchi foiz o‘zlashtirgani.'],
      ['Sinfdagi o‘rni', 'Sinfdoshlari orasidagi reytingi va o‘sish dinamikasi.'],
      ['Kunlik faollik', 'Oxirgi 7 kunda qaysi kunlari va qancha shug‘ullangani.'],
      ['Test natijalari', 'Har bir mavzu testi va diagnostika natijalari, olingan yutuqlar.'],
      ['Takrorlash kerak mavzular', 'Bal past chiqqan mavzular alohida ko‘rsatiladi — qayerga e’tibor berishni bilasiz.'],
      ['Bir nechta farzand, bitta kabinet', 'Barcha farzandlaringizni bitta kabinetda kuzating va obunasini o‘zingiz to‘lang.']
    ],
    stepsBadge: 'Qanday ishlaydi?',
    stepsTitle: '3 qadamda boshlang',
    steps: [
      ['Ro‘yxatdan o‘ting', 'Telefon raqamingiz bilan ota-ona sifatida ro‘yxatdan o‘ting — bir daqiqa vaqt oladi.'],
      ['Farzandingizni ulang', 'Farzandingiz akkauntini QR kod orqali ulang yoki uning uchun yangi akkaunt oching.'],
      ['Natijani kuzating', 'Farzandingiz o‘qiydi, siz esa kabinetda uning yutuqlarini ko‘rib borasiz.']
    ]
  },
  ru: {
    students: (n) => `${n}+ пользователей выбрали IQmath`,
    title: ['Пусть ваш ребёнок', 'полюбит', 'математику'],
    subtitle:
      'А вы будете видеть каждый его успех. Видеоуроки по школьной программе, упражнения и кабинет родителя — на одной платформе.',
    start: 'Начать бесплатно',
    trial: (n) => `${n} дней бесплатно`,
    pains: [
      {
        q: 'Ребёнку трудно даётся математика?',
        a: 'Каждая тема просто объясняется в коротком видео, затем — упражнения от лёгких к сложным. Ребёнок учится в своём темпе и обретает уверенность.'
      },
      {
        q: 'Не хватает времени и денег на репетитора?',
        a: 'Не нужно ездить и подстраиваться под расписание: ребёнок занимается из дома, в любое время — с телефона или компьютера.',
        link: 'Посмотреть тарифы'
      },
      {
        q: 'Не успеваете проверять домашние задания?',
        a: 'Платформа сама проверяет каждый ответ и показывает правильное решение. А вы видите результаты в кабинете родителя.'
      }
    ],
    cabinetBadge: 'Кабинет родителя',
    cabinetTitle: ['Учёба ребёнка', 'всегда перед глазами'],
    cabinetSub: 'Зайдите в кабинет и за минуту узнайте, как учится ваш ребёнок.',
    features: [
      ['Успеваемость по предметам', 'Сколько процентов освоено по математике, алгебре и геометрии.'],
      ['Место в классе', 'Рейтинг среди одноклассников и динамика роста.'],
      ['Ежедневная активность', 'В какие дни и сколько ребёнок занимался за последние 7 дней.'],
      ['Результаты тестов', 'Результаты тестов по темам и диагностики, полученные достижения.'],
      ['Темы для повторения', 'Темы с низким баллом показаны отдельно — вы знаете, на что обратить внимание.'],
      ['Несколько детей — один кабинет', 'Следите за всеми детьми в одном кабинете и оплачивайте подписку сами.']
    ],
    stepsBadge: 'Как это работает?',
    stepsTitle: 'Начните за 3 шага',
    steps: [
      ['Зарегистрируйтесь', 'Зарегистрируйтесь как родитель по номеру телефона — это займёт минуту.'],
      ['Подключите ребёнка', 'Подключите аккаунт ребёнка по QR-коду или создайте для него новый аккаунт.'],
      ['Следите за результатом', 'Ребёнок занимается, а вы видите его успехи в кабинете.']
    ]
  }
}

const PAIN_STYLES = [
  { image: '/images/parents/card-child.webp', bg: 'from-[#FFF1F2] to-white', ring: 'ring-[#FDE2E4]', accent: '#E11D48' },
  { image: '/images/parents/card-tutor.webp', bg: 'from-[#EEF4FF] to-white', ring: 'ring-[#DCE7FF]', accent: '#2563EB' },
  { image: '/images/parents/card-homework.webp', bg: 'from-[#FFF8E6] to-white', ring: 'ring-[#FCEBC2]', accent: '#D97706' }
]

const FEATURE_STYLES = [
  { Icon: BarChart3, bg: 'bg-[#EAF1FF]', fg: 'text-[#2563EB]' },
  { Icon: Trophy, bg: 'bg-[#FFF4E0]', fg: 'text-[#D97706]' },
  { Icon: CalendarDays, bg: 'bg-[#E7F8F0]', fg: 'text-[#0F9F6E]' },
  { Icon: LineChart, bg: 'bg-[#F1EBFF]', fg: 'text-[#7C3AED]' },
  { Icon: Target, bg: 'bg-[#FFECF1]', fg: 'text-[#E11D48]' },
  { Icon: Users, bg: 'bg-[#E6F6FB]', fg: 'text-[#0E7490]' }
]

const STEP_ICONS = [UserPlus, QrCode, TrendingUp]

const ParentsLanding = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const text = TEXTS[i18n.language === 'ru' ? 'ru' : 'uz']
  const [stats, setStats] = useState(null)
  const [authOpen, setAuthOpen] = useState(false)

  useEffect(() => {
    request
      .get('/api/v1/func_student/landing-stats/')
      .then((res) => setStats(res.data || null))
      .catch(() => setStats(null))
  }, [])

  const trialDays = stats?.trial_days || 0

  // "Bepul boshlash" — header'dagi kirish oynasi, darhol "Ro'yxatdan o'tish" bo'limida ochiladi
  const openSignUp = () => {
    setAuthOpen(true)
    router.replace({ pathname: router.pathname, query: { ...router.query, tab: 'signUp' } }, undefined, {
      shallow: true
    })
  }

  const closeAuth = () => {
    setAuthOpen(false)
    closeAuthModal(router)
  }

  return (
    <div className="bg-white font-sf text-[#0B1B3F]">
      <AuthModal open={authOpen} onClose={closeAuth} title={t('auth', 'Kirish / Ro‘yxatdan o‘tish')}>
        <Auth />
      </AuthModal>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        {/* Telefon: rasm tepada banner */}
        <div className="relative h-[260px] w-full overflow-hidden sm:h-[340px] lg:hidden">
          <img src="/images/parents/hero-sm.webp" alt="" className="h-full w-full object-cover object-[70%_40%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        </div>
        {/* Katta ekran: rasm o'ng tomonda, chap tomoni oqqa singib ketadi */}
        <div className="absolute inset-y-0 right-0 hidden w-[68%] lg:block">
          <img src="/images/parents/hero.webp" alt="" className="h-full w-full object-cover object-[60%_30%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-4 pb-10 pt-2 sm:px-6 lg:min-h-[640px] lg:pb-44 lg:pt-16">
          <div className="max-w-[600px]">
            {stats?.users ?? stats?.students ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF4E0] px-4 py-2 text-[15px] font-semibold text-[#0B1B3F]">
                <Users size={18} className="text-[#F59E0B]" />
                {text.students(formatCount(stats.users ?? stats.students))}
              </span>
            ) : null}

            <h1 className="mt-5 text-[38px] font-extrabold leading-[1.05] tracking-tight sm:text-[52px] lg:text-[64px]">
              {text.title[0]} <span className="text-[#1D6BFF]">{text.title[1]}</span>{' '}
              <span className="text-[#1D6BFF]">{text.title[2]}</span>
            </h1>
            <p className="mt-5 max-w-[540px] text-[17px] leading-relaxed text-[#475569] sm:text-[19px]">{text.subtitle}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={openSignUp}
                className="inline-flex h-14 items-center gap-2 rounded-full bg-[#1D6BFF] px-8 text-[17px] font-bold text-white shadow-[0_16px_30px_-14px_rgba(29,107,255,0.9)] transition hover:bg-[#1558E0]"
              >
                {text.start}
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {trialDays ? (
                <span className="inline-flex items-center gap-2 rounded-xl bg-[#E7F8F0] px-3 py-2 text-[14px] font-medium">
                  <CalendarDays size={17} className="text-[#0F9F6E]" />
                  {text.trial(trialDays)}
                </span>
              ) : null}
            </div>
          </div>

        </div>
      </section>

      {/* ================= OG'RIQLI SAVOLLAR ================= */}
      <section className="relative z-10 mx-auto -mt-2 max-w-[1180px] px-4 sm:px-6 lg:-mt-36">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-12">
          {text.pains.map((pain, i) => {
            const style = PAIN_STYLES[i]
            return (
              <div
                key={pain.q}
                className={`group flex flex-col rounded-[26px] bg-gradient-to-b ${style.bg} p-2.5 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.45)] ring-1 ${style.ring} transition duration-300 hover:-translate-y-1`}
              >
                {/* Rasm tepada — kartaning to'liq kengligida */}
                <div className="overflow-hidden rounded-[20px]">
                  <img
                    src={style.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col px-2 pb-2 pt-4">
                  <h3 className="text-[17px] font-extrabold leading-snug sm:text-[18px]">{pain.q}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#475569]">{pain.a}</p>
                  {pain.link ? (
                    <Link
                      href="/#prices"
                      className="mt-auto inline-flex items-center gap-1 pt-3 text-[14px] font-bold"
                      style={{ color: style.accent }}
                    >
                      {pain.link}
                      <ArrowRight size={15} />
                    </Link>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ================= OTA-ONA KABINETI ================= */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 md:py-24">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F0FF] px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-[#1E4FD8]">
            <Wallet size={16} />
            {text.cabinetBadge}
          </span>
          <h2 className="mt-5 text-[30px] font-extrabold leading-tight tracking-tight sm:text-[42px]">
            {text.cabinetTitle[0]} <span className="text-[#1D6BFF]">{text.cabinetTitle[1]}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[16px] text-[#475569] sm:text-[18px]">{text.cabinetSub}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {text.features.map(([title, desc], i) => {
            const { Icon, bg, fg } = FEATURE_STYLES[i]
            return (
              <div
                key={title}
                className="rounded-[22px] border border-[#EDF1F7] bg-white p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.45)]"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ${fg}`}>
                  <Icon size={24} />
                </span>
                <h3 className="mt-4 text-[19px] font-bold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#64748B]">{desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ================= QANDAY ISHLAYDI ================= */}
      <section id="how-it-works" className="scroll-mt-24 bg-[#F7F9FE] py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-[#E8F0FF] px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-[#1E4FD8]">
              {text.stepsBadge}
            </span>
            <h2 className="mt-5 text-[30px] font-extrabold tracking-tight sm:text-[42px]">{text.stepsTitle}</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {text.steps.map(([title, desc], i) => {
              const Icon = STEP_ICONS[i]
              return (
                <div key={title} className="relative rounded-[22px] bg-white p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.45)]">
                  <span className="absolute right-6 top-5 text-[44px] font-extrabold leading-none text-[#EEF2FA]">
                    0{i + 1}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1D6BFF] text-white">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 text-[19px] font-bold">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#64748B]">{desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ParentsLanding
