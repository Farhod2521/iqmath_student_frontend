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

export const safekidSeeds = [
  { slug: 'puzzle-math', href: 'https://www.safekidgames.com/puzzle-math/', category: 'math' },
  { slug: 'word-sort', href: 'https://www.safekidgames.com/word-sort/', category: 'word' },
  { slug: 'find-7-differences', href: 'https://www.safekidgames.com/find-7-differences/', category: 'puzzle' },
  { slug: 'puzzle-blocks-ancient', href: 'https://www.safekidgames.com/puzzle-blocks-ancient/', category: 'puzzle' },
  { slug: 'color-memory', href: 'https://www.safekidgames.com/color-memory/', category: 'memory' },
  { slug: 'lollipops-match-3', href: 'https://www.safekidgames.com/lollipops-match-3/', category: 'match-3' },
  { slug: 'word-cross', href: 'https://www.safekidgames.com/word-cross/', category: 'word' },
  { slug: 'where-is-the-ball', href: 'https://www.safekidgames.com/where-is-the-ball/', category: 'puzzle' },
  { slug: 'impossible-10', href: 'https://www.safekidgames.com/impossible-10/', category: 'puzzle' },
  { slug: 'halloween-word-search', href: 'https://www.safekidgames.com/halloween-word-search/', category: 'word' },
  { slug: 'math-up', href: 'https://www.safekidgames.com/math-up/', category: 'math' },
  { slug: 'connector', href: 'https://www.safekidgames.com/connector/', category: 'puzzle' },
  { slug: 'shapes-airship', href: 'https://www.safekidgames.com/shapes-airship/', category: 'education' },
  { slug: 'word-frog', href: 'https://www.safekidgames.com/word-frog/', category: 'word' },
  { slug: 'type-fast-words', href: 'https://www.safekidgames.com/type-fast-words/', category: 'word' },
  { slug: 'happy-halloween-memory', href: 'https://www.safekidgames.com/happy-halloween-memory/', category: 'memory' },
  { slug: 'master-checkers', href: 'https://www.safekidgames.com/master-checkers/', category: 'board' },
  { slug: 'fishing-frenzy', href: 'https://www.safekidgames.com/fishing-frenzy/', category: 'action' },
  { slug: 'super-pongoal', href: 'https://www.safekidgames.com/super-pongoal/', category: 'sports' },
  { slug: 'animals-crush-match-3', href: 'https://www.safekidgames.com/animals-crush-match-3/', category: 'match-3' }
]
