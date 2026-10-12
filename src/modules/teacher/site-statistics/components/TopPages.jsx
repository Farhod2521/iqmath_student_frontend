import { CARD, CARD_TITLE, fmt, pageTitle } from '../utils'

const TopPages = ({ pages = [] }) => (
  <div className={CARD}>
    <h3 className={CARD_TITLE}>Eng ko'p ko'rilgan sahifalar</h3>
    {pages.length === 0 ? (
      <p className="py-10 text-center text-sm text-[#7C8FAC]">Hozircha ma'lumot yo'q</p>
    ) : (
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F6F8FB] text-left text-xs text-[#5A6A85] dark:bg-[#1A2232] dark:text-[#7C8FAC]">
              <th className="rounded-l-md px-2 py-2 font-medium">#</th>
              <th className="px-2 py-2 font-medium">Sahifa</th>
              <th className="px-2 py-2 text-right font-medium">Ko'rishlar</th>
              <th className="rounded-r-md px-2 py-2 text-right font-medium">Foiz</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p, i) => {
              const title = pageTitle(p.path)
              return (
                <tr key={p.path} className="border-b border-[#F1F3F7] last:border-0 dark:border-[#2A3447]">
                  <td className="px-2 py-2.5 text-[#7C8FAC]">{i + 1}</td>
                  <td className="max-w-[260px] px-2 py-2.5">
                    <p className="truncate text-[#2A3547] dark:text-white">{title || p.path}</p>
                    {title && <p className="truncate text-xs text-[#7C8FAC]">{p.path}</p>}
                  </td>
                  <td className="px-2 py-2.5 text-right font-semibold text-[#2A3547] dark:text-white">{fmt(p.views)}</td>
                  <td className="px-2 py-2.5 text-right text-[#7C8FAC]">{p.percent}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )}
  </div>
)

export default TopPages
