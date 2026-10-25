import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { CalendarClock, Gift, Info, Loader2, Save, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'

const TEXTS = {
  uz: {
    title: 'Tekin muddat',
    subtitle: 'Yangi ro‘yxatdan o‘tgan foydalanuvchilarga boshida beriladigan bepul foydalanish muddati',
    current: 'Hozirgi tekin muddat',
    days: 'kun',
    notSet: 'O‘rnatilmagan',
    notSetHint: 'Sozlama yo‘q — tizim standart 7 kun beradi.',
    label: 'Tekin muddat (kun)',
    presets: 'Tez tanlash',
    save: 'Saqlash',
    create: 'O‘rnatish',
    remove: 'Sozlamani o‘chirish',
    removeConfirm: 'Sozlama o‘chirilsa, yangi foydalanuvchilarga standart 7 kun beriladi. Davom etasizmi?',
    note: 'O‘zgarish faqat bundan keyin ro‘yxatdan o‘tadigan foydalanuvchilarga ta’sir qiladi. Mavjud foydalanuvchilarning muddati o‘zgarmaydi.',
    saved: 'Tekin muddat saqlandi',
    removed: 'Sozlama o‘chirildi',
    invalid: '0 dan 365 gacha butun son kiriting',
    error: 'Xatolik yuz berdi'
  },
  ru: {
    title: 'Бесплатный период',
    subtitle: 'Бесплатный период, который получают новые зарегистрированные пользователи',
    current: 'Текущий бесплатный период',
    days: 'дн.',
    notSet: 'Не задан',
    notSetHint: 'Настройки нет — система даёт стандартные 7 дней.',
    label: 'Бесплатный период (дней)',
    presets: 'Быстрый выбор',
    save: 'Сохранить',
    create: 'Установить',
    remove: 'Удалить настройку',
    removeConfirm: 'Если удалить настройку, новым пользователям будет даваться стандартные 7 дней. Продолжить?',
    note: 'Изменение действует только на пользователей, которые зарегистрируются после этого. Срок существующих пользователей не меняется.',
    saved: 'Бесплатный период сохранён',
    removed: 'Настройка удалена',
    invalid: 'Введите целое число от 0 до 365',
    error: 'Произошла ошибка'
  }
}

const PRESETS = [3, 7, 14, 30]
const QUERY_KEY = ['trial-setting']

export default function TrialSettings() {
  const { i18n } = useTranslation()
  const text = TEXTS[i18n.language === 'ru' ? 'ru' : 'uz']
  const queryClient = useQueryClient()

  const { data: setting, isLoading } = useQuery(QUERY_KEY, () =>
    request.get(URLS.subscriptionSetting).then((res) => (Array.isArray(res.data) ? res.data[0] : null) || null)
  )

  const [days, setDays] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (setting) setDays(String(setting.free_trial_days))
  }, [setting])

  const value = Number(days)
  const isValid = days !== '' && Number.isInteger(value) && value >= 0 && value <= 365
  const unchanged = setting && value === setting.free_trial_days

  const showError = (err) => toast.error(err?.response?.data?.detail || err?.response?.data?.error || text.error)

  const handleSave = async () => {
    if (!isValid) {
      toast.error(text.invalid)
      return
    }
    setSaving(true)
    try {
      if (setting) {
        await request.put(`${URLS.subscriptionSetting}${setting.id}/`, { free_trial_days: value })
      } else {
        await request.post(URLS.subscriptionSetting, { free_trial_days: value })
      }
      toast.success(text.saved)
      queryClient.invalidateQueries(QUERY_KEY)
    } catch (err) {
      showError(err)
    } finally {
      setSaving(false)
    }
  }

  const handleRemove = async () => {
    if (!setting || !window.confirm(text.removeConfirm)) return
    setSaving(true)
    try {
      await request.delete(`${URLS.subscriptionSetting}${setting.id}/`)
      toast.success(text.removed)
      setDays('')
      queryClient.invalidateQueries(QUERY_KEY)
    } catch (err) {
      showError(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-[760px] flex-col gap-4 pb-6">
      <div>
        <h1 className="text-[24px] font-extrabold text-[#0B1B3F]">{text.title}</h1>
        <p className="mt-1 text-[14px] text-[#64748B]">{text.subtitle}</p>
      </div>

      {/* Hozirgi qiymat */}
      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#2563EB] to-[#4F46E5] p-6 text-white shadow-[0_24px_50px_-30px_rgba(37,99,235,0.9)]">
        <span className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" />
        <div className="relative flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <Gift size={26} />
          </span>
          <div>
            <p className="text-[14px] text-white/80">{text.current}</p>
            {isLoading ? (
              <div className="mt-2 h-8 w-28 animate-pulse rounded-lg bg-white/20" />
            ) : setting ? (
              <p className="text-[32px] font-extrabold leading-tight">
                {setting.free_trial_days} <span className="text-[18px] font-semibold">{text.days}</span>
              </p>
            ) : (
              <>
                <p className="text-[24px] font-extrabold leading-tight">{text.notSet}</p>
                <p className="text-[13px] text-white/80">{text.notSetHint}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tahrirlash */}
      <div className="rounded-[22px] border border-[#EEF1F7] bg-white p-5 shadow-sm sm:p-6">
        <label htmlFor="trial-days" className="flex items-center gap-2 text-[14px] font-bold text-[#0B1B3F]">
          <CalendarClock size={17} className="text-[#2563EB]" />
          {text.label}
        </label>
        <input
          id="trial-days"
          type="number"
          min={0}
          max={365}
          inputMode="numeric"
          value={days}
          disabled={isLoading || saving}
          onChange={(event) => setDays(event.target.value.replace(/[^\d]/g, ''))}
          onKeyDown={(event) => event.key === 'Enter' && handleSave()}
          className="mt-3 h-12 w-full rounded-xl border border-[#E2E8F0] px-4 text-[16px] font-semibold text-[#0B1B3F] outline-none transition focus:border-[#3B82F6] focus:ring-4 focus:ring-[#3B82F6]/10"
        />

        <p className="mt-4 text-[13px] font-medium text-[#64748B]">{text.presets}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRESETS.map((n) => (
            <button
              key={n}
              type="button"
              disabled={saving}
              onClick={() => setDays(String(n))}
              className={`rounded-xl border px-4 py-2 text-[14px] font-semibold transition ${
                value === n && days !== ''
                  ? 'border-[#2563EB] bg-[#EAF1FF] text-[#2563EB]'
                  : 'border-[#E2E8F0] text-[#334155] hover:bg-[#F8FAFC]'
              }`}
            >
              {n} {text.days}
            </button>
          ))}
        </div>

        <p className="mt-5 flex items-start gap-2 rounded-xl bg-[#F8FAFC] p-3 text-[13px] leading-relaxed text-[#475569]">
          <Info size={16} className="mt-0.5 shrink-0 text-[#2563EB]" />
          {text.note}
        </p>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
          {setting ? (
            <button
              type="button"
              disabled={saving}
              onClick={handleRemove}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#FBD5D5] px-4 py-3 text-[14px] font-semibold text-[#DC2626] transition hover:bg-[#FEF2F2] disabled:opacity-50"
            >
              <Trash2 size={16} />
              {text.remove}
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            disabled={saving || isLoading || !isValid || unchanged}
            onClick={handleSave}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? <Loader2 size={17} className="animate-spin" /> : <Save size={17} />}
            {setting ? text.save : text.create}
          </button>
        </div>
      </div>
    </div>
  )
}
