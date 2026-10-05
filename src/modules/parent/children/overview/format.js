const pad = (n) => String(n).padStart(2, '0')

const toDate = (iso) => {
  if (!iso) return null
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? null : date
}

export const formatDate = (iso) => {
  const date = toDate(iso)
  return date ? `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}` : '—'
}

export const formatDateTime = (iso) => {
  const date = toDate(iso)
  return date ? `${formatDate(iso)} ${pad(date.getHours())}:${pad(date.getMinutes())}` : '—'
}

/** 7480 -> "2 soat 4 daqiqa" */
export const formatDuration = (seconds, t) => {
  const total = Math.max(0, Math.round(Number(seconds) || 0))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  return h ? t('childPage.hours', { h, m }) : t('childPage.minutes', { m })
}

export const formatMoney = (value) =>
  Math.round(Number(value) || 0)
    .toLocaleString('ru-RU')
    .replace(/,/g, ' ')
