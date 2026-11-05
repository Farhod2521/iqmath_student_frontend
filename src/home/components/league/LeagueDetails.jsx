import {
  ArrowRight, CalendarCheck, ClipboardCheck, Crown, Flag, Gift, LogOut, Medal, PartyPopper, Repeat, ShieldCheck, Sparkles, Timer, Trophy, Users, Wifi
} from 'lucide-react'
import { FaTrophy } from 'react-icons/fa'
import { Card, Section } from '../role-landing/shared'

const FONT = "font-['Manrope','Inter',system-ui,sans-serif]"

const TEXT = {
  uz: {
    prizesBadge: 'Sovg‘alar',
    prizesTitle: ['Har bir sinfda', '3 g‘olib'],
    prizesText: 'Sinflar alohida bellashadi. Mavsum yakunida 1–11-sinflarning har birida eng ko‘p ball to‘plagan uch o‘quvchi sovg‘a oladi.',
    place: '-o‘rin',
    join: 'Ligaga qo‘shilish',
    seasonBadge: 'Mavsum',
    seasonTitle: (weeks) => [`${weeks} haftalik`, 'mavsum'],
    seasonText: 'Har haftada bitta test. Oxirgi hafta testi tugagach mavsum o‘zi yopiladi.',
    seasonSteps: (weeks) => [
      ['1-hafta', 'Mavsum ochiladi', 'Ligaga qo‘shilasiz va ball to‘plashni boshlaysiz'],
      ['Har hafta', 'Yangi test', 'Belgilangan kun va soatda sinfingiz testi ochiladi'],
      [`${weeks}-hafta`, 'Oxirgi test', 'Test tugagach mavsum avtomatik yopiladi'],
      ['Yakun', 'G‘oliblar', 'G‘oliblar saqlanadi, ballar yangi mavsum uchun nolga tushadi']
    ],
    pointsBadge: 'Ballar',
    pointsTitle: ['Ball qanday', 'to‘planadi?'],
    points: [
      ['+1', 'Har kuni kirish', 'Platformaga kirgan har bir kuningiz uchun'],
      ['+1', 'Fanlarni ishlash', 'Fanlardan topshiriqlarni bajarganingiz uchun'],
      ['Test bali', 'Haftalik testlar', 'Testda to‘plagan balingiz to‘liq qo‘shiladi']
    ],
    pointsNote: 'Ballar teng bo‘lsa, testlarni tezroq ishlagan o‘quvchi yuqoriroq turadi.',
    rulesBadge: 'Qoidalar',
    rulesTitle: ['Adolatli', 'bellashuv'],
    rules: [
      ['O‘z sinfingiz', 'Har kim faqat o‘z sinfi testlarini ishlaydi va shu sinf reytingida turadi.'],
      ['Bir urinish', 'Har bir testni faqat bir marta ishlash mumkin, savollar tasodifiy tushadi.'],
      ['Vaqt cheklangan', 'Vaqt tugasa test o‘zi yopiladi, javobsiz savollar xato hisoblanadi.'],
      ['Internet uzilsa', 'Sahifa yopilib qolsa, qaytib kirib o‘sha joydan davom etasiz. Taymer to‘xtamaydi.'],
      ['Testdan chiqish', 'Testdan chiqsangiz u yakunlanadi va qaytadan kirib bo‘lmaydi.'],
      ['Halollik', 'Nusxa olish va skrinshot taqiqlangan. G‘oliblarning hujjatlari tekshiriladi.']
    ],
    winnersBadge: 'G‘oliblar',
    winnersTitle: (number) => [`${number}-mavsum`, 'g‘oliblari'],
    grade: '-sinf',
    points_short: 'ball'
  },
  ru: {
    prizesBadge: 'Призы',
    prizesTitle: ['В каждом классе', '3 победителя'],
    prizesText: 'Классы соревнуются отдельно. В конце сезона в каждом из 1–11 классов призы получают три ученика, набравшие больше всего баллов.',
    place: ' место',
    join: 'Вступить в лигу',
    seasonBadge: 'Сезон',
    seasonTitle: (weeks) => [`Сезон на ${weeks}`, 'недель'],
    seasonText: 'Каждую неделю один тест. После теста последней недели сезон закрывается сам.',
    seasonSteps: (weeks) => [
      ['1 неделя', 'Сезон открыт', 'Вы вступаете в лигу и начинаете набирать баллы'],
      ['Каждую неделю', 'Новый тест', 'В назначенный день и час открывается тест вашего класса'],
      [`${weeks} неделя`, 'Последний тест', 'После теста сезон закрывается автоматически'],
      ['Итог', 'Победители', 'Победители сохраняются, баллы обнуляются для нового сезона']
    ],
    pointsBadge: 'Баллы',
    pointsTitle: ['Как набирать', 'баллы?'],
    points: [
      ['+1', 'Ежедневный вход', 'За каждый день, когда вы заходите на платформу'],
      ['+1', 'Занятия по предметам', 'За выполнение заданий по предметам'],
      ['Балл теста', 'Еженедельные тесты', 'Балл за тест добавляется полностью']
    ],
    pointsNote: 'При равных баллах выше стоит тот, кто решил тесты быстрее.',
    rulesBadge: 'Правила',
    rulesTitle: ['Честное', 'соревнование'],
    rules: [
      ['Свой класс', 'Каждый решает тесты только своего класса и стоит в рейтинге этого класса.'],
      ['Одна попытка', 'Каждый тест можно пройти только один раз, вопросы выпадают случайно.'],
      ['Время ограничено', 'Когда время выходит, тест закрывается, вопросы без ответа считаются неверными.'],
      ['Если пропал интернет', 'Если страница закрылась, вы вернётесь на то же место. Таймер не останавливается.'],
      ['Выход из теста', 'Если выйти из теста, он завершится, и вернуться в него нельзя.'],
      ['Честность', 'Копирование и скриншоты запрещены. Документы победителей проверяются.']
    ],
    winnersBadge: 'Победители',
    winnersTitle: (number) => ['Победители', `${number} сезона`],
    grade: ' класс',
    points_short: 'баллов'
  }
}

