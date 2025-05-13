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
import { Instagram, Phone, Telegram, Twitter } from '@mui/icons-material'
import axios from 'axios'
import { request } from '@/services/api'

const HpHeader = () => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      minHeight: '100px'
    },
    backgroundColor: theme.palette.primary.light
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

  useEffect(() => {
    request.get('/api/v1/management/system-settings/').then((res) => {
      console.log(res)
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
              <div>
                <a href="#">
                  <IconButton color="primary">
                    <Instagram />
                  </IconButton>
                </a>
                <a href="#">
                  <IconButton color="primary">
                    <Telegram />
                  </IconButton>
                </a>
                <a href="#">
                  <IconButton color="primary">
                    <Twitter />
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
      </Drawer>
    </AppBarStyled>
  )
}

export default HpHeader
