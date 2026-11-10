import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight, BarChart3, CalendarCheck, CalendarDays, CalendarX, CheckCircle2, ClipboardList, Clock, Gift, Layers, Lock, Trophy, Users
} from 'lucide-react'
import toast from 'react-hot-toast'
import LigaSeasonEmpty from '@/components/liga/LigaSeasonEmpty'
import LigaJoinModal from '@/components/liga/LigaJoinModal'
import { useGetQuery } from '@/hooks'
import { URLS } from '@/constants/url'
import { LigaHero } from '@/modules/teacher/liga/LigaParts'
import { request } from '@/services/api'
import LigaGuard from './LigaGuard'

const TEXT = {
  uz: {
    title: 'Matematik Liga',
    season: (n) => `${n}-mavsum`,
    grade: (n) => `${n}-sinf`,
    emptyTitle: ['Hali', 'mavsum', 'yo‘q'],
    empty: 'Hozirda Matematika Ligasida faol mavsum mavjud emas. Yangi mavsum boshlanganda bu yerda testlar, reyting va natijalar paydo bo‘ladi.',
    closed: 'Mavsum yakunlandi',
    joinTitle: 'Ligaga qo‘shiling',
    joinText: 'Qo‘shilgach har kuni kirganingiz, fanlarda yechgan savollaringiz va haftalik testlar uchun ball olasiz.',
    join: 'Ligada qatnashish',
    needPay: 'Ligada qatnashish uchun obuna faol bo‘lishi kerak.',
    pay: 'Tarifni tanlash',
    seasonLabel: 'Mavsum',
    gradeLabel: 'Sinf',
    points: 'Ballaringiz',
    rank: 'Sizning o‘rningiz',
    prizes: 'Sovg‘alar',
    prizesText: 'Reytingda yuqori o‘rinlarni egallang va sovg‘alar yutib oling',
    place: (n) => `${n}-o‘rin`,
    prizeNote: 'Har bir sinfdan 3 ta g‘olib. Sovg‘a topshirishda hujjatlar tekshiriladi: sinf noto‘g‘ri ko‘rsatilgan bo‘lsa, sovg‘a berilmaydi.',
    tests: 'Haftalik testlar',
    testsText: 'Har hafta yangi test va reytingda ko‘tarilish imkoniyati',
    noTests: 'Testlar hali e’lon qilinmagan',
    weekTest: (n) => `${n}-hafta testi`,
    minutes: (n) => `${n} daqiqa`,
    questions: (n) => `${n} ta savol`,
    start: 'Boshlash',
    resume: 'Davom ettirish',
    missed: 'Muddati tugagan',
    result: (score, max) => `Natija: ${score} / ${max}`,
    showResult: 'Natijani ko‘rish',
    joinFirst: 'Avval ligaga qo‘shiling',
    top: 'Sinf reytingi',
    all: 'Barchasi',
    less: 'Yopish',
    ball: (n) => `${n} ball`,
    noTop: 'Hali natijalar yo‘q',
    winners: 'G‘oliblar',
    pastWinners: 'Oldingi mavsum g‘oliblari',
    disqualified: 'Mahrum qilingan',
    days: 'kun',
    notice: 'Skrinshot olish mumkin emas'
  },
  ru: {
    title: 'Математическая лига',
    season: (n) => `Сезон ${n}`,
    grade: (n) => `${n} класс`,
    emptyTitle: ['Пока нет', 'сезона', ''],
    empty: 'Сейчас в Математической лиге нет активного сезона. Когда начнётся новый сезон, здесь появятся тесты, рейтинг и результаты.',
    closed: 'Сезон завершён',
    joinTitle: 'Присоединяйтесь к лиге',
    joinText: 'После вступления вы получаете баллы за ежедневный вход, решённые задания и еженедельные тесты.',
    join: 'Участвовать в лиге',
    needPay: 'Для участия в лиге нужна активная подписка.',
    pay: 'Выбрать тариф',
    seasonLabel: 'Сезон',
    gradeLabel: 'Класс',
    points: 'Ваши баллы',
    rank: 'Ваше место',
    prizes: 'Призы',
    prizesText: 'Займите высокое место в рейтинге и выиграйте призы',
    place: (n) => `${n} место`,
    prizeNote: 'В каждом классе 3 победителя. При вручении приза проверяются документы: если класс указан неверно, приз не выдаётся.',
    tests: 'Еженедельные тесты',
    testsText: 'Каждую неделю новый тест и шанс подняться в рейтинге',
    noTests: 'Тесты ещё не объявлены',
    weekTest: (n) => `Тест недели ${n}`,
    minutes: (n) => `${n} мин`,
    questions: (n) => `${n} вопросов`,
    start: 'Начать',
    resume: 'Продолжить',
    missed: 'Срок истёк',
    result: (score, max) => `Результат: ${score} / ${max}`,
    showResult: 'Посмотреть результат',
    joinFirst: 'Сначала вступите в лигу',
    top: 'Рейтинг класса',
    all: 'Все',
    less: 'Свернуть',
    ball: (n) => `${n} балл.`,
    noTop: 'Результатов пока нет',
    winners: 'Победители',
    pastWinners: 'Победители прошлых сезонов',
    disqualified: 'Лишён приза',
    days: 'дн',
    notice: 'Скриншоты запрещены'
  }
}

