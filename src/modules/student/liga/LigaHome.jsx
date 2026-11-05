import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Clock, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import LigaSeasonEmpty from '@/components/liga/LigaSeasonEmpty'
import { useGetQuery } from '@/hooks'
import { URLS } from '@/constants/url'
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
    points: 'Ballaringiz',
    rank: 'O‘rningiz',
    participants: 'Ishtirokchilar',
    prizes: 'Sovg‘alar',
    place: (n) => `${n}-o‘rin`,
    prizeNote: 'Har bir sinfdan 3 ta g‘olib. Sovg‘a topshirishda hujjatlar tekshiriladi: sinf noto‘g‘ri ko‘rsatilgan bo‘lsa, sovg‘a berilmaydi.',
    tests: 'Haftalik testlar',
    noTests: 'Testlar hali e’lon qilinmagan',
    week: (n) => `${n}-hafta`,
    minutes: (n) => `${n} daqiqa`,
    questions: (n) => `${n} ta savol`,
    start: 'Boshlash',
    resume: 'Davom ettirish',
    ended: 'Tugagan',
    missed: 'Ishlanmagan',
    result: (score, max) => `Natija: ${score} / ${max}`,
    joinFirst: 'Avval ligaga qo‘shiling',
    top: 'Sinf reytingi',
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
    points: 'Ваши баллы',
    rank: 'Ваше место',
    participants: 'Участники',
    prizes: 'Призы',
    place: (n) => `${n} место`,
    prizeNote: 'В каждом классе 3 победителя. При вручении приза проверяются документы: если класс указан неверно, приз не выдаётся.',
    tests: 'Еженедельные тесты',
    noTests: 'Тесты ещё не объявлены',
    week: (n) => `Неделя ${n}`,
    minutes: (n) => `${n} мин`,
    questions: (n) => `${n} вопросов`,
    start: 'Начать',
    resume: 'Продолжить',
    ended: 'Завершён',
    missed: 'Не пройден',
    result: (score, max) => `Результат: ${score} / ${max}`,
    joinFirst: 'Сначала вступите в лигу',
    top: 'Рейтинг класса',
    noTop: 'Результатов пока нет',
    winners: 'Победители',
    pastWinners: 'Победители прошлых сезонов',
    disqualified: 'Лишён приза',
    days: 'дн',
    notice: 'Скриншоты запрещены'
  }
}

const CARD = 'rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm sm:p-5'

const formatDate = (value, lang) =>
  new Date(value).toLocaleString(lang === 'ru' ? 'ru-RU' : 'uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })

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
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold tabular-nums text-[#5D87FF]">
      <Clock size={15} />
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
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#13A97F]">
        <CheckCircle2 size={16} />
        {text.result(attempt.score, attempt.max_score)}
      </span>
    )
  } else if (inProgress) {
    action = (
      <button onClick={() => onOpen(attempt.id)} className="h-10 rounded-xl bg-[#5D87FF] px-5 text-sm font-semibold text-white transition hover:bg-[#4570EA]">
        {text.resume}
      </button>
    )
  } else if (status === 'live') {
    action = joined ? (
      <button
        disabled={busy}
        onClick={() => onStart(test.id)}
        className="h-10 rounded-xl bg-[#5D87FF] px-5 text-sm font-semibold text-white transition hover:bg-[#4570EA] disabled:opacity-60"
      >
        {text.start}
      </button>
    ) : (
      <span className="inline-flex items-center gap-1.5 text-sm text-[#8A8A8E]">
        <Lock size={14} />
        {text.joinFirst}
      </span>
    )
  } else if (status === 'upcoming') {
    action = <Countdown to={test.start_at} daysLabel={text.days} onEnd={onRefresh} />
  } else {
    action = <span className="text-sm text-[#8A8A8E]">{text.missed}</span>
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-[#F4F4F5] py-3.5 last:border-0">
      <div className="min-w-0">
        <p className="text-[15px] font-semibold text-[#191C1D]">{text.week(test.week_number)}</p>
        <p className="mt-0.5 text-[13px] text-[#8A8A8E]">
          {formatDate(test.start_at, lang)} – {formatDate(test.end_at, lang)} · {text.minutes(test.duration_minutes)} ·{' '}
          {text.questions(test.question_count)}
        </p>
      </div>
      {action}
    </div>
  )
}

