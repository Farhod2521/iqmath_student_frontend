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
import { request } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

const leadershipApi = {
  getAll: async () => {
    const { data } = await request.get('/api/v1/management/mobile/mathematicians/')
    return data
  },
  getDetail: async (id) => {
    const { data } = await request.get(`/api/v1/management/mobile/mathematicians/${id}/`)
    return data
  }
}

const LeadershipSlider = () => {
  const { t, i18n } = useTranslation()
  const [scientists, setScientists] = useState([])
  const [selectedScientist, setSelectedScientist] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const { data } = useQuery({
    queryKey: ['data-leadership'],
    queryFn: leadershipApi.getAll,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (data?.length) {
      setScientists(data)
    }
  }, [data])

  const { data: detailData } = useQuery({
    queryKey: ['data-leadership-detail', selectedScientist?.id],
    queryFn: () => (selectedScientist ? leadershipApi.getDetail(selectedScientist.id) : null),
    enabled: !!selectedScientist,
    refetchOnWindowFocus: false
  })

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
      {current && (
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
                    unoptimized
                    alt={i18n.language === 'uz' ? current.title_uz : current.title_ru}
                    width={160} // md:160
                    height={160} // md:160
                    priority
                    className={`object-cover border-4 border-blue-100 rounded-full shadow-lg transition-all duration-500 ease-in-out ${
                      isAnimating ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                    }`}
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
                    {i18n.language === 'ru' ? current.title_ru : current.title_uz}
                  </div>

                  <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                    {' '}
                    {i18n.language === 'ru' ? current.subtitle_ru : current.subtitle_uz}
                  </h2>

                  <div className="flex items-center justify-center gap-2 mb-4 text-gray-600 md:justify-start">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">
                      {i18n.language === 'ru' ? current.life_years_ru : current.life_years_uz}
                    </span>
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
      )}
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
      {/* Modal */}
      {selectedScientist && detailData && (
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
              <h2 className="text-xl font-bold text-gray-900 md:text-2xl">{t('leadership.modalTitle')}</h2>
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
                    src={detailData.image}
                    unoptimized
                    alt={i18n.language === 'ru' ? detailData.title_ru : detailData.title_uz}
                    width={256}
                    height={256}
                    className="object-cover border-4 border-blue-100 rounded-full shadow-xl"
                  />
                </div>
                <div className="space-y-4 md:w-3/5">
                  <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    {i18n.language === 'ru' ? detailData.title_ru : detailData.title_uz}
                  </h3>
                  <p className="text-lg text-blue-600 md:text-xl">
                    {i18n.language === 'ru' ? detailData.subtitle_ru : detailData.subtitle_uz}
                  </p>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="mb-1 text-sm text-gray-500">{t('leadership.periodLabel')}</p>
                    <p className="text-xl font-bold text-gray-900 md:text-2xl">
                      {i18n.language === 'ru' ? detailData.life_years_ru : detailData.life_years_uz}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-900">
                  <span className="w-1 h-6 bg-blue-500 rounded"></span>
                  {t('leadership.bioTitle')}
                </h4>
                <p className="leading-relaxed text-gray-700">
                  {i18n.language === 'ru' ? detailData.description_ru : detailData.description_uz}
                </p>
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
