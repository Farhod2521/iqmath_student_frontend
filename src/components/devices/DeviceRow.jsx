import { useTranslation } from 'react-i18next'
import { Monitor, Smartphone, Tablet, Laptop, Trash2 } from 'lucide-react'

const ICONS = { desktop: Monitor, mobile: Smartphone, tablet: Tablet, other: Laptop }

export const formatDeviceDate = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}, ${pad(date.getDate())}.${pad(
    date.getMonth() + 1
  )}.${date.getFullYear()}`
}

export const DeviceIcon = ({ type, active = true }) => {
  const Icon = ICONS[type] || Laptop
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${
        active ? 'bg-gradient-to-br from-[#60A5FA] to-[#2563EB]' : 'bg-[#CBD5E1]'
      }`}
    >
      <Icon size={22} />
    </span>
  )
}

/** Bitta qurilma qatori: ikonka, nom, holat, sana va "O'chirish" tugmasi */
function DeviceRow({ device, onRemove, removing = false, compact = false }) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap items-center gap-3 py-3.5 sm:flex-nowrap">
      <DeviceIcon type={device.device_type} active={device.is_active} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-[#191C1D] dark:text-white" title={device.device_name}>
          {device.device_name}
        </p>
        {device.is_current ? (
          <p className="text-xs font-medium text-[#16A34A]">{t('devices.thisDevice')}</p>
        ) : !device.is_active ? (
          <p className="text-xs font-medium text-[#8A93A6]">
            {t('devices.loggedOutAt', { date: formatDeviceDate(device.logged_out_at) })}
          </p>
        ) : compact ? (
          <p className="text-xs text-[#8A93A6]">
            {t('devices.lastActive', { date: formatDeviceDate(device.last_used_at) })}
          </p>
        ) : null}
      </div>
      {!compact ? (
        <div className="w-full shrink-0 text-sm text-[#5B6478] dark:text-gray-300 sm:w-48">
          <span className="text-xs text-[#8A93A6] sm:hidden">{t('devices.activatedAt')}: </span>
          {formatDeviceDate(device.created_at)}
        </div>
      ) : null}
      <div className="shrink-0 sm:w-28 sm:text-right">
        {device.is_active && !device.is_current && onRemove ? (
          <button
            type="button"
            onClick={() => onRemove(device)}
            disabled={removing}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-[#EF4444] transition hover:bg-[#FEF2F2] disabled:opacity-50"
          >
            {removing ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#EF4444] border-t-transparent" />
            ) : (
              <Trash2 size={16} />
            )}
            {t('devices.remove')}
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default DeviceRow
