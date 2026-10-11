'use client'

import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { Chip } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

// Menyu bandi: oddiy matn, faol bandi — ko'k gradientli "pill" va ostida chiziq
const StyledButton = styled(Button)(() => ({
  fontFamily: "'Manrope', 'Inter', system-ui, sans-serif",
  fontSize: '17px',
  color: '#1E293B',
  backgroundColor: 'transparent',
  fontWeight: 600,
  textTransform: 'none',
  letterSpacing: 0,
  padding: '9px 20px',
  borderRadius: '14px',
  position: 'relative',
  whiteSpace: 'nowrap',
  transition: 'all 0.25s ease',

  '&:hover': {
    backgroundColor: '#EEF3FF',
    color: '#1D6BFF'
  },

  '&.active': {
    background: 'linear-gradient(135deg, #2F7BFF 0%, #1D5BF0 100%)',
    color: '#fff',
    boxShadow: '0 10px 22px -12px rgba(29, 91, 240, 0.9)'
  },

  '&.active::after': {
    content: '""',
    position: 'absolute',
    left: '50%',
    bottom: '-9px',
    width: '72%',
    height: '3px',
    borderRadius: '3px',
    transform: 'translateX(-50%)',
    background: '#1D6BFF'
  }
}))

const Navigations = () => {
  const { t } = useTranslation()
  const pathname = usePathname()

  const navs = [
    // { title: t('homePage'), to: '/' },
    { title: t('aboutus'), to: '/about' },
    { title: t('prices'), to: '/#prices' },
    { title: t('news'), to: '/#news-detail' },
    { title: t('games.hero.navTitle'), to: '/mental-games' },
    { title: t('faqTitle'), to: '/#faq-list-top' }
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
      {navs?.map((navlink, i) => (
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
