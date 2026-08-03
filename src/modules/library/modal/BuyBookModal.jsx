// components/BuyBookModal.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SimpleModal from '@/components/modal/simple-modal'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { request } from '@/services/api'
import { FaCoins } from 'react-icons/fa6'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useScoreStore } from '@/store'

// ─── Step components ────────────────────────────────────────────────────────

const API_BASE = 'https://api.iqmath.uz'
const toAbs = (p) => (!p ? null : p.startsWith('http') ? p : `${API_BASE}${p}`)
const nf = (n) => new Intl.NumberFormat('uz-UZ').format(Number(n) || 0)

/** Payment method pill */
const PayPill = ({ method, selected, price, label, emoji, colorCls, onSelect, disabled, balance, enough }) => (
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
        {nf(price)}
      </span>
    )}
    {price === 0 && <span className="text-[10px] text-slate-300">—</span>}

    {/* Balans holati */}
    {price > 0 && balance != null && (
      <span
        className={`text-[10px] font-semibold tabular-nums leading-none ${
          enough ? 'text-emerald-500' : 'text-rose-500'
        }`}
      >
        {enough ? '✓' : '✕'} {nf(balance)}
      </span>
    )}
  </button>
)

// ─── Main Modal ─────────────────────────────────────────────────────────────

const purchaseAPI = {
  create: async (payload) => {
    const { data } = await request.post(URLS.bookPurchase, payload)
    return data
  },
  // Balans yetmaganda — Multicard invoysini yaratadi va checkout_url qaytaradi
  initiatePayment: async (payload) => {
    const { data } = await request.post(URLS.bookInitiatePayment, payload)
    return data
  }
}

