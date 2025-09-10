import dayjs from 'dayjs'

// O'zbek tili uchun oy nomlari
const uzbekMonths = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
]

// O'zbek tili uchun hafta kunlari
const uzbekWeekdays = [
  'Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 
  'Payshanba', 'Juma', 'Shanba'
]

// O'zbek tili uchun qisqa hafta kunlari
const uzbekWeekdaysShort = [
  'Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'
]

// O'zbek tili uchun qisqa oy nomlari
const uzbekMonthsShort = [
  'Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun',
  'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'
]

// O'zbek tili locale
const uzbekLocale = {
  name: 'uz',
  weekdays: uzbekWeekdays,
  weekdaysShort: uzbekWeekdaysShort,
  weekdaysMin: uzbekWeekdaysShort,
  months: uzbekMonths,
  monthsShort: uzbekMonthsShort,
  ordinal: (n) => n,
  weekStart: 1, // Dushanba haftaning birinchi kuni
  yearStart: 4,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  }
}

// dayjs ga o'zbek tilini qo'shish
dayjs.locale(uzbekLocale, null, true)

// O'zbek tili uchun maxsus formatlash funksiyasi
export const formatUzbekDate = (dateString) => {
  try {
    const date = dayjs(dateString)
    const day = date.format('DD')
    const month = uzbekMonths[date.month()] // 0-based index
    const year = date.format('YYYY')
    const time = date.format('HH:mm')
    
    return `${day} ${month} ${year}, ${time}`
  } catch (error) {
    return dateString
  }
}

export default dayjs
