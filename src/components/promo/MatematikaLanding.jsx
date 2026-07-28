import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '@/services/i18n'
import usePostQuery from '@/hooks/api/usePostQuery'
import { URLS } from '@/constants/url'
import {
  Route,
  Clapperboard,
  ShieldCheck,
  Trophy,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Blocks,
  GraduationCap,
  TrendingUp,
  Users,
  Check,
  Sparkles,
  Loader2
} from 'lucide-react'

const LOGO = 'https://api.iqmath.uz/system/logo/logo.png'
// Hero slider rasmlari — public/images/promo/ ichida.
// Ketma-ketlikni o'zgartirish yoki rasm qo'shish uchun shu ro'yxatni tahrirlang.
const HERO_SLIDES = ['/images/promo/1.png', '/images/promo/2.png', '/images/promo/3.png']
const HERO_INTERVAL = 4000 // ms — almashish tezligi

const BENEFIT_ICONS = [Route, Clapperboard, ShieldCheck, Trophy]
const SEGMENT_ICONS = [Blocks, GraduationCap, TrendingUp, Users]
const STATS = [
  { target: 10000, suffix: '+' },
  { target: 500, suffix: '+' },
  { target: 98, suffix: '%' },
  { target: 10, suffix: '+' }
]

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const formatUzPhone = (input) => {
  let d = input.replace(/\D/g, '')
  if (d.startsWith('998')) d = d.slice(3)
  d = d.slice(0, 9)
  let out = '+998'
  if (d.length > 0) out += ' ' + d.slice(0, 2)
  if (d.length > 2) out += ' ' + d.slice(2, 5)
  if (d.length > 5) out += ' ' + d.slice(5, 7)
  if (d.length > 7) out += ' ' + d.slice(7, 9)
  return { formatted: out, valid: d.length === 9, raw: '+998' + d }
}

