import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import {
  BarChart3,
  BookOpen,
  Calculator,
  CalendarDays,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  ClipboardX,
  Fingerprint,
  Flame,
  Gift,
  GraduationCap,
  MessageCircle,
  Phone,
  Shapes,
  Sigma,
  Target,
  Trophy,
  Wallet
} from 'lucide-react'
import { useGetQuery } from '@/hooks'
import { config } from '@/config'
import ContentLoader from '@/components/loader/content-loader'
import { formatDate, formatDateTime, formatMoney } from '@/modules/parent/children/overview/format'
import StudentRewardModal from '../components/StudentRewardModal'
import StudentAvatar from './StudentAvatar'
import StudentChatPanel from './StudentChatPanel'

const TEXTS = {
  uz: {
    streak: 'Ketma-ket kun',
    coins: 'Tangalar',
    score: 'Ballar',
    dailyGoal: 'Kundalik maqsad',
    activeStudent: "Faol o'quvchi",
    inactiveStudent: "Nofaol o'quvchi",
    classLabel: 'Sinf',
    classSuffix: '-sinf',
    registered: "Ro'yxatdan o'tgan",
    phone: 'Telefon',
    giveReward: 'Mukofot berish',
    paymentInfo: "To'lov ma'lumotlari",
    paymentsCount: "{n} ta muvaffaqiyatli to'lov",
    noPayments: "Hali to'lov qilinmagan",
    lastPayment: "Oxirgi to'lov",
    totalPaid: "Jami to'lov",
    paymentStatus: "To'lov holati",
    successful: 'Muvaffaqiyatli',
    pending: 'Kutilmoqda',
    failed: 'Muvaffaqiyatsiz',
    subscriptionDays: 'Obuna: {n} kun qoldi',
    subscriptionOff: 'Obuna faol emas',
    masteryTab: "Fanlar bo'yicha o'zlashtirish",
    diagnosticsTab: 'Diagnostika',
    totalTopics: 'Jami mavzular',
    done: 'Bajarilgan',
    notDone: 'Bajarilmagan',
    noSubjects: "Hozircha fanlar bo'yicha natija yo'q",
    recent: "So'nggi faoliyat",
    subject: 'Fan',
    topic: 'Mavzu',
    action: 'Amal',
    date: 'Sana',
    noRecent: "Hozircha faoliyat yo'q",
    login: 'Saytga kirdi',
    topic_test: 'Test bajarildi',
    diagnostic: 'Diagnostika topshirildi',
    achievement: 'Yutuq oldi',
    chat: 'Chat',
    openChat: 'Chatni ochish',
    studentRole: "O'quvchi",
    typeMessage: 'Xabar yozing...',
    chatEmpty: "Hali xabar yo'q. Birinchi bo'lib yozing!",
    chatError: 'Chatni ochib bo‘lmadi',
    sendError: 'Xabar yuborilmadi',
    file: 'Fayl',
    today: 'Bugun',
    yesterday: 'Kecha'
  },
  ru: {
    streak: 'Дней подряд',
    coins: 'Монеты',
    score: 'Баллы',
    dailyGoal: 'Цель на день',
    activeStudent: 'Активный ученик',
    inactiveStudent: 'Неактивный ученик',
    classLabel: 'Класс',
    classSuffix: '-класс',
    registered: 'Регистрация',
    phone: 'Телефон',
    giveReward: 'Наградить',
    paymentInfo: 'Оплаты',
    paymentsCount: 'Успешных оплат: {n}',
    noPayments: 'Оплат пока нет',
    lastPayment: 'Последняя оплата',
    totalPaid: 'Всего оплачено',
    paymentStatus: 'Статус оплат',
    successful: 'Успешно',
    pending: 'В ожидании',
    failed: 'Неуспешно',
    subscriptionDays: 'Подписка: осталось {n} дн.',
    subscriptionOff: 'Подписка неактивна',
    masteryTab: 'Освоение по предметам',
    diagnosticsTab: 'Диагностика',
    totalTopics: 'Всего тем',
    done: 'Выполнено',
    notDone: 'Не выполнено',
    noSubjects: 'Пока нет результатов по предметам',
    recent: 'Последняя активность',
    subject: 'Предмет',
    topic: 'Тема',
    action: 'Действие',
    date: 'Дата',
    noRecent: 'Пока нет активности',
    login: 'Вход на сайт',
    topic_test: 'Тест выполнен',
    diagnostic: 'Диагностика сдана',
    achievement: 'Получено достижение',
    chat: 'Чат',
    openChat: 'Открыть чат',
    studentRole: 'Ученик',
    typeMessage: 'Напишите сообщение...',
    chatEmpty: 'Сообщений пока нет. Напишите первым!',
    chatError: 'Не удалось открыть чат',
    sendError: 'Сообщение не отправлено',
    file: 'Файл',
    today: 'Сегодня',
    yesterday: 'Вчера'
  }
}

