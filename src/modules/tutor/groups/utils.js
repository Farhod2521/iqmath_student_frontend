export const AVATAR_COLORS = ['#5D87FF', '#8B5CF6', '#22C55E', '#F59E0B', '#EC4899', '#0EA5A5']

export const initialsOf = (name) =>
  (name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || '?'

export const avatarColor = (index) => AVATAR_COLORS[index % AVATAR_COLORS.length]

// "998944180008" -> "+998 94 418 00 08"
export const formatPhone = (phone) => {
  if (!phone) return ''
  const digits = String(phone).replace(/\D/g, '')
  if (digits.length !== 12) return `+${digits}`
  return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`
}

export const apiErrorMessage = (error, fallback) =>
  error?.response?.data?.error ||
  error?.response?.data?.detail ||
  error?.response?.data?.name?.[0] ||
  error?.response?.data?.student_ids?.[0] ||
  fallback