const scrollToForm = (e) => {
  if (e) e.preventDefault()
  const el = document.getElementById('lead')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ------------------------------------------------------------------ */
/* Language switcher                                                   */
/* ------------------------------------------------------------------ */

const LangSwitcher = () => {
  const { i18n: i18nInstance } = useTranslation()
  const current = i18nInstance.language?.startsWith('ru') ? 'ru' : 'uz'

  const change = (lng) => {
    if (lng === current) return
    i18n.changeLanguage(lng)
    // URL'ni ham /math/<lng> ko'rinishida yangilaymiz (sahifani qayta yuklamasdan).
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', `/math/${lng}`)
    }
  }

  return (
    <div className="flex items-center rounded-full border border-[#E2E1F0] bg-white p-1 text-sm font-semibold">
      {['uz', 'ru'].map((lng) => (
        <button
          key={lng}
          onClick={() => change(lng)}
          className={`h-8 w-10 rounded-full transition-colors ${
            current === lng ? 'bg-[#4F46E5] text-white shadow-sm' : 'text-[#475569] hover:text-[#4F46E5]'
          }`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Animated hero visual (pure CSS/SVG, no external deps)               */
/* ------------------------------------------------------------------ */

const HeroVisual = () => {
  const [active, setActive] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((prev) => (prev + 1) % HERO_SLIDES.length)
    }, HERO_INTERVAL)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-full">
      <div
        className="promo-hero relative aspect-[16/9] w-full overflow-hidden rounded-[28px] border border-[#ECEBF7] bg-white shadow-[0_30px_60px_-30px_rgba(79,70,229,0.35)]"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        {HERO_SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`IQmath — matematika ${i + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ))}

        {/* nuqta indikatorlar */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'w-6 bg-[#4F46E5]' : 'w-2 bg-[#4F46E5]/30 hover:bg-[#4F46E5]/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Animated counter                                                    */
/* ------------------------------------------------------------------ */

const StatCounter = ({ target, suffix }) => {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const duration = 1600
            const start = performance.now()
            const tick = (now) => {
              const p = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - p, 3)
              setValue(Math.round(target * eased))
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [target])

  return (
    <span ref={ref} className="font-mono">
      {value.toLocaleString('ru-RU')}
      {suffix}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Lead form                                                           */
/* ------------------------------------------------------------------ */

const LeadForm = () => {
  const { t, i18n: i18nInstance } = useTranslation()
  const lang = i18nInstance.language?.startsWith('ru') ? 'ru' : 'uz'
  const { mutate, isLoading } = usePostQuery({ hideSuccessToast: true })

  const regions = t('promo.form.regions', { returnObjects: true }) || []
  const roles = t('promo.form.roles', { returnObjects: true }) || {}

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+998 ')
  const [region, setRegion] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handlePhone = (e) => setPhone(formatUzPhone(e.target.value).formatted)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) {
      setError(t('promo.form.requiredName'))
      return
    }
    const { valid, raw } = formatUzPhone(phone)
    if (!valid) {
      setError(t('promo.form.invalidPhone'))
      return
    }

    // Reklama kampaniyasini kuzatish uchun URL'dagi UTM parametrlarni olamiz.
    const q = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
    const payload = {
      full_name: name.trim(),
      phone: raw,
      region: region || null,
      role: role || null,
      lang,
      source: 'landing:math',
      utm_source: q.get('utm_source') || null,
      utm_medium: q.get('utm_medium') || null,
      utm_campaign: q.get('utm_campaign') || null,
      utm_content: q.get('utm_content') || null,
      fbclid: q.get('fbclid') || null
    }

    mutate(
      { url: URLS.leadCreate, attributes: payload },
      {
        onSuccess: () => setSubmitted(true),
        onError: () => setError(t('promo.form.error'))
      }
    )
  }

  const inputCls =
    'w-full h-12 px-4 rounded-xl border border-[#D9D8EC] bg-white text-[15px] text-[#0F172A] outline-none transition-shadow focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/15'

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#E2E1F0] bg-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)] md:flex">
      {/* info side */}
      <div className="flex flex-col justify-between bg-[#131A33] p-8 text-white sm:p-10 md:w-5/12">
        <div>
          <h2 className="mb-3 font-[Space_Grotesk] text-2xl font-bold leading-tight sm:text-[28px]">
            {t('promo.form.title')}
          </h2>
          <p className="mb-9 text-[15px] leading-relaxed text-white/70">{t('promo.form.subtitle')}</p>
        </div>
        <div>
          <p className="mb-5 font-[Space_Grotesk] text-lg font-bold text-white">{t('promo.form.contactTitle')}</p>
          <div className="space-y-5">
            <a
              href={`tel:${t('promo.form.phone').replace(/\s/g, '')}`}
              className="group flex items-center gap-4 transition-opacity hover:opacity-90"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4F46E5] text-white shadow-lg shadow-[#4F46E5]/30">
                <Phone size={20} />
              </span>
              <span>
                <span className="block text-xs text-white/50">{t('promo.form.phoneCaption')}</span>
                <span className="block font-mono text-[15px] font-semibold text-white">{t('promo.form.phone')}</span>
              </span>
            </a>
            <a
              href={`mailto:${t('promo.form.email')}`}
              className="flex items-center gap-4 transition-opacity hover:opacity-90"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 text-white/80">
                <Mail size={20} />
              </span>
              <span>
                <span className="block text-xs text-white/50">{t('promo.form.emailCaption')}</span>
                <span className="block text-[15px] font-semibold text-white">{t('promo.form.email')}</span>
              </span>
            </a>
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 text-white/80">
                <MapPin size={20} />
              </span>
              <span>
                <span className="block text-xs text-white/50">{t('promo.form.addressCaption')}</span>
                <span className="block text-[15px] font-semibold text-white">{t('promo.form.address')}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* form side */}
      <div className="p-8 sm:p-10 md:w-7/12">
        {submitted ? (
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
              <Check size={32} strokeWidth={3} />
            </div>
            <h3 className="mb-2 font-[Space_Grotesk] text-xl font-bold text-[#0F172A]">
              {t('promo.form.successTitle')}
            </h3>
            <p className="max-w-xs text-[15px] text-[#475569]">{t('promo.form.successText')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0F172A]">{t('promo.form.nameLabel')}</label>
              <input
                className={inputCls}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('promo.form.namePlaceholder')}
                type="text"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#0F172A]">{t('promo.form.phoneLabel')}</label>
              <input
                className={`${inputCls} font-mono`}
                value={phone}
                onChange={handlePhone}
                placeholder="+998 90 123 45 67"
                inputMode="tel"
                type="tel"
              />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#0F172A]">
                  {t('promo.form.regionLabel')}
                </label>
                <select
                  className={`${inputCls} appearance-none`}
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option value="">{t('promo.form.select')}</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#0F172A]">{t('promo.form.roleLabel')}</label>
                <select
                  className={`${inputCls} appearance-none`}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">{t('promo.form.select')}</option>
                  {Object.entries(roles).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && <p className="text-sm font-medium text-[#DC2626]">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FEAE2C] font-[Space_Grotesk] text-[17px] font-semibold text-[#291800] shadow-sm transition-all hover:bg-[#E59D24] active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> {t('promo.form.submitting')}
                </>
              ) : (
                t('promo.form.submit')
              )}
            </button>
            <p className="text-center text-xs text-[#475569]">
              {t('promo.form.agreementStart')}
              <a href="#" className="underline">
                {t('promo.form.agreementLink')}
              </a>
              {t('promo.form.agreementEnd')}
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

const MatematikaLanding = ({ lang }) => {
  const { t } = useTranslation()

  // Route'dan kelgan tilga qarab sahifa tilini o'rnatamiz.
  // Reklama havolalari uchun: /math/ru — to'liq ruscha, /math/uz — to'liq o'zbekcha.
  useEffect(() => {
    if ((lang === 'ru' || lang === 'uz') && i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }
  }, [lang])

  const benefits = t('promo.benefits.items', { returnObjects: true }) || []
  const statLabels = t('promo.stats.items', { returnObjects: true }) || []
  const segments = t('promo.segments.items', { returnObjects: true }) || []

  return (
    <div className="promo-root min-h-screen bg-white text-[#0F172A]">
      {/* ---------- Top bar ---------- */}
      <header className="sticky top-0 z-50 border-b border-[#E2E1F0] bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 md:px-10">
          <a href="#" className="flex items-center gap-2">
            <img src={LOGO} alt="IQmath" className="h-9 w-auto" />
            <span className="font-[Space_Grotesk] text-2xl font-bold tracking-tight text-[#1B1F3B]">
              {t('promo.brand')}
            </span>
          </a>
          <div className="flex items-center gap-3">
            <LangSwitcher />
          </div>
        </div>
      </header>

      <main>
        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden bg-white px-5 pb-12 pt-8 md:px-10 md:pb-20 md:pt-14 lg:pb-28 lg:pt-24">
          <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
            <div className="order-2 max-w-xl space-y-5 md:space-y-7 lg:order-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#4F46E5]/20 bg-[#4F46E5]/5 px-4 py-1.5 text-sm font-semibold text-[#4F46E5]">
                <Sparkles size={16} /> {t('promo.hero.badge')}
              </span>
              <h1 className="font-[Space_Grotesk] text-4xl font-bold leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl lg:text-[56px]">
                {t('promo.hero.titleStart')} <span className="text-[#4F46E5]">{t('promo.hero.titleAccent')}</span>{' '}
                {t('promo.hero.titleEnd')}
              </h1>
              <p className="text-lg leading-relaxed text-[#475569]">{t('promo.hero.subtitle')}</p>
              <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                <button
                  onClick={scrollToForm}
                  className="flex h-13 items-center justify-center gap-2 rounded-xl bg-[#FEAE2C] px-8 py-3.5 font-[Space_Grotesk] text-[17px] font-semibold text-[#291800] shadow-sm transition-all hover:bg-[#E59D24] active:scale-[0.98]"
                >
                  {t('promo.hero.ctaPrimary')} <ArrowRight size={20} />
                </button>
              </div>
              <p className="flex items-center gap-2 pt-1 text-sm text-[#475569]">
                <Check size={16} className="text-[#16A34A]" /> {t('promo.hero.trust')}
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <HeroVisual />
            </div>
          </div>
        </section>

        {/* ---------- Benefits ---------- */}
        <section className="bg-white px-5 py-12 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-8 text-center md:mb-14">
              <h2 className="mb-3 font-[Space_Grotesk] text-3xl font-bold text-[#0F172A] sm:text-4xl">
                {t('promo.benefits.title')}
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-[#475569]">{t('promo.benefits.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((item, i) => {
                const Icon = BENEFIT_ICONS[i] || Sparkles
                return (
                  <div
                    key={i}
                    className="group rounded-2xl border border-[#E2E1F0] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#4F46E5]/30 hover:shadow-[0_20px_40px_-20px_rgba(79,70,229,0.4)]"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#4F46E5]/10 text-[#4F46E5] transition-colors group-hover:bg-[#4F46E5] group-hover:text-white">
                      <Icon size={26} />
                    </div>
                    <h3 className="mb-2 font-[Space_Grotesk] text-lg font-semibold text-[#0F172A]">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-[#475569]">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ---------- Stats ---------- */}
        <section className="border-y border-[#E2E1F0] bg-[#F5F4FF] px-5 py-12 md:px-10 md:py-16">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="mb-1 font-[Space_Grotesk] text-4xl font-bold text-[#4F46E5] sm:text-5xl">
                  <StatCounter target={s.target} suffix={s.suffix} />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                  {statLabels[i]?.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Segments ---------- */}
        <section className="bg-white px-5 py-12 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-8 md:mb-12">
              <h2 className="mb-3 font-[Space_Grotesk] text-3xl font-bold text-[#0F172A] sm:text-4xl">
                {t('promo.segments.title')}
              </h2>
              <p className="max-w-2xl text-lg text-[#475569]">{t('promo.segments.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {segments.map((item, i) => {
                const Icon = SEGMENT_ICONS[i] || Users
                const accent = i === 3
                return (
                  <div
                    key={i}
                    className="group relative flex min-h-[210px] overflow-hidden rounded-2xl border border-[#E2E1F0] bg-[#FAFAFF] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)]"
                  >
                    <div className="z-10 flex w-full flex-col justify-center p-8">
                      <h3 className="mb-2 font-[Space_Grotesk] text-2xl font-bold text-[#0F172A]">{item.title}</h3>
                      <p className="mb-6 max-w-sm text-sm leading-relaxed text-[#475569]">{item.desc}</p>
                      <button
                        onClick={scrollToForm}
                        className="flex w-fit items-center gap-1 font-semibold text-[#4F46E5] transition-all hover:gap-2"
                      >
                        {t('promo.segments.cta')} <ArrowRight size={18} />
                      </button>
                    </div>
                    <Icon
                      size={150}
                      className={`pointer-events-none absolute -bottom-6 -right-6 opacity-[0.07] transition-opacity group-hover:opacity-[0.13] ${
                        accent ? 'text-[#FEAE2C]' : 'text-[#4F46E5]'
                      }`}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ---------- Lead form ---------- */}
        <section id="lead" className="scroll-mt-20 border-t border-[#E2E1F0] bg-[#EEF0FF] px-5 py-12 md:px-10 md:py-20">
          <div className="mx-auto max-w-4xl">
            <LeadForm />
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-[#E2E1F0] bg-white px-5 py-10 md:px-10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 text-sm text-[#475569] sm:flex-row">
          <div className="flex items-center gap-2">
            <img src={LOGO} alt="IQmath" className="h-7 w-auto" />
            <span className="font-[Space_Grotesk] text-lg font-bold tracking-tight text-[#1B1F3B]">{t('promo.brand')}</span>
            <span className="ml-2 hidden text-[#94A3B8] sm:inline">— {t('promo.footer.tagline')}</span>
          </div>
          <p>© {new Date().getFullYear()} IQmath.uz. {t('promo.footer.rights')}</p>
        </div>
      </footer>

      {/* scoped animations */}
      <style jsx>{`
        .promo-root {
          font-family: 'Inter', 'Plus Jakarta Sans', sans-serif;
        }
        .promo-hero {
          animation: promoHero 6s ease-in-out infinite;
        }
        @keyframes promoHero {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-14px);
          }
        }
        /* Mobilda tebranish animatsiyasini o'chiramiz — bo'shliq/uzilish taassurotini oldini oladi */
        @media (max-width: 767px) {
          .promo-hero {
            animation: none;
          }
        }
        .h-13 {
          height: 3.25rem;
        }
      `}</style>
    </div>
  )
}

export default MatematikaLanding
