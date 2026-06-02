// components/BuyBookModal.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
// import { apiInstance } from '@/services/api' // o'zingizning api instance
import SimpleModal from '@/components/modal/simple-modal'
import { usePostQuery } from '@/hooks'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { request } from '@/services/api'
import { FaCoins } from 'react-icons/fa6'
import { KEYS } from '@/constants/key'

// ─── Step components ────────────────────────────────────────────────────────

const API_BASE = 'https://api.iqmath.uz'
const toAbs = (p) => (!p ? null : p.startsWith('http') ? p : `${API_BASE}${p}`)

/** Animated stepper dot */
const StepDot = ({ active, done }) => (
  <div
    className={`w-2 h-2 rounded-full transition-all duration-300 ${
      done ? 'bg-indigo-600' : active ? 'bg-indigo-400 scale-125' : 'bg-slate-200'
    }`}
  />
)

/** Payment method pill */
const PayPill = ({ method, selected, price, label, emoji, colorCls, onSelect, disabled }) => (
  <button
    type="button"
    onClick={() => !disabled && onSelect(method)}
    disabled={disabled || price === 0}
    className={`
      flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 text-[12px] font-bold
      transition-all duration-200 select-none
      ${
        selected
          ? `${colorCls.border} ${colorCls.bg} ${colorCls.text} shadow-sm scale-[1.03]`
          : price === 0
            ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed'
            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'
      }
    `}
  >
    <span className="text-xl leading-none">{emoji}</span>
    <span>{label}</span>
    {price > 0 && (
      <span className={`text-[11px] font-extrabold tabular-nums ${selected ? colorCls.text : 'text-slate-600'}`}>
        {new Intl.NumberFormat('uz-UZ').format(price)}
      </span>
    )}
    {price === 0 && <span className="text-[10px] text-slate-300">—</span>}
  </button>
)

// ─── Main Modal ─────────────────────────────────────────────────────────────

const purchaseAPI = {
  create: async (payload) => {
    const { data } = await request.post('/api/v1/book/purchase/', payload)
    return data
  }
}

