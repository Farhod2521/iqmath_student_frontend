import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, ClipboardList, Phone, Search, StickyNote } from 'lucide-react'
import toast from 'react-hot-toast'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'

const TEXTS = {
  uz: {
    title: 'Bepul darsga arizalar',
    subtitle: 'iqmath.uz/math sahifasidagi "Bepul darsga yoziling" formalari orqali kelgan arizalar. Yangi ariza Telegram botga ham boradi.',
    all: 'Barchasi',
    search: 'Ism yoki telefon bo‘yicha qidirish',
    week: '7 kunda',
    month: '30 kunda',
    parent: 'Ota-ona',
    phone: 'Telefon',
    grade: 'Sinf',
    gradeItem: (n) => `${n}-sinf`,
    date: 'Yuborilgan',
    status: 'Holati',
    note: 'Izoh',
    notePh: 'Masalan: qo‘ng‘iroq qilindi, ertaga 15:00 da dars',
    call: 'Qo‘ng‘iroq',
    save: 'Saqlash',
    saved: 'Saqlandi',
    error: 'Xatolik yuz berdi',
    empty: 'Arizalar yo‘q',
    statuses: { new: 'Yangi', contacted: 'Bog‘lanildi', enrolled: 'Ro‘yxatdan o‘tdi', rejected: 'Rad etildi' }
  },
  ru: {
    title: 'Заявки на бесплатный урок',
    subtitle: 'Заявки из форм «Запишитесь на бесплатный урок» на странице iqmath.uz/math. Новая заявка также приходит в Telegram-бот.',
    all: 'Все',
    search: 'Поиск по имени или телефону',
    week: 'за 7 дней',
    month: 'за 30 дней',
    parent: 'Родитель',
    phone: 'Телефон',
    grade: 'Класс',
    gradeItem: (n) => `${n} класс`,
    date: 'Отправлено',
    status: 'Статус',
    note: 'Комментарий',
    notePh: 'Например: позвонили, урок завтра в 15:00',
    call: 'Позвонить',
    save: 'Сохранить',
    saved: 'Сохранено',
    error: 'Произошла ошибка',
    empty: 'Заявок нет',
    statuses: { new: 'Новая', contacted: 'Связались', enrolled: 'Зарегистрировался', rejected: 'Отказ' }
  }
}

const STATUS_STYLE = {
  new: 'bg-[#EAF1FF] text-[#2563EB] border-[#C9DAFE]',
  contacted: 'bg-[#FFF4E0] text-[#D97706] border-[#FBD9A8]',
  enrolled: 'bg-[#E8F8EF] text-[#16A34A] border-[#BFEBD0]',
  rejected: 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]'
}
const STATUS_KEYS = ['new', 'contacted', 'enrolled', 'rejected']

const pad = (n) => String(n).padStart(2, '0')
const formatDateTime = (iso) => {
  const d = new Date(iso)
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}
const formatPhone = (p) => {
  const d = String(p || '').replace(/\D/g, '')
  return d.length === 12 ? `+${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}` : `+${d}`
}

