import { safekidSeeds } from '@/home/components/homepage/games/gamesData'

const cache = new Map()

const pick = (html, patterns) => {
  for (const re of patterns) {
    const m = html.match(re)
    if (m?.[1]) return m[1].trim()
  }
  return ''
}

const toTitle = (slug) =>
  slug
    .split('-')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ')

export default async function handler(req, res) {
  try {
    const now = Date.now()
    const TTL = 1000 * 60 * 60 // 1 soat

    // cache bor bo‘lsa qaytaramiz
    const cached = cache.get('list')
    if (cached && now - cached.ts < TTL) {
      return res.status(200).json(cached.data)
    }

    // faqat safekidgames.com allow
    const results = await Promise.all(
      safekidSeeds.map(async (seed) => {
        try {
          const r = await fetch(seed.href, {
            headers: {
              'User-Agent': 'Mozilla/5.0',
              Accept: 'text/html'
            }
          })
          const html = await r.text()

          const title =
            pick(html, [/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i, /<title>([^<]+)<\/title>/i]) ||
            toTitle(seed.slug)

          const cover =
            pick(html, [
              /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i,
              /<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i
            ]) || ''

          return { ...seed, title, cover }
        } catch {
          return { ...seed, title: toTitle(seed.slug), cover: '' }
        }
      })
    )

    cache.set('list', { ts: now, data: results })
    res.status(200).json(results)
  } catch (e) {
    res.status(500).json({ error: 'failed_to_load_games' })
  }
}
