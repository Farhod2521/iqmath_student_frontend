import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import {
  Award, BarChart3, BookOpen, CalendarDays, Check, FlaskConical, GraduationCap, Loader2, Lock, NotebookText, Scale, Target,
  UserPlus, Users, X
} from 'lucide-react'

const TEXT = {
  uz: {
    title: 'Ligaga qo‘shilish',
    subtitle: 'Sinfingizni tanlang va liga qoidalari bilan tanishing.',
    chooseGrade: 'Sinfingizni tanlang',
    grade: (name) => `${name}-sinf`,
    bannerTitle: 'G‘oliblar sovg‘a bilan taqdirlanadi!',
    bannerText:
      'Sovg‘a olishda guvohnoma yoki pasport va maktabdan ma’lumotnoma tekshiriladi — tanlangan sinf hujjatdagi sinf bilan bir xil bo‘lishi shart.',
    rulesTitle: 'Asosiy qoidalar',
    rules: [
      [Target, 'Har kuni kirish, fanlarda yechilgan savollar va haftalik test uchun ball beriladi.'],
      [CalendarDays, 'Har bir haftalik test bir marta ishlanadi, vaqt tugasa avtomatik yakunlanadi.'],
      [BarChart3, 'Faqat o‘z sinfingiz testlarini ishlaysiz va o‘z sinfingiz reytingida qatnashasiz.'],
      [Award, 'Har bir sinfdan 3 ta g‘olib aniqlanadi. Mavsum yakunida ballar nolga tushadi.'],
      [Scale, 'Fair-play: skrinshot olish va javoblarni tarqatish taqiqlanadi.'],
      [Lock, 'Qo‘shilgach sinfni o‘zgartirib bo‘lmaydi. Sinf noto‘g‘ri bo‘lsa, sovg‘a berilmaydi.']
    ],
    accept: 'Sinfimni to‘g‘ri tanladim va qoidalarga roziman.',
    cancel: 'Bekor qilish',
    join: 'Qo‘shilish'
  },
  ru: {
    title: 'Вступление в лигу',
    subtitle: 'Выберите свой класс и ознакомьтесь с правилами лиги.',
    chooseGrade: 'Выберите класс',
    grade: (name) => `${name} класс`,
    bannerTitle: 'Победители награждаются призами!',
    bannerText:
      'При вручении приза проверяются свидетельство о рождении или паспорт и справка из школы — выбранный класс должен совпадать с классом в документах.',
    rulesTitle: 'Основные правила',
    rules: [
      [Target, 'Баллы начисляются за ежедневный вход, решённые задания и недельный тест.'],
      [CalendarDays, 'Каждый недельный тест проходится один раз, по истечении времени завершается автоматически.'],
      [BarChart3, 'Вы проходите тесты только своего класса и участвуете в рейтинге своего класса.'],
      [Award, 'В каждом классе 3 победителя. В конце сезона баллы обнуляются.'],
      [Scale, 'Fair-play: скриншоты и распространение ответов запрещены.'],
      [Lock, 'После вступления класс изменить нельзя. Если класс неверный, приз не выдаётся.']
    ],
    accept: 'Я правильно выбрал(а) класс и согласен(на) с правилами.',
    cancel: 'Отмена',
    join: 'Вступить'
  }
}

const isNumeric = (name) => /\d/.test(name || '')

// "Asosiy qoidalar" bloki hozircha ko'rsatilmaydi — qaytarish uchun true qiling
const SHOW_RULES = false

/**
 * Ligaga qo'shilish oynasi: sinf tanlash, sovg'a va hujjat haqida eslatma, asosiy qoidalar, rozilik.
 * onConfirm(gradeId) — "Qo'shilish" bosilganda.
 */
