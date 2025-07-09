import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'

import { Chip } from '@mui/material'
import Brand from '@/components/brand'
import { useTranslation } from 'react-i18next'

const MobileSidebar = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const currentPath = router.pathname

  const navs = [
    { title: t('homePage'), to: '/' },
    { title: t('aboutus'), to: '/about' },
    { title: t('faq'), to: '/faqs' },
    { title: t('contactus'), to: 'tel:+998881989000' }
  ]

  const isActive = (path) => {
    if (path === '/') {
      return currentPath === '/'
    }
    return currentPath.startsWith(path)
  }

  return (
    <>
      <Box p={1}>
        <Stack direction="column" spacing={2}>
          {navs.map((navlink, i) => {
            const active = isActive(navlink.to)
            return (
              <Button
                key={i}
                color="inherit"
                href={navlink.to}
                sx={{
                  justifyContent: 'start',
                  fontSize: '1.15rem',
                  py: 1.2,
                  fontWeight: active ? 700 : 400,
                  color: active ? '#000000' : 'inherit',
                  '&:hover': {
                    backgroundColor: active ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                    color: active ? '#000000' : 'inherit'
                  }
                }}
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
              </Button>
            )
          })}
        </Stack>
      </Box>
    </>
  )
}

export default MobileSidebar
