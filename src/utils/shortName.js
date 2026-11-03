/** P0-6: bolalarning to'liq F.I.Sh. hammaga ko'rinmasin — "Azizbek Olimov Akmalovich" → "Azizbek O." */
export const shortName = (fullName) => {
  const [first, second] = String(fullName || '').trim().split(/\s+/)
  if (!first) return ''
  return second ? `${first} ${second.charAt(0).toUpperCase()}.` : first
}
