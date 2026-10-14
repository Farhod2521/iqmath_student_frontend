import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { QRCodeSVG } from 'qrcode.react'
import toast from 'react-hot-toast'
import {
  BarChart3,
  Bell,
  BookOpenText,
  Check,
  ChevronRight,
  Copy,
  MessageCircleMore,
  QrCode,
  RefreshCw,
  Star,
  UsersRound
} from 'lucide-react'
import useGetQuery from '@/hooks/api/useGetQuery'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'
import { LOGO_URL } from '@/modules/parent-connect/components/BrandMark'

const QR_SIZE = 224
const LOGO_BOX = 58
// QR o'rtasini bo'shatish uchun shaffof rasm — logo ustidan HTML bilan chiziladi
const EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

// QR atrofidagi ko'k burchaklar
const Corner = ({ className }) => (
  <span className={`absolute h-9 w-9 border-[#3B82F6] ${className}`} aria-hidden="true" />
)

// Ota-ona sahifasidagi imkoniyatlar (2x2)
const FEATURES = [
  { key: 'results', icon: BarChart3, tone: 'bg-[#DBEAFE] text-[#2563EB]' },
  { key: 'homework', icon: BookOpenText, tone: 'bg-[#D1FAE5] text-[#059669]' },
  { key: 'progress', icon: Star, tone: 'bg-[#FFEDD5] text-[#F59E0B]', filled: true },
  { key: 'news', icon: Bell, tone: 'bg-[#EDE9FE] text-[#7C3AED]', filled: true }
]

// Ota-ona qanday ulanadi — ketma-ket qadamlar
const STEPS = [
  { kind: 'scan', badge: 'bg-[#2563EB]', glow: 'bg-[#DBEAFE]', frame: 'border-[#1E3A8A]' },
  { kind: 'phone', badge: 'bg-[#8B5CF6]', glow: 'bg-[#EDE9FE]', frame: 'border-[#6D28D9]' },
  { kind: 'sms', badge: 'bg-[#10B981]', glow: 'bg-[#D1FAE5]', frame: 'border-[#047857]' },
  { kind: 'dashboard', badge: 'bg-[#F97316]', glow: 'bg-[#FFEDD5]', frame: 'border-[#334155]' }
]

const FeatureCard = ({ item, label }) => {
  const Icon = item.icon
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/85 px-3.5 py-2.5 text-left shadow-[0_14px_34px_-18px_rgba(15,23,42,0.35)] backdrop-blur-md">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.tone}`}>
        <Icon size={19} fill={item.filled ? 'currentColor' : 'none'} />
      </span>
      <span className="flex-1 text-[14px] font-semibold leading-snug text-[#0B1B3F]">{label}</span>
      <ChevronRight size={17} className="shrink-0 text-[#94A3B8]" />
    </div>
  )
}

// Telefon ko'rinishi (illyustratsiya uchun)
const PhoneMock = ({ frame, className = '', children }) => (
  <div
    className={`relative flex h-[96px] w-[56px] flex-col items-center justify-center rounded-[14px] border-[3px] bg-white shadow-[0_12px_24px_-10px_rgba(15,23,42,0.45)] ${frame} ${className}`}
  >
    <span className="absolute top-1 h-1 w-4 rounded-full bg-[#CBD5E1]" />
    {children}
  </div>
)

