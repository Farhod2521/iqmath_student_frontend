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
import axios from 'axios'
import { request } from '@/services/api'
import NavbarLangue from '@/layout/navbar/NavbarLangue'
import LanguageDropdown from '@/components/language'

const HpHeader = () => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      minHeight: '60px'
    },
    // backgroundColor: theme.palette.primary.light

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

  const handleDrawerOpen = () => setOpen(true)
  const toggleDrawer = (newOpen) => () => setOpen(newOpen)

  // useEffect(() => {
  //   request.get('/api/v1/management/system-settings/').then((res) => {
  //     console.log(res)
  //   })
  // }, [])

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
                <a href="https://t.me/iqmath2025" target="_blank">
                  <IconButton color="primary">
                    <Telegram />
                  </IconButton>
                </a>
                <a href="https://www.instagram.com/iq_mathuz/" target="_blank" className="">
                  <IconButton color="primary">
                    <Instagram />
                  </IconButton>
                </a>

                {/* <a href="https://www.facebook.com/profile.php?id=61572210159591" target="_blank">
                  <IconButton color="primary">
                    <Facebook />
                  </IconButton>
                </a> */}
                <a href="https://www.youtube.com/@iqmathuz" target="_blank">
                  <IconButton color="primary">
                    <YouTube />
                  </IconButton>
                </a>

                <a href="tel:+998881989000">
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
            border: '0 !important',
            boxShadow: (theme) => theme.shadows[8]
          }
        }}
      >
        <MobileSidebar />
        <div className="flex w-full justify-start ml-8">
          <LanguageDropdown />
        </div>
      </Drawer>
    </AppBarStyled>
  )
}

export default HpHeader
