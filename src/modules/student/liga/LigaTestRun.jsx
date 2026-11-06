import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import {
  AlertTriangle, ArrowLeft, ArrowRight, BarChart3, Check, CheckCircle2, ChevronRight, Clock, FileText, Info, Layers, Target, Timer
} from 'lucide-react'
import toast from 'react-hot-toast'
import LigaDialog from '@/components/modal/LigaDialog'
import { request } from '@/services/api'
import LigaGuard from './LigaGuard'

// MathQuill faqat brauzerda ishlaydi
const MathAnswerField = dynamic(() => import('@/components/liga/MathAnswerField'), { ssr: false })

const MJ_CONFIG = { loader: { load: ['input/tex', 'output/chtml'] } }
const CARD = 'rounded-3xl border border-[#E6ECF7] bg-white shadow-[0_16px_36px_-28px_rgba(31,122,236,0.55)]'

const TEXT = {
  uz: {
    week: (n) => `${n}-hafta testi`,
    question: (i, total) => `${i} / ${total}`,
    answerPlaceholder: 'Javobingizni kiriting',
    prev: 'Oldingi savol',
    next: 'Keyingi savol',
    liga: 'Liga',
    grade: (name) => `${name}-sinf`,
    count: (n) => `${n} ta savol`,
    questionTitle: (n) => `${n}-savol`,
    questionsTitle: (n) => `Savollar (${n})`,
    remaining: 'Qolgan vaqt',
    answered: 'Javob berilgan',
    currentQuestion: 'Joriy savol',
    unanswered: 'Javob berilmagan',
    infoTitle: 'Test ma‘lumotlari',
    subject: 'Fan',
    questionCount: 'Savollar soni',
    allotted: 'Ajratilgan vaqt',
    maxScore: 'Maksimal ball',
    minutes: (n) => `${n} daqiqa`,
    points: (n) => `${n} ball`,
    rules: 'Test qoidalari',
    rulesOk: 'Tushunarli',
    rulesList: [
      'Har bir savolda bitta javob tanlanadi, javob darhol saqlanadi.',
      'Savollar orasida erkin o‘tishingiz va javobni o‘zgartirishingiz mumkin.',
      'Vaqt to‘xtatilmaydi. Vaqt tugasa test avtomatik yakunlanadi.',
      'Javob berilmagan savollar xato hisoblanadi.',
      'Sahifadan chiqsangiz test yakunlanadi va uni qayta ishlab bo‘lmaydi.',
      'Skrinshot olish va nusxalash taqiqlanadi.'
    ],
    finish: 'Yakunlash',
    finishConfirm: (left) =>
      left ? `${left} ta savolga javob berilmagan, ular xato hisoblanadi. Testni yakunlaysizmi?` : 'Testni yakunlaysizmi?',
    leave: 'Sahifani tark etsangiz test avtomatik tugatiladi va siz bu testni qayta ishlay olmaysiz!',
    leaveTitle: 'Testdan chiqmoqchimisiz?',
    leaveConfirm: 'Chiqish',
    stay: 'Testda qolish',
    finishTitle: 'Testni yakunlash',
    resultTitle: 'Test yakunlandi',
    expired: 'Vaqt tugadi. Belgilangan javoblar hisobga olindi, qolganlari xato deb hisoblandi.',
    score: 'Ball',
    correct: 'To‘g‘ri',
    wrong: 'Xato',
    time: 'Vaqt',
    back: 'Liga sahifasiga qaytish',
    notice: 'Skrinshot olish mumkin emas',
    saveError: 'Javob saqlanmadi, internetni tekshiring'
  },
  ru: {
    week: (n) => `Тест недели ${n}`,
    question: (i, total) => `${i} / ${total}`,
    answerPlaceholder: 'Введите ответ',
    prev: 'Предыдущий вопрос',
    next: 'Следующий вопрос',
    liga: 'Лига',
    grade: (name) => `${name} класс`,
    count: (n) => `${n} вопросов`,
    questionTitle: (n) => `Вопрос ${n}`,
    questionsTitle: (n) => `Вопросы (${n})`,
    remaining: 'Осталось времени',
    answered: 'Есть ответ',
    currentQuestion: 'Текущий вопрос',
    unanswered: 'Нет ответа',
    infoTitle: 'Информация о тесте',
    subject: 'Предмет',
    questionCount: 'Количество вопросов',
    allotted: 'Выделенное время',
    maxScore: 'Максимальный балл',
    minutes: (n) => `${n} мин`,
    points: (n) => `${n} баллов`,
    rules: 'Правила теста',
    rulesOk: 'Понятно',
    rulesList: [
      'В каждом вопросе выбирается один ответ, он сохраняется сразу.',
      'Можно свободно переходить между вопросами и менять ответ.',
      'Время не останавливается. Когда оно закончится, тест завершится автоматически.',
      'Вопросы без ответа считаются неверными.',
      'Если вы покинете страницу, тест завершится и пройти его снова будет нельзя.',
      'Скриншоты и копирование запрещены.'
    ],
    finish: 'Завершить',
    finishConfirm: (left) =>
      left ? `На ${left} вопросов нет ответа, они будут считаться неверными. Завершить тест?` : 'Завершить тест?',
    leave: 'Если вы покинете страницу, тест автоматически завершится и вы не сможете пройти его снова!',
    leaveTitle: 'Выйти из теста?',
    leaveConfirm: 'Выйти',
    stay: 'Остаться',
    finishTitle: 'Завершение теста',
    resultTitle: 'Тест завершён',
    expired: 'Время вышло. Учтены отмеченные ответы, остальные считаются неверными.',
    score: 'Баллы',
    correct: 'Верно',
    wrong: 'Неверно',
    time: 'Время',
    back: 'Вернуться в лигу',
    notice: 'Скриншоты запрещены',
    saveError: 'Ответ не сохранён, проверьте интернет'
  }
}