const LigaJoinModal = ({ open, lang = 'uz', grades = [], initialGrade, busy = false, onConfirm, onClose }) => {
  const text = TEXT[lang === 'ru' ? 'ru' : 'uz']
  const [mounted, setMounted] = useState(false)
  const [grade, setGrade] = useState(null)
  const [accepted, setAccepted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return undefined
    setGrade(grades.some((item) => item.id === initialGrade) ? initialGrade : null)
    setAccepted(false)
    const onKey = (event) => event.key === 'Escape' && !busy && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!mounted || !open) return null
  const canJoin = Boolean(grade) && accepted && !busy

  return createPortal(
    <div className="fixed inset-0 z-[1300] flex items-end justify-center bg-[#0B1B3F]/45 backdrop-blur-sm sm:items-center sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="liga-join-title"
        className="relative flex max-h-[96dvh] w-full max-w-[920px] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_40px_90px_-30px_rgba(15,23,42,0.6)] sm:rounded-[32px]"
      >
        {/* Sarlavha: yumshoq ko'k to'lqinli fon va kubok */}
        <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-[#F4F8FF] via-white to-[#E6F0FF] px-5 pb-6 pt-5 sm:px-9 sm:pt-7">
          <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-white" viewBox="0 0 900 60" preserveAspectRatio="none" aria-hidden>
            <path d="M0 40 C 220 0 420 70 620 30 S 860 10 900 24 V60 H0 Z" fill="currentColor" />
          </svg>
          <Image
            src="/images/league/join-trophy.webp"
            alt=""
            width={180}
            height={180}
            className="pointer-events-none absolute right-16 top-1 hidden h-[130px] w-[130px] object-contain sm:block"
          />
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            aria-label={text.cancel}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0B1B3F] shadow-[0_8px_20px_-10px_rgba(15,23,42,0.35)] transition hover:bg-[#F1F5FB] sm:right-6 sm:top-6 sm:h-12 sm:w-12"
          >
            <X size={22} />
          </button>
          <div className="relative flex items-center gap-4 pr-12 sm:gap-5 sm:pr-56">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-[#3B8BFF] to-[#1764E8] text-white shadow-[0_12px_24px_-12px_rgba(23,100,232,0.9)] sm:h-[72px] sm:w-[72px]">
              <Users size={30} />
            </span>
            <span className="hidden h-14 w-px bg-[#D7E2F2] sm:block" />
            <div className="min-w-0">
              <h2 id="liga-join-title" className="text-[22px] font-extrabold leading-tight text-[#0B1B3F] sm:text-[30px]">
                {text.title}
              </h2>
              <p className="mt-1 text-sm text-[#475569] sm:text-[16px]">{text.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-2 sm:px-9">
          {/* Sinf tanlash */}
          <h3 className="flex items-center gap-2.5 text-[17px] font-bold text-[#0B1B3F] sm:text-[19px]">
            <GraduationCap size={24} className="text-[#1F6FEB]" />
            {text.chooseGrade}
          </h3>
          <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-6 sm:gap-3">
            {grades.map((item) => {
              const active = grade === item.id
              const Icon = isNumeric(item.name) ? BookOpen : FlaskConical
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setGrade(item.id)}
                  className={`flex h-[52px] items-center justify-center gap-2 rounded-2xl border px-2 text-[15px] font-bold leading-tight transition ${
                    active
                      ? 'border-transparent bg-gradient-to-b from-[#2F80FF] to-[#1764E8] text-white shadow-[0_12px_24px_-14px_rgba(23,100,232,0.9)]'
                      : 'border-[#DCE5F2] bg-white text-[#0B1B3F] hover:border-[#A9C8F5]'
                  }`}
                >
                  {active ? <Check size={16} strokeWidth={3} className="shrink-0" /> : null}
                  <Icon size={18} className={`shrink-0 ${active ? 'text-white' : 'text-[#1F6FEB]'}`} />
                  <span className="min-w-0 text-center">{isNumeric(item.name) ? text.grade(item.name) : item.name}</span>
                </button>
              )
            })}
          </div>

          {/* Sovg'a va hujjat haqida */}
          <div className="relative mt-5 flex items-center gap-4 overflow-hidden rounded-2xl border border-[#FBE3B6] bg-gradient-to-r from-[#FFF8EA] to-[#FFF1DA] p-4 pr-4 sm:pr-32">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 text-[#F59E0B]">
              <Award size={24} />
            </span>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-[#C2410C] sm:text-[16px]">{text.bannerTitle}</p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-[#9A3412] sm:text-sm">{text.bannerText}</p>
            </div>
            <Image
              src="/images/league/join-gift.webp"
              alt=""
              width={100}
              height={100}
              className="pointer-events-none absolute right-4 top-1/2 hidden h-[84px] w-[84px] -translate-y-1/2 object-contain sm:block"
            />
          </div>

          {/* Asosiy qoidalar — hozircha yashirilgan (SHOW_RULES) */}
          {SHOW_RULES ? (
          <div className="mt-5 rounded-2xl bg-[#EEF4FD] p-4 sm:p-6">
            <h3 className="flex items-center gap-2.5 text-[17px] font-bold text-[#0B1B3F] sm:text-[19px]">
              <NotebookText size={22} className="text-[#1F6FEB]" />
              {text.rulesTitle}
            </h3>
            <ul className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {text.rules.map(([Icon, rule]) => (
                <li key={rule} className="flex items-start gap-3 text-[14px] leading-relaxed text-[#1E293B]">
                  <Icon size={24} className="mt-0.5 shrink-0 text-[#1F6FEB]" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          ) : null}

          {/* Rozilik */}
          <label
            className={`mt-5 flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 text-[15px] font-semibold transition ${
              accepted ? 'border-[#1F6FEB] bg-[#F2F7FF] text-[#0B1B3F]' : 'border-[#DCE5F2] text-[#0B1B3F] hover:border-[#A9C8F5]'
            }`}
          >
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              className="h-5 w-5 shrink-0 cursor-pointer rounded accent-[#1F6FEB]"
            />
            {text.accept}
          </label>
        </div>

        {/* Tugmalar */}
        <div className="grid shrink-0 grid-cols-2 gap-3 px-5 pb-5 pt-4 sm:gap-4 sm:px-9 sm:pb-8">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-2xl bg-[#EEF2F8] text-[15px] font-bold text-[#0B1B3F] transition hover:bg-[#E3E9F3] sm:text-[17px]"
          >
            <X size={20} />
            {text.cancel}
          </button>
          <button
            type="button"
            disabled={!canJoin}
            onClick={() => onConfirm(grade)}
            className="inline-flex h-14 items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-b from-[#2F80FF] to-[#1764E8] text-[15px] font-bold text-white shadow-[0_16px_30px_-16px_rgba(23,100,232,0.95)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 sm:text-[17px]"
          >
            {busy ? <Loader2 size={20} className="animate-spin" /> : <UserPlus size={21} />}
            {text.join}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default LigaJoinModal
