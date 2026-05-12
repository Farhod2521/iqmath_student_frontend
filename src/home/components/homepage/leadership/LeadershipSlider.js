import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Award, X, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { request } from '@/services/api'
import { useQuery } from '@tanstack/react-query'
import { MathJax, MathJaxContext } from 'better-react-mathjax'

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

const CircleImage = ({ src, alt, size = 160, className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-full bg-white/60 ring-4 ring-blue-100 shadow-lg ${className}`}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-cover" unoptimized />
    </div>
  )
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
    if (data?.length) setScientists(data)
  }, [data])

  const { data: detailData } = useQuery({
    queryKey: ['data-leadership-detail', selectedScientist?.id],
    queryFn: () => (selectedScientist ? leadershipApi.getDetail(selectedScientist.id) : null),
    enabled: !!selectedScientist,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!scientists?.length) return
    const timer = setInterval(() => changeSlide((currentIndex + 1) % scientists.length), 6000)
    return () => clearInterval(timer)
  }, [scientists, currentIndex])

  const changeSlide = (nextIndex) => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(nextIndex)
      setIsAnimating(false)
    }, 260)
  }

  const handlePrev = () => changeSlide((currentIndex - 1 + scientists.length) % scientists.length)
  const handleNext = () => changeSlide((currentIndex + 1) % scientists.length)

  const current = scientists[currentIndex]

  const getTitle = (obj) => (i18n.language === 'ru' ? obj?.title_ru : obj?.title_uz)
  const getSubtitle = (obj) => (i18n.language === 'ru' ? obj?.subtitle_ru : obj?.subtitle_uz)
  const getYears = (obj) => (i18n.language === 'ru' ? obj?.life_years_ru : obj?.life_years_uz)

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Main Card */}
      {current && (
        <div className="relative overflow-hidden bg-white border border-gray-100 shadow-[0_30px_70px_rgba(0,0,0,0.10)] rounded-3xl">
          <div className="absolute inset-0 pointer-events-none opacity-60 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

          <div className="relative p-5 sm:p-6 md:p-10">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              {/* Image */}
              <div
                className={`transition-all duration-500 ease-out ${isAnimating ? 'opacity-0 scale-[0.96]' : 'opacity-100 scale-100'}`}
              >
                <CircleImage
                  src={current.image}
                  alt={getTitle(current) || 'Scientist'}
                  className="w-[160px] h-[160px] sm:w-[190px] sm:h-[190px] lg:w-[210px] lg:h-[210px]"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 text-center md:text-left">
                <div
                  className={`transition-all duration-500 ease-out ${isAnimating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}
                >
                  {/* <div className="inline-flex items-center gap-2 px-4 py-2 mb-3 text-xs font-semibold text-blue-700 border border-blue-100 rounded-full bg-blue-50">
                    <Award className="w-4 h-4" />
                    {getSubtitle(current)}
                  </div> */}

                  <h2 className="mb-4 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                    {getTitle(current)}
                  </h2>

                  <p className="mb-5 text-sm font-semibold text-gray-600 sm:text-base md:text-lg">
                    {getSubtitle(current)}
                  </p>

                  <div className="flex items-center justify-center gap-2 mb-4 text-gray-600 md:justify-start">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                      <Calendar className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-semibold sm:text-base">{getYears(current)}</span>
                  </div>

                  <div className="flex flex-col justify-center gap-2 sm:flex-row sm:items-center sm:gap-3 md:justify-start">
                    <button
                      onClick={() => setSelectedScientist(current)}
                      className="px-6 py-2.5 text-sm font-semibold text-white transition rounded-[8px] bg-[#5D87FF] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {t('leadership.more')}
                    </button>

                    <button
                      onClick={handleNext}
                      className="px-6 py-2.5 text-sm font-semibold text-gray-900 transition rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-[0.98] sm:hidden"
                    >
                      {t('leadership.next') || 'Next'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicators */}
            <div className="flex flex-wrap justify-center gap-2 mt-6 sm:gap-3">
              {scientists?.map((_, i) => (
                <button
                  key={i}
                  onClick={() => changeSlide(i)}
                  className={`h-9 px-3 rounded-full text-xs sm:text-sm font-semibold transition border ${
                    i === currentIndex
                      ? 'bg-[#5D87FF] text-white border-[#5D87FF] shadow-md scale-[1.03]'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons (desktop) */}
      <button
        onClick={handlePrev}
        className="hidden lg:flex absolute left-2 xl:left-[-52px] top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-white border border-gray-200 rounded-full shadow-lg hover:bg-[#5D87FF] hover:text-white hover:border-[#5D87FF] transition"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="hidden lg:flex absolute right-2 xl:right-[-52px] top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-white border border-gray-200 rounded-full shadow-lg hover:bg-[#5D87FF] hover:text-white hover:border-[#5D87FF] transition"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Modal */}
      {selectedScientist && detailData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedScientist(null)}
        >
          <MathJaxContext config={mathJaxConfig}>
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
                  <div className="flex justify-center sm:w-2/5">
                    <CircleImage
                      src={detailData.image}
                      alt={getTitle(detailData) || 'Scientist'}
                      size={200}
                      className="sm:!w-[220px] sm:!h-[220px]"
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
                    <span className="w-1 h-6 bg-blue-500 rounded"></span> {t('leadership.bioTitle')}
                  </h4>

                  <MathJax dynamic className="leading-relaxed text-gray-700">
                    {i18n.language === 'ru' ? detailData.description_ru : detailData.description_uz}
                  </MathJax>
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
          </MathJaxContext>
        </div>
      )}
    </div>
  )
}

export default LeadershipSlider

// mathjax.config.js
export const mathJaxConfig = {
  loader: { load: ['input/tex', 'output/chtml'] },
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)']
    ],
    displayMath: [['$$', '$$']]
  }
}
