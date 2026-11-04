import toast from 'react-hot-toast'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'

export const API = URLS.ligaAdmin
export const CARD = 'rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm sm:p-5'
export const INPUT = 'h-10 rounded-lg border border-[#EBEDF0] bg-white px-3 text-sm outline-none focus:border-[#5D87FF]'
export const BUTTON = 'inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#5D87FF] px-6 text-sm font-semibold text-white transition hover:bg-[#4570EA] disabled:opacity-60'
export const BUTTON_LIGHT = 'h-10 rounded-lg bg-[#F1F4F9] px-4 text-sm font-semibold text-[#475569] transition hover:bg-[#E6EBF5]'
export const TH = 'whitespace-nowrap px-3 py-2.5 text-left text-xs font-semibold text-[#8A8A8E]'
export const TD = 'whitespace-nowrap px-3 py-2.5 text-sm text-[#191C1D]'

export const TEST_STATUS = { draft: 'Qoralama', upcoming: 'Kutilmoqda', live: 'Davom etmoqda', finished: 'Tugagan' }
export const ATTEMPT_STATUS = { in_progress: 'Ishlamoqda', finished: 'Yakunlagan', expired: 'Vaqti tugagan' }

export const formatDateTime = (value) =>
  value
    ? new Date(value).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '—'

export const formatDuration = (seconds) => {
  if (seconds === null || seconds === undefined) return '—'
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}

// datetime-local qiymati va server vaqti o'rtasida
export const toLocalInput = (value) => {
  if (!value) return ''
  const date = new Date(value)
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}
export const toIso = (value) => new Date(value).toISOString()

export const showError = (error) => {
  const data = error?.response?.data
  const message = data?.message || data?.non_field_errors?.[0] || (data && Object.values(data).flat()[0])
  toast.error(typeof message === 'string' ? message : 'Xatolik yuz berdi')
}

export const downloadExcel = async (url, params, filename) => {
  try {
    const response = await request.get(url, { params: { ...params, export: 'xlsx' }, responseType: 'blob' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(response.data)
    link.download = filename
    link.click()
    URL.revokeObjectURL(link.href)
  } catch (error) {
    showError(error)
  }
}
