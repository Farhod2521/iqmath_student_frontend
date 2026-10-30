import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock3,
  Crown,
  FileText,
  Laptop,
  Lock,
  MoreVertical,
  NotebookPen,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Users,
} from 'lucide-react'
import {
  Band,
  HeroText,
  Card,
  Faq,
  IconTile,
  LandingShell,
  Section,
  SectionTitle,
  Steps,
  useRoleLanding
} from '../role-landing/shared'

const TEXT = {
  uz: {
    nav: [
      ['#features', 'Imkoniyatlar'],
      ['#how', 'Qanday ishlaydi'],
      ['/prices', 'Tariflar'],
      ['#faq', 'Savollar']
    ],
    login: 'Tizimga kirish',
    badge: 'Ota-onalar uchun',
    title: ['Farzandingiz matematikani', 'sevib o‘rgansin'],
    subtitle:
      'Siz esa uning har bir yutug‘ini ko‘rib borasiz. Maktab dasturiga mos video darslar, mashqlar va ota-ona kabineti — bitta platformada.',
    start: 'Bepul boshlash',
    how: 'Qanday ishlaydi',
    checks: ['Uyda, istalgan vaqtda', 'Javoblar avtomatik tekshiriladi'],
    painsTitle: ['Ota-onalarning eng ko‘p uchraydigan', 'muammolari'],
    pains: [
      ['Farzandingiz matematikada qiynalyaptimi?', 'Har bir mavzu qisqa video bilan sodda tushuntiriladi, so‘ng oson misollardan mashq qilinadi.'],
      ['Repetitorga vaqt va pul yetmayaptimi?', 'Qatnov shart emas: farzandingiz uydan, istalgan vaqtda telefon yoki kompyuterdan o‘qiydi.'],
      ['Uy vazifasini tekshira olmayapsizmi?', 'Platforma har bir javobni o‘zi tekshiradi va to‘g‘ri yechimni ko‘rsatadi.']
    ],
    cabinetBadge: 'Ota-ona kabineti',
    cabinetTitle: ['Farzandingiz o‘qishi doim', 'ko‘z oldingizda'],
    features: [
      ['Fanlar bo‘yicha o‘zlashtirish', 'Matematika, algebra va geometriyadan necha foiz o‘zlashtirgani'],
      ['Sinfdagi o‘rni', 'Sinfdoshlari orasidagi reytingi va o‘sish dinamikasi'],
      ['Kunlik faollik', 'Oxirgi 7 kunda qaysi kunlari va qancha shug‘ullangani'],
      ['Test natijalari', 'Mavzu testlari va diagnostika natijalari'],
      ['Takrorlash kerak mavzular', 'Bali past chiqqan mavzular alohida ko‘rsatiladi'],
      ['Bir nechta farzand — bitta kabinet', 'Hamma farzandlaringizni bir joyda kuzating']
    ],
    subTitle: 'Obunani o‘zingiz boshqarasiz',
    subText: 'Farzandingiz obunasini o‘zingiz to‘laysiz va uzaytirasiz, to‘lovlar tarixi va cheklar saqlanadi.',
    subItems: [
      ['To‘lovlar tarixi', 'Barcha to‘lovlaringizni ko‘rish'],
      ['Cheklar', 'To‘lov kvitansiyalarini yuklab olish'],
      ['Obunani uzaytirish', 'Bir necha klikda davom ettirish']
    ],
    devTitle: 'Farzandingiz qurilmalari',
    devText: 'Qaysi telefon va kompyuterdan kirayotganini ko‘rib, keraksizini o‘chirasiz.',
    devList: 'Ulangan qurilmalar',
    devActive: 'Aktiv',
    devLogout: 'Chiqish',
    devCurrent: 'Joriy qurilma',
    devSafe: 'Xavfsiz nazorat',
    stepsBadge: 'Qanday ishlaydi?',
    stepsTitle: ['3 qadamda', 'boshlang'],
    stepsSub: 'Atigi uch qadam va farzandingiz matematika bilan shug‘ullanishni boshlaydi.',
    steps: [
      ['Ro‘yxatdan o‘ting', 'Telefon raqamingiz bilan, bir daqiqada'],
      ['Farzandingizni ulang', 'QR kod orqali yoki yangi akkaunt ochib'],
      ['Natijani kuzating', 'Farzandingiz o‘qiydi, siz kabinetda ko‘rib borasiz']
    ],
    faqBadge: 'Savollar va javoblar',
    faqTitle: 'Ko‘p beriladigan savollar',
    faq: [
      ['Nechchi yoshdan foydalansa bo‘ladi?', 'IQMath 1-sinfdan 11-sinfgacha bo‘lgan o‘quvchilar uchun — darslar maktab dasturiga mos.'],
      ['Bir nechta farzandni ulasa bo‘ladimi?', 'Ha. Bitta ota-ona kabinetiga bir nechta farzandni ulab, har birining natijasini alohida kuzatasiz va obunasini o‘zingiz to‘laysiz.'],
      ['To‘lovni qanday qilaman?', 'Ota-ona kabinetida farzandingiz uchun tarifni tanlaysiz va onlayn to‘lov sahifasida qulay usul bilan to‘laysiz. To‘lovlar tarixi va cheklar kabinetda saqlanadi.'],
      ['Farzandim telefoni bo‘lmasa-chi?', 'Farzandingiz kompyuter yoki planshetdan ham o‘qiy oladi. Kerak bo‘lsa, kabinetingizdan uning uchun yangi akkaunt ochib berasiz.']
    ],
  },
  ru: {
    nav: [
      ['#features', 'Возможности'],
      ['#how', 'Как это работает'],
      ['/prices', 'Тарифы'],
      ['#faq', 'Вопросы']
    ],
    login: 'Вход',
    badge: 'Для родителей',
    title: ['Пусть ваш ребёнок', 'полюбит математику'],
    subtitle:
      'А вы будете видеть каждый его успех. Видеоуроки по школьной программе, упражнения и кабинет родителя — на одной платформе.',
    start: 'Начать бесплатно',
    how: 'Как это работает',
    checks: ['Дома, в любое время', 'Ответы проверяются автоматически'],
    painsTitle: ['Частые проблемы', 'родителей'],
    pains: [
      ['Ребёнку трудно с математикой?', 'Каждая тема объясняется коротким видео, затем — упражнения от простого к сложному.'],
      ['Нет времени и денег на репетитора?', 'Никуда ездить не нужно: ребёнок учится дома, в любое время, с телефона или компьютера.'],
      ['Не успеваете проверять домашку?', 'Платформа сама проверяет каждый ответ и показывает правильное решение.']
    ],
    cabinetBadge: 'Кабинет родителя',
    cabinetTitle: ['Учёба ребёнка всегда', 'перед глазами'],
    features: [
      ['Усвоение по предметам', 'Сколько процентов по математике, алгебре и геометрии'],
      ['Место в классе', 'Рейтинг среди одноклассников и динамика роста'],
      ['Ежедневная активность', 'В какие дни и сколько занимался за последние 7 дней'],
      ['Результаты тестов', 'Тесты по темам и результаты диагностики'],
      ['Темы для повторения', 'Темы с низким баллом показаны отдельно'],
      ['Несколько детей — один кабинет', 'Следите за всеми детьми в одном месте']
    ],
    subTitle: 'Подпиской управляете вы',
    subText: 'Вы сами оплачиваете и продлеваете подписку ребёнка, история платежей и чеки сохраняются.',
    subItems: [
      ['История платежей', 'Все ваши платежи'],
      ['Чеки', 'Скачать квитанции об оплате'],
      ['Продлить подписку', 'В несколько кликов']
    ],
    devTitle: 'Устройства ребёнка',
    devText: 'Видно, с каких телефонов и компьютеров он входит — лишние можно отключить.',
    devList: 'Подключённые устройства',
    devActive: 'Активно',
    devLogout: 'Выйти',
    devCurrent: 'Текущее',
    devSafe: 'Безопасный контроль',
    stepsBadge: 'Как это работает?',
    stepsTitle: ['Начните', 'за 3 шага'],
    stepsSub: 'Всего три шага — и ребёнок начинает заниматься математикой.',
    steps: [
      ['Зарегистрируйтесь', 'По номеру телефона, за минуту'],
      ['Подключите ребёнка', 'По QR-коду или создав новый аккаунт'],
      ['Следите за результатами', 'Ребёнок учится, вы видите всё в кабинете']
    ],
    faqBadge: 'Вопросы и ответы',
    faqTitle: 'Частые вопросы',
    faq: [
      ['С какого возраста можно заниматься?', 'IQMath — для учеников с 1 по 11 класс, уроки соответствуют школьной программе.'],
      ['Можно подключить нескольких детей?', 'Да. В одном кабинете родителя можно подключить нескольких детей, видеть результаты каждого и оплачивать подписки.'],
      ['Как оплатить?', 'В кабинете родителя выберите тариф для ребёнка и оплатите удобным способом на странице онлайн-оплаты. История платежей и чеки сохраняются.'],
      ['Что если у ребёнка нет телефона?', 'Ребёнок может заниматься с компьютера или планшета. При необходимости вы создадите для него аккаунт из своего кабинета.']
    ],
  }
}