// Fan kartalari uchun ranglar (rasm bo'lmasa — mos ikonka)
const THEMES = [
  { band: 'from-[#EAF1FF] to-[#D6E4FF]', bar: 'bg-[#2563EB]', icon: 'text-[#2563EB]' },
  { band: 'from-[#F3EBFF] to-[#E4D4FF]', bar: 'bg-[#7C3AED]', icon: 'text-[#7C3AED]' },
  { band: 'from-[#FFF1E6] to-[#FFE0C7]', bar: 'bg-[#2563EB]', icon: 'text-[#EA580C]' }
]

const subjectIcon = (name = '') => {
  const n = name.toLowerCase()
  if (n.includes('algebra')) return Sigma
  if (n.includes('geometr')) return Shapes
  return Calculator
}

const ACTION_STYLES = {
  login: 'bg-[#EEF2F8] text-[#475569]',
  topic_test: 'bg-[#DCFCE7] text-[#15803D]',
  diagnostic: 'bg-[#DBEAFE] text-[#1D4ED8]',
  achievement: 'bg-[#FFEDD5] text-[#C2410C]'
}

const mediaUrl = (url) => (!url ? '' : /^https?:\/\//.test(url) ? url : `${config.API_URL}${url}`)

const Card = ({ className = '', children }) => (
  <div
    className={`rounded-2xl border border-[#EEF1F6] bg-white shadow-[0_10px_30px_-24px_rgba(15,27,61,0.45)] ${className}`}
  >
    {children}
  </div>
)

const StatChip = ({ icon, value, label }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-[#EEF1F6] bg-white px-4 py-3 shadow-[0_10px_30px_-26px_rgba(15,27,61,0.5)]">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center">{icon}</span>
    <div className="min-w-0">
      <p className="whitespace-nowrap text-lg font-extrabold leading-tight text-[#0F1B3D]">{value}</p>
      <p className="truncate text-xs text-[#5B6478]">{label}</p>
    </div>
  </div>
)

// To'lov holati — halqa diagramma
const StatusDonut = ({ counts, tx }) => {
  const parts = [
    { key: 'success', value: counts.success || 0, color: '#22C55E', label: tx.successful },
    { key: 'pending', value: counts.pending || 0, color: '#F59E0B', label: tx.pending },
    { key: 'failed', value: counts.failed || 0, color: '#EF4444', label: tx.failed }
  ]
  const total = parts.reduce((sum, p) => sum + p.value, 0)
  const r = 52
  const c = 2 * Math.PI * r
  let offset = 0
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:justify-start">
      <div className="relative h-[140px] w-[140px] shrink-0">
        <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
          <circle cx="70" cy="70" r={r} fill="none" stroke="#EEF2F8" strokeWidth="16" />
          {total
            ? parts.map((p) => {
                const len = (p.value / total) * c
                const el = (
                  <circle
                    key={p.key}
                    cx="70"
                    cy="70"
                    r={r}
                    fill="none"
                    stroke={p.color}
                    strokeWidth="16"
                    strokeDasharray={`${len} ${c - len}`}
                    strokeDashoffset={-offset}
                  />
                )
                offset += len
                return el
              })
            : null}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-[#0F1B3D]">{counts.success || 0}</span>
          <span className="text-[11px] text-[#5B6478]">{tx.successful}</span>
        </div>
      </div>
      <ul className="min-w-0 space-y-2">
        {parts.map((p) => (
          <li key={p.key} className="flex items-center gap-2 text-sm text-[#334155]">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: p.color }} />
            <b className="w-5 text-[#0F1B3D]">{p.value}</b>
            <span className="truncate">{p.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const SubjectCard = ({ subject, index, name, tx, onOpen }) => {
  const theme = THEMES[index % THEMES.length]
  const Icon = subjectIcon(subject.name_uz)
  const percent = Math.round(subject.percent ?? subject.mastery_percent ?? 0)
  const total = subject.total_topics
  const done = subject.completed_topics
  const cover = subject.image || subject.image_uz
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group overflow-hidden rounded-2xl border border-[#EEF1F6] bg-white text-left shadow-[0_10px_30px_-24px_rgba(15,27,61,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(15,27,61,0.5)]"
    >
      {/* Muqova: fan rasmi to'liq kenglikda; rasm bo'lmasa — rangli fon va ikonka */}
      <div className={`relative h-[132px] overflow-hidden bg-gradient-to-r ${theme.band}`}>
        {cover ? (
          <img
            src={mediaUrl(cover)}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <>
            <div className="absolute bottom-0 right-16 flex items-end gap-1.5 opacity-25">
              {[34, 56, 42, 68, 50].map((h, i) => (
                <span key={i} className={`w-3.5 rounded-t ${theme.bar}`} style={{ height: h }} />
              ))}
            </div>
            <span className="absolute bottom-4 left-5 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-white/80 shadow-sm">
              <Icon size={38} className={theme.icon} strokeWidth={2.2} />
            </span>
          </>
        )}
        <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#2563EB] shadow-md transition group-hover:translate-x-0.5">
          <ChevronRight size={20} />
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[17px] font-bold text-[#0F1B3D]">{name}</p>
          <span className="text-sm font-bold text-[#0F1B3D]">{percent}%</span>
        </div>
        {subject.class_name ? (
          <p className="text-xs text-[#8A93A6]">
            {subject.class_name}
            {tx.classSuffix}
          </p>
        ) : null}
        <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-[#EEF2F8]">
          <div className={`h-full rounded-full ${theme.bar}`} style={{ width: `${Math.min(100, percent)}%` }} />
        </div>
        {total !== undefined ? (
          <div className="mt-3.5 grid grid-cols-3 gap-2 text-[11px] text-[#5B6478]">
            <span className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1 text-[15px] font-bold text-[#0F1B3D]">
                <ClipboardList size={15} className="text-[#2563EB]" />
                {total}
              </span>
              {tx.totalTopics}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1 text-[15px] font-bold text-[#0F1B3D]">
                <ClipboardCheck size={15} className="text-[#16A34A]" />
                {done}
              </span>
              {tx.done}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1 text-[15px] font-bold text-[#0F1B3D]">
                <ClipboardX size={15} className="text-[#EF4444]" />
                {Math.max(0, total - done)}
              </span>
              {tx.notDone}
            </span>
          </div>
        ) : null}
      </div>
    </button>
  )
}

export default function StudentOverview({ studentId }) {
  const router = useRouter()
  const { i18n } = useTranslation()
  const lang = i18n.language === 'ru' ? 'ru' : 'uz'
  const tx = TEXTS[lang]
  const [tab, setTab] = useState('mastery')
  const [chatOpen, setChatOpen] = useState(true)
  const [isRewardOpen, setIsRewardOpen] = useState(false)

  const { data, isLoading } = useGetQuery({
    key: ['teacherStudentOverview', studentId],
    url: `/api/v1/func_student/teacher/students/${studentId}/overview/`,
    enabled: !!studentId,
    refetchOnMount: true
  })

  const { data: diagData } = useGetQuery({
    key: ['studentSubjectsD', studentId],
    url: `/api/v1/func_student/diagnost/students/${studentId}/subjects/`,
    enabled: !!studentId && tab === 'diagnostics'
  })

  const ov = data?.data
  if (isLoading || !ov) return <ContentLoader />

  const { profile, header = {}, payments = {}, subscription } = ov
  const counts = ov.payment_status_count || {}
  const subjects = tab === 'mastery' ? ov.subjects || [] : get(diagData, 'data', []) || []
  const nameOf = (item) => (lang === 'ru' ? item.name_ru || item.name_uz : item.name_uz)
  const openSubject = (subject) => router.push(`/dashboard/teacher/pupils/${studentId}/${subject.id}`)

  return (
    <div
      className={`grid gap-5 ${chatOpen ? 'xl:grid-cols-[minmax(0,1fr)_310px] 2xl:grid-cols-[minmax(0,1fr)_340px]' : ''}`}
    >
      <div className="min-w-0 space-y-5">
        {/* Asosiy ko'rsatkichlar */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatChip
            icon={<Flame size={30} className="fill-[#FB923C] text-[#EA580C]" />}
            value={header.streak_days ?? 0}
            label={tx.streak}
          />
          <StatChip
            icon={<img src="/images/homepage/tanga-sm.webp" alt="" className="h-9 w-9 object-contain" />}
            value={formatMoney(header.coin)}
            label={tx.coins}
          />
          <StatChip
            icon={<img src="/images/homepage/ball-sm.webp" alt="" className="h-9 w-9 object-contain" />}
            value={formatMoney(header.score)}
            label={tx.score}
          />
          <StatChip
            icon={<Target size={30} className="text-[#EF4444]" />}
            value={`${header.daily_goal?.done ?? 0}/${header.daily_goal?.target ?? 5}`}
            label={tx.dailyGoal}
          />
        </div>

        {/* Profil, to'lov ma'lumotlari, to'lov holati — 3 ta teng ustun, bir xil balandlikda */}
        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          <Card className="flex flex-col p-5">
            <div className="flex items-center gap-5">
              <StudentAvatar size={104} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-bold text-[#0F1B3D]">{profile.full_name}</p>
                <span
                  className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    profile.is_active ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEE2E2] text-[#B91C1C]'
                  }`}
                >
                  {profile.is_active ? tx.activeStudent : tx.inactiveStudent}
                </span>
                <ul className="mt-3 space-y-1.5 text-sm text-[#334155]">
                  <li className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-[#2563EB]" />
                    {tx.classLabel}:{' '}
                    <b className="text-[#0F1B3D]">
                      {profile.class_name ? `${profile.class_name}${tx.classSuffix}` : '—'}
                    </b>
                  </li>
                  <li className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-[#2563EB]" />
                    {tx.registered}: {formatDate(profile.registered_at)}
                  </li>
                  <li className="flex items-center gap-2">
                    <Fingerprint size={16} className="text-[#2563EB]" />
                    ID: #{profile.identification}
                  </li>
                  {profile.phone ? (
                    <li className="flex items-center gap-2">
                      <Phone size={16} className="text-[#2563EB]" />+{profile.phone}
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
            <div className="min-h-4 flex-1" />
            <button
              type="button"
              onClick={() => setIsRewardOpen(true)}
              className="mt-auto flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#EEF4FF] text-sm font-semibold text-[#1D4ED8] transition hover:bg-[#DBEAFE]"
            >
              <Gift size={17} />
              {tx.giveReward}
            </button>
          </Card>

          <Card className="flex flex-col p-5">
            <h3 className="mb-4 text-lg font-bold text-[#0F1B3D]">{tx.paymentInfo}</h3>
            <div className="flex items-center gap-3 rounded-2xl bg-[#F8FAFD] p-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F0FF]">
                <BarChart3 size={24} className="text-[#2563EB]" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-[#5B6478]">{tx.totalPaid}</p>
                <p className="whitespace-nowrap text-xl font-extrabold text-[#0F1B3D]">
                  {formatMoney(payments.total_paid)} UZS
                </p>
                <p className="text-xs text-[#8A93A6]">{tx.paymentsCount.replace('{n}', payments.count || 0)}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-2xl bg-[#F8FAFD] p-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#DCFCE7]">
                <Wallet size={24} className="text-[#16A34A]" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-[#5B6478]">{tx.lastPayment}</p>
                <p className="whitespace-nowrap text-xl font-extrabold text-[#0F1B3D]">
                  {formatMoney(payments.last_amount)} UZS
                </p>
                <p className="flex items-center gap-1 text-xs text-[#8A93A6]">
                  <CalendarDays size={13} />
                  {payments.last_date ? formatDateTime(payments.last_date) : tx.noPayments}
                </p>
              </div>
            </div>
          </Card>

          <Card className="flex flex-col p-5 md:col-span-2 2xl:col-span-1">
            <h3 className="mb-4 text-lg font-bold text-[#0F1B3D]">{tx.paymentStatus}</h3>
            <StatusDonut counts={counts} tx={tx} />
            <div className="min-h-4 flex-1" />
            <p
              className={`mt-auto rounded-xl px-3 py-2 text-xs font-semibold ${
                subscription?.is_active ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEF2F2] text-[#B91C1C]'
              }`}
            >
              {subscription?.is_active
                ? tx.subscriptionDays.replace('{n}', subscription.days_left)
                : tx.subscriptionOff}
            </p>
          </Card>
        </div>

        {/* Fanlar bo'yicha o'zlashtirish / Diagnostika */}
        <Card className="p-5">
          <div className="flex flex-wrap gap-2 border-b border-[#EEF1F6] pb-3">
            {[
              ['mastery', tx.masteryTab, BookOpen],
              ['diagnostics', tx.diagnosticsTab, BarChart3]
            ].map(([key, label, Icon]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition ${
                  tab === key ? 'bg-[#EEF4FF] text-[#1D4ED8]' : 'text-[#5B6478] hover:bg-[#F8FAFD]'
                }`}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </div>
          <h3 className="mb-4 mt-4 text-lg font-bold text-[#0F1B3D]">
            {tab === 'mastery' ? tx.masteryTab : tx.diagnosticsTab}
          </h3>
          {subjects.length ? (
            <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {subjects.map((subject, index) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  index={index}
                  name={nameOf(subject)}
                  tx={tx}
                  onOpen={() => openSubject(subject)}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-[#F8FAFD] px-4 py-8 text-center text-sm text-[#8A93A6]">{tx.noSubjects}</p>
          )}
        </Card>

        {/* So'nggi faoliyat */}
        <Card className="p-5">
          <h3 className="mb-3 text-lg font-bold text-[#0F1B3D]">{tx.recent}</h3>
          {ov.recent?.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-[#EEF1F6] text-left text-xs text-[#8A93A6]">
                    <th className="py-2 pr-3 font-medium">{tx.subject}</th>
                    <th className="py-2 pr-3 font-medium">{tx.topic}</th>
                    <th className="py-2 pr-3 font-medium">{tx.action}</th>
                    <th className="py-2 font-medium">{tx.date}</th>
                  </tr>
                </thead>
                <tbody>
                  {ov.recent.map((item, index) => {
                    const subjectName = lang === 'ru' ? item.subject_ru || item.subject_uz : item.subject_uz
                    const title = lang === 'ru' ? item.title_ru || item.title_uz : item.title_uz
                    return (
                      <tr
                        key={`${item.type}-${item.at}-${index}`}
                        className="border-b border-[#F4F6FA] last:border-none"
                      >
                        <td className="py-2.5 pr-3 font-medium text-[#0F1B3D]">
                          {item.type === 'diagnostic' ? title : item.type === 'topic_test' ? subjectName || '—' : '—'}
                        </td>
                        <td className="py-2.5 pr-3 text-[#334155]">
                          {item.type === 'topic_test' || item.type === 'achievement' ? title || '—' : '—'}
                        </td>
                        <td className="py-2.5 pr-3">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              ACTION_STYLES[item.type] || ACTION_STYLES.login
                            }`}
                          >
                            {item.type === 'achievement' ? <Trophy size={12} /> : null}
                            {tx[item.type] || item.type}
                            {item.value !== null && item.value !== undefined ? ` · ${item.value}%` : ''}
                          </span>
                        </td>
                        <td className="whitespace-nowrap py-2.5 text-[#5B6478]">{formatDateTime(item.at)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="py-6 text-center text-sm text-[#8A93A6]">{tx.noRecent}</p>
          )}
        </Card>
      </div>

      {/* Chat: katta ekranda o'ng tomonda yopishib turadi */}
      {chatOpen ? (
        <div className="h-[620px] xl:sticky xl:top-4 xl:h-[calc(100vh-120px)]">
          <StudentChatPanel
            studentId={studentId}
            studentUserId={profile.user_id}
            studentName={profile.full_name}
            tx={tx}
            onClose={() => setChatOpen(false)}
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-14 items-center gap-2 rounded-full bg-[#2563EB] px-5 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(37,99,235,0.9)] transition hover:bg-[#1D4ED8]"
        >
          <MessageCircle size={20} />
          {tx.openChat}
        </button>
      )}

      <StudentRewardModal
        isOpen={isRewardOpen}
        onClose={() => setIsRewardOpen(false)}
        student={{ id: studentId, full_name: profile.full_name }}
      />
    </div>
  )
}
