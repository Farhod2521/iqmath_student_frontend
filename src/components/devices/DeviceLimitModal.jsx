import { useTranslation } from 'react-i18next'
import { ShieldAlert, X } from 'lucide-react'
import DeviceRow from './DeviceRow'

/**
 * Login paytida 2 ta qurilma chegarasiga yetilganda ochiladi:
 * foydalanuvchi qurilmalardan birini chiqarib yuborib, shu qurilmadan kiradi.
 */
function DeviceLimitModal({ info, onRemove, onClose, removingId }) {
  const { t } = useTranslation()
  if (!info) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0F172A]/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 text-left shadow-2xl dark:bg-[#111A2B]">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#D97706]">
            <ShieldAlert size={24} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-[#191C1D] dark:text-white">{t('devices.limitTitle')}</h3>
            <p className="mt-1 text-sm text-[#5B6478] dark:text-gray-300">
              {t('devices.limitText', { count: info.max_devices || 2 })}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#6B7385] hover:bg-[#F1F5F9]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 divide-y divide-[#EEF1F6] rounded-2xl border border-[#EEF1F6] px-4 dark:divide-[#1F2A3C] dark:border-[#1F2A3C]">
          {(info.devices || []).map((device) => (
            <DeviceRow
              key={device.id}
              device={device}
              compact
              removing={removingId === device.id}
              onRemove={removingId ? undefined : onRemove}
            />
          ))}
        </div>

        <p className="mt-3 text-xs text-[#8A93A6]">{t('devices.limitHint')}</p>
      </div>
    </div>
  )
}

export default DeviceLimitModal