const SUB_ITEMS = [
  [CalendarDays, 'bg-[#E3EDFF] text-[#1D6BFF]'],
  [FileText, 'bg-[#EEE8FF] text-[#7C3AED]'],
  [RefreshCw, 'bg-[#DCF7E6] text-[#16A34A]']
]

const DEVICES = [
  [Smartphone, 'bg-[#E3EDFF] text-[#1D6BFF]', 'iPhone', 'Toshkent, 30 okt 2026 • iOS 17', true],
  [Laptop, 'bg-[#EEE8FF] text-[#7C3AED]', 'Windows', 'Toshkent, 28 okt 2026 • Chrome', false],
  [Smartphone, 'bg-[#DCF7E6] text-[#16A34A]', 'Android', 'Samarqand, 25 okt 2026 • Android 14', false]
]

const FEATURE_ICONS = [
  [BarChart3, 'bg-[#EAF1FF] text-[#1D6BFF]'],
  [Crown, 'bg-[#FFF4E0] text-[#F59E0B]'],
  [CalendarDays, 'bg-[#E7F8F0] text-[#16A34A]'],
  [FileText, 'bg-[#F1EBFF] text-[#7C3AED]'],
  [RefreshCw, 'bg-[#F5EBFF] text-[#9333EA]'],
  [Users, 'bg-[#E6F0FF] text-[#2563EB]']
]

