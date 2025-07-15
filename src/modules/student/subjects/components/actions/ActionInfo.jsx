import * as React from 'react'
import Popover from '@mui/material/Popover'
import { useTranslation } from 'react-i18next'
import InfoCircleIcon from '@/components/icons/info-circle'

export default function ActionInfo() {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div className="cursor-pointer flex items-center ">
      <button aria-describedby={id} variant="contained" onClick={handleClick}>
        <InfoCircleIcon color={!open ? '#4D555DFF' : '#F97316FF'} />
      </button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <div className="bg-[#FFF4E5] border border-[#FF9500]  p-[16px] rounded-md shadow-lg">{t('cashbackNote')}</div>
      </Popover>
    </div>
  )
}
