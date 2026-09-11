import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CreditCard, Calculator, Info, Percent, Star, Zap, Calendar, Wallet, BarChart3 } from 'lucide-react'
import NasiyaWordmark from '@/assets/images/logos/uzumnasiya.png'
import NasiyaIcon from '@/assets/images/logos/uzumlogo.png'

const NASIYA_WORDMARK = NasiyaWordmark.src
const NASIYA_ICON = NasiyaIcon.src

// Vaqtinchalik shablon foizlar — Uzum Nasiya API ulanganda bu yerdagi
// hisob-kitob backend'dan keladigan haqiqiy komissiya/oy to'lovi bilan almashtiriladi.
const NASIYA_TERMS = [
  { months: 3, markupPercent: 0, icon: Zap, labelKey: 'pricing.mostPopular' },
  { months: 6, markupPercent: 6, icon: Calendar, labelKey: 'pricing.nasiya.convenientTerm' },
  { months: 12, markupPercent: 14, icon: Wallet, labelKey: 'pricing.nasiya.bigOpportunity' }
]

const NasiyaInstallmentOption = ({ price }) => {
  const { t } = useTranslation()
  const [method, setMethod] = useState('nasiya')
  const [selectedTerm, setSelectedTerm] = useState(NASIYA_TERMS[0].months)

  const basePrice = Number(price || 0)

  const terms = NASIYA_TERMS.map((term) => {
    const total = Math.round((basePrice * (1 + term.markupPercent / 100)) / 1000) * 1000
    const monthly = Math.round(total / term.months / 1000) * 1000
    return { ...term, total, monthly }
  })

  const activeTerm = terms.find((term) => term.months === selectedTerm) || terms[0]

  return (
    <div className="mb-4">
      {/* Payment method switch */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setMethod('full')}
          className={`flex-1 flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all ${
            method === 'full'
              ? 'bg-gradient-to-r from-[#4C7CF3] to-[#2F5FD0] shadow-sm'
              : 'bg-white dark:bg-[#1F2937]/60 border border-[#E3EAF6] dark:border-[#374151]'
          }`}
        >
          <span className="flex items-center justify-center w-9 h-9 bg-white rounded-lg shrink-0">
            <CreditCard size={16} className="text-[#2A3547]" />
          </span>
          <span className="min-w-0">
            <span className={`block text-sm font-bold truncate ${method === 'full' ? 'text-white' : 'text-[#2A3547] dark:text-white'}`}>
              {t('pricing.nasiya.payFull')}
            </span>
            <span className={`block text-xs truncate ${method === 'full' ? 'text-white/80' : 'text-[#5A6A85] dark:text-gray-400'}`}>
              {t('pricing.nasiya.oneTimeLabel')}
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMethod('nasiya')}
          className={`relative flex-1 flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all ${
            method === 'nasiya'
              ? 'bg-gradient-to-r from-[#4C7CF3] to-[#2F5FD0] shadow-sm'
              : 'bg-white dark:bg-[#1F2937]/60 border border-[#E3EAF6] dark:border-[#374151]'
          }`}
        >
          <span className="flex items-center justify-center w-9 h-9 bg-white rounded-lg shrink-0">
            <img src={NASIYA_ICON} alt="" className="object-contain w-7 h-7" />
          </span>
          <span className="min-w-0">
            <span
              className={`block text-sm font-bold truncate ${method === 'nasiya' ? 'text-white' : 'text-[#2A3547] dark:text-white'}`}
            >
              {t('pricing.nasiya.payInstallment')}
            </span>
            <span
              className={`block text-xs truncate ${method === 'nasiya' ? 'text-white/80' : 'text-[#5A6A85] dark:text-gray-400'}`}
            >
              {t('pricing.nasiya.installmentSubtitle')}
            </span>
          </span>
          {method === 'nasiya' && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold shrink-0">
              <Star size={11} className="fill-current" />
              {t('pricing.nasiya.recommended')}
            </span>
          )}
        </button>
      </div>

      {method === 'full' ? (
        <div className="flex items-center justify-between p-3.5 bg-white dark:bg-[#2A3447] border border-[#EAEFF4] dark:border-[#2A3447] rounded-2xl">
          <span className="text-sm text-[#5A6A85] dark:text-gray-400">{t('pricing.nasiya.oneTimeAmount')}</span>
          <span className="text-xl font-bold text-[#2A3547] dark:text-white">
            {basePrice.toLocaleString()} {t('sum')}
          </span>
        </div>
      ) : (
        <div
          className="p-3.5 dark:!bg-[#1B2438] border border-[#E3EAF6] dark:border-[#2A3447] rounded-2xl sm:p-4"
          style={{
            background:
              'radial-gradient(160px 110px at 0% 0%, #FAF0FE 0%, rgba(250,240,254,0) 100%), linear-gradient(135deg, #E9F0FE 0%, #F3F8FF 45%, #FCFEFE 100%)'
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center h-11 shrink-0">
                <img src={NASIYA_WORDMARK} alt="Uzum Nasiya" className="object-contain w-auto h-10" />
              </span>
              <div>
                <p className="text-sm font-bold leading-tight text-[#2A3547] dark:text-white">
                  {t('pricing.nasiya.title')}
                </p>
                <p className="text-xs text-[#5A6A85] dark:text-gray-400 mt-0.5">{t('pricing.nasiya.subtitle')}</p>
              </div>
            </div>
            <span className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-lg bg-[#EAF1FE] dark:bg-[#2F5FD0]/20 shrink-0">
              <span className="flex items-center justify-center w-5 h-5 text-[#2F5FD0] bg-white rounded-full shrink-0">
                <Percent size={11} />
              </span>
              <span className="leading-tight text-left">
                <span className="block text-xs font-bold text-[#2F5FD0]">0%</span>
                <span className="block text-[10px] text-[#5A6A85] dark:text-gray-400 whitespace-nowrap">
                  {t('pricing.nasiya.noExtraFees')}
                </span>
              </span>
            </span>
          </div>

          {/* Term cards */}
          <div className="grid grid-cols-3 gap-2">
            {terms.map((term) => {
              const isActive = term.months === selectedTerm
              const SubIcon = term.icon
              return (
                <button
                  key={term.months}
                  type="button"
                  onClick={() => setSelectedTerm(term.months)}
                  style={
                    isActive
                      ? { background: 'linear-gradient(to top right, #DDE7FC 0%, #F4F6FE 100%)' }
                      : { background: '#FFFFFF' }
                  }
                  className={`relative flex flex-col rounded-xl border text-center transition-all dark:!bg-[#2A3447] ${
                    isActive
                      ? 'border-[#2459FD] ring-1 ring-[#2459FD] shadow-[0_4px_14px_rgba(36,89,253,0.18)]'
                      : 'border-[#E3EAF6] dark:border-[#374151] hover:border-[#2459FD]/40'
                  }`}
                >
                  {term.markupPercent === 0 && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#2F5FD0] text-white text-[10px] font-bold whitespace-nowrap z-10">
                      {t('pricing.nasiya.noMarkup')}
                    </span>
                  )}
                  <span
                    className={`absolute top-2 right-2 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isActive ? 'border-[#2F5FD0]' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#2F5FD0]" />}
                  </span>

                  <div className="flex flex-col items-center gap-0.5 px-2 pt-3.5 pb-2">
                    <span className="text-xs font-semibold text-[#5A6A85] dark:text-gray-400">
                      {term.months} {t('month')}
                    </span>
                    <span
                      className={`text-base font-extrabold ${isActive ? 'text-[#033AEF]' : 'text-[#2A3547] dark:text-white'}`}
                    >
                      {term.monthly.toLocaleString()}
                    </span>
                    <span className={`text-[10px] ${isActive ? 'text-[#5F86FC]' : 'text-gray-400'}`}>
                      {t('pricing.nasiya.perMonth')}
                    </span>
                  </div>

                  <div
                    className={`flex items-center justify-between px-2 py-1.5 border-t rounded-b-xl ${
                      isActive
                        ? 'border-[#2459FD]/20 bg-white/40'
                        : 'border-[#E3EAF6]/70 dark:border-[#374151] bg-white/40 dark:bg-transparent'
                    }`}
                  >
                    <span
                      className={`flex items-center gap-1 text-[10px] font-medium truncate ${isActive ? 'text-[#0026FD]' : 'text-[#5A6A85] dark:text-gray-400'}`}
                    >
                      <SubIcon size={11} className="shrink-0" />
                      <span className="truncate">{t(term.labelKey)}</span>
                    </span>
                    <BarChart3 size={12} className={`shrink-0 ${isActive ? 'text-[#0026FD]' : 'text-gray-300'}`} />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Total */}
          <div className="flex items-center justify-between gap-3 p-2.5 mt-3 bg-white dark:bg-[#2A3447] border border-[#E3EAF6] dark:border-transparent rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg text-white shrink-0 bg-gradient-to-br from-[#4C7CF3] to-[#2F5FD0]">
                <Calculator size={15} />
              </span>
              <div>
                <span className="flex items-center gap-1 text-sm font-bold text-[#2A3547] dark:text-gray-200">
                  {t('pricing.nasiya.totalPayable')}
                  <Info size={12} className="text-gray-400" />
                </span>
                <p className="text-[11px] text-[#5A6A85] dark:text-gray-400">{t('pricing.nasiya.totalPayableSubtitle')}</p>
              </div>
            </div>
            <span className="text-lg font-bold text-[#2F5FD0] whitespace-nowrap">
              {activeTerm.total.toLocaleString()} {t('sum')}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default NasiyaInstallmentOption
