// pages/admin/library/[id].js
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import LayoutAdmin from '@/layout/LayoutAdmin'
import HeaderTitle from '@/components/header-title'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useGetQuery } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { FaCoins } from 'react-icons/fa6'
import BuyBookModal from '@/modules/library/modal/BuyBookModal'

// ─── Helpers ───────────────────────────────────────────────────────────────
const API_BASE = 'https://api.iqmath.uz'
const toAbs = (p) => (!p ? null : p.startsWith('http') ? p : `${API_BASE}${p}`)

// ─── InfoRow ───────────────────────────────────────────────────────────────
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-500 mt-0.5">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-[13px] font-semibold text-slate-700 break-words">{value}</p>
    </div>
  </div>
)

// ─── Skeleton ──────────────────────────────────────────────────────────────
const SkeletonDetail = () => (
  <div className="space-y-6 animate-pulse">
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Cover skeleton */}
      <div className="rounded-2xl bg-slate-200 aspect-[3/4] max-h-[420px] w-full" />
      {/* Info skeleton */}
      <div className="pt-2 space-y-4">
        <div className="w-20 h-3 rounded bg-slate-200" />
        <div className="w-3/4 rounded h-7 bg-slate-200" />
        <div className="w-full h-3 rounded bg-slate-100" />
        <div className="w-5/6 h-3 rounded bg-slate-100" />
        <div className="flex gap-2 mt-2">
          <div className="w-24 rounded-lg h-7 bg-slate-100" />
          <div className="w-20 rounded-lg h-7 bg-slate-100" />
        </div>
        <div className="h-px my-2 bg-slate-100" />
        <div className="w-full h-20 rounded bg-slate-100" />
        <div className="w-full mt-4 h-36 bg-slate-200 rounded-2xl" />
        <div className="w-full h-12 bg-slate-200 rounded-xl" />
      </div>
    </div>
  </div>
)

