import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { ArrowRight, BarChart3, Check, FileText, Gift, PlayCircle, Trophy, X } from 'lucide-react'
import { useGetPlans } from '@/hooks'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { formatMoney } from './format'

// Tarif kartalari ranglari (tartib bo'yicha): ko'k, binafsha, to'q sariq, qizil
const TONES = [
  { main: '#2563EB', soft: '#EAF1FF', bg: 'from-[#F3F7FF] to-white', badge: 'bg-[#DCFCE7] text-[#16A34A]' },
  { main: '#7C3AED', soft: '#F1EBFF', bg: 'from-[#F7F3FF] to-white', badge: 'bg-[#DCFCE7] text-[#16A34A]' },
  { main: '#F59E0B', soft: '#FFF4DE', bg: 'from-[#FFF8EC] to-white', badge: 'bg-[#FFEDD5] text-[#EA580C]' },
  { main: '#EF4444', soft: '#FEECEC', bg: 'from-[#FFF3F3] to-white', badge: 'bg-[#FEE2E2] text-[#DC2626]' }
]

/** Kalendar illyustratsiyasi (tarif rangida) */
const CalendarArt = ({ color }) => (
  <svg viewBox="0 0 96 80" className="h-20 w-24" aria-hidden="true">
    <ellipse cx="50" cy="74" rx="34" ry="4" fill={color} opacity=".12" />
    <rect x="24" y="16" width="56" height="52" rx="10" fill={color} opacity=".35" transform="rotate(8 52 42)" />
    <rect x="16" y="14" width="56" height="54" rx="10" fill="#fff" stroke={color} strokeOpacity=".35" />
    <rect x="16" y="14" width="56" height="15" rx="10" fill={color} />
    <rect x="16" y="22" width="56" height="7" fill={color} />
    <rect x="28" y="8" width="5" height="12" rx="2.5" fill={color} opacity=".85" />
    <rect x="55" y="8" width="5" height="12" rx="2.5" fill={color} opacity=".85" />
    {[0, 1, 2].map((r) =>
      [0, 1, 2].map((c) => (
        <rect
          key={`${r}${c}`}
          x={25 + c * 14}
          y={35 + r * 10}
          width="10"
          height="7"
          rx="2"
          fill={color}
          opacity={r === 1 && c === 1 ? 0.9 : 0.3}
        />
      ))
    )}
    <path d="M78 6l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill={color} opacity=".7" />
  </svg>
)

const FEATURES = [
  { key: 'f1', Icon: PlayCircle, color: '#2563EB', soft: '#EAF1FF' },
  { key: 'f2', Icon: FileText, color: '#2563EB', soft: '#EAF1FF' },
  { key: 'f3', Icon: BarChart3, color: '#2563EB', soft: '#EAF1FF' },
  { key: 'f4', Icon: Trophy, color: '#F59E0B', soft: '#FFF4DE' }
]

