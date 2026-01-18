import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Grid
} from '@mui/material'
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  ArrowLeft,
  Clock,
  Share2,
  Facebook,
  Twitter,
  MessageCircle
} from 'lucide-react'

// News Slider Component - Landing page uchun
const NewsSlider = ({ onNewsClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const news = [
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

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, news.length])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % news.length)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length)
  }

  return (
    <Box sx={{ py: { xs: 8, lg: 12 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" fontWeight={700} mb={2}>
            So'nggi Yangiliklar
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Fan va texnologiya dunyosidagi eng muhim xabarlar
          </Typography>
        </Box>

        <Box position="relative">
          {/* Main Slide */}
          <Card
            sx={{
              position: 'relative',
              height: { xs: 400, md: 500 },
              overflow: 'hidden'
            }}
          >
            <CardMedia
              component="img"
              image={news[currentIndex].image}
              alt={news[currentIndex].title}
              sx={{
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                width: '100%'
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)'
              }}
            />

            <CardContent
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: { xs: 3, md: 5 },
                color: 'white'
              }}
            >
              <Box display="flex" alignItems="center" gap={2} mb={2} flexWrap="wrap">
                <Chip
                  label={news[currentIndex].category}
                  sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 600 }}
                />
                <Box display="flex" alignItems="center" gap={1}>
                  <Calendar size={16} />
                  <Typography variant="body2">
                    {new Date(news[currentIndex].date).toLocaleDateString('uz-UZ')}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Clock size={16} />
                  <Typography variant="body2">{news[currentIndex].readTime}</Typography>
                </Box>
              </Box>

              <Typography variant="h4" fontWeight={700} mb={2}>
                {news[currentIndex].title}
              </Typography>
              <Typography variant="h6" color="grey.300" mb={3}>
                {news[currentIndex].shortDescription}
              </Typography>

              <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <User size={20} />
                  <Typography variant="body2">{news[currentIndex].author}</Typography>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => onNewsClick(news[currentIndex])}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      transition: 'all 0.3s'
                    }
                  }}
                >
                  Batafsil o'qish
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <IconButton
            onClick={prevSlide}
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: 3,
              '&:hover': {
                bgcolor: 'white',
                transform: 'translateY(-50%) scale(1.1)'
              }
            }}
          >
            <ChevronLeft />
          </IconButton>

          <IconButton
            onClick={nextSlide}
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: 3,
              '&:hover': {
                bgcolor: 'white',
                transform: 'translateY(-50%) scale(1.1)'
              }
            }}
          >
            <ChevronRight />
          </IconButton>

          {/* Dots */}
          {/* <Box display="flex" justifyContent="center" gap={1} mt={4}>
            {news.map((_, index) => (
              <Box
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                sx={{
                  height: 8,
                  borderRadius: 2,
                  bgcolor: index === currentIndex ? 'primary.main' : 'grey.300',
                  width: index === currentIndex ? 48 : 8,
                  cursor: 'pointer',
                  transition: 'all 0.5s'
                }}
              />
            ))}
          </Box> */}
        </Box>

        {/* Thumbnail Grid */}
        {/* <Grid container spacing={2} mt={4}>
          {news.map((item, index) => (
            <Grid item xs={6} sm={4} md={2.4} key={item.id}>
              <Card
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                sx={{
                  cursor: 'pointer',
                  opacity: index === currentIndex ? 1 : 0.6,
                  border: index === currentIndex ? 3 : 0,
                  borderColor: 'primary.main',
                  transition: 'all 0.3s',
                  '&:hover': {
                    opacity: 1,
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <CardMedia component="img" height="80" image={item.image} alt={item.title} />
                <CardContent sx={{ p: 1 }}>
                  <Typography variant="caption" noWrap fontWeight={600}>
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> */}
      </Container>
    </Box>
  )
}

