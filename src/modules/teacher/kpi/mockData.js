export const KPI_MONTHS = [
  { key: '2026-07', label: 'Iyul 2026', short: 'Iyl' },
  { key: '2026-08', label: 'Avgust 2026', short: 'Avg' },
  { key: '2026-09', label: 'Sentyabr 2026', short: 'Sen' },
  { key: '2026-10', label: 'Oktyabr 2026', short: 'Okt' },
  { key: '2026-11', label: 'Noyabr 2026', short: 'Noy' },
  { key: '2026-12', label: 'Dekabr 2026', short: 'Dek' },
  { key: '2027-01', label: 'Yanvar 2027', short: 'Yan' },
  { key: '2027-02', label: 'Fevral 2027', short: 'Fev' },
  { key: '2027-03', label: 'Mart 2027', short: 'Mar' },
  { key: '2027-04', label: 'Aprel 2027', short: 'Apr' },
  { key: '2027-05', label: 'May 2027', short: 'May' },
  { key: '2027-06', label: 'Iyun 2027', short: 'Iyn' }
]

export const KPI_PLAN = {
  leads: [4000, 1000, 5000, 6000, 5000, 7000, 8000, 8000, 8000, 7000, 7000, 7000],
  conversion: [5, 5, 6, 7, 8, 8, 9, 10, 10, 11, 12, 12],
  paid: [200, 50, 300, 420, 400, 560, 720, 800, 800, 770, 840, 840],
  revenue: [152, 38, 228, 319, 304, 426, 547, 608, 608, 585, 638, 638],
  retention: [26, 27, 29, 32, 33, 35, 37, 37, 38, 38, 39, 40],
  costPerMonth: 97.25,
  churnMax: 50,
  csatMin: 80,
  roiMin: 4,
  blendedRevenue: 0.76
}

export const KPI_INITIAL_ACTUALS = {
  '2026-07': {
    leads: 3720,
    paid: 188,
    revenue: null,
    retention: 24,
    churn: 52,
    csat: 78,
    cost: 94,
    salesTeam: 5
  }
}
