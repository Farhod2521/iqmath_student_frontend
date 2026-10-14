import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowLeft, Eye, EyeOff, GraduationCap, KeyRound, Lock, MessageSquareText, Phone, TriangleAlert, UserRound } from 'lucide-react'
import { config } from '@/config'
import { URLS } from '@/constants/url'
import { getDeviceCredentials } from '@/shared/utils/device'
import AuthButton from '@/home/components/auth/AuthButton'
import SimpleLoader from '@/components/loader/simple-loader'
import { fieldBorder, fieldBox, fieldIcon, fieldInput } from '@/components/form/field/fieldStyles'
import BrandMark from './components/BrandMark'

// Sessiyasiz so'rovlar: brauzerda boshqa hisob ochiq bo'lsa ham uning tokeni yuborilmaydi
const api = axios.create({ baseURL: config.API_URL, headers: { Accept: 'application/json' } })

const RESEND_SECONDS = 120

const errorText = (error, fallback) => error?.response?.data?.detail || fallback

// 901234567 -> 90 123-45-67
const formatPhone = (digits) => {
  const d = digits.slice(0, 9)
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean)
  if (parts.length <= 1) return parts.join('')
  return `${parts[0]} ${parts.slice(1).join('-')}`
}

const Field = ({ icon: Icon, children, suffix }) => (
  <label className={`${fieldBox} ${fieldBorder}`}>
    <span className={fieldIcon}>
      <Icon size={20} />
    </span>
    {children}
    {suffix}
  </label>
)

