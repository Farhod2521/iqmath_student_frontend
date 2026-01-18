import React, { useEffect, useState } from 'react'
import { Box, Typography, Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import 'slick-carousel/slick/slick.css'

import LeaderShipCarousel from './LeaderShipCarousel'
import Contact from './Contact'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const Leadership = () => {
  const scientists = [
    {
      id: 1,
      name: 'Al-Xorazmiy',
      title: 'Algebra asoschilaridan biri',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      period: '780-850',
      bio: "Muhammad ibn Muso al-Xorazmiy - buyuk o'zbek matematigi va astronomi. Algebra fanining asoschilaridan biri hisoblanadi. Uning 'Al-jabr' asari algebraning rivojlanishiga katta hissa qo'shgan.",
      achievements: [
        'Algebra fanining asoschilaridan',
        'Hind raqamlarini Yevropa va Sharqqa yoygan',
        'Algoritmlar nazariyasining asoschisi'
      ]
    },
    {
      id: 2,
      name: 'Al-Beruniy',
      title: 'Ensiklopedik olim',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      period: '973-1048',
      bio: "Abu Rayhon Beruniy - buyuk o'zbek olimi, matematika, astronomiya, fizika, geografiya va boshqa ko'plab fanlarda fundamental tadqiqotlar olib borgan. Yer radiusini yuqori aniqlikda hisoblagan.",
      achievements: [
        'Yer radiusini aniq hisoblagan',
        '150 dan ortiq asar muallifi',
        'Matematika va astronomiyada yangi usullar yaratgan'
      ]
    },
    {
      id: 3,
      name: "Mirzo Ulug'bek",
      title: 'Astronomiya va matematika buyuk olimi',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      period: '1394-1449',
      bio: "Mirzo Ulug'bek - buyuk davlat arbobi, olim va mesenati. Samarqandda rasadxona qurgan va yulduzlar katalogini yaratgan. Trigonometriya bo'yicha fundamental ishlar bajargan.",
      achievements: [
        'Samarqand rasadxonasi asoschisi',
        '1018 ta yulduz katalogi yaratgan',
        'Trigonometriya jadvallarini tuzgan'
      ]
    },
    {
      id: 4,
      name: "Al-Farg'oniy",
      title: 'Astronomiya va matematika olimi',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      period: '798-861',
      bio: "Ahmad al-Farg'oniy - Farg'ona vodiysida tug'ilgan buyuk astronom va matematik. Uning asarlari Yevropada keng tarqalgan va Renessans davridagi astronomiya rivojiga katta ta'sir ko'rsatgan.",
      achievements: [
        "Astronomiya bo'yicha fundamental kitoblar",
        'Nilometr yaratishda ishtirok etgan',
        "Yevropa astronomiyasiga katta ta'sir"
      ]
    },
    {
      id: 5,
      name: 'Omar Xayyom',
      title: 'Matematik, astronom va shoir',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      period: '1048-1131',
      bio: 'Omar Xayyom - fors-tojik matematigi, astronomi va shoiri. Kubik tenglamalar nazariyasini rivojlantirgan. Jaloliy taqvimini yaratgan. Ruboiylari bilan butun dunyoga mashhur.',
      achievements: [
        'Kubik tenglamalar nazariyasi',
        'Jaloliy taqvimi yaratgan',
        'Geometriya aksiomalari ustida ishlagan'
      ]
    },
    {
      id: 6,
      name: 'Ibn Sino',
      title: 'Tibbiyot, falsafa va matematika olimi',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      period: '980-1037',
      bio: "Abu Ali ibn Sino (Avitsenna) - buyuk o'rta asrlar olimi. Tibbiyot, falsafa, matematika va boshqa ko'plab fanlarda asarlar yaratgan. 'Tib qonunlari' asari 600 yildan ortiq davr mobaynida tibbiyotda asosiy qo'llanma bo'lgan.",
      achievements: [
        '450 dan ortiq asar muallifi',
        'Tibbiyot va falsafada yangiliklar',
        'Matematika va mantiq rivojiga hissa'
      ]
    }
  ]

  const [currentScientist, setCurrentScientist] = useState(0)
  const [selectedScientist, setSelectedScientist] = useState(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentScientist((prev) => (prev + 1) % scientists.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused])

  const nextScientist = () => {
    setCurrentScientist((prev) => (prev + 1) % scientists.length)
  }

  const prevScientist = () => {
    setCurrentScientist((prev) => (prev - 1 + scientists.length) % scientists.length)
  }

  const getVisibleScientists = () => {
    const visible = []
    for (let i = -1; i <= 1; i++) {
      const index = (currentScientist + i + scientists.length) % scientists.length
      visible.push({ ...scientists[index], position: i })
    }
    return visible
  }

  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-semibold">🎓 Buyuk Olimlar</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Matematika Tarixidagi Ulug' Shaxslar</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              O'rta Osiyo va dunyo matematikasiga katta hissa qo'shgan buyuk olimlar
            </p>
          </div>

          <div
            className="relative h-[500px] flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {getVisibleScientists().map((scientist) => (
              <div
                key={scientist.id}
                className="absolute transition-all duration-700 ease-in-out cursor-pointer"
                style={{
                  transform: `translateX(${scientist.position * 400}px) scale(${
                    scientist.position === 0 ? 1.1 : 0.85
                  })`,
                  opacity: scientist.position === 0 ? 1 : 0.5,
                  zIndex: scientist.position === 0 ? 10 : 5
                }}
                onClick={() => scientist.position === 0 && setSelectedScientist(scientist)}
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border-2 border-white/20 w-80 hover:border-blue-400 transition">
                  <div className="h-80 overflow-hidden">
                    <img src={scientist.image} alt={scientist.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{scientist.name}</h3>
                    <p className="text-blue-300 text-sm mb-2">{scientist.title}</p>
                    <p className="text-gray-400 text-sm">({scientist.period})</p>
                    {scientist.position === 0 && (
                      <button
                        className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 py-2 rounded-lg font-semibold hover:shadow-lg transition"
                        onClick={() => setSelectedScientist(scientist)}
                      >
                        Batafsil Ma'lumot
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Buttons */}
            <button
              onClick={prevScientist}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextScientist}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {scientists.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentScientist(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentScientist ? 'bg-white w-8' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scientist Detail Modal */}
        {selectedScientist && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedScientist(null)}
          >
            <div
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center z-10">
                <h2 className="text-2xl font-bold text-white">To'liq Ma'lumot</h2>
                <button
                  onClick={() => setSelectedScientist(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="md:w-2/5">
                    <img
                      src={selectedScientist.image}
                      alt={selectedScientist.name}
                      className="w-full rounded-xl shadow-2xl"
                    />
                  </div>
                  <div className="md:w-3/5 space-y-4">
                    <h3 className="text-3xl font-bold text-white">{selectedScientist.name}</h3>
                    <p className="text-xl text-blue-300">{selectedScientist.title}</p>
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                      <p className="text-sm text-gray-400 mb-1">Yashagan davri:</p>
                      <p className="text-2xl font-bold text-white">{selectedScientist.period}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded"></span>
                    Biografiya
                  </h4>
                  <p className="text-gray-300 leading-relaxed text-lg">{selectedScientist.bio}</p>
                </div>

                <div>
                  <h4 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-purple-500 rounded"></span>
                    Asosiy Yutuqlari
                  </h4>
                  <div className="space-y-3">
                    {selectedScientist.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-md rounded-lg hover:bg-white/10 transition"
                      >
                        <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-gray-300 text-lg">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
                <button
                  onClick={() => setSelectedScientist(null)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition"
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      {/* <Contact /> */}
    </>
  )
}

export default Leadership
