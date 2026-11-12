import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { BarChart3, CalendarCheck, CalendarDays, Clock, Crown, Medal as MedalIcon, Trophy, Users } from 'lucide-react'
import LigaSeasonEmpty from '@/components/liga/LigaSeasonEmpty'
import { useGetQuery } from '@/hooks'
import { LigaHero } from '@/modules/teacher/liga/LigaParts'
import LigaGuard from './LigaGuard'
import { CARD, CardHead, Empty, HERO, Medal, StatTiles, formatDate, formatDuration } from './LigaStudentParts'

const TEXT = {
  uz: {
    title: 'Mavsumlar va g‘oliblar',
    subtitle: 'Tugagan mavsumlar, sinf g‘oliblari va har hafta testi g‘oliblari',
    emptyTitle: ['Hali', 'mavsum', 'yo‘q'],
    empty: 'Mavsumlar e’lon qilingach, bu yerda g‘oliblar va natijalar paydo bo‘ladi.',
    season: (n) => `${n}-mavsum`,
    grade: (n) => `${n}-sinf`,
    gradeLabel: 'Sinf',
    closed: 'Tugagan',
    live: 'Davom etmoqda',
    winners: 'Mavsum g‘oliblari',
    leaders: 'Hozirgi yetakchilar',
    leadersText: 'Mavsum tugagach g‘oliblar aniqlanadi',
    noWinners: 'Bu sinfda g‘oliblar yo‘q',
    weeks: 'Haftalik test g‘oliblari',
    weeksText: 'Har hafta testida eng yaxshi natija ko‘rsatganlar',
    week: (n) => `${n}-hafta`,
    noWeeks: 'Bu sinf uchun testlar yo‘q',
    notFinished: 'Test hali tugamagan',
    noAttempts: 'Hech kim ishlamagan',
    participants: (n) => `${n} ishtirokchi`,
    you: 'Siz',
    myPoints: 'Ballaringiz',
    myRank: 'O‘rningiz',
    participantsLabel: 'Ishtirokchilar',
    seasonLabel: 'Mavsum',
    ball: (n) => `${n} ball`,
    disqualified: 'Mahrum qilingan',
    notice: 'Skrinshot olish mumkin emas'
  },
  ru: {
    title: 'Сезоны и победители',
    subtitle: 'Завершённые сезоны, победители классов и победители еженедельных тестов',
    emptyTitle: ['Пока нет', 'сезонов', ''],
    empty: 'Когда сезоны будут объявлены, здесь появятся победители и результаты.',
    season: (n) => `Сезон ${n}`,
    grade: (n) => `${n} класс`,
    gradeLabel: 'Класс',
    closed: 'Завершён',
    live: 'Идёт',
    winners: 'Победители сезона',
    leaders: 'Текущие лидеры',
    leadersText: 'Победители определятся после окончания сезона',
    noWinners: 'В этом классе победителей нет',
    weeks: 'Победители недельных тестов',
    weeksText: 'Лучшие результаты каждого еженедельного теста',
    week: (n) => `Неделя ${n}`,
    noWeeks: 'Для этого класса тестов нет',
    notFinished: 'Тест ещё не завершён',
    noAttempts: 'Никто не прошёл',
    participants: (n) => `${n} участн.`,
    you: 'Вы',
    myPoints: 'Ваши баллы',
    myRank: 'Ваше место',
    participantsLabel: 'Участники',
    seasonLabel: 'Сезон',
    ball: (n) => `${n} балл.`,
    disqualified: 'Лишён приза',
    notice: 'Скриншоты запрещены'
  }
}