const BuyBookModal = ({ open, onClose, book, onSuccess }) => {
  const { t, i18n } = useTranslation()

  // ── State ──
  const [payMethod, setPayMethod] = useState('som')
  const [qty, setQty] = useState(1)
  const [qtyInput, setQtyInput] = useState('1')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryPhone, setDeliveryPhone] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null) // success response

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      setPayMethod(defaultMethod())
      setQty(1)
      setQtyInput('1')
      setDeliveryAddress('')
      setDeliveryPhone('')
      setError(null)
      setResult(null)
    }
  }, [open, book])

  if (!book) return null

  // ── Derived ──
  const name = i18n.language === 'uz' ? book.name_uz : book.name_ru || book.name || '—'
  const coverSrc = book.cover_image ? toAbs(book.cover_image) : null
  const priceSom = parseFloat(book.price_som) || 0
  const priceCoin = parseFloat(book.price_coin) || 0
  const priceScore = parseFloat(book.price_score) || 0
  const maxQty = book.quantity ?? 999
  const isFree = priceSom === 0 && priceCoin === 0 && priceScore === 0

  const unitPrice = payMethod === 'coin' ? priceCoin : payMethod === 'score' ? priceScore : priceSom

  const totalPrice = unitPrice * qty

  function defaultMethod() {
    if (priceSom > 0) return 'som'
    if (priceCoin > 0) return 'coin'
    if (priceScore > 0) return 'score'
    return 'som'
  }

  // ── Qty helpers ──
  const changeQty = (val) => {
    const n = Math.max(1, Math.min(maxQty, val))
    setQty(n)
    setQtyInput(String(n))
  }
  const handleQtyInput = (e) => {
    setQtyInput(e.target.value)
    const n = parseInt(e.target.value, 10)
    if (!isNaN(n)) changeQty(n)
  }
  const handleQtyBlur = () => {
    const n = parseInt(qtyInput, 10)
    changeQty(isNaN(n) || n < 1 ? 1 : n)
  }

  const createMutation = useMutation({
    mutationFn: purchaseAPI.create,
    onSuccess: (data) => {
      toast.success(data?.detail || t('library.purchase.success_label'))
      queryClient.invalidateQueries({ queryKey: [KEYS.libraryBooks] }) // library qayta yuklanadi
      onSuccess?.(data) // tashqariga ham chiqarish (ixtiyoriy)
      onClose() // modalni yopish
    },
    onError: (err) => {
      const msg = err?.response?.data?.detail || err?.response?.data?.message
      setError(msg)
    }
  })

  // ── Submit ──
  // const handleBuy = async () => {
  //   setError(null)
  //   setLoading(true)
  //   try {
  //     const res = await apiInstance.post('/book/purchase/', {
  //       book_id: book.id,
  //       payment_method: isFree ? 'som' : payMethod,
  //       quantity: qty
  //     })
  //     setResult(res.data)
  //     onSuccess?.(res.data)
  //   } catch (err) {
  //     const msg = err?.response?.data?.detail || err?.response?.data?.message || t('library.purchase.error')
  //     setError(msg)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const handleSubmit = async () => {
    if (book?.is_offline) {
      if (deliveryPhone.length !== 9) {
        setError("Telefon raqamini to'liq kiriting")
        return
      }

      if (!deliveryAddress.trim()) {
        setError('Yetkazib berish manzilini kiriting')
        return
      }
    }

    const payload = {
      book_id: book.id,
      payment_method: isFree ? 'som' : payMethod,
      quantity: qty,
      ...(book?.is_offline && {
        delivery_address: deliveryAddress,
        delivery_phone: `+998${deliveryPhone}`
      })
    }

    createMutation.mutate(payload)
  }

  // ─── Color configs ──────────────────────────────────────────────────────
  const PAY_COLORS = {
    som: { border: 'border-indigo-400', bg: 'bg-indigo-50', text: 'text-indigo-700' },
    coin: { border: 'border-amber-400', bg: 'bg-amber-50', text: 'text-amber-700' },
    score: { border: 'border-violet-400', bg: 'bg-violet-50', text: 'text-violet-700' }
  }

  // ─── Success screen ─────────────────────────────────────────────────────
  if (result) {
    const fileSrc = toAbs(result.file)
    return (
      <SimpleModal open={open} onClose={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 p-6 text-center"
        >
          {/* Success icon */}
          <div className="flex items-center justify-center w-16 h-16 border-2 rounded-full bg-emerald-50 border-emerald-200">
            <svg
              className="w-8 h-8 text-emerald-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <div>
            <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest mb-1">
              {t('library.purchase.success_label')}
            </p>
            <h3 className="text-[16px] font-extrabold text-slate-800 leading-snug">
              {i18n.language === 'uz' ? result.book_name_uz : result.book_name_ru}
            </h3>
          </div>

          {/* Receipt */}
          <div className="w-full rounded-xl bg-slate-50 border border-slate-100 divide-y divide-slate-100 text-left text-[12px]">
            {[
              { label: t('library.purchase.quantity'), value: `${result.quantity} ${t('library.card.quantity')}` },
              {
                label: t('library.purchase.unit_price'),
                value: `${new Intl.NumberFormat('uz-UZ').format(result.unit_price)}`
              },
              {
                label: t('library.purchase.paid'),
                value: `${new Intl.NumberFormat('uz-UZ').format(result.paid_amount)} ${
                  result.payment_method === 'coin' ? (
                    <FaCoins />
                  ) : result.payment_method === 'score' ? (
                    '⭐'
                  ) : (
                    t('library.card.currency')
                  )
                }`
              },
              { label: t('library.purchase.date'), value: result.purchased_at }
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-3 py-2.5 gap-2">
                <span className="font-medium text-slate-400">{label}</span>
                <span className="font-bold text-right text-slate-700">{value}</span>
              </div>
            ))}
          </div>

          {/* Remaining balance */}
          {result.remaining_balance && (
            <div className="w-full">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-left">
                {t('library.purchase.balance')}
              </p>
              <div className="flex gap-2">
                {[
                  {
                    key: 'som',
                    emoji: '💵',
                    val: result.remaining_balance.som,
                    color: 'bg-slate-100 text-slate-700 border-slate-200'
                  },
                  {
                    key: 'coin',
                    emoji: <FaCoins />,
                    val: result.remaining_balance.coin,
                    color: 'bg-amber-50 text-amber-700 border-amber-200'
                  },
                  {
                    key: 'score',
                    emoji: '⭐',
                    val: result.remaining_balance.score,
                    color: 'bg-violet-50 text-violet-700 border-violet-200'
                  }
                ].map(({ key, emoji, val, color }) => (
                  <div
                    key={key}
                    className={`flex-1 flex flex-col items-center py-2 rounded-lg border text-[11px] font-bold ${color}`}
                  >
                    <span className="text-base leading-none mb-0.5">{emoji}</span>
                    <span className="tabular-nums">{new Intl.NumberFormat('uz-UZ').format(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex w-full gap-2 pt-1">
            {fileSrc && (
              <a
                href={fileSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 text-[12px] font-bold hover:bg-indigo-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                {t('library.purchase.download')}
              </a>
            )}
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-[12px] font-bold hover:bg-slate-200 transition-colors"
            >
              {t('close')}
            </button>
          </div>
        </motion.div>
      </SimpleModal>
    )
  }

  // ─── Purchase form ──────────────────────────────────────────────────────
  return (
    <SimpleModal open={open} onClose={onClose}>
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
          <div className="flex items-center min-w-0 gap-3">
            {coverSrc ? (
              <img src={coverSrc} alt={name} className="flex-shrink-0 object-cover w-10 h-12 rounded-lg shadow-sm" />
            ) : (
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-12 rounded-lg shadow-sm bg-gradient-to-b from-indigo-400 to-indigo-600">
                <svg
                  className="w-5 h-5 text-white/80"
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
            )}
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                {t('library.payment.title')}
              </p>
              <h3 className="text-[14px] font-extrabold text-slate-800 leading-snug line-clamp-1">{name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center flex-shrink-0 transition-colors rounded-lg w-7 h-7 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {/* Payment method */}
          {!isFree && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                {t('library.payment.method')}
              </p>
              <div className="flex gap-2">
                <PayPill
                  method="som"
                  price={priceSom}
                  emoji="💵"
                  label="So'm"
                  selected={payMethod === 'som'}
                  colorCls={PAY_COLORS.som}
                  onSelect={setPayMethod}
                />
                <PayPill
                  method="coin"
                  price={priceCoin}
                  emoji={<FaCoins />}
                  label={t('coin')}
                  selected={payMethod === 'coin'}
                  colorCls={PAY_COLORS.coin}
                  onSelect={setPayMethod}
                />
                <PayPill
                  method="score"
                  price={priceScore}
                  emoji="⭐"
                  label="Ball"
                  selected={payMethod === 'score'}
                  colorCls={PAY_COLORS.score}
                  onSelect={setPayMethod}
                />
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              {t('amount')}
              {book.quantity != null && (
                <span className="ml-1 font-normal normal-case text-slate-300">(max: {book.quantity})</span>
              )}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeQty(qty - 1)}
                disabled={qty <= 1}
                className="flex items-center justify-center text-lg font-bold transition-all bg-white border w-9 h-9 rounded-xl border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                -
              </button>

              <input
                type="number"
                min={1}
                max={maxQty}
                value={qtyInput}
                onChange={handleQtyInput}
                onBlur={handleQtyBlur}
                className="w-16 h-9 text-center text-[14px] font-bold text-slate-800 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />

              <button
                onClick={() => changeQty(qty + 1)}
                disabled={qty >= maxQty}
                className="flex items-center justify-center text-lg font-bold transition-all bg-white border w-9 h-9 rounded-xl border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                +
              </button>

              {/* Quick picks */}
              <div className="flex gap-1 ml-1">
                {[5, 10, 20].map(
                  (n) =>
                    (book.quantity == null || n <= book.quantity) && (
                      <button
                        key={n}
                        onClick={() => changeQty(n)}
                        className={`h-9 px-2.5 rounded-xl border text-[11px] font-bold transition-all ${
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

          {/* Order summary */}
          <div className="rounded-xl bg-slate-50 border border-slate-100 divide-y divide-slate-100 text-[12px]">
            <div className="flex items-center justify-between px-3 py-2.5">
              <span className="font-medium text-slate-400">{t('price')}</span>
              <span className="flex items-center gap-2 font-bold text-slate-700">
                {new Intl.NumberFormat('uz-UZ').format(unitPrice)}{' '}
                {payMethod === 'coin' ? <FaCoins /> : payMethod === 'score' ? '⭐' : t('library.card.currency')}
              </span>
            </div>
            <div className="flex items-center justify-between px-3 py-2.5">
              <span className="font-medium text-slate-400">{i18n.language === 'uz' ? 'Soni' : 'Kоличество'}</span>
              <span className="font-bold text-slate-700">
                {qty} {t('library.card.quantity')}
              </span>
            </div>
            <div className="flex items-center justify-between px-3 py-3">
              <span className="font-bold text-slate-600">{t('totalPrice')}</span>
              <span
                className={`flex items-center gap-2 text-[15px] font-extrabold tabular-nums ${
                  payMethod === 'coin'
                    ? 'text-amber-600'
                    : payMethod === 'score'
                      ? 'text-violet-600'
                      : 'text-indigo-700'
                }`}
              >
                {isFree ? (
                  <span className="text-emerald-600">{t('free')}</span>
                ) : (
                  <>
                    {new Intl.NumberFormat('uz-UZ').format(totalPrice)}{' '}
                    {payMethod === 'coin' ? <FaCoins /> : payMethod === 'score' ? '⭐' : t('library.card.currency')}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Delivery info */}
          {book?.is_offline && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Yetkazib berish ma'lumotlari
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block mb-1 text-xs font-medium text-slate-600">Telefon raqam</label>

                  <div className="flex overflow-hidden border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-indigo-300 focus-within:border-indigo-400">
                    <div className="flex items-center px-3 text-sm font-semibold border-r bg-slate-50 text-slate-600 border-slate-200">
                      +998
                    </div>

                    <input
                      type="tel"
                      value={deliveryPhone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 9)
                        setDeliveryPhone(value)
                      }}
                      placeholder="90 123 45 67"
                      className="w-full px-3 py-2 text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-xs font-medium text-slate-600">Manzil</label>
                  <textarea
                    rows={3}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Toshkent shahri, Chilonzor tumani..."
                    className="w-full px-3 py-2 text-sm border resize-none border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-[12px] text-rose-600 font-semibold"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex gap-2.5 px-5 pb-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-[13px] font-bold hover:bg-slate-50 transition-colors"
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-bold transition-all
              ${
                loading
                  ? 'bg-indigo-400 text-white cursor-wait'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 active:scale-[0.98]'
              }`}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                {t('library.purchase.processing')}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                {isFree ? t('library.payment.free') : t('library.card.buy')}
              </>
            )}
          </button>
        </div>
      </div>
    </SimpleModal>
  )
}

export default BuyBookModal