/** O'quvchining liga sahifasi: mavsum, sovg'alar, haftalik testlar va sinf reytingi */
const LigaHome = () => {
  const { i18n } = useTranslation()
  const router = useRouter()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const text = TEXT[lang]
  const [busy, setBusy] = useState(false)

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

  const join = () =>
    run(async () => {
      await request.post(`/api/v1/liga/seasons/${season.id}/join/`)
      await refetch()
    })

  const start = (testId) =>
    run(async () => {
      const { data: attempt } = await request.post(`/api/v1/liga/tests/${testId}/start/`)
      openAttempt(attempt.id)
    })

  if (isLoading) return <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />

  if (!season) return <LigaSeasonEmpty title={text.emptyTitle} text={text.empty} />

  const prizes = [1, 2, 3].map((place) => season[`prize_${place}_${lang}`])
  const closed = season.is_closed

  return (
    <LigaGuard viewer={data?.viewer} notice={text.notice}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[#191C1D]">{text.title}</h1>
            <p className="mt-0.5 text-sm text-[#8A8A8E]">
              {text.season(season.number)}
              {data?.grade ? ` · ${text.grade(data.grade)}` : ''}
              {closed ? ` · ${text.closed}` : ''}
            </p>
          </div>
          {data?.joined && !closed ? (
            <div className="flex gap-6">
              {[
                [text.points, data.points],
                [text.rank, data.rank ? `#${data.rank}` : '—'],
                [text.participants, data.participants_count]
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-[#8A8A8E]">{label}</p>
                  <p className="text-xl font-bold text-[#191C1D]">{value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {!data?.joined && !closed ? (
          <div className={`${CARD} flex flex-wrap items-center justify-between gap-3`}>
            <div className="min-w-0 sm:max-w-[70%]">
              <p className="text-[15px] font-semibold text-[#191C1D]">{text.joinTitle}</p>
              <p className="mt-1 text-sm text-[#8A8A8E]">{data?.subscription_active ? text.joinText : text.needPay}</p>
            </div>
            {data?.subscription_active ? (
              <button
                disabled={busy}
                onClick={join}
                className="h-11 rounded-xl bg-[#5D87FF] px-6 text-sm font-semibold text-white transition hover:bg-[#4570EA] disabled:opacity-60"
              >
                {text.join}
              </button>
            ) : (
              <Link href="/prices" className="flex h-11 items-center rounded-xl bg-[#5D87FF] px-6 text-sm font-semibold text-white transition hover:bg-[#4570EA]">
                {text.pay}
              </Link>
            )}
          </div>
        ) : null}

        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_340px]">
          <div className={CARD}>
            <h2 className="text-base font-bold text-[#191C1D]">{text.tests}</h2>
            <div className="mt-1">
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
                <p className="py-8 text-center text-sm text-[#8A8A8E]">{text.noTests}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className={CARD}>
              <h2 className="text-base font-bold text-[#191C1D]">{closed ? text.winners : text.top}</h2>
              <div className="mt-3 flex flex-col gap-2.5">
                {closed
                  ? (data?.winners || []).map((winner) => (
                      <div key={winner.place} className="flex items-center gap-3 text-sm">
                        <span className="w-5 font-bold text-[#5D87FF]">{winner.place}</span>
                        <span className={`flex-1 truncate ${winner.is_disqualified ? 'text-[#8A8A8E] line-through' : 'text-[#191C1D]'}`}>
                          {winner.full_name}
                        </span>
                        <span className="text-[#8A8A8E]">{winner.is_disqualified ? text.disqualified : winner[`prize_${lang}`]}</span>
                      </div>
                    ))
                  : (data?.top || []).map((row) => (
                      <div key={row.rank} className="flex items-center gap-3 text-sm">
                        <span className={`w-5 font-bold ${row.rank <= 3 ? 'text-[#5D87FF]' : 'text-[#8A8A8E]'}`}>{row.rank}</span>
                        <span className="flex-1 truncate text-[#191C1D]">{row.full_name}</span>
                        <span className="font-semibold text-[#191C1D]">{row.points}</span>
                      </div>
                    ))}
                {!closed && !data?.top?.length ? <p className="py-4 text-center text-sm text-[#8A8A8E]">{text.noTop}</p> : null}
              </div>
            </div>

            <div className={CARD}>
              <h2 className="text-base font-bold text-[#191C1D]">{text.prizes}</h2>
              <div className="mt-3 flex flex-col gap-2">
                {prizes.map((prize, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-[#8A8A8E]">{text.place(index + 1)}</span>
                    <span className="font-semibold text-[#191C1D]">{prize}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#8A8A8E]">{text.prizeNote}</p>
            </div>

            {pastWinners.length ? (
              <div className={CARD}>
                <h2 className="text-base font-bold text-[#191C1D]">{text.pastWinners}</h2>
                <p className="mt-0.5 text-xs text-[#8A8A8E]">{text.season(past.number)}</p>
                <div className="mt-3 flex flex-col gap-2">
                  {pastWinners.map((winner) => (
                    <div key={winner.place} className="flex items-center gap-3 text-sm">
                      <span className="w-5 font-bold text-[#5D87FF]">{winner.place}</span>
                      <span className="flex-1 truncate text-[#191C1D]">{winner.full_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </LigaGuard>
  )
}

export default LigaHome