const PasswordField = ({ value, onChange, placeholder, autoFocus }) => {
  const [visible, setVisible] = useState(false)
  return (
    <Field
      icon={Lock}
      suffix={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="flex h-full w-12 shrink-0 items-center justify-center text-[#64748B]"
          aria-label="toggle password"
        >
          {visible ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
      }
    >
      <input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="new-password"
        className={fieldInput}
      />
    </Field>
  )
}

export default function ParentConnect() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const token = typeof router.query.t === 'string' ? router.query.t : ''

  // loading | invalid | phone | password | name | code | setPassword
  const [step, setStep] = useState('loading')
  const [child, setChild] = useState(null)
  const [invalidText, setInvalidText] = useState('')
  const [busy, setBusy] = useState(false)

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [fullName, setFullName] = useState('')
  const [code, setCode] = useState('')
  const [parentName, setParentName] = useState('')
  const [timer, setTimer] = useState(0)

  const fullPhone = `998${phone}`

  useEffect(() => {
    if (!router.isReady) return
    if (!token) {
      setInvalidText(t('parentConnect.noToken'))
      setStep('invalid')
      return
    }
    api
      .post(URLS.parentQrInfo, { token })
      .then(({ data }) => {
        setChild(data.student)
        setStep('phone')
      })
      .catch((error) => {
        setInvalidText(errorText(error, t('parentConnect.invalidQr')))
        setStep('invalid')
      })
  }, [router.isReady, token])

  useEffect(() => {
    if (timer <= 0) return
    const id = setTimeout(() => setTimer((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [timer])

  const run = async (fn) => {
    setBusy(true)
    try {
      await fn()
    } finally {
      setBusy(false)
    }
  }

  // Ota-ona sifatida kirish — farzand backendda biriktiriladi
  const login = async (pwd) => {
    const result = await signIn('credentials', {
      parent_qr_token: token,
      phone: fullPhone,
      password: pwd,
      lang: i18n.language,
      ...getDeviceCredentials(),
      redirect: false
    })
    if (!result?.ok) {
      toast.error(result?.error && result.error !== 'CredentialsSignin' ? result.error : t('loginError'))
      return
    }
    toast.success(t('parentConnect.linked'))
    window.location.href = '/dashboard/parent/home'
  }

  const submitPhone = (e) => {
    e.preventDefault()
    if (phone.length !== 9) {
      toast.error(t('phoneNumberMustBe9Digits'))
      return
    }
    run(async () => {
      try {
        const { data } = await api.post(URLS.parentQrCheckPhone, { token, phone: fullPhone })
        if (data.exists) {
          setParentName(data.full_name || '')
          setStep('password')
        } else {
          setStep('name')
        }
      } catch (error) {
        toast.error(errorText(error, t('ERROR')))
      }
    })
  }

  const submitPassword = (e) => {
    e.preventDefault()
    if (!password) return
    run(() => login(password))
  }

  const sendCode = () =>
    run(async () => {
      try {
        const { data } = await api.post(URLS.parentQrRegister, {
          token,
          phone: fullPhone,
          full_name: fullName.trim(),
          lang: i18n.language
        })
        setCode('')
        setTimer(data.retry_after || RESEND_SECONDS)
        setStep('code')
        toast.success(t('parentConnect.codeSent'))
      } catch (error) {
        const retry = error?.response?.data?.retry_after
        if (retry) {
          setTimer(retry)
          setStep('code')
        }
        toast.error(errorText(error, t('ERROR')))
      }
    })

  const submitName = (e) => {
    e.preventDefault()
    if (fullName.trim().length < 3) {
      toast.error(t('parentConnect.nameRequired'))
      return
    }
    sendCode()
  }

  const submitCode = (e) => {
    e.preventDefault()
    if (code.length < 5) return
    run(async () => {
      try {
        await api.post(URLS.parentQrRegisterVerify, { token, phone: fullPhone, code })
        setStep('setPassword')
      } catch (error) {
        toast.error(errorText(error, t('ERROR')))
      }
    })
  }

  const submitNewPassword = (e) => {
    e.preventDefault()
    if (password.length < 6) {
      toast.error(t('parentConnect.passwordMin'))
      return
    }
    if (password !== password2) {
      toast.error(t('parentConnect.passwordMismatch'))
      return
    }
    run(async () => {
      try {
        await api.post(URLS.parentQrRegisterComplete, { token, phone: fullPhone, code, password })
        await login(password)
      } catch (error) {
        toast.error(errorText(error, t('ERROR')))
      }
    })
  }

  const back = (to) => () => {
    setPassword('')
    setPassword2('')
    setStep(to)
  }

  const titles = {
    phone: [t('parentConnect.phoneTitle'), t('parentConnect.phoneText')],
    password: [
      parentName ? `${t('parentConnect.welcomeBack')}, ${parentName}!` : t('parentConnect.passwordTitle'),
      t('parentConnect.passwordText')
    ],
    name: [t('parentConnect.nameTitle'), t('parentConnect.nameText')],
    code: [t('parentConnect.codeTitle'), t('parentConnect.codeText', { phone: `+998 ${formatPhone(phone)}` })],
    setPassword: [t('parentConnect.setPasswordTitle'), t('parentConnect.setPasswordText')]
  }
  const [title, subtitle] = titles[step] || []

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden bg-[#0B1B3F]">
      <img
        src="/images/parent-family.webp"
        alt=""
        className="fixed left-0 top-0 z-0 h-[100lvh] w-full object-cover object-[30%_center]"
      />
      <div className="fixed left-0 top-0 z-0 h-[100lvh] w-full bg-gradient-to-t from-[#0B1B3F]/80 via-[#0B1B3F]/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#0B1B3F]/10 lg:to-[#0B1B3F]/45" />

      <main className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1280px] flex-col justify-end px-4 pb-6 pt-40 sm:px-8 sm:pb-10 lg:items-end lg:justify-center lg:py-10">
        <div className="w-full max-w-[460px] rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_30px_80px_-20px_rgba(2,6,23,0.6)] backdrop-blur-md sm:p-8">
          <div className="flex items-center justify-between">
            <BrandMark small />
            {['password', 'name', 'code', 'setPassword'].includes(step) ? (
              <button
                type="button"
                onClick={back(step === 'setPassword' ? 'code' : step === 'code' ? 'name' : 'phone')}
                className="flex h-9 items-center gap-1.5 rounded-full bg-[#F1F5FB] px-3 text-sm font-medium text-[#334155] transition hover:bg-[#E2E8F5]"
              >
                <ArrowLeft size={16} />
                {t('parentConnect.back')}
              </button>
            ) : null}
          </div>

          {step === 'loading' ? (
            <div className="flex min-h-[260px] items-center justify-center">
              <SimpleLoader />
            </div>
          ) : null}

          {step === 'invalid' ? (
            <div className="py-8 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEF2F2] text-[#DC2626]">
                <TriangleAlert size={28} />
              </span>
              <h1 className="mt-4 text-xl font-extrabold text-[#0B1B3F]">{t('parentConnect.invalidTitle')}</h1>
              <p className="mx-auto mt-2 max-w-[320px] text-[15px] text-[#64748B]">{invalidText}</p>
            </div>
          ) : null}

          {title ? (
            <>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#2563EB]">
                {t('parentConnect.badge')}
              </p>
              <h1 className="mt-1.5 text-[22px] font-extrabold leading-tight text-[#0B1B3F] sm:text-[26px]">{title}</h1>
              <p className="mt-1.5 text-[15px] leading-snug text-[#64748B]">{subtitle}</p>
            </>
          ) : null}

          {child && step !== 'invalid' && step !== 'loading' ? (
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#DBE7FF] bg-[#F3F7FF] px-4 py-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-lg font-bold text-white">
                {(child.full_name || '?').trim().charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="text-xs text-[#64748B]">{t('parentConnect.yourChild')}</p>
                <p className="truncate text-[15px] font-bold text-[#0B1B3F]">{child.full_name}</p>
              </div>
              {child.class_name ? (
                <span className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#2563EB]">
                  <GraduationCap size={14} />
                  {child.class_name}
                </span>
              ) : null}
            </div>
          ) : null}

          {step === 'phone' ? (
            <form onSubmit={submitPhone} className="mt-5 space-y-4">
              <Field icon={Phone}>
                <span className="pl-4 text-[15px] font-medium text-[#0F172A]">+998</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoFocus
                  value={formatPhone(phone)}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                  placeholder="(__) ___-__-__"
                  className={`${fieldInput} pl-2`}
                />
              </Field>
              <AuthButton type="submit" disabled={busy}>
                {busy ? <SimpleLoader /> : t('parentConnect.continue')}
              </AuthButton>
            </form>
          ) : null}

          {step === 'password' ? (
            <form onSubmit={submitPassword} className="mt-5 space-y-4">
              <Field icon={Phone}>
                <span className="px-4 text-[15px] text-[#64748B]">+998 {formatPhone(phone)}</span>
              </Field>
              <PasswordField value={password} onChange={setPassword} placeholder={t('parentConnect.password')} autoFocus />
              <AuthButton type="submit" disabled={busy || !password}>
                {busy ? <SimpleLoader /> : t('parentConnect.login')}
              </AuthButton>
            </form>
          ) : null}

          {step === 'name' ? (
            <form onSubmit={submitName} className="mt-5 space-y-4">
              <Field icon={UserRound}>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t('parentConnect.fullName')}
                  autoFocus
                  autoComplete="name"
                  className={fieldInput}
                />
              </Field>
              <Field icon={Phone}>
                <span className="px-4 text-[15px] text-[#64748B]">+998 {formatPhone(phone)}</span>
              </Field>
              <AuthButton type="submit" disabled={busy}>
                {busy ? <SimpleLoader /> : t('parentConnect.getCode')}
              </AuthButton>
            </form>
          ) : null}

          {step === 'code' ? (
            <form onSubmit={submitCode} className="mt-5 space-y-4">
              <Field icon={MessageSquareText}>
                <input
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  autoFocus
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="_ _ _ _ _"
                  className={`${fieldInput} text-lg tracking-[0.4em]`}
                />
              </Field>
              <AuthButton type="submit" disabled={busy || code.length < 5}>
                {busy ? <SimpleLoader /> : t('parentConnect.confirm')}
              </AuthButton>
              <div className="text-center text-sm text-[#64748B]">
                {timer > 0 ? (
                  t('parentConnect.resendIn', {
                    time: `${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`
                  })
                ) : (
                  <button type="button" onClick={sendCode} disabled={busy} className="font-semibold text-[#2563EB]">
                    {t('parentConnect.resend')}
                  </button>
                )}
              </div>
            </form>
          ) : null}

          {step === 'setPassword' ? (
            <form onSubmit={submitNewPassword} className="mt-5 space-y-4">
              <PasswordField
                value={password}
                onChange={setPassword}
                placeholder={t('parentConnect.newPassword')}
                autoFocus
              />
              <PasswordField value={password2} onChange={setPassword2} placeholder={t('parentConnect.repeatPassword')} />
              <AuthButton type="submit" disabled={busy}>
                {busy ? <SimpleLoader /> : (
                  <>
                    <KeyRound size={18} />
                    {t('parentConnect.finish')}
                  </>
                )}
              </AuthButton>
            </form>
          ) : null}
        </div>
      </main>
    </div>
  )
}
