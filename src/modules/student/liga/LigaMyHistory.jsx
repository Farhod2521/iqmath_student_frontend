import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Award, BarChart3, BookOpen, CalendarCheck, ChevronLeft, ChevronRight, ClipboardList, Clock, History, LogIn, Trophy } from 'lucide-react'
import { useGetQuery } from '@/hooks'
import { LigaHero } from '@/modules/teacher/liga/LigaParts'
import LigaGuard from './LigaGuard'
import { CARD, CardHead, Empty, HERO, Medal, StatTiles, formatDate, formatDuration } from './LigaStudentParts'

const TEXT = {
  uz: {
    title: 'Mening liga tarixim',
    subtitle: 'Har mavsumda to‘plagan ballaringiz, o‘rningiz, testlaringiz va yutuqlaringiz',
    totalPoints: 'Jami to‘plangan ball',
    seasons: 'Qatnashgan mavsumlar',
    tests: 'Ishlangan testlar',
    wins: 'Sovrinli o‘rinlar',
    bySeason: 'Mavsumlar bo‘yicha',
    bySeasonText: 'Har mavsumda qancha ball to‘plaganingiz va qaysi o‘rinni egallaganingiz',
    noSeasons: 'Siz hali ligada qatnashmagansiz',
    season: (n) => `${n}-mavsum`,
    grade: (n) => `${n}-sinf`,
    closed: 'Tugagan',
    live: 'Davom etmoqda',
    rank: (rank, total) => `${rank}-o‘rin / ${total}`,
    ball: (n) => `${n} ball`,
    sources: { daily: 'Kunlik kirish', subject: 'Fanlarni ishlash', test: 'Haftalik testlar' },
    win: (place) => `${place}-o‘rin g‘olibi`,
    disqualified: 'Sovg‘adan mahrum qilingan',
    myTests: 'Testlarim',
    noTests: 'Bu mavsumda test ishlanmagan',
    week: (n) => `${n}-hafta`,
    correct: (c, t) => `${c}/${t} to‘g‘ri`,
    points: 'Ball tarixi',
    pointsText: 'Liga ballari qayerdan va qachon kelgani',
    all: 'Barchasi',
    allSeasons: 'Barcha mavsumlar',
    noPoints: 'Ball tarixi yo‘q',
    date: 'Sana',
    source: 'Manba',
    seasonCol: 'Mavsum',
    amount: 'Ball',
    prev: 'Oldingi',
    next: 'Keyingi',
    notice: 'Skrinshot olish mumkin emas'
  },
  ru: {
    title: 'Моя история в лиге',
    subtitle: 'Ваши баллы, места, тесты и награды в каждом сезоне',
    totalPoints: 'Всего баллов',
    seasons: 'Сезонов',
    tests: 'Пройдено тестов',
    wins: 'Призовых мест',
    bySeason: 'По сезонам',
    bySeasonText: 'Сколько баллов вы набрали и какое место заняли в каждом сезоне',
    noSeasons: 'Вы ещё не участвовали в лиге',
    season: (n) => `Сезон ${n}`,
    grade: (n) => `${n} класс`,
    closed: 'Завершён',
    live: 'Идёт',
    rank: (rank, total) => `${rank} место / ${total}`,
    ball: (n) => `${n} балл.`,
    sources: { daily: 'Ежедневный вход', subject: 'Задания по предметам', test: 'Еженедельные тесты' },
    win: (place) => `Победитель, ${place} место`,
    disqualified: 'Лишён приза',
    myTests: 'Мои тесты',
    noTests: 'В этом сезоне тестов не пройдено',
    week: (n) => `Неделя ${n}`,
    correct: (c, t) => `${c}/${t} верно`,
    points: 'История баллов',
    pointsText: 'Откуда и когда пришли баллы лиги',
    all: 'Все',
    allSeasons: 'Все сезоны',
    noPoints: 'Истории баллов нет',
    date: 'Дата',
    source: 'Источник',
    seasonCol: 'Сезон',
    amount: 'Баллы',
    prev: 'Назад',
    next: 'Далее',
    notice: 'Скриншоты запрещены'
  }
}

const SOURCE_ICONS = { daily: LogIn, subject: BookOpen, test: ClipboardList }
const PAGE_SIZE = 10

