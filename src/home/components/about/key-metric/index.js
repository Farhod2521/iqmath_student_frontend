import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import ContentArea from './ContentArea'
import Key from './Key'

const KeyMetric = () => {
  return (
    <Box
      sx={{
        paddingTop: {
          xs: '40px',
          lg: '90px'
        },
        paddingBottom: {
          xs: '40px',
          lg: '90px'
        }
        // boxShadow: (theme) => theme.shadows[10]
      }}
    >
      <Container>
        <Grid container spacing={3} justifyContent="space-between">
          <Typography lineHeight={1.9}>
            IQmath - bu matematikani samarali o'qitish uchun maxsus ishlab chiqilgan innovatsion elektron platforma. U
            ilg‘or o‘qitish usullari va zamonaviy texnologik yechimlarni o‘zida mujassam etgan holda, turli yosh
            guruhlari va tayyorgarlik darajasidagi foydalanuvchilar uchun o‘ziga xos ta’lim maydonini yaratadi.
            Platforma matematika sohasidagi bilimlarini chuqurlashtirish yoki oddiygina muammolarni hal qilish
            ko'nikmalarini oshirishni istaganlar uchun mo'ljallangan.
          </Typography>
          <Typography lineHeight={1.9}>
            IQmath algebra, geometriya, statistika, hisob va matematikaning boshqa muhim sohalarida turli kurslarni
            taklif etadi. Har bir kurs nafaqat nazariy materiallarni, balki o'rganilgan narsalarni mustahkamlashga
            yordam beradigan amaliy vazifalarni ham o'z ichiga oladi. Platforma oʻquvchilarga oʻqish tezligi va
            chuqurligini mustaqil tanlash imkonini beruvchi moslashuvchan taʼlim tizimini taklif etadi. IQmath
            platformasining xususiyatlaridan biri bu video materiallarning mavjudligi. Platformada nazariy tushunchalar
            va tamoyillarni bosqichma-bosqich tushuntirib beradigan batafsil video darsliklar taqdim etiladi. Bu
            o'quvchilarga hatto murakkab mavzularni ham oson o'zlashtirishga yordam beradi. Darsliklardagi aniq misollar
            yechimlarining video tushuntirishlari ham mavjud bo'lib, foydalanuvchi nafaqat muammolarni qanday hal
            qilishni tushunish, balki ularni hal qilish mantiqini tushunish imkonini beradi.
          </Typography>
          <Typography lineHeight={1.9}>
            Bundan tashqari, IQmath platforma sizning bilimlaringizni sinab ko'rish va imtihon yoki testlarga
            tayyorgarlik ko'rish imkonini beruvchi turli test va mashqlarni taklif etadi. O'rnatilgan baholash tizimlari
            sizning o‘sib borishingizni kuzatish imkonini beradi va moslashuvchan topshiriqlar sizning bilim
            darajangizga mos va motivatsiyani yo'qotmasdan oldinga borishga yordam beradi. IQmath platformasida o'qish
            natijasida nafaqat akademik ko'rsatkichlar sezilarli darajada yaxshilanadi, balki mantiqiy va analitik
            fikrlashning eng muhim ko'nikmalari ham rivojlanadi, bu nafaqat matematik muammolarni, balki hayotning
            boshqa sohalarida ham foydali bo'ladi.
          </Typography>
        </Grid>
      </Container>
    </Box>
  )
}

export default KeyMetric
