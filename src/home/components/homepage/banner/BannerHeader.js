import Image from 'next/image'
import Auth from '../../auth/Auth'
import { Button } from '@mui/material'

function BannerHeader() {
  return (
    <section className="bg-[#ecf2ff] py-6 md:py-10" style={{ height: 'calc(100vh - 100px)' }}>
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 h-full mb-10 md:mb-0 flex justify-center flex-col items-end">
          <div className="">
            <Image width={600} height={1000} className="w-full h-full" src="/images/banner.png" alt="students" />
          </div>
          <p className="mt-6 text-lg md:text-xl text-center ">
            IQMATH - bu matematikani samarali o'qitish uchun maxsus ishlab chiqilgan innovatsion elektron platforma.
          </p>
        </div>

        <div className="md:w-1/2 md:pl-10">
          <Auth />
        </div>
      </div>
    </section>
  )
}

export default BannerHeader
