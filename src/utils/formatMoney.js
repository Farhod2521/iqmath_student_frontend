// Pul summasi yagona formatda: 48 000 (bo'shliq bilan ajratilgan, kasrsiz)
export const formatMoney = (value) =>
  Math.round(Number(value) || 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export default formatMoney
