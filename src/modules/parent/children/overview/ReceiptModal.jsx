import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { QRCodeSVG } from 'qrcode.react'
import {
  CalendarDays,
  CircleCheck,
  Clock3,
  Copy,
  CreditCard,
  Download,
  FileText,
  Gift,
  Hash,
  Info,
  KeyRound,
  Link2,
  Printer,
  Tag,
  User,
  Wallet,
  X
} from 'lucide-react'
import { formatMoney } from './format'

const MULTICARD_CHECK_URL = 'https://checkout.multicard.uz/check/'

const LOGO = 'https://api.iqmath.uz/system/logo/logo.png'

const pad = (n) => String(n).padStart(2, '0')
const dateParts = (iso) => {
  const d = iso ? new Date(iso) : null
  if (!d || Number.isNaN(d.getTime())) return { date: '—', time: '—' }
  return {
    date: `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  }
}

// Kvitansiya chetlari — "yirtilgan chek" ko'rinishi
const TicketEdge = ({ bottom = false }) => (
  <div
    aria-hidden="true"
    className={`h-3 w-full ${bottom ? 'rotate-180' : ''}`}
    style={{
      backgroundImage: 'radial-gradient(circle at 10px 0, transparent 6px, #ffffff 6.5px)',
      backgroundSize: '20px 12px',
      backgroundRepeat: 'repeat-x'
    }}
  />
)

const Row = ({ icon: Icon, label, children }) => (
  <div className="flex items-center gap-3 border-b border-[#EEF1F6] py-[7px] last:border-b-0">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#2563EB]">
      <Icon size={18} />
    </span>
    <span className="w-[38%] shrink-0 text-[12.5px] text-[#334155]">{label}</span>
    <span className="min-w-0 flex-1 break-all text-[12.5px] font-medium text-[#0F172A]">{children || '—'}</span>
  </div>
)

/** To'lov kvitansiyasi oynasi */
const ReceiptModal = ({ payment, onClose }) => {
  const { t } = useTranslation()
  const r = (key) => t(`childPage.pay.receipt.${key}`)
  const som = t('childPage.som')

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Oyna ochiq paytda sahifa aylanmaydi
  useEffect(() => {
    if (!payment) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [payment])

  useEffect(() => {
    if (!payment) return undefined
    const onKey = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [payment, onClose])

  if (!payment || !mounted) return null
  const { date, time } = dateParts(payment.date)
  const success = payment.status === 'success'
  const money = (value) => `${formatMoney(value)},00 ${som}`
  // Chek havolasi invoys ID'dan yasaladi (bazadagi eski receipt_url'lar ochilmaydi)
  const receiptUrl = payment.invoice_uuid ? `${MULTICARD_CHECK_URL}${payment.invoice_uuid}` : payment.receipt_url

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(receiptUrl)
      toast.success(r('copied'))
    } catch {
      // brauzer ruxsat bermasa — jim
    }
  }

  return createPortal(
    <div
      className="receipt-overlay fixed inset-0 z-[10000] overflow-y-auto bg-[#0F172A]/55 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div
          className="receipt-print relative w-full max-w-[1040px] drop-shadow-[0_30px_50px_rgba(15,23,42,0.35)]"
          onClick={(event) => event.stopPropagation()}
        >
          <TicketEdge />
          <div className="bg-white px-5 pb-5 pt-3 sm:px-7">
            {/* Sarlavha */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <img src={LOGO} alt="IQMATH" className="h-9 w-9 object-contain" />
                  <span className="text-[26px] font-extrabold tracking-tight text-[#1D4ED8]">IQMATH</span>
                </div>
                <p className="mt-1 text-lg font-semibold text-[#334155]">{r('title')}</p>
                <p className="text-xs text-[#64748B]">{r('subtitle')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold ${
                      success ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEF3C7] text-[#B45309]'
                    }`}
                  >
                    <CircleCheck size={18} className={success ? 'fill-[#22C55E] text-white' : ''} />
                    {success ? r('success') : r('pending')}
                  </span>
                  <dl className="mt-3 grid grid-cols-[auto_auto] justify-end gap-x-4 gap-y-1 text-sm">
                    <dt className="text-[#64748B]">{r('date')}:</dt>
                    <dd className="font-semibold text-[#0F172A]">{date}</dd>
                    <dt className="text-[#64748B]">{r('time')}:</dt>
                    <dd className="font-semibold text-[#0F172A]">{time}</dd>
                  </dl>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="close"
                  className="receipt-noprint flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5EAF2] text-[#334155] hover:bg-[#F1F5F9]"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              {/* Tranzaksiya ma'lumotlari */}
              <div className="rounded-2xl border border-[#EEF1F6] px-4 py-1">
                <Row icon={FileText} label={r('storeId')}>
                  {payment.store_id}
                </Row>
                <Row icon={User} label={r('student')}>
                  {payment.student_name}
                </Row>
                <Row icon={User} label={r('payer')}>
                  {payment.payer_name}
                  {payment.paid_by === 'parent' ? (
                    <span className="ml-2 inline-flex rounded-md bg-[#F1EBFF] px-1.5 py-0.5 text-[11px] font-semibold text-[#7C3AED]">
                      {r('byParent')}
                    </span>
                  ) : null}
                </Row>
                <Row icon={FileText} label={r('invoice')}>
                  {payment.invoice_uuid}
                </Row>
                <Row icon={CreditCard} label={r('uuid')}>
                  {payment.uuid}
                </Row>
                <Row icon={Link2} label={r('billing')}>
                  {payment.billing_id}
                </Row>
                <Row icon={Hash} label={r('sign')}>
                  {payment.sign}
                </Row>
                <Row icon={KeyRound} label={r('transaction')}>
                  {payment.transaction_id}
                </Row>
                <Row icon={CreditCard} label={r('gateway')}>
                  {payment.gateway}
                  {payment.card_pan ? <span className="ml-2 text-[#64748B]">{payment.card_pan}</span> : null}
                </Row>
                <Row icon={Info} label={r('status')}>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                      success ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEF3C7] text-[#B45309]'
                    }`}
                  >
                    <CircleCheck size={14} className={success ? 'fill-[#22C55E] text-white' : ''} />
                    {t(`childPage.pay.status_${payment.status}`)}
                  </span>
                </Row>
                <Row icon={Gift} label={r('coupon')}>
                  {payment.coupon_code}
                </Row>
                <Row icon={Tag} label={r('couponType')}>
                  {payment.coupon_type}
                </Row>
              </div>

              {/* Summa paneli */}
              <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[#E3EBFA] bg-gradient-to-b from-[#F3F7FF] via-[#F8FAFF] to-white p-3">
                <div className="flex items-center gap-4 rounded-2xl bg-[#E4EDFF] px-4 py-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2563EB] shadow-[0_8px_20px_-10px_rgba(37,99,235,0.6)]">
                    <Wallet size={28} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-[#0F172A]">{r('amount')}</p>
                    <p className="whitespace-nowrap text-[26px] font-extrabold leading-tight tracking-tight text-[#0B1B3F]">
                      {money(payment.amount)}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 space-y-3 px-2 pb-1 pt-4 text-[14px]">
                  {payment.discount_amount > 0 && payment.original_amount ? (
                    <div className="flex justify-between gap-3">
                      <span className="text-[#334155]">{r('original')}</span>
                      <span className="font-bold text-[#0F172A]">{money(payment.original_amount)}</span>
                    </div>
                  ) : null}
                  {payment.discount_amount > 0 ? (
                    <div className="flex justify-between gap-3">
                      <span className="text-[#334155]">{r('discount')}</span>
                      <span className="font-bold text-[#16A34A]">-{money(payment.discount_amount)}</span>
                    </div>
                  ) : null}
                  <div className={`space-y-3 ${payment.discount_amount > 0 ? 'border-t border-[#E5EAF2] pt-3' : ''}`}>
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF1FF] text-[#2563EB]">
                        <CalendarDays size={18} />
                      </span>
                      <span className="flex-1 text-[#334155]">{r('payDate')}</span>
                      <span className="font-semibold text-[#0F172A]">{date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF1FF] text-[#2563EB]">
                        <Clock3 size={18} />
                      </span>
                      <span className="flex-1 text-[#334155]">{r('payTime')}</span>
                      <span className="font-semibold text-[#0F172A]">{time}</span>
                    </div>
                  </div>
                  {success ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-dashed border-[#86EFAC] bg-[#F0FDF4]/90 p-3">
                      <CircleCheck size={26} className="shrink-0 fill-[#22C55E] text-white" />
                      <div>
                        <p className="text-sm font-semibold text-[#15803D]">{r('doneTitle')}</p>
                        <p className="text-[11px] text-[#64748B]">{r('doneText')}</p>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Illyustratsiya — o'ng pastki burchakda */}
                <div className="relative mt-auto h-24">
                  <img
                    src="/images/receipt-check.webp"
                    alt=""
                    className="absolute -bottom-5 -right-3 h-40 w-40 object-contain mix-blend-multiply [-webkit-mask-image:radial-gradient(circle,black_48%,transparent_70%)] [mask-image:radial-gradient(circle,black_48%,transparent_70%)]"
                  />
                </div>
              </div>
            </div>

            {/* Chek havolasi va QR */}
            <div className="mt-4 grid grid-cols-1 gap-4 border-y border-dashed border-[#DCE3F0] py-3 md:grid-cols-[minmax(0,1fr)_auto]">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EAF1FF] text-[#2563EB]">
                  <Link2 size={22} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#0F172A]">{r('link')}</p>
                  {receiptUrl ? (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="min-w-0 flex-1 truncate rounded-lg bg-[#EEF3FF] px-3 py-2 text-xs text-[#334155]">
                        {receiptUrl}
                      </span>
                      <button
                        type="button"
                        onClick={copyLink}
                        aria-label="copy"
                        className="receipt-noprint flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E5EAF2] text-[#2563EB] hover:bg-[#EAF1FF]"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  ) : (
                    <p className="mt-1 text-xs text-[#94A3B8]">{r('noLink')}</p>
                  )}
                </div>
              </div>
              {receiptUrl ? (
                <div className="flex items-center gap-4 md:border-l md:border-dashed md:border-[#DCE3F0] md:pl-6">
                  <QRCodeSVG value={receiptUrl} size={76} level="M" />
                  <div className="max-w-[180px]">
                    <p className="font-semibold text-[#0F172A]">{r('qr')}</p>
                    <p className="text-xs text-[#64748B]">{r('qrText')}</p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Tugmalar */}
            <div className="receipt-noprint mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-[#D6E2FF] px-6 font-semibold text-[#2563EB] hover:bg-[#F5F8FF]"
              >
                <Printer size={20} />
                {r('print')}
              </button>
              <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-11 rounded-xl bg-[#EAF1FF] px-7 font-semibold text-[#2563EB] hover:bg-[#DCE8FF]"
                >
                  {r('close')}
                </button>
                <a
                  href={receiptUrl || undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!receiptUrl}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-7 font-semibold text-white shadow-[0_12px_24px_-12px_rgba(37,99,235,0.9)] ${
                    receiptUrl ? 'bg-[#2563EB] hover:bg-[#1D4ED8]' : 'pointer-events-none bg-[#93B4FA]'
                  }`}
                >
                  <Download size={20} />
                  {r('download')}
                </a>
              </div>
            </div>
          </div>
          <TicketEdge bottom />
        </div>
      </div>

      {/* Chop etishda faqat kvitansiya chiqadi */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          .receipt-print,
          .receipt-print * {
            visibility: visible !important;
          }
          .receipt-overlay {
            position: absolute !important;
            inset: 0 !important;
            background: #fff !important;
            backdrop-filter: none !important;
          }
          .receipt-print {
            position: absolute !important;
            left: 0;
            top: 0;
          }
          .receipt-noprint {
            display: none !important;
          }
        }
      `}</style>
    </div>,
    document.body
  )
}

export default ReceiptModal