const DEFAULT_PRIZES = { uz: ['Planshet', 'Telefon', 'Quloqchin'], ru: ['Планшет', 'Телефон', 'Наушники'] }
const DEFAULT_WEEKS = 12

// Telefonda 1-2-3 tartibida, katta ekranda 1-o'rin o'rtada va kattaroq
const PRIZES = [
  { Icon: Crown, image: '/images/league/prize-tablet.webp', imageClass: 'w-[48%] max-w-[240px]', order: 'lg:order-2' },
  { Icon: Medal, image: '/images/league/prize-phone.webp', imageClass: 'h-[130px] xl:h-[150px]', order: 'lg:order-1' },
  { Icon: Medal, image: '/images/league/prize-headphones.webp', imageClass: 'h-[120px] xl:h-[140px]', order: 'lg:order-3' }
]
const SEASON_ICONS = [Flag, CalendarCheck, Timer, PartyPopper]
const POINT_ICONS = [Repeat, Sparkles, ClipboardCheck]
const RULE_ICONS = [Users, ClipboardCheck, Timer, Wifi, LogOut, ShieldCheck]

const Heading = ({ Icon, badge, title, center = false }) => (
  <div className={center ? 'text-center' : ''}>
    <span className="inline-flex items-center gap-2 rounded-full bg-[#E3ECFF] px-4 py-2 text-[15px] font-bold text-[#1D4FE0]">
      <Icon size={20} />
      {badge}
    </span>
    <h2 className="mt-4 text-[30px] font-extrabold leading-tight tracking-[-0.02em] text-[#0B1B3F] sm:text-[40px] xl:text-[46px]">
      {title[0]} <span className="italic text-[#1F6BFF]">{title[1]}</span>
    </h2>
  </div>
)