const BuyBookModal = ({ open, onClose, book, onSuccess }) => {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const { scoreData } = useScoreStore()

  // ── State ──
  const [payMethod, setPayMethod] = useState('som')
  const [qty, setQty] = useState(1)
  const [qtyInput, setQtyInput] = useState('1')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryPhone, setDeliveryPhone] = useState('')

  const [error, setError] = useState(null)
  const [result, setResult] = useState(null) // success response
  // Backend "balans yetarli emas" deb qaytarganda to'ldiriladi
  const [shortageInfo, setShortageInfo] = useState(null)
  const [redirecting, setRedirecting] = useState(false)
  const [pendingTx, setPendingTx] = useState(null) // kutilayotgan to'lov transaction_id si
  const [checking, setChecking] = useState(false)

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
      setShortageInfo(null)
      setRedirecting(false)
      setPendingTx(null)
      setChecking(false)
    }
    // `book` obyekti har renderda qayta yaratilishi mumkin — shuning uchun id bo'yicha kuzatamiz
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, book?.id])

  // Usul almashtirilganda eski xatolikni tozalaymiz
  useEffect(() => {
    setError(null)
    setShortageInfo(null)
  }, [payMethod, qty])

  // To'lov sahifasi yangi tabda ochilgach — holatni har 5 soniyada tekshirib turamiz
  useEffect(() => {
    if (!open || !redirecting || !pendingTx) return

    const timer = setInterval(() => {
      checkPaymentStatus({ silent: true })
    }, 5000)

    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, redirecting, pendingTx])

  // ── Derived ──
  // Eslatma: `if (!book) return null` barcha hooklardan keyin turadi (hooks qoidasi),
  // shu sababli bu yerda optional chaining ishlatilgan.
  const name = i18n.language === 'uz' ? book?.name_uz : book?.name_ru || book?.name || '—'
  const coverSrc = book?.cover_image ? toAbs(book.cover_image) : null
  const priceSom = parseFloat(book?.price_som) || 0
  const priceCoin = parseFloat(book?.price_coin) || 0
  const priceScore = parseFloat(book?.price_score) || 0
  const maxQty = book?.quantity ?? 999
  const isFree = priceSom === 0 && priceCoin === 0 && priceScore === 0

  const unitPrice = payMethod === 'coin' ? priceCoin : payMethod === 'score' ? priceScore : priceSom

  const totalPrice = unitPrice * qty
  // Karta orqali to'lanadigan summa — har doim to'liq so'm narxi
  const payableSom = priceSom * qty

  // ── Balans (LayoutAdmin `my-score` dan yuklab, store ga yozadi) ──
  const balances = {
    som: Number(scoreData?.sum) || 0,
    coin: Number(scoreData?.coin) || 0,
    score: Number(scoreData?.score) || 0
  }
  // Balans hali yuklanmagan bo'lsa (store bo'sh / yuklanmoqda) — noto'g'ri
  // "yetarli emas" ko'rsatmaymiz, qarorni backendga qoldiramiz.
  const balanceKnown = !!scoreData?.student && !scoreData?.isLoading
  const currentBalance = balances[payMethod] ?? 0
  const hasEnough = isFree || !balanceKnown || totalPrice <= currentBalance
  // Balans yetmaydi — karta orqali to'lash rejimiga o'tamiz
  const needsCardPayment = !isFree && (!hasEnough || !!shortageInfo) && payableSom > 0

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

  // ── Yetkazib berish maydonlarini tekshirish ──
  const validateDelivery = () => {
    if (!book?.is_offline) return true

    if (deliveryPhone.length !== 9) {
      setError(t('library.purchase.phone_invalid'))
      return false
    }
    if (!deliveryAddress.trim()) {
      setError(t('library.purchase.address_required'))
      return false
    }
    return true
  }

  const deliveryPayload = () =>
    book?.is_offline
      ? {
          delivery_address: deliveryAddress,
          delivery_phone: `+998${deliveryPhone}`
        }
      : {}

  // ── Balansdan sotib olish ──
  const createMutation = useMutation({
    mutationFn: purchaseAPI.create,
    onSuccess: (data) => {
      finishPurchase(data)
    },
    onError: (err) => {
      const data = err?.response?.data
      // Balans yetmadi — foydalanuvchiga karta orqali to'lashni taklif qilamiz
      if (data?.code === 'insufficient_balance') {
        setShortageInfo({
          required: data.required,
          balance: data.balance,
          shortage: data.shortage,
          payableSom: data.payable_som
        })
        setError(null)
        return
      }
      setError(data?.detail || data?.message || t('library.purchase.error'))
    }
  })

  // ── To'lov muvaffaqiyatli yakunlangandagi umumiy ish ──
  const finishPurchase = (data) => {
    toast.success(data?.detail || t('library.purchase.success_label'))
    queryClient.invalidateQueries({ queryKey: [KEYS.libraryBooks] })
    queryClient.invalidateQueries({ queryKey: [KEYS.bookMyPurchases] })
    queryClient.invalidateQueries({ queryKey: [KEYS.bookPayments] })
    queryClient.invalidateQueries({ queryKey: [KEYS.coins] })
    onSuccess?.(data)
    onClose()
  }

  // ── To'lov holatini backenddan tekshirish ──
  const checkPaymentStatus = async ({ silent = true } = {}) => {
    if (!pendingTx) return false
    if (!silent) setChecking(true)

    try {
      const { data } = await request.get(URLS.bookPayments, { params: { transaction_id: pendingTx } })

      if (data?.status === 'success') {
        finishPurchase(data)
        return true
      }

      if (!silent) {
        if (data?.status === 'failed') toast.error(t('library.purchase.payment_failed'))
        else toast(t('library.purchase.payment_pending'))
      }
    } catch (err) {
      if (!silent) toast.error(t('library.purchase.error'))
    } finally {
      if (!silent) setChecking(false)
    }

    return false
  }

  // ── Karta orqali to'lash (Multicard) ──
  const paymentMutation = useMutation({
    mutationFn: purchaseAPI.initiatePayment,
    onSuccess: (data) => {
      const checkoutUrl = data?.checkout_url || data?.payment_data?.data?.checkout_url

      if (!checkoutUrl) {
        setError(t('library.purchase.checkout_url_missing'))
        return
      }

      setPendingTx(data?.transaction_id || null)
      setRedirecting(true)
      queryClient.invalidateQueries({ queryKey: [KEYS.bookPayments] })

      // Yangi oynada ochamiz; brauzer bloklasa — shu oynada yo'naltiramiz
      const win = window.open(checkoutUrl, '_blank', 'noopener,noreferrer')
      if (!win) window.location.href = checkoutUrl
    },
    onError: (err) => {
      const data = err?.response?.data
      setError(data?.detail || data?.error || data?.message || t('library.purchase.error'))
    }
  })

  // react-query v4 da `isLoading`, v5 da `isPending` — ikkalasini ham qo'llab-quvvatlaymiz
  const isBusy = (m) => m.isLoading || m.isPending
  const loading = isBusy(createMutation) || isBusy(paymentMutation)

  // ── Submit ──
  const handleSubmit = () => {
    setError(null)
    if (!validateDelivery()) return

    createMutation.mutate({
      book_id: book.id,
      payment_method: isFree ? 'som' : payMethod,
      quantity: qty,
      ...deliveryPayload()
    })
  }

  const handleCardPayment = () => {
    setError(null)
    if (!validateDelivery()) return

    paymentMutation.mutate({
      book_id: book.id,
      quantity: qty,
      ...deliveryPayload()
    })
  }

  // ─── Color configs ──────────────────────────────────────────────────────
  const PAY_COLORS = {
    som: { border: 'border-indigo-400', bg: 'bg-indigo-50', text: 'text-indigo-700' },
    coin: { border: 'border-amber-400', bg: 'bg-amber-50', text: 'text-amber-700' },
    score: { border: 'border-violet-400', bg: 'bg-violet-50', text: 'text-violet-700' }
  }

  const METHOD_LABEL = {
    som: t('sum'),
    coin: t('coin'),
    score: t('ball')
  }

  if (!book) return null

  // ─── To'lov sahifasiga yo'naltirilgan ekran ──────────────────────────────
  if (redirecting) {
    return (
      <SimpleModal open={open} onClose={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 p-6 text-center"
        >
          <div className="flex items-center justify-center w-16 h-16 border-2 rounded-full bg-indigo-50 border-indigo-200">
            <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
          </div>

          <div>
            <h3 className="text-[16px] font-extrabold text-slate-800 leading-snug mb-1">
              {t('library.purchase.redirect_title')}
            </h3>
            <p className="text-[12px] text-slate-500 leading-relaxed">{t('library.purchase.redirect_hint')}</p>
          </div>

          <div className="w-full rounded-xl bg-slate-50 border border-slate-100 text-left text-[12px] divide-y divide-slate-100">
            <div className="flex items-center justify-between px-3 py-2.5 gap-2">
              <span className="font-medium text-slate-400">{t('library.payment.title')}</span>
              <span className="font-bold text-right text-slate-700 line-clamp-1">{name}</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2.5 gap-2">
              <span className="font-medium text-slate-400">{t('totalPrice')}</span>
              <span className="text-[14px] font-extrabold text-indigo-700 tabular-nums">
                {nf(payableSom)} {t('library.card.currency')}
              </span>
            </div>
          </div>

          <div className="flex w-full gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-[12px] font-bold hover:bg-slate-200 transition-colors"
            >
              {t('close')}
            </button>
            <button
              onClick={() => checkPaymentStatus({ silent: false })}
              disabled={checking || !pendingTx}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {checking && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              )}
              {checking ? t('library.purchase.processing') : t('library.purchase.check_payment')}
            </button>
          </div>
        </motion.div>
      </SimpleModal>
    )
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
                value: `${nf(result.unit_price)}`
              },
              {
                label: t('library.purchase.paid'),
                value: `${nf(result.paid_amount)} ${
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
                    <span className="tabular-nums">{nf(val)}</span>
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
                  balance={balanceKnown ? balances.som : null}
                  enough={priceSom * qty <= balances.som}
                />
                <PayPill
                  method="coin"
                  price={priceCoin}
                  emoji={<FaCoins />}
                  label={t('coin')}
                  selected={payMethod === 'coin'}
                  colorCls={PAY_COLORS.coin}
                  onSelect={setPayMethod}
                  balance={balanceKnown ? balances.coin : null}
                  enough={priceCoin * qty <= balances.coin}
                />
                <PayPill
                  method="score"
                  price={priceScore}
                  emoji="⭐"
                  label="Ball"
                  selected={payMethod === 'score'}
                  colorCls={PAY_COLORS.score}
                  onSelect={setPayMethod}
                  balance={balanceKnown ? balances.score : null}
                  enough={priceScore * qty <= balances.score}
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
                {nf(unitPrice)}{' '}
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
                    {nf(totalPrice)}{' '}
                    {payMethod === 'coin' ? <FaCoins /> : payMethod === 'score' ? '⭐' : t('library.card.currency')}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* ── Balans yetmadi → karta orqali to'lash taklifi ────────────── */}
          <AnimatePresence>
            {needsCardPayment && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 space-y-2"
              >
                <div className="flex items-start gap-2">
                  <svg
                    className="flex-shrink-0 w-4 h-4 mt-0.5 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold text-amber-700 leading-snug">
                      {t('library.purchase.insufficient_title', { method: METHOD_LABEL[payMethod] })}
                    </p>
                    <p className="text-[11px] text-amber-600 leading-relaxed mt-0.5">
                      {t('library.purchase.insufficient_hint')}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] bg-white/70 rounded-lg border border-amber-100 divide-y divide-amber-100">
                  <div className="flex items-center justify-between px-2.5 py-1.5">
                    <span className="font-medium text-amber-600">{t('library.purchase.your_balance')}</span>
                    <span className="font-bold tabular-nums text-amber-800">
                      {nf(shortageInfo?.balance ?? currentBalance)} {METHOD_LABEL[payMethod]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-1.5">
                    <span className="font-medium text-amber-600">{t('library.purchase.shortage')}</span>
                    <span className="font-bold tabular-nums text-rose-600">
                      {nf(shortageInfo?.shortage ?? Math.max(0, totalPrice - currentBalance))}{' '}
                      {METHOD_LABEL[payMethod]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-2">
                    <span className="font-bold text-amber-700">{t('library.purchase.pay_by_card_amount')}</span>
                    <span className="text-[13px] font-extrabold tabular-nums text-indigo-700">
                      {nf(shortageInfo?.payableSom ?? payableSom)} {t('library.card.currency')}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delivery info */}
          {book?.is_offline && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">{t('deliveryInfo')}</p>

              <div className="space-y-3">
                <div>
                  <label className="block mb-1 text-xs font-medium text-slate-600">{t('phoneNumber')}</label>

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
                  <label className="block mb-1 text-xs font-medium text-slate-600">{t('address')}</label>
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
            onClick={needsCardPayment ? handleCardPayment : handleSubmit}
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
            ) : needsCardPayment ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
                <span className="truncate">{t('library.purchase.pay_by_card')}</span>
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
