import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'

const TEXTS = {
  uz: {
    title: 'Bepul darsga yoziling',
    badge: 'BEPUL',
    subtitle: 'Menejer siz bilan bog‘lanib, mos darsni tanlaydi.',
    name: 'Ota-ona ismi',
    namePh: 'Ismingiz',
    phone: 'Telefon raqami',
    grade: 'Farzandingiz sinfi',
    gradePh: 'Sinfni tanlang',
    gradeItem: (n) => `${n}-sinf`,
    submit: 'Bepul darsni olish',
    consent: 'Ariza yuborish orqali ma’lumotlarni qayta ishlashga rozilik bildirasiz.',
    nameError: 'Ismingizni kiriting',
    phoneError: 'Telefon raqamni to‘liq kiriting',
    gradeError: 'Sinfni tanlang',
    successTitle: 'Arizangiz qabul qilindi!',
    successText: 'Menejerimiz tez orada siz bilan bog‘lanadi va bepul darsga yozib qo‘yadi.',
    again: 'Yana ariza yuborish',
    error: 'Yuborib bo‘lmadi. Qayta urinib ko‘ring.'
  },
  ru: {
    title: 'Запишитесь на бесплатный урок',
    badge: 'БЕСПЛАТНО',
    subtitle: 'Менеджер свяжется с вами и подберёт подходящий урок.',
    name: 'Имя родителя',
    namePh: 'Ваше имя',
    phone: 'Номер телефона',
    grade: 'Класс ребёнка',
    gradePh: 'Выберите класс',
    gradeItem: (n) => `${n} класс`,
    submit: 'Получить бесплатный урок',
    consent: 'Отправляя заявку, вы соглашаетесь на обработку данных.',
    nameError: 'Введите имя',
    phoneError: 'Введите полный номер телефона',
    gradeError: 'Выберите класс',
    successTitle: 'Заявка принята!',
    successText: 'Наш менеджер скоро свяжется с вами и запишет на бесплатный урок.',
    again: 'Отправить ещё одну заявку',
    error: 'Не удалось отправить. Попробуйте ещё раз.'
  }
}

// "901234567" -> "90 123 45 67"
const formatPhone = (digits) =>
  [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)].filter(Boolean).join(' ')

const inputClass =
  'h-[52px] w-full rounded-2xl border border-[#E2E8F0] bg-white px-4 text-[16px] text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#3B82F6] focus:ring-4 focus:ring-[#3B82F6]/10'

// Reklama kampaniyasini kuzatish uchun URL'dagi UTM parametrlari
const utmParams = () => {
  if (typeof window === 'undefined') return {}
  const q = new URLSearchParams(window.location.search)
  return Object.fromEntries(
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'fbclid'].map((key) => [key, q.get(key) || undefined])
  )
}

/** /math banneridagi "Bepul darsga yoziling" formasi → mentor panelidagi "Arizalar" va Telegram bot */
export default function FreeLessonForm({ source = 'math_hero' }) {
  const { i18n } = useTranslation()
  const text = TEXTS[i18n.language === 'ru' ? 'ru' : 'uz']

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [grade, setGrade] = useState('')
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [serverError, setServerError] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    const next = {}
    if (name.trim().length < 2) next.name = text.nameError
    if (phone.length !== 9) next.phone = text.phoneError
    if (!grade) next.grade = text.gradeError
    setErrors(next)
    if (Object.keys(next).length) return

    setSending(true)
    setServerError('')
    try {
      await request.post(URLS.freeLesson, {
        parent_name: name.trim(),
        phone: `998${phone}`,
        class_num: Number(grade),
        source,
        ...utmParams()
      })
      setDone(true)
    } catch (error) {
      setServerError(error?.response?.data?.detail || text.error)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="w-full rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8">
      {done ? (
        <div className="py-8 text-center">
          <CheckCircle2 size={56} className="mx-auto text-[#16A34A]" />
          <h3 className="mt-4 text-[24px] font-extrabold text-[#0F172A]">{text.successTitle}</h3>
          <p className="mx-auto mt-2 max-w-[320px] text-[15px] leading-relaxed text-[#475569]">{text.successText}</p>
          <button
            type="button"
            onClick={() => {
              setDone(false)
              setName('')
              setPhone('')
              setGrade('')
            }}
            className="mt-6 text-[14px] font-semibold text-[#2563EB] hover:underline"
          >
            {text.again}
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[26px] font-extrabold leading-tight tracking-tight text-[#0F172A] sm:text-[28px]">
              {text.title}
            </h3>
            <span className="mt-1 shrink-0 rounded-full bg-[#E8F8EF] px-3 py-1 text-[12px] font-bold text-[#16A34A]">
              {text.badge}
            </span>
          </div>
          <p className="mt-2 text-[15px] leading-relaxed text-[#64748B]">{text.subtitle}</p>

          <label className="mt-6 block">
            <span className="mb-2 block text-[14px] font-bold text-[#0F172A]">{text.name}</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={text.namePh}
              autoComplete="name"
              maxLength={150}
              className={`${inputClass} ${errors.name ? 'border-[#F87171]' : ''}`}
            />
            {errors.name ? <span className="mt-1 block text-[12px] text-[#DC2626]">{errors.name}</span> : null}
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-[14px] font-bold text-[#0F172A]">{text.phone}</span>
            <span
              className={`flex h-[52px] items-center gap-2 rounded-2xl border bg-white px-4 transition focus-within:border-[#3B82F6] focus-within:ring-4 focus-within:ring-[#3B82F6]/10 ${
                errors.phone ? 'border-[#F87171]' : 'border-[#E2E8F0]'
              }`}
            >
              <span className="text-[16px] font-semibold text-[#0F172A]">+998</span>
              <input
                value={formatPhone(phone)}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="90 123 45 67"
                className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
              />
            </span>
            {errors.phone ? <span className="mt-1 block text-[12px] text-[#DC2626]">{errors.phone}</span> : null}
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-[14px] font-bold text-[#0F172A]">{text.grade}</span>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className={`${inputClass} cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%2364748B%22 stroke-width=%222%22 viewBox=%220 0 24 24%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_16px_center] bg-no-repeat pr-11 ${
                grade ? '' : 'text-[#94A3B8]'
              } ${errors.grade ? 'border-[#F87171]' : ''}`}
            >
              <option value="">{text.gradePh}</option>
              {Array.from({ length: 11 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n} className="text-[#0F172A]">
                  {text.gradeItem(n)}
                </option>
              ))}
            </select>
            {errors.grade ? <span className="mt-1 block text-[12px] text-[#DC2626]">{errors.grade}</span> : null}
          </label>

          {serverError ? <p className="mt-3 text-[13px] font-medium text-[#DC2626]">{serverError}</p> : null}

          <button
            type="submit"
            disabled={sending}
            className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2F7BFF] to-[#2349E8] text-[17px] font-bold text-white shadow-[0_16px_30px_-14px_rgba(37,99,235,0.9)] transition hover:brightness-110 disabled:opacity-70"
          >
            {sending ? <Loader2 size={19} className="animate-spin" /> : null}
            {text.submit}
            {!sending ? <ArrowRight size={19} /> : null}
          </button>
          <p className="mt-3 text-center text-[12px] text-[#94A3B8]">{text.consent}</p>
        </form>
      )}
    </div>
  )
}
