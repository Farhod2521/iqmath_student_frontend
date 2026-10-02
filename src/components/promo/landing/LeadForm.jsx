import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import usePostQuery from '@/hooks/api/usePostQuery'
import { URLS } from '@/constants/url'

// Ariza formasi: leadCreate API ga yuboriladi (reklama UTM parametrlari bilan).

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
    'w-full h-12 px-4 rounded-xl border border-[#DCE3F0] bg-white text-[15px] text-[#0F172A] outline-none transition-shadow focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/15'

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#E3EAF6] bg-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)] md:flex">
      {/* info side */}
      <div className="flex flex-col justify-between bg-[#0F2A6B] p-8 text-white sm:p-10 md:w-5/12">
        <div>
          <h2 className="mb-3 text-2xl font-bold leading-tight sm:text-[28px]">{t('promo.form.title')}</h2>
          <p className="mb-9 text-[15px] leading-relaxed text-white/70">{t('promo.form.subtitle')}</p>
        </div>
        <div>
          <p className="mb-5 text-lg font-bold text-white">{t('promo.form.contactTitle')}</p>
          <div className="space-y-5">
            <a
              href={`tel:${t('promo.form.phone').replace(/\s/g, '')}`}
              className="group flex items-center gap-4 transition-opacity hover:opacity-90"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/30">
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
            <h3 className="mb-2 text-xl font-bold text-[#0F172A]">{t('promo.form.successTitle')}</h3>
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
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] text-[17px] font-semibold text-white shadow-sm transition-all hover:bg-[#1D4ED8] active:scale-[0.98] disabled:opacity-70"
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

export default LeadForm
