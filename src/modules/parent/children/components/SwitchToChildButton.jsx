import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { LogIn } from 'lucide-react'
import DeviceLimitModal from '@/components/devices/DeviceLimitModal'
import { switchToChild } from '@/shared/utils/childSwitch'

const VARIANTS = {
  primary:
    'h-10 gap-2 rounded-xl bg-[#2563EB] px-4 text-sm font-semibold text-white shadow-[0_10px_22px_-12px_rgba(37,99,235,0.9)] hover:bg-[#1D4ED8]',
  soft: 'h-10 gap-2 rounded-xl bg-[#EAF1FF] px-4 text-sm font-semibold text-[#2563EB] hover:bg-[#DCE8FF]',
  icon: 'h-9 w-9 rounded-lg text-[#2563EB] hover:bg-[#EAF1FF]'
}

/**
 * "Farzand sifatida kirish" tugmasi: ota-ona sessiyasi farzand sessiyasiga almashadi.
 * Farzandning 2 ta qurilma chegarasi to'lgan bo'lsa — qurilma tanlash oynasi ochiladi.
 */
const SwitchToChildButton = ({ childId, variant = 'primary', label, className = '' }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [deviceLimit, setDeviceLimit] = useState(null)
  const [removingId, setRemovingId] = useState(null)

  const run = async (replaceDeviceId) => {
    try {
      await switchToChild(childId, replaceDeviceId)
      return true
    } catch (error) {
      if (error.deviceLimit) {
        setDeviceLimit(error.deviceLimit)
      } else {
        toast.error(t('childSwitch.error'))
      }
      return false
    }
  }

  const onClick = async (event) => {
    event.stopPropagation()
    setLoading(true)
    const ok = await run()
    if (!ok) setLoading(false)
  }

  const replaceDevice = async (device) => {
    setRemovingId(device.id)
    const ok = await run(device.id)
    if (!ok) setRemovingId(null)
  }

  const text = label ?? t('childSwitch.enter')

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        title={t('childSwitch.enter')}
        aria-label={t('childSwitch.enter')}
        className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap transition disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <LogIn size={variant === 'icon' ? 18 : 17} />
        )}
        {variant === 'icon' ? null : text}
      </button>
      {/* Oyna ichidagi bosishlar ota elementga (masalan, farzand kartasiga) o'tmasin */}
      <span onClick={(event) => event.stopPropagation()} role="presentation">
        <DeviceLimitModal
          info={deviceLimit}
          removingId={removingId}
          onRemove={replaceDevice}
          onClose={() => {
            setDeviceLimit(null)
            setLoading(false)
          }}
        />
      </span>
    </>
  )
}

export default SwitchToChildButton
