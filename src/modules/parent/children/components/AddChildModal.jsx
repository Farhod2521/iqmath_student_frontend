import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { ArrowLeft, CheckCircle2, ChevronRight, Copy, Info, MessageSquareText, Smartphone, UserRoundPlus, X } from 'lucide-react'
import { request } from '@/services/api'
import SelectClass from '@/components/form/select/SelectClass'
import InputText from '@/components/form/input/InputText'
import { fieldBorder, fieldBox, fieldIcon, fieldInput } from '@/components/form/field/fieldStyles'
import SwitchToChildButton from './SwitchToChildButton'

const API = 'https://api.iqmath.uz/api/v1/auth/parent'

const errorText = (error, fallback) =>
  error?.response?.data?.detail || error?.response?.data?.message || error?.response?.data?.error || fallback

const OptionCard = ({ icon: Icon, tone, title, text, badge, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex w-full items-center gap-4 rounded-2xl border-2 border-[#EEF1F6] bg-white p-4 text-left transition hover:border-[#2563EB] hover:shadow-[0_14px_30px_-20px_rgba(37,99,235,0.8)]"
  >
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tone}`}>
      <Icon size={24} />
    </span>
    <span className="min-w-0 flex-1">
      <span className="flex flex-wrap items-center gap-2 text-[15px] font-bold text-[#0F172A]">
        {title}
        {badge ? (
          <span className="rounded-md bg-[#DCFCE7] px-1.5 py-0.5 text-[11px] font-semibold text-[#16A34A]">{badge}</span>
        ) : null}
      </span>
      <span className="mt-0.5 block text-[13px] leading-snug text-[#64748B]">{text}</span>
    </span>
    <ChevronRight size={20} className="shrink-0 text-[#94A3B8] transition group-hover:text-[#2563EB]" />
  </button>
)

const RESEND_SECONDS = 120

/** SMS qayta yuborish: 2 daqiqa sanaladi, keyin tugma chiqadi */
const ResendTimer = ({ remaining, loading, onResend, label, waitLabel }) => {
  if (remaining > 0) {
    const mm = String(Math.floor(remaining / 60)).padStart(2, '0')
    const ss = String(remaining % 60).padStart(2, '0')
    return <p className="text-center text-sm text-[#64748B]">{waitLabel(`${mm}:${ss}`)}</p>
  }
  return (
    <button
      type="button"
      onClick={onResend}
      disabled={loading}
      className="mx-auto block text-sm font-semibold text-[#2563EB] hover:underline disabled:opacity-60"
    >
      {label}
    </button>
  )
}

const PrimaryButton = ({ children, loading, className = '', ...props }) => (
  <button
    type="button"
    {...props}
    disabled={loading || props.disabled}
    className={`inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 text-[15px] font-semibold text-white transition hover:bg-[#1D4ED8] disabled:opacity-60 ${className}`}
  >
    {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : null}
    {children}
  </button>
)

const GhostButton = ({ children, ...props }) => (
  <button
    type="button"
    {...props}
    className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#F1F5FB] px-4 text-[15px] font-semibold text-[#0F172A] transition hover:bg-[#E6ECF7]"
  >
    {children}
  </button>
)

/**
 * Farzand qo'shish:
 *  - telefonsiz yangi hisob (ism + sinf) — bir oilada bitta telefon bo'lsa;
 *  - farzandning mavjud hisobiga SMS kod orqali ulanish.
 */
const AddChildModal = ({ isOpen, onClose, onSuccess, initialStep = 'choose' }) => {
  const { t } = useTranslation()
  const c = (key, opts) => t(`childSwitch.${key}`, opts)
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(initialStep)
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [fullName, setFullName] = useState('')
  const [classOption, setClassOption] = useState(null)
  const [created, setCreated] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendAt, setResendAt] = useState(0)
  const [now, setNow] = useState(Date.now())

  useEffect(() => setMounted(true), [])
  // Taymer faqat kod kutilayotganda yuradi
  useEffect(() => {
    if (!resendAt || Date.now() >= resendAt) return undefined
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [resendAt, now])
  const remaining = Math.max(0, Math.ceil((resendAt - now) / 1000))
  const startTimer = () => {
    setNow(Date.now())
    setResendAt(Date.now() + RESEND_SECONDS * 1000)
  }
  useEffect(() => {
    if (!isOpen) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  const reset = () => {
    setStep('choose')
    setPhone('')
    setCode('')
    setFullName('')
    setClassOption(null)
    setCreated(null)
    setError('')
    setLoading(false)
    setResendAt(0)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const go = (next) => {
    setError('')
    setStep(next)
  }

  const sendCode = async () => {
    if (phone.length !== 9) return setError(c('phoneInvalid'))
    setError('')
    setLoading(true)
    try {
      await request.post(`${API}/add-child/`, { phone: `998${phone}` })
      startTimer()
      setStep('code')
    } catch (err) {
      if (err?.response?.data?.code === 'not_registered') {
        // Raqam hali ro'yxatdan o'tmagan — ota-ona farzandni shu raqam bilan ro'yxatdan o'tkazadi
        setStep('register')
      } else {
        setError(errorText(err, c('genericError')))
      }
    } finally {
      setLoading(false)
    }
  }

  const verifyCode = async () => {
    if (code.trim().length < 4) return setError(c('codeInvalid'))
    setError('')
    setLoading(true)
    try {
      await request.post(`${API}/confirm-child/`, { phone: `998${phone}`, code: code.trim() })
      toast.success(c('added'))
      onSuccess?.()
      handleClose()
    } catch (err) {
      setError(errorText(err, c('codeInvalid')))
      setLoading(false)
    }
  }

  const sendRegisterCode = async () => {
    if (fullName.trim().length < 3) return setError(c('nameInvalid'))
    if (phone.length !== 9) return setError(c('phoneInvalid'))
    if (!classOption?.value) return setError(c('classInvalid'))
    setError('')
    setLoading(true)
    try {
      await request.post(`${API}/children/register/`, {
        full_name: fullName.trim(),
        phone: `998${phone}`,
        class_name: classOption.value
      })
      setCode('')
      startTimer()
      setStep('regCode')
    } catch (err) {
      setError(errorText(err, c('genericError')))
    } finally {
      setLoading(false)
    }
  }

  const verifyRegister = async () => {
    if (code.trim().length < 4) return setError(c('codeInvalid'))
    setError('')
    setLoading(true)
    try {
      const res = await request.post(`${API}/children/register/verify/`, { phone: `998${phone}`, code: code.trim() })
      setCreated(res.data)
      setStep('credentials')
      onSuccess?.()
    } catch (err) {
      setError(errorText(err, c('codeInvalid')))
    } finally {
      setLoading(false)
    }
  }

  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success(c('copied'))
    } catch {
      // brauzer ruxsat bermasa — jim
    }
  }

  const createChild = async () => {
    if (fullName.trim().length < 3) return setError(c('nameInvalid'))
    if (!classOption?.value) return setError(c('classInvalid'))
    setError('')
    setLoading(true)
    try {
      const res = await request.post(`${API}/children/create/`, {
        full_name: fullName.trim(),
        class_name: classOption.value
      })
      setCreated(res.data)
      setStep('created')
      onSuccess?.()
    } catch (err) {
      setError(errorText(err, c('genericError')))
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !mounted) return null

  const titles = {
    choose: c('addTitle'),
    create: c('optNewTitle'),
    phone: c('optPhoneTitle'),
    code: c('optPhoneTitle'),
    created: c('createdTitle'),
    register: c('regTitle'),
    regCode: c('regTitle'),
    credentials: c('credTitle')
  }
  const backTarget = { create: 'choose', phone: 'choose', code: 'phone', register: 'phone', regCode: 'register' }

  return createPortal(
    <div className="fixed inset-0 z-[10000] overflow-y-auto bg-[#0F172A]/55 backdrop-blur-sm" onClick={handleClose}>
      <div className="flex min-h-full items-end justify-center sm:items-center sm:p-6">
        <div
          className="relative w-full max-w-[480px] rounded-t-[28px] bg-white p-5 shadow-2xl sm:rounded-[28px] sm:p-7"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-5 flex items-start gap-3">
            {backTarget[step] ? (
              <button
                type="button"
                onClick={() => go(backTarget[step])}
                aria-label={c('back2')}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F1F5FB] text-[#0F172A] hover:bg-[#E6ECF7]"
              >
                <ArrowLeft size={18} />
              </button>
            ) : null}
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-extrabold text-[#0B1B3F]">{titles[step]}</h3>
              {step === 'choose' ? <p className="mt-1 text-sm text-[#64748B]">{c('addSubtitle')}</p> : null}
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="close"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#64748B] hover:bg-[#F1F5F9]"
            >
              <X size={20} />
            </button>
          </div>

          {step === 'choose' ? (
            <div className="space-y-3">
              <OptionCard
                icon={UserRoundPlus}
                tone="bg-[#EAF1FF] text-[#2563EB]"
                title={c('optNewTitle')}
                text={c('optNewText')}
                badge={c('recommended')}
                onClick={() => go('create')}
              />
              <OptionCard
                icon={Smartphone}
                tone="bg-[#F1EBFF] text-[#7C3AED]"
                title={c('optPhoneTitle')}
                text={c('optPhoneText')}
                onClick={() => go('phone')}
              />
            </div>
          ) : null}

          {step === 'create' ? (
            <div className="space-y-4">
              <p className="rounded-xl bg-[#F5F8FF] px-3 py-2.5 text-[13px] leading-snug text-[#3B5BAA]">
                {c('optNewText')}
              </p>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#334155]">{c('nameLabel')}</label>
                <InputText
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder={c('namePlaceholder')}
                  maxLength={200}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#334155]">{c('classLabel')}</label>
                <SelectClass onChange={setClassOption} option={classOption} />
              </div>
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              <div className="flex gap-2 pt-1">
                <GhostButton onClick={handleClose}>{c('cancel')}</GhostButton>
                <PrimaryButton onClick={createChild} loading={loading}>
                  {c('create')}
                </PrimaryButton>
              </div>
            </div>
          ) : null}

          {step === 'phone' ? (
            <div className="space-y-4">
              <p className="text-sm text-[#64748B]">{c('phoneHint')}</p>
              <div className={`${fieldBox} ${fieldBorder}`}>
                <span className={fieldIcon}>
                  <Smartphone size={20} />
                </span>
                <span className="flex h-full shrink-0 items-center border-r border-[#EEF1F6] px-4 text-[15px] font-semibold text-[#0F172A]">
                  +998
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={9}
                  placeholder="901234567"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 9))}
                  className={fieldInput}
                />
              </div>
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              <div className="flex gap-2 pt-1">
                <GhostButton onClick={handleClose}>{c('cancel')}</GhostButton>
                <PrimaryButton onClick={sendCode} loading={loading}>
                  {c('sendCode')}
                </PrimaryButton>
              </div>
            </div>
          ) : null}

          {step === 'code' ? (
            <div className="space-y-4">
              <p className="text-sm text-[#64748B]">{c('codeHint', { phone })}</p>
              <div className={`${fieldBox} ${fieldBorder}`}>
                <span className={fieldIcon}>
                  <MessageSquareText size={20} />
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={c('codePlaceholder')}
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  className={fieldInput}
                />
              </div>
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              <ResendTimer
                remaining={remaining}
                loading={loading}
                onResend={sendCode}
                label={c('resend')}
                waitLabel={(time) => c('resendIn', { time })}
              />
              <div className="flex gap-2 pt-1">
                <GhostButton onClick={() => go('phone')}>{c('back2')}</GhostButton>
                <PrimaryButton onClick={verifyCode} loading={loading}>
                  {c('verify')}
                </PrimaryButton>
              </div>
            </div>
          ) : null}

          {step === 'register' ? (
            <div className="space-y-4">
              <p className="flex items-start gap-2 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2.5 text-[13px] font-medium leading-snug text-[#92400E]">
                <Info size={16} className="mt-px shrink-0 text-[#D97706]" />
                {c('notRegistered')}
              </p>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#334155]">{c('nameLabel')}</label>
                <InputText
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder={c('namePlaceholder')}
                  maxLength={200}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#334155]">{c('phoneLabel')}</label>
                <div className={`${fieldBox} ${fieldBorder}`}>
                  <span className={fieldIcon}>
                    <Smartphone size={20} />
                  </span>
                  <span className="flex h-full shrink-0 items-center border-r border-[#EEF1F6] px-4 text-[15px] font-semibold text-[#0F172A]">
                    +998
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={9}
                    value={phone}
                    onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 9))}
                    className={fieldInput}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#334155]">{c('classLabel')}</label>
                <SelectClass onChange={setClassOption} option={classOption} />
              </div>
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              <div className="flex gap-2 pt-1">
                <GhostButton onClick={handleClose}>{c('cancel')}</GhostButton>
                <PrimaryButton onClick={sendRegisterCode} loading={loading}>
                  {c('sendCode')}
                </PrimaryButton>
              </div>
            </div>
          ) : null}

          {step === 'regCode' ? (
            <div className="space-y-4">
              <p className="text-sm text-[#64748B]">{c('regCodeHint', { phone })}</p>
              <div className={`${fieldBox} ${fieldBorder}`}>
                <span className={fieldIcon}>
                  <MessageSquareText size={20} />
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={c('codePlaceholder')}
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  className={fieldInput}
                />
              </div>
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              <ResendTimer
                remaining={remaining}
                loading={loading}
                onResend={sendRegisterCode}
                label={c('resend')}
                waitLabel={(time) => c('resendIn', { time })}
              />
              <div className="flex gap-2 pt-1">
                <GhostButton onClick={() => go('register')}>{c('back2')}</GhostButton>
                <PrimaryButton onClick={verifyRegister} loading={loading}>
                  {c('verify')}
                </PrimaryButton>
              </div>
            </div>
          ) : null}

          {step === 'credentials' && created ? (
            <div className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A] ring-8 ring-[#F0FDF4]">
                <CheckCircle2 size={32} />
              </span>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#475569]">{c('credText')}</p>
              <div className="mt-5 space-y-2 text-left">
                {[
                  [c('login'), `+${created.login}`],
                  [c('password'), created.password]
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center gap-3 rounded-xl bg-[#F5F8FF] px-4 py-3">
                    <span className="w-16 shrink-0 text-xs text-[#64748B]">{label}</span>
                    <span className="flex-1 font-mono text-[15px] font-bold text-[#0F172A]">{value}</span>
                    <button type="button" onClick={() => copy(value)} aria-label="copy" className="text-[#2563EB]">
                      <Copy size={17} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <GhostButton onClick={handleClose}>{c('close')}</GhostButton>
                <SwitchToChildButton childId={created.id} className="h-12 flex-1 text-[15px]" />
              </div>
            </div>
          ) : null}

          {step === 'created' && created ? (
            <div className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A] ring-8 ring-[#F0FDF4]">
                <CheckCircle2 size={32} />
              </span>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#475569]">
                {c('createdText', { name: created.full_name })}
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <GhostButton onClick={handleClose}>{c('later')}</GhostButton>
                <SwitchToChildButton childId={created.id} className="h-12 flex-1 text-[15px]" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default AddChildModal
