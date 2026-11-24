import useScreenshotGuard from '@/hooks/useScreenshotGuard'

/**
 * Liga sahifalari himoyasi: matnni belgilash, nusxalash va o'ng tugma o'chiriladi, oyna fokusdan chiqsa
 * yoki skrinshot tugmalari bosilsa xiralashadi.
 */
const LigaGuard = ({ notice, children }) => {
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
    </div>
  )
}

export default LigaGuard
