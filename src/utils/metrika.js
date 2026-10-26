// Yandex Metrika maqsadlari (hisoblagich _document.js da ulanadi)
export const YM_COUNTER_ID = 108997206

export const GOALS = {
  registration: 'registration', // SMS tasdiqlanib, hisob yaratildi
  buyClick: 'buy_click', // "Sotib olish" / tarif tanlash tugmasi
  paymentStart: 'payment_start' // to'lov sahifasi (checkout) ochildi
}

export const reachGoal = (goal, params) => {
  try {
    if (typeof window !== 'undefined' && typeof window.ym === 'function') {
      window.ym(YM_COUNTER_ID, 'reachGoal', goal, params)
    }
  } catch (e) {
    // analitika xatosi foydalanuvchi oqimini buzmasligi kerak
  }
}
