import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Award, X, Calendar } from 'lucide-react'
import IbnSino from '@/assets/images/leadership/ibnSino.jpg'
import AlBeruniy from '@/assets/images/leadership/alBeruniy.jpg'
import AlFargoni from '@/assets/images/leadership/AlFargoniy.jpg'
import AlXorazmiy from '@/assets/images/leadership/AlXorazmiy.jpg'
import MirzoUlugbek from '@/assets/images/leadership/mirzoUlugbek.jpg'
import UmarXayyom from '@/assets/images/leadership/UmarXayyom.jpg'
import { useTranslation } from 'react-i18next'

const LeadershipSlider = () => {
  const { t } = useTranslation()
  const scientists = [
    {
      id: 1,
      name: 'Al-Xorazmiy',
      title: 'Algebra asoschilaridan biri',
      // image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      image: AlXorazmiy,
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
      // image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Al-Khwarizmi_MuslimMathematician.jpg',
      image: AlBeruniy,
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
      // image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      image: MirzoUlugbek,
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
      // image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      image: AlFargoni,

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
      name: 'Umar Xayyom',
      title: 'Matematik, astronom va shoir',
      // image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      image: UmarXayyom,
      period: '1048-1131',
      bio: 'Umar Xayyom - fors-tojik matematigi, astronomi va shoiri. Kubik tenglamalar nazariyasini rivojlantirgan. Jaloliy taqvimini yaratgan. Ruboiylari bilan butun dunyoga mashhur.',
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
      // image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      image: IbnSino,
      period: '980-1037',
      bio: "Abu Ali ibn Sino (Avitsenna) - buyuk o'rta asrlar olimi. Tibbiyot, falsafa, matematika va boshqa ko'plab fanlarda asarlar yaratgan. 'Tib qonunlari' asari 600 yildan ortiq davr mobaynida tibbiyotda asosiy qo'llanma bo'lgan.",
      achievements: [
        '450 dan ortiq asar muallifi',
        'Tibbiyot va falsafada yangiliklar',
        'Matematika va mantiq rivojiga hissa'
      ]
    }
  ]
  const [selectedScientist, setSelectedScientist] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!scientists?.length) return

    const timer = setInterval(() => {
      changeSlide((currentIndex + 1) % scientists.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [scientists, currentIndex])

  const changeSlide = (nextIndex) => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(nextIndex)
      setIsAnimating(false)
    }, 300)
  }

  const handlePrev = () => {
    changeSlide((currentIndex - 1 + scientists.length) % scientists.length)
  }

  const handleNext = () => {
    changeSlide((currentIndex + 1) % scientists.length)
  }

  const current = scientists[currentIndex]

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Main Card */}
      <div className="overflow-hidden bg-white shadow-2xl rounded-2xl">
        <div className="p-6 md:p-10">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            {/* Image - Smaller & Circular */}
            <div className="relative flex-shrink-0">
              <div
                className={`relative w-32 h-32 md:w-40 md:h-40 transition-all duration-500 ease-in-out ${
                  isAnimating ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                }`}
              >
                <Image
                  src={current.image}
                  alt={current.name}
                  className="object-cover w-full h-full border-4 border-blue-100 rounded-full shadow-lg"
                />
              </div>
            </div>

            {/* Content - Compact */}
            <div className="flex-1 text-center md:text-left">
              <div
                className={`transition-all duration-500 ease-in-out ${
                  isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                  <Award className="w-3 h-3" />
                  {current.title}
                </div>

                <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">{current.name}</h2>

                <div className="flex items-center justify-center gap-2 mb-4 text-gray-600 md:justify-start">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{current.period}</span>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-gray-600 md:text-base line-clamp-3">{current.bio}</p>

                <button
                  onClick={() => setSelectedScientist(current)}
                  className="px-6 py-2.5 text-sm font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:scale-105"
                >
                  {t('leadership.more')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-0 w-10 h-10 transition -translate-y-1/2 bg-white border border-gray-200 rounded-full shadow-lg md:-left-16 top-1/2 md:w-12 md:h-12 hover:bg-blue-600 hover:text-white hover:border-blue-600"
      >
        <ChevronLeft className="w-5 h-5 mx-auto md:w-6 md:h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 w-10 h-10 transition -translate-y-1/2 bg-white border border-gray-200 rounded-full shadow-lg md:-right-16 top-1/2 md:w-12 md:h-12 hover:bg-blue-600 hover:text-white hover:border-blue-600"
      >
        <ChevronRight className="w-5 h-5 mx-auto md:w-6 md:h-6" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6 md:gap-3">
        {scientists.map((_, i) => (
          <button
            key={i}
            onClick={() => changeSlide(i)}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full text-xs md:text-sm font-semibold transition ${
              i === currentIndex ? 'bg-blue-600 text-white scale-110' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedScientist && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedScientist(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 md:text-2xl"> {t('leadership.modalTitle')}</h2>
              <button
                onClick={() => setSelectedScientist(null)}
                className="p-2 transition rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-600 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex flex-col gap-6 mb-6 md:flex-row">
                <div className="flex justify-center md:w-2/5">
                  <Image
                    src={selectedScientist.image}
                    alt={selectedScientist.name}
                    className="object-cover border-4 border-blue-100 rounded-full shadow-xl w-52 h-52 md:w-64 md:h-64"
                  />
                </div>
                <div className="space-y-4 md:w-3/5">
                  <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">{selectedScientist.name}</h3>
                  <p className="text-lg text-blue-600 md:text-xl">{selectedScientist.title}</p>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="mb-1 text-sm text-gray-500"> {t('leadership.periodLabel')}</p>
                    <p className="text-xl font-bold text-gray-900 md:text-2xl">{selectedScientist.period}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
                  <span className="w-1 h-6 bg-blue-500 rounded"></span>
                  {t('leadership.bioTitle')}
                </h4>
                <p className="leading-relaxed text-gray-700">{selectedScientist.bio}</p>
              </div>

              <div>
                <h4 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
                  <span className="w-1 h-6 bg-purple-500 rounded"></span>
                  {t('leadership.achievementsTitle')}
                </h4>
                <div className="space-y-3">
                  {selectedScientist.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 transition bg-gray-50 rounded-xl hover:bg-gray-100"
                    >
                      <span className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-bold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                        {index + 1}
                      </span>
                      <span className="text-gray-800">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setSelectedScientist(null)}
                className="w-full py-3 font-semibold text-white transition bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg"
              >
                {t('leadership.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeadershipSlider
