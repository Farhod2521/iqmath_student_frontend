import React, { useEffect, useMemo, useRef, useState } from 'react'

export default function CarouselGames({
  items = [],
  renderItem,
  autoPlay = true,
  interval = 2800,
  pauseOnHover = true
}) {
  const trackRef = useRef(null)
  const autoTimerRef = useRef(null)
  const dragging = useRef(false)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)
  const [isHover, setIsHover] = useState(false)

  // Infinite uchun 1 ta klon yetarli (oxiriga va boshiga)
  const loopItems = useMemo(() => {
    if (!items?.length) return []
    return [items[items.length - 1], ...items, items[0]]
  }, [items])

  const [index, setIndex] = useState(1) // 1 = real birinchi item (0 = last clone)
  const [cardStep, setCardStep] = useState(320)

  const measure = () => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-card="1"]')
    const step = card ? card.getBoundingClientRect().width + 16 : 320
    setCardStep(step)
  }

  const jumpToIndex = (i) => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: i * cardStep, behavior: 'auto' })
    setIndex(i)
  }

  const scrollToIndex = (i) => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: i * cardStep, behavior: 'smooth' })
    setIndex(i)
  }

  const next = () => scrollToIndex(index + 1)
  const prev = () => scrollToIndex(index - 1)

  // mount: o'lchab olish + birinchi real cardga jump
  useEffect(() => {
    measure()
    // keyin step set bo‘lgach joylashtiramiz
    const t = setTimeout(() => {
      jumpToIndex(1)
    }, 0)

    const onResize = () => {
      const prevStep = cardStep
      measure()
      // step o'zgarsa, current index joyini yangilab qo'yamiz
      setTimeout(() => {
        if (!trackRef.current) return
        if (prevStep !== cardStep) jumpToIndex(index)
        else jumpToIndex(index)
      }, 0)
    }

    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items?.length])

  // auto play
  useEffect(() => {
    const shouldRun = autoPlay && items.length > 1 && !(pauseOnHover && isHover)
    if (!shouldRun) return

    autoTimerRef.current = setInterval(() => {
      next()
    }, interval)

    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, interval, isHover, items.length, index, cardStep])

  // infinite loop correction (clone ga tushsa jump)
  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const onScrollEnd = () => {
      // clone-larga tushganda "sakratish"
      if (index === 0) {
        // boshidagi clone (last) -> real last
        jumpToIndex(items.length)
      } else if (index === items.length + 1) {
        // oxirdagi clone (first) -> real first
        jumpToIndex(1)
      }
    }

    // smooth scroll tugashini taxminan kuzatish uchun scroll event + timeout
    let timeoutId = null
    const onScroll = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(onScrollEnd, 80)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [index, items.length, cardStep])

  // dots uchun real index (0..len-1)
  const activeDot = useMemo(() => {
    if (!items.length) return 0
    const real = index - 1
    if (real < 0) return items.length - 1
    if (real >= items.length) return 0
    return real
  }, [index, items.length])

  const goDot = (dotIdx) => {
    // dotIdx real index (0..len-1) => loop index = dotIdx + 1
    scrollToIndex(dotIdx + 1)
  }

  // drag/swipe
  const onPointerDown = (e) => {
    const el = trackRef.current
    if (!el) return
    dragging.current = true
    startX.current = e.clientX ?? (e.touches?.[0]?.clientX || 0)
    startScrollLeft.current = el.scrollLeft
  }

  const onPointerMove = (e) => {
    if (!dragging.current) return
    const el = trackRef.current
    if (!el) return
    const x = e.clientX ?? (e.touches?.[0]?.clientX || 0)
    const walk = startX.current - x
    el.scrollLeft = startScrollLeft.current + walk
  }

  const onPointerUp = () => {
    if (!dragging.current) return
    dragging.current = false

    // eng yaqin kartaga snap
    const el = trackRef.current
    if (!el) return
    const i = Math.round(el.scrollLeft / cardStep)
    scrollToIndex(i)
  }

  if (!items?.length) {
    return <div className="p-6 text-sm text-gray-500 bg-white border rounded-2xl">O‘yinlar topilmadi.</div>
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => pauseOnHover && setIsHover(true)}
      onMouseLeave={() => pauseOnHover && setIsHover(false)}
    >
      <button
        type="button"
        onClick={prev}
        className="absolute z-10 hidden px-3 py-2 -translate-y-1/2 bg-white border shadow-sm left-2 top-1/2 rounded-xl md:block hover:shadow-md"
        aria-label="Previous"
      >
        ←
      </button>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
      >
        {loopItems?.map((it, i) => (
          <div key={`${it.slug}-${i}`} data-card="1" className="shrink-0 w-[260px] sm:w-[300px] lg:w-[320px]">
            {renderItem(it)}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={next}
        className="absolute z-10 hidden px-3 py-2 -translate-y-1/2 bg-white border shadow-sm right-2 top-1/2 rounded-xl md:block hover:shadow-md"
        aria-label="Next"
      >
        →
      </button>

      {/* dots */}
      {/* {items.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goDot(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={[
                'h-2.5 rounded-full transition-all',
                activeDot === i ? 'w-7 bg-indigo-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
              ].join(' ')}
            />
          ))}
        </div>
      )} */}
    </div>
  )
}
