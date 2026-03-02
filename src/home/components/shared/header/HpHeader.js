'use client'

import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import { IconMenu2, IconX } from '@tabler/icons'
import Brand from '@/components/brand'
import Navigations from './Navigations'
import MobileSidebar from './MobileSidebar'
import LanguageDropdown from '@/components/language'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { FaFacebook, FaInstagram, FaPhone, FaTelegram, FaTwitter, FaYoutube } from 'react-icons/fa'
import AuthModal from '../../auth/AuthModal'
import { getSession, useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import Auth from '../../auth/Auth'
import { useRouter } from 'next/router'

// Styled components
const AppBarStyled = styled(AppBar)(({ theme }) => ({
  justifyContent: 'center',
  [theme.breakpoints.up('lg')]: { minHeight: 60 },
  backgroundColor: 'white'
}))

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: '100%',
  paddingLeft: 0,
  paddingRight: 0,
  color: theme.palette.text.secondary,
  justifyContent: 'space-between'
}))

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  minHeight: 64
}))

const defaultLinks = {
  telegram: '',
  instagram: '',
  facebook: '',
  youtube: '',
  twitter: '',
  phone: '+998881989000'
}

const socialIcons = [
  { key: 'telegram', Icon: FaTelegram, size: 20, link_url: 'https://t.me/iqmath2025' },
  { key: 'instagram', Icon: FaInstagram, size: 20, link_url: 'https://www.instagram.com/iq_mathuz/' },
  { key: 'youtube', Icon: FaYoutube, size: 20, link_url: 'https://www.youtube.com/@iqmathuz' }
]

const HpHeader = () => {
  const { t } = useTranslation()
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'))
  const [open, setOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  const handleAuthClick = () => {
    setAuthOpen(true)
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: 'signUp' }
      },
      undefined,
      { shallow: true }
    )
  }

  const handleClose = () => {
    setAuthOpen(false)
    const nextQuery = { ...router.query }
    delete nextQuery.tab

    router.replace({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true })
  }

  return (
    <AppBarStyled position="sticky" elevation={0}>
      <Container sx={{ maxWidth: '1400px !important' }}>
        <ToolbarStyled>
          <Brand />
          {/* MOBILE */}
          {lgDown && (
            <Stack direction="row" spacing={1} alignItems="center">
              {/* xohlasangiz mobileda ham auth button ko‘rsatsin */}
              <Button
                variant="contained"
                onClick={handleAuthClick}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 800,

                  px: { xs: 1.4, sm: 2.2 }, // gorizontal padding
                  py: { xs: 0.55, sm: 0.8 }, // vertikal padding
                  fontSize: { xs: 12, sm: 14 }, // yozuv o'lchami
                  minHeight: { xs: 34, sm: 38 }, // tugma balandligi
                  minWidth: { xs: 96, sm: 120 }, // tugma eni
                  lineHeight: 1,
                  whiteSpace: 'nowrap',

                  // ✅ style
                  background: '#5D87FF'
                }}
              >
                {session ? t('login', 'Kirish') : t('signIn')}
              </Button>

              <IconButton color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                <IconMenu2 size={20} />
              </IconButton>
            </Stack>
          )}

          {lgUp && (
            <>
              <Stack spacing={1} direction="row" alignItems="center">
                <Navigations />
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                {/* {socialIcons.map(
                  ({ key, Icon, size }) =>
                    socialLinks[key] && (
                      <IconButton
                        key={key}
                        component="a"
                        href={socialLinks[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        size="small"
                      >
                        <Icon size={size} />
                      </IconButton>
                    )
                )}
                <IconButton component="a" href={`tel:${socialLinks.phone}`} color="primary" size="small">
                  <FaPhone size={16} />
                </IconButton> */}
                <LanguageDropdown />
                <Button
                  variant="contained"
                  onClick={handleAuthClick}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 900,
                    px: 2.6,
                    // py: 1,
                    background: '#5D87FF'
                    // boxShadow: '0 10px 20px rgba(99,102,241,0.20)'
                  }}
                >
                  {session ? t('login', 'Kirish') : t('signIn')}
                </Button>
              </Stack>
            </>
          )}
        </ToolbarStyled>
      </Container>

      <Drawer
        anchor="left"
        open={open}
        variant="temporary"
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            width: 280,
            maxWidth: '85vw'
          }
        }}
        // Drawer ochilganda orqa fonni to'xtatish
        ModalProps={{
          keepMounted: true // Mobile performance uchun
        }}
      >
        {/* Drawer Header */}
        <DrawerHeader>
          <Brand />
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            <IconX size={20} />
          </IconButton>
        </DrawerHeader>

        <Divider />

        {/* Navigation Links */}
        <Box onClick={handleDrawerClose}>
          <MobileSidebar />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Social Icons va Language */}
        <Stack spacing={2} sx={{ px: 2, pb: 2 }}>
          {/* Social Icons */}
          <Stack direction="row" spacing={1} justifyContent="flex-start" flexWrap="wrap">
            {socialIcons.map(({ key, Icon, size, link_url }) => (
              <IconButton
                key={key}
                component="a"
                href={link_url}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                size="small"
              >
                <Icon size={size} />
              </IconButton>
            ))}
            <IconButton component="a" href={`tel:+998881989000`} color="primary" size="small">
              <FaPhone size={16} />
            </IconButton>
          </Stack>

          {/* Language Dropdown */}
          <LanguageDropdown />
        </Stack>
      </Drawer>
      <AuthModal open={authOpen} onClose={handleClose} title={t('authCard.cta', 'Kirish / Ro‘yxatdan o‘tish')}>
        <Auth />
      </AuthModal>
    </AppBarStyled>
  )
}

export default HpHeader