const SeasonCard = ({ item, text, lang, onOpen }) => {
  const total = item.points || 1
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E3EAF6] bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF4DB] text-[#F59E0B]">
          <Trophy size={24} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-[#191C1D]">
            {text.season(item.number)} · {text.grade(item.grade)}
          </p>
          <p className="text-xs text-[#64748B]">{item.is_closed ? text.closed : text.live}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-extrabold text-[#1F7AEC]">{text.ball(item.points)}</p>
          {item.rank ? <p className="text-xs font-semibold text-[#64748B]">{text.rank(item.rank, item.participants_count)}</p> : null}
        </div>
      </div>

      {item.win ? (
        <div
          className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 ${
            item.win.is_disqualified ? 'bg-[#FEF2F2] text-[#B91C1C]' : 'bg-gradient-to-r from-[#FFF7E6] to-[#FFEFD1] text-[#9A5B00]'
          }`}
        >
          <Medal place={item.win.place} />
          <span className="min-w-0 flex-1 text-sm font-bold">
            {item.win.is_disqualified ? text.disqualified : text.win(item.win.place)}
          </span>
          {!item.win.is_disqualified ? <span className="text-sm font-semibold">{item.win[`prize_${lang}`]}</span> : null}
        </div>
      ) : null}

      <div className="grid gap-2 sm:grid-cols-3">
        {Object.entries(text.sources).map(([key, label]) => {
          const Icon = SOURCE_ICONS[key]
          const value = item.sources?.[key] || 0
          return (
            <div key={key} className="rounded-2xl bg-[#F7FAFE] px-3 py-2.5">
              <div className="flex items-center gap-2 text-xs text-[#64748B]">
                <Icon size={15} className="text-[#1F7AEC]" />
                {label}
              </div>
              <p className="mt-1 text-base font-bold text-[#191C1D]">{value}</p>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#E3EAF6]">
                <div className="h-full rounded-full bg-[#1F7AEC]" style={{ width: `${Math.round((value / total) * 100)}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      <div>
        <p className="mb-2 text-sm font-bold text-[#191C1D]">{text.myTests}</p>
        {item.tests.length ? (
          <div className="flex flex-col gap-1.5">
            {item.tests.map((test) => (
              <button
                key={test.attempt_id}
                onClick={() => onOpen(test.attempt_id)}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl bg-[#F7FAFE] px-3 py-2 text-left text-sm transition hover:bg-[#EEF4FD]"
              >
                <span className="min-w-[72px] font-semibold text-[#191C1D]">{text.week(test.week_number)}</span>
                <span className="text-[#64748B]">{formatDate(test.finished_at, lang)}</span>
                <span className="inline-flex items-center gap-1 text-[#64748B]">
                  <Clock size={13} />
                  {formatDuration(test.duration_seconds)}
                </span>
                <span className="text-[#64748B]">{text.correct(test.correct_count, test.total_questions)}</span>
                <span className="ml-auto rounded-full bg-[#EAF3FF] px-2.5 py-0.5 text-xs font-bold text-[#1F7AEC]">
                  {test.score}/{test.max_score}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-[#F7FAFE] py-3 text-center text-sm text-[#64748B]">{text.noTests}</p>
        )}
      </div>
    </div>
  )
}

const PointsLog = ({ text, lang, seasons }) => {
  const [page, setPage] = useState(1)
  const [season, setSeason] = useState('')
  const [source, setSource] = useState('')
  const params = { page, page_size: PAGE_SIZE, ...(season ? { season } : {}), ...(source ? { source } : {}) }
  const { data: response, isFetching } = useGetQuery({ key: 'liga-my-points', url: '/api/v1/liga/my-points/', params, staleTime: 0 })
  const rows = response?.data?.results || []
  const count = response?.data?.count || 0
  const pages = Math.max(1, Math.ceil(count / PAGE_SIZE))

  const pick = (setter) => (value) => {
    setter(value)
    setPage(1)
  }
  const tab = (active) =>
    `h-9 shrink-0 rounded-xl px-3 text-sm font-semibold transition ${
      active ? 'bg-[#1F7AEC] text-white' : 'bg-[#F7FAFE] text-[#475569] hover:bg-[#EEF3FA]'
    }`

  return (
    <section className={`${CARD} p-4 sm:p-5`}>
      <CardHead Icon={History} title={text.points} text={text.pointsText}>
        <select
          value={season}
          onChange={(event) => pick(setSeason)(event.target.value)}
          className="h-9 rounded-xl border border-[#E3EAF6] bg-white px-3 text-sm text-[#191C1D]"
        >
          <option value="">{text.allSeasons}</option>
          {seasons.map((item) => (
            <option key={item.season_id} value={item.season_id}>
              {text.season(item.number)}
            </option>
          ))}
        </select>
      </CardHead>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        <button className={tab(!source)} onClick={() => pick(setSource)('')}>
          {text.all}
        </button>
        {Object.entries(text.sources).map(([key, label]) => (
          <button key={key} className={tab(source === key)} onClick={() => pick(setSource)(key)}>
            {label}
          </button>
        ))}
      </div>

      <div className={`mt-3 overflow-x-auto ${isFetching ? 'opacity-70' : ''}`}>
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="text-left text-xs text-[#64748B]">
              <th className="px-3 py-2 font-semibold">{text.date}</th>
              <th className="px-3 py-2 font-semibold">{text.source}</th>
              <th className="px-3 py-2 font-semibold">{text.seasonCol}</th>
              <th className="px-3 py-2 text-right font-semibold">{text.amount}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const Icon = SOURCE_ICONS[row.source] || BarChart3
              return (
                <tr key={row.id} className="border-t border-[#EEF2F8]">
                  <td className="whitespace-nowrap px-3 py-2.5 text-[#475569]">{formatDate(row.created_at, lang)}</td>
                  <td className="px-3 py-2.5">
                    <span className="inline-flex items-center gap-2 font-medium text-[#191C1D]">
                      <Icon size={16} className="text-[#1F7AEC]" />
                      {text.sources[row.source] || row.source}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-[#475569]">{text.season(row.season)}</td>
                  <td className="px-3 py-2.5 text-right font-bold text-[#16A34A]">+{row.points}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {!rows.length && !isFetching ? <Empty>{text.noPoints}</Empty> : null}
      </div>

      {pages > 1 ? (
        <div className="mt-3 flex items-center justify-end gap-2 text-sm">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="inline-flex h-9 items-center gap-1 rounded-xl bg-[#F7FAFE] px-3 font-semibold text-[#475569] disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            {text.prev}
          </button>
          <span className="px-2 text-[#64748B]">
            {page} / {pages}
          </span>
          <button
            disabled={page >= pages}
            onClick={() => setPage(page + 1)}
            className="inline-flex h-9 items-center gap-1 rounded-xl bg-[#F7FAFE] px-3 font-semibold text-[#475569] disabled:opacity-40"
          >
            {text.next}
            <ChevronRight size={16} />
          </button>
        </div>
      ) : null}
    </section>
  )
}

/** O'quvchining shaxsiy liga tarixi */
const LigaMyHistory = () => {
  const { i18n } = useTranslation()
  const router = useRouter()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const text = TEXT[lang]

  const { data: response, isLoading } = useGetQuery({
    key: 'liga-my-history',
    url: '/api/v1/liga/my-history/',
    staleTime: 0,
    refetchOnMount: 'always'
  })
  const data = response?.data
  const summary = data?.summary || {}
  const seasons = data?.seasons || []

  if (isLoading) return <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />

  const stats = [
    [BarChart3, 'text-[#16A34A]', text.totalPoints, summary.total_points ?? 0],
    [CalendarCheck, 'text-[#1F7AEC]', text.seasons, summary.seasons ?? 0],
    [ClipboardList, 'text-[#1F7AEC]', text.tests, summary.tests ?? 0],
    [Award, 'text-[#F59E0B]', text.wins, summary.wins ?? 0]
  ]

  return (
    <LigaGuard viewer={data?.viewer} notice={text.notice}>
      <div className="flex flex-col gap-4">
        <LigaHero {...HERO} title={text.title} subtitle={text.subtitle} fadeRight />
        <StatTiles items={stats} />

        <section className={`${CARD} p-4 sm:p-5`}>
          <CardHead Icon={Trophy} title={text.bySeason} text={text.bySeasonText} />
          <div className="mt-4 flex flex-col gap-3">
            {seasons.length ? (
              seasons.map((item) => (
                <SeasonCard
                  key={item.season_id}
                  item={item}
                  text={text}
                  lang={lang}
                  onOpen={(id) => router.push(`/dashboard/student/liga/test/${id}`)}
                />
              ))
            ) : (
              <Empty>{text.noSeasons}</Empty>
            )}
          </div>
        </section>

        {seasons.length ? <PointsLog text={text} lang={lang} seasons={seasons} /> : null}
      </div>
    </LigaGuard>
  )
}

export default LigaMyHistory
