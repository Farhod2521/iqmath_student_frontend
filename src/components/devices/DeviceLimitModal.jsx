import { useTranslation } from 'react-i18next'
import { Clock3, Info, ShieldAlert, Trash2, X } from 'lucide-react'
import { DeviceIcon, formatDeviceDate } from './DeviceRow'

/**
 * Login paytida 2 ta qurilma chegarasiga yetilganda ochiladi:
 * foydalanuvchi qurilmalardan birini chiqarib yuborib, shu qurilmadan kiradi.
 * Mobilda pastdan chiqadigan panel (bottom sheet), kattaroq ekranda markazdagi oyna.
 */
function DeviceLimitModal({ info, onRemove, onClose, removingId }) {
  const { t } = useTranslation()
  if (!info) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-[#0F172A]/55 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-[28px] bg-white px-5 pb-6 pt-3 text-left shadow-2xl dark:bg-[#111A2B] sm:max-w-md sm:rounded-3xl sm:p-7">
        {/* Mobil "tutqich" */}
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-[#E2E8F0] sm:hidden" />

        <button
          type="button"
          onClick={onClose}
          aria-label="close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F5F9] text-[#6B7385] transition hover:bg-[#E2E8F0] dark:bg-white/10 dark:text-gray-300"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF3C7] text-[#D97706] ring-8 ring-[#FFFBEB] dark:ring-[#D97706]/10">
            <ShieldAlert size={30} />
          </span>
          <h3 className="mt-4 text-xl font-bold text-[#191C1D] dark:text-white">{t('devices.limitTitle')}</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#5B6478] dark:text-gray-300">
            {t('devices.limitText', { count: info.max_devices || 2 })}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {(info.devices || []).map((device) => {
            const removing = removingId === device.id
            const canRemove = device.is_active && !device.is_current && onRemove
            return (
              <div
                key={device.id}
                className="rounded-2xl border border-[#EEF1F6] bg-[#F8FAFC] p-3.5 dark:border-[#1F2A3C] dark:bg-[#0F172A]"
              >
                <div className="flex items-start gap-3">
                  <DeviceIcon type={device.device_type} active={device.is_active} />
                  <div className="min-w-0 flex-1">
                    <p
                      className="line-clamp-2 break-words text-[15px] font-bold leading-snug text-[#191C1D] dark:text-white"
                      title={device.device_name}
                    >
                      {device.device_name}
                    </p>
                    {device.is_current ? (
                      <p className="mt-1 text-xs font-medium text-[#16A34A]">{t('devices.thisDevice')}</p>
                    ) : (
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-[#8A93A6]">
                        <Clock3 size={13} className="shrink-0" />
                        <span>{t('devices.lastActive', { date: formatDeviceDate(device.last_used_at) })}</span>
                      </p>
                    )}
                  </div>
                </div>

                {canRemove ? (
                  <button
                    type="button"
                    onClick={() => onRemove(device)}
                    disabled={!!removingId}
                    className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#FECACA] bg-white text-sm font-semibold text-[#EF4444] transition hover:bg-[#FEF2F2] disabled:opacity-50 dark:bg-transparent"
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
            )
          })}
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#EFF6FF] px-3 py-2.5 text-xs leading-relaxed text-[#3B5BAA] dark:bg-[#1E2B48] dark:text-[#9DB8F5]">
          <Info size={15} className="mt-px shrink-0" />
          <span>{t('devices.limitHint')}</span>
        </div>
      </div>
    </div>
  )
}

export default DeviceLimitModal
