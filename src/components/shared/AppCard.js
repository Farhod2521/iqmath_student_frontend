import React from 'react'
import PropTypes from 'prop-types'
import { Card } from '@mui/material'

const AppCard = ({ children }) => {
  return (
    <Card sx={{ display: 'flex', p: 0 }} elevation={true ? 9 : 0} variant={!true ? 'outlined' : undefined}>
      {children}
    </Card>
  )
}

AppCard.propTypes = {
  children: PropTypes.node
}

export default AppCard