// ─── Main Page ─────────────────────────────────────────────────────────────
const BookDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const { t, i18n } = useTranslation()

  const [imgError, setImgError] = useState(false)
  const [qty, setQty] = useState(1)
  const [qtyInput, setQtyInput] = useState('1')
  const [activeTab, setActiveTab] = useState('info')
  const [buyModalOpen, setBuyModalOpen] = useState(false)

  const [payMethod, setPayMethod] = useState('som') // 'som' | 'coin' | 'score'

  const STATUS_CFG = {
    active: {
      label: t('library.status.active'),
      dot: 'bg-emerald-500',
      text: 'text-emerald-600',
      ring: 'ring-emerald-200',
      bg: 'bg-emerald-50'
    },
    inactive: {
      label: t('library.status.inactive'),
      dot: 'bg-rose-400',
      text: 'text-rose-600',
      ring: 'ring-rose-200',
      bg: 'bg-rose-50'
    },
    draft: {
      label: t('library.status.draft'),
      dot: 'bg-slate-400',
      text: 'text-slate-600',
      ring: 'ring-slate-200',
      bg: 'bg-slate-100'
    }
  }

  const getAudience = (s, ts) => {
    if (s && ts)
      return {
        icon: '🎓',
        label: t('library.audience.both'),
        color: 'text-violet-700 bg-violet-50 border-violet-200'
      }
    if (s) return { icon: '📚', label: t('library.audience.student'), color: 'text-sky-700 bg-sky-50 border-sky-200' }
    if (ts)
      return {
        icon: '👨‍🏫',
        label: t('library.audience.teacher'),
        color: 'text-indigo-700 bg-indigo-50 border-indigo-200'
      }
    return { icon: '📖', label: t('library.audience.general'), color: 'text-slate-500 bg-slate-50 border-slate-200' }
  }

  const { data, isLoading } = useGetQuery({
    key: [KEYS.libraryBook, id],
    url: `${URLS.libraryBooks}${id}/`,
    options: { enabled: !!id }
  })

  const book = data?.data

  const name = i18n.language === 'uz' ? book?.name_uz : book?.name_ru || book?.name || '—'
  const description = i18n.language === 'uz' ? book?.description_uz : book?.description_ru || book?.description || ''
  const category =
    i18n.language === 'uz' ? book?.category?.name_uz : book?.category?.name_ru || book?.category?.name || null
  const status = STATUS_CFG[book?.status] || STATUS_CFG.draft
  const audience = getAudience(book?.for_student, book?.for_teacher)
  const price = parseFloat(book?.price_som) || 0
  const priceCoin = parseFloat(book?.price_coin) || 0
  const priceScore = parseFloat(book?.price_score) || 0
  const isFree = price === 0
  const isDisabled = book?.status === 'inactive'
  const coverSrc = book?.cover_image && !imgError ? toAbs(book.cover_image) : null
  const fileSrc = toAbs(book?.file)
  const totalPrice = price * qty
  const maxQty = book?.quantity ?? 999

  const changeQty = (val) => {
    const n = Math.max(1, Math.min(maxQty, val))
    setQty(n)
    setQtyInput(String(n))
  }

  const handleQtyInput = (e) => {
    const raw = e.target.value
    setQtyInput(raw)
    const n = parseInt(raw, 10)
    if (!isNaN(n)) changeQty(n)
  }

  const handleQtyBlur = () => {
    const n = parseInt(qtyInput, 10)
    changeQty(isNaN(n) || n < 1 ? 1 : n)
  }

  // handleBuy ichida
  const handleBuy = () => {
    setBuyModalOpen(true)
  }

  const options = [
    { icon: '🔒', text: t('library.payment.payment_label') },
    { icon: '✅', text: t('library.payment.guarantee') },
    { icon: '📦', text: t('library.payment.fast_delivery') }
  ]

  // Foydalanuvchi balansiga qarab default tanlash (ixtiyoriy)
  useState(() => {
    if (price > 0) return 'som'
    if (priceCoin > 0) return 'coin'
    return 'score'
  })

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('library.bookDetails')} />

      {/* ── Page container ─────────────────────────────────────────── */}
      <div className="max-w-5xl px-3 py-4 mx-auto sm:px-4 lg:px-6 sm:py-6">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 mb-5 sm:mb-6 text-[13px] font-semibold text-slate-500 hover:text-indigo-600 transition-colors duration-150 group"
        >
          <svg
            className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span className="hidden md:inline">{t('library.backLibrary')}</span>
          <span className="md:hidden">{t('library.back')}</span>
        </button>

        {/* ── States ─────────────────────────────────────────────────── */}
        {isLoading ? (
          <SkeletonDetail />
        ) : !book ? (
          <div className="flex flex-col items-center justify-center py-20 sm:py-28 text-slate-400">
            <svg
              className="w-12 h-12 mb-4 sm:w-14 sm:h-14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <p className="text-[15px] font-semibold text-slate-600">{t('library.empty.title')}</p>
          </div>
        ) : (
          <div className="grid items-start grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
            {/* ════════════════════════════════════════════════════════
                LEFT — Cover (mobile: full width, desktop: sticky)
            ════════════════════════════════════════════════════════ */}
            <div className="space-y-3 lg:sticky lg:top-6">
              {/* Cover image */}
              <div
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-indigo-50
                              w-full
                              aspect-[4/3] sm:aspect-[3/4]
                              max-h-[300px] sm:max-h-[400px] lg:max-h-[460px]"
              >
                {coverSrc ? (
                  <img
                    src={coverSrc}
                    alt={name}
                    className="object-cover w-full h-full"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full gap-3 sm:gap-4">
                    <div className="flex items-center justify-center h-20 rounded-md shadow-xl w-14 sm:w-20 sm:h-28 bg-gradient-to-b from-indigo-400 to-indigo-700">
                      <svg
                        className="w-7 sm:w-9 h-7 sm:h-9 text-white/80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    </div>
                    <p className="text-xs font-medium sm:text-sm text-slate-400">{t('library.empty.subtitle')}</p>
                  </div>
                )}

                {/* Book type badge */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
                  <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-black/40 text-white backdrop-blur-sm">
                    {book.is_offline ? `📚 ${t('library.card.physical')}` : `📄 ${t('library.card.digital')}`}
                  </span>
                </div>

                {/* Status badge */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                  <span
                    className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold ring-1 backdrop-blur-sm ${status.bg} ${status.text} ${status.ring}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                </div>
              </div>

              {/* PDF button */}
              {/* {fileSrc && (
                <a
                  href={fileSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-200 bg-white text-[13px] font-semibold text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-150"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t('library.bookPreview')}
                </a>
              )} */}
            </div>

            {/* ════════════════════════════════════════════════════════
                RIGHT — Info + Buy box
            ════════════════════════════════════════════════════════ */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* Category + Title */}
              <div>
                {category && (
                  <p className="text-[10px] sm:text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-1.5 sm:mb-2">
                    {category}
                  </p>
                )}
                <h1 className="text-xl font-extrabold leading-tight sm:text-2xl text-slate-900">{name}</h1>
                {book.name_ru && book.name_ru !== name && (
                  <p className="text-[12px] sm:text-[13px] text-slate-400 mt-1 italic">{book.name_ru}</p>
                )}
              </div>

              {/* Audience + Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <span
                  className={`inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-[12px] font-semibold px-2 sm:px-2.5 py-1 rounded-lg border ${audience.color}`}
                >
                  {audience.icon} {audience.label}
                </span>
                {book.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center text-[11px] sm:text-[12px] font-semibold px-2 sm:px-2.5 py-1 rounded-lg border bg-indigo-50 text-indigo-600 border-indigo-100"
                  >
                    #{i18n.language === 'uz' ? tag.name_uz : tag.name_ru || tag.name}
                  </span>
                ))}
              </div>

              {/* Tabs */}
              <div className="border-b border-slate-100">
                <div className="flex">
                  {[
                    { key: 'info', label: t('benefitsDescription') },
                    { key: 'details', label: t('infoDetails') }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-3 sm:px-4 py-2 sm:py-2.5 text-[12px] sm:text-[13px] font-semibold border-b-2 transition-all duration-150 ${
                        activeTab === tab.key
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab content */}
              <div className="min-h-[60px] sm:min-h-[80px]">
                {activeTab === 'info' ? (
                  description ? (
                    <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed">{description}</p>
                  ) : (
                    <p className="text-[12px] sm:text-[13px] text-slate-400 italic">
                      {t('library.empty.descriptionNo')}
                    </p>
                  )
                ) : (
                  <div className="divide-y divide-slate-100">
                    <InfoRow
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      }
                      label={t('library.publishDate')}
                      value={
                        book.date
                          ? new Date(book.date).toLocaleDateString('uz-UZ', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : '—'
                      }
                    />
                    <InfoRow
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                          />
                        </svg>
                      }
                      label={t('library.card.available')}
                      value={book.quantity != null ? `${book.quantity} ${t('library.card.quantity')}` : t('unlimited')}
                    />
                    <InfoRow
                      icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                          />
                        </svg>
                      }
                      label={t('library.bookType')}
                      value={
                        book.is_offline
                          ? `📚 ${t('library.card.physical_library')}`
                          : `📄 ${t('library.card.digital_pdf')}`
                      }
                    />
                    {book.created_at && (
                      <InfoRow
                        icon={
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        }
                        label={t('library.extraTime')}
                        value={new Date(book.created_at).toLocaleDateString('uz-UZ', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* ── BUY BOX ────────────────────────────────────────────── */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3.5 sm:p-4 space-y-3 sm:space-y-4">
                {/* Price row */}
                {(priceCoin > 0 || priceScore > 0) && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      {t('library.payment.method')}
                    </p>
                    <div className="flex gap-2">
                      {price > 0 && (
                        <button
                          onClick={() => setPayMethod('som')}
                          className={`flex-1 py-2 px-3 rounded-xl border text-[12px] font-bold transition-all duration-150
            ${
              payMethod === 'som'
                ? 'border-indigo-400 bg-indigo-600 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300'
            }`}
                        >
                          💵 {t('sum')}
                        </button>
                      )}

                      {priceCoin > 0 && (
                        <button
                          onClick={() => setPayMethod('coin')}
                          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-[12px] font-bold transition-all duration-150
            ${
              payMethod === 'coin'
                ? 'border-amber-400 bg-amber-500 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-500 hover:border-amber-300'
            }`}
                        >
                          <FaCoins /> {t('coin')}
                        </button>
                      )}

                      {priceScore > 0 && (
                        <button
                          onClick={() => setPayMethod('score')}
                          className={`flex-1 py-2 px-3 rounded-xl border text-[12px] font-bold transition-all duration-150
            ${
              payMethod === 'score'
                ? 'border-violet-400 bg-violet-600 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-500 hover:border-violet-300'
            }`}
                        >
                          ⭐ {t('ball')}
                        </button>
                      )}
                    </div>
                  </div>
                )}
                {/* Price row — payMethod ga qarab */}
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      {t('price')}
                    </p>

                    {payMethod === 'som' &&
                      (isFree ? (
                        <span className="text-2xl font-extrabold text-emerald-600">{t('free')}</span>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                            {new Intl.NumberFormat('uz-UZ').format(price)}
                          </span>
                          <span className="text-[13px] text-slate-400">
                            {t('currency')} / {t('library.card.quantity')}
                          </span>
                        </div>
                      ))}

                    {payMethod === 'coin' && (
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-amber-500 tabular-nums">
                          {new Intl.NumberFormat('uz-UZ').format(priceCoin)}
                        </span>
                        <span className="flex items-center  gap-2 text-[13px] text-amber-400">
                          <FaCoins /> coin / {t('library.card.quantity')}
                        </span>
                      </div>
                    )}

                    {payMethod === 'score' && (
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-violet-600 tabular-nums">
                          {new Intl.NumberFormat('uz-UZ').format(priceScore)}
                        </span>
                        <span className="text-[13px] text-violet-400">⭐ ball / {t('library.card.quantity')}</span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  {payMethod === 'som' && !isFree && qty > 1 && (
                    <div className="text-right">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        {t('totalPrice')}
                      </p>
                      <span className="text-xl font-extrabold text-indigo-700 tabular-nums">
                        {new Intl.NumberFormat('uz-UZ').format(totalPrice)}{' '}
                        <span className="text-[12px] text-slate-400">{t('currency')}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Quantity selector */}
                {!isFree && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {t('amount')}{' '}
                      {book.quantity != null && (
                        <span className="font-normal normal-case text-slate-400">(max: {book.quantity})</span>
                      )}
                    </p>

                    {/* Controls row — wraps on very small screens */}
                    <div className="flex flex-wrap items-center gap-2">
                      {/* − input + */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          onClick={() => changeQty(qty - 1)}
                          disabled={qty <= 1}
                          className="flex items-center justify-center flex-shrink-0 text-lg font-bold transition-all duration-150 bg-white border w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          −
                        </button>

                        <input
                          type="number"
                          min={1}
                          max={maxQty}
                          value={qtyInput}
                          onChange={handleQtyInput}
                          onBlur={handleQtyBlur}
                          className="w-16 sm:w-20 h-9 sm:h-10 text-center text-[14px] sm:text-[15px] font-bold text-slate-800 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-150 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />

                        <button
                          onClick={() => changeQty(qty + 1)}
                          disabled={qty >= maxQty}
                          className="flex items-center justify-center flex-shrink-0 text-lg font-bold transition-all duration-150 bg-white border w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                      </div>

                      {/* Quick picks */}
                      <div className="flex gap-1">
                        {[5, 10, 20].map(
                          (n) =>
                            (book.quantity == null || n <= book.quantity) && (
                              <button
                                key={n}
                                onClick={() => changeQty(n)}
                                className={`h-9 sm:h-10 px-2.5 sm:px-3 rounded-xl border text-[11px] sm:text-[12px] font-bold transition-all duration-150 ${
                                  qty === n
                                    ? 'border-indigo-400 bg-indigo-600 text-white'
                                    : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300 hover:text-indigo-600'
                                }`}
                              >
                                {n}
                              </button>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Buy button */}
                <button
                  onClick={handleBuy}
                  disabled={isDisabled}
                  className={`
                    w-full py-3 sm:py-3.5 rounded-xl text-[13px] sm:text-[14px] font-bold tracking-wide
                    flex items-center justify-center gap-2 sm:gap-2.5
                    transition-all duration-150 active:scale-[0.99]
                    ${
                      isDisabled
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300'
                    }
                  `}
                >
                  {isDisabled ? (
                    <>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                      {t('notAvailable')}
                    </>
                  ) : (
                    <>
                      <svg
                        className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>

                      <span className="truncate">
                        {isFree
                          ? t('library.payment.free')
                          : payMethod === 'som'
                            ? `${qty} ${t('library.card.quantity')} — ${new Intl.NumberFormat('uz-UZ').format(totalPrice)} ${t('currency')}`
                            : payMethod === 'coin'
                              ? `${qty} ${t('library.card.quantity')} — ${new Intl.NumberFormat('uz-UZ').format(priceCoin * qty)} ${t('coin')}`
                              : `${qty} ${t('library.card.quantity')} — ${new Intl.NumberFormat('uz-UZ').format(priceScore * qty)} ${t('score')}`}
                      </span>
                    </>
                  )}
                </button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 pt-0.5 flex-wrap">
                  {options.map((b) => (
                    <span
                      key={b.text}
                      className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-400 font-medium whitespace-nowrap"
                    >
                      <span>{b.icon}</span>
                      {b.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* END RIGHT */}
          </div>
        )}
      </div>

      <BuyBookModal
        open={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        book={{
          ...book,
          price_som: price,
          price_coin: priceCoin,
          price_score: priceScore
        }}
        onSuccess={(data) => {
          setBuyModalOpen(false)
        }}
      />
    </LayoutAdmin>
  )
}

export default BookDetail
