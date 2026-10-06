import React from 'react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'

const LOGO = 'https://api.iqmath.uz/system/logo/logo.png'

const Logo = ({ small }) => (
  <span className="inline-flex items-center gap-1.5">
    <img src={LOGO} alt="" className={`${small ? 'h-8' : 'h-10'} w-auto object-contain`} />
    <span className={`${small ? 'text-xl' : 'text-[26px]'} font-extrabold tracking-tight text-[#0B1B3F]`}>MATH</span>
  </span>
)

/**
 * Kirish / ro'yxatdan o'tish kartasi: chapda rasmli panel, o'ngda forma.
 * Modal (AuthModal) va alohida sahifa (BannerHeader) ikkalasi ham shuni ishlatadi.
 */
export default function AuthCard({ title, onClose, children }) {
  const { t } = useTranslation()

  return (
    <div className="relative grid w-full max-w-[940px] grid-cols-1 rounded-[24px] bg-white sm:rounded-[28px] shadow-[0_30px_80px_-20px_rgba(15,23,42,0.45)] md:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
      {/* Chap panel (mobilda yashiriladi) */}
      <aside className="relative hidden min-h-[560px] overflow-hidden rounded-l-[28px] bg-[#DCE9FF] md:block">
        <img src="/images/auth-side.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-bottom" />
        <div className="relative p-8">
          <Logo />
          <h2 className="mt-12 text-[32px] font-extrabold leading-[1.15] text-[#0B1B3F]">
            {t('authUi.heroTitle')} <span className="whitespace-nowrap text-[#2563EB]">{t('authUi.heroAccent')}</span>
          </h2>
          <p className="mt-4 max-w-[230px] text-[15px] leading-relaxed text-[#334155]">{t('authUi.heroText')}</p>
        </div>
      </aside>

      {/* O'ng tomon: forma */}
      <div className="relative px-4 pb-6 pt-5 sm:px-10 sm:pb-10 sm:pt-10">
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="absolute right-3 top-3 flex h-10 w-10 sm:right-4 sm:top-4 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white text-[#0F172A] shadow-[0_6px_20px_-6px_rgba(15,23,42,0.35)] transition hover:bg-[#F1F5F9]"
          >
            <X size={22} />
          </button>
        ) : null}

        <div className="mb-5 md:hidden">
          <Logo small />
        </div>
        <h3 className="pr-12 text-[22px] font-extrabold text-[#0B1B3F] sm:text-[28px]">
          {title || t('authUi.title')}
        </h3>
        <p className="mt-1.5 text-sm text-[#64748B] sm:text-[15px]">{t('authUi.subtitle')}</p>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}
