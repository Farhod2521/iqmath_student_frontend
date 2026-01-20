import React from 'react'
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material'
import { useRouter } from 'next/router'

const NewsAll = () => {
  const router = useRouter()

  const NEWS = [
    {
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
    },
    {
      id: 2,
      title: 'Yangi kvant kompyuter ishlab chiqildi',
      shortDescription: "IBM kompaniyasi 1000 qubitli kvant kompyuterni e'lon qildi",
      fullContent: `IBM kompaniyasi bugun Condor nomli yangi kvant kompyuterini taqdim etdi. Bu kompyuter 1,121 qubitga ega bo'lib, hozirgacha yaratilgan eng katta kvant kompyuterlaridan biri hisoblanadi.

Kvant kompyuterlari klassik kompyuterlarga nisbatan muayyan masalalarni million marta tezroq hal qilish imkoniyatiga ega. Ular ayniqsa kriptografiya, dori-darmonlar ishlab chiqish va sun'iy intellekt sohasida katta imkoniyatlar ochadi.

IBM ning yangi Condor tizimi:
- 1,121 qubit
- 99.9% aniqlik darajasi
- Kriogen sovutish tizimi (-273°C)
- Modulli arxitektura

Kompaniya mutaxassislari ta'kidlashicha, bu yutuq kvant hisoblash sohasida yangi davrning boshlanishi hisoblanadi. Yaqin kelajakda ular 4,000 qubitli tizimlarni yaratishni rejalashtirmoqda.

Kvant kompyuterlari tibbiyot, moliya, logistika va boshqa ko'plab sohalarda inqilob qilishi kutilmoqda. IBM o'z texnologiyasini universitetlar va tadqiqot markazlari bilan baham ko'rish rejasida.`,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
      date: '2026-01-14',
      author: 'Prof. Zarina Rahimova',
      category: 'Fan',
      readTime: '6 daqiqa'
    },
    {
      id: 3,
      title: "Marsga parvoz uchun yangi raketa sinovdan o'tkazildi",
      shortDescription: 'SpaceX kompaniyasi Starship raketasining navbatdagi testini amalga oshirdi',
      fullContent: `SpaceX kompaniyasi Texasdagi kosmodromda Starship raketasining 25-testini muvaffaqiyatli amalga oshirdi. Bu test Marsga inson jo'natish rejasida muhim bosqich hisoblanadi.

Starship raketa 120 metr balandlikda bo'lib, u hozirgacha qurilgan eng katta va eng kuchli raketadir. Raketa 100 tonnagacha yukni Marsga yetkazish qobiliyatiga ega.

Test natijalari:
- Raketa muvaffaqiyatli uchdi va qaytib qo'ndi
- Barcha tizimlar normal ishladi
- Yoqilg'i iste'moli rejadagidan 5% kam bo'ldi
- Qayta foydalanish tizimi to'liq sinab ko'rildi

Elon Musk aytishicha, agar barcha testlar muvaffaqiyatli bo'lsa, 2028 yilda birinchi bepilot missiya Marsga jo'natiladi. 2030-2032 yillarda esa birinchi odamlarni Marsga jo'natish rejalashtirilmoqda.

SpaceX shuningdek, Starship raketasini Oy bazalarini qurish va kommunikatsiya sun'iy yo'ldoshlarini orbitaga chiqarish uchun ham foydalanishni rejalashtirmoqda. NASA bilan hamkorlikda Artemis dasturi doirasida astronavtlarni Oyga yetkazish ishlari olib borilmoqda.`,
      image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=600&fit=crop',
      date: '2026-01-13',
      author: 'Aziz Tursunov',
      category: 'Koinot',
      readTime: '7 daqiqa'
    },
    {
      id: 4,
      title: 'Tibbiyotda genetik muharrir yangi natijalar berdi',
      shortDescription: 'CRISPR texnologiyasi yordamida kam uchraydigan kasallik davolandi',
      fullContent: `Amerikaning Johns Hopkins universiteti olimlari CRISPR-Cas9 genetik muharrir texnologiyasidan foydalanib, kam uchraydigan genetik kasallikni muvaffaqiyatli davoladilar.

Sickle Cell Disease (oroq hujayrali anemiya) kasalligi har yili minglab odamlarning hayotiga xavf soladi. Yangi usul bilan bemor hujayralaridagi genetik nuqsonlar to'g'rilanib, kasallik belgilari butunlay yo'qoldi.

Davolash jarayoni:
- Bemordan ildiz hujayralari olinadi
- CRISPR yordamida genlar tahrir qilinadi
- Davolangan hujayralar qaytarib yuboriladi
- 3-6 oyda to'liq tiklanish

Tadqiqotda ishtirok etgan 12 bemorning 11 tasi to'liq sog'aydi. Bu genetik muharrir texnologiyasining tibbiyotdagi eng katta muvaffaqiyatlaridan biri hisoblanadi.

Olimlar aytishicha, CRISPR texnologiyasi kelgusida saraton, Alzgeymer kasalligi va boshqa og'ir kasalliklarni davolashda ham qo'llanilishi mumkin. Hozirda 50 dan ortiq klinik sinovlar olib borilmoqda.

FDA (Amerika FDA tashkiloti) bu texnologiyani rasmiy ravishda ma'qulladi va uni klinik amaliyotda qo'llashga ruxsat berdi.`,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
      date: '2026-01-12',
      author: 'Dr. Malika Abdullayeva',
      category: 'Tibbiyot',
      readTime: '8 daqiqa'
    },
    {
      id: 5,
      title: "Toza energiya sohasida yangi rekord o'rnatildi",
      shortDescription: 'Yadro sintezi reaktori birinchi marta musbat natija berdi',
      fullContent: `AQShning National Ignition Facility laboratoriyasi yadro sintezi reaktorida tarixiy yutuqqa erishdi - reaktor ishlab chiqargan energiya sarflangan energiyadan 50% ko'p bo'ldi.

Yadro sintezi - Quyoshda bo'ladigan jarayonning Yer sharoitida takrorlanishi. Bu texnologiya cheksiz, toza va xavfsiz energiya manbai bo'lishi mumkin.

Yutuq tafsilotlari:
- Sarflangan energiya: 2.05 megajoule
- Ishlab chiqarilgan energiya: 3.15 megajoule
- Samaradorlik: 153%
- Reaktsiya vaqti: 0.1 nanosekund

Bu natija 70 yillik tadqiqotlar mahsuli hisoblanadi. Olimlar yadro sintezini tijorat miqyosida ishlatish uchun yana 10-15 yil kerak bo'ladi deb hisoblaydilar.

Yadro sintezi energetikasi afzalliklari:
- Radioaktiv chiqindilar yo'q
- Portlash xavfi yo'q
- Yoqilg'i deyarli cheksiz (dengiz suvidan olinadi)
- Atrof-muhitga zarar yo'q

Agar yadro sintezi reaktorlari ishga tushirilsa, bu insoniyat energetika inqilobini boshdan kechiradi. Iqlim o'zgarishi muammosi hal bo'lishi va barcha mamlakatlarda arzon energiya paydo bo'lishi mumkin.`,
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop',
      date: '2026-01-11',
      author: 'Prof. Sardor Yusupov',
      category: 'Energetika',
      readTime: '6 daqiqa'
    }
  ]

  const handleReadMore = (id) => {
    // Agar kerak bo'lsa har bir yangilik sahifaga yo'naltirish
    console.log('Read more:', id)
  }

  return (
    <Container sx={{ maxWidth: '1300px !important', py: { xs: 6, md: 10 } }}>
      <Grid container spacing={2}>
        {NEWS.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all .3s ease',
                cursor: 'default',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0,0,0,0.3)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    transition: 'opacity 0.3s',
                    '&:hover': { opacity: 1 },
                    cursor: 'pointer'
                  }}
                  onClick={() => router.push(`/news/${item.id}`)}
                >
                  Ko‘rish
                </Box>
              </Box>
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography fontWeight={600} gutterBottom sx={{ lineHeight: 1.3, minHeight: 48 }}>
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    flexGrow: 1,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    mb: 2
                  }}
                >
                  {item.shortDescription}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ mt: 'auto', alignSelf: 'flex-start' }}
                  onClick={() => handleReadMore(item.id)}
                >
                  Batafsil
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default NewsAll
