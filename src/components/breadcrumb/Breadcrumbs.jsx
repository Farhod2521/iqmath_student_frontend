import * as React from 'react'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

function BaseBreadcrumbs({ data = [] }) {
  return (
    <div className="mb-[24px]">
      <Breadcrumbs sx={{ color: 'black', fontSize: '20px', fontWeight: '600' }} aria-label="breadcrumb">
        {data.map(({ link, title }, idx) =>
          link ? (
            <Link key={idx} underline="hover" color="inherit" href={link}>
              {title}
            </Link>
          ) : (
            <Typography key={idx} sx={{ color: 'black', fontSize: '20px', fontWeight: '600' }}>
              {title}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </div>
  )
}

export default BaseBreadcrumbs
