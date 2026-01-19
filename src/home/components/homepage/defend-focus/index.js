import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Dialog,
  AppBar,
  Toolbar
} from '@mui/material'
import { ChevronLeft, ChevronRight, Calendar, User, Clock, X } from 'lucide-react'

/* ---------------- MOCK DATA ---------------- */

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

/* ---------------- HERO SLIDER ---------------- */

const HeroSlider = ({ onSelect }) => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % NEWS.length)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  const handlePrev = () => {
    setDirection(-1)
    setIndex((index - 1 + NEWS.length) % NEWS.length)
  }

  const handleNext = () => {
    setDirection(1)
    setIndex((index + 1) % NEWS.length)
  }

  return (
    <Box sx={{ height: 'calc(80vh - 60px)', position: 'relative', overflow: 'hidden', bgcolor: '#000' }}>
      {NEWS.map((news, i) => {
        const isActive = i === index
        const offset = i - index

        return (
          <Box
            key={news.id}
            sx={{
              position: 'absolute',

              inset: 0,
              transform: `translateX(${offset * 100}%)`,
              transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: isActive ? 1 : 0,
              transitionProperty: 'transform, opacity',
              transitionDuration: '0.8s, 0.6s'
            }}
          >
            <Box
              sx={{
                height: '100%',
                backgroundImage: `url(${news.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: isActive ? 'scale(1)' : 'scale(1.1)',
                transition: 'transform 8s ease-out'
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), rgba(0,0,0,0.1))'
              }}
            />

            <Container
              sx={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
                pb: 10,
                color: '#fff',
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.6s ease-in-out 0.3s'
              }}
            >
              <Chip
                label={news.category}
                sx={{
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  px: 1,
                  transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'transform 0.6s ease-out 0.4s'
                }}
              />

              <Typography
                variant="h2"
                fontWeight={800}
                mb={2}
                sx={{
                  transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'transform 0.7s ease-out 0.5s'
                }}
              >
                {news.title}
              </Typography>

              <Typography
                variant="h6"
                color="grey.300"
                maxWidth={700}
                mb={4}
                sx={{
                  transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'transform 0.7s ease-out 0.6s'
                }}
              >
                {news.shortDescription}
              </Typography>

              <Box
                display="flex"
                gap={3}
                flexWrap="wrap"
                sx={{
                  transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'transform 0.7s ease-out 0.7s'
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => onSelect(news)}
                  sx={{
                    px: 5,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 8px 32px rgba(25, 118, 210, 0.4)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(25, 118, 210, 0.5)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Batafsil o'qish
                </Button>
              </Box>
            </Container>
          </Box>
        )
      })}

      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: 30,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          width: 56,
          height: 56,
          '&:hover': {
            bgcolor: '#fff',
            transform: 'translateY(-50%) scale(1.1)'
          },
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          zIndex: 10
        }}
      >
        <ChevronLeft size={28} />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 30,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          width: 56,
          height: 56,
          '&:hover': {
            bgcolor: '#fff',
            transform: 'translateY(-50%) scale(1.1)'
          },
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          zIndex: 10
        }}
      >
        <ChevronRight size={28} />
      </IconButton>

      {/* Slide Indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1.5,
          zIndex: 10
        }}
      >
        {NEWS.map((_, i) => (
          <Box
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1)
              setIndex(i)
            }}
            sx={{
              width: i === index ? 40 : 12,
              height: 12,
              borderRadius: 6,
              bgcolor: i === index ? '#fff' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              '&:hover': {
                bgcolor: i === index ? '#fff' : 'rgba(255,255,255,0.7)'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

/* ---------------- MODAL ---------------- */

const NewsModal = ({ open, news, onClose }) => {
  if (!news) return null

  return (
    <Dialog open={open} fullScreen onClose={onClose}>
      <AppBar position="sticky" sx={{ bgcolor: '#fff', color: '#000' }}>
        <Toolbar>
          <IconButton onClick={onClose}>
            <X />
          </IconButton>
          <Typography ml={2} fontWeight={600}>
            Yangilik
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 5 }}>
        <Typography variant="h3" fontWeight={700} mb={2}>
          {news.title}
        </Typography>

        <Box display="flex" gap={3} mb={3}>
          <Box display="flex" gap={1}>
            <User size={18} />
            {news.author}
          </Box>
          <Box display="flex" gap={1}>
            <Calendar size={18} />
            {news.date}
          </Box>
          <Box display="flex" gap={1}>
            <Clock size={18} />
            {news.readTime}
          </Box>
        </Box>

        <Typography fontSize="1.1rem" lineHeight={1.8}>
          {news.fullContent}
        </Typography>
      </Container>
    </Dialog>
  )
}

/* ---------------- MAIN ---------------- */

const LandingPage = () => {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <HeroSlider onSelect={setSelected} />
      <NewsModal open={Boolean(selected)} news={selected} onClose={() => setSelected(null)} />
    </>
  )
}

export default LandingPage
