import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { FaEdge, FaFirefoxBrowser, FaOpera, FaSafari, FaYandex } from 'react-icons/fa'
import {
  CalendarDays,
  LogOut,
  MapPin,
  Monitor,
  MonitorSmartphone,
  MoreVertical,
  ShieldCheck,
  Smartphone,
  TabletSmartphone
} from 'lucide-react'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'
import { card } from '@/modules/parent/home/dashboard/shared'
import { formatDateTime } from './format'

/** Rangli Chrome belgisi */
const ChromeIcon = ({ size = 26 }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
    <circle cx="24" cy="24" r="22" fill="#fff" />
    <path d="M24 2a22 22 0 0119.05 11H24a11 11 0 00-9.53 5.5L5.43 13A22 22 0 0124 2z" fill="#EA4335" />
    <path d="M43.05 13A22 22 0 0124 46l9.53-16.5A11 11 0 0033.53 19 11 11 0 0024 13z" fill="#FBBC05" />
    <path d="M24 46A22 22 0 015.43 13l9.04 16.5A11 11 0 0033.53 29.5z" fill="#34A853" />
    <circle cx="24" cy="24" r="9" fill="#fff" />
    <circle cx="24" cy="24" r="7" fill="#4285F4" />
  </svg>
)

const BrowserIcon = ({ name = '' }) => {
  const n = name.toLowerCase()
  if (n.includes('chrome') || n.includes('chromium')) return <ChromeIcon />
  const Icon = n.includes('firefox')
    ? FaFirefoxBrowser
    : n.includes('safari')
      ? FaSafari
      : n.includes('edge')
        ? FaEdge
        : n.includes('opera')
          ? FaOpera
          : n.includes('yandex')
            ? FaYandex
            : null
  // Noma'lum brauzer — sukut bo'yicha Chrome belgisi
  return Icon ? <Icon size={24} className="text-[#2563EB]" /> : <ChromeIcon />
}

// Telefon/planshet — telefon rasmi, qolganlari (kompyuter va noma'lum) — kompyuter rasmi
const isPhone = (type) => type === 'mobile' || type === 'tablet'

const BROWSER_RE = /(chrome|firefox|safari|edge|opera|yandex|samsung internet)[^,]*/i
const OS_RE = /(windows[^,]*|android[^,]*|ios[^,]*|mac ?os[^,]*|linux[^,]*)/i

/**
 * Brauzer va OS: backend yuborsa o'shani, bo'lmasa qurilma nomidan ("Windows 10, Chrome 154"),
 * u ham bo'lmasa sukut bo'yicha: telefon — Chrome / Android 14, kompyuter — Chrome / Windows 11.
 */
const browserOs = (device) => {
  const name = device.device_name || ''
  const browser = device.browser || name.match(BROWSER_RE)?.[0]?.trim() || 'Chrome'
  const os = device.os || name.match(OS_RE)?.[0]?.trim() || (isPhone(device.device_type) ? 'Android 14' : 'Windows 11')
  return { browser, os }
}

const DeviceImage = ({ type, active }) => (
  <span className="flex h-14 w-20 shrink-0 items-center justify-center">
    <img
      src={isPhone(type) ? '/images/device-phone.webp' : '/images/device-desktop.webp'}
      alt=""
      loading="lazy"
      className={`max-h-full max-w-full object-contain drop-shadow-[0_8px_10px_rgba(15,23,42,0.15)] ${
        active ? '' : 'opacity-60 grayscale-[35%]'
      }`}
    />
  </span>
)

const relativeDay = (iso, t) => {
  if (!iso) return '—'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  const pad = (n) => String(n).padStart(2, '0')
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  if (date.toDateString() === today.toDateString()) return `${t('childPage.dev.today')}, ${time}`
  if (date.toDateString() === yesterday.toDateString()) return `${t('childPage.dev.yesterday')}, ${time}`
  return formatDateTime(iso)
}

const StatCard = ({ icon: Icon, color, soft, label, value }) => (
  <div className={`${card} flex items-center gap-4 p-4`}>
    <span
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
      style={{ backgroundColor: soft, color }}
    >
      <Icon size={26} />
    </span>
    <div className="min-w-0">
      <p className="truncate text-sm text-[#64748B]">{label}</p>
      <p className="truncate text-xl font-extrabold text-[#0B1B3F] dark:text-white">{value}</p>
    </div>
  </div>
)

const RowMenu = ({ onKick, label }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const close = (event) => !ref.current?.contains(event.target) && setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="menu"
        className="flex h-9 w-9 items-center justify-center rounded-xl text-[#2563EB] transition hover:bg-[#EAF1FF]"
      >
        <MoreVertical size={18} />
      </button>
      {open ? (
        <div className="absolute right-0 top-10 z-20 w-52 overflow-hidden rounded-xl border border-[#EEF1F6] bg-white py-1 shadow-xl dark:border-[#26324A] dark:bg-[#111A2B]">
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              onKick()
            }}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-medium text-[#DC2626] hover:bg-[#FEF2F2]"
          >
            <LogOut size={16} />
            {label}
          </button>
        </div>
      ) : null}
    </div>
  )
}