// News Detail Page Component
const NewsDetailPage = ({ news, onBack }) => {
  const [isSharing, setIsSharing] = useState(false)

  const shareNews = (platform) => {
    const url = window.location.href
    const text = news.title

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`
    }

    window.open(shareUrls[platform], '_blank', 'width=600,height=400')
  }

  return (
    <Box minHeight="100vh" bgcolor="grey.50">
      {/* Header */}
      <Box bgcolor="white" boxShadow={1} position="sticky" top={0} zIndex={10}>
        <Container maxWidth="md" sx={{ py: 2 }}>
          <Button startIcon={<ArrowLeft />} onClick={onBack} sx={{ textTransform: 'none', fontWeight: 600 }}>
            Orqaga qaytish
          </Button>
        </Container>
      </Box>

      {/* Hero Image */}
      <Container maxWidth="md" sx={{ py: 2 }}>
        <Box position="relative" height={{ xs: 400, md: 500 }}>
          <Box
            component="img"
            src={news.image}
            alt={news.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)'
            }}
          />

          <Container maxWidth="md" sx={{ position: 'absolute', bottom: 0, pb: 5 }}>
            <Chip label={news.category} sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 600, mb: 2 }} />
            <Typography variant="h3" fontWeight={700} color="white" mb={2}>
              {news.title}
            </Typography>
            <Typography variant="h6" color="grey.300">
              {news.shortDescription}
            </Typography>
          </Container>
        </Box>
      </Container>
      {/* Content */}
      <Container maxWidth="md" sx={{ py: 5 }}>
        {/* Meta Info */}
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          gap={3}
          mb={5}
          pb={5}
          borderBottom={1}
          borderColor="divider"
        >
          <Box display="flex" alignItems="center" gap={1}>
            <User size={20} />
            <Typography fontWeight={600}>{news.author}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Calendar size={20} />
            <Typography>
              {new Date(news.date).toLocaleDateString('uz-UZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Clock size={20} />
            <Typography>{news.readTime} o'qish</Typography>
          </Box>

          {/* Share Button */}
          <Box ml="auto" position="relative">
            <Button
              variant="contained"
              startIcon={<Share2 size={20} />}
              onClick={() => setIsSharing(!isSharing)}
              sx={{ textTransform: 'none' }}
            >
              Ulashish
            </Button>

            {isSharing && (
              <Box
                sx={{
                  position: 'absolute',
                  right: 0,
                  mt: 1,
                  bgcolor: 'white',
                  borderRadius: 2,
                  boxShadow: 5,
                  p: 2,
                  display: 'flex',
                  gap: 1.5,
                  zIndex: 20
                }}
              >
                <IconButton
                  onClick={() => shareNews('facebook')}
                  sx={{ bgcolor: '#1877f2', color: 'white', '&:hover': { bgcolor: '#166fe5' } }}
                >
                  <Facebook size={20} />
                </IconButton>
                <IconButton
                  onClick={() => shareNews('twitter')}
                  sx={{ bgcolor: '#1da1f2', color: 'white', '&:hover': { bgcolor: '#1a91da' } }}
                >
                  <Twitter size={20} />
                </IconButton>
                <IconButton
                  onClick={() => shareNews('telegram')}
                  sx={{ bgcolor: '#0088cc', color: 'white', '&:hover': { bgcolor: '#0077b5' } }}
                >
                  <MessageCircle size={20} />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>

        {/* Article Content */}
        <Box>
          {news.fullContent.split('\n\n').map((paragraph, index) => (
            <Typography
              key={index}
              variant="body1"
              paragraph
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                mb: 3,
                textAlign: 'justify',
                color: 'text.primary'
              }}
            >
              {paragraph}
            </Typography>
          ))}
        </Box>

        {/* Tags */}
        <Box mt={8} pt={5} borderTop={1} borderColor="divider">
          <Box display="flex" flexWrap="wrap" gap={1}>
            <Chip label={`#${news.category}`} />
            <Chip label="#Fan" />
            <Chip label="#Texnologiya" />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

// Main App Component
const NewsSection = () => {
  const [selectedNews, setSelectedNews] = useState(null)

  return (
    <Box>
      {selectedNews ? (
        <NewsDetailPage news={selectedNews} onBack={() => setSelectedNews(null)} />
      ) : (
        <NewsSlider onNewsClick={setSelectedNews} />
      )}
    </Box>
  )
}

export default NewsSection
