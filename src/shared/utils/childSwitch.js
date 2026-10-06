import { getSession, signIn } from 'next-auth/react'
import { getDeviceCredentials, parseDeviceLimitError } from './device'

/**
 * Ota-ona -> farzand profili va qaytish.
 * Sessiya next-auth orqali almashtiriladi, keyin sahifa to'liq qayta yuklanadi
 * (eski rol ma'lumotlari keshda qolmasligi uchun).
 * Xatolikda Error tashlanadi; qurilma cheklovida error.deviceLimit = {devices, max_devices}.
 */
const replaceSession = async (credentials, target) => {
  const session = await getSession()
  const result = await signIn('credentials', {
    ...credentials,
    current_token: session?.accessToken || '',
    redirect: false
  })
  if (!result?.ok) {
    const error = new Error(result?.error || 'switch failed')
    error.deviceLimit = parseDeviceLimitError(result?.error)
    throw error
  }
  window.location.href = target
}

export const switchToChild = (childId, replaceDeviceId) =>
  replaceSession(
    {
      switch_child_id: String(childId),
      ...getDeviceCredentials(),
      ...(replaceDeviceId ? { replace_device_id: replaceDeviceId } : {})
    },
    '/dashboard/student/home'
  )

export const returnToParent = () => replaceSession({ return_to_parent: '1' }, '/dashboard/parent/home')
