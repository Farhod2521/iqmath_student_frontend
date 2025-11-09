'use client'

import React from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { Chip } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export const NavLinks = [
  { title: 'Bosh sahifa', to: '/' },
  { title: 'Biz haqimizda', to: '/about' },
  { title: 'Savol javob', to: '/faqs' },
  { title: "Bog'lanish", to: 'tel:+998881989000' }
]

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '15px',
  color: theme.palette.text.secondary,
  backgroundColor: 'transparent',
  fontWeight: 500,
  position: 'relative',
  transition: 'all 0.3s ease',

  '&:hover': {
    backgroundColor: 'rgba(93, 135, 255, 0.08)',
    color: theme.palette.primary.main
  },

  '&.active': {
    backgroundColor: 'rgba(93, 135, 255, 0.15)',
    color: theme.palette.primary.main
  }
}))

const Navigations = () => {
  const { t } = useTranslation()
  const pathname = usePathname()

  const navs = [
    { title: t('homePage'), to: '/' },
    { title: t('aboutus'), to: '/about' },
    { title: t('faq'), to: '/faqs' },
    { title: t('contactus'), to: 'tel:+998881989000' }
  ]

  const isActive = (path) => {
    // Telefon raqami uchun active qilmaymiz
    if (path.startsWith('tel:')) return false

    // Bosh sahifa uchun aniq tenglik
    if (path === '/') return pathname === '/'

    // Boshqa sahifalar uchun pathname bilan boshlanishini tekshiramiz
    return pathname.startsWith(path)
  }

  return (
    <>
      {navs.map((navlink, i) => (
        <StyledButton
          color="primary"
          component={Link}
          href={navlink.to}
          className={isActive(navlink.to) ? 'active' : ''}
          key={i}
        >
          {navlink.title}{' '}
          {navlink.new && (
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
          )}
        </StyledButton>
      ))}
    </>
  )
}

export default Navigations