/** Sovg'alar, mavsum, ballar, qoidalar va o'tgan mavsum g'oliblari */
const LeagueDetails = ({ lang, season, winners, onJoin }) => {
  const t = TEXT[lang]
  const weeks = season?.weeks_count || DEFAULT_WEEKS
  const prizes = [1, 2, 3].map((place) => season?.[`prize_${place}_${lang}`] || DEFAULT_PRIZES[lang][place - 1])
  const champions = (winners?.winners || []).filter((winner) => winner.place === 1 && !winner.is_disqualified)

  return (
    <>
      {/* ================= SOVG'ALAR: uchta karta, 1-o'rin o'rtada ================= */}
      <div className="relative mt-10 overflow-hidden py-10 sm:mt-14 sm:py-14">
        {/* Burchaklardagi och ko'k to'lqinlar */}
        <svg viewBox="0 0 400 300" aria-hidden="true" className="pointer-events-none absolute left-0 top-0 w-[220px] sm:w-[400px]">
          <path d="M0 0H390C340 120 200 210 0 290Z" fill="#E3EDFF" fillOpacity="0.7" />
        </svg>
        <svg viewBox="0 0 400 200" aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 w-[220px] sm:w-[420px]">
          <path d="M400 0V200H10C120 190 280 150 400 0Z" fill="#E3EDFF" fillOpacity="0.7" />
        </svg>

        <Section id="prizes" className={FONT}>
          <Heading Icon={Gift} badge={t.prizesBadge} title={t.prizesTitle} center />
          <p className="mx-auto mt-3 max-w-[680px] text-center text-[16px] leading-relaxed text-[#475569] xl:text-[18px]">{t.prizesText}</p>
          <div className="mx-auto mt-9 grid max-w-[520px] items-center gap-4 lg:max-w-[1240px] lg:grid-cols-[1fr_1.2fr_1fr] lg:gap-6">
            {PRIZES.map(({ Icon, image, imageClass, order }, index) => {
              const first = index === 0
              return (
                <div
                  key={image}
                  className={`relative flex items-center justify-between gap-3 overflow-hidden rounded-[28px] shadow-[0_18px_44px_-28px_rgba(30,58,138,0.4)] ${order} ${
                    first ? 'border-2 border-[#BFD4FB] bg-gradient-to-br from-[#EEF4FF] to-[#F8FBFF] p-6 lg:py-9 xl:p-9' : 'border border-[#E6ECF7] bg-white/80 p-6 xl:p-8'
                  }`}
                >
                  {first ? <span className="absolute -right-8 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[#DCE9FF]/70" /> : null}
                  <div className="relative min-w-0">
                    <span className={`inline-flex items-center gap-2 rounded-full pr-4 text-[15px] font-bold ${first ? 'bg-gradient-to-r from-[#1F6BFF] to-[#1D4FE0] text-white' : 'bg-[#F1F5FC] text-[#475569]'}`}>
                      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${first ? 'text-white' : 'bg-[#E3ECFF] text-[#1D4FE0]'}`}>
                        <Icon size={20} />
                      </span>
                      {index + 1}
                      {t.place}
                    </span>
                    <p className={`mt-4 break-words font-extrabold leading-tight text-[#0B1B3F] ${first ? 'text-[28px] xl:text-[36px]' : 'text-[24px] xl:text-[32px]'}`}>{prizes[index]}</p>
                  </div>
                  <img src={image} alt="" loading="lazy" className={`relative shrink-0 object-contain ${imageClass}`} />
                </div>
              )
            })}
          </div>
          <div className="mt-9 flex justify-center">
            <button
              onClick={onJoin}
              className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#1F6BFF] to-[#1D3FD8] px-8 text-[17px] font-bold text-white shadow-[0_16px_32px_-12px_rgba(29,79,224,0.9)] transition hover:brightness-110"
            >
              {t.join}
              <ArrowRight size={20} strokeWidth={2.5} className="transition group-hover:translate-x-1" />
            </button>
          </div>
        </Section>
      </div>

      {/* ================= MAVSUM: ko'k panel ichida 4 bosqich ================= */}
      <Section id="season" className={`pt-6 sm:pt-8 ${FONT}`}>
        <div className="overflow-hidden rounded-[30px] bg-gradient-to-br from-[#1F6BFF] to-[#1D3FD8] p-6 text-white shadow-[0_28px_60px_-30px_rgba(29,79,224,0.9)] sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[15px] font-bold">
            <Trophy size={20} />
            {t.seasonBadge}
          </span>
          <h2 className="mt-4 text-[30px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[40px]">
            {t.seasonTitle(weeks)[0]} <span className="italic text-[#FFD45C]">{t.seasonTitle(weeks)[1]}</span>
          </h2>
          <p className="mt-2 max-w-[640px] text-[16px] leading-relaxed text-white/85 xl:text-[18px]">{t.seasonText}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.seasonSteps(weeks).map(([when, title, text], index) => {
              const Icon = SEASON_ICONS[index]
              return (
                <div key={title} className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#1D4FE0]">
                      <Icon size={22} />
                    </span>
                    <span className="text-[14px] font-bold text-[#FFD45C]">{when}</span>
                  </div>
                  <h3 className="mt-4 text-[19px] font-extrabold">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-snug text-white/85">{text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </Section>

      {/* ================= BALLAR ================= */}
      <Section id="points" className={`pt-16 sm:pt-20 ${FONT}`}>
        <Heading Icon={Sparkles} badge={t.pointsBadge} title={t.pointsTitle} />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {t.points.map(([value, title, text], index) => {
            const Icon = POINT_ICONS[index]
            return (
              <Card key={title} className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[34px] font-extrabold leading-none text-[#1D4FE0]">{value}</span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E6EEFF] text-[#1D4FE0]">
                    <Icon size={22} />
                  </span>
                </div>
                <h3 className="mt-4 text-[20px] font-extrabold text-[#0B1B3F]">{title}</h3>
                <p className="mt-1.5 text-[15px] leading-snug text-[#475569] xl:text-[16px]">{text}</p>
              </Card>
            )
          })}
        </div>
        <p className="mt-5 text-[15px] text-[#475569] xl:text-[16px]">{t.pointsNote}</p>
      </Section>

      {/* ================= QOIDALAR ================= */}
      <Section id="rules" className={`pt-16 sm:pt-20 ${FONT}`}>
        <Heading Icon={ShieldCheck} badge={t.rulesBadge} title={t.rulesTitle} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.rules.map(([title, text], index) => {
            const Icon = RULE_ICONS[index]
            return (
              <Card key={title} className="flex items-start gap-4 p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF3FF] text-[#1D4FE0]">
                  <Icon size={24} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[18px] font-extrabold text-[#0B1B3F]">{title}</h3>
                  <p className="mt-1 text-[15px] leading-snug text-[#475569]">{text}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </Section>

      {/* ================= G'OLIBLAR: faqat yopilgan mavsum bo'lsa chiqadi ================= */}
      {champions.length ? (
        <Section id="winners" className={`pt-16 sm:pt-20 ${FONT}`}>
          <Heading Icon={Crown} badge={t.winnersBadge} title={t.winnersTitle(winners.number)} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {champions.map((winner) => (
              <Card key={winner.grade} className="flex items-center gap-3 p-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FFC93C] to-[#F5A524] text-white">
                  <FaTrophy size={20} />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-[#1D4FE0]">
                    {winner.grade}
                    {t.grade}
                  </p>
                  <p className="truncate text-[17px] font-extrabold text-[#0B1B3F]">{winner.full_name}</p>
                  <p className="text-[14px] text-[#475569]">
                    {winner.points} {t.points_short}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  )
}

export default LeagueDetails