const clock = (seconds) => {
  const total = Math.max(0, seconds || 0)
  const pad = (value) => String(value).padStart(2, '0')
  const hours = Math.floor(total / 3600)
  return `${hours ? `${pad(hours)}:` : ''}${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`
}

const RichText = ({ html }) => (
  <MathJax dynamic hideUntilTypeset="first">
    <div dangerouslySetInnerHTML={{ __html: html || '' }} />
  </MathJax>
)

const TimerCard = ({ remaining, label }) => (
  <div
    className={`flex items-center gap-4 rounded-3xl bg-gradient-to-r px-6 py-5 text-white shadow-[0_16px_30px_-20px_rgba(31,122,236,0.9)] ${
      remaining <= 60 ? 'from-[#F87171] to-[#DC2626]' : 'from-[#46B1F4] to-[#1F6FEB]'
    }`}
  >
    <Timer size={42} strokeWidth={1.75} className="shrink-0" />
    <div>
      <p className="text-sm text-white/90">{label}</p>
      <p className="text-[32px] font-bold leading-9 tabular-nums">{clock(remaining)}</p>
    </div>
  </div>
)

const Result = ({ attempt, text, onBack }) => (
  <div className="mx-auto max-w-md rounded-2xl border border-[#F0F0F0] bg-white p-6 text-center shadow-sm">
    <h1 className="text-xl font-bold text-[#191C1D]">{text.resultTitle}</h1>
    {attempt.status === 'expired' ? <p className="mt-2 text-sm text-[#8A8A8E]">{text.expired}</p> : null}
    <div className="mt-6 grid grid-cols-2 gap-4">
      {[
        [text.score, `${attempt.score} / ${attempt.max_score}`],
        [text.time, clock(attempt.duration_seconds)],
        [text.correct, attempt.correct_count],
        [text.wrong, attempt.wrong_count]
      ].map(([label, value]) => (
        <div key={label}>
          <p className="text-xs text-[#8A8A8E]">{label}</p>
          <p className="text-xl font-bold text-[#191C1D]">{value}</p>
        </div>
      ))}
    </div>
    <button onClick={onBack} className="mt-6 h-11 w-full rounded-xl bg-[#5D87FF] text-sm font-semibold text-white transition hover:bg-[#4570EA]">
      {text.back}
    </button>
  </div>
)

