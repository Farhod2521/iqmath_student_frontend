import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import 'slick-carousel/slick/slick.css'

import LeadershipSlider from './LeadershipSlider'
import { Container } from '@mui/material'

const Leadership = () => {
  return (
    <>
      <section className="relative px-4 py-20 overflow-hidden text-gray-900 bg-gray-50">
        <Container sx={{ maxWidth: '1400px !important' }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 bg-blue-200 rounded-full w-96 h-96 filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 bg-purple-200 rounded-full w-96 h-96 filter blur-3xl"></div>
          </div>

          <div className="relative mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <div className="inline-block px-4 py-2 mb-4 rounded-full bg-white/30 backdrop-blur-md">
                <span className="text-sm font-semibold text-gray-800">🎓 Buyuk Olimlar</span>
              </div>
              <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
                Matematika Tarixidagi Ulug' Shaxslar
              </h2>
              <p className="max-w-2xl mx-auto text-xl text-gray-600">
                O'rta Osiyo va dunyo matematikasiga katta hissa qo'shgan buyuk olimlar
              </p>
            </div>

            <LeadershipSlider />
          </div>
        </Container>
      </section>
    </>
  )
}

export default Leadership