/** Farzand sahifasi → "Qurilmalar" tabi */
const DevicesTab = ({ childId, devices = [] }) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [confirm, setConfirm] = useState(null)
  const [busy, setBusy] = useState(false)
  const d = (key, opts) => t(`childPage.dev.${key}`, opts)

  const active = devices.filter((item) => item.is_active)
  const recent = [...devices].sort((a, b) => new Date(b.last_used_at) - new Date(a.last_used_at))[0]

  const kick = async () => {
    if (!confirm) return
    setBusy(true)
    try {
      await request.delete(`${URLS.parentChildOverview}${childId}/devices/${confirm.id}/`)
      toast.success(d('kicked'))
      queryClient.invalidateQueries([KEYS.parentChildOverview, childId])
      setConfirm(null)
    } catch {
      toast.error(d('kickError'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Sarlavha */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF1FF] text-[#2563EB]">
            <MonitorSmartphone size={24} />
          </span>
          <div>
            <h2 className="text-xl font-bold text-[#0B1B3F] dark:text-white">{d('title')}</h2>
            <p className="text-sm text-[#64748B]">{d('subtitle')}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-xl bg-[#EAF1FF] px-3.5 py-2 text-xs font-semibold text-[#2563EB]">
          <ShieldCheck size={16} />
          {d('limit')}
        </span>
      </div>

      {/* Ko'rsatkichlar */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={TabletSmartphone}
          color="#2563EB"
          soft="#EAF1FF"
          label={d('total')}
          value={d('pcs', { n: devices.length })}
        />
        <StatCard
          icon={Monitor}
          color="#16A34A"
          soft="#E7F8EE"
          label={d('active')}
          value={d('pcs', { n: active.length })}
        />
        <StatCard
          icon={Smartphone}
          color="#64748B"
          soft="#F1F5F9"
          label={d('removed')}
          value={d('pcs', { n: devices.length - active.length })}
        />
        <StatCard
          icon={ShieldCheck}
          color="#2563EB"
          soft="#EAF1FF"
          label={d('lastActive')}
          value={relativeDay(recent?.last_used_at, t)}
        />
      </div>

      {/* Ro'yxat */}
      <div className={`${card} p-3 sm:p-4`}>
        {!devices.length ? (
          <div className="flex flex-col items-center py-12 text-center">
            <img src="/images/device-desktop.webp" alt="" className="mb-4 h-20 opacity-70" />
            <p className="font-semibold text-[#0F172A] dark:text-white">{d('empty')}</p>
            <p className="mt-1 text-sm text-[#64748B]">{d('emptyHint')}</p>
          </div>
        ) : (
          <ul className="divide-y divide-[#EEF1F6] dark:divide-[#26324A]">
            {devices.map((device) => {
              const isRecent = recent && device.id === recent.id && device.is_active
              const info = browserOs(device)
              return (
                <li
                  key={device.id}
                  className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 rounded-2xl px-3 py-3 md:grid-cols-[auto_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_120px_auto] ${
                    isRecent ? 'bg-[#F3F7FF] dark:bg-[#16213A]' : ''
                  }`}
                >
                  <DeviceImage type={device.device_type} active={device.is_active} />

                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 font-bold text-[#0F172A] dark:text-white">
                      <span className="truncate">{device.device_name}</span>
                      {isRecent ? (
                        <span className="rounded-md bg-[#DCE8FF] px-2 py-0.5 text-[11px] font-semibold text-[#2563EB]">
                          {d('recent')}
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-[#64748B]">
                      <MapPin size={13} className="shrink-0" />
                      {device.ip_address || '—'}
                    </p>
                  </div>

                  <div className="col-span-3 flex items-center gap-3 md:col-span-1">
                    <BrowserIcon name={info.browser} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#0F172A] dark:text-white">{info.browser}</p>
                      <p className="truncate text-xs text-[#64748B]">{info.os}</p>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center gap-3 md:col-span-1">
                    <CalendarDays size={22} className="shrink-0 text-[#2563EB]" />
                    <div>
                      <p className="text-xs text-[#64748B]">{d('lastSeen')}</p>
                      <p className="text-sm font-semibold text-[#0F172A] dark:text-white">
                        {formatDateTime(device.last_used_at)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                      device.is_active ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#F1F5F9] text-[#64748B]'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${device.is_active ? 'bg-[#16A34A]' : 'bg-[#94A3B8]'}`}
                    />
                    {device.is_active ? d('statusActive') : d('statusRemoved')}
                  </span>

                  <div className="row-start-1 justify-self-end md:row-start-auto">
                    {device.is_active ? (
                      <RowMenu label={d('kick')} onKick={() => setConfirm(device)} />
                    ) : (
                      <span className="block h-9 w-9" />
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Tasdiqlash oynasi */}
      {confirm ? (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0F172A]/50 p-4 backdrop-blur-sm"
          onClick={() => setConfirm(null)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl dark:bg-[#111A2B]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex justify-center">
              <DeviceImage type={confirm.device_type} active />
            </div>
            <p className="mt-3 text-lg font-bold text-[#0F172A] dark:text-white">{d('confirmTitle')}</p>
            <p className="mt-2 text-sm text-[#64748B]">{d('confirmText', { name: confirm.device_name })}</p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirm(null)}
                className="h-11 flex-1 rounded-xl border border-[#E5EAF2] font-semibold text-[#0F172A] hover:bg-[#F6F8FC] dark:border-[#26324A] dark:text-white"
              >
                {d('cancel')}
              </button>
              <button
                type="button"
                onClick={kick}
                disabled={busy}
                className="h-11 flex-1 rounded-xl bg-[#EF4444] font-semibold text-white hover:bg-[#DC2626] disabled:opacity-60"
              >
                {d('kick')}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default DevicesTab
