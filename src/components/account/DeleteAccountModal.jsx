import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { AlertTriangle, Eye, EyeOff, Loader2, Lock, Trash2, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { logout } from '@/shared/utils/logout'

const TEXTS = {
  uz: {
    title: 'Akkauntni o‘chirish',
    question: 'Akkauntingizni rostdan ham butunlay o‘chirmoqchimisiz?',
    warning: 'Bu amalni ortga qaytarib bo‘lmaydi. Quyidagi ma’lumotlar butunlay o‘chib ketadi:',
    items: {
      student: [
        'Profil va shaxsiy ma’lumotlar',
        'Darslar bo‘yicha natijalar va diagnostika',
        'Tangalar, ballar va reyting o‘rni',
        'Obuna va to‘lovlar tarixi'
      ],
      parent: [
        'Profil va shaxsiy ma’lumotlar',
        'Farzandlar bilan bog‘lanishlar',
        'Siz yaratgan farzand akkauntlari (telefon raqamisiz)',
        'To‘lovlar tarixi'
      ],
      tutor: [
        'Profil va shaxsiy ma’lumotlar',
        'Guruhlaringiz va o‘quvchilar bilan bog‘lanishlar',
        'Referal havolalar va kuponlar',
        'Hisobingizdagi daromad tarixi'
      ]
    },
    agree: 'Tushundim, barcha ma’lumotlarim butunlay o‘chib ketishiga roziman',
    next: 'Davom etish',
    cancel: 'Bekor qilish',
    passwordLabel: 'Tasdiqlash uchun parolingizni kiriting',
    passwordPlaceholder: 'Parolingiz',
    noPassword: 'Akkauntingizda parol o‘rnatilmagan. Tasdiqlash uchun pastdagi tugmani bosing.',
    finalQuestion: 'Aniq o‘chirasizmi? Shundan keyin akkauntingizni tiklab bo‘lmaydi.',
    confirm: 'Ha, butunlay o‘chirish',
    back: 'Orqaga',
    success: 'Akkauntingiz o‘chirildi',
    error: 'Akkauntni o‘chirib bo‘lmadi',
    loading: 'Tekshirilmoqda...'
  },
  ru: {
    title: 'Удаление аккаунта',
    question: 'Вы действительно хотите полностью удалить свой аккаунт?',
    warning: 'Это действие нельзя отменить. Будут безвозвратно удалены:',
    items: {
      student: [
        'Профиль и личные данные',
        'Результаты по урокам и диагностика',
        'Монеты, баллы и место в рейтинге',
        'Подписка и история платежей'
      ],
      parent: [
        'Профиль и личные данные',
        'Связи с детьми',
        'Созданные вами аккаунты детей (без номера телефона)',
        'История платежей'
      ],
      tutor: [
        'Профиль и личные данные',
        'Ваши группы и связи с учениками',
        'Реферальные ссылки и купоны',
        'История доходов на счёте'
      ]
    },
    agree: 'Я понимаю, что все мои данные будут удалены безвозвратно',
    next: 'Продолжить',
    cancel: 'Отмена',
    passwordLabel: 'Для подтверждения введите пароль',
    passwordPlaceholder: 'Ваш пароль',
    noPassword: 'У вашего аккаунта нет пароля. Нажмите кнопку ниже для подтверждения.',
    finalQuestion: 'Точно удалить? После этого аккаунт восстановить нельзя.',
    confirm: 'Да, удалить навсегда',
    back: 'Назад',
    success: 'Ваш аккаунт удалён',
    error: 'Не удалось удалить аккаунт',
    loading: 'Проверка...'
  }
}

/**
 * Akkauntni to'liq o'chirish oynasi (o'quvchi, ota-ona, o'qituvchi).
 * 1-qadam: nimalar o'chishi va "tushundim" belgisi; 2-qadam: parol va yakuniy tasdiq.
 */
export default function DeleteAccountModal({ open, onClose, role = 'student' }) {
  const { i18n } = useTranslation()
  const text = TEXTS[i18n.language === 'ru' ? 'ru' : 'uz']

  const [step, setStep] = useState(1)
  const [agreed, setAgreed] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [info, setInfo] = useState(null)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    setStep(1)
    setAgreed(false)
    setPassword('')
    setError('')
    setInfo(null)
    let alive = true
    request
      .get(URLS.deleteAccount)
      .then((res) => alive && setInfo(res.data))
      .catch(() => alive && setInfo({ can_delete: true, requires_password: true }))

    const onKey = (event) => event.key === 'Escape' && !deleting && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      alive = false
      document.removeEventListener('keydown', onKey)
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!open || typeof document === 'undefined') return null

  const requiresPassword = info?.requires_password !== false

  const handleDelete = async () => {
    if (requiresPassword && !password.trim()) {
      setError(text.passwordLabel)
      return
    }
    setDeleting(true)
    setError('')
    try {
      await request.delete(URLS.deleteAccount, { data: { password, confirm: true } })
      toast.success(text.success)
      await logout('/')
    } catch (err) {
      setError(err?.response?.data?.detail || text.error)
      setDeleting(false)
    }
  }

  const items = text.items[role] || text.items.student

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-end justify-center bg-[#0B1B3F]/55 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={() => !deleting && onClose()}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-account-title"
        className="relative w-full max-w-[460px] rounded-t-[24px] bg-white p-5 shadow-[0_40px_80px_-30px_rgba(15,23,42,0.6)] sm:rounded-[24px] sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={deleting}
          aria-label="close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#64748B] transition hover:bg-[#F1F5F9] disabled:opacity-50"
        >
          <X size={18} />
        </button>

        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEECEC] text-[#E5484D]">
          {step === 1 ? <AlertTriangle size={26} /> : <Trash2 size={26} />}
        </span>
        <h2 id="delete-account-title" className="mt-4 text-[20px] font-extrabold text-[#0B1B3F]">
          {text.title}
        </h2>

        {!info ? (
          <p className="mt-6 flex items-center gap-2 text-[14px] text-[#64748B]">
            <Loader2 size={16} className="animate-spin" /> {text.loading}
          </p>
        ) : info.can_delete === false ? (
          <>
            <p className="mt-3 rounded-xl bg-[#FFF7E6] p-3 text-[14px] leading-relaxed text-[#92400E]">{info.reason}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-xl border border-[#E2E8F0] py-3 text-[15px] font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
            >
              {text.back}
            </button>
          </>
        ) : step === 1 ? (
          <>
            <p className="mt-2 text-[15px] font-semibold text-[#334155]">{text.question}</p>
            <p className="mt-3 text-[14px] text-[#64748B]">{text.warning}</p>
            <ul className="mt-3 space-y-2 rounded-xl border border-[#FDE2E2] bg-[#FFF8F8] p-4">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px] text-[#7F1D1D]">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#E5484D]" />
                  {item}
                </li>
              ))}
            </ul>

            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl p-1 text-[14px] text-[#334155]">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer accent-[#E5484D]"
              />
              {text.agree}
            </label>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-[#E2E8F0] py-3 text-[15px] font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
              >
                {text.cancel}
              </button>
              <button
                type="button"
                disabled={!agreed}
                onClick={() => setStep(2)}
                className="flex-1 rounded-xl bg-[#E5484D] py-3 text-[15px] font-semibold text-white transition hover:bg-[#D93D42] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {text.next}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-2 text-[15px] font-semibold text-[#B91C1C]">{text.finalQuestion}</p>

            {requiresPassword ? (
              <div className="mt-4">
                <label htmlFor="delete-account-password" className="text-[13px] font-semibold text-[#334155]">
                  {text.passwordLabel}
                </label>
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#E2E8F0] px-3 focus-within:border-[#E5484D] focus-within:ring-4 focus-within:ring-[#E5484D]/10">
                  <Lock size={17} className="shrink-0 text-[#94A3B8]" />
                  <input
                    id="delete-account-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    autoFocus
                    autoComplete="current-password"
                    placeholder={text.passwordPlaceholder}
                    onChange={(event) => {
                      setPassword(event.target.value)
                      setError('')
                    }}
                    onKeyDown={(event) => event.key === 'Enter' && handleDelete()}
                    className="h-12 min-w-0 flex-1 bg-transparent text-[15px] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="shrink-0 text-[#94A3B8] hover:text-[#475569]"
                    aria-label="toggle password"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-4 rounded-xl bg-[#F8FAFC] p-3 text-[14px] text-[#475569]">{text.noPassword}</p>
            )}

            {error ? <p className="mt-3 text-[13px] font-medium text-[#DC2626]">{error}</p> : null}

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setStep(1)}
                className="flex-1 rounded-xl border border-[#E2E8F0] py-3 text-[15px] font-semibold text-[#334155] transition hover:bg-[#F8FAFC] disabled:opacity-50"
              >
                {text.back}
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#E5484D] py-3 text-[15px] font-semibold text-white transition hover:bg-[#D93D42] disabled:opacity-60"
              >
                {deleting ? <Loader2 size={17} className="animate-spin" /> : <Trash2 size={17} />}
                {text.confirm}
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}
