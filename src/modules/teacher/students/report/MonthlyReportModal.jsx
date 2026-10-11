import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Download, FileText, TrendingDown, TrendingUp, X } from 'lucide-react'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { FilterSelect, formatNumber } from '../components/PupilsUi'
import { REPORT_MONTHS, downloadMonthlyReportDocx } from './monthlyReportDocx'

const changeOf = (cur, prev) => {
  if (!prev) return cur ? { pct: null, dir: 'new' } : { pct: 0, dir: 'same' }
  const pct = Math.round(((cur - prev) * 100) / prev)
  return { pct: Math.abs(pct), dir: pct > 0 ? 'up' : pct < 0 ? 'down' : 'same' }
}

const TEXTS = {
  uz: {
    title: 'Oylik hisobot (Word)',
    subtitle: "Tanlangan oyda ro'yxatdan o'tganlarning to'liq ro'yxati: ism-familiya, telefon, sinf",
    month: 'Oy',
    year: 'Yil',
    total: 'Jami yangi',
    student: "O'quvchilar",
    parent: 'Ota-onalar',
    tutor: "O'qituvchilar",
    teacher: 'Mentorlar',
    prev: "o'tgan oy",
    newBadge: 'yangi',
    download: 'Word yuklab olish',
    preparing: 'Tayyorlanmoqda...',
    loadError: "Hisobot ma'lumotini olib bo'lmadi",
    success: 'Hisobot yuklab olindi',
    cancel: 'Bekor qilish'
  },
  ru: {
    title: 'Ежемесячный отчёт (Word)',
    subtitle: 'Полный список зарегистрированных за месяц: Ф.И.О., телефон, класс',
    month: 'Месяц',
    year: 'Год',
    total: 'Всего новых',
    student: 'Ученики',
    parent: 'Родители',
    tutor: 'Учителя',
    teacher: 'Менторы',
    prev: 'прошлый месяц',
    newBadge: 'новое',
    download: 'Скачать Word',
    preparing: 'Готовится...',
    loadError: 'Не удалось получить данные отчёта',
    success: 'Отчёт скачан',
    cancel: 'Отмена'
  }
}

const ROLE_STYLE = {
  student: 'from-[#EEF4FF] text-[#2563EB]',
  parent: 'from-[#FDF2F8] text-[#DB2777]',
  tutor: 'from-[#F5F3FF] text-[#7C3AED]',
  teacher: 'from-[#FFF7ED] text-[#F97316]'
}

