import { useTranslation } from 'react-i18next'
import { ChevronRight, ClipboardList, Gift } from 'lucide-react'
import { mockReminders } from '../mock'

const REMINDER_STYLES = {
  test: { icon: ClipboardList, bg: 'bg-[#EDE9FE]', color: 'text-[#7C3AED]' },
  gift: { icon: Gift, bg: 'bg-[#FFEDD5]', color: 'text-[#F97316]' }
}

const HomeRemindersCard = () => {
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#191C1D]">{t('studentHome.reminders')}</h3>
        <button className="text-sm font-semibold text-[#5D87FF] hover:underline">{t('studentHome.viewAll')}</button>
      </div>

      <div className="mt-3 flex flex-col gap-1">
        {mockReminders.map((reminder) => {
          const style = REMINDER_STYLES[reminder.type]
          const Icon = style.icon
          return (
            <button
              key={reminder.key}
              className="flex items-center gap-3 rounded-xl px-1 py-2 text-left transition hover:bg-gray-50"
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${style.bg}`}>
                <Icon size={16} className={style.color} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#191C1D]">{reminder.title}</p>
                <p className="truncate text-xs text-[#8A8A8E]">{reminder.subtitle}</p>
              </div>
              <ChevronRight size={16} className="shrink-0 text-[#C4C4C4]" />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default HomeRemindersCard
