export const mentalGames = [
  {
    slug: 'quick-addition',
    title: 'Tez qo‘shish',
    cover: '/games/quick-addition.jpg',
    category: 'math',
    isPopular: true
  },
  {
    slug: 'memory-cards',
    title: 'Memory Cards',
    cover: '/games/memory-cards.jpg',
    category: 'memory',
    isPopular: true
  },
  { slug: 'odd-even', title: 'Toq / Juft', cover: '/games/odd-even.jpg', category: 'math', isPopular: true },
  {
    slug: 'shape-match',
    title: 'Shakl topish',
    cover: '/games/shape-match.jpg',
    category: 'attention',
    isPopular: true
  },
  {
    slug: 'logic-sequence',
    title: 'Ketma-ketlik (mantiq)',
    cover: '/games/logic-sequence.jpg',
    category: 'logic',
    isPopular: true
  },
  { slug: 'bigger-smaller', title: 'Katta / Kichik', cover: '/games/bigger-smaller.jpg', category: 'math' },
  { slug: 'focus-click', title: 'Diqqat (tez bos)', cover: '/games/focus-click.jpg', category: 'attention' }
]

export const popularMentalGames = mentalGames.filter((g) => g.isPopular).slice(0, 5)
