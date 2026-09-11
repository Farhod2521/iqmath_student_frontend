import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Calendar } from 'lucide-react'

const UZ_MONTHS = [
  'Yanvar',
  'Fevral',
  'Mart',
  'Aprel',
  'May',
  'Iyun',
  'Iyul',
  'Avgust',
  'Sentabr',
  'Oktabr',
  'Noyabr',
  'Dekabr'
]

const TutorHomeGreeting = ({ firstName }) => {
  const { t } = useTranslation()

  const today = useMemo(() => {
    const now = new Date()
    return `${now.getDate()} ${UZ_MONTHS[now.getMonth()]}, ${now.getFullYear()}`
  }, [])

  return (
    <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-xl font-extrabold text-[#191C1D] sm:text-2xl">
          {t('tutorHome.greeting', { name: firstName || '' })} 👋
        </h1>
        <p className="mt-1 text-sm text-[#5A6A85]">{t('tutorHome.greetingSubtitle')}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-xl border border-[#E9E9E9] bg-white px-4 py-2 text-sm font-semibold text-[#191C1D]">
          <Calendar size={16} className="text-[#5D87FF]" />
          {today}
        </span>
        <p className="hidden max-w-[220px] text-right text-xs italic text-[#8A8A8E] lg:block">
          "{t('tutorHome.quote')}"
        </p>
      </div>
    </div>
  )
}

export default TutorHomeGreeting
