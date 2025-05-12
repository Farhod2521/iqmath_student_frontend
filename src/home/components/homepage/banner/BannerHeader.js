import { Button } from '@mui/material'
import BannerAuth from './BannerAuth'

function BannerHeader() {
  return (
    <section className="bg-[#ecf2ff] py-12 md:py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold mb-6 leading-tight">
            IQMATH — mathematics and logical learning platform
          </h1>
          <p className="text-lg mb-8 text-gray-100">
            Enhance your math skills with our interactive learning platform designed for students of all levels.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="px-6 py-3 bg-white text-primary font-bold rounded-md hover:bg-gray-100 transition duration-300">
              <a href="#register">Start Learning Now</a>
            </Button>
            <Button
              className="px-6 py-3 border-2 border-white font-bold rounded-md hover:bg-white hover:text-primary transition duration-300"
              variant="outline"
            >
              <a href="#demo">Watch Demo</a>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-10">
          <BannerAuth />
        </div>
      </div>
    </section>
  )
}

export default BannerHeader