const PAIN_CARDS = [
  { Icon: BookOpen, tone: 'bg-[#E3EDFF] text-[#1D6BFF]', card: 'from-[#F4F8FF]', arrow: 'bg-[#E3EDFF] text-[#1D6BFF]', glow: 'bg-[#DCE7FF]/70' },
  { Icon: Clock3, tone: 'bg-[#FFE9D6] text-[#F97316]', card: 'from-[#FFF5EC]', arrow: 'bg-[#FFE9D6] text-[#F97316]', glow: 'bg-[#FFE2C7]/70' },
  { Icon: NotebookPen, tone: 'bg-[#D9F5E4] text-[#16A34A]', card: 'from-[#F0FBF4]', arrow: 'bg-[#DDF3EC] text-[#0F9F80]', glow: 'bg-[#D6F3E2]/70' }
]

/** Ota-onalar landingi (/parents) */
const ParentsLanding = () => {
  const landing = useRoleLanding('parent')
  const t = TEXT[landing.lang]

  return (
    <LandingShell accent="parent" nav={t.nav} landing={landing} loginLabel={t.login}>
      {/* ================= HERO =================
          Rasmda "Bu hafta", "Algebra 78%" va "Test natijasi" kartochkalari rasmning o'ziga chizilgan */}
      <section className="relative overflow-hidden">
        {/* Telefon: rasm tepada banner */}
        <div className="relative h-[300px] w-full overflow-hidden sm:h-[420px] lg:hidden">
          <img src="/images/parents/hero-main-sm.webp" alt="" className="h-full w-full object-cover object-[40%_40%]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F5F8FF] to-transparent" />
        </div>
        {/* Katta ekran: rasm o'ng tomonda, chap cheti fonga qo'shilib ketadi */}
        <div className="absolute inset-y-0 right-0 hidden w-[62%] lg:block">
          <img src="/images/parents/hero-main.webp" alt="" className="h-full w-full object-cover object-[100%_35%]" />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F5F8FF] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#F5F8FF] to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-4 pb-10 pt-2 sm:px-6 lg:flex lg:min-h-[620px] lg:items-center lg:px-10 lg:pb-14 lg:pt-4 xl:min-h-[680px]">
          <HeroText
            accent="parent"
            badge={
              <>
                {t.badge} <Users size={14} />
              </>
            }
            title={t.title}
            highlightClass="text-[#1D6BFF]"
            subtitle={t.subtitle}
            start={t.start}
            checks={t.checks}
            onStart={landing.openSignUp}
          />
        </div>
      </section>

      {/* ================= MUAMMOLAR: har biri o'z rangidagi karta ================= */}
      <Band tone="white">
        <Section className="py-14 sm:py-16">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF1FF] px-5 py-2 text-[13px] font-bold uppercase tracking-[0.08em] text-[#4F46E5]">
              <Users size={16} className="text-[#1D6BFF]" />
              {t.badge}
            </span>
            <h2 className="mx-auto mt-4 max-w-[820px] text-[28px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[42px]">
              {t.painsTitle[0]} <span className="text-[#1D6BFF]">{t.painsTitle[1]}</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-7">
            {t.pains.map(([title, text], i) => {
              const { Icon, tone, card, arrow, glow } = PAIN_CARDS[i]
              return (
                <div
                  key={title}
                  className={`group relative overflow-hidden rounded-[26px] bg-gradient-to-br to-white p-6 shadow-[0_18px_50px_-28px_rgba(30,58,138,0.3)] ring-1 ring-white transition hover:-translate-y-1 lg:p-7 ${card}`}
                >
                  {/* Pastki o'ng burchakdagi yumshoq doira */}
                  <span className={`pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full blur-[2px] ${glow}`} />
                  <div className="relative flex items-start gap-4">
                    <span className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] ${tone}`}>
                      <Icon size={30} strokeWidth={2.2} />
                      <span className="absolute -right-1.5 -top-1.5 h-5 w-5 rounded-full bg-white/70 ring-1 ring-white" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-3">
                        <h3 className="flex-1 text-[18px] font-extrabold leading-snug lg:text-[19px]">{title}</h3>
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition group-hover:translate-x-0.5 ${arrow}`}>
                          <ArrowRight size={18} strokeWidth={2.5} />
                        </span>
                      </div>
                      <p className="mt-2 text-[15px] leading-relaxed text-[#5B6478]">{text}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Section>
      </Band>

      {/* ================= KABINET ================= */}
      <Section id="features" className="pt-20 sm:pt-24">
        <SectionTitle accent="parent" badge={t.cabinetBadge} title={t.cabinetTitle} />
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <img src="/images/parents/cabinet-laptop.webp" alt="" className="mx-auto w-full max-w-[720px] mix-blend-multiply" />
          <div className="grid gap-4 sm:grid-cols-2">
            {t.features.map(([title, text], i) => (
              <Card key={title} className="flex gap-3.5 p-5">
                <IconTile Icon={FEATURE_ICONS[i][0]} tone={FEATURE_ICONS[i][1]} />
                <div>
                  <h3 className="text-[15px] font-bold">{title}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-[#5B6478]">{text}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ================= OBUNA VA QURILMALAR: sahifa eni bo'ylab ikki katta karta ================= */}
      <div className="relative mx-auto max-w-[1840px] px-4 pt-16 sm:px-6 sm:pt-20 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-2">
          {/* Obuna */}
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#F3F7FF] to-white p-6 shadow-[0_20px_60px_-34px_rgba(30,58,138,0.35)] ring-1 ring-white sm:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <div className="flex items-start gap-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] bg-[#E3EDFF] text-[#1D6BFF]">
                    <BookOpen size={30} />
                  </span>
                  <h3 className="text-[26px] font-extrabold leading-tight tracking-[-0.01em] sm:text-[32px]">{t.subTitle}</h3>
                </div>
                <p className="mt-4 max-w-[460px] text-[16px] leading-relaxed text-[#5B6478]">{t.subText}</p>
                <div className="mt-6 space-y-3">
                  {t.subItems.map(([title, text], i) => {
                    const [Icon, tone] = SUB_ITEMS[i]
                    return (
                      <div key={title} className="flex items-center gap-4 rounded-2xl bg-white px-4 py-3.5 shadow-[0_8px_24px_-16px_rgba(30,58,138,0.35)]">
                        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tone}`}>
                          <Icon size={22} />
                        </span>
                        <span className="flex-1">
                          <span className="block text-[16px] font-bold">{title}</span>
                          <span className="block text-[13px] text-[#64748B]">{text}</span>
                        </span>
                        <ChevronRight size={20} className="text-[#94A3B8]" />
                      </div>
                    )
                  })}
                </div>
              </div>
              <img src="/images/parents/subscription-phone.webp" alt="" className="mx-auto w-[240px] mix-blend-multiply sm:w-[280px]" />
            </div>
          </div>

          {/* Qurilmalar */}
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#F6F3FF] to-white p-6 shadow-[0_20px_60px_-34px_rgba(30,58,138,0.35)] ring-1 ring-white sm:p-10">
            <div className="flex items-start gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] bg-[#EEE8FF] text-[#7C3AED]">
                <Laptop size={30} />
              </span>
              <div className="flex-1">
                <h3 className="text-[26px] font-extrabold leading-tight tracking-[-0.01em] sm:text-[32px]">{t.devTitle}</h3>
                <p className="mt-2 max-w-[440px] text-[16px] leading-relaxed text-[#5B6478]">{t.devText}</p>
              </div>
              {/* Qalqon bezagi */}
              <span className="relative hidden h-28 w-28 shrink-0 items-center justify-center rounded-full bg-[#E9E4FF] sm:flex">
                <span className="flex h-20 w-[72px] items-center justify-center rounded-b-[36px] rounded-t-[14px] bg-gradient-to-br from-[#818CF8] to-[#4F46E5] text-white shadow-[0_14px_30px_-10px_rgba(79,70,229,0.8)]">
                  <Lock size={30} strokeWidth={2.5} />
                </span>
              </span>
            </div>
            <div className="mt-6 rounded-[24px] bg-white p-4 shadow-[0_12px_32px_-20px_rgba(30,58,138,0.35)] sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-[17px] font-extrabold">{t.devList}</span>
                <span className="flex items-center gap-1.5 rounded-full bg-[#F1EBFF] px-3 py-1.5 text-[12px] font-bold text-[#7C3AED]">
                  <ShieldCheck size={14} />
                  {t.devSafe}
                </span>
              </div>
              <div className="space-y-2.5">
                {DEVICES.map(([Icon, tone, name, meta, active]) => (
                  <div key={name} className="flex items-center gap-3 rounded-2xl bg-[#F8FAFF] p-3 ring-1 ring-[#EEF2FF] sm:gap-4 sm:p-3.5">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tone}`}>
                      <Icon size={22} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-[16px] font-bold">{name}</span>
                        {active && (
                          <span className="rounded-full bg-[#EAF1FF] px-2 py-0.5 text-[11px] font-semibold text-[#1D6BFF]">{t.devCurrent}</span>
                        )}
                      </span>
                      <span className="block truncate text-[13px] text-[#64748B]">{meta}</span>
                    </span>
                    {active ? (
                      <span className="rounded-full bg-[#DCFCE7] px-3 py-1.5 text-[13px] font-bold text-[#16A34A]">● {t.devActive}</span>
                    ) : (
                      <span className="rounded-full bg-[#EEF2F7] px-3 py-1.5 text-[13px] font-semibold text-[#475569]">{t.devLogout}</span>
                    )}
                    <MoreVertical size={18} className="hidden shrink-0 text-[#94A3B8] sm:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Steps
        accent="parent"
        badge={t.stepsBadge}
        title={t.stepsTitle}
        subtitle={t.stepsSub}
        steps={t.steps.map(([title, text], i) => ({
          title,
          text,
          Icon: [Smartphone, QrCode, BarChart3][i],
          tone: ['bg-[#EAF1FF] text-[#1D6BFF]', 'bg-[#F1EBFF] text-[#7C3AED]', 'bg-[#FFF1E6] text-[#EA580C]'][i]
        }))}
      />

      <Faq accent="parent" badge={t.faqBadge} title={t.faqTitle} items={t.faq} />
    </LandingShell>
  )
}

export default ParentsLanding
