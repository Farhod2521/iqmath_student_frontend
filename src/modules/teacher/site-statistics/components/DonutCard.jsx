import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CARD, CARD_TITLE, fmt } from '../utils'

// items: [{ key, label, count, percent, color }]
const DonutCard = ({ title, items = [], total, centerLabel }) => {
  const data = items.filter((i) => i.count > 0)
  return (
    <div className={CARD}>
      <h3 className={CARD_TITLE}>{title}</h3>
      <div className="flex flex-col items-center gap-5 mt-4 sm:flex-row">
        <div className="relative h-[170px] w-[170px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.length ? data : [{ key: 'empty', count: 1 }]}
                dataKey="count"
                nameKey="label"
                innerRadius={56}
                outerRadius={80}
                paddingAngle={data.length > 1 ? 2 : 0}
                stroke="none"
                isAnimationActive={false}
              >
                {(data.length ? data : [{ key: 'empty' }]).map((d) => (
                  <Cell key={d.key} fill={d.color || '#EEF1F6'} />
                ))}
              </Pie>
              {data.length > 0 && (
                <Tooltip formatter={(v, name) => [fmt(v), name]} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              )}
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-[#2A3547] dark:text-white">{fmt(total)}</span>
            <span className="text-xs text-[#7C8FAC]">{centerLabel}</span>
          </div>
        </div>

        <ul className="w-full space-y-2.5">
          {items.map((i) => (
            <li key={i.key} className="grid grid-cols-[12px_1fr_auto_48px] items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: i.color }} />
              <span className="text-[#5A6A85] dark:text-[#AAB7CF]">{i.label}</span>
              <span className="font-semibold text-[#2A3547] dark:text-white">{fmt(i.count)}</span>
              <span className="text-right text-xs text-[#7C8FAC]">{i.percent}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DonutCard
