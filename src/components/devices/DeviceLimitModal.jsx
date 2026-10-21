import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
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
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Oyna ochiq paytda orqadagi sahifa aylanmaydi
  useEffect(() => {
    if (!info) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [info])

  if (!info || !mounted) return null

  // Portal: login kartasi (blur/transform) ichida "fixed" oyna karta chegarasiga qamalib, chetida ramka chiqib qolardi
  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-[#0F172A]/55 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="relative max-h-[92dvh] w-full overflow-y-auto overflow-x-hidden rounded-t-[28px] bg-white px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 text-left shadow-2xl dark:bg-[#111A2B] sm:max-w-md sm:rounded-3xl sm:p-7">
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

        <div className="flex flex-col items-center px-2 text-center sm:px-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FEF3C7] text-[#D97706] ring-8 ring-[#FFFBEB] dark:ring-[#D97706]/10 sm:h-16 sm:w-16">
            <ShieldAlert size={28} />
          </span>
          <h3 className="mt-4 break-words text-lg font-bold leading-snug text-[#191C1D] dark:text-white sm:text-xl">
            {t('devices.limitTitle')}
          </h3>
          <p className="mt-2 w-full max-w-sm break-words text-sm leading-relaxed text-[#5B6478] dark:text-gray-300">
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
                      <p className="mt-1 flex items-start gap-1.5 text-xs leading-snug text-[#8A93A6]">
                        <Clock3 size={13} className="mt-px shrink-0" />
                        <span className="min-w-0 break-words">{t('devices.lastActive', { date: formatDeviceDate(device.last_used_at) })}</span>
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
          <span className="min-w-0 break-words">{t('devices.limitHint')}</span>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default DeviceLimitModal
