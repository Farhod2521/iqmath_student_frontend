import { useState } from 'react'
import { CalendarDays, Clock, Hash, Layers, Pencil } from 'lucide-react'
import LigaDialog from '@/components/modal/LigaDialog'
import { request } from '@/services/api'
import { IconField } from './LigaParts'
import { API, INPUT, showError, toIso, toLocalInput } from './utils'

const PRIZES = [1, 2, 3]
const PRIZE_FIELDS = PRIZES.flatMap((place) => [`prize_${place}_uz`, `prize_${place}_ru`])

/** Mavsum raqami, haftalar soni va sovg'alari */
export const SeasonEditDialog = ({ season, onSaved, onClose }) => {
  const [form, setForm] = useState(() => ({
    number: season.number,
    weeks_count: season.weeks_count,
    ...Object.fromEntries(PRIZE_FIELDS.map((field) => [field, season[field]]))
  }))
  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value })

  const save = async () => {
    try {
      await request.patch(`${API}seasons/${season.id}/`, { ...form, number: Number(form.number), weeks_count: Number(form.weeks_count) })
      await onSaved()
    } catch (error) {
      showError(error)
    }
  }

  return (
    <LigaDialog
      open
      Icon={Pencil}
      title={`${season.number}-mavsumni tahrirlash`}
      confirmLabel="Saqlash"
      cancelLabel="Bekor qilish"
      disabled={!(Number(form.number) > 0 && Number(form.weeks_count) > 0) || PRIZE_FIELDS.some((field) => !form[field].trim())}
      onConfirm={save}
      onClose={onClose}
    >
      <div className="grid grid-cols-2 gap-3">
        <IconField label="Mavsum raqami" Icon={Hash} required type="number" min={1} value={form.number} onChange={update('number')} />
        <IconField label="Haftalar soni" Icon={CalendarDays} required type="number" min={1} value={form.weeks_count} onChange={update('weeks_count')} />
      </div>
      <p className="mt-2 text-xs leading-relaxed text-[#8A8A8E]">
        Oxirgi hafta testi tugagach mavsum avtomatik yopiladi, shuning uchun haftalar sonini kamaytirsangiz mavsum ertaroq yopiladi.
      </p>
      <p className="mb-2 mt-4 text-sm font-semibold text-[#191C1D]">Sovg'alar</p>
      <div className="flex flex-col gap-2">
        {PRIZES.map((place) => (
          <div key={place} className="grid grid-cols-[52px_1fr_1fr] items-center gap-2">
            <span className="text-sm text-[#475569]">{place}-o'rin</span>
            {['uz', 'ru'].map((lang) => (
              <input
                key={lang}
                aria-label={`${place}-o'rin sovg'asi (${lang})`}
                placeholder={lang === 'uz' ? "O'zbekcha" : 'Ruscha'}
                maxLength={100}
                value={form[`prize_${place}_${lang}`]}
                onChange={update(`prize_${place}_${lang}`)}
                className={`${INPUT} min-w-0`}
              />
            ))}
          </div>
        ))}
      </div>
    </LigaDialog>
  )
}

const WEEK_FIELDS = [
  ['Hafta raqami', 'week_number', 'number', Hash],
  ['Boshlanish vaqti', 'start_at', 'datetime-local', CalendarDays],
  ['Tugash vaqti', 'end_at', 'datetime-local', CalendarDays],
  ['Ishlash vaqti (daqiqa)', 'duration_minutes', 'number', Clock],
  ['Savollar soni', 'question_count', 'number', Layers]
]

const weekForm = (test) => ({
  week_number: test.week_number,
  start_at: toLocalInput(test.start_at),
  end_at: toLocalInput(test.end_at),
  duration_minutes: test.duration_minutes,
  question_count: test.question_count
})

/** Haftaning hamma sinf testlari birga o'zgaradi. Sinflarda vaqt farq qilishi mumkin: faqat o'zgargan maydon yuboriladi */
export const WeekEditDialog = ({ season, week, tests, onSaved, onClose }) => {
  const [initial] = useState(() => weekForm(tests[0]))
  const [form, setForm] = useState(initial)
  const locked = tests.some((test) => test.attempts_count > 0)
  const changed = Object.keys(form).filter((field) => String(form[field]) !== String(initial[field]))

  const save = async () => {
    const body = Object.fromEntries(changed.map((field) => [field, field.endsWith('_at') ? toIso(form[field]) : Number(form[field])]))
    try {
      await request.patch(`${API}tests/week/`, body, { params: { season: season.id, week_number: week } })
      await onSaved(Number(form.week_number))
    } catch (error) {
      showError(error)
    }
  }

  return (
    <LigaDialog
      open
      Icon={Pencil}
      title={`${week}-haftani tahrirlash`}
      text={
        locked
          ? "Bu hafta testini o'quvchilar boshlagan: faqat tugash vaqtini o'zgartirish mumkin."
          : `O'zgartirgan maydonlaringiz shu haftaning ${tests.length} ta sinf testiga qo'llanadi.`
      }
      confirmLabel="Saqlash"
      cancelLabel="Bekor qilish"
      disabled={!changed.length || Object.values(form).some((value) => value === '')}
      onConfirm={save}
      onClose={onClose}
    >
      <div className="grid grid-cols-2 gap-3">
        {WEEK_FIELDS.map(([label, field, type, Icon]) => (
          <div key={field} className={type === 'number' && field !== 'week_number' ? '' : 'col-span-2'}>
            <IconField
              label={label}
              Icon={Icon}
              required
              type={type}
              min={type === 'number' ? 1 : undefined}
              max={field === 'week_number' ? season.weeks_count : undefined}
              disabled={locked && field !== 'end_at'}
              value={form[field]}
              onChange={(event) => setForm({ ...form, [field]: event.target.value })}
            />
          </div>
        ))}
      </div>
    </LigaDialog>
  )
}
