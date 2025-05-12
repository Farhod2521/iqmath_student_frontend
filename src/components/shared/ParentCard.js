import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardContent, Divider, Box } from '@mui/material'

const ParentCard = ({ title, children, footer, codeModel }) => {
  return (
    <Card sx={{ padding: 0 }} elevation={true ? 9 : 0} variant={!true ? 'outlined' : undefined}>
      <CardHeader title={title} action={codeModel} />
      <Divider />

      <CardContent>{children}</CardContent>
      {footer ? (
        <>
          <Divider />
          <Box p={3}>{footer}</Box>
        </>
      ) : (
        ''
      )}
    </Card>
  )
}

ParentCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  codeModel: PropTypes.node,
  footer: PropTypes.node
}

export default ParentCard
