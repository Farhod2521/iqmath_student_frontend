// Fan bo'limlari ranglari (maket bo'yicha): Matematika — ko'k, Algebra — binafsha, Geometriya — moviy-yashil.
// Nomi tanilmagan fanlar uchun FALLBACK palitradan aylanib olinadi.
const THEMES = {
  math: { accent: '#3B6FF6', soft: '#EAF0FF' },
  algebra: { accent: '#8B5CF6', soft: '#F1EBFF' },
  geometry: { accent: '#14A3B8', soft: '#E3F6F9' }
}

const FALLBACK = [
  { accent: '#F59E0B', soft: '#FFF4DE' },
  { accent: '#EC4899', soft: '#FDE8F3' },
  { accent: '#10B981', soft: '#E3F8EF' }
]

export const getSubjectTheme = (name = '', index = 0) => {
  const key = String(name).toLowerCase()
  if (key.includes('algebra') || key.includes('алгебр')) return THEMES.algebra
  if (key.includes('geometr') || key.includes('геометр')) return THEMES.geometry
  if (key.includes('matem') || key.includes('матем')) return THEMES.math
  return FALLBACK[index % FALLBACK.length]
}
