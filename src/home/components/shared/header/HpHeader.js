import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled } from '@mui/material/styles'
import { IconMenu2 } from '@tabler/icons'
// import { Facebook, Instagram, Phone, Telegram, Twitter, YouTube } from '@mui/icons-material'
import Brand from '@/components/brand'
import Navigations from './Navigations'
import MobileSidebar from './MobileSidebar'
import LanguageDropdown from '@/components/language'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { FaFacebook, FaInstagram, FaPhone, FaTelegram, FaTwitter, FaYoutube } from 'react-icons/fa'

// Styled components (Tashqarida)
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
              <div className="flex gap-2 items-center">
                {socialIcons.map(
                  ({ key, Icon, size }) =>
                    socialLinks[key] && (
                      <a key={key} href={socialLinks[key]} target="_blank" rel="noopener noreferrer">
                        <IconButton color="primary">
                          <Icon size={size} />
                        </IconButton>
                      </a>
                    )
                )}
                <a href={`tel:${socialLinks.phone}`}>
                  <IconButton color="primary">
                    <FaPhone size={16} />
                  </IconButton>
                </a>
                <LanguageDropdown />
              </div>
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
            width: 270,
            height: 'auto',
            paddingBottom: 2,
            overflowX: 'hidden',
            border: 0,
            boxShadow: (theme) => theme.shadows[8]
          }
        }}
      >
        <MobileSidebar />
        <div className="flex w-full justify-start ml-6 mb-6">
          <LanguageDropdown />
        </div>
      </Drawer>
    </AppBarStyled>
  )
}

export default HpHeader