const HERO = { image: '/images/league/student-hero.webp', width: 700, height: 420 }
const CARD = 'rounded-3xl border border-[#E6ECF7] bg-white shadow-[0_16px_36px_-30px_rgba(31,122,236,0.55)]'
const PRIMARY = 'inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1F7AEC] px-5 text-sm font-semibold text-white transition hover:bg-[#1767CC] disabled:opacity-60'
const TOP_SHOWN = 5

const MEDALS = [
  'bg-gradient-to-b from-[#FDE68A] to-[#F59E0B] text-white',
  'bg-gradient-to-b from-[#E2E8F0] to-[#94A3B8] text-white',
  'bg-gradient-to-b from-[#FDBA74] to-[#C2410C] text-white'
]

// Standart sovg'alar rasmi: mentor boshqa sovg'a yozsa, rasm o'rniga ikonka chiqadi
const PRIZE_IMAGES = { planshet: 'prize-tablet', telefon: 'prize-phone', quloqchin: 'prize-headphones' }

const formatDate = (value, lang) =>
  new Date(value).toLocaleString(lang === 'ru' ? 'ru-RU' : 'uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })

const Medal = ({ place }) => (
  <span
    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
      MEDALS[place - 1] || 'bg-[#EEF3FA] text-[#64748B]'
    }`}
  >
    {place}
  </span>
)

const CardHead = ({ Icon, title, text, children }) => (
  <div className="flex items-center gap-3">
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#1F7AEC]">
      <Icon size={22} />
    </span>
    <div className="min-w-0 flex-1">
      <h2 className="text-lg font-bold text-[#191C1D]">{title}</h2>
      {text ? <p className="text-sm text-[#64748B]">{text}</p> : null}
    </div>
    {children}
  </div>
)

/** Test boshlanishigacha orqaga sanash */
const Countdown = ({ to, daysLabel, onEnd }) => {
  const [left, setLeft] = useState(() => new Date(to).getTime() - Date.now())

  useEffect(() => {
    const timer = setInterval(() => {
      const next = new Date(to).getTime() - Date.now()
      setLeft(next)
      if (next <= 0) {
        clearInterval(timer)
        onEnd?.()
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [to, onEnd])

  const total = Math.max(0, Math.floor(left / 1000))
  const pad = (value) => String(value).padStart(2, '0')
  const days = Math.floor(total / 86400)

  return (
    <span className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#EAF3FF] px-4 text-sm font-semibold tabular-nums text-[#1F7AEC]">
      <Clock size={16} />
      {days > 0 ? `${days} ${daysLabel} ` : ''}
      {pad(Math.floor((total % 86400) / 3600))}:{pad(Math.floor((total % 3600) / 60))}:{pad(total % 60)}
    </span>
  )
}

const TestRow = ({ test, joined, text, lang, busy, onStart, onOpen, onRefresh }) => {
  const { attempt, status } = test
  const inProgress = attempt?.status === 'in_progress'

  let action
  if (attempt && !inProgress) {
    action = (
      <>
        <span className="inline-flex h-10 items-center gap-2 rounded-full bg-[#E7F8EF] px-4 text-sm font-semibold text-[#15803D]">
          <CheckCircle2 size={18} />
          {text.result(attempt.score, attempt.max_score)}
        </span>
        <button onClick={() => onOpen(attempt.id)} className={PRIMARY}>
          {text.showResult}
          <ArrowRight size={17} />
        </button>
      </>
    )
  } else if (inProgress) {
    action = (
      <button onClick={() => onOpen(attempt.id)} className={PRIMARY}>
        {text.resume}
        <ArrowRight size={17} />
      </button>
    )
  } else if (status === 'live') {
    action = joined ? (
      <button disabled={busy} onClick={() => onStart(test.id)} className={PRIMARY}>
        {text.start}
        <ArrowRight size={17} />
      </button>
    ) : (
      <span className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#F1F5FB] px-4 text-sm text-[#64748B]">
        <Lock size={15} />
        {text.joinFirst}
      </span>
    )
  } else if (status === 'upcoming') {
    action = (
      <>
        <Countdown to={test.start_at} daysLabel={text.days} onEnd={onRefresh} />
        <button disabled className={`${PRIMARY} cursor-not-allowed !bg-[#CBD5E1]`}>
          <Lock size={16} />
          {text.start}
        </button>
      </>
    )
  } else {
    action = (
      <span className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#F1F5FB] px-4 text-sm text-[#64748B]">
        <CalendarX size={16} />
        {text.missed}
      </span>
    )
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E3EAF6] bg-white p-4 sm:p-5 xl:flex-row xl:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#1F7AEC]">
          <ClipboardList size={26} />
        </span>
        <div className="min-w-0">
          <p className="text-lg font-bold text-[#191C1D]">{text.weekTest(test.week_number)}</p>
          <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#64748B]">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={16} />
              {formatDate(test.start_at, lang)} – {formatDate(test.end_at, lang)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={16} />
              {text.minutes(test.duration_minutes)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Layers size={16} />
              {text.questions(test.question_count)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">{action}</div>
    </div>
  )
}

const PrizeImage = ({ name }) => {
  const file = PRIZE_IMAGES[(name || '').trim().toLowerCase()]
  if (!file) return <Gift size={26} className="text-[#1F7AEC]" />
  return <Image src={`/images/league/${file}.webp`} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
}

/** O'quvchining liga sahifasi: mavsum, haftalik testlar, sinf reytingi va sovg'alar */
const LigaHome = () => {
  const { i18n } = useTranslation()
  const router = useRouter()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const text = TEXT[lang]
  const [busy, setBusy] = useState(false)
  const [showAll, setShowAll] = useState(false)
  // Ligaga qo'shilish oynasi: sinf tanlash + qoidalarga rozilik
  const [joinOpen, setJoinOpen] = useState(false)

  const { data: response, isLoading, refetch } = useGetQuery({
    key: 'liga-current',
    url: URLS.ligaCurrent,
    staleTime: 0,
    refetchOnMount: 'always'
  })
  const { data: historyResponse } = useGetQuery({ key: 'liga-winners', url: URLS.ligaWinners })

  const data = response?.data
  const season = data?.season
  const past = (historyResponse?.data || []).filter((item) => item.id !== season?.id).slice(0, 1)[0]
  const pastWinners = (past?.winners || []).filter((winner) => winner.grade === data?.grade)

  const openAttempt = (id) => router.push(`/dashboard/student/liga/test/${id}`)

  const run = async (action) => {
    setBusy(true)
    try {
      await action()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Xatolik')
      refetch()
    } finally {
      setBusy(false)
    }
  }

  // Sinflar: liga javobida `grades` bo'lmasa (eski backend) — umumiy sinflar ro'yxatidan
  const [fallbackGrades, setFallbackGrades] = useState([])
  const openJoin = async () => {
    if (!data?.grades?.length && !fallbackGrades.length) {
      try {
        const { data: list } = await request.get('/api/v1/auth/class/class_name_listview/')
        const order = (item) => parseInt(String(item.name).match(/\d+/)?.[0] || '999', 10)
        setFallbackGrades([...(list || [])].sort((a, b) => order(a) - order(b)))
      } catch {}
    }
    setJoinOpen(true)
  }

  const join = (grade) =>
    run(async () => {
      await request.post(`/api/v1/liga/seasons/${season.id}/join/`, { grade, accept_rules: true })
      setJoinOpen(false)
      await refetch()
    })

  const start = (testId) =>
    run(async () => {
      const { data: attempt } = await request.post(`/api/v1/liga/tests/${testId}/start/`)
      openAttempt(attempt.id)
    })

  if (isLoading) return <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />

  if (!season) return <LigaSeasonEmpty title={text.emptyTitle} text={text.empty} />

  const closed = season.is_closed
  const prizes = [1, 2, 3].map((place) => ({ place, name: season[`prize_${place}_${lang}`], key: season[`prize_${place}_uz`] }))
  const top = data?.top || []
  const shownTop = showAll ? top : top.slice(0, TOP_SHOWN)
  const subtitle = [text.season(season.number), data?.grade ? text.grade(data.grade) : null, closed ? text.closed : null]
    .filter(Boolean)
    .join(' • ')

  const stats = [
    [CalendarDays, 'text-[#1F7AEC]', text.seasonLabel, text.season(season.number)],
    [Users, 'text-[#1F7AEC]', text.gradeLabel, data?.grade ? text.grade(data.grade) : '—'],
    [Trophy, 'text-[#F59E0B]', text.rank, data?.joined && data.rank ? `#${data.rank}` : '—'],
    [BarChart3, 'text-[#16A34A]', text.points, data?.joined ? data.points : '—']
  ]

  return (
    <LigaGuard viewer={data?.viewer} notice={text.notice}>
      <div className="flex flex-col gap-4">
        <LigaHero {...HERO} title={text.title} subtitle={subtitle} fadeRight />

        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="flex min-w-0 flex-col gap-4">
            <div className={`${CARD} grid grid-cols-2 gap-y-4 p-4 sm:p-5 xl:grid-cols-4 xl:divide-x xl:divide-[#EDF1F8]`}>
              {stats.map(([Icon, color, label, value]) => (
                <div key={label} className="flex min-w-0 items-center gap-3 xl:px-5 xl:first:pl-1">
                  <Icon size={28} className={`shrink-0 ${color}`} />
                  <div className="min-w-0">
                    <p className="truncate text-xs text-[#64748B]">{label}</p>
                    <p className="truncate text-lg font-bold text-[#191C1D]">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {!data?.joined && !closed ? (
              <div className={`${CARD} flex flex-wrap items-center justify-between gap-4 p-5`}>
                <div className="min-w-0 sm:max-w-[70%]">
                  <p className="text-base font-bold text-[#191C1D]">{text.joinTitle}</p>
                  <p className="mt-1 text-sm text-[#64748B]">{data?.subscription_active ? text.joinText : text.needPay}</p>
                </div>
                {data?.subscription_active ? (
                  <button disabled={busy} onClick={openJoin} className={PRIMARY}>
                    {text.join}
                  </button>
                ) : (
                  <Link href="/prices" className={PRIMARY}>
                    {text.pay}
                  </Link>
                )}
              </div>
            ) : null}

            <section className={`${CARD} p-4 sm:p-5`}>
              <CardHead Icon={CalendarCheck} title={text.tests} text={text.testsText} />
              <div className="mt-4 flex flex-col gap-3">
                {data?.tests?.length ? (
                  data.tests.map((test) => (
                    <TestRow
                      key={test.id}
                      test={test}
                      joined={data.joined}
                      text={text}
                      lang={lang}
                      busy={busy}
                      onStart={start}
                      onOpen={openAttempt}
                      onRefresh={refetch}
                    />
                  ))
                ) : (
                  <p className="rounded-2xl bg-[#F7FAFE] py-8 text-center text-sm text-[#64748B]">{text.noTests}</p>
                )}
              </div>
            </section>
          </div>

          <div className="flex min-w-0 flex-col gap-4">
            <section className={`${CARD} p-5`}>
              <CardHead Icon={BarChart3} title={closed ? text.winners : text.top}>
                {!closed && top.length > TOP_SHOWN ? (
                  <button onClick={() => setShowAll(!showAll)} className="inline-flex items-center gap-1 text-sm font-semibold text-[#1F7AEC]">
                    {showAll ? text.less : text.all}
                    <ArrowRight size={16} className={showAll ? '-rotate-90' : ''} />
                  </button>
                ) : null}
              </CardHead>
              <div className="mt-4 flex flex-col gap-2">
                {closed
                  ? (data?.winners || []).map((winner) => (
                      <div key={winner.place} className="flex items-center gap-3 rounded-2xl bg-[#F7FAFE] px-3 py-2.5 text-sm">
                        <Medal place={winner.place} />
                        <span className={`min-w-0 flex-1 truncate font-semibold ${winner.is_disqualified ? 'text-[#94A3B8] line-through' : 'text-[#191C1D]'}`}>
                          {winner.full_name}
                        </span>
                        <span className="shrink-0 text-[#64748B]">{winner.is_disqualified ? text.disqualified : winner[`prize_${lang}`]}</span>
                      </div>
                    ))
                  : shownTop.map((row) => (
                      <div key={`${row.rank}-${row.full_name}`} className="flex items-center gap-3 rounded-2xl bg-[#F7FAFE] px-3 py-2.5">
                        <Medal place={row.rank} />
                        <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-[#191C1D]">{row.full_name}</span>
                        <span className="shrink-0 rounded-full bg-[#EAF3FF] px-3 py-1 text-sm font-bold text-[#1F7AEC]">{text.ball(row.points)}</span>
                      </div>
                    ))}
                {!closed && !top.length ? <p className="py-4 text-center text-sm text-[#64748B]">{text.noTop}</p> : null}
              </div>
            </section>

            <section className={`${CARD} p-5`}>
              <CardHead Icon={Gift} title={text.prizes} text={text.prizesText} />
              <div className="mt-4 flex flex-col gap-2">
                {prizes.map((prize) => (
                  <div key={prize.place} className="grid grid-cols-[auto_1fr_40px_auto] items-center gap-3 rounded-2xl bg-[#F7FAFE] px-3 py-2">
                    <Medal place={prize.place} />
                    <span className="text-sm font-semibold text-[#191C1D]">{text.place(prize.place)}</span>
                    <PrizeImage name={prize.key} />
                    <span className="max-w-[120px] truncate text-right text-sm font-bold text-[#191C1D]">{prize.name}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#64748B]">{text.prizeNote}</p>
            </section>

            {pastWinners.length ? (
              <section className={`${CARD} p-5`}>
                <CardHead Icon={Trophy} title={text.pastWinners} text={text.season(past.number)} />
                <div className="mt-4 flex flex-col gap-2">
                  {pastWinners.map((winner) => (
                    <div key={winner.place} className="flex items-center gap-3 rounded-2xl bg-[#F7FAFE] px-3 py-2.5">
                      <Medal place={winner.place} />
                      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-[#191C1D]">{winner.full_name}</span>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>

      <LigaJoinModal
        open={joinOpen}
        lang={lang}
        grades={data?.grades?.length ? data.grades : fallbackGrades}
        initialGrade={data?.profile_grade_id}
        busy={busy}
        onConfirm={join}
        onClose={() => setJoinOpen(false)}
      />
    </LigaGuard>
  )
}

export default LigaHome