/** Test ishlash: vaqt serverdan olinadi, har javob darhol saqlanadi, sahifa yopilsa o'sha joyidan davom etadi */
const LigaTestRun = () => {
  const { i18n } = useTranslation()
  const router = useRouter()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const text = TEXT[lang]
  const { id } = router.query

  const [attempt, setAttempt] = useState(null)
  const [answers, setAnswers] = useState({})
  const [index, setIndex] = useState(0)
  const [remaining, setRemaining] = useState(0)
  const [finishOpen, setFinishOpen] = useState(false)
  const [rulesOpen, setRulesOpen] = useState(false)
  // Foydalanuvchi ketmoqchi bo'lgan manzil ('back' — brauzerning orqaga tugmasi)
  const [leaveTo, setLeaveTo] = useState(null)
  const endAt = useRef(0)
  // Test yakunlangach ogohlantirish chiqmasin
  const settled = useRef(false)

  const url = `/api/v1/liga/attempts/${id}/`
  const running = attempt?.status === 'in_progress'

  const load = useCallback(async () => {
    const { data } = await request.get(url)
    setAttempt(data)
    if (data.status !== 'in_progress') {
      settled.current = true
      return
    }
    endAt.current = Date.now() + data.remaining_seconds * 1000
    setRemaining(data.remaining_seconds)
    setAnswers(Object.fromEntries((data.answers || []).map((answer) => [answer.question, answer])))
  }, [url])

  useEffect(() => {
    if (id) load().catch(() => router.replace('/dashboard/student/liga'))
  }, [id, load, router])

  const finish = useCallback(async () => {
    settled.current = true
    const { data } = await request.post(`${url}finish/`)
    setAttempt(data)
  }, [url])

  // Orqaga sanash: tugasa test avtomatik yopiladi
  useEffect(() => {
    if (!running) return undefined
    const timer = setInterval(() => {
      const left = Math.ceil((endAt.current - Date.now()) / 1000)
      setRemaining(left)
      if (left <= 0) {
        clearInterval(timer)
        finish().catch(load)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [running, finish, load])

  // Sahifadan chiqish ogohlantirishi. Ichki o'tish tasdiqlansa test yakunlanadi.
  // Brauzer yopilsa yoki yangilansa, qaytganda o'sha joyidan davom etadi.
  useEffect(() => {
    if (!running) return undefined

    const onRouteChange = (nextUrl) => {
      if (settled.current || nextUrl === router.asPath) return
      setLeaveTo(nextUrl)
      router.events.emit('routeChangeError')
      throw 'liga-test-leave-cancelled'
    }
    const onBeforeUnload = (event) => {
      if (settled.current) return
      event.preventDefault()
      event.returnValue = text.leave
    }

    router.beforePopState(() => {
      if (settled.current) return true
      window.history.pushState(window.history.state, '', router.asPath)
      setLeaveTo('back')
      return false
    })
    router.events.on('routeChangeStart', onRouteChange)
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => {
      router.beforePopState(() => true)
      router.events.off('routeChangeStart', onRouteChange)
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [running, router, text.leave])

  const leave = async () => {
    await finish().catch(() => {})
    if (leaveTo === 'back') router.back()
    else router.push(leaveTo)
  }

  const save = async (questionId, body) => {
    setAnswers((prev) => ({ ...prev, [questionId]: { question: questionId, ...body } }))
    try {
      await request.post(`${url}answer/`, { question: questionId, ...body })
    } catch (error) {
      if (error?.response?.status === 400) load()
      else toast.error(text.saveError)
    }
  }

  const confirmFinish = async () => {
    await finish().catch(load)
    setFinishOpen(false)
  }

  if (!attempt) return <div className="h-64 animate-pulse rounded-2xl bg-gray-100" />

  if (!running) {
    return <Result attempt={attempt} text={text} onBack={() => router.push('/dashboard/student/liga')} />
  }

  const questions = attempt.questions
  const question = questions[index]
  const pick = (item, field) => (lang === 'ru' ? item[`${field}_ru`] || item[`${field}_uz`] : item[`${field}_uz`])
  const current = answers[question.id]

  const subjects = [...new Set(questions.map((item) => item.subject_name))].join(', ')
  const maxScore = questions.reduce((sum, item) => sum + item.score, 0)
  const minutes = Math.round((new Date(attempt.deadline_at) - new Date(attempt.started_at)) / 60000)
  const percent = Math.round(((index + 1) / questions.length) * 100)
  const isLast = index === questions.length - 1

  return (
    <LigaGuard viewer={attempt.viewer} notice={text.notice}>
      <MathJaxContext config={MJ_CONFIG}>
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-[#475569]">
            <Link href="/dashboard/student/liga" className="transition hover:text-[#1F7AEC]">
              {text.liga}
            </Link>
            {attempt.grade_name ? (
              <>
                <ChevronRight size={15} className="text-[#94A3B8]" />
                <span>{text.grade(attempt.grade_name)}</span>
              </>
            ) : null}
            <ChevronRight size={15} className="text-[#94A3B8]" />
            <span className="font-semibold text-[#191C1D]">{text.week(attempt.week_number)}</span>
          </nav>

          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
            <main className={`${CARD} min-w-0 p-4 sm:p-7`}>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#1F7AEC] sm:h-14 sm:w-14">
                  <FileText size={26} />
                </span>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl font-bold text-[#191C1D] sm:text-2xl">{text.week(attempt.week_number)}</h1>
                  <p className="mt-0.5 text-sm text-[#64748B]">
                    {subjects} • {text.count(questions.length)}
                  </p>
                </div>
                <button
                  onClick={() => setRulesOpen(true)}
                  className="inline-flex h-11 shrink-0 items-center gap-2 rounded-2xl border border-[#DFE6F2] bg-white px-4 text-sm font-semibold text-[#334155] transition hover:border-[#A9C8F5]"
                >
                  <Info size={18} />
                  {text.rules}
                </button>
              </div>

              <div className="mt-4 lg:hidden">
                <TimerCard remaining={remaining} label={text.remaining} />
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#EDF1F8] p-2.5 sm:gap-5">
                <span className="rounded-xl bg-[#F1F5FB] px-3.5 py-2 text-sm font-bold tabular-nums text-[#191C1D]">
                  {text.question(index + 1, questions.length)}
                </span>
                <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#E4ECF8]">
                  <span className="block h-full rounded-full bg-[#1F7AEC] transition-all" style={{ width: `${percent}%` }} />
                </span>
                <span className="pr-1 text-sm font-semibold tabular-nums text-[#475569]">{percent}%</span>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#EAF3FF] px-4 py-2 text-sm font-bold text-[#1F7AEC]">{text.questionTitle(index + 1)}</span>
                <span className="inline-flex min-w-0 items-center gap-2 rounded-full bg-[#F1F5FB] px-3.5 py-2 text-sm font-semibold text-[#334155]">
                  <Layers size={16} className="shrink-0" />
                  <span className="truncate">{question.subject_name}</span>
                </span>
              </div>

              <div className="mt-5 text-lg font-semibold leading-relaxed text-[#191C1D] sm:text-xl [&_mjx-container]:!text-[150%]">
                <RichText html={pick(question, 'question_text')} />
              </div>
              {question.image ? <img src={question.image} alt="" className="mt-4 max-h-72 rounded-2xl" /> : null}

              {question.question_type === 'choice' ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {question.choices.map((choice) => {
                    const active = current?.choice === choice.id
                    return (
                      <button
                        key={choice.id}
                        aria-pressed={active}
                        onClick={() => save(question.id, { choice: choice.id })}
                        className={`flex min-h-[72px] min-w-0 items-center gap-4 rounded-2xl border p-3 text-left text-base font-semibold text-[#191C1D] transition sm:px-4 ${
                          active ? 'border-[#1F7AEC] bg-[#EAF3FF]' : 'border-[#DFE6F2] bg-white hover:border-[#A9C8F5]'
                        }`}
                      >
                        <span
                          className={`flex h-10 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold ${
                            active ? 'bg-[#1F7AEC] text-white' : 'bg-[#EAF3FF] text-[#1F7AEC]'
                          }`}
                        >
                          {choice.letter}
                        </span>
                        <span className="min-w-0 [&_mjx-container]:!text-[130%]">
                          <RichText html={pick(choice, 'text')} />
                          {choice.image ? <img src={choice.image} alt="" className="mt-1 max-h-40 rounded-lg" /> : null}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <MathAnswerField
                  key={question.id}
                  value={current?.text_answer || ''}
                  label={text.answerPlaceholder}
                  onSave={(value) => save(question.id, { text_answer: value })}
                />
              )}

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  disabled={index === 0}
                  onClick={() => setIndex(index - 1)}
                  className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[#EEF2F8] px-4 text-sm font-semibold text-[#334155] transition hover:bg-[#E3E9F3] disabled:opacity-50 sm:px-6 sm:text-base"
                >
                  <ArrowLeft size={18} />
                  {text.prev}
                </button>
                {isLast ? (
                  <button onClick={() => setFinishOpen(true)} className="h-12 rounded-2xl bg-[#13A97F] px-6 text-sm font-semibold text-white transition hover:brightness-110 sm:text-base">
                    {text.finish}
                  </button>
                ) : (
                  <button
                    onClick={() => setIndex(index + 1)}
                    className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[#1F7AEC] px-4 text-sm font-semibold text-white transition hover:bg-[#1767CC] sm:px-6 sm:text-base"
                  >
                    {text.next}
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </main>

            <aside className="flex min-w-0 flex-col gap-4">
              <div className="hidden lg:block">
                <TimerCard remaining={remaining} label={text.remaining} />
              </div>

              <section className={`${CARD} p-5`}>
                <h2 className="text-lg font-bold text-[#191C1D]">{text.questionsTitle(questions.length)}</h2>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#475569]">
                  {[
                    ['bg-[#22C55E]', text.answered],
                    ['bg-[#1F7AEC]', text.currentQuestion],
                    ['bg-[#CBD9EE]', text.unanswered]
                  ].map(([color, label]) => (
                    <span key={label} className="inline-flex items-center gap-1.5">
                      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                      {label}
                    </span>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {questions.map((item, i) => {
                    const answered = Boolean(answers[item.id])
                    return (
                      <button
                        key={item.id}
                        onClick={() => setIndex(i)}
                        aria-current={i === index}
                        className={`relative h-10 rounded-xl text-sm font-semibold transition ${
                          i === index
                            ? 'bg-[#1F7AEC] text-white'
                            : answered
                              ? 'bg-[#DFF7EA] text-[#15803D]'
                              : 'bg-[#EEF3FA] text-[#334155] hover:bg-[#E2EAF6]'
                        }`}
                      >
                        {i + 1}
                        {answered && i !== index ? <Check size={12} strokeWidth={3} className="absolute right-1 top-1 text-[#16A34A]" /> : null}
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() => setFinishOpen(true)}
                  className="mt-4 h-11 w-full rounded-2xl bg-[#E6F8F2] text-sm font-semibold text-[#0F8A68] transition hover:bg-[#D5F3E9]"
                >
                  {text.finish}
                </button>
              </section>

              <section className={`${CARD} p-5`}>
                <h2 className="flex items-center gap-3 border-b border-[#EDF1F8] pb-3 text-base font-bold text-[#191C1D]">
                  <FileText size={20} className="text-[#1F7AEC]" />
                  {text.infoTitle}
                </h2>
                <dl className="mt-3 flex flex-col gap-3 text-sm">
                  {[
                    [Layers, text.subject, subjects],
                    [BarChart3, text.questionCount, text.count(questions.length)],
                    [Clock, text.allotted, text.minutes(minutes)],
                    [Target, text.maxScore, text.points(maxScore)]
                  ].map(([Icon, label, value]) => (
                    <div key={label} className="flex items-start gap-3">
                      <Icon size={18} className="mt-0.5 shrink-0 text-[#475569]" />
                      <dt className="text-[#475569]">{label}:</dt>
                      <dd className="min-w-0 font-semibold text-[#191C1D]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </aside>
          </div>
        </div>
      </MathJaxContext>

      <LigaDialog
        open={rulesOpen}
        Icon={Info}
        title={text.rules}
        confirmLabel={text.rulesOk}
        onConfirm={() => setRulesOpen(false)}
        onClose={() => setRulesOpen(false)}
      >
        <ul className="flex flex-col gap-2.5 text-sm leading-relaxed text-[#475569]">
          {text.rulesList.map((rule) => (
            <li key={rule} className="flex gap-2.5">
              <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-[#1F7AEC]" />
              {rule}
            </li>
          ))}
        </ul>
      </LigaDialog>
      <LigaDialog
        open={finishOpen}
        Icon={CheckCircle2}
        title={text.finishTitle}
        text={text.finishConfirm(questions.filter((item) => !answers[item.id]).length)}
        confirmLabel={text.finish}
        cancelLabel={text.stay}
        onConfirm={confirmFinish}
        onClose={() => setFinishOpen(false)}
      />
      <LigaDialog
        open={Boolean(leaveTo)}
        tone="danger"
        Icon={AlertTriangle}
        title={text.leaveTitle}
        text={text.leave}
        confirmLabel={text.leaveConfirm}
        cancelLabel={text.stay}
        onConfirm={leave}
        onClose={() => setLeaveTo(null)}
      />
    </LigaGuard>
  )
}

export default LigaTestRun
