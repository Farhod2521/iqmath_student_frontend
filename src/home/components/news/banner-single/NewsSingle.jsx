import { Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const NewsSingle = () => {
  const router = useRouter()
  const { id } = router.query
  const news = {
    id: 1,
    title: "Sun'iy intellekt sohasida yangi yutuq qayd etildi",
    shortDescription: 'OpenAI kompaniyasi GPT-5 modelini taqdim etdi',
    fullContent: `OpenAI kompaniyasi bugun dunyoga o'zining eng so'nggi sun'iy intellekt modeli GPT-5 ni taqdim etdi. Bu model avvalgi versiyalarga nisbatan ancha kuchli va samarali ishlaydi.

Yangi model 100 trillionga yaqin parametrga ega bo'lib, u oldingi GPT-4 modelidan 10 baravar kuchliroq. GPT-5 murakkab mantiqiy masalalarni yechishda, dasturlashda va ijodiy kontentni yaratishda yangi rekordlar o'rnatdi.

Kompaniya rahbari Sem Altman aytishicha, GPT-5 inson darajasidagi umumiy sun'iy intellektga (AGI) erishish yo'lida muhim qadam hisoblanadi. Model mediatsina, ta'lim, tadqiqot va ko'plab boshqa sohalarda qo'llanilishi mumkin.

Texnik jihozlar:
- 100 trillion parametr
- Multimodal qobiliyatlar (matn, rasm, audio, video)
- 128K tokenli kontekst oynasi
- Real-time ma'lumotlar bilan ishlash imkoniyati

GPT-5 hozircha cheklangan beta-test rejimida ishlaydi va keyingi yil boshida keng auditoriya uchun ochiq bo'ladi. Model foydalanish narxi GPT-4 ga nisbatan 30% arzonroq bo'lishi kutilmoqda.`,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    date: '2026-01-15',
    author: 'Dr. Ali Karimov',
    category: 'Texnologiya',
    readTime: '5 daqiqa'
  }

  if (!news) return null

  return (
    <Container sx={{ py: 6, maxWidth: 'md' }}>
      {/* Rasm */}
      <Box component="img" src={news.image} alt={news.title} sx={{ width: '100%', borderRadius: 2, mb: 3 }} />

      {/* Sarlavha */}
      <Typography variant="h3" fontWeight={700} mb={2}>
        {news.title}
      </Typography>

      {/* Muallif va sana */}
      <Typography variant="body2" color="text.secondary" mb={3}>
        {news.author} | {news.date} | {news.category} | {news.readTime}
      </Typography>

      {/* To'liq matn */}
      <Typography lineHeight={1.8} sx={{ whiteSpace: 'pre-line' }}>
        {news.fullContent}
      </Typography>
    </Container>
  )
}

export default NewsSingle
