import useScreenshotGuard from '@/hooks/useScreenshotGuard'

/**
 * Liga sahifalari himoyasi: matnni belgilash, nusxalash va o'ng tugma o'chiriladi, oyna fokusdan chiqsa
 * yoki skrinshot tugmalari bosilsa xiralashadi. Brauzer PrintScreen'ni to'liq to'xtata olmaydi, shuning
 * uchun sahifada o'quvchi ismi va ID'si suv belgisi bo'lib turadi: rasm tarqalsa, kimniki ekani bilinadi.
 */
const LigaGuard = ({ viewer, notice, children }) => {
  const hidden = useScreenshotGuard()
  const prevent = (event) => event.preventDefault()

  return (
    <div className="relative select-none" onCopy={prevent} onCut={prevent} onContextMenu={prevent} onDragStart={prevent}>
      {hidden ? (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <p className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#191C1D] shadow-lg">{notice}</p>
        </div>
      ) : null}
      <div className={hidden ? 'blur-xl' : ''}>{children}</div>
      {viewer ? (
        <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden" aria-hidden="true">
          <div className="grid h-full w-full -rotate-12 scale-125 grid-cols-2 place-items-center gap-y-24 md:grid-cols-3">
            {Array.from({ length: 18 }).map((_, index) => (
              <span key={index} className="whitespace-nowrap text-xs font-medium text-[#191C1D]/[0.06]">
                {viewer}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default LigaGuard