const LeadRow = ({ item, text, onSaved }) => {
  const [status, setStatus] = useState(item.status)
  const [note, setNote] = useState(item.note || '')
  const [saving, setSaving] = useState(false)
  useEffect(() => {
    setStatus(item.status)
    setNote(item.note || '')
  }, [item.status, item.note])

  const save = async (patch) => {
    setSaving(true)
    try {
      await request.patch(`${URLS.freeLessonList}${item.id}/`, patch)
      toast.success(text.saved)
      onSaved()
    } catch {
      toast.error(text.error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded-2xl border border-[#EEF1F7] bg-white p-4 shadow-[0_12px_30px_-28px_rgba(15,23,42,0.5)]">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <div className="min-w-[180px] flex-1">
          <p className="text-[15px] font-bold text-[#0F172A]">{item.parent_name}</p>
          <p className="text-[13px] text-[#64748B]">
            {item.class_num ? text.gradeItem(item.class_num) : '—'} · {formatDateTime(item.created_at)}
          </p>
        </div>
        <a
          href={`tel:+${item.phone}`}
          className="inline-flex items-center gap-2 rounded-xl bg-[#EAF1FF] px-3.5 py-2 text-[14px] font-semibold text-[#2563EB] transition hover:bg-[#D9E7FF]"
        >
          <Phone size={15} />
          {formatPhone(item.phone)}
        </a>
        <select
          value={status}
          disabled={saving}
          onChange={(e) => {
            setStatus(e.target.value)
            save({ status: e.target.value })
          }}
          className={`h-10 cursor-pointer rounded-xl border px-3 text-[13px] font-bold outline-none ${STATUS_STYLE[status]}`}
        >
          {STATUS_KEYS.map((key) => (
            <option key={key} value={key}>
              {text.statuses[key]}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <StickyNote size={16} className="shrink-0 text-[#94A3B8]" />
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && note !== (item.note || '') && save({ note })}
          placeholder={text.notePh}
          className="h-10 min-w-0 flex-1 rounded-xl border border-[#E2E8F0] px-3 text-[14px] outline-none focus:border-[#3B82F6]"
        />
        {note !== (item.note || '') ? (
          <button
            type="button"
            disabled={saving}
            onClick={() => save({ note })}
            className="h-10 shrink-0 rounded-xl bg-[#2563EB] px-4 text-[13px] font-semibold text-white transition hover:bg-[#1D4ED8] disabled:opacity-60"
          >
            {text.save}
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default function FreeLessons() {
  const { i18n } = useTranslation()
  const text = TEXTS[i18n.language === 'ru' ? 'ru' : 'uz']
  const queryClient = useQueryClient()
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(search.trim())
      setPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  const queryKey = ['free-lessons', status, query, page]
  const { data, isLoading } = useQuery(
    queryKey,
    () =>
      request
        .get(URLS.freeLessonList, { params: { status: status || undefined, search: query || undefined, page } })
        .then((res) => res.data),
    { keepPreviousData: true, refetchInterval: 60_000 }
  )
  const refresh = () => queryClient.invalidateQueries(['free-lessons'])

  const counts = data?.counts || {}
  const tabs = [{ key: '', label: text.all, count: data?.total }, ...STATUS_KEYS.map((key) => ({ key, label: text.statuses[key], count: counts[key] }))]

  return (
    <div className="mx-auto flex max-w-[1100px] flex-col gap-4 pb-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-[24px] font-extrabold text-[#0B1B3F]">
            <ClipboardList size={24} className="text-[#2563EB]" />
            {text.title}
          </h1>
          <p className="mt-1 max-w-[640px] text-[14px] text-[#64748B]">{text.subtitle}</p>
        </div>
        {data ? (
          <div className="flex gap-2">
            <span className="rounded-xl bg-white px-3 py-2 text-[13px] text-[#475569] shadow-sm">
              {text.week}: <b className="text-[#0F172A]">{data.last_7_days}</b>
            </span>
            <span className="rounded-xl bg-white px-3 py-2 text-[13px] text-[#475569] shadow-sm">
              {text.month}: <b className="text-[#0F172A]">{data.last_30_days}</b>
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key || 'all'}
            type="button"
            onClick={() => {
              setStatus(tab.key)
              setPage(1)
            }}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-[13px] font-semibold transition ${
              status === tab.key ? 'border-[#2563EB] bg-[#2563EB] text-white' : 'border-[#E2E8F0] bg-white text-[#334155] hover:bg-[#F8FAFC]'
            }`}
          >
            {tab.label}
            <span className={`rounded-md px-1.5 text-[12px] ${status === tab.key ? 'bg-white/20' : 'bg-[#F1F5F9]'}`}>{tab.count ?? 0}</span>
          </button>
        ))}
        <label className="ml-auto flex h-10 w-full items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 sm:w-[300px]">
          <Search size={16} className="text-[#94A3B8]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={text.search}
            className="h-full min-w-0 flex-1 bg-transparent text-[14px] outline-none"
          />
        </label>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[112px] animate-pulse rounded-2xl bg-[#EEF2F8]" />
          ))}
        </div>
      ) : data?.results?.length ? (
        <div className="space-y-3">
          {data.results.map((item) => (
            <LeadRow key={item.id} item={item} text={text} onSaved={refresh} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl bg-white p-8 text-center text-[14px] text-[#94A3B8]">{text.empty}</p>
      )}

      {data && data.pages > 1 ? (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[14px] text-[#475569]">
            {data.page} / {data.pages}
          </span>
          <button
            type="button"
            disabled={page >= data.pages}
            onClick={() => setPage((p) => p + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E8F0] bg-white disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      ) : null}
    </div>
  )
}