const ChangeBadge = ({ cur, prev, t }) => {
  const change = changeOf(cur || 0, prev || 0)
  if (change.dir === 'same') {
    return <span className="rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[11px] font-bold text-[#64748B]">0%</span>
  }
  const up = change.dir !== 'down'
  const Icon = up ? TrendingUp : TrendingDown
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${
        up ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEE2E2] text-[#DC2626]'
      }`}
    >
      <Icon size={12} />
      {change.dir === 'new' ? t.newBadge : `${change.pct}%`}
    </span>
  )
}

/** "PPTX hisobot" oynasi: oy tanlanadi, ko'rsatkichlar oldindan ko'rinadi, fayl yuklanadi */
function MonthlyReportModal({ isOpen, onClose }) {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const t = TEXTS[lang]

  // Standart — o'tgan oy (to'liq yakunlangan oy)
  const now = new Date()
  const defaultMonth = now.getMonth() === 0 ? 12 : now.getMonth()
  const defaultYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
  const [month, setMonth] = useState(defaultMonth)
  const [year, setYear] = useState(defaultYear)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const monthOptions = useMemo(
    () => REPORT_MONTHS[lang].map((name, index) => ({ value: index + 1, label: name })),
    [lang]
  )
  const yearOptions = useMemo(
    () => [0, 1, 2].map((offset) => ({ value: now.getFullYear() - offset, label: String(now.getFullYear() - offset) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (!isOpen) return undefined
    let alive = true
    setLoading(true)
    request
      .get(URLS.monthlyUsersReport, { params: { year, month } })
      .then((res) => {
        if (alive) setData(res.data)
      })
      .catch((error) => {
        if (alive) {
          setData(null)
          // Sababni topish oson bo'lishi uchun server javob kodi ham ko'rsatiladi
          const code = error?.response?.status
          toast.error(code ? `${t.loadError} (${code})` : t.loadError)
        }
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [isOpen, year, month, t.loadError])

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (event) => event.key === 'Escape' && !downloading && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, downloading, onClose])

  if (!isOpen) return null

  const handleDownload = async () => {
    if (!data) return
    setDownloading(true)
    try {
      await downloadMonthlyReportDocx(data, lang)
      toast.success(t.success)
    } catch (error) {
      console.error('Word xatosi:', error)
      toast.error(t.loadError)
    } finally {
      setDownloading(false)
    }
  }

  const roles = ['student', 'parent', 'tutor', 'teacher']

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0F172A]/50 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Sarlavha */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1430] via-[#1B3A7A] to-[#2B579A] px-6 pb-6 pt-5 text-white">
          <span className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10" />
          <button
            type="button"
            onClick={onClose}
            disabled={downloading}
            aria-label="close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
          >
            <X size={18} />
          </button>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <FileText size={24} />
          </span>
          <h3 className="mt-3 text-xl font-bold">{t.title}</h3>
          <p className="mt-1 text-sm text-white/70">{t.subtitle}</p>
        </div>

        <div className="space-y-4 p-6">
          {/* Oy va yil */}
          <div className="grid grid-cols-2 gap-3">
            <label>
              <span className="mb-1 block text-xs font-semibold text-[#5B6478]">{t.month}</span>
              <FilterSelect label={t.month} options={monthOptions} value={month} onChange={(e) => setMonth(Number(e.target.value))} />
            </label>
            <label>
              <span className="mb-1 block text-xs font-semibold text-[#5B6478]">{t.year}</span>
              <FilterSelect label={t.year} options={yearOptions} value={year} onChange={(e) => setYear(Number(e.target.value))} />
            </label>
          </div>

          {/* Oldindan ko'rish */}
          <div className="rounded-2xl border border-[#EEF1F6] bg-[#F8FAFD] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#5B6478]">{t.total}</p>
                {loading ? (
                  <span className="mt-1 block h-8 w-20 animate-pulse rounded-lg bg-[#E3E8F1]" />
                ) : (
                  <p className="text-[28px] font-extrabold leading-tight text-[#0F1B3D]">{formatNumber(data?.total_current)}</p>
                )}
              </div>
              {!loading && data ? (
                <div className="text-right">
                  <ChangeBadge cur={data.total_current} prev={data.total_previous} t={t} />
                  <p className="mt-1 text-xs text-[#8A93A6]">
                    {t.prev}: {formatNumber(data.total_previous)}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {roles.map((role) => (
                <div
                  key={role}
                  className={`rounded-xl border border-white bg-gradient-to-br to-white p-3 shadow-sm ${ROLE_STYLE[role]}`}
                >
                  <p className="text-xs font-semibold">{t[role]}</p>
                  {loading ? (
                    <span className="mt-1 block h-6 w-12 animate-pulse rounded bg-[#E3E8F1]" />
                  ) : (
                    <div className="mt-0.5 flex items-center justify-between gap-2">
                      <span className="text-xl font-extrabold text-[#0F1B3D]">{formatNumber(data?.current?.[role])}</span>
                      {data ? <ChangeBadge cur={data.current?.[role]} prev={data.previous?.[role]} t={t} /> : null}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={downloading}
              className="h-12 flex-1 rounded-xl border border-[#E3E8F1] text-sm font-semibold text-[#191C1D] transition hover:bg-[#F6F8FC]"
            >
              {t.cancel}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={loading || downloading || !data}
              className="inline-flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2B579A] to-[#1E3F73] text-sm font-semibold text-white shadow-[0_10px_20px_-12px_rgba(43,87,154,0.9)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {downloading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  {t.preparing}
                </>
              ) : (
                <>
                  <Download size={17} />
                  {t.download}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonthlyReportModal
