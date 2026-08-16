import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useTranslation } from 'react-i18next'

const ACCENTS = {
  purple: {
    badge: 'bg-gradient-to-br from-[#a78bfa] to-[#7c5cfc] shadow-[0_6px_14px_-6px_#7c5cfc]',
    path: '#7c5cfc',
    trail: '#ece7fb'
  },
  green: {
    badge: 'bg-gradient-to-br from-[#4ade80] to-[#16a34a] shadow-[0_6px_14px_-6px_#16a34a]',
    path: '#16a34a',
    trail: '#e3f5e8'
  }
}

/**
 * Bob / Mavzu ro'yxatlari uchun umumiy karkas: yopishqoq sarlavha (ikonka,
 * nom, umumiy progress halqasi) va aylantiriladigan ro'yxat qismi.
 */
const PanelCard = ({ icon, title, subtitle, progress = null, accent = 'purple', children }) => {
  const { t } = useTranslation()
  const theme = ACCENTS[accent] || ACCENTS.purple
  const value = Math.round(Number(progress) || 0)

  return (
    <div className="overflow-hidden bg-white border rounded-2xl border-[#eceaf4] dark:bg-[#252f3f] dark:border-[#374151] shadow-[0px_4px_20px_-12px_#00000040]">
      <div className="sticky top-0 z-10 flex items-center gap-3 px-4 py-3 border-b bg-[#faf9ff] border-[#eceaf4] dark:bg-[#2b3648] dark:border-[#374151]">
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${theme.badge}`}>{icon}</div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-bold uppercase text-[#1f2a5b] dark:text-white truncate">{title}</h3>
          <p className="text-xs text-[#8189a8] dark:text-gray-400 truncate">{subtitle}</p>
        </div>

        {progress !== null && (
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-11 h-11">
              <CircularProgressbar
                value={value}
                text={`${value}%`}
                strokeWidth={10}
                styles={buildStyles({
                  pathColor: theme.path,
                  trailColor: theme.trail,
                  textColor: '#1f2a5b',
                  textSize: '26px',
                  strokeLinecap: 'round'
                })}
              />
            </div>
            <span className="hidden sm:block max-w-[64px] text-[11px] leading-tight text-[#8189a8] dark:text-gray-400">
              {t('overallProgress')}
            </span>
          </div>
        )}
      </div>

      <div className="max-h-[52vh] md:max-h-[64vh] overflow-y-auto">{children}</div>
    </div>
  )
}

export default PanelCard
