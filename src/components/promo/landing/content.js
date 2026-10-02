// /math/uz va /math/ru landing sahifasi matnlari.
// Ariza formasi matnlari i18n faylida (promo.form.*) qoladi.

export const LINKS = {
  telegram: 'https://t.me/Iqmath_help',
  telegramChannel: 'https://t.me/iqmathuzz',
  instagram: 'https://www.instagram.com/iqmath__uz/',
  youtube: 'https://www.youtube.com/@iqmathuz',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.iqmath.mobile',
  appStore: 'https://apps.apple.com/us/app/iqmath/id6753702778',
  video: '/videos/iqmath-battle-yangilik.mp4'
}

export const CONTENT = {
  uz: {
    nav: [
      { id: 'platform', label: 'Platforma' },
      { id: 'how', label: 'Qanday ishlaydi' },
      { id: 'subjects', label: 'Fanlar' },
      { id: 'results', label: 'Natijalar' },
      { id: 'pricing', label: 'Tariflar' },
      { id: 'faq', label: 'Savollar' }
    ],
    telegram: "Telegram orqali bog'lanish",
    hero: {
      badge: "1–11-sinf uchun zamonaviy matematik ta'lim platformasi",
      title: ['Matematikani', 'oson va qiziqarli', 'tushuning'],
      subtitle:
        "Video darslar, interaktiv mashqlar, testlar va shaxsiy ta'lim yo'nalishi bilan matematika bilimini yangi bosqichga olib chiqing.",
      primary: "Bepul sinab ko'rish",
      secondary: 'Video haqida',
      checks: ["Ro'yxatdan oson o'tish", 'Dastlabki darslar bepul', 'Barcha qurilmalarda']
    },
    stats: [
      { value: 10000, suffix: '+', label: "O'quvchilar" },
      { value: 500, suffix: '+', label: 'Video darslar' },
      { value: 98, suffix: '%', label: 'Mamnunlik' },
      { value: 10, suffix: '+', label: 'Yillik tajriba' }
    ],
    results: {
      tag: 'OTA-ONALAR UCHUN',
      title: 'Farzandingiz natijasini real vaqt rejimida kuzating',
      text: "Batafsil statistika, zaif va kuchli tomonlar, mavzular bo'yicha rivojlanish va tavsiyalar — barchasi bir joyda.",
      cta: "Batafsil ma'lumot",
      chartTitle: "O'quvchining natijalari",
      months: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun'],
      correct: "To'g'ri javoblar",
      topics: "O'zlashtirilgan mavzular",
      weak: 'Zaif mavzular',
      weakItems: ['Kasrlar', 'Tenglamalar', 'Fazoviy geometriya']
    },
    how: {
      tag: 'QANDAY ISHLAYDI?',
      title: '3 qadamda boshlang',
      subtitle: 'Matematika endi yanada yaqin va qulay',
      steps: [
        { title: "Ro'yxatdan o'ting", text: "Tez va oson ro'yxatdan o'tib, shaxsiy kabinet yarating." },
        { title: "O'zingizga mos dars tanlang", text: 'Sinf va mavzular bo‘yicha video darslar va mashqlar.' },
        { title: 'Natijalaringizni kuzating', text: 'Testlar yeching, progressni kuzating va yutuqlarga erishing.' }
      ]
    },
    subjects: {
      tag: 'FANLAR',
      title: "Barcha muhim yo'nalishlar bir platformada",
      subtitle: "1–11-sinf uchun matematika, algebra va geometriya fanlaridan to'liq dastur",
      all: "Barchasini ko'rish",
      cta: "Darslarni ko'rish",
      items: [
        { name: 'Matematika', grades: '1–11 sinf', text: 'Asosiy mavzular, misollar va testlar' },
        { name: 'Algebra', grades: '7–11 sinf', text: 'Tenglamalar, funksiyalar va ifodalar' },
        { name: 'Geometriya', grades: '7–11 sinf', text: 'Tekislik va fazoda masalalar' }
      ]
    },
    platform: {
      tag: "INTERAKTIV TA'LIM",
      title: ['Video darslar, mashqlar', 'va testlar — barchasi bir joyda'],
      text: "Qisqa va tushunarli video darslar, interaktiv mashqlar, avtomatik tekshiruv va batafsil tushuntirishlar yordamida matematikani oson o'rganing.",
      features: [
        "Professional o'qituvchilar tomonidan tayyorlangan darslar",
        'Interaktiv mashqlar va testlar',
        "Har bir mavzu bo'yicha tushuntirishlar",
        'Xatolar ustida ishlash va tahlil'
      ],
      lessons: ['Uchburchaklar', 'Pifagor teoremasi', 'Masalalar yechish', 'Testlar'],
      exercise: 'Mashq 1',
      question: 'Agar a = 3, b = 4 bo‘lsa, c ni toping.',
      check: 'Javobni tekshirish',
      correct: "To'g'ri javob!",
      explain: "Pifagor teoremasiga ko'ra:"
    },
    motivation: {
      tag: 'MOTIVATSIYA',
      title: "O'rganish endi yanada qiziqarli",
      text: "Yutuqlar, tangalar, kunlik maqsadlar va reytinglar orqali muntazam ravishda o'qish motivatsiyasini oshiring.",
      pills: ['Kunlik maqsadlar', "Yutuqlar va badge'lar", 'Tangalar va sovrinlar', 'Reyting tizimi'],
      streak: 'kun',
      streakLabel: 'Seriya',
      coins: 'Tangalar',
      gems: 'Yutuqlar'
    },
    app: {
      tag: 'HAR QAYERDA SIZ BILAN',
      title: "Mobil ilova orqali istalgan joyda o'rganing",
      text: 'IQMath mobil ilovasi bilan darslarni telefoningizda ham davom ettiring. Barcha imkoniyatlar siz bilan doimo va har joyda.',
      google: ['Google Play', 'yuklab oling'],
      apple: ['App Store', 'yuklab oling']
    },
    pricing: {
      tag: 'TARIFLAR',
      title: 'Sizga mos paketni tanlang',
      subtitle: "Sifatli ta'lim — barcha uchun",
      popular: 'Eng ommabop',
      currency: "so'm",
      perMonth: 'oyiga',
      choose: 'Tanlash',
      discount: '-{{n}}%',
      loading: 'Tariflar yuklanmoqda...',
      empty: "Tariflar haqida ma'lumot olish uchun ariza qoldiring"
    },
    faq: {
      tag: 'TEZ-TEZ BERILADIGAN SAVOLLAR',
      title: 'Savollaringiz bormi?',
      items: [
        {
          q: 'IQMath qanday qurilmalarda ishlaydi?',
          a: 'Kompyuter, planshet va telefonda — brauzer orqali yoki Android va iOS uchun mobil ilova orqali. Bitta hisobdan bir vaqtda 2 ta qurilmada foydalanish mumkin.'
        },
        {
          q: 'Darslar qaysi sinflar uchun mavjud?',
          a: "1-sinfdan 11-sinfgacha: matematika, algebra va geometriya bo'yicha video darslar, mashqlar va testlar."
        },
        {
          q: "To'lovni qanday amalga oshirish mumkin?",
          a: "To'lov platformaning o'zida Payme orqali onlayn amalga oshiriladi. Tarifni tanlab, bir necha daqiqada faollashtirasiz."
        },
        {
          q: 'Ota-onalar natijani qanday kuzatadi?',
          a: "Ota-ona kabinetida farzandning test natijalari, o'zlashtirilgan va zaif mavzulari ko'rinib turadi."
        },
        {
          q: 'Agar savolimga javob topolmasam-chi?',
          a: "Telegram orqali yordam xizmatimizga yozing yoki ariza qoldiring — mutaxassislarimiz siz bilan bog'lanadi."
        }
      ]
    },
    cta: {
      title: "Bugun matematikani o'rganishni boshlang!",
      text: "Minglab o'quvchilar allaqachon IQMath bilan natijaga erishmoqda. Siz ham ularga qo'shiling.",
      button: "Bepul sinab ko'rish"
    },
    footer: {
      tagline: "Matematika har bir o'quvchi uchun mavjud va qiziqarli bo'lishi kerak.",
      columns: [
        {
          title: 'Platforma',
          links: [
            ['Fanlar', '#subjects'],
            ['Qanday ishlaydi', '#how'],
            ['Tariflar', '#pricing'],
            ['Mobil ilova', '#app']
          ]
        },
        {
          title: 'Kompaniya',
          links: [
            ['Biz haqimizda', '/about'],
            ['Yangiliklar', '/news'],
            ['Ariza qoldirish', '#lead']
          ]
        },
        {
          title: 'Yordam',
          links: [
            ['Savollar', '#faq'],
            ['Telegram yordam', 'telegram']
          ]
        }
      ],
      rights: 'Barcha huquqlar himoyalangan.'
    }
  },

  ru: {
    nav: [
      { id: 'platform', label: 'Платформа' },
      { id: 'how', label: 'Как это работает' },
      { id: 'subjects', label: 'Предметы' },
      { id: 'results', label: 'Результаты' },
      { id: 'pricing', label: 'Тарифы' },
      { id: 'faq', label: 'Вопросы' }
    ],
    telegram: 'Связаться в Telegram',
    hero: {
      badge: 'Современная платформа по математике для 1–11 классов',
      title: ['Понимайте', 'математику легко', 'и с интересом'],
      subtitle:
        'Видеоуроки, интерактивные упражнения, тесты и персональный план обучения выведут ваши знания математики на новый уровень.',
      primary: 'Попробовать бесплатно',
      secondary: 'О видео',
      checks: ['Простая регистрация', 'Первые уроки бесплатно', 'На всех устройствах']
    },
    stats: [
      { value: 10000, suffix: '+', label: 'Учеников' },
      { value: 500, suffix: '+', label: 'Видеоуроков' },
      { value: 98, suffix: '%', label: 'Довольны' },
      { value: 10, suffix: '+', label: 'Лет опыта' }
    ],
    results: {
      tag: 'ДЛЯ РОДИТЕЛЕЙ',
      title: 'Следите за успехами ребёнка в реальном времени',
      text: 'Подробная статистика, сильные и слабые стороны, прогресс по темам и рекомендации — всё в одном месте.',
      cta: 'Подробнее',
      chartTitle: 'Результаты ученика',
      months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
      correct: 'Верные ответы',
      topics: 'Освоенные темы',
      weak: 'Слабые темы',
      weakItems: ['Дроби', 'Уравнения', 'Стереометрия']
    },
    how: {
      tag: 'КАК ЭТО РАБОТАЕТ?',
      title: 'Начните за 3 шага',
      subtitle: 'Математика стала ближе и удобнее',
      steps: [
        { title: 'Зарегистрируйтесь', text: 'Быстрая регистрация и личный кабинет.' },
        { title: 'Выберите подходящий урок', text: 'Видеоуроки и упражнения по классам и темам.' },
        { title: 'Следите за результатами', text: 'Решайте тесты, отслеживайте прогресс и получайте награды.' }
      ]
    },
    subjects: {
      tag: 'ПРЕДМЕТЫ',
      title: 'Все важные направления на одной платформе',
      subtitle: 'Полная программа по математике, алгебре и геометрии для 1–11 классов',
      all: 'Смотреть все',
      cta: 'Смотреть уроки',
      items: [
        { name: 'Математика', grades: '1–11 класс', text: 'Основные темы, примеры и тесты' },
        { name: 'Алгебра', grades: '7–11 класс', text: 'Уравнения, функции и выражения' },
        { name: 'Геометрия', grades: '7–11 класс', text: 'Задачи на плоскости и в пространстве' }
      ]
    },
    platform: {
      tag: 'ИНТЕРАКТИВНОЕ ОБУЧЕНИЕ',
      title: ['Видеоуроки, упражнения', 'и тесты — всё в одном месте'],
      text: 'Короткие и понятные видеоуроки, интерактивные упражнения, автоматическая проверка и подробные объяснения помогут легко освоить математику.',
      features: [
        'Уроки от профессиональных преподавателей',
        'Интерактивные упражнения и тесты',
        'Объяснения по каждой теме',
        'Работа над ошибками и анализ'
      ],
      lessons: ['Треугольники', 'Теорема Пифагора', 'Решение задач', 'Тесты'],
      exercise: 'Упражнение 1',
      question: 'Если a = 3, b = 4, найдите c.',
      check: 'Проверить ответ',
      correct: 'Верно!',
      explain: 'По теореме Пифагора:'
    },
    motivation: {
      tag: 'МОТИВАЦИЯ',
      title: 'Учиться стало ещё интереснее',
      text: 'Награды, монеты, ежедневные цели и рейтинги помогают заниматься регулярно.',
      pills: ['Ежедневные цели', 'Награды и бейджи', 'Монеты и призы', 'Система рейтинга'],
      streak: 'дней',
      streakLabel: 'Серия',
      coins: 'Монеты',
      gems: 'Награды'
    },
    app: {
      tag: 'ВСЕГДА С ВАМИ',
      title: 'Учитесь где угодно с мобильным приложением',
      text: 'Продолжайте уроки на телефоне в приложении IQMath. Все возможности всегда под рукой.',
      google: ['Google Play', 'скачать'],
      apple: ['App Store', 'скачать']
    },
    pricing: {
      tag: 'ТАРИФЫ',
      title: 'Выберите подходящий тариф',
      subtitle: 'Качественное образование — для всех',
      popular: 'Популярный',
      currency: 'сум',
      perMonth: 'в месяц',
      choose: 'Выбрать',
      discount: '-{{n}}%',
      loading: 'Загрузка тарифов...',
      empty: 'Оставьте заявку, чтобы узнать о тарифах'
    },
    faq: {
      tag: 'ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ',
      title: 'Остались вопросы?',
      items: [
        {
          q: 'На каких устройствах работает IQMath?',
          a: 'На компьютере, планшете и телефоне — через браузер или мобильное приложение для Android и iOS. Одним аккаунтом можно пользоваться одновременно на 2 устройствах.'
        },
        {
          q: 'Для каких классов есть уроки?',
          a: 'С 1 по 11 класс: видеоуроки, упражнения и тесты по математике, алгебре и геометрии.'
        },
        {
          q: 'Как оплатить?',
          a: 'Оплата производится онлайн прямо на платформе через Payme. Выберите тариф и активируйте его за несколько минут.'
        },
        {
          q: 'Как родители следят за результатами?',
          a: 'В кабинете родителя видны результаты тестов, освоенные и слабые темы ребёнка.'
        },
        {
          q: 'Что если я не нашёл ответ на свой вопрос?',
          a: 'Напишите в нашу поддержку в Telegram или оставьте заявку — специалисты свяжутся с вами.'
        }
      ]
    },
    cta: {
      title: 'Начните изучать математику сегодня!',
      text: 'Тысячи учеников уже добиваются результатов с IQMath. Присоединяйтесь и вы.',
      button: 'Попробовать бесплатно'
    },
    footer: {
      tagline: 'Математика должна быть доступной и интересной для каждого ученика.',
      columns: [
        {
          title: 'Платформа',
          links: [
            ['Предметы', '#subjects'],
            ['Как это работает', '#how'],
            ['Тарифы', '#pricing'],
            ['Мобильное приложение', '#app']
          ]
        },
        {
          title: 'Компания',
          links: [
            ['О нас', '/about'],
            ['Новости', '/news'],
            ['Оставить заявку', '#lead']
          ]
        },
        {
          title: 'Помощь',
          links: [
            ['Вопросы', '#faq'],
            ['Поддержка в Telegram', 'telegram']
          ]
        }
      ],
      rights: 'Все права защищены.'
    }
  }
}
