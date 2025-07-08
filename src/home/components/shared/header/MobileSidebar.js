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
        <Stack direction="column" spacing={2}>
          {navs.map((navlink, i) => (
            <Button
              key={i}
              color="inherit"
              href={navlink.to}
              sx={{
                justifyContent: 'start',
                fontSize: '1.15rem', // font size kattaroq
                py: 1.2, // vertikal padding
                fontWeight: i === 0 ? 600 : 400
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
        </Stack>
      </Box>
    </>
  )
}

export default MobileSidebar
