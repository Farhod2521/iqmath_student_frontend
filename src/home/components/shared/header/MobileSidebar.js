'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Chip } from '@mui/material'
import { useTranslation } from 'react-i18next'

const MobileSidebar = () => {
  const { t } = useTranslation()
  const pathname = usePathname()

  const navs = [
    { title: t('homePage'), to: '/' },
    { title: t('aboutus'), to: '/about' },
    { title: t('prices'), to: '#prices' },
    { title: t('faq'), to: '#faq-list-top' },
    { title: t('news'), to: '/news' },
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
    <Box p={1}>
      <Stack direction="column" spacing={2}>
        {navs.map((navlink, i) => {
          const active = isActive(navlink.to)
          return (
            <Button
              key={i}
              component={Link}
              href={navlink.to}
              color="inherit"
              sx={{
                justifyContent: 'flex-start',
                fontSize: '1.15rem',
                py: 1.2,
                fontWeight: active ? 700 : 400,
                color: active ? 'primary.main' : 'text.primary',
                backgroundColor: active ? 'rgba(93, 135, 255, 0.08)' : 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: active ? 'rgba(93, 135, 255, 0.15)' : 'rgba(0, 0, 0, 0.04)',
                  color: active ? 'primary.main' : 'text.primary'
                }
              }}
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
            </Button>
          )
        })}
      </Stack>
    </Box>
  )
}

export default MobileSidebar
