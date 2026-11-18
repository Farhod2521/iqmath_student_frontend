import { CreditCard } from 'lucide-react'

// To'lov tizimlari: backend `payment_gateway` qiymati -> nom va ikonka.
// Rasmiy logotip fayllari loyihada yo'q, shuning uchun brend ranglaridagi monogramma belgilari.
const SYSTEMS = {
  uzum: { name: 'Uzum', bg: '#7000FF', fg: '#FFFFFF', mark: 'U', round: true },
  payme: { name: 'Payme', bg: '#33CCCC', fg: '#FFFFFF', mark: 'P' },
  click: { name: 'Click', bg: '#0073FF', fg: '#FFFFFF', mark: 'C', round: true },
  uzcard: { name: 'Uzcard', bg: '#EAF0FB', fg: '#1A3D7C', mark: 'U' },
  humo: { name: 'Humo', bg: '#0F2A44', fg: '#F5C451', mark: 'H' },
  visa: { name: 'Visa', bg: '#1A1F71', fg: '#FFFFFF', mark: 'V' },
  multicard: { name: 'Multicard', bg: '#E8F7EF', fg: '#0F8A4B', mark: 'M' },
  anorbank: { name: 'Anorbank', bg: '#E11D48', fg: '#FFFFFF', mark: 'A', round: true },
  alif: { name: 'Alif', bg: '#16A34A', fg: '#FFFFFF', mark: 'A' },
  oson: { name: 'Oson', bg: '#F97316', fg: '#FFFFFF', mark: 'O', round: true },
  xazna: { name: 'Xazna', bg: '#0EA5E9', fg: '#FFFFFF', mark: 'X' },
  apelsin: { name: 'Apelsin', bg: '#FB923C', fg: '#FFFFFF', mark: 'A', round: true },
  beepul: { name: 'Beepul', bg: '#334155', fg: '#FFFFFF', mark: 'B' }
}

export const paymentSystemKey = (value) =>
  String(value || 'multicard')
    .trim()
    .toLowerCase()
    .replace(/[\s_]/g, '')

export const paymentSystemName = (value) => {
  const key = paymentSystemKey(value)
  if (key === 'mastercard') return 'Mastercard'
  return SYSTEMS[key]?.name || (key ? key.charAt(0).toUpperCase() + key.slice(1) : '—')
}

export function PaymentSystemIcon({ value, size = 22 }) {
  const key = paymentSystemKey(value)

  if (key === 'mastercard') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <rect width="24" height="24" rx="6" fill="#1F2937" />
        <circle cx="9.5" cy="12" r="5" fill="#EB001B" />
        <circle cx="14.5" cy="12" r="5" fill="#F79E1B" fillOpacity="0.9" />
      </svg>
    )
  }

  const s = SYSTEMS[key]
  if (!s) {
    return (
      <span
        className="inline-flex shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500"
        style={{ width: size, height: size }}
      >
        <CreditCard size={size * 0.62} />
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center font-black leading-none ${
        s.round ? 'rounded-full' : 'rounded-md'
      }`}
      style={{ width: size, height: size, background: s.bg, color: s.fg, fontSize: size * 0.55 }}
    >
      {s.mark}
    </span>
  )
}

export function PaymentSystem({ value }) {
  return (
    <span className="inline-flex items-center gap-2 font-medium text-[#0F1B3D]">
      <PaymentSystemIcon value={value} />
      {paymentSystemName(value)}
    </span>
  )
}
