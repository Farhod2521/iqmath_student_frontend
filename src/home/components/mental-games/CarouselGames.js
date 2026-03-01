import React, { useRef } from 'react'

export default function CarouselGames({ items, renderItem }) {
  const trackRef = useRef(null)

  const scrollBy = (dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-card="1"]')
    const step = card ? card.getBoundingClientRect().width + 16 : 320
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        className="absolute z-10 hidden px-3 py-2 -translate-y-1/2 bg-white border shadow-sm left-2 top-1/2 rounded-xl md:block"
      >
        ←
      </button>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it) => (
          <div key={it.slug} data-card="1" className="snap-start shrink-0 w-[260px] sm:w-[300px] lg:w-[320px]">
            {renderItem(it)}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollBy(1)}
        className="absolute z-10 hidden px-3 py-2 -translate-y-1/2 bg-white border shadow-sm right-2 top-1/2 rounded-xl md:block"
      >
        →
      </button>
    </div>
  )
}
