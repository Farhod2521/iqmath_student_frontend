import React from 'react'
import { Box, Link, Typography, Tooltip } from '@mui/material'

import IconVisa from '@/assets/images/frontend-pages/payments/icon-visa.svg'
import IconMasterCard from '@/assets/images/frontend-pages/payments/icon-mastercard.svg'
import IconAmericanExpress from '@/assets/images/frontend-pages/payments/icon-american-express.svg'
import IconDiscover from '@/assets/images/frontend-pages/payments/icon-discover.svg'
import IconPaypal from '@/assets/images/frontend-pages/payments/icon-paypal.svg'
import IcoMasetro from '@/assets/images/frontend-pages/payments/icon-masetro.svg'
import IconJcb from '@/assets/images/frontend-pages/payments/icon-jcb.svg'
import IconDiners from '@/assets/images/frontend-pages/payments/icon-diners.svg'
import Image from 'next/image'

const PaymentMethods = () => {
  return (
    <>
      <Typography textAlign="center" mt={6} variant="body1">
        Secured payment with PayPal & Razorpay
      </Typography>

      <Box
        display="flex"
        useflexgap="true"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        mt={4}
        gap="56px"
      >
        <Link href="#">
          <Tooltip title="Visa">
            <Image src={IconVisa} width={60} height={20} alt="payment" />
          </Tooltip>
        </Link>
        <Link href="#">
          <Tooltip title="Mastercard">
            <Image src={IconMasterCard} width={45} height={25} alt="payment" />
          </Tooltip>
        </Link>
        <Link href="#">
          <Tooltip title="American express">
            <Image src={IconAmericanExpress} width={80} height={34} alt="payment" />
          </Tooltip>
        </Link>
        <Link href="#">
          <Tooltip title="Discover">
            <Image src={IconDiscover} width={95} height={16} alt="payment" />
          </Tooltip>
        </Link>
        <Link href="#">
          <Tooltip title="Paypal">
            <Image src={IconPaypal} width={90} height={24} alt="payment" />
          </Tooltip>
        </Link>
        <Link href="#">
          <Tooltip title="Maestro">
            <Image src={IcoMasetro} width={45} height={28} alt="payment" />
          </Tooltip>
        </Link>
        <Link href="#">
          <Tooltip title="JCB">
            <Image src={IconJcb} width={31} height={24} alt="payment" />
          </Tooltip>
        </Link>
        <Link href="#">
          <Tooltip title="Diners">
            <Image src={IconDiners} width={92} height={24} alt="payment" />
          </Tooltip>
        </Link>
      </Box>
    </>
  )
}

export default PaymentMethods
