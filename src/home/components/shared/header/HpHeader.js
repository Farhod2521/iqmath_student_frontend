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
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'))
  const [open, setOpen] = useState(false)
  const [socialLinks, setSocialLinks] = useState(defaultLinks)

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

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

  return (
    <AppBarStyled position="sticky" elevation={0}>
      <Container sx={{ maxWidth: '1400px !important' }}>
        <ToolbarStyled>
          <Brand />
          {lgDown && (
            <IconButton color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
              <IconMenu2 size={20} />
            </IconButton>
          )}
          {lgUp && (
            <>
              <Stack spacing={1} direction="row" alignItems="center">
                <Navigations />
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
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
                <LanguageDropdown />
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
    </AppBarStyled>
  )
}

export default HpHeader
