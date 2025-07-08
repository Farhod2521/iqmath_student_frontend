import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import { Chip } from '@mui/material'
import Brand from '@/components/brand'
import { useTranslation } from 'react-i18next'

const MobileSidebar = () => {
  const { t } = useTranslation()

  const navs = [
    { title: t('homePage'), to: '/' },
    { title: t('aboutus'), to: '/about' },
    { title: t('faq'), to: '/faqs' },
    { title: t('contactus'), to: 'tel:+998881989000' }
  ]
  return (
    <>
      <Box p={1}>
        <Stack direction="column" spacing={0}>
          {navs.map((navlink, i) => (
            <Button
              key={i}
              color="inherit"
              href={navlink.to}
              sx={{
                justifyContent: 'start'
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
          ))}

          {/* <Button
            color="inherit"
            href="#"
            sx={{
              justifyContent: 'start'
            }}
          >
            Support
          </Button> */}
          {/* <Button color="primary" variant="contained" href="/auth/login">
            Get Started
          </Button> */}
        </Stack>
      </Box>
    </>
  )
}

export default MobileSidebar
