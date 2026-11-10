/**
 * Yengil konfetti (kutubxonasiz): butun ekran ustida canvas, ikki chetdan va markazdan otiladi.
 * Mukofot olinganda ishlatiladi. prefers-reduced-motion yoqilgan bo'lsa — ishlamaydi.
 */
const COLORS = ['#1D6BFF', '#60A5FA', '#FBBF24', '#F59E0B', '#22C55E', '#F472B6', '#A78BFA', '#FFFFFF']

export function fireConfetti({ duration = 2600, count = 180 } = {}) {
  if (typeof window === 'undefined') return
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:10050'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const width = window.innerWidth
  const height = window.innerHeight
  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx.scale(dpr, dpr)

  const rand = (min, max) => min + Math.random() * (max - min)
  const particles = []
  const burst = (x, y, angle, spread, n, speed) => {
    for (let i = 0; i < n; i += 1) {
      const a = angle + rand(-spread, spread)
      const v = rand(speed * 0.55, speed)
      particles.push({
        x,
        y,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        size: rand(6, 11),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: Math.random() < 0.3 ? 'circle' : Math.random() < 0.5 ? 'star' : 'rect',
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.25, 0.25),
        tilt: rand(0, Math.PI * 2)
      })
    }
  }

  const side = Math.round(count * 0.35)
  burst(0, height * 0.75, -Math.PI / 3, 0.45, side, 19)
  burst(width, height * 0.75, (-Math.PI * 2) / 3, 0.45, side, 19)
  burst(width / 2, height * 0.45, -Math.PI / 2, Math.PI, count - side * 2, 13)

  const star = (r) => {
    ctx.beginPath()
    for (let i = 0; i < 10; i += 1) {
      const radius = i % 2 ? r * 0.45 : r
      const a = (i * Math.PI) / 5 - Math.PI / 2
      ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius)
    }
    ctx.closePath()
    ctx.fill()
  }

  const start = performance.now()
  const frame = (now) => {
    const t = now - start
    ctx.clearRect(0, 0, width, height)
    const fade = t > duration - 600 ? Math.max(0, (duration - t) / 600) : 1
    particles.forEach((p) => {
      p.vy += 0.38
      p.vx *= 0.985
      p.vy *= 0.985
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr
      p.tilt += 0.12
      ctx.save()
      ctx.globalAlpha = fade
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      if (p.shape === 'circle') {
        ctx.beginPath()
        ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2)
        ctx.fill()
      } else if (p.shape === 'star') {
        star(p.size / 1.6)
      } else {
        ctx.fillRect(-p.size / 2, (-p.size / 4) * Math.abs(Math.cos(p.tilt)), p.size, (p.size / 2) * Math.abs(Math.cos(p.tilt)) + 1)
      }
      ctx.restore()
    })
    if (t < duration) requestAnimationFrame(frame)
    else canvas.remove()
  }
  requestAnimationFrame(frame)
}
