import React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { Chip } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

export const NavLinks = [
  { title: 'Bosh sahifa', to: '/' },
  { title: 'Biz haqimizda', to: '/about' },
  { title: 'Savol javob', to: '/faqs' },
  { title: "Bog'lanish", to: 'tel:+998881989000' }
]

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})(({ theme, isActive }) => ({
  fontSize: '15px',
  color: isActive ? 'primary.main' : theme.palette.text.secondary,
  backgroundColor: isActive ? 'rgba(93, 135, 255, 0.25)' : 'transparent',
  fontWeight: 500,
  borderRadius: '8px',
  padding: '8px 16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: isActive ? 'rgba(93, 135, 255, 0.25)' : 'rgba(93, 135, 255, 0.15)',
    color: isActive ? 'white' : theme.palette.primary.main,
  },
}))

const Navigations = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const navs = [
    { title: t('homePage'), to: '/' },
    { title: t('aboutus'), to: '/about' },
    { title: t('faq'), to: '/faqs' },
    { title: t('contactus'), to: 'tel:+998881989000' }
  ]

  return (
    <>
      {navs.map((navlink, i) => {
        // faqat path bo'yicha solishtiramiz (tel: emas)
        const isActive = navlink.to !== 'tel:+998881989000' && router.pathname === navlink.to
        return (
          <StyledButton
            color="primary"
            component={Link}
            href={navlink.to}
            isActive={isActive}
            key={i}
          >
            {navlink.title}{' '}
            {navlink.new ? (
              <Chip
                label="New"
                size="small"
                sx={{
                  ml: '6px',
                  borderRadius: '8px',
                  color: 'primary.main',
                  backgroundColor: 'rgba(93, 135, 255, 0.15)'
                }}
              />
            ) : null}
          </StyledButton>
        )
      })}
    </>
  )
}

export default Navigations
