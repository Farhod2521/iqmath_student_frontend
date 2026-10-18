import React from 'react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import AuthMascot from './AuthMascot'

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
      <aside className="relative hidden min-h-[560px] overflow-hidden rounded-l-[28px] bg-[#EAF2FF] md:block">
        {/* Fon bezaklari: yumshoq doiralar va pastki to'lqinlar */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 348 500"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <circle cx="305" cy="210" r="108" fill="#F4F8FF" />
          <circle cx="28" cy="318" r="76" fill="#DCE8FF" opacity="0.7" />
          <path d="M0 432 Q95 395 205 438 T348 415 L348 500 L0 500 Z" fill="#DCE8FF" opacity="0.85" />
          <path d="M0 462 Q174 432 348 465 L348 500 L0 500 Z" fill="#CFE0FF" opacity="0.75" />
        </svg>
        {[
          ['∑', 'left-[26px] top-[51%] font-serif text-[22px]'],
          ['π', 'right-[26px] top-[55%] font-serif text-[22px]'],
          ['√x', 'left-[18px] bottom-[25%] text-[15px] font-semibold'],
          ['+', 'right-[26px] bottom-[19%] text-[20px] font-semibold']
        ].map(([sym, pos]) => (
          <span key={sym} className={`pointer-events-none absolute text-[#93B4F8] ${pos}`}>
            {sym}
          </span>
        ))}
        {/* Animatsion boyo‘g‘li: ko‘zlari sichqonchaga qaraydi, bosilsa gapiradi, parolda ko‘zini yopadi */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center">
          <AuthMascot width={250} />
        </div>
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
