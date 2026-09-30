import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { ChevronDown, ShieldCheck } from 'lucide-react'

import { useGetQuery } from '@/hooks'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'
import DeviceRow from '@/components/devices/DeviceRow'

/** Profil → "Qurilmalar": hisobga kirilgan qurilmalar va ularni chiqarib yuborish */
const DevicesTab = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [status, setStatus] = useState('active')
  const [removingId, setRemovingId] = useState(null)
  const [confirm, setConfirm] = useState(null)

  const { data, isLoading } = useGetQuery({
    key: KEYS.myDevices,
    url: URLS.myDevices,
    params: { status },
    refetchOnMount: true,
    staleTime: 0
  })
  const payload = data?.data || {}
  const devices = payload.devices || []
  const max = payload.max_devices || 2
  const activeCount = payload.active_count ?? devices.filter((d) => d.is_active).length

  const removeDevice = async (device) => {
    setConfirm(null)
    setRemovingId(device.id)
    try {
      await request.delete(`${URLS.myDevices}${device.id}/`)
      toast.success(t('devices.removed'))
      queryClient.invalidateQueries([KEYS.myDevices])
    } catch {
      toast.error(t('devices.removeError'))
    } finally {
      setRemovingId(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Holat kartasi */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-gradient-to-r from-[#EEF4FF] to-[#F8FAFF] p-4 dark:from-[#1A2436] dark:to-[#111A2B]">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2563EB] shadow-sm dark:bg-[#0F172A]">
          <ShieldCheck size={24} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-[#191C1D] dark:text-white">{t('devices.title')}</p>
          <p className="text-sm text-[#5B6478] dark:text-gray-300">{t('devices.limitInfo', { count: max })}</p>
        </div>
        <div className="w-full sm:w-56">
          <div className="mb-1 flex justify-between text-xs font-semibold text-[#5B6478]">
            <span>{t('devices.activeDevices')}</span>
            <span className="text-[#2563EB]">
              {activeCount} / {max}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white dark:bg-[#0F172A]">
            <div
              className={`h-full rounded-full ${activeCount >= max ? 'bg-[#F59E0B]' : 'bg-[#2563EB]'}`}
              style={{ width: `${Math.min(100, (activeCount / max) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filtr */}
      <div className="flex justify-end">
        <label className="relative">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-10 cursor-pointer appearance-none rounded-xl border border-[#E5EAF2] bg-white pl-3.5 pr-9 text-sm font-medium text-[#191C1D] outline-none focus:border-[#2563EB] dark:border-[#26324A] dark:bg-[#111A2B] dark:text-white"
          >
            <option value="active">{t('devices.filterActive')}</option>
            <option value="all">{t('devices.filterAll')}</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7385]"
          />
        </label>
      </div>

      {/* Jadval */}
      <div className="overflow-hidden rounded-2xl border border-[#EEF1F6] dark:border-[#1F2A3C]">
        <div className="hidden bg-[#F5F8FF] px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#5D87FF] dark:bg-[#1A2436] sm:flex">
          <span className="flex-1 pl-14">{t('devices.colName')}</span>
          <span className="w-48">{t('devices.activatedAt')}</span>
          <span className="w-28 text-right">{t('devices.colActions')}</span>
        </div>
        <div className="divide-y divide-[#EEF1F6] px-4 dark:divide-[#1F2A3C]">
          {isLoading ? (
            <p className="py-10 text-center text-sm text-[#8A93A6]">{t('loading')}</p>
          ) : devices.length ? (
            devices.map((device) => (
              <DeviceRow
                key={device.id}
                device={device}
                removing={removingId === device.id}
                onRemove={(item) => setConfirm(item)}
              />
            ))
          ) : (
            <p className="py-10 text-center text-sm text-[#8A93A6]">{t('devices.empty')}</p>
          )}
        </div>
      </div>

      {/* Tasdiqlash */}
      {confirm ? (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0F172A]/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl dark:bg-[#111A2B]">
            <p className="text-lg font-bold text-[#191C1D] dark:text-white">{t('devices.confirmTitle')}</p>
            <p className="mt-2 text-sm text-[#5B6478] dark:text-gray-300">
              {t('devices.confirmText', { name: confirm.device_name })}
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirm(null)}
                className="h-11 flex-1 rounded-xl border border-[#E5EAF2] font-semibold text-[#191C1D] hover:bg-[#F6F8FC] dark:border-[#26324A] dark:text-white"
              >
                {t('devices.cancel')}
              </button>
              <button
                type="button"
                onClick={() => removeDevice(confirm)}
                className="h-11 flex-1 rounded-xl bg-[#EF4444] font-semibold text-white hover:bg-[#DC2626]"
              >
                {t('devices.remove')}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default DevicesTab
