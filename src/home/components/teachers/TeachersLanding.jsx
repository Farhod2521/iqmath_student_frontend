import {
  BarChart3,
  BookOpen,
  FileText,
  Home,
  Link2,
  QrCode,
  ReceiptText,
  Settings,
  Smartphone,
  Ticket,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  Zap
} from 'lucide-react'
import {
  Badge,
  Band,
  HeroText,
  Card,
  Faq,
  IconTile,
  LandingShell,
  LaptopFrame,
  QuoteBox,
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
      ['#earnings', 'Daromad'],
      ['#faq', 'Savollar']
    ],
    login: 'Tizimga kirish',
    badge: 'O‘qituvchilar uchun',
    title: ['O‘quvchilaringiz natijasi', 'bir joyda'],
    subtitle:
      'Guruhlar yarating, o‘quvchilarni promo havola orqali ulang va ularning yutuqlarini kuzatib boring. Video darslar va misollar tayyor — siz faqat yo‘naltirasiz.',
    start: 'O‘qituvchi sifatida boshlash',
    how: 'Qanday ishlaydi',
    checks: ['Tayyor video darslar va misollar', 'Javoblar avtomatik tekshiriladi'],
    floatGroup: ['Guruh: 7-A sinf', '24 o‘quvchi'],
    floatAvg: 'O‘rtacha natija',
    floatNew: ['Yangi o‘quvchi', 'qo‘shildi'],
    whyBadge: 'Bizning afzalliklarimiz',
    whyTitle: ['Nima uchun', 'IQMath?'],
    why: [
      ['Tekshirishga vaqt ketmaydi', 'Platforma har bir javobni o‘zi tekshiradi va to‘g‘ri yechimni ko‘rsatadi.'],
      ['Tayyor materiallar', '1–11-sinf dasturiga mos video darslar va darajali misollar.'],
      ['Har bir o‘quvchi ko‘z oldingizda', 'Kim qaysi mavzuda qiynalayotganini darhol ko‘rasiz.']
    ],
    cabinetBadge: 'O‘qituvchi kabineti',
    cabinetTitle: ['Sinfingizni', 'oson boshqaring'],
    features: [
      ['Guruhlar', 'O‘quvchilarni guruhlarga ajrating, bir guruhdan boshqasiga o‘tkazing'],
      ['O‘quvchi qo‘shish', 'Ism yoki telefon bo‘yicha qidirib taklif yuboring'],
      ['Promo havola va QR kod', 'Havolani ulashing — o‘quvchilar o‘zi qo‘shiladi'],
      ['Natijalar grafigi', 'Guruh va har bir o‘quvchi bo‘yicha o‘sish dinamikasi'],
      ['O‘quvchi kesimida natija', 'Har bir o‘quvchining mavzular bo‘yicha natijalari'],
      ['Kuponlar', 'O‘quvchilaringiz uchun chegirma kuponlari yarating']
    ],
    dash: {
      menu: ['Bosh sahifa', 'Guruhlar', 'O‘quvchilar', 'Natijalar', 'Kuponlar', 'Sozlamalar'],
      title: 'Bosh sahifa',
      stats: ['Jami o‘quvchilar', 'Guruhlar', 'Faol o‘quvchilar', 'O‘rtacha natija'],
      chart: 'Guruhlar bo‘yicha o‘rtacha natija',
      groups: 'Guruhlar',
      newGroup: '+ Yangi guruh',
      recent: 'So‘nggi qo‘shilgan o‘quvchilar',
      cols: ['O‘quvchi', 'Guruh', 'Sana']
    },
    earnBadge: 'Daromad',
    earnTitle: ['Har bir o‘quvchingiz uchun', 'bonus oling'],
    earnSub: 'O‘quvchingiz promo havola orqali platformaga qo‘shilib, to‘lov qilsa — bonus balansingizga tushadi.',
    earnPoints: [
      'Promo havolangiz orqali qo‘shilgan o‘quvchi to‘lov qilsa — bonus balansingizga tushadi',
      'To‘lovlar tarixi har doim ko‘rinib turadi',
      'Balansni istalgan vaqtda yechib olasiz'
    ],
    stepsBadge: 'Qanday ishlaydi?',
    stepsTitle: ['3 qadamda', 'boshlang'],
    steps: [
      ['Ro‘yxatdan o‘ting', 'O‘qituvchi sifatida, telefon raqamingiz bilan'],
      ['O‘quvchilarni ulang', 'Promo havola, QR kod yoki taklif orqali'],
      ['Natijani kuzating', 'Guruhlar va o‘quvchilar natijasi kabinetingizda']
    ],
    quote: 'Endi uy vazifalarini tekshirishga vaqt sarflamayman.',
    quoteAuthor: 'Matematika o‘qituvchisi',
    faqBadge: 'Savollar va javoblar',
    faqTitle: 'Ko‘p beriladigan savollar',
    faq: [
      [
        'Platformadan foydalanish pullikmi?',
        'O‘qituvchi sifatida ro‘yxatdan o‘tish va kabinetdan foydalanish bepul. O‘quvchilar esa o‘zlari tanlagan tarif bo‘yicha obuna bo‘ladi.'
      ],
      [
        'O‘quvchilarimni qanday ulayman?',
        'Kabinetingizdagi promo havola yoki QR kodni o‘quvchilarga ulashing. Allaqachon ro‘yxatdan o‘tgan o‘quvchini ismi yoki telefoni bo‘yicha qidirib, taklif yuborishingiz ham mumkin.'
      ],
      [
        'Bonus qanday hisoblanadi?',
        'Promo havolangiz yoki kuponingiz orqali qo‘shilgan o‘quvchi obuna to‘lovini qilganda, belgilangan bonus avtomatik ravishda balansingizga tushadi.'
      ],
      [
        'Pulni qanday yechib olaman?',
        'To‘lov panelida summani kiritib, yechib olish so‘rovini yuborasiz. Jarayondagi va yechib olingan summalar alohida ko‘rinib turadi.'
      ]
    ],
  },
  ru: {
    nav: [
      ['#features', 'Возможности'],
      ['#how', 'Как это работает'],
      ['#earnings', 'Доход'],
      ['#faq', 'Вопросы']
    ],
    login: 'Вход',
    badge: 'Для учителей',
    title: ['Результаты ваших учеников', 'в одном месте'],
    subtitle:
      'Создавайте группы, подключайте учеников по промо-ссылке и следите за их успехами. Видеоуроки и задания уже готовы — вы только направляете.',
    start: 'Начать как учитель',
    how: 'Как это работает',
    checks: ['Готовые видеоуроки и задания', 'Ответы проверяются автоматически'],
    floatGroup: ['Группа: 7-А класс', '24 ученика'],
    floatAvg: 'Средний результат',
    floatNew: ['Новый ученик', 'добавлен'],
    whyBadge: 'Наши преимущества',
    whyTitle: ['Почему', 'IQMath?'],
    why: [
      ['Не нужно тратить время на проверку', 'Платформа сама проверяет каждый ответ и показывает правильное решение.'],
      ['Готовые материалы', 'Видеоуроки и задания по уровням по программе 1–11 классов.'],
      ['Каждый ученик на виду', 'Сразу видно, кому трудно и в какой теме.']
    ],
    cabinetBadge: 'Кабинет учителя',
    cabinetTitle: ['Управляйте классом', 'легко'],
    features: [
      ['Группы', 'Распределяйте учеников по группам и переводите между ними'],
      ['Добавление учеников', 'Найдите по имени или телефону и отправьте приглашение'],
      ['Промо-ссылка и QR-код', 'Поделитесь ссылкой — ученики подключатся сами'],
      ['График результатов', 'Динамика по группе и по каждому ученику'],
      ['Результаты по ученику', 'Результаты каждого ученика по темам'],
      ['Купоны', 'Создавайте купоны на скидку для своих учеников']
    ],
    dash: {
      menu: ['Главная', 'Группы', 'Ученики', 'Результаты', 'Купоны', 'Настройки'],
      title: 'Главная',
      stats: ['Всего учеников', 'Группы', 'Активные', 'Средний результат'],
      chart: 'Средний результат по группам',
      groups: 'Группы',
      newGroup: '+ Новая группа',
      recent: 'Недавно добавленные ученики',
      cols: ['Ученик', 'Группа', 'Дата']
    },
    earnBadge: 'Доход',
    earnTitle: ['Получайте бонус', 'за каждого ученика'],
    earnSub: 'Если ученик пришёл по вашей промо-ссылке и оплатил подписку — бонус поступает на ваш баланс.',
    earnPoints: [
      'Ученик пришёл по вашей промо-ссылке и оплатил — бонус на вашем балансе',
      'История выплат всегда перед глазами',
      'Вывести баланс можно в любое время'
    ],
    stepsBadge: 'Как это работает?',
    stepsTitle: ['Начните', 'за 3 шага'],
    steps: [
      ['Зарегистрируйтесь', 'Как учитель, по номеру телефона'],
      ['Подключите учеников', 'По промо-ссылке, QR-коду или приглашению'],
      ['Следите за результатами', 'Результаты групп и учеников — в кабинете']
    ],
    quote: 'Теперь я не трачу время на проверку домашних заданий.',
    quoteAuthor: 'Учитель математики',
    faqBadge: 'Вопросы и ответы',
    faqTitle: 'Частые вопросы',
    faq: [
      [
        'Платформа платная?',
        'Регистрация учителя и кабинет — бесплатно. Ученики оформляют подписку по выбранному тарифу.'
      ],
      [
        'Как подключить учеников?',
        'Поделитесь промо-ссылкой или QR-кодом из кабинета. Уже зарегистрированного ученика можно найти по имени или телефону и отправить приглашение.'
      ],
      [
        'Как считается бонус?',
        'Когда ученик, пришедший по вашей промо-ссылке или купону, оплачивает подписку, бонус автоматически поступает на ваш баланс.'
      ],
      [
        'Как вывести деньги?',
        'В платёжной панели введите сумму и отправьте заявку на вывод. Суммы в обработке и выведенные видны отдельно.'
      ]
    ],
  }
}

