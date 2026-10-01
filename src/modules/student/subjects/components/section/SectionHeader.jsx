import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

// Bo'lim sarlavhasi: rangli chiziq, nom, izoh va "Barchasini ko'rish" (Fanlar va Diagnostika sahifalari)
const SectionHeader = ({ title, subtitle, accent }) => {
  const { t } = useTranslation()

  return (
    <div className="mb-4 flex items-center sm:mb-5 justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3 sm:gap-3.5">
        <span className="mt-1 h-7 w-[5px] sm:h-[34px] shrink-0 rounded-full" style={{ backgroundColor: accent }} />
        <div>
          <h2 className="text-xl font-extrabold leading-tight text-[#0F1B3D] sm:text-[30px] dark:text-white">
            {title}
          </h2>
          {subtitle ? <p className="mt-1 text-xs text-[#6B7385] sm:text-[15px] dark:text-gray-400">{subtitle}</p> : null}
        </div>
      </div>
      <span className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold sm:inline-flex" style={{ color: accent }}>
        {t('subjectsSeeAll')}
        <ArrowRight size={16} />
      </span>
    </div>
  )
}

export default SectionHeader
