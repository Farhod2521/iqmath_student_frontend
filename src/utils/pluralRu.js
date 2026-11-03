/** Rus tilida son bilan so'z shakli: pluralRu(1, ['день', 'дня', 'дней']) → 'день', 2 → 'дня', 5 → 'дней' */
export const pluralRu = (count, [one, few, many]) => {
  const n = Math.abs(Number(count) || 0) % 100
  const last = n % 10
  if (n > 10 && n < 20) return many
  if (last === 1) return one
  if (last >= 2 && last <= 4) return few
  return many
}
