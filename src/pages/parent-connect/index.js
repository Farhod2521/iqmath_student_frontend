import Head from 'next/head'
import ParentConnect from '@/modules/parent-connect/ParentConnect'

// Ota-ona farzandining QR kodini skanerlaganda ochiladigan sahifa (/parent-connect?t=<token>)
export default function ParentConnectPage() {
  return (
    <>
      <Head>
        <title>IQMATH — Ota-ona sahifasi</title>
      </Head>
      <ParentConnect />
    </>
  )
}
