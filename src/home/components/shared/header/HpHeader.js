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
import { getSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import Auth from '../../auth/Auth'

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
  { key: 'telegram', Icon: FaTelegram, size: 20 },
  { key: 'instagram', Icon: FaInstagram, size: 20 },
  { key: 'facebook', Icon: FaFacebook, size: 20 },
  { key: 'youtube', Icon: FaYoutube, size: 20 },
  { key: 'twitter', Icon: FaTwitter, size: 20 }
]

const HpHeader = () => {
  const { t } = useTranslation()
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'))
  const [open, setOpen] = useState(false)
  const [socialLinks, setSocialLinks] = useState(defaultLinks)
  const [authOpen, setAuthOpen] = useState(false)
  const [session, setSession] = useState(null)

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  useEffect(() => {
    getSession().then((sess) => setSession(sess))
  }, [])

  useEffect(() => {
    request
      .get(URLS.systemSettings)
      .then((res) => {
        if (res.data?.length) {
          const settings = res.data[0]
          setSocialLinks({
            telegram: settings.telegram_link || '',
            instagram: settings.instagram_link || '',
            facebook: settings.facebook_link || '',
            youtube: settings.youtube_link || '',
            twitter: settings.twitter_link || '',
            phone: defaultLinks.phone
          })
        }
      })
      .catch((err) => {
        console.error('Error fetching social links:', err)
      })
  }, [])

  const handleAuthClick = () => {
    // if (session) {
    //   toast.success(t('welcome', 'Xush kelibsiz!'))
    //   if (session?.role === 'teacher') router.push('/dashboard/teacher/statistics')
    //   else if (session?.role === 'parent') router.push('/dashboard/parent/my-children')
    //   else router.push('/dashboard/student/subjects')
    //   return
    // }

    setAuthOpen(true)
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
                  borderRadius: 999,
                  textTransform: 'none',
                  fontWeight: 800,
                  px: 2.2,
                  py: 0.8,
                  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
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
            {socialIcons.map(
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
            </IconButton>
          </Stack>

          {/* Language Dropdown */}
          <LanguageDropdown />
        </Stack>
      </Drawer>
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        title={t('authCard.cta', 'Kirish / Ro‘yxatdan o‘tish')}
      >
        <Auth />
      </AuthModal>
    </AppBarStyled>
  )
}

export default HpHeader
