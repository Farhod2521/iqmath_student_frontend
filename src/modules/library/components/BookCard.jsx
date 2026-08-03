// components/BookCard.jsx
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCoins } from 'react-icons/fa6'
import BuyBookModal from '../modal/BuyBookModal'

// ─── BookCard ─────────────────────────────────────────────────────────────
const BookCard = ({ book, onBuy, isPurchased = false }) => {
  const [buyModal, setBuyModal] = useState(false)

  const { t, i18n } = useTranslation()
  const router = useRouter()

  const [imgError, setImgError] = useState(false)

  // ─── Configs ──────────────────────────────────────────────────────────────
  const STATUS_CONFIG = {
    active: {
      label: t('library.status.active'),
      badge: 'bg-emerald-500/10 text-emerald-200 ring-1 ring-emerald-500/20',
      dot: 'bg-emerald-500'
    },
    inactive: {
      label: t('library.status.inactive'),
      badge: 'bg-rose-500/10 text-rose-200 ring-1 ring-rose-500/20',
      dot: 'bg-rose-400'
    },
    draft: {
      label: t('library.status.draft'),
      badge: 'bg-slate-400/10 text-slate-300 ring-1 ring-slate-400/20',
      dot: 'bg-slate-400'
    }
  }

  /**
   * for_student + for_teacher kombinatsiyasi (rasmdan):
   *  true  + true  → "Ikkalasi uchun"
   *  true  + false → "Talaba"
   *  false + true  → "O'qituvchi"
   *  false + false → "Umumiy" (hech qaysi uchun ajratilmagan)
   */
  const getAudience = (for_student, for_teacher) => {
    if (for_student && for_teacher)
      return {
        label: t('library.audience.both'),
        icon: '🎓',
        color: 'text-violet-700 bg-violet-50 border-violet-200'
      }
    if (for_student)
      return { label: t('library.audience.student'), icon: '📚', color: 'text-sky-700 bg-sky-50 border-sky-200' }
    if (for_teacher)
      return {
        label: t('library.audience.teacher'),
        icon: '👨‍🏫',
        color: 'text-indigo-700 bg-indigo-50 border-indigo-200'
      }
    return { label: t('library.audience.general'), icon: '📖', color: 'text-slate-500 bg-slate-50 border-slate-200' }
  }

  const API_BASE = 'https://api.iqmath.uz'
  const toAbsolute = (path) => (!path ? null : path.startsWith('http') ? path : `${API_BASE}${path}`)

  const coverSrc = book.cover_image && !imgError ? toAbsolute(book.cover_image) : null
  const fileSrc = toAbsolute(book.file)

  const name = i18n.language === 'uz' ? book.name_uz : book.name_ru || book.name || t('library.card.no_name')
  const description = i18n.language === 'uz' ? book.description_uz : book.description_ru || book.description || ''
  const category =
    i18n.language === 'uz' ? book.category?.name_uz : book.category?.name_ru || book.category?.name || null
  const status = STATUS_CONFIG[book.status] || STATUS_CONFIG.draft
  const audience = getAudience(book.for_student, book.for_teacher)
  const priceSom = parseFloat(book.price_som) || 0
  const priceCoin = parseFloat(book.price_coin) || 0
  const priceScore = parseFloat(book.price_score) || 0
  const isFree = priceSom === 0
  const isDisabled = book.status === 'inactive'

  const goToDetail = () => {
    router.push(`/dashboard/library/${book.id}`)
  }

  // "Sotib olish" va PDF bosilganda karta navigatsiyasi ishlamasligi uchun
  const stopProp = (e) => e.stopPropagation()

  return (
    <>
      <article
        onClick={goToDetail}
        className="relative flex flex-col overflow-hidden transition-all duration-300 ease-out bg-white border shadow-sm group rounded-2xl border-slate-200/80 hover:shadow-xl hover:-translate-y-1"
      >
        {/* ── COVER ──────────────────────────────────────────────────── */}
        <div className="relative flex-shrink-0 h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-indigo-50">
          {coverSrc ? (
            <img
              src={coverSrc}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full gap-3">
              <div className="w-14 h-[68px] rounded bg-gradient-to-b from-indigo-400 to-indigo-600 shadow-md flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white/80"
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
              <p className="text-[11px] text-slate-400 text-center px-6 line-clamp-2 font-medium leading-relaxed">
                {name}
              </p>
            </div>
          )}

          {/* Bottom scrim */}
          <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none bg-gradient-to-t from-black/50 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold backdrop-blur-sm ${status.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status.dot}`} />
              {status.label}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-black/35 text-white backdrop-blur-sm flex-shrink-0">
              {book.is_offline ? `📚 ${t('library.offlineBooks')}` : `📄 ${t('library.onlineBooks')}`}
            </span>
          </div>

          {/* Bottom of cover: category + date */}
          <div className="absolute bottom-0 inset-x-0 px-3 pb-2.5 flex items-end justify-between gap-2 pointer-events-none">
            {category && (
              <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest truncate">{category}</span>
            )}
            {book.date && (
              <span className="text-[10px] text-white/70 flex-shrink-0 ml-auto">
                {new Date(book.date).toLocaleDateString('uz-UZ')}
              </span>
            )}
          </div>
          {/* Hover overlay — "Batafsil ko'rish" */}
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-indigo-900/0 group-hover:bg-indigo-900/20">
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[12px] font-bold text-indigo-700 shadow-md">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              {t('viewDetails')}
            </span>
          </div>
        </div>

        {/* ── BODY ───────────────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 px-4 pt-3.5 pb-3 gap-2">
          {/* Title */}
          <h3 className="text-[14px] font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-indigo-700 transition-colors duration-200">
            {name}
          </h3>

          {/* Description */}
          {description && <p className="text-[12px] text-slate-400 leading-relaxed line-clamp-2">{description}</p>}

          {/* Tags */}
          {book.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {book.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className="px-1.5 py-0.5 text-[10px] font-semibold rounded border bg-indigo-50 text-indigo-600 border-indigo-100"
                >
                  #{i18n.language === 'uz' ? tag.name_uz : tag.name_ru || tag.name}
                </span>
              ))}
              {book.tags.length > 3 && (
                <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded border bg-slate-50 text-slate-400 border-slate-100">
                  +{book.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Audience + Quantity */}
          <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-1">
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${audience.color}`}
            >
              {audience.icon} {audience.label}
            </span>

            {book.quantity != null && (
              <span className="inline-flex cursor-pointer items-center gap-1 text-[11px] text-slate-400 border border-slate-100 bg-slate-50 px-2 py-0.5 rounded-md font-medium">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                {book.quantity} {t('library.card.quantity')}
              </span>
            )}
          </div>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-slate-100 bg-slate-50/60">
          {/* Price */}
          {/* Price */}
          <div className="flex items-center flex-wrap min-w-0 gap-1.5">
            {isFree ? (
              <span className="text-sm font-bold text-emerald-600">{t('library.card.free')}</span>
            ) : (
              <>
                {/* So'm */}
                {priceSom > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                    <span className="text-[13px] font-extrabold text-slate-800 tabular-nums leading-none">
                      {new Intl.NumberFormat('uz-UZ').format(priceSom)}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-none">{t('library.card.currency')}</span>
                  </span>
                )}

                {/* Coin */}
                {priceCoin > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200">
                    <span className="text-[13px] font-extrabold text-amber-600 tabular-nums leading-none">
                      {new Intl.NumberFormat('uz-UZ').format(priceCoin)}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-none lowercase">{t('coin')}</span>
                  </span>
                )}

                {/* Score / Ball */}
                {priceScore > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-violet-50 border border-violet-200">
                    <span className="text-[13px] font-extrabold text-violet-600 tabular-nums leading-none">
                      {new Intl.NumberFormat('uz-UZ').format(priceScore)}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-none lowercase">{t('ball')}</span>
                  </span>
                )}
              </>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* View PDF */}
            {/* {fileSrc && (
              <a
                href={fileSrc}
                target="_blank"
                onClick={stopProp}
                rel="noopener noreferrer"
                title={t('library.card.view')}
                className="flex items-center justify-center w-8 h-8 transition-all duration-150 bg-white border rounded-lg border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </a>
            )} */}

            {/* Buy — allaqachon sotib olingan bo'lsa o'rniga belgi chiqadi */}
            {isPurchased ? (
              <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 select-none">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {t('library.card.purchased')}
              </span>
            ) : (
              <button
                onClick={(e) => {
                  stopProp(e)
                  setBuyModal(true)
                }}
                disabled={isDisabled}
                className={`
              flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-bold
              transition-all duration-150 active:scale-95 select-none
              ${
                isDisabled
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200'
              }
            `}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                {isDisabled ? t('library.card.unavailable') : t('library.card.buy')}
              </button>
            )}
          </div>
        </div>
      </article>
      <BuyBookModal
        open={buyModal}
        onClose={() => setBuyModal(false)}
        book={book}
        onSuccess={(result) => onBuy(result)}
      />
    </>
  )
}

export default BookCard
