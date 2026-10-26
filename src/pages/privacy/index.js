import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import { Container } from '@mui/material'
import LayoutHome from '@/home/Layout'

// Maxfiylik siyosati va shaxsiy ma'lumotlarni qayta ishlash shartlari.
// Matn yurist bilan kelishilgandan keyin yangilanishi kerak.
const CONTENT = {
  uz: {
    title: 'Maxfiylik siyosati',
    intro:
      "Ushbu hujjat IQMath platformasi (iqmath.uz va mobil ilovalar) foydalanuvchilarning shaxsiy ma'lumotlarini qanday yig'ishi, saqlashi va ishlatishini tushuntiradi. Ro'yxatdan o'tish orqali siz ushbu shartlarga rozilik bildirasiz.",
    sections: [
      {
        h: "Qanday ma'lumotlar yig'iladi",
        items: [
          'Ism-familiya, telefon raqam va (ixtiyoriy) email',
          "O'quvchining sinfi, maktabi va hududi",
          "O'quv natijalari: ko'rilgan darslar, topshiriqlar, ballar va reyting",
          "To'lovlar tarixi (karta ma'lumotlari IQMath'da saqlanmaydi — ular to'lov tizimida qayta ishlanadi)",
          'Qurilma turi va brauzer haqida texnik ma\'lumotlar (kirish xavfsizligi uchun)'
        ]
      },
      {
        h: "Ma'lumotlar nima uchun ishlatiladi",
        items: [
          "Hisobni yaratish va unga kirishni ta'minlash",
          "O'quv jarayonini va ota-onaga hisobotlarni ko'rsatish",
          "To'lov va obunani rasmiylashtirish",
          "Qo'llab-quvvatlash xizmati murojaatlariga javob berish",
          'Platformani yaxshilash uchun umumlashtirilgan statistika'
        ]
      },
      {
        h: "Bolalarning ma'lumotlari",
        items: [
          "Voyaga yetmaganlar ro'yxatdan ota-onasi yoki qonuniy vakili roziligi bilan o'tadi",
          "Bolaning to'liq ism-familiyasi boshqa foydalanuvchilarga ko'rsatilmaydi — reytinglarda faqat ism va familiyaning birinchi harfi ko'rinadi"
        ]
      },
      {
        h: 'Uchinchi shaxslarga berish',
        items: [
          "Shaxsiy ma'lumotlar sotilmaydi va reklama uchun berilmaydi",
          "Ma'lumotlar faqat to'lov tizimlariga (to'lovni amalga oshirish uchun) va qonunda belgilangan hollarda vakolatli organlarga beriladi"
        ]
      },
      {
        h: 'Sizning huquqlaringiz',
        items: [
          "Profilingizdagi ma'lumotlarni istalgan vaqtda ko'rish va o'zgartirish",
          "Hisobni va u bilan bog'liq ma'lumotlarni o'chirish (profil sozlamalarida yoki qo'llab-quvvatlash orqali)",
          'Savollar uchun: info@iqmath.uz'
        ]
      }
    ]
  },
  ru: {
    title: 'Политика конфиденциальности',
    intro:
      'Этот документ объясняет, как платформа IQMath (iqmath.uz и мобильные приложения) собирает, хранит и использует персональные данные пользователей. Регистрируясь, вы соглашаетесь с этими условиями.',
    sections: [
      {
        h: 'Какие данные собираются',
        items: [
          'Имя и фамилия, номер телефона и (по желанию) email',
          'Класс, школа и регион ученика',
          'Результаты обучения: просмотренные уроки, задания, баллы и рейтинг',
          'История платежей (данные карты в IQMath не хранятся — их обрабатывает платёжная система)',
          'Технические данные об устройстве и браузере (для безопасности входа)'
        ]
      },
      {
        h: 'Зачем используются данные',
        items: [
          'Создание аккаунта и доступ к нему',
          'Отображение учебного прогресса и отчёты для родителей',
          'Оформление оплаты и подписки',
          'Ответы службы поддержки',
          'Обобщённая статистика для улучшения платформы'
        ]
      },
      {
        h: 'Данные детей',
        items: [
          'Несовершеннолетние регистрируются с согласия родителя или законного представителя',
          'Полное имя ребёнка не показывается другим пользователям — в рейтингах видны только имя и первая буква фамилии'
        ]
      },
      {
        h: 'Передача третьим лицам',
        items: [
          'Персональные данные не продаются и не передаются для рекламы',
          'Данные передаются только платёжным системам (для проведения оплаты) и уполномоченным органам в случаях, предусмотренных законом'
        ]
      },
      {
        h: 'Ваши права',
        items: [
          'В любое время просматривать и изменять данные в профиле',
          'Удалить аккаунт и связанные с ним данные (в настройках профиля или через поддержку)',
          'Вопросы: info@iqmath.uz'
        ]
      }
    ]
  }
}

function Privacy() {
  const { i18n } = useTranslation()
  const content = CONTENT[i18n.language] || CONTENT.uz

  return (
    <LayoutHome>
      <Head>
        <title key="title">{`${content.title} — IQMath`}</title>
      </Head>
      <Container sx={{ maxWidth: '900px !important' }}>
        <article className="py-12 text-[#2A3547]">
          <h1 className="mb-4 text-3xl font-bold">{content.title}</h1>
          <p className="mb-8 text-[16px] leading-relaxed text-[#475569]">{content.intro}</p>
          {content.sections.map((section) => (
            <section key={section.h} className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">{section.h}</h2>
              <ul className="list-disc space-y-1 pl-6 text-[15px] leading-relaxed text-[#475569]">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </article>
      </Container>
    </LayoutHome>
  )
}

export default Privacy
