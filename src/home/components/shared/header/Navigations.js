import React from 'react'
import Button from '@mui/material/Button'

import { styled } from '@mui/material/styles'
import { Chip } from '@mui/material'

// import { NavLink, useLocation } from 'react-router'
import Link from 'next/link'

export const NavLinks = [
  { title: 'Bosh sahifa', to: '/' },
  { title: 'Biz haqimizda', to: '/about' },
  { title: 'Savol javob', to: '/faqs' },
  { title: "Bog'lanish", to: 'tel:+998881989000' }
]

const Navigations = () => {
  const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '15px',
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent',
    fontWeight: 500,
    '&.active': {
      backgroundColor: 'rgba(93, 135, 255, 0.15)',
      color: theme.palette.primary.main
    }
  }))

  return (
    <>
      {NavLinks.map((navlink, i) => (
        <StyledButton
          color="primary"
          component={Link}
          href={navlink.to}
          className={({ isActive }) => (isActive ? 'active' : '')}
          // variant=""
          key={i}
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
        </StyledButton>
      ))}
    </>
  )
}

export default Navigations
