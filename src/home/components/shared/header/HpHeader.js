import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled } from '@mui/material/styles'
// import Logo from '../../../../layouts/full/shared/logo/Logo';
import Navigations from './Navigations'
import MobileSidebar from './MobileSidebar'
import { IconMenu2 } from '@tabler/icons'
import Brand from '@/components/brand'
import Image from 'next/image'
import { Facebook, Instagram, Phone, Telegram, Twitter, YouTube } from '@mui/icons-material'
import { request } from '@/services/api'
import NavbarLangue from '@/layout/navbar/NavbarLangue'
import LanguageDropdown from '@/components/language'
import { URLS } from '@/constants/url'

const HpHeader = () => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      minHeight: '60px'
    },

    backgroundColor: 'white'
  }))

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    color: theme.palette.text.secondary,
    justifyContent: 'space-between'
  }))

  //   sidebar
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  const [open, setOpen] = React.useState(false)
  const [socialLinks, setSocialLinks] = React.useState({
    telegram: '',
    instagram: '',
    facebook: '',
    youtube: '',
    twitter: '',
    phone: ''
  })

  const handleDrawerOpen = () => setOpen(true)
  const toggleDrawer = (newOpen) => () => setOpen(newOpen)

  useEffect(() => {
    request
      .get(URLS.systemSettings)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const settings = res.data[0]
          setSocialLinks({
            telegram: settings.telegram_link || '',
            instagram: settings.instagram_link || '',
            facebook: settings.facebook_link || '',
            youtube: settings.youtube_link || '',
            twitter: settings.twitter_link || '',
            phone: '+998881989000'
          })
        }
      })
      .catch((error) => {
        console.error('Error fetching social links:', error)
      })
  }, [])

  return (
    <AppBarStyled position="sticky" elevation={0}>
      <Container sx={{ maxWidth: '1400px !important' }}>
        <ToolbarStyled>
          {/* <Logo /> */}
          <Brand />
          {lgDown ? (
            <IconButton color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
              <IconMenu2 size="20" />
            </IconButton>
          ) : null}
          {lgUp ? (
            <>
              <Stack spacing={1} direction="row" alignItems="center">
                <Navigations />
              </Stack>
              <div className="flex gap-2 items-center">
                <LanguageDropdown />
                  <a href={socialLinks.telegram} target="_blank">
                    <IconButton color="primary">
                      <Telegram />
                    </IconButton>
                  </a>
                  <a href={socialLinks.instagram} target="_blank" className="">
                    <IconButton color="primary">
                      <Instagram />
                    </IconButton>
                  </a>

                  <a href={socialLinks.facebook} target="_blank">
                    <IconButton color="primary">
                      <Facebook />
                    </IconButton>
                  </a>
                  <a href={socialLinks.youtube} target="_blank">
                    <IconButton color="primary">
                      <YouTube />
                    </IconButton>
                  </a>

                  <a href={socialLinks.twitter} target="_blank">
                    <IconButton color="primary">
                      <Twitter />
                    </IconButton>
                  </a>

                <a href={`tel:${socialLinks.phone}`}>
                    <IconButton color="primary">
                      <Phone />
                    </IconButton>
                  </a>
              </div>
            </>
          ) : null}
        </ToolbarStyled>
      </Container>
      <Drawer
        anchor="left"
        open={open}
        variant="temporary"
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 270,
            height: 'auto',
            paddingBottom: '20px',
            overflowX: 'hidden',
            border: '0 !important',
            boxShadow: (theme) => theme.shadows[8]
          }
        }}
      >
        <MobileSidebar />
        <div className="flex w-full justify-start ml-6">
          <LanguageDropdown />
        </div>
      </Drawer>
    </AppBarStyled>
  )
}

export default HpHeader
