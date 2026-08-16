/** Ro'yxat qatorlaridagi kichik gorizontal progress ko'rsatkichi. */
const ProgressMeter = ({ value }) => {
  const percent = Math.max(0, Math.min(100, Number(value) || 0))
  const isDone = percent >= 100

  return (
    <div className="flex items-center gap-2 shrink-0">
      <div className="w-[70px] sm:w-[90px] h-[6px] rounded-full bg-[#eceaf4] dark:bg-[#3a4658] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isDone ? 'bg-[#22c55e]' : 'bg-gradient-to-r from-[#a78bfa] to-[#7c5cfc]'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span
        className={`text-[11px] font-semibold min-w-[34px] text-right ${
          isDone ? 'text-[#16a34a]' : 'text-[#8189a8] dark:text-gray-400'
        }`}
      >
        {percent}%
      </span>
    </div>
  )
}

export default ProgressMeter