const WeekCard = ({ week, text, lang, onOpen }) => {
  const finished = week.status === 'finished'
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#E3EAF6] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-base font-bold text-[#191C1D]">{text.week(week.week_number)}</p>
          <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-[#64748B]">
            <CalendarDays size={14} />
            {formatDate(week.start_at, lang)} – {formatDate(week.end_at, lang)}
          </p>
        </div>
        {finished ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#F1F5FB] px-2.5 py-1 text-xs font-semibold text-[#64748B]">
            <Users size={13} />
            {text.participants(week.participants)}
          </span>
        ) : null}
      </div>

      {!finished ? (
        <p className="rounded-xl bg-[#F7FAFE] py-4 text-center text-sm text-[#64748B]">{text.notFinished}</p>
      ) : week.top.length ? (
        <div className="flex flex-col gap-1.5">
          {week.top.map((row, index) => (
            <div key={`${row.rank}-${index}`} className="flex items-center gap-2.5 rounded-xl bg-[#F7FAFE] px-2.5 py-2">
              <Medal place={row.rank} small />
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-[#191C1D]">{row.full_name}</span>
              <span className="inline-flex shrink-0 items-center gap-1 text-xs text-[#64748B]">
                <Clock size={12} />
                {formatDuration(row.duration_seconds)}
              </span>
              <span className="shrink-0 rounded-full bg-[#EAF3FF] px-2.5 py-0.5 text-xs font-bold text-[#1F7AEC]">
                {row.score}/{row.max_score}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-[#F7FAFE] py-4 text-center text-sm text-[#64748B]">{text.noAttempts}</p>
      )}

      {week.my ? (
        <button
          onClick={() => onOpen(week.my.attempt_id)}
          className="flex items-center justify-between gap-2 rounded-xl border border-dashed border-[#BFD7FB] px-3 py-2 text-sm transition hover:bg-[#F3F8FF]"
        >
          <span className="font-semibold text-[#1F7AEC]">
            {text.you}: #{week.my.rank}
          </span>
          <span className="font-bold text-[#191C1D]">
            {week.my.score}/{week.my.max_score}
          </span>
        </button>
      ) : null}
    </div>
  )
}

/** O'quvchi: tugagan va joriy mavsumlar, sinf g'oliblari va haftalik test g'oliblari */
const LigaSeasons = () => {
  const { i18n } = useTranslation()
  const router = useRouter()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const text = TEXT[lang]
  const [seasonId, setSeasonId] = useState(null)
  const [grade, setGrade] = useState(null)

  const { data: listResponse, isLoading } = useGetQuery({ key: 'liga-student-seasons', url: '/api/v1/liga/seasons/' })
  const list = listResponse?.data
  const seasons = list?.seasons || []

  useEffect(() => {
    if (!list) return
    // Avval tugagan oxirgi mavsum, bo'lmasa joriysi
    if (!seasonId && seasons.length) setSeasonId((seasons.find((item) => item.is_closed) || seasons[0]).id)
    if (!grade && list.grade_id) setGrade(list.grade_id)
  }, [list]) // eslint-disable-line react-hooks/exhaustive-deps

  const { data: resultResponse, isFetching } = useGetQuery({
    key: ['liga-student-season-results', seasonId, grade],
    url: `/api/v1/liga/seasons/${seasonId}/results/`,
    params: grade ? { grade } : {},
    enabled: Boolean(seasonId)
  })
  const result = resultResponse?.data

  if (isLoading) return <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />
  if (!seasons.length) return <LigaSeasonEmpty title={text.emptyTitle} text={text.empty} />

  const closed = result?.season?.is_closed
  const stats = [
    [CalendarDays, 'text-[#1F7AEC]', text.seasonLabel, result ? text.season(result.season.number) : '—'],
    [Users, 'text-[#1F7AEC]', text.participantsLabel, result?.participants_count ?? '—'],
    [Trophy, 'text-[#F59E0B]', text.myRank, result?.me?.rank ? `#${result.me.rank}` : '—'],
    [BarChart3, 'text-[#16A34A]', text.myPoints, result?.me ? result.me.points : '—']
  ]

  return (
    <LigaGuard viewer={result?.viewer} notice={text.notice}>
      <div className="flex flex-col gap-4">
        <LigaHero {...HERO} title={text.title} subtitle={text.subtitle} fadeRight />

        <div className={`${CARD} flex flex-col gap-4 p-4 sm:p-5`}>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {seasons.map((item) => {
              const active = item.id === seasonId
              return (
                <button
                  key={item.id}
                  onClick={() => setSeasonId(item.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2.5 text-left transition ${
                    active ? 'border-[#1F7AEC] bg-[#1F7AEC] text-white' : 'border-[#E3EAF6] bg-white text-[#191C1D] hover:border-[#BFD7FB]'
                  }`}
                >
                  <Crown size={18} className={active ? 'text-white' : 'text-[#F59E0B]'} />
                  <span>
                    <span className="block text-sm font-bold">{text.season(item.number)}</span>
                    <span className={`block text-xs ${active ? 'text-white/80' : 'text-[#64748B]'}`}>
                      {item.is_closed ? text.closed : text.live}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-[#64748B]">{text.gradeLabel}:</span>
            {(list?.grades || []).map((item) => (
              <button
                key={item.id}
                onClick={() => setGrade(item.id)}
                className={`h-9 min-w-[44px] rounded-xl px-3 text-sm font-semibold transition ${
                  item.id === grade ? 'bg-[#EAF3FF] text-[#1F7AEC] ring-1 ring-[#1F7AEC]' : 'bg-[#F7FAFE] text-[#475569] hover:bg-[#EEF3FA]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <StatTiles items={stats} />

        <div className={`grid items-start gap-4 lg:grid-cols-[380px_minmax(0,1fr)] ${isFetching ? 'opacity-70' : ''}`}>
          <section className={`${CARD} p-5`}>
            <CardHead
              Icon={closed ? Trophy : MedalIcon}
              title={closed ? text.winners : text.leaders}
              text={closed ? (result?.grade ? text.grade(result.grade) : null) : text.leadersText}
            />
            <div className="mt-4 flex flex-col gap-2">
              {(result?.winners || []).map((winner) => (
                <div key={winner.place} className="flex items-center gap-3 rounded-2xl bg-[#F7FAFE] px-3 py-2.5 text-sm">
                  <Medal place={winner.place} />
                  <div className="min-w-0 flex-1">
                    <p className={`truncate font-semibold ${winner.is_disqualified ? 'text-[#94A3B8] line-through' : 'text-[#191C1D]'}`}>
                      {winner.full_name}
                    </p>
                    <p className="text-xs text-[#64748B]">{text.ball(winner.points)}</p>
                  </div>
                  {closed ? (
                    <span className="shrink-0 text-xs font-semibold text-[#64748B]">
                      {winner.is_disqualified ? text.disqualified : winner[`prize_${lang}`]}
                    </span>
                  ) : null}
                </div>
              ))}
              {result && !result.winners.length ? <Empty>{text.noWinners}</Empty> : null}
            </div>
          </section>

          <section className={`${CARD} p-4 sm:p-5`}>
            <CardHead Icon={CalendarCheck} title={text.weeks} text={text.weeksText} />
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {(result?.weeks || []).map((week) => (
                <WeekCard
                  key={week.test_id}
                  week={week}
                  text={text}
                  lang={lang}
                  onOpen={(id) => router.push(`/dashboard/student/liga/test/${id}`)}
                />
              ))}
            </div>
            {result && !result.weeks.length ? (
              <div className="mt-4">
                <Empty>{text.noWeeks}</Empty>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </LigaGuard>
  )
}

export default LigaSeasons
