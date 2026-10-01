import { Children, useEffect, useRef, useState } from 'react'

const MOBILE_MAX = 640 // Tailwind `sm` — undan kattada oddiy grid
const RESUME_DELAY = 6000 // qo'l bilan surilgandan keyin avto-aylanish shu vaqtdan so'ng qaytadi

/**
 * Statistika kartalari: mobilda har bir karta butun kenglikda, o'zi aylanib turadi
 * (oxiridan boshiga qaytadi), barmoq bilan ham suriladi; pastda nuqtalar.
 * `sm` va kattaroq ekranlarda oddiy grid.
 */
const StatsCarousel = ({ children, interval = 4000 }) => {
  const items = Children.toArray(children)
  const trackRef = useRef(null)
  const pausedUntilRef = useRef(0)
  const [active, setActive] = useState(0)

  const goTo = (index) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: track.clientWidth * index, behavior: 'smooth' })
  }

  useEffect(() => {
    if (items.length < 2) return undefined
    const id = setInterval(() => {
      const track = trackRef.current
      if (!track || !track.clientWidth || window.innerWidth >= MOBILE_MAX) return
      if (Date.now() < pausedUntilRef.current) return
      const current = Math.round(track.scrollLeft / track.clientWidth)
      goTo((current + 1) % items.length)
    }, interval)
    return () => clearInterval(id)
  }, [items.length, interval])

  const handleScroll = () => {
    const track = trackRef.current
    if (!track || !track.clientWidth) return
    setActive(Math.round(track.scrollLeft / track.clientWidth))
  }

  const pause = () => {
    pausedUntilRef.current = Date.now() + RESUME_DELAY
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onTouchStart={pause}
        onPointerDown={pause}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto sm:grid sm:grid-cols-1 sm:gap-4 sm:overflow-visible xl:grid-cols-2 min-[1700px]:grid-cols-3"
      >
        {items.map((child, index) => (
          <div key={child.key ?? index} className="w-full shrink-0 snap-center sm:w-auto">
            {child}
          </div>
        ))}
      </div>

      {items.length > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-1.5 sm:hidden">
          {items.map((child, index) => (
            <button
              key={child.key ?? index}
              type="button"
              aria-label={`${index + 1}`}
              onClick={() => {
                pause()
                goTo(index)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === active ? 'w-5 bg-[#3B6FF6]' : 'w-2 bg-[#D5DBE5]'
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default StatsCarousel
