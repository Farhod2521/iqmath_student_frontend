import * as React from 'react'
import Popper from '@mui/material/Popper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { useTranslation } from 'react-i18next'
import InfoCircleIcon from '@/components/icons/info-circle'

// K10: Popover modal edi — ochiq turganda birinchi bosish faqat uni yopardi ("Orqaga" ikkinchi bosishda ishlardi).
// Popper modal emas: tashqariga bosish ham yopadi, ham bosilgan tugmaning o'zi ishlaydi.
export default function ActionInfo() {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className="cursor-pointer flex items-center ">
        <button aria-describedby={id} onClick={handleClick}>
          <InfoCircleIcon color={!open ? '#4D555DFF' : '#F97316FF'} />
        </button>

        <Popper id={id} open={open} anchorEl={anchorEl} placement="top-start" style={{ zIndex: 1300 }}>
          <div className="bg-[#FFF4E5] border border-[#FF9500]  p-[16px] rounded-md shadow-lg">{t('cashbackNote')}</div>
        </Popper>
      </div>
    </ClickAwayListener>
  )
}
