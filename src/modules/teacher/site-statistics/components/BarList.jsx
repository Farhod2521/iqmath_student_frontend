import { CARD, CARD_TITLE, fmt } from '../utils'

// Gorizontal ustunli ro'yxat: manbalar va davlatlar uchun
// rows: [{ key, label, count, percent, icon(ReactNode), color }]
const BarList = ({ title, rows = [], emptyText = "Hozircha ma'lumot yo'q" }) => {
  const max = Math.max(0, ...rows.map((r) => r.count))
  return (
    <div className={CARD}>
      <h3 className={CARD_TITLE}>{title}</h3>
      {rows.length === 0 ? (
        <p className="py-10 text-center text-sm text-[#7C8FAC]">{emptyText}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {rows.map((r) => (
            <li key={r.key} className="grid grid-cols-[24px_minmax(0,1.3fr)_minmax(60px,1fr)_auto_48px] items-center gap-2.5 text-sm">
              <span className="flex items-center justify-center text-[#5A6A85] dark:text-[#AAB7CF]">{r.icon}</span>
              <span className="truncate text-[#2A3547] dark:text-white" title={r.label}>
                {r.label}
              </span>
              <span className="h-2 overflow-hidden rounded-full bg-[#EEF1F6] dark:bg-[#2A3447]">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${max ? (r.count / max) * 100 : 0}%`, background: r.color || '#4F7CFF' }}
                />
              </span>
              <span className="text-right font-semibold text-[#2A3547] dark:text-white">{fmt(r.count)}</span>
              <span className="text-right text-xs text-[#7C8FAC]">{r.percent}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BarList