const FEATURE_ICONS = [
  [Users, 'bg-[#EAF1FF] text-[#1D6BFF]'],
  [UserPlus, 'bg-[#E7F8F0] text-[#16A34A]'],
  [Link2, 'bg-[#E6F6FB] text-[#0E7490]'],
  [BarChart3, 'bg-[#F1EBFF] text-[#7C3AED]'],
  [FileText, 'bg-[#F5EBFF] text-[#9333EA]'],
  [Ticket, 'bg-[#FFF1E6] text-[#EA580C]']
]

const WHY_CARDS = [
  { Icon: Zap, image: '/images/teachers/why-time.webp', tone: 'bg-[#EFE7FF] text-[#7C3AED]', card: 'from-[#F6F0FF]' },
  { Icon: BookOpen, image: '/images/teachers/why-materials.webp', tone: 'bg-[#E3EDFF] text-[#1D6BFF]', card: 'from-[#EEF4FF]' },
  { Icon: BarChart3, image: '/images/teachers/why-progress.webp', tone: 'bg-[#DFF6E7] text-[#16A34A]', card: 'from-[#EEFBF2]' }
]
// Daromad rasmi chetlari fonga qo'shilib ketadi (keskin chiziq ko'rinmasin)
const EARNINGS_MASK = 'linear-gradient(to right, transparent, #000 6%, #000 80%, transparent)'
const MENU_ICONS = [Home, Users, UserPlus, BarChart3, Ticket, Settings]

