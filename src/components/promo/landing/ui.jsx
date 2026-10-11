import { useEffect, useRef, useState } from 'react'

export const Container = ({ className = '', children }) => (
  <div className={`mx-auto w-full max-w-[1200px] px-5 md:px-8 ${className}`}>{children}</div>
)

export const SectionTag = ({ children, className = '' }) => (
  <span
    className={`inline-flex items-center rounded-full bg-[#E6EEFF] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#2563EB] ${className}`}
  >
    {children}
  </span>
)

export const SectionTitle = ({ children, className = '' }) => (
  <h2
    className={`text-[28px] font-extrabold leading-[1.15] tracking-tight text-[#0B1B3F] sm:text-[34px] lg:text-[40px] ${className}`}
  >
    {children}
  </h2>
)

export const PrimaryButton = ({ children, className = '', ...props }) => (
  <button
    type="button"
    className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 text-[15px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(37,99,235,0.9)] transition hover:bg-[#1D4ED8] active:scale-[0.98] ${className}`}
    {...props}
  >
    {children}
  </button>
)

export const scrollToId = (id) => (event) => {
  if (event) event.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * Ekranga chiqqanda 0 dan qiymatgacha sanaydigan raqam. Qiymat keyinroq
 * o'zgarsa (masalan, bazadan kelsa) — joriy raqamdan yangisiga silliq o'tadi.
 */
export const Counter = ({ target, suffix = '' }) => {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)
  const valueRef = useRef(0)
  const targetRef = useRef(target)
  const frame = useRef(null)

  const animate = (from, to) => {
    cancelAnimationFrame(frame.current)
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / 1400, 1)
      const next = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)))
      valueRef.current = next
      setValue(next)
      if (p < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    targetRef.current = target
    if (started.current) animate(valueRef.current, target)
  }, [target])

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return
          started.current = true
          animate(0, targetRef.current)
        })
      },
      { threshold: 0.4 }
    )
    io.observe(node)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame.current)
    }
  }, [])

  return (
    <span ref={ref}>
      {value.toLocaleString('ru-RU')}
      {suffix}
    </span>
  )
}

/** Bo'lim ekranga chiqqanda yumshoq paydo bo'lishi */
export const Reveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