/** Ota-ona: farzand obunasini uzaytirish oynasi */
const ExtendSubscriptionModal = ({ open, onClose, childId }) => {
  const { t, i18n } = useTranslation()
  const e = (key, opts) => t(`childPage.extendModal.${key}`, opts)
  const som = t('childPage.som')
  const [mounted, setMounted] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [promo, setPromo] = useState('')
  const [coupon, setCoupon] = useState(null)
  const [checking, setChecking] = useState(false)
  const [paying, setPaying] = useState(false)

  const { data, isLoading } = useGetPlans({ enabled: open })
  const plans = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data])
  const selected = plans.find((plan) => plan.id === selectedId) || plans[0]

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  // Tarif almashsa promokod qayta tekshiriladi
  useEffect(() => setCoupon(null), [selectedId])

  if (!open || !mounted) return null

  const planName = (plan) => (i18n.language === 'ru' ? plan.name_ru || plan.name_uz : plan.name_uz)
  const price = Number(selected?.sale_price || 0)
  // Promokod summasi backend'da hisoblanadi (to'lovdagi summa bilan bir xil bo'lishi uchun)
  const total = coupon ? Math.max(0, Math.round(Number(coupon.sale_price ?? price))) : price
  const saved = Math.max(0, price - total)

  const applyPromo = async () => {
    if (!promo.trim() || !selected) return
    setChecking(true)
    try {
      const res = await request.post(URLS.checkCoupon, {
        code: promo.trim(),
        subscription_id: selected.id,
        student_id: childId
      })
      if (res.data?.active) {
        setCoupon({ ...res.data, code: res.data.code || promo.trim() })
        toast.success(t('couponAppliedSuccessfully'))
      } else {
        setCoupon(null)
        toast.error(res.data?.message || t('couponNotValid'))
      }
    } catch (err) {
      setCoupon(null)
      toast.error(err?.response?.data?.error || err?.response?.data?.message || t('couponCheckError'))
    } finally {
      setChecking(false)
    }
  }

  const pay = async () => {
    if (!selected) return
    setPaying(true)
    try {
      const res = await request.post('/api/v1/payments/initiate-payment/', {
        subscription_id: selected.id,
        student_id: childId,
        ...(coupon?.code ? { coupon_code: coupon.code } : {})
      })
      const url = res.data?.checkout_url || res.data?.payment_data?.data?.checkout_url
      if (!url) throw new Error('no url')
      // To'lov sahifasiga shu oynada o'tiladi; to'lovdan keyin farzand sahifasiga qaytadi
      toast.success(e('redirecting'))
      window.location.href = url
    } catch (err) {
      toast.error(err?.response?.data?.error || e('payError'))
      setPaying(false)
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[10000] overflow-y-auto bg-[#0F172A]/55 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div
          className="relative grid w-full max-w-[1100px] grid-cols-1 overflow-hidden rounded-[28px] bg-white shadow-2xl dark:bg-[#111A2B] lg:grid-cols-[320px_minmax(0,1fr)]"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-[#64748B] hover:bg-[#F1F5F9]"
          >
            <X size={20} />
          </button>

          {/* Chap panel */}
          <aside className="bg-gradient-to-b from-[#EEF4FF] to-[#F8FAFF] p-6 dark:from-[#16213A] dark:to-[#111A2B]">
            <img
              src="/images/subscription-crown.webp"
              alt=""
              className="mx-auto w-full max-w-[280px] mix-blend-multiply [-webkit-mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_78%)] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_78%)] dark:mix-blend-normal"
            />
            <h2 className="mt-2 text-2xl font-extrabold text-[#0B1B3F] dark:text-white">{e('leftTitle')}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{e('leftText')}</p>
            <ul className="mt-6 space-y-4">
              {FEATURES.map(({ key, Icon, color, soft }) => (
                <li key={key} className="flex items-center gap-3 text-sm font-medium text-[#334155] dark:text-gray-200">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ backgroundColor: soft, color }}
                  >
                    <Icon size={18} />
                  </span>
                  {e(key)}
                </li>
              ))}
            </ul>
          </aside>

          {/* O'ng panel */}
          <div className="p-5 sm:p-7">
            <h3 className="pr-10 text-2xl font-extrabold text-[#0B1B3F] dark:text-white">{e('title')}</h3>
            <p className="mt-1 text-sm text-[#64748B]">{e('subtitle')}</p>

            {isLoading ? (
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-64 animate-pulse rounded-2xl bg-gray-100" />
                ))}
              </div>
            ) : !plans.length ? (
              <p className="mt-10 text-center text-sm text-[#64748B]">{e('empty')}</p>
            ) : (
              <div
                // Ustunlar soni = tariflar soni (ko'pi bilan 4) — o'ngda bo'sh joy qolmaydi
                className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:[grid-template-columns:repeat(var(--plan-cols),minmax(0,1fr))]"
                style={{ '--plan-cols': Math.min(Math.max(plans.length, 1), 4) }}
              >
                {plans.map((plan, index) => {
                  const tone = TONES[index % TONES.length]
                  const active = selected?.id === plan.id
                  const discount = Number(plan.discount_percent) || 0
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedId(plan.id)}
                      className={`relative flex flex-col overflow-hidden rounded-2xl border-2 bg-gradient-to-b p-4 text-left transition ${tone.bg} ${
                        active
                          ? 'shadow-[0_14px_30px_-18px_rgba(37,99,235,0.8)]'
                          : 'border-[#EEF1F6] hover:border-[#BFD3FF] dark:border-[#26324A]'
                      }`}
                      style={active ? { borderColor: tone.main } : undefined}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span>
                          <span className="block text-base font-bold text-[#0B1B3F] dark:text-white">
                            {e('months', { n: plan.months })}
                          </span>
                          <span className="text-[11px] font-medium text-[#94A3B8]">{planName(plan)}</span>
                        </span>
                        {active ? (
                          <span
                            className="flex h-7 w-7 items-center justify-center rounded-full text-white"
                            style={{ backgroundColor: tone.main }}
                          >
                            <Check size={16} strokeWidth={3} />
                          </span>
                        ) : discount ? (
                          <span className={`rounded-lg px-2 py-0.5 text-xs font-bold ${tone.badge}`}>-{discount}%</span>
                        ) : null}
                      </div>
                      {discount ? (
                        <span className="mt-2 text-xs text-[#94A3B8] line-through">
                          {formatMoney(plan.price_per_month)} {som}
                        </span>
                      ) : (
                        <span className="mt-2 h-4" />
                      )}
                      <span className="whitespace-nowrap text-lg font-extrabold text-[#0B1B3F] dark:text-white">
                        {formatMoney(plan.sale_price)} {som}
                      </span>
                      <ul className="mt-3 space-y-1.5">
                        {(plan.benefits || [])
                          .filter((benefit) => benefit.is_selected)
                          .map((benefit) => (
                            <li
                              key={benefit.id}
                              className="flex items-center gap-1.5 text-xs text-[#334155] dark:text-gray-300"
                            >
                              <Check size={14} strokeWidth={3} className="shrink-0 text-[#16A34A]" />
                              {(i18n.language === 'ru' ? benefit.title_ru : benefit.title_uz) || benefit.title_uz}
                            </li>
                          ))}
                      </ul>
                      <div className="mt-auto flex justify-end pt-2">
                        <CalendarArt color={tone.main} />
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Promokod */}
            <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-[#F5F8FF] p-4 dark:bg-[#16213A] sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#2563EB] shadow-sm dark:bg-[#111A2B]">
                  <Gift size={20} />
                </span>
                <div>
                  <p className="font-semibold text-[#0F172A] dark:text-white">{e('promoTitle')}</p>
                  <p className="text-xs text-[#64748B]">
                    {coupon ? (
                      <span className="font-semibold text-[#16A34A]">
                        {e('applied', { n: coupon.discount_percent })}
                        {saved ? ` (−${formatMoney(saved)} ${som})` : ''}
                      </span>
                    ) : (
                      e('promoText')
                    )}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  value={promo}
                  onChange={(event) => setPromo(event.target.value.toUpperCase())}
                  disabled={!!coupon}
                  placeholder={e('promoPlaceholder')}
                  className="h-11 w-full min-w-0 rounded-xl border border-[#DCE3F0] bg-white px-3 text-sm outline-none focus:border-[#2563EB] disabled:bg-[#F1F5F9] dark:border-[#26324A] dark:bg-[#111A2B] dark:text-white sm:w-56"
                />
                {coupon ? (
                  <button
                    type="button"
                    onClick={() => {
                      setCoupon(null)
                      setPromo('')
                    }}
                    className="h-11 shrink-0 rounded-xl bg-white px-4 text-sm font-semibold text-[#DC2626] ring-1 ring-[#FECACA]"
                  >
                    {e('remove')}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={applyPromo}
                    disabled={!promo.trim() || checking}
                    className="h-11 shrink-0 rounded-xl bg-[#2563EB] px-5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] disabled:bg-[#BFD3FF]"
                  >
                    {e('apply')}
                  </button>
                )}
              </div>
            </div>

            {/* Jami va to'lov */}
            <div className="mt-6 flex flex-col items-stretch justify-end gap-4 sm:flex-row sm:items-center">
              <div className="text-right">
                <p className="text-sm text-[#64748B]">{e('total')}:</p>
                <p className="text-2xl font-extrabold text-[#2563EB]">
                  {coupon && total !== price ? (
                    <span className="mr-2 text-base font-semibold text-[#94A3B8] line-through">
                      {formatMoney(price)}
                    </span>
                  ) : null}
                  {formatMoney(total)} {som}
                </p>
              </div>
              <button
                type="button"
                onClick={pay}
                disabled={!selected || paying}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#2563EB] px-8 text-base font-semibold text-white shadow-[0_14px_28px_-12px_rgba(37,99,235,0.95)] transition hover:bg-[#1D4ED8] disabled:opacity-60 sm:min-w-[240px]"
              >
                {paying ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : null}
                {e('pay')}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ExtendSubscriptionModal
