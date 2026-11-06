import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import LigaDialog from '@/components/modal/LigaDialog'
import { request } from '@/services/api'
import LigaGuard from './LigaGuard'

// MathQuill faqat brauzerda ishlaydi
const MathAnswerField = dynamic(() => import('@/components/liga/MathAnswerField'), { ssr: false })

const MJ_CONFIG = { loader: { load: ['input/tex', 'output/chtml'] } }

const TEXT = {
  uz: {
    week: (n) => `${n}-hafta testi`,
    question: (i, total) => `${i} / ${total}`,
    answerPlaceholder: 'Javobingizni kiriting',
    prev: 'Oldingi',
    next: 'Keyingi',
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
    prev: 'Назад',
    next: 'Далее',
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

  return (
    <LigaGuard viewer={attempt.viewer} notice={text.notice}>
      <MathJaxContext config={MJ_CONFIG}>
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#191C1D]">{text.week(attempt.week_number)}</p>
            <span
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-base font-bold tabular-nums ${
                remaining <= 60 ? 'bg-[#FEE2E2] text-[#DC2626]' : 'bg-[#EAF0FF] text-[#5D87FF]'
              }`}
            >
              <Clock size={16} />
              {clock(remaining)}
            </span>
          </div>

          <div className="rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between text-xs text-[#8A8A8E]">
              <span>{text.question(index + 1, questions.length)}</span>
              <span>{question.subject_name}</span>
            </div>
            <div className="mt-3 text-[16px] leading-relaxed text-[#191C1D]">
              <RichText html={pick(question, 'question_text')} />
            </div>
            {question.image ? <img src={question.image} alt="" className="mt-3 max-h-64 rounded-xl" /> : null}

            {question.question_type === 'choice' ? (
              <div className="mt-5 flex flex-col gap-2">
                {question.choices.map((choice) => {
                  const active = current?.choice === choice.id
                  return (
                    <button
                      key={choice.id}
                      onClick={() => save(question.id, { choice: choice.id })}
                      className={`flex items-center gap-3 rounded-xl border p-3 text-left text-[15px] transition ${
                        active ? 'border-[#5D87FF] bg-[#EAF0FF]' : 'border-[#EBEDF0] hover:border-[#C9D6F2]'
                      }`}
                    >
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${active ? 'bg-[#5D87FF] text-white' : 'bg-[#F1F4F9] text-[#475569]'}`}>
                        {choice.letter}
                      </span>
                      <span className="min-w-0">
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

            <div className="mt-6 flex items-center justify-between">
              <button
                disabled={index === 0}
                onClick={() => setIndex(index - 1)}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-[#475569] transition hover:bg-[#F1F4F9] disabled:opacity-40"
              >
                <ArrowLeft size={16} />
                {text.prev}
              </button>
              {index < questions.length - 1 ? (
                <button onClick={() => setIndex(index + 1)} className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#5D87FF] px-4 text-sm font-semibold text-white transition hover:bg-[#4570EA]">
                  {text.next}
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button onClick={() => setFinishOpen(true)} className="h-10 rounded-xl bg-[#13A97F] px-5 text-sm font-semibold text-white transition hover:brightness-110">
                  {text.finish}
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {questions.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                className={`h-8 w-8 rounded-lg text-xs font-semibold transition ${
                  i === index
                    ? 'bg-[#5D87FF] text-white'
                    : answers[item.id]
                      ? 'bg-[#EAF0FF] text-[#5D87FF]'
                      : 'bg-[#F1F4F9] text-[#8A8A8E] hover:bg-[#E6EBF5]'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => setFinishOpen(true)} className="ml-auto h-8 rounded-lg px-3 text-xs font-semibold text-[#13A97F] transition hover:bg-[#E6FFFA]">
              {text.finish}
            </button>
          </div>
        </div>
      </MathJaxContext>

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