const StepIllustration = ({ step }) => {
  if (step.kind === 'scan') {
    return (
      <div className="relative -rotate-6">
        <PhoneMock frame={step.frame}>
          <span className="relative flex h-9 w-9 items-center justify-center">
            <span className="absolute left-0 top-0 h-2.5 w-2.5 rounded-tl border-l-2 border-t-2 border-[#3B82F6]" />
            <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-tr border-r-2 border-t-2 border-[#3B82F6]" />
            <span className="absolute bottom-0 left-0 h-2.5 w-2.5 rounded-bl border-b-2 border-l-2 border-[#3B82F6]" />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-br border-b-2 border-r-2 border-[#3B82F6]" />
            <QrCode size={22} className="text-[#0B1B3F]" />
          </span>
        </PhoneMock>
        {/* Qo'l */}
        <span className="absolute -bottom-2 -left-3 h-9 w-10 rounded-[14px] bg-[#F5C6A5] shadow-sm" />
        <span className="absolute -bottom-1 left-6 h-4 w-3 rounded-full bg-[#EDB48F]" />
      </div>
    )
  }
  if (step.kind === 'phone') {
    return (
      <PhoneMock frame={step.frame} className="rotate-3 bg-gradient-to-b from-[#F5F3FF] to-white">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#14B8A6] text-white shadow-[0_6px_14px_-4px_rgba(20,184,166,0.8)]">
          <Check size={20} strokeWidth={3} />
        </span>
      </PhoneMock>
    )
  }
  if (step.kind === 'sms') {
    return (
      <div className="relative">
        <PhoneMock frame={step.frame} className="bg-gradient-to-b from-[#ECFDF5] to-white">
          <span className="mt-1 h-1.5 w-8 rounded-full bg-[#BBF7D0]" />
          <span className="mt-1.5 h-1.5 w-6 rounded-full bg-[#D1FAE5]" />
        </PhoneMock>
        <span className="absolute -right-5 top-1/2 flex h-10 w-14 -translate-y-1/2 items-center justify-center gap-1 rounded-2xl rounded-bl-sm bg-white shadow-[0_10px_20px_-8px_rgba(16,185,129,0.6)]">
          <MessageCircleMore size={22} className="text-[#10B981]" />
        </span>
      </div>
    )
  }
  return (
    // Noutbuk ekranida ota-ona sahifasining haqiqiy ko'rinishi
    <div className="relative">
      <div className="w-[176px] overflow-hidden rounded-t-[10px] border-[3px] border-b-0 border-[#1E293B] bg-white shadow-[0_12px_24px_-10px_rgba(15,23,42,0.45)]">
        <div className="flex h-[9px] items-center gap-[3px] bg-[#E2E8F0] px-1.5">
          <span className="h-[4px] w-[4px] rounded-full bg-[#F87171]" />
          <span className="h-[4px] w-[4px] rounded-full bg-[#FBBF24]" />
          <span className="h-[4px] w-[4px] rounded-full bg-[#34D399]" />
          <span className="ml-1 h-[4px] flex-1 rounded-full bg-white" />
        </div>
        <img
          src="/images/parent-dashboard-preview.webp"
          alt=""
          className="block h-[86px] w-full object-cover object-left-top"
        />
      </div>
      <span className="-mx-3 block h-[7px] rounded-b-[8px] bg-gradient-to-b from-[#CBD5E1] to-[#94A3B8]" />
    </div>
  )
}

const StepCard = ({ step, index, title, text, isLast }) => (
  <div className="relative">
    <div className="relative h-full overflow-hidden rounded-[20px] border border-white/80 bg-white/90 p-4 text-left shadow-[0_18px_36px_-26px_rgba(15,23,42,0.4)] backdrop-blur-md dark:border-[#334155] dark:bg-[#1E293B]">
      <div className="relative flex h-[112px] items-center justify-center">
        <span className={`absolute h-[104px] w-[104px] rounded-full ${step.glow} opacity-90 dark:opacity-30`} />
        <span
          className={`absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full ${step.badge} text-[13px] font-bold text-white shadow-[0_6px_14px_-6px_rgba(15,23,42,0.5)]`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="relative">
          <StepIllustration step={step} />
        </div>
      </div>
      <h4 className="mt-3 text-[16px] font-bold leading-tight text-[#0B1B3F] dark:text-white">{title}</h4>
      <p className="mt-1.5 text-[13px] leading-snug text-[#475569] dark:text-[#CBD5E1]">{text}</p>
    </div>

    {/* Keyingi qadamga strelka (faqat katta ekranda) */}
    {!isLast ? (
      <span className="pointer-events-none absolute -right-[30px] top-1/2 z-10 hidden w-7 -translate-y-1/2 items-center text-[#93A4C3] lg:flex">
        <span className="h-0 flex-1 border-t-2 border-dashed border-[#A5B4D4]" />
        <ChevronRight size={16} className="-ml-1.5" strokeWidth={2.5} />
      </span>
    ) : null}
  </div>
)

export default function ParentQr() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const { data, isLoading, isFetching, isError, refetch } = useGetQuery({
    key: KEYS.studentParentQr,
    url: URLS.studentParentQr,
    staleTime: 10 * 60_000,
    refetchOnMount: true
  })

  const info = data?.data
  const link = useMemo(() => {
    if (!info?.token || typeof window === 'undefined') return ''
    return `${window.location.origin}/parent-connect?t=${encodeURIComponent(info.token)}`
  }, [info?.token])

  const copyLink = async () => {
    if (!link) return
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      toast.success(t('parentQr.copied'))
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error(t('ERROR'))
    }
  }

  return (
    // Butun sahifa foni — rasm, barcha bloklar uning ustida
    <div className="relative overflow-hidden rounded-[28px] bg-[#EAF2FF] shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)]">
      <img
        src="/images/parent-qr-bg.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Chapda matn, pastda qadamlar o'qilishi uchun yorug'lashtiramiz */}
      <div className="absolute inset-0 bg-white/60 lg:bg-transparent lg:bg-gradient-to-r lg:from-white/85 lg:via-white/45 lg:to-white/0" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/80 via-white/40 to-transparent" />

      <div className="relative space-y-8 px-4 pb-8 sm:px-8 lg:px-12 lg:pb-10">
        <div className="grid items-center gap-8 pt-8 lg:min-h-[440px] lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,1fr)] lg:gap-10 lg:pt-12">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-4 py-1.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.9)]">
              <UsersRound size={17} />
              {t('parentQr.menuLabel')}
            </span>
            <h2 className="mt-4 text-[24px] font-extrabold leading-[1.15] text-[#0B1B3F] sm:text-[30px] xl:text-[34px]">
              {t('parentQr.heroTitle')}
              <span className="block text-[#2563EB]">{t('parentQr.heroAccent')}</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-[15px] leading-snug text-[#475569] lg:mx-0">
              {t('parentQr.heroText')}
            </p>

            <div className="mt-7 grid max-w-[660px] gap-3 sm:grid-cols-2">
              {FEATURES.map((item) => (
                <FeatureCard key={item.key} item={item} label={t(`parentQr.features.${item.key}`)} />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative rounded-[28px] border border-white/80 bg-white/80 p-3 shadow-[0_30px_70px_-25px_rgba(37,99,235,0.55)] backdrop-blur-md">
              <div className="relative p-3">
                <Corner className="left-0 top-0 rounded-tl-[18px] border-l-4 border-t-4" />
                <Corner className="right-0 top-0 rounded-tr-[18px] border-r-4 border-t-4" />
                <Corner className="bottom-0 left-0 rounded-bl-[18px] border-b-4 border-l-4" />
                <Corner className="bottom-0 right-0 rounded-br-[18px] border-b-4 border-r-4" />

                <div
                  className="relative flex items-center justify-center rounded-xl bg-white p-2"
                  style={{ width: QR_SIZE + 16, height: QR_SIZE + 16 }}
                >
                  {link ? (
                    <>
                      <QRCodeSVG
                        value={link}
                        size={QR_SIZE}
                        level="H"
                        marginSize={0}
                        fgColor="#0B1B3F"
                        imageSettings={{ src: EMPTY_IMAGE, height: LOGO_BOX, width: LOGO_BOX, excavate: true }}
                      />
                      <span
                        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-white p-1 shadow-[0_4px_14px_-4px_rgba(37,99,235,0.45)]"
                        style={{ width: LOGO_BOX - 4, height: LOGO_BOX - 4 }}
                      >
                        <img src={LOGO_URL} alt="IQMATH" className="h-full w-full object-contain" />
                      </span>
                    </>
                  ) : isError ? (
                    <button
                      type="button"
                      onClick={() => refetch()}
                      className="flex flex-col items-center gap-2 text-sm font-medium text-[#DC2626]"
                    >
                      <RefreshCw size={22} />
                      {t('parentQr.loadError')}
                    </button>
                  ) : (
                    <div className="h-full w-full animate-pulse rounded-xl bg-[#EEF2F8]" />
                  )}
                </div>
              </div>

              <div className="px-2 pb-1.5 pt-2 text-center">
                <p className="text-[16px] font-bold leading-tight text-[#0B1B3F]">{t('parentQr.qrCaption')}</p>
                <p className="mt-1 text-[13px] text-[#64748B]">{t('parentQr.qrCaptionSub')}</p>
              </div>
            </div>

            <div className="mt-4 flex w-full max-w-[290px] gap-2">
              <button
                type="button"
                onClick={copyLink}
                disabled={!link}
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-white bg-white/90 text-sm font-semibold text-[#0F172A] shadow-sm transition hover:bg-white disabled:opacity-60"
              >
                {copied ? <Check size={16} className="text-[#16A34A]" /> : <Copy size={16} />}
                {t('parentQr.copyLink')}
              </button>
              <button
                type="button"
                onClick={() => refetch()}
                disabled={isLoading || isFetching}
                aria-label={t('parentQr.refresh')}
                title={t('parentQr.refresh')}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white bg-white/90 text-[#0F172A] shadow-sm transition hover:bg-white disabled:opacity-60"
              >
                <RefreshCw size={16} className={isFetching ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>
        </div>

        {/* Ota-ona qanday ulanadi: 01 -> 04 */}
        <section className="rounded-[24px] border border-white/70 bg-white/55 p-4 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)] backdrop-blur-md sm:p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <h3 className="text-[20px] font-extrabold text-[#0B1B3F] dark:text-white sm:text-[24px]">
              {t('parentQr.stepsTitle')}
            </h3>
            <p className="text-[14px] text-[#64748B]">{t('parentQr.stepsHint')}</p>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-9">
            {STEPS.map((step, index) => (
              <StepCard
                key={step.kind}
                step={step}
                index={index}
                title={t(`parentQr.steps.${index + 1}.title`)}
                text={t(`parentQr.steps.${index + 1}.text`)}
                isLast={index === STEPS.length - 1}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