const SAMPLE_STUDENTS = [
  ['Aliyev Behruz', '7-A', '2026-10-28'],
  ['Karimova Sevinch', '7-A', '2026-10-27'],
  ['Toshpo‘latov Abror', '8-B', '2026-10-27'],
  ['Nomurodova Javohir', '7-A', '2026-10-26']
]

const SAMPLE_GROUPS = [
  ['7-A sinf', 24],
  ['7-B sinf', 18],
  ['8-A sinf', 21],
  ['8-B sinf', 16]
]

/** Noutbuk ichidagi o'qituvchi kabineti (soddalashtirilgan ko'rinish) */
const TeacherDashboard = ({ d }) => (
  <div className="flex text-[8px] text-[#0B1220] sm:text-[9.5px]">
    <aside className="hidden w-[22%] shrink-0 border-r border-[#EEF2F7] bg-white p-2.5 sm:block">
      <div className="mb-3 text-[12px] font-extrabold">
        <span className="text-[#1D6BFF]">iQ</span>Math
      </div>
      {d.menu.map((item, i) => {
        const Icon = MENU_ICONS[i]
        return (
          <div
            key={item}
            className={`mb-1 flex items-center gap-1.5 rounded-md px-2 py-1.5 ${i === 0 ? 'bg-[#1D6BFF] font-semibold text-white' : 'text-[#64748B]'}`}
          >
            <Icon size={10} />
            {item}
          </div>
        )
      })}
    </aside>
    <div className="flex-1 p-3">
      <div className="mb-2.5 text-[11px] font-bold">{d.title}</div>
      <div className="grid grid-cols-4 gap-1.5">
        {[
          [Users, '124', 'bg-[#EAF1FF] text-[#1D6BFF]'],
          [BookOpen, '8', 'bg-[#F1EBFF] text-[#7C3AED]'],
          [TrendingUp, '96', 'bg-[#E7F8F0] text-[#16A34A]'],
          [BarChart3, '78%', 'bg-[#FFF1E6] text-[#EA580C]']
        ].map(([Icon, value, tone], i) => (
          <div key={i} className="flex items-center gap-1.5 rounded-lg bg-white p-1.5 shadow-sm">
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${tone}`}>
              <Icon size={10} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[6.5px] text-[#94A3B8]">{d.stats[i]}</span>
              <span className="block text-[11px] font-extrabold">{value}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-[1.6fr_1fr] gap-1.5">
        <div className="rounded-lg bg-white p-2 shadow-sm">
          <div className="mb-1 flex justify-between font-semibold">
            {d.chart}
            <span className="rounded bg-[#F1F5F9] px-1 text-[7px] text-[#64748B]">7-A</span>
          </div>
          <svg viewBox="0 0 200 70" className="h-[62px] w-full">
            <defs>
              <linearGradient id="tdArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#7C3AED" stopOpacity="0.35" />
                <stop offset="1" stopColor="#7C3AED" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[15, 35, 55].map((y) => (
              <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="#EEF2F7" />
            ))}
            <path d="M0 55 30 48 60 50 90 38 120 34 150 26 180 18 200 10V70H0Z" fill="url(#tdArea)" />
            <path d="M0 55 30 48 60 50 90 38 120 34 150 26 180 18 200 10" fill="none" stroke="#7C3AED" strokeWidth="2" />
            {[[30, 48], [60, 50], [90, 38], [120, 34], [150, 26], [180, 18]].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="2.2" fill="#fff" stroke="#7C3AED" strokeWidth="1.5" />
            ))}
          </svg>
        </div>
        <div className="row-span-2 rounded-lg bg-white p-2 shadow-sm">
          <div className="mb-1 font-semibold">{d.groups}</div>
          {SAMPLE_GROUPS.map(([name, count]) => (
            <div key={name} className="flex justify-between border-b border-[#F1F5F9] py-1 text-[#475569] last:border-0">
              {name}
              <span className="text-[#94A3B8]">{count} ›</span>
            </div>
          ))}
          <div className="mt-1.5 rounded-md bg-[#1D6BFF] py-1 text-center font-semibold text-white">{d.newGroup}</div>
        </div>
        <div className="rounded-lg bg-white p-2 shadow-sm">
          <div className="mb-1 font-semibold">{d.recent}</div>
          <div className="grid grid-cols-[1.6fr_0.6fr_1fr] text-[7px] text-[#94A3B8]">
            {d.cols.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          {SAMPLE_STUDENTS.map(([name, group, date]) => (
            <div key={name} className="grid grid-cols-[1.6fr_0.6fr_1fr] items-center py-[3px] text-[#334155]">
              <span className="flex items-center gap-1 truncate">
                <span className="h-3 w-3 shrink-0 rounded-full bg-gradient-to-br from-[#C7D2FE] to-[#A5B4FC]" />
                {name}
              </span>
              <span>{group}</span>
              <span className="text-[#94A3B8]">{date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

/** O'qituvchilar landingi (/teachers) */
const TeachersLanding = () => {
  const landing = useRoleLanding('tutor')
  const t = TEXT[landing.lang]

  return (
    <LandingShell accent="teacher" nav={t.nav} landing={landing} loginLabel={t.login}>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        {/* Telefon: rasm tepada banner */}
        <div className="relative h-[280px] w-full overflow-hidden sm:h-[380px] lg:hidden">
          <img src="/images/teachers/hero-main-sm.webp" alt="" className="h-full w-full object-cover object-[40%_40%]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F5F8FF] to-transparent" />
        </div>
        {/* Katta ekran: rasm o'ng tomonda; "Guruh", "O'rtacha natija", "Yangi o'quvchi" kartochkalari rasmning o'zida */}
        <div className="absolute inset-y-0 right-0 hidden w-[62%] lg:block">
          <img src="/images/teachers/hero-main.webp" alt="" className="h-full w-full object-cover object-[100%_35%]" />
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#F5F8FF] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#F5F8FF] to-transparent" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-4 pb-10 pt-2 sm:px-6 lg:flex lg:min-h-[620px] lg:items-center lg:px-10 lg:pb-14 lg:pt-4 xl:min-h-[680px]">
          <HeroText
            accent="teacher"
            badge={
              <>
                {t.badge} <Users size={14} />
              </>
            }
            title={t.title}
            highlightClass="text-[#7C3AED]"
            subtitle={t.subtitle}
            start={t.start}
            checks={t.checks}
            onStart={landing.openSignUp}
          />

        </div>
      </section>

      {/* ================= NIMA UCHUN: har kartada 3D rasm ================= */}
      <Band tone="white">
        <Section className="py-14 sm:py-16">
          <div className="text-center">
            <span className="inline-flex rounded-full bg-[#EAF1FF] px-5 py-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[#4F6BF5]">
              {t.whyBadge}
            </span>
            <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.02em] sm:text-[44px]">
              {t.whyTitle[0]} <span className="text-[#1D6BFF]">{t.whyTitle[1]}</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-7">
            {t.why.map(([title, text], i) => {
              const { Icon, image, tone, card } = WHY_CARDS[i]
              return (
                <div
                  key={title}
                  className={`flex items-center gap-3 overflow-hidden rounded-[26px] bg-gradient-to-br to-white p-6 shadow-[0_18px_50px_-28px_rgba(30,58,138,0.3)] ring-1 ring-white transition hover:-translate-y-1 lg:p-7 ${card}`}
                >
                  <div className="min-w-0 flex-1">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-5 text-[20px] font-extrabold leading-tight lg:text-[22px]">{title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#5B6478]">{text}</p>
                  </div>
                  <img src={image} alt="" className="w-[42%] shrink-0 mix-blend-multiply md:w-[40%] lg:w-[44%]" />
                </div>
              )
            })}
          </div>
        </Section>
      </Band>

      {/* ================= KABINET ================= */}
      <Section id="features" className="py-14 sm:py-16">
        <SectionTitle accent="teacher" badge={t.cabinetBadge} title={t.cabinetTitle} />
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <LaptopFrame>
            <TeacherDashboard d={t.dash} />
          </LaptopFrame>
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

      {/* ================= DAROMAD: chapda hamyon ekrani tasvirlangan keng rasm, o'ngda matn ================= */}
      <section id="earnings" className="relative scroll-mt-20 overflow-hidden">
        {/* Telefon: rasm tepada */}
        <div className="relative h-[340px] w-full overflow-hidden sm:h-[440px] lg:hidden">
          <img src="/images/teachers/earnings-sm.webp" alt="" className="h-full w-full object-cover object-[50%_30%]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F5F8FF] to-transparent" />
        </div>
        {/* Katta ekran: rasm butun holicha (kesilmasdan) bo'lim balandligiga sig'adi; o'ng cheti fonga qo'shilib ketadi */}
        <div className="absolute inset-y-0 left-[max(0px,calc((100vw-1400px)/2))] right-0 hidden lg:block">
          <img
            src="/images/teachers/earnings.webp"
            alt=""
            className="h-full w-auto max-w-none object-contain"
            style={{ WebkitMaskImage: EARNINGS_MASK, maskImage: EARNINGS_MASK }}
          />
        </div>

        <div className="relative mx-auto max-w-[1240px] px-4 pb-4 sm:px-6 lg:flex lg:h-[500px] lg:items-center xl:h-[540px]">
          <div className="lg:ml-[46%] lg:max-w-[600px]">
            <Badge accent="teacher" className="!bg-[#E7F8F0] !text-[#16A34A]">
              {t.earnBadge}
            </Badge>
            <h2 className="mt-3 text-[30px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[42px]">
              {t.earnTitle[0]} <span className="text-[#16A34A]">{t.earnTitle[1]}</span>
            </h2>
            <p className="mt-3 max-w-[520px] text-[16px] text-[#5B6478]">{t.earnSub}</p>
            <Card className="mt-7 divide-y divide-[#EEF2F7] !bg-white px-6">
              {t.earnPoints.map((point, i) => (
                <div key={point} className="flex items-center gap-4 py-4">
                  <IconTile
                    Icon={[Users, ReceiptText, Wallet][i]}
                    tone={['bg-[#E7F8F0] text-[#16A34A]', 'bg-[#EAF1FF] text-[#1D6BFF]', 'bg-[#F1EBFF] text-[#7C3AED]'][i]}
                  />
                  <p className="text-[15px] text-[#334155]">{point}</p>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </section>

      <Band tone="white">
      <Steps
        className="py-14 sm:py-16"
        accent="teacher"
        badge={t.stepsBadge}
        title={t.stepsTitle}
        steps={t.steps.map(([title, text], i) => ({
          title,
          text,
          Icon: [Smartphone, QrCode, BarChart3][i],
          tone: ['bg-[#EAF1FF] text-[#1D6BFF]', 'bg-[#F1EBFF] text-[#7C3AED]', 'bg-[#FFF1E6] text-[#EA580C]'][i]
        }))}
      />
      </Band>

      <QuoteBox
        className="py-14 sm:py-16"
        image="/images/teachers/band-wide.webp"
        imageSm="/images/teachers/band.webp"
        quote={t.quote}
        author={t.quoteAuthor}
      />

      <Faq className="pb-4 pt-0" accent="teacher" badge={t.faqBadge} title={t.faqTitle} items={t.faq} />
    </LandingShell>
  )
}

export default TeachersLanding
